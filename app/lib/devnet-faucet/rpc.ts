import { Connection } from '@solana/web3.js'

import { DEVNET_DEFAULT_RPC_URL, DEVNET_RPC_STORAGE_KEY } from './constants'

const INVALID_RPC_URL_MESSAGE = 'Enter a valid HTTP or HTTPS RPC URL.'

function hasBrowserStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

export function isValidHttpRpcUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function readStoredDevnetRpcUrl(): string | null {
  if (!hasBrowserStorage()) return null

  try {
    const storedUrl = window.localStorage.getItem(DEVNET_RPC_STORAGE_KEY)?.trim() || null
    return storedUrl && isValidHttpRpcUrl(storedUrl) ? storedUrl : null
  } catch {
    return null
  }
}

export function writeStoredDevnetRpcUrl(rpcUrl: string): void {
  const trimmedRpcUrl = rpcUrl.trim()
  if (!isValidHttpRpcUrl(trimmedRpcUrl)) {
    throw new Error(INVALID_RPC_URL_MESSAGE)
  }
  if (!hasBrowserStorage()) return

  try {
    window.localStorage.setItem(DEVNET_RPC_STORAGE_KEY, trimmedRpcUrl)
  } catch {
    return
  }
}

export function clearStoredDevnetRpcUrl(): void {
  if (!hasBrowserStorage()) return

  try {
    window.localStorage.removeItem(DEVNET_RPC_STORAGE_KEY)
  } catch {
    return
  }
}

export function getInitialDevnetRpcUrl(): string {
  return readStoredDevnetRpcUrl() || DEVNET_DEFAULT_RPC_URL
}

export function createDevnetConnection(rpcUrl = getInitialDevnetRpcUrl()): Connection {
  if (!isValidHttpRpcUrl(rpcUrl)) {
    throw new Error(INVALID_RPC_URL_MESSAGE)
  }

  return new Connection(rpcUrl.trim(), 'confirmed')
}

export async function assertDevnetRpcHealthy(rpcUrl: string): Promise<void> {
  const connection = createDevnetConnection(rpcUrl)
  await connection.getLatestBlockhash('confirmed')
}
