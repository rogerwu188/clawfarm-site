'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useNetwork } from '@/app/components/NetworkProvider'
import {
  CLAWFARM_GATEWAY_URL,
  DEFAULT_WALLET_CHAT_MAX_CHARGE_ATOMIC,
  WalletChatError,
  createWalletPaymentSession,
  effectiveWalletChatMaxOutputTokens,
  estimateWalletChatMaxChargeAtomic,
  isUnsupportedWalletChatModelError,
  isWalletPaymentSessionReady,
  isWalletPaymentSessionRenewalError,
  loadWalletPaymentConfig,
  loadWalletChatModels,
  networkIdToPaymentChain,
  nextWalletChatMaxChargeAtomic,
  selectWalletPaymentChainConfig,
  sendWalletChatCompletion,
  walletSessionStorageKey,
  type WalletBrowserChainConfig,
  type WalletBrowserConfigResponse,
  type WalletChatMessage,
  type WalletChatModel,
  type WalletPaymentMetadata,
  type WalletPaymentSession,
} from '@/app/lib/wallet-chat/api'
import {
  approvalAmountForRequiredCap,
  approveDelegateAllowance,
  classifyWalletAllowance,
  fetchWalletAllowanceSnapshot,
  type WalletAllowanceDecision,
  type WalletAllowanceSnapshot,
} from '@/app/lib/wallet-chat/allowance'

type ChatStatus =
  | 'idle'
  | 'needs-wallet'
  | 'missing-config'
  | 'loading-config'
  | 'loading-models'
  | 'checking-allowance'
  | 'ready'
  | 'signing'
  | 'sending'
  | 'error'

type ChatEntry = WalletChatMessage & {
  id: string
}

const DEFAULT_MAX_TOKENS = '128'
const DEFAULT_MAX_CHARGE_ATOMIC = DEFAULT_WALLET_CHAT_MAX_CHARGE_ATOMIC
const EMPTY_METADATA: WalletPaymentMetadata = {
  requestNonce: null,
  paymentStatus: null,
  maxChargeAtomic: null,
  chargeAtomic: null,
  settlementTx: null,
  sessionId: null,
  sessionSpentAtomic: null,
  sessionReservedAtomic: null,
  sessionRequestsUsed: null,
}
const EMPTY_ALLOWANCE_SNAPSHOT: WalletAllowanceSnapshot = {
  exists: false,
  tokenAccount: null,
  amountAtomic: '0',
  delegate: null,
  delegatedAmountAtomic: '0',
}
const EMPTY_ALLOWANCE_DECISION: WalletAllowanceDecision = {
  status: 'unknown',
  message: 'Connect wallet to check Test USDC allowance.',
}

function shortAddress(value: string): string {
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function newMessage(role: ChatEntry['role'], content: string): ChatEntry {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    role,
    content,
  }
}

function normalizeError(error: unknown): string {
  if (error instanceof WalletChatError) {
    if (error.code === 'max_charge_exceeded' || /final charge exceeds signed max charge/i.test(error.message)) {
      return 'Final charge exceeded the request/session cap. Increase Max charge, start a new payment session, or lower Max tokens.'
    }
    return error.message
  }
  if (error instanceof Error) {
    if (error.name === 'WalletSignMessageError') return 'Wallet signature was rejected or failed.'
    return error.message
  }
  return 'ClawFarm chat request failed.'
}

function metadataRows(metadata: WalletPaymentMetadata): Array<[string, string | null]> {
  return [
    ['Request nonce', metadata.requestNonce],
    ['Payment status', metadata.paymentStatus],
    ['Max charge', metadata.maxChargeAtomic],
    ['Charge', metadata.chargeAtomic],
    ['Settlement tx', metadata.settlementTx],
    ['Session', metadata.sessionId],
    ['Session spent', metadata.sessionSpentAtomic],
    ['Session requests', metadata.sessionRequestsUsed],
  ]
}

function readAtomic(value: string): bigint | null {
  const trimmed = value.trim()
  if (!/^\d+$/.test(trimmed)) return null
  try {
    return BigInt(trimmed)
  } catch {
    return null
  }
}

