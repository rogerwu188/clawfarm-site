import { PublicKey } from '@solana/web3.js'

import { DEVNET_FAUCET_API_URL } from './constants'

export type FaucetGatewayErrorCode =
  | 'INVALID_RECIPIENT'
  | 'INVALID_AMOUNT'
  | 'PER_CLAIM_LIMIT_EXCEEDED'
  | 'WALLET_DAILY_LIMIT_EXCEEDED'
  | 'GLOBAL_DAILY_LIMIT_EXCEEDED'
  | 'FAUCET_DISABLED'
  | 'FAUCET_VAULT_EMPTY'
  | 'RATE_LIMITED'
  | 'TRANSACTION_FAILED'
  | 'SERVICE_UNAVAILABLE'
  | 'FAUCET_API_NOT_CONFIGURED'
  | 'INVALID_GATEWAY_RESPONSE'

export type FaucetGatewayClaimInput = {
  recipient: string
  clawAmount: string
  usdcAmount: string
}

export type FaucetGatewayClaimResult = {
  signature: string
  recipient: string
  clawAmount: string
  usdcAmount: string
  cluster: 'devnet'
}

type FaucetGatewaySuccessResponse = {
  ok: true
  signature: string
  recipient: string
  clawAmount: string
  usdcAmount: string
  cluster: 'devnet'
}

type FaucetGatewayErrorResponse = {
  ok: false
  code?: FaucetGatewayErrorCode | string
  message?: string
}

type FaucetGatewayResponse = FaucetGatewaySuccessResponse | FaucetGatewayErrorResponse

export class FaucetGatewayError extends Error {
  code: FaucetGatewayErrorCode | string

  constructor(code: FaucetGatewayErrorCode | string, message: string) {
    super(message)
    this.name = 'FaucetGatewayError'
    this.code = code
  }
}

export function normalizeRecipientAddress(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new FaucetGatewayError('INVALID_RECIPIENT', 'Enter a Solana recipient address.')
  }

  try {
    return new PublicKey(trimmed).toBase58()
  } catch {
    throw new FaucetGatewayError('INVALID_RECIPIENT', 'Enter a valid Solana recipient address.')
  }
}

function assertGatewayConfigured(): string {
  const endpoint = DEVNET_FAUCET_API_URL.trim()
  if (!endpoint) {
    throw new FaucetGatewayError(
      'FAUCET_API_NOT_CONFIGURED',
      'Devnet faucet API is not configured for this build.'
    )
  }
  return endpoint
}

function parseGatewayResponse(payload: FaucetGatewayResponse): FaucetGatewayClaimResult {
  if (!payload || typeof payload !== 'object') {
    throw new FaucetGatewayError('INVALID_GATEWAY_RESPONSE', 'Gateway returned an invalid response.')
  }

  if (payload.ok === false) {
    throw new FaucetGatewayError(
      payload.code || 'TRANSACTION_FAILED',
      payload.message || 'Gateway could not complete the faucet claim.'
    )
  }

  if (
    payload.ok !== true ||
    typeof payload.signature !== 'string' ||
    typeof payload.recipient !== 'string' ||
    typeof payload.clawAmount !== 'string' ||
    typeof payload.usdcAmount !== 'string' ||
    payload.cluster !== 'devnet'
  ) {
    throw new FaucetGatewayError('INVALID_GATEWAY_RESPONSE', 'Gateway returned an invalid response.')
  }

  return {
    signature: payload.signature,
    recipient: payload.recipient,
    clawAmount: payload.clawAmount,
    usdcAmount: payload.usdcAmount,
    cluster: payload.cluster,
  }
}

export async function claimDevnetFaucetViaGateway(
  input: FaucetGatewayClaimInput
): Promise<FaucetGatewayClaimResult> {
  const endpoint = assertGatewayConfigured()
  const recipient = normalizeRecipientAddress(input.recipient)

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        recipient,
        clawAmount: input.clawAmount,
        usdcAmount: input.usdcAmount,
      }),
    })
  } catch (error) {
    console.error('Devnet faucet Gateway request failed', error)
    throw new FaucetGatewayError('SERVICE_UNAVAILABLE', 'Faucet Gateway is unreachable.')
  }

  let payload: FaucetGatewayResponse
  try {
    payload = (await response.json()) as FaucetGatewayResponse
  } catch (error) {
    console.error('Devnet faucet Gateway returned non-JSON response', error)
    throw new FaucetGatewayError('INVALID_GATEWAY_RESPONSE', 'Gateway returned an invalid response.')
  }

  if (!response.ok && payload.ok !== false) {
    throw new FaucetGatewayError('TRANSACTION_FAILED', 'Gateway could not complete the faucet claim.')
  }

  return parseGatewayResponse(payload)
}
