'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { validateFaucetClaimInput } from '@/app/lib/devnet-faucet/amounts'
import { claimDevnetFaucet } from '@/app/lib/devnet-faucet/client'
import {
  DEVNET_DEFAULT_RPC_URL,
  DEVNET_FAUCET_LIMITS,
  solscanDevnetTxUrl,
} from '@/app/lib/devnet-faucet/constants'
import { normalizeFaucetError } from '@/app/lib/devnet-faucet/errors'
import {
  assertDevnetRpcHealthy,
  clearStoredDevnetRpcUrl,
  createDevnetConnection,
  getInitialDevnetRpcUrl,
  writeStoredDevnetRpcUrl,
} from '@/app/lib/devnet-faucet/rpc'

type ClaimPhase = 'idle' | 'preparing' | 'signing' | 'confirming' | 'success' | 'error'

type ClaimStatus = {
  phase: ClaimPhase
  message: string
  signature: string | null
}

const DEFAULT_STATUS: ClaimStatus = {
  phase: 'idle',
  message: 'Ready to request devnet faucet tokens.',
  signature: null,
}

function waitForStatusPaint(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 420)
  })
}

function shortenAddress(value: string): string {
  return `${value.slice(0, 4)}…${value.slice(-4)}`
}

function getStatusLabel(phase: ClaimPhase): string {
  switch (phase) {
    case 'preparing':
      return 'Preparing'
    case 'signing':
      return 'Wallet signature'
    case 'confirming':
      return 'Confirming'
    case 'success':
      return 'Confirmed'
    case 'error':
      return 'Needs attention'
    default:
      return 'Idle'
  }
}