function boundedSessionBudget(maxPerRequestAtomic: string, delegatedAmountAtomic: string): string {
  const one = BigInt(1)
  const ten = BigInt(10)
  const minimumBudget = BigInt(100000)
  const maxPerRequest = readAtomic(maxPerRequestAtomic) ?? one
  const tenRequests = maxPerRequest * ten
  const baseline = tenRequests > minimumBudget ? tenRequests : minimumBudget
  const delegated = readAtomic(delegatedAmountAtomic)
  if (delegated && delegated > BigInt(0) && delegated < baseline) return delegated.toString()
  return baseline.toString()
}

function sessionCoversRequiredCharge(session: WalletPaymentSession | null, requiredChargeAtomic: string): boolean {
  if (!session) return false
  const sessionCap = readAtomic(session.maxPerRequestAtomic)
  const required = readAtomic(requiredChargeAtomic)
  return Boolean(sessionCap && required && sessionCap >= required)
}

function mergeSessionMetadata(session: WalletPaymentSession, metadata: WalletPaymentMetadata): WalletPaymentSession {
  return {
    ...session,
    sessionId: metadata.sessionId || session.sessionId,
    spentAtomic: metadata.sessionSpentAtomic || session.spentAtomic,
    reservedAtomic: metadata.sessionReservedAtomic || session.reservedAtomic,
    requestsUsed: metadata.sessionRequestsUsed ? Number(metadata.sessionRequestsUsed) : session.requestsUsed,
  }
}

