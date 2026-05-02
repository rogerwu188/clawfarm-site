'use client'

import { useMemo } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

import '@solana/wallet-adapter-react-ui/styles.css'

type AnyProviderProps = { children: ReactNode; [key: string]: unknown }

const SafeConnectionProvider = ConnectionProvider as unknown as ComponentType<AnyProviderProps>
const SafeWalletProvider = WalletProvider as unknown as ComponentType<AnyProviderProps>

export default function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), [])
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], [])

  return (
    <SafeConnectionProvider endpoint={endpoint}>
      <SafeWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SafeWalletProvider>
    </SafeConnectionProvider>
  )
}
