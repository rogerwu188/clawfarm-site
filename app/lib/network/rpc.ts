import { Connection, type Commitment } from '@solana/web3.js'

import { SOLANA_NETWORKS, type SolanaNetworkId } from './config'

const STORAGE_KEY_PREFIX = 'clawfarm.walletRpcUrl.'
export const INVALID_RPC_URL_MESSAGE = 'Enter a valid HTTP or HTTPS RPC URL.'

function hasBrowserStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

export function getWalletRpcStorageKey(networkId: SolanaNetworkId): string {
  return `${STORAGE_KEY_PREFIX}${networkId}`
}

export function isValidHttpRpcUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function readStoredWalletRpcUrl(networkId: SolanaNetworkId): string | null {
  if (!hasBrowserStorage()) return null

  try {
    const storedUrl = window.localStorage.getItem(getWalletRpcStorageKey(networkId))?.trim() || null
    return storedUrl && isValidHttpRpcUrl(storedUrl) ? storedUrl : null
  } catch {
    return null
  }
}

export function writeStoredWalletRpcUrl(networkId: SolanaNetworkId, rpcUrl: string): string {
  const trimmedRpcUrl = rpcUrl.trim()
  if (!isValidHttpRpcUrl(trimmedRpcUrl)) {
    throw new Error(INVALID_RPC_URL_MESSAGE)
  }

  if (hasBrowserStorage()) {
    window.localStorage.setItem(getWalletRpcStorageKey(networkId), trimmedRpcUrl)
  }

  return trimmedRpcUrl
}

export function clearStoredWalletRpcUrl(networkId: SolanaNetworkId): void {
  if (!hasBrowserStorage()) return

  try {
    window.localStorage.removeItem(getWalletRpcStorageKey(networkId))
  } catch {
    return
  }
}

export function getDefaultWalletRpcUrl(networkId: SolanaNetworkId): string {
  return SOLANA_NETWORKS[networkId].defaultWalletRpcUrl
}

export function getInitialWalletRpcUrl(networkId: SolanaNetworkId): string {
  return readStoredWalletRpcUrl(networkId) || getDefaultWalletRpcUrl(networkId)
}

export function createNetworkConnection(rpcUrl: string, commitment: Commitment = 'confirmed'): Connection {
  if (!isValidHttpRpcUrl(rpcUrl)) {
    throw new Error(INVALID_RPC_URL_MESSAGE)
  }

  return new Connection(rpcUrl.trim(), commitment)
}

export async function assertRpcHealthy(rpcUrl: string): Promise<void> {
  const connection = createNetworkConnection(rpcUrl)
  await connection.getLatestBlockhash('confirmed')
}
