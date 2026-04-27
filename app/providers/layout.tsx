import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace — ClawFarm | Decentralized AI Compute',
  description: 'Browse the real-time AI compute marketplace. Compare providers by price, speed, and success rate. On-chain settlement for GPT-4o, Claude 3.5, DeepSeek R1 and more.',
  keywords: 'AI marketplace, GPU compute marketplace, LLM pricing, decentralized AI, Solana AI, AI provider leaderboard',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/providers' },
  openGraph: {
    title: 'AI Compute Marketplace — ClawFarm',
    description: 'Compare providers by price, speed, and success rate. On-chain settlement.',
    url: 'https://www.clawfarm.network/providers',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ClawFarm AI Compute Marketplace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Compute Marketplace — ClawFarm',
    description: 'Compare providers by price, speed, and success rate.',
    images: ['/og-image.png'],
  },
}

export default function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return children
}
