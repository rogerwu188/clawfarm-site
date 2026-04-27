'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useNetwork } from '@/app/components/NetworkProvider'
import { requestGatewayFaucetClaim, normalizeRecipientAddress } from '@/app/lib/devnet-faucet/api'
import { validateFaucetClaimInput } from '@/app/lib/devnet-faucet/amounts'
import {
  DEVNET_FAUCET_API_URL,
  DEVNET_FAUCET_LIMITS,
  solscanDevnetTxUrl,
} from '@/app/lib/devnet-faucet/constants'
import { normalizeFaucetError } from '@/app/lib/devnet-faucet/errors'

type ClaimPhase = 'idle' | 'validating' | 'requesting' | 'confirming' | 'success' | 'error'

type ClaimStatus = {
  phase: ClaimPhase
  message: string
  signature: string | null
}

const DEFAULT_STATUS: ClaimStatus = {
  phase: 'idle',
  message: 'Ready to request devnet faucet tokens through the Gateway.',
  signature: null,
}

function waitForStatusPaint(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 420)
  })
}

function shortenAddress(value: string): string {
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function getStatusLabel(phase: ClaimPhase): string {
  switch (phase) {
    case 'validating':
      return 'Validating'
    case 'requesting':
      return 'Gateway request'
    case 'confirming':
      return 'Confirming'
    case 'success':
      return 'Confirmed'
    case 'error':
      return 'Needs attention'
    default:
      return 'Ready'
  }
}

function getRecipientValidationMessage(recipient: string): string | null {
  try {
    normalizeRecipientAddress(recipient)
    return null
  } catch (error) {
    return normalizeFaucetError(error)
  }
}

export default function DevnetFaucetCard() {
  const wallet = useWallet()
  const { networkId } = useNetwork()
  const [customOpen, setCustomOpen] = useState(false)
  const [recipientDraft, setRecipientDraft] = useState('')
  const [clawAmount, setClawAmount] = useState<string>(DEVNET_FAUCET_LIMITS.defaultClaw)
  const [usdcAmount, setUsdcAmount] = useState<string>(DEVNET_FAUCET_LIMITS.defaultUsdc)
  const [status, setStatus] = useState<ClaimStatus>(DEFAULT_STATUS)

  const walletAddress = wallet.publicKey?.toBase58() ?? null
  const isDevnet = networkId === 'devnet'
  const faucetApiConfigured = DEVNET_FAUCET_API_URL.trim().length > 0

  useEffect(() => {
    if (walletAddress && !recipientDraft.trim()) {
      setRecipientDraft(walletAddress)
    }
  }, [recipientDraft, walletAddress])

  const amountValidation = useMemo(
    () =>
      validateFaucetClaimInput({
        clawAmount,
        usdcAmount,
        maxClawPerClaim: DEVNET_FAUCET_LIMITS.maxClawPerClaim,
        maxUsdcPerClaim: DEVNET_FAUCET_LIMITS.maxUsdcPerClaim,
      }),
    [clawAmount, usdcAmount]
  )

  const recipientValidationMessage = useMemo(
    () => getRecipientValidationMessage(recipientDraft),
    [recipientDraft]
  )

  const busy = status.phase === 'validating' || status.phase === 'requesting' || status.phase === 'confirming'
  const canClaim = isDevnet && faucetApiConfigured && !busy && !recipientValidationMessage && amountValidation.ok

  const requestClaim = useCallback(
    async (input: { clawAmount: string; usdcAmount: string; successMessage: string }) => {
      setStatus({ phase: 'validating', message: 'Checking recipient address and claim amounts.', signature: null })

      if (!isDevnet) {
        setStatus({ phase: 'error', message: 'Switch to Devnet before requesting faucet tokens.', signature: null })
        return
      }

      if (!faucetApiConfigured) {
        setStatus({ phase: 'error', message: 'Devnet faucet API is not configured for this build.', signature: null })
        return
      }

      const validation = validateFaucetClaimInput({
        clawAmount: input.clawAmount,
        usdcAmount: input.usdcAmount,
        maxClawPerClaim: DEVNET_FAUCET_LIMITS.maxClawPerClaim,
        maxUsdcPerClaim: DEVNET_FAUCET_LIMITS.maxUsdcPerClaim,
      })
      if (!validation.ok) {
        setStatus({ phase: 'error', message: validation.message, signature: null })
        return
      }

      try {
        const recipient = normalizeRecipientAddress(recipientDraft)
        setStatus({ phase: 'requesting', message: 'Requesting a Gateway-sponsored devnet claim.', signature: null })
        const result = await requestGatewayFaucetClaim({
          recipient,
          clawAmount: input.clawAmount,
          usdcAmount: input.usdcAmount,
        })
        setStatus({ phase: 'confirming', message: 'Gateway submitted the devnet transaction. Finalizing receipt.', signature: result.signature })
        await waitForStatusPaint()
        setStatus({ phase: 'success', message: input.successMessage, signature: result.signature })
      } catch (error) {
        console.error('Devnet faucet claim failed', error)
        setStatus({ phase: 'error', message: normalizeFaucetError(error), signature: null })
      }
    },
    [faucetApiConfigured, isDevnet, recipientDraft]
  )

  const handleDefaultClaim = useCallback(async () => {
    setClawAmount(DEVNET_FAUCET_LIMITS.defaultClaw)
    setUsdcAmount(DEVNET_FAUCET_LIMITS.defaultUsdc)
    await requestClaim({
      clawAmount: DEVNET_FAUCET_LIMITS.defaultClaw,
      usdcAmount: DEVNET_FAUCET_LIMITS.defaultUsdc,
      successMessage: 'Gateway claim confirmed on devnet. Tokens should appear in the recipient wallet shortly.',
    })
  }, [requestClaim])

  const handleCustomClaim = useCallback(async () => {
    if (!amountValidation.ok) {
      setStatus({ phase: 'error', message: amountValidation.message, signature: null })
      return
    }

    await requestClaim({
      clawAmount,
      usdcAmount,
      successMessage: 'Custom Gateway claim confirmed on devnet.',
    })
  }, [amountValidation, clawAmount, requestClaim, usdcAmount])

  const useConnectedWallet = useCallback(() => {
    if (walletAddress) {
      setRecipientDraft(walletAddress)
      setStatus(DEFAULT_STATUS)
    }
  }, [walletAddress])

  return (
    <section className="devnet-faucet-card" aria-labelledby="devnet-faucet-title">
      <div className="devnet-faucet-header">
        <div>
          <div className="devnet-faucet-kicker">Devnet faucet</div>
          <h2 id="devnet-faucet-title">Fund a test recipient through the Gateway.</h2>
          <p>
            Claim disposable CLAW and Test USDC on Solana devnet. The Gateway sponsors the transaction, so your wallet only supplies a recipient public key and never authorizes the faucet transfer.
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
            <span>{walletAddress ? 'Connected wallet' : 'Recipient address'}</span>
            <strong>{walletAddress ? shortenAddress(walletAddress) : 'Paste any Solana address'}</strong>
            <small>
              {walletAddress
                ? 'Use the connected wallet as recipient, or paste a different devnet recipient below.'
                : 'Wallet connection is optional. The Gateway claim only needs a recipient public key.'}
            </small>
          </div>

          <div className="devnet-faucet-default">
            <div>
              <span>Default allocation</span>
              <strong className="devnet-faucet-allocation">
                <span>{DEVNET_FAUCET_LIMITS.defaultClaw} CLAW</span>
                <span aria-hidden="true">+</span>
                <span>{DEVNET_FAUCET_LIMITS.defaultUsdc} Test USDC</span>
              </strong>
            </div>
            <button className="devnet-faucet-claim" type="button" onClick={handleDefaultClaim} disabled={!canClaim}>
              {busy ? 'Claim in progress' : 'Request sponsored claim'}
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
        <div className="devnet-faucet-fieldset devnet-faucet-recipient" aria-labelledby="devnet-faucet-recipient-label">
          <div id="devnet-faucet-recipient-label" className="devnet-faucet-fieldset-title">Recipient</div>
          <label>
            <span>Solana public key</span>
            <input
              type="text"
              value={recipientDraft}
              onChange={(event) => setRecipientDraft(event.target.value)}
              placeholder="Paste recipient wallet address"
              spellCheck={false}
              aria-invalid={Boolean(recipientValidationMessage)}
            />
          </label>
          <div className="devnet-faucet-recipient-actions">
            <p className={recipientValidationMessage || !faucetApiConfigured || !isDevnet ? 'devnet-faucet-error' : 'devnet-faucet-hint'}>
              {!isDevnet
                ? 'Switch to Devnet before requesting faucet tokens.'
                : !faucetApiConfigured
                  ? 'Devnet faucet API is not configured for this build.'
                  : recipientValidationMessage || 'Gateway pays fees. Tokens are sent to recipient-owned token accounts.'}
            </p>
            {walletAddress ? (
              <button className="devnet-faucet-link-button" type="button" onClick={useConnectedWallet} disabled={busy}>
                Use connected wallet
              </button>
            ) : null}
          </div>
        </div>

        <button
          className="devnet-faucet-toggle"
          type="button"
          aria-expanded={customOpen}
          aria-controls="devnet-faucet-custom"
          onClick={() => setCustomOpen((open) => !open)}
        >
          <span>{customOpen ? 'Hide custom amounts' : 'Custom amounts'}</span>
          <span aria-hidden="true">{customOpen ? '-' : '+'}</span>
        </button>

        <div id="devnet-faucet-custom" className="devnet-faucet-collapsible" data-open={customOpen} aria-hidden={!customOpen}>
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
                  aria-invalid={!amountValidation.ok}
                />
              </label>
              <label>
                <span>Test USDC</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={usdcAmount}
                  onChange={(event) => setUsdcAmount(event.target.value)}
                  aria-invalid={!amountValidation.ok}
                />
              </label>
              <p className={amountValidation.ok ? 'devnet-faucet-hint' : 'devnet-faucet-error'}>
                {amountValidation.ok
                  ? `Per claim limit: ${DEVNET_FAUCET_LIMITS.maxClawPerClaim} CLAW and ${DEVNET_FAUCET_LIMITS.maxUsdcPerClaim} Test USDC.`
                  : amountValidation.message}
              </p>
              <button className="devnet-faucet-secondary" type="button" onClick={handleCustomClaim} disabled={!canClaim}>
                Request custom claim
              </button>
            </div>

            <div className="devnet-faucet-fieldset" aria-labelledby="devnet-faucet-gateway-label">
              <div id="devnet-faucet-gateway-label" className="devnet-faucet-fieldset-title">Gateway model</div>
              <p className="devnet-faucet-hint">
                The Gateway submits the separated-account claim: recipient as <code>user</code>, Gateway as <code>payer</code>, and masterpool PDA as vault authority.
              </p>
              <p className="devnet-faucet-hint">
                Wallet daily limits stay keyed to the recipient address because the on-chain <code>faucet_user</code> PDA uses the recipient public key.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
