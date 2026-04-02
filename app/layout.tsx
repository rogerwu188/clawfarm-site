import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — Decentralized AI Compute Marketplace',
  description: 'Non-custodial AI compute marketplace on Solana. Deposit USDC, choose eco/auto/premium routing, consume AI inference from permissionless Providers. On-chain settlement. No platform holds your funds.',
}

import ClientLayout from './client-layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