export default function WalletChatClient() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const { networkId, network } = useNetwork()
  const [models, setModels] = useState<WalletChatModel[]>([])
  const [selectedModelId, setSelectedModelId] = useState('')
  const [messages, setMessages] = useState<ChatEntry[]>([])
  const [inputDraft, setInputDraft] = useState('')
  const [maxTokens, setMaxTokens] = useState(DEFAULT_MAX_TOKENS)
  const [maxChargeAtomic, setMaxChargeAtomic] = useState(DEFAULT_MAX_CHARGE_ATOMIC)
  const [maxChargeEdited, setMaxChargeEdited] = useState(false)
  const [status, setStatus] = useState<ChatStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('Connect a wallet to load ClawFarm chat models.')
  const [metadata, setMetadata] = useState<WalletPaymentMetadata>(EMPTY_METADATA)
  const [walletPaymentConfig, setWalletPaymentConfig] = useState<WalletBrowserConfigResponse | null>(null)
  const [chainConfig, setChainConfig] = useState<WalletBrowserChainConfig | null>(null)
  const [allowanceSnapshot, setAllowanceSnapshot] = useState<WalletAllowanceSnapshot>(EMPTY_ALLOWANCE_SNAPSHOT)
  const [allowanceDecision, setAllowanceDecision] = useState<WalletAllowanceDecision>(EMPTY_ALLOWANCE_DECISION)
  const [approvalSignature, setApprovalSignature] = useState<string | null>(null)
  const [approvalBusy, setApprovalBusy] = useState(false)
  const [approvalMessage, setApprovalMessage] = useState('')
  const [paymentSession, setPaymentSession] = useState<WalletPaymentSession | null>(null)
  const [sessionBusy, setSessionBusy] = useState(false)
  const [sessionMessage, setSessionMessage] = useState('')

  const walletAddress = wallet.publicKey?.toBase58() ?? null
  const gatewayConfigured = CLAWFARM_GATEWAY_URL.trim().length > 0
  const paymentChain = networkIdToPaymentChain(networkId)
  const signMessage = wallet.signMessage
  const canSignMessages = typeof signMessage === 'function'
  const signTransaction = wallet.signTransaction
  const canApproveAllowance = typeof signTransaction === 'function'
  const effectiveMaxOutputTokens = effectiveWalletChatMaxOutputTokens(walletPaymentConfig)
  const allowanceReady = allowanceDecision.status === 'ready'
  const requiredChargeAtomic = maxChargeAtomic.trim() || DEFAULT_MAX_CHARGE_ATOMIC
  const sessionStorageKey = walletAddress ? walletSessionStorageKey(CLAWFARM_GATEWAY_URL, paymentChain, walletAddress) : null
  const sessionReady = isWalletPaymentSessionReady(paymentSession) && sessionCoversRequiredCharge(paymentSession, requiredChargeAtomic)
  const busy =
    status === 'loading-config' ||
    status === 'loading-models' ||
    status === 'checking-allowance' ||
    status === 'signing' ||
    status === 'sending' ||
    approvalBusy ||
    sessionBusy
  const hasPrompt = inputDraft.trim().length > 0
  const canSend = Boolean(walletAddress && gatewayConfigured && selectedModelId && hasPrompt && allowanceReady && sessionReady && !busy)

  const selectedModel = useMemo(
    () => models.find((model) => model.id === selectedModelId) || null,
    [models, selectedModelId]
  )
  const estimatedMaxChargeAtomic = useMemo(
    () => estimateWalletChatMaxChargeAtomic({ maxTokens, model: selectedModel }),
    [maxTokens, selectedModel]
  )

  useEffect(() => {
    setMaxChargeAtomic((current) => nextWalletChatMaxChargeAtomic({
      currentMaxChargeAtomic: current,
      estimatedMaxChargeAtomic,
      userEditedMaxCharge: maxChargeEdited,
    }))
  }, [estimatedMaxChargeAtomic, maxChargeEdited])

  const loadPaymentConfig = useCallback(async () => {
    if (!gatewayConfigured) {
      setWalletPaymentConfig(null)
      setChainConfig(null)
      setStatus('missing-config')
      setStatusMessage('NEXT_PUBLIC_CLAWFARM_GATEWAY_URL is not configured for this static build.')
      return null
    }

    setStatus('loading-config')
    setStatusMessage('Loading Gateway payment config.')
    try {
      const config = await loadWalletPaymentConfig({ gatewayUrl: CLAWFARM_GATEWAY_URL })
      const selectedChain = selectWalletPaymentChainConfig(config, paymentChain)
      setWalletPaymentConfig(config)
      setChainConfig(selectedChain)
      setStatusMessage('Gateway payment config loaded.')
      return selectedChain
    } catch (error) {
      console.error('Failed to load Gateway payment config', error)
      setWalletPaymentConfig(null)
      setChainConfig(null)
      setStatus('error')
      setStatusMessage(normalizeError(error))
      return null
    }
  }, [gatewayConfigured, paymentChain])

  useEffect(() => {
    void loadPaymentConfig()
  }, [loadPaymentConfig])

  const refreshAllowance = useCallback(async (nextChainConfig = chainConfig) => {
    if (!wallet.publicKey || !nextChainConfig) {
      setAllowanceSnapshot(EMPTY_ALLOWANCE_SNAPSHOT)
      setAllowanceDecision(EMPTY_ALLOWANCE_DECISION)
      return
    }

    setStatus('checking-allowance')
    setStatusMessage('Checking Test USDC allowance.')
    try {
      const snapshot = await fetchWalletAllowanceSnapshot(connection, wallet.publicKey, nextChainConfig.usdc_mint)
      const decision = classifyWalletAllowance(snapshot, {
        paymentDelegate: nextChainConfig.payment_delegate,
        requiredAtomic: requiredChargeAtomic,
      })
      setAllowanceSnapshot(snapshot)
      setAllowanceDecision(decision)
      setStatus(decision.status === 'ready' ? 'ready' : 'needs-wallet')
      setStatusMessage(decision.status === 'ready' ? 'Allowance ready. Start a payment session to chat without per-message signatures.' : decision.message)
    } catch (error) {
      console.error('Failed to check wallet allowance', error)
      setAllowanceSnapshot(EMPTY_ALLOWANCE_SNAPSHOT)
      setAllowanceDecision({ status: 'error', message: normalizeError(error) })
      setStatus('error')
      setStatusMessage(normalizeError(error))
    }
  }, [chainConfig, connection, requiredChargeAtomic, wallet.publicKey])

  useEffect(() => {
    void refreshAllowance()
  }, [refreshAllowance])

  const loadModels = useCallback(async () => {
    if (!walletAddress) {
      setModels([])
      setSelectedModelId('')
      setStatus('needs-wallet')
      setStatusMessage('Connect a Solana wallet to authorize ClawFarm model discovery.')
      return
    }
    if (!gatewayConfigured) {
      setModels([])
      setSelectedModelId('')
      setStatus('missing-config')
      setStatusMessage('NEXT_PUBLIC_CLAWFARM_GATEWAY_URL is not configured for this static build.')
      return
    }
    if (!canSignMessages || !signMessage) {
      setModels([])
      setSelectedModelId('')
      setStatus('error')
      setStatusMessage('This wallet cannot authorize ClawFarm chat yet because it does not support message signing.')
      return
    }
    if (!chainConfig) {
      setModels([])
      setSelectedModelId('')
      setStatus('loading-config')
      setStatusMessage('Gateway payment config must load before models.')
      return
    }
    if (!allowanceReady) {
      setModels([])
      setSelectedModelId('')
      setStatus('needs-wallet')
      setStatusMessage(allowanceDecision.message)
      return
    }

    setStatus('loading-models')
    setStatusMessage('Sign a low-cost wallet authorization to load available models.')
    try {
      const nextModels = await loadWalletChatModels({
        gatewayUrl: CLAWFARM_GATEWAY_URL,
        walletPubkey: walletAddress,
        chain: paymentChain,
        signMessage,
      })
      setModels(nextModels)
      setSelectedModelId((current) => (nextModels.some((model) => model.id === current) ? current : nextModels[0]?.id || ''))
      setStatus(nextModels.length > 0 ? 'ready' : 'error')
      setStatusMessage(
        nextModels.length > 0
          ? 'Models loaded. Start a bounded payment session before sending.'
          : 'No OpenAI-compatible wallet chat models are available from this Gateway.'
      )
    } catch (error) {
      console.error('Failed to load ClawFarm wallet chat models', error)
      setModels([])
      setSelectedModelId('')
      setStatus('error')
      setStatusMessage(normalizeError(error))
    }
  }, [allowanceDecision.message, allowanceReady, canSignMessages, chainConfig, gatewayConfigured, paymentChain, signMessage, walletAddress])

  useEffect(() => {
    void loadModels()
  }, [loadModels])

  useEffect(() => {
    if (!sessionStorageKey || !walletAddress || !gatewayConfigured) {
      setPaymentSession(null)
      setSessionMessage('')
      return
    }

    try {
      const stored = sessionStorage.getItem(sessionStorageKey)
      if (!stored) {
        setPaymentSession(null)
        setSessionMessage('')
        return
      }

      const parsed = JSON.parse(stored) as WalletPaymentSession
      const matchesScope = parsed.wallet === walletAddress && parsed.chain === paymentChain && parsed.protocol === 'openai-completions'
      if (!matchesScope || !isWalletPaymentSessionReady(parsed)) {
        sessionStorage.removeItem(sessionStorageKey)
        setPaymentSession(null)
        setSessionMessage(matchesScope ? 'Previous payment session expired. Start a new session.' : '')
        return
      }

      setPaymentSession(parsed)
      setSessionMessage('Restored active payment session for this wallet.')
    } catch (error) {
      console.error('Failed to restore ClawFarm payment session', error)
      sessionStorage.removeItem(sessionStorageKey)
      setPaymentSession(null)
      setSessionMessage('')
    }
  }, [gatewayConfigured, paymentChain, sessionStorageKey, walletAddress])

  const handleSend = useCallback(async () => {
    const prompt = inputDraft.trim()
    if (!prompt) {
      setStatus('error')
      setStatusMessage('Enter a prompt before sending.')
      return
    }
    if (!walletAddress) {
      setStatus('needs-wallet')
      setStatusMessage('Connect a Solana wallet before sending ClawFarm chat requests.')
      return
    }
    if (!gatewayConfigured) {
      setStatus('missing-config')
      setStatusMessage('NEXT_PUBLIC_CLAWFARM_GATEWAY_URL is not configured for this static build.')
      return
    }
    if (!selectedModelId) {
      setStatus('error')
      setStatusMessage('Choose a model before sending.')
      return
    }
    if (!allowanceReady) {
      setStatus('needs-wallet')
      setStatusMessage(allowanceDecision.message)
      return
    }
    if (!paymentSession || !sessionReady) {
      setStatus('needs-wallet')
      setStatusMessage('Start a ClawFarm payment session before sending messages.')
      return
    }

    const userMessage = newMessage('user', prompt)
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInputDraft('')
    setStatus('sending')
    setStatusMessage('Sending through the active ClawFarm payment session.')

    try {
      const result = await sendWalletChatCompletion({
        gatewayUrl: CLAWFARM_GATEWAY_URL,
        walletPubkey: walletAddress,
        chain: paymentChain,
        model: selectedModelId,
        maxTokens: Number(maxTokens),
        maxChargeAtomic,
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
        session: paymentSession,
        walletPaymentConfig,
      })
      setMessages((current) => [...current, newMessage('assistant', result.assistantContent)])
      setMetadata(result.metadata)
      setPaymentSession((current) => {
        if (!current) return current
        const nextSession = mergeSessionMetadata(current, result.metadata)
        if (sessionStorageKey) sessionStorage.setItem(sessionStorageKey, JSON.stringify(nextSession))
        return nextSession
      })
      setStatus('ready')
      setStatusMessage('Assistant response received through the active payment session.')
    } catch (error) {
      console.error('ClawFarm wallet chat send failed', error)
      if (error instanceof WalletChatError && /allowance|settlement|insufficient/i.test(error.message)) {
        void refreshAllowance()
      }
      if (isWalletPaymentSessionRenewalError(error)) {
        if (sessionStorageKey) sessionStorage.removeItem(sessionStorageKey)
        setPaymentSession(null)
        setSessionMessage('Payment session expired or ran out of budget. Start a new session to continue.')
      }
      if (isUnsupportedWalletChatModelError(error)) {
        setModels((current) => {
          const nextModels = current.filter((model) => model.id !== selectedModelId)
          setSelectedModelId(nextModels[0]?.id || '')
          return nextModels
        })
        setMetadata(EMPTY_METADATA)
        setStatus('error')
        setStatusMessage(`${selectedModelId} is listed by the Gateway but rejected by the provider. I removed it from this page; choose another model and retry.`)
        return
      }
      setMetadata(EMPTY_METADATA)
      setStatus('error')
      setStatusMessage(normalizeError(error))
    }
  }, [
    allowanceDecision.message,
    allowanceReady,
    gatewayConfigured,
    inputDraft,
    maxChargeAtomic,
    maxTokens,
    messages,
    paymentSession,
    paymentChain,
    refreshAllowance,
    selectedModelId,
    sessionReady,
    sessionStorageKey,
    walletAddress,
    walletPaymentConfig,
  ])

  const handleStartSession = useCallback(async () => {
    if (!walletAddress || !canSignMessages || !signMessage) {
      setSessionMessage('Connect a wallet that supports message signing to start a payment session.')
      return
    }
    if (!allowanceReady) {
      setSessionMessage('Approve the ClawFarm delegate before starting a payment session.')
      return
    }

    setSessionBusy(true)
    setSessionMessage('Sign once to start a bounded ClawFarm payment session.')
    try {
      const session = await createWalletPaymentSession({
        gatewayUrl: CLAWFARM_GATEWAY_URL,
        walletPubkey: walletAddress,
        chain: paymentChain,
        maxPerRequestAtomic: requiredChargeAtomic,
        totalBudgetAtomic: boundedSessionBudget(requiredChargeAtomic, allowanceSnapshot.delegatedAmountAtomic),
        maxRequests: 50,
        signMessage,
      })
      setPaymentSession(session)
      if (sessionStorageKey) sessionStorage.setItem(sessionStorageKey, JSON.stringify(session))
      setSessionMessage('Payment session active. Messages will not request another wallet signature while it remains valid.')
      setStatus('ready')
      setStatusMessage('Payment session active. Send a message when ready.')
    } catch (error) {
      console.error('Start ClawFarm payment session failed', error)
      setPaymentSession(null)
      if (sessionStorageKey) sessionStorage.removeItem(sessionStorageKey)
      setSessionMessage(normalizeError(error))
    } finally {
      setSessionBusy(false)
    }
  }, [
    allowanceReady,
    allowanceSnapshot.delegatedAmountAtomic,
    canSignMessages,
    paymentChain,
    requiredChargeAtomic,
    sessionStorageKey,
    signMessage,
    walletAddress,
  ])

  const handleApproveAllowance = useCallback(async () => {
    if (!wallet.publicKey || !chainConfig || !canApproveAllowance || !signTransaction) {
      setApprovalMessage('Connect a wallet that can send approval transactions.')
      return
    }

    setApprovalBusy(true)
    setApprovalMessage('Approve the ClawFarm delegate in your wallet.')
    setApprovalSignature(null)
    try {
      const amountAtomic = approvalAmountForRequiredCap(requiredChargeAtomic, chainConfig.usdc_decimals)
      const signature = await approveDelegateAllowance({
        connection,
        walletPublicKey: wallet.publicKey,
        signTransaction,
        usdcMint: chainConfig.usdc_mint,
        usdcDecimals: chainConfig.usdc_decimals,
        paymentDelegate: chainConfig.payment_delegate,
        amountAtomic,
      })
      setApprovalSignature(signature)
      setApprovalMessage('Approval confirmed. Refreshing allowance.')
      await refreshAllowance(chainConfig)
    } catch (error) {
      console.error('Approve ClawFarm allowance failed', error)
      setApprovalMessage(normalizeError(error))
    } finally {
      setApprovalBusy(false)
    }
  }, [canApproveAllowance, chainConfig, connection, refreshAllowance, requiredChargeAtomic, signTransaction, wallet.publicKey])

  const clearSession = useCallback(() => {
    setMessages([])
    setInputDraft('')
    setMetadata(EMPTY_METADATA)
    setStatus(gatewayConfigured ? (walletAddress ? 'ready' : 'needs-wallet') : 'missing-config')
    setStatusMessage(walletAddress ? 'Chat cleared. Active payment session kept for new messages.' : 'Connect a wallet to start a fresh chat session.')
  }, [gatewayConfigured, walletAddress])

  return (
    <section className="wallet-chat-shell" aria-labelledby="wallet-chat-title">
      <div className="wallet-chat-hero">
        <div>
          <div className="wallet-chat-kicker">Wallet-native inference</div>
          <h1 id="wallet-chat-title">Chat through ClawFarm Gateway.</h1>
          <p>
            Connect a Solana wallet, sign one bounded payment session in-browser, and send non-streaming
            OpenAI-compatible requests without repeated wallet prompts.
          </p>
        </div>
        <div className="wallet-chat-hero-actions">
          <Link href="/devnet" className="wallet-chat-ghost-link">Devnet faucet</Link>
          <button type="button" className="wallet-chat-ghost-link" onClick={loadModels} disabled={busy || !walletAddress || !gatewayConfigured}>
            Reload models
          </button>
        </div>
      </div>

      <div className="wallet-chat-grid">
        <aside className="wallet-chat-control" aria-label="Chat controls">
          <div className="wallet-chat-status-card" data-status={status}>
            <span>Status</span>
            <strong>{status === 'ready' ? 'Ready' : status.replace(/-/g, ' ')}</strong>
            <p>{statusMessage}</p>
            {!walletAddress ? (
              <button type="button" className="wallet-chat-primary" onClick={() => setVisible(true)}>
                Connect wallet
              </button>
            ) : null}
          </div>

          <div className="wallet-chat-fieldset">
            <label>
              <span>Gateway</span>
              <output>{gatewayConfigured ? CLAWFARM_GATEWAY_URL : 'Missing NEXT_PUBLIC_CLAWFARM_GATEWAY_URL'}</output>
            </label>
            <label>
              <span>Wallet / chain</span>
              <output>{walletAddress ? `${shortAddress(walletAddress)} · ${paymentChain}` : `${network.shortLabel} · disconnected`}</output>
            </label>
          </div>

          <div className="wallet-chat-allowance" data-status={allowanceDecision.status}>
            <span>Payment allowance</span>
            <strong>{allowanceDecision.status === 'ready' ? 'Allowance ready' : 'Approval required'}</strong>
            <p>{allowanceDecision.message}</p>
            {chainConfig ? (
              <div className="wallet-chat-allowance-grid">
                <small>Mint</small>
                <code>{shortAddress(chainConfig.usdc_mint)}</code>
                <small>Delegate</small>
                <code>{shortAddress(chainConfig.payment_delegate)}</code>
                <small>Delegated</small>
                <code>{allowanceSnapshot.delegatedAmountAtomic}</code>
              </div>
            ) : null}
            {allowanceDecision.status !== 'ready' && walletAddress && chainConfig ? (
              <button type="button" className="wallet-chat-primary" onClick={handleApproveAllowance} disabled={busy || !canApproveAllowance}>
                {approvalBusy ? 'Approving...' : 'Approve ClawFarm spending'}
              </button>
            ) : null}
            {allowanceDecision.status === 'missing-token-account' ? (
              <Link href="/devnet?cluster=devnet" className="wallet-chat-inline-link">Get Test USDC from faucet</Link>
            ) : null}
            {approvalMessage ? <p className="wallet-chat-hint">{approvalMessage}</p> : null}
            {approvalSignature ? (
              <a className="wallet-chat-inline-link" href={`https://solscan.io/tx/${encodeURIComponent(approvalSignature)}?cluster=devnet`} target="_blank" rel="noreferrer">
                View approval transaction
              </a>
            ) : null}
          </div>

          <div className="wallet-chat-session" data-status={sessionReady ? 'ready' : 'inactive'}>
            <span>Payment session</span>
            <strong>{sessionReady ? 'Session active' : 'Session required'}</strong>
            <p>
              {sessionMessage ||
                (sessionReady
                  ? 'Messages use this session without another wallet signature.'
                  : 'Start a bounded session before sending messages.')}
            </p>
            {paymentSession ? (
              <div className="wallet-chat-allowance-grid">
                <small>Budget</small>
                <code>{paymentSession.spentAtomic}/{paymentSession.totalBudgetAtomic}</code>
                <small>Requests</small>
                <code>{paymentSession.requestsUsed}/{paymentSession.maxRequests}</code>
                <small>Expires</small>
                <code>{new Date(paymentSession.expiresAt * 1000).toLocaleTimeString()}</code>
              </div>
            ) : null}
            {!sessionReady && walletAddress && allowanceReady ? (
              <button type="button" className="wallet-chat-primary" onClick={handleStartSession} disabled={busy || !canSignMessages}>
                {sessionBusy ? 'Starting...' : 'Start chat session'}
              </button>
            ) : null}
          </div>

          <div className="wallet-chat-fieldset">
            <label>
              <span>Model</span>
              <select value={selectedModelId} onChange={(event) => setSelectedModelId(event.target.value)} disabled={busy || models.length === 0}>
                {models.length === 0 ? <option value="">No models loaded</option> : null}
                {models.map((model) => (
                  <option key={model.id} value={model.id}>{model.name || model.id}</option>
                ))}
              </select>
            </label>
            {selectedModel ? (
              <p className="wallet-chat-hint">
                {selectedModel.id}
                {selectedModel.owned_by ? ` · ${selectedModel.owned_by}` : ''}
              </p>
            ) : null}
          </div>

          <div className="wallet-chat-fieldset wallet-chat-controls-two">
            <label>
              <span>Max tokens</span>
              <input
                inputMode="numeric"
                max={effectiveMaxOutputTokens}
                min={1}
                value={maxTokens}
                onChange={(event) => setMaxTokens(event.target.value)}
              />
            </label>
            <label>
              <span>Max charge</span>
              <input
                inputMode="numeric"
                value={maxChargeAtomic}
                onChange={(event) => {
                  setMaxChargeEdited(true)
                  setMaxChargeAtomic(event.target.value)
                }}
              />
            </label>
          </div>
          <p className="wallet-chat-hint">
            Max charge is estimated from selected model pricing and Max tokens; manual edits are preserved. Unit: Test USDC atomic; 1,000,000 = 1 Test USDC.
            {maxChargeEdited ? (
              <button type="button" className="wallet-chat-text-button" onClick={() => setMaxChargeEdited(false)} disabled={busy}>
                Use estimate {estimatedMaxChargeAtomic}
              </button>
            ) : null}
          </p>

          <div className="wallet-chat-metadata" aria-label="Latest payment metadata">
            <span>Latest Gateway headers</span>
            {metadataRows(metadata).map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <code>{value || '—'}</code>
              </div>
            ))}
          </div>
        </aside>

        <div className="wallet-chat-workspace">
          <div className="wallet-chat-thread" aria-live="polite">
            {messages.length === 0 ? (
              <div className="wallet-chat-empty">
                <span>Fresh session</span>
                <p>No chat history is stored. Refreshing this static page clears the conversation.</p>
              </div>
            ) : (
              messages.map((message) => (
                <article className="wallet-chat-message" data-role={message.role} key={message.id}>
                  <span>{message.role}</span>
                  <p>{message.content}</p>
                </article>
              ))
            )}
          </div>

          <div className="wallet-chat-composer">
            <textarea
              value={inputDraft}
              onChange={(event) => setInputDraft(event.target.value)}
              placeholder="Ask a ClawFarm-routed model..."
              rows={4}
              disabled={!walletAddress || busy}
            />
            <div className="wallet-chat-composer-actions">
              <button type="button" className="wallet-chat-secondary" onClick={clearSession} disabled={busy || messages.length === 0}>
                Clear session
              </button>
              <button type="button" className="wallet-chat-primary" onClick={handleSend} disabled={!canSend}>
                {busy ? 'Working...' : 'Send with session'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