export default function DevnetFaucetCard() {
  const wallet = useWallet()
  const [customOpen, setCustomOpen] = useState(false)
  const [rpcDraft, setRpcDraft] = useState(DEVNET_DEFAULT_RPC_URL)
  const [selectedRpcUrl, setSelectedRpcUrl] = useState(DEVNET_DEFAULT_RPC_URL)
  const [rpcMessage, setRpcMessage] = useState('Using the default Solana devnet RPC.')
  const [rpcChecking, setRpcChecking] = useState(false)
  const [clawAmount, setClawAmount] = useState<string>(DEVNET_FAUCET_LIMITS.defaultClaw)
  const [usdcAmount, setUsdcAmount] = useState<string>(DEVNET_FAUCET_LIMITS.defaultUsdc)
  const [status, setStatus] = useState<ClaimStatus>(DEFAULT_STATUS)

  useEffect(() => {
    const initialRpcUrl = getInitialDevnetRpcUrl()
    setSelectedRpcUrl(initialRpcUrl)
    setRpcDraft(initialRpcUrl)
    setRpcMessage(
      initialRpcUrl === DEVNET_DEFAULT_RPC_URL
        ? 'Using the default Solana devnet RPC.'
        : 'Using your saved devnet RPC endpoint.'
    )
  }, [])

  const walletAddress = wallet.publicKey?.toBase58() ?? null
  const validation = useMemo(
    () =>
      validateFaucetClaimInput({
        clawAmount,
        usdcAmount,
        maxClawPerClaim: DEVNET_FAUCET_LIMITS.maxClawPerClaim,
        maxUsdcPerClaim: DEVNET_FAUCET_LIMITS.maxUsdcPerClaim,
      }),
    [clawAmount, usdcAmount]
  )
  const busy = status.phase === 'preparing' || status.phase === 'signing' || status.phase === 'confirming'
  const canClaim = Boolean(wallet.publicKey) && !busy && validation.ok

  const handleDefaultClaim = useCallback(async () => {
    setClawAmount(DEVNET_FAUCET_LIMITS.defaultClaw)
    setUsdcAmount(DEVNET_FAUCET_LIMITS.defaultUsdc)

    const defaultValidation = validateFaucetClaimInput({
      clawAmount: DEVNET_FAUCET_LIMITS.defaultClaw,
      usdcAmount: DEVNET_FAUCET_LIMITS.defaultUsdc,
      maxClawPerClaim: DEVNET_FAUCET_LIMITS.maxClawPerClaim,
      maxUsdcPerClaim: DEVNET_FAUCET_LIMITS.maxUsdcPerClaim,
    })
    if (!defaultValidation.ok) {
      setStatus({ phase: 'error', message: defaultValidation.message, signature: null })
      return
    }

    setStatus({ phase: 'preparing', message: 'Checking the selected devnet RPC and assembling token accounts.', signature: null })
    try {
      await assertDevnetRpcHealthy(selectedRpcUrl)
      const connection = createDevnetConnection(selectedRpcUrl)
      setStatus({ phase: 'signing', message: 'Open your wallet to sign the devnet faucet transaction.', signature: null })
      const signature = await claimDevnetFaucet({
        connection,
        wallet,
        clawBaseUnits: defaultValidation.clawBaseUnits,
        usdcBaseUnits: defaultValidation.usdcBaseUnits,
      })
      setStatus({ phase: 'confirming', message: 'Devnet confirmation received. Finalizing faucet receipt.', signature })
      await waitForStatusPaint()
      setStatus({ phase: 'success', message: 'Claim confirmed on devnet. Tokens should appear in your wallet shortly.', signature })
    } catch (error) {
      setStatus({ phase: 'error', message: normalizeFaucetError(error), signature: null })
    }
  }, [selectedRpcUrl, wallet])

  const handleCustomClaim = useCallback(async () => {
    if (!validation.ok) {
      setStatus({ phase: 'error', message: validation.message, signature: null })
      return
    }

    setStatus({ phase: 'preparing', message: 'Validating amounts, RPC health, and faucet account setup.', signature: null })
    try {
      await assertDevnetRpcHealthy(selectedRpcUrl)
      const connection = createDevnetConnection(selectedRpcUrl)
      setStatus({ phase: 'signing', message: 'Approve the custom devnet claim in your wallet.', signature: null })
      const signature = await claimDevnetFaucet({
        connection,
        wallet,
        clawBaseUnits: validation.clawBaseUnits,
        usdcBaseUnits: validation.usdcBaseUnits,
      })
      setStatus({ phase: 'confirming', message: 'Devnet confirmation received. Finalizing custom receipt.', signature })
      await waitForStatusPaint()
      setStatus({ phase: 'success', message: 'Custom claim confirmed on devnet.', signature })
    } catch (error) {
      setStatus({ phase: 'error', message: normalizeFaucetError(error), signature: null })
    }
  }, [selectedRpcUrl, validation, wallet])

  const handleSaveRpc = useCallback(async () => {
    setRpcChecking(true)
    setRpcMessage('Checking devnet RPC health…')
    try {
      await assertDevnetRpcHealthy(rpcDraft)
      const trimmedRpcUrl = rpcDraft.trim()
      writeStoredDevnetRpcUrl(trimmedRpcUrl)
      setSelectedRpcUrl(trimmedRpcUrl)
      setRpcDraft(trimmedRpcUrl)
      setRpcMessage('Saved. Faucet claims now use this component-local devnet connection.')
    } catch (error) {
      setRpcMessage(normalizeFaucetError(error))
    } finally {
      setRpcChecking(false)
    }
  }, [rpcDraft])

  const handleResetRpc = useCallback(() => {
    clearStoredDevnetRpcUrl()
    setSelectedRpcUrl(DEVNET_DEFAULT_RPC_URL)
    setRpcDraft(DEVNET_DEFAULT_RPC_URL)
    setRpcMessage('Reset to the default Solana devnet RPC.')
  }, [])

  return (
    <section className="devnet-faucet-card" aria-labelledby="devnet-faucet-title">
      <div className="devnet-faucet-header">
        <div>
          <div className="devnet-faucet-kicker">Devnet faucet</div>
          <h2 id="devnet-faucet-title">Prime a wallet for settlement tests.</h2>
          <p>
            Claim disposable CLAW and Test USDC on Solana devnet. The transaction is wallet-signed and verified against the RPC endpoint selected here.
          </p>
        </div>
        <div className="devnet-faucet-network" aria-label="Network selection">
          <span className="devnet-faucet-led" aria-hidden="true" />
          Devnet only
        </div>
      </div>

      <div className="devnet-faucet-body">
        <div className="devnet-faucet-primary">
          <div className="devnet-faucet-wallet" data-connected={Boolean(walletAddress)}>
            <span>{walletAddress ? 'Connected wallet' : 'Wallet required'}</span>
            <strong>{walletAddress ? shortenAddress(walletAddress) : 'Connect before claiming'}</strong>
            <small>
              {walletAddress
                ? 'This wallet signs the faucet claim and receives both token accounts.'
                : 'Use the header wallet control, then return here for a one-click devnet claim.'}
            </small>
          </div>

          <div className="devnet-faucet-default">
            <div>
              <span>Default allocation</span>
              <strong>{DEVNET_FAUCET_LIMITS.defaultClaw} CLAW + {DEVNET_FAUCET_LIMITS.defaultUsdc} Test USDC</strong>
            </div>
            <button className="devnet-faucet-claim" type="button" onClick={handleDefaultClaim} disabled={!wallet.publicKey || busy}>
              {busy ? 'Claim in progress' : 'Claim default tokens'}
            </button>
          </div>
        </div>

        <div className="devnet-faucet-status" data-phase={status.phase} role="status" aria-live="polite">
          <span>{getStatusLabel(status.phase)}</span>
          <p>{status.message}</p>
          {status.signature ? (
            <a href={solscanDevnetTxUrl(status.signature)} target="_blank" rel="noreferrer">
              View devnet transaction on Solscan
            </a>
          ) : null}
        </div>
      </div>

      <div className="devnet-faucet-tools">
        <button
          className="devnet-faucet-toggle"
          type="button"
          aria-expanded={customOpen}
          aria-controls="devnet-faucet-custom"
          onClick={() => setCustomOpen((open) => !open)}
        >
          <span>{customOpen ? 'Hide custom controls' : 'Custom amounts and RPC'}</span>
          <span aria-hidden="true">{customOpen ? '−' : '+'}</span>
        </button>

        <div id="devnet-faucet-custom" className="devnet-faucet-collapsible" data-open={customOpen} inert={!customOpen}>
          <div className="devnet-faucet-custom-grid">
            <div className="devnet-faucet-fieldset" aria-labelledby="devnet-faucet-amounts-label">
              <div id="devnet-faucet-amounts-label" className="devnet-faucet-fieldset-title">Claim amounts</div>
              <label>
                <span>CLAW</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={clawAmount}
                  onChange={(event) => setClawAmount(event.target.value)}
                  aria-invalid={!validation.ok}
                />
              </label>
              <label>
                <span>Test USDC</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={usdcAmount}
                  onChange={(event) => setUsdcAmount(event.target.value)}
                  aria-invalid={!validation.ok}
                />
              </label>
              <p className={validation.ok ? 'devnet-faucet-hint' : 'devnet-faucet-error'}>
                {validation.ok
                  ? `Per claim limit: ${DEVNET_FAUCET_LIMITS.maxClawPerClaim} CLAW and ${DEVNET_FAUCET_LIMITS.maxUsdcPerClaim} Test USDC.`
                  : validation.message}
              </p>
              <button className="devnet-faucet-secondary" type="button" onClick={handleCustomClaim} disabled={!canClaim}>
                Claim custom amounts
              </button>
            </div>

            <div className="devnet-faucet-fieldset" aria-labelledby="devnet-faucet-rpc-label">
              <div id="devnet-faucet-rpc-label" className="devnet-faucet-fieldset-title">Component RPC</div>
              <label>
                <span>Devnet endpoint</span>
                <input
                  type="url"
                  value={rpcDraft}
                  onChange={(event) => setRpcDraft(event.target.value)}
                  placeholder={DEVNET_DEFAULT_RPC_URL}
                  spellCheck={false}
                />
              </label>
              <p className="devnet-faucet-hint">Active: {selectedRpcUrl}</p>
              <p className="devnet-faucet-rpc-message">{rpcMessage}</p>
              <div className="devnet-faucet-rpc-actions">
                <button className="devnet-faucet-secondary" type="button" onClick={handleSaveRpc} disabled={rpcChecking || busy}>
                  {rpcChecking ? 'Checking RPC' : 'Save RPC'}
                </button>
                <button className="devnet-faucet-link-button" type="button" onClick={handleResetRpc} disabled={rpcChecking || busy}>
                  Reset default
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
