import type { Metadata } from 'next'
import ExplorerClient from './ExplorerClient'

export const metadata: Metadata = {
  title: 'Network Explorer — ClawFarm | Real-time On-chain State',
  description: 'Real-time view of treasury buybacks, escrow state, provider registry, settlement activity, and token metrics. All data on-chain and verifiable.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/masterpool' },
  openGraph: {
    title: 'ClawFarm Network Explorer',
    description: 'Real-time on-chain state: buybacks, escrow, providers, settlement, treasury.',
    url: 'https://www.clawfarm.network/masterpool',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ClawFarm Network Explorer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm Network Explorer',
    description: 'Real-time on-chain state: buybacks, escrow, settlement.',
    images: ['/og-image.png'],
  },
}

export default function Pool() {
  return <ExplorerClient />
}
