import { FaucetGatewayError } from './api'

const GATEWAY_ERROR_MESSAGES: Record<string, string> = {
  FAUCET_API_NOT_CONFIGURED: 'Devnet faucet API is not configured for this build.',
  INVALID_RECIPIENT: 'Enter a valid Solana recipient address.',
  INVALID_AMOUNT: 'Enter a valid claim amount.',
  PER_CLAIM_LIMIT_EXCEEDED: 'This claim exceeds the per-claim limit.',
  WALLET_DAILY_LIMIT_EXCEEDED: 'This wallet has reached its daily faucet limit.',
  GLOBAL_DAILY_LIMIT_EXCEEDED: 'The faucet has reached today\'s global limit.',
  FAUCET_DISABLED: 'The faucet is currently disabled.',
  FAUCET_VAULT_EMPTY: 'The faucet vault needs more funds.',
  RATE_LIMITED: 'Too many faucet requests. Please wait and try again.',
  TRANSACTION_FAILED: 'Gateway could not complete the faucet claim.',
  SERVICE_UNAVAILABLE: 'Faucet Gateway is unavailable. Please try again later.',
  INVALID_GATEWAY_RESPONSE: 'Gateway returned an invalid response.',
}

const FAUCET_ERROR_MAPPINGS: Array<{ pattern: RegExp; message: string }> = [
  {
    pattern: /faucet[^.\n]*(disabled|paused)|\b(disabled|paused)[^.\n]*faucet/i,
    message: GATEWAY_ERROR_MESSAGES.FAUCET_DISABLED,
  },
  {
    pattern: /invalid[^.\n]*recipient|recipient[^.\n]*invalid|public[^.\n]*key/i,
    message: GATEWAY_ERROR_MESSAGES.INVALID_RECIPIENT,
  },
  {
    pattern: /invalid[^.\n]*amount|amount[^.\n]*invalid|amount[^.\n]*(zero|positive|required)/i,
    message: GATEWAY_ERROR_MESSAGES.INVALID_AMOUNT,
  },
  {
    pattern: /(per[-\s]?claim|claim[^.\n]*limit|max[^.\n]*per[^.\n]*claim|exceeds[^.\n]*claim)/i,
    message: GATEWAY_ERROR_MESSAGES.PER_CLAIM_LIMIT_EXCEEDED,
  },
  {
    pattern: /(wallet|user)[^.\n]*daily|daily[^.\n]*(wallet|user)|per[-\s]?wallet[^.\n]*(day|daily)/i,
    message: GATEWAY_ERROR_MESSAGES.WALLET_DAILY_LIMIT_EXCEEDED,
  },
  {
    pattern: /global[^.\n]*daily|daily[^.\n]*global/i,
    message: GATEWAY_ERROR_MESSAGES.GLOBAL_DAILY_LIMIT_EXCEEDED,
  },
  {
    pattern: /insufficient[^.\n]*(vault|faucet|funds|balance)|vault[^.\n]*(empty|balance)/i,
    message: GATEWAY_ERROR_MESSAGES.FAUCET_VAULT_EMPTY,
  },
  {
    pattern: /\b(rate limit|rate limited|too many|429)\b/i,
    message: GATEWAY_ERROR_MESSAGES.RATE_LIMITED,
  },
  {
    pattern: /\b(network|fetch|timeout|timed out|failed to fetch|503|502|504|unavailable)\b/i,
    message: GATEWAY_ERROR_MESSAGES.SERVICE_UNAVAILABLE,
  },
]

function getErrorText(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error

  try {
    return JSON.stringify(error)
  } catch {
    return ''
  }
}

export function normalizeFaucetError(error: unknown): string {
  if (error instanceof FaucetGatewayError) {
    return GATEWAY_ERROR_MESSAGES[error.code] || error.message
  }

  const errorText = getErrorText(error)
  const match = FAUCET_ERROR_MAPPINGS.find(({ pattern }) => pattern.test(errorText))
  return match?.message || 'Claim failed. Please try again.'
}
