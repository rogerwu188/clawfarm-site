import { clusterApiUrl } from '@solana/web3.js'

export type SolanaNetworkId = 'mainnet' | 'devnet'

export type SolanaNetworkConfig = {
  id: SolanaNetworkId
  label: string
  shortLabel: string
  canonicalRoute: string
  clusterParam: SolanaNetworkId
  solscanClusterParam: 'devnet' | null
  defaultWalletRpcUrl: string
  apiBaseUrl: string
}

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL || clusterApiUrl('mainnet-beta')
const DEVNET_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL || clusterApiUrl('devnet')

export const SOLANA_NETWORKS: Record<SolanaNetworkId, SolanaNetworkConfig> = {
  mainnet: {
    id: 'mainnet',
    label: 'Mainnet',
    shortLabel: 'Mainnet',
    canonicalRoute: '/',
    clusterParam: 'mainnet',
    solscanClusterParam: null,
    defaultWalletRpcUrl: MAINNET_RPC_URL,
    apiBaseUrl: process.env.NEXT_PUBLIC_MAINNET_API_URL || '',
  },
  devnet: {
    id: 'devnet',
    label: 'Devnet',
    shortLabel: 'Devnet',
    canonicalRoute: '/devnet',
    clusterParam: 'devnet',
    solscanClusterParam: 'devnet',
    defaultWalletRpcUrl: DEVNET_RPC_URL,
    apiBaseUrl: process.env.NEXT_PUBLIC_DEVNET_API_URL || '',
  },
}

export const SOLANA_NETWORK_ORDER: SolanaNetworkId[] = ['mainnet', 'devnet']

export function isSolanaNetworkId(value: string | null | undefined): value is SolanaNetworkId {
  return value === 'mainnet' || value === 'devnet'
}

export function getNetworkIdFromPathname(pathname: string | null | undefined): SolanaNetworkId {
  return pathname === '/devnet' || pathname?.startsWith('/devnet/') ? 'devnet' : 'mainnet'
}

export function getClusterParam(searchParams: URLSearchParams | ReadonlyURLSearchParamsLike | null): SolanaNetworkId | null {
  const rawCluster = searchParams?.get('cluster')?.toLowerCase() || null
  return isSolanaNetworkId(rawCluster) ? rawCluster : null
}

export function getNetworkIdFromPathAndQuery(
  pathname: string | null | undefined,
  searchParams: URLSearchParams | ReadonlyURLSearchParamsLike | null
): SolanaNetworkId {
  const pathNetworkId = getNetworkIdFromPathname(pathname)
  const clusterNetworkId = getClusterParam(searchParams)

  if (pathname === '/' && clusterNetworkId === 'devnet') {
    return 'devnet'
  }

  return pathNetworkId
}

export function getCanonicalRouteForNetwork(networkId: SolanaNetworkId): string {
  return SOLANA_NETWORKS[networkId].canonicalRoute
}

export function getNormalizedNetworkHref(
  pathname: string | null | undefined,
  searchParams: URLSearchParams | ReadonlyURLSearchParamsLike | null
): string | null {
  const clusterNetworkId = getClusterParam(searchParams)
  if (!clusterNetworkId) return null

  if (pathname === '/' && clusterNetworkId === 'devnet') return '/devnet'
  if (pathname === '/' && clusterNetworkId === 'mainnet') return '/'
  if ((pathname === '/devnet' || pathname?.startsWith('/devnet/')) && clusterNetworkId === 'mainnet') return '/'
  if (pathname === '/devnet' && clusterNetworkId === 'devnet') return '/devnet'

  return null
}

export function solscanTxUrl(signature: string, networkId: SolanaNetworkId): string {
  const encodedSignature = encodeURIComponent(signature)
  const clusterParam = SOLANA_NETWORKS[networkId].solscanClusterParam
  return clusterParam
    ? `https://solscan.io/tx/${encodedSignature}?cluster=${clusterParam}`
    : `https://solscan.io/tx/${encodedSignature}`
}

type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null
}
