const GENERIC_FAUCET_ERROR = 'Claim failed. Please try again.'

const FAUCET_ERROR_MAPPINGS: Array<{ pattern: RegExp; message: string }> = [
  {
    pattern: /\b(user rejected|rejected|declined|denied|cancelled|canceled)\b/i,
    message: 'Request rejected in your wallet.',
  },
  {
    pattern: /faucet[^.\n]*(disabled|paused)|\b(disabled|paused)[^.\n]*faucet/i,
    message: 'The faucet is currently disabled.',
  },
  {
    pattern: /invalid[^.\n]*amount|amount[^.\n]*invalid|amount[^.\n]*(zero|positive|required)/i,
    message: 'Enter a valid claim amount.',
  },
  {
    pattern: /(per[-\s]?claim|claim[^.\n]*limit|max[^.\n]*per[^.\n]*claim|exceeds[^.\n]*claim)/i,
    message: 'This claim exceeds the per-claim limit.',
  },
  {
    pattern: /(wallet|user)[^.\n]*daily|daily[^.\n]*(wallet|user)|per[-\s]?wallet[^.\n]*(day|daily)/i,
    message: 'This wallet has reached its daily limit.',
  },
  {
    pattern: /global[^.\n]*daily|daily[^.\n]*global/i,
    message: 'The faucet has reached today’s global limit.',
  },
  {
    pattern: /insufficient[^.\n]*(vault|faucet|funds|balance)|vault[^.\n]*(empty|balance)/i,
    message: 'The faucet vault needs more funds.',
  },
  {
    pattern:
      /\b(rpc|network|fetch|timeout|timed out|failed to fetch|blockhash|connection|429|503|502|504)\b/i,
    message: 'RPC or network error. Try another endpoint.',
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
  const errorText = getErrorText(error)
  const match = FAUCET_ERROR_MAPPINGS.find(({ pattern }) => pattern.test(errorText))
  return match?.message || GENERIC_FAUCET_ERROR
}
