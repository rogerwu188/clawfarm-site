import { DEVNET_FAUCET_BASE_UNITS, DEVNET_FAUCET_DECIMALS } from './constants'

export type FaucetInputValidation =
  | { ok: true; clawBaseUnits: bigint; usdcBaseUnits: bigint }
  | { ok: false; message: string }

const DECIMAL_SYNTAX_MESSAGE = 'Enter a positive number with up to 6 decimal places.'
const DECIMAL_PLACES_MESSAGE = 'Use no more than 6 decimal places.'

export function parseFaucetUiAmount(value: string): bigint {
  const trimmed = value.trim()
  if (!trimmed) return BigInt(0)
  if (!/^\d+(\.\d*)?$/.test(trimmed)) {
    throw new Error(DECIMAL_SYNTAX_MESSAGE)
  }

  const [wholePart, fractionPart = ''] = trimmed.split('.')
  if (fractionPart.length > DEVNET_FAUCET_DECIMALS) {
    throw new Error(DECIMAL_PLACES_MESSAGE)
  }

  const whole = BigInt(wholePart || '0') * DEVNET_FAUCET_BASE_UNITS
  const fraction = BigInt(fractionPart.padEnd(DEVNET_FAUCET_DECIMALS, '0') || '0')
  return whole + fraction
}

export function formatFaucetUiAmount(baseUnits: bigint): string {
  const whole = baseUnits / DEVNET_FAUCET_BASE_UNITS
  const fraction = baseUnits % DEVNET_FAUCET_BASE_UNITS
  if (fraction === BigInt(0)) return whole.toString()

  return `${whole}.${fraction.toString().padStart(DEVNET_FAUCET_DECIMALS, '0').replace(/0+$/, '')}`
}

export function validateFaucetClaimInput(input: {
  clawAmount: string
  usdcAmount: string
  maxClawPerClaim: string
  maxUsdcPerClaim: string
}): FaucetInputValidation {
  try {
    const clawBaseUnits = parseFaucetUiAmount(input.clawAmount)
    const usdcBaseUnits = parseFaucetUiAmount(input.usdcAmount)
    const maxClawBaseUnits = parseFaucetUiAmount(input.maxClawPerClaim)
    const maxUsdcBaseUnits = parseFaucetUiAmount(input.maxUsdcPerClaim)

    if (clawBaseUnits === BigInt(0) && usdcBaseUnits === BigInt(0)) {
      return { ok: false, message: 'Enter an amount for CLAW, Test USDC, or both.' }
    }
    if (clawBaseUnits > maxClawBaseUnits) {
      return { ok: false, message: `CLAW is limited to ${input.maxClawPerClaim} per claim.` }
    }
    if (usdcBaseUnits > maxUsdcBaseUnits) {
      return { ok: false, message: `Test USDC is limited to ${input.maxUsdcPerClaim} per claim.` }
    }

    return { ok: true, clawBaseUnits, usdcBaseUnits }
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : 'Invalid amount.' }
  }
}
