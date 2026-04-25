'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import {
  SOLANA_NETWORKS,
  getCanonicalRouteForNetwork,
  getNetworkIdFromPathAndQuery,
  getNormalizedNetworkHref,
  type SolanaNetworkConfig,
  type SolanaNetworkId,
} from '@/app/lib/network/config'
import {
  clearStoredWalletRpcUrl,
  getDefaultWalletRpcUrl,
  getInitialWalletRpcUrl,
  readStoredWalletRpcUrl,
  writeStoredWalletRpcUrl,
} from '@/app/lib/network/rpc'

type WalletRpcOverrides = Partial<Record<SolanaNetworkId, string>>

type NetworkContextValue = {
  networkId: SolanaNetworkId
  network: SolanaNetworkConfig
  walletRpcUrl: string
  isCustomWalletRpc: boolean
  setWalletRpcUrl: (networkId: SolanaNetworkId, rpcUrl: string) => string
  resetWalletRpcUrl: (networkId: SolanaNetworkId) => void
  switchNetwork: (networkId: SolanaNetworkId) => void
}

const NetworkContext = createContext<NetworkContextValue | null>(null)

function loadWalletRpcOverrides(): WalletRpcOverrides {
  return {
    mainnet: readStoredWalletRpcUrl('mainnet') || undefined,
    devnet: readStoredWalletRpcUrl('devnet') || undefined,
  }
}

export default function NetworkProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [walletRpcOverrides, setWalletRpcOverrides] = useState<WalletRpcOverrides>({})

  const networkId = getNetworkIdFromPathAndQuery(pathname, searchParams)
  const network = SOLANA_NETWORKS[networkId]
  const customWalletRpcUrl = walletRpcOverrides[networkId]
  const walletRpcUrl = customWalletRpcUrl || getDefaultWalletRpcUrl(networkId)
  const isCustomWalletRpc = Boolean(customWalletRpcUrl)

  useEffect(() => {
    setWalletRpcOverrides(loadWalletRpcOverrides())
  }, [])

  useEffect(() => {
    const normalizedHref = getNormalizedNetworkHref(pathname, searchParams)
    const currentQuery = searchParams?.toString() || ''
    const currentHref = currentQuery ? `${pathname}?${currentQuery}` : pathname

    if (normalizedHref && normalizedHref !== currentHref) {
      router.replace(normalizedHref)
    }
  }, [pathname, router, searchParams])

  const setWalletRpcUrl = useCallback((targetNetworkId: SolanaNetworkId, rpcUrl: string) => {
    const savedRpcUrl = writeStoredWalletRpcUrl(targetNetworkId, rpcUrl)
    setWalletRpcOverrides((current) => ({ ...current, [targetNetworkId]: savedRpcUrl }))
    return savedRpcUrl
  }, [])

  const resetWalletRpcUrl = useCallback((targetNetworkId: SolanaNetworkId) => {
    clearStoredWalletRpcUrl(targetNetworkId)
    setWalletRpcOverrides((current) => {
      const next = { ...current }
      delete next[targetNetworkId]
      return next
    })
  }, [])

  const switchNetwork = useCallback(
    (targetNetworkId: SolanaNetworkId) => {
      router.push(getCanonicalRouteForNetwork(targetNetworkId))
    },
    [router]
  )

  const value = useMemo<NetworkContextValue>(
    () => ({
      networkId,
      network,
      walletRpcUrl,
      isCustomWalletRpc,
      setWalletRpcUrl,
      resetWalletRpcUrl,
      switchNetwork,
    }),
    [isCustomWalletRpc, network, networkId, resetWalletRpcUrl, setWalletRpcUrl, switchNetwork, walletRpcUrl]
  )

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
}

export function useNetwork(): NetworkContextValue {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error('useNetwork must be used inside NetworkProvider.')
  }
  return context
}

export { getInitialWalletRpcUrl }
