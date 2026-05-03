import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace — ClawFarm | AI Compute Provider Registry',
  description: 'Browse the ClawFarm provider registry for model providers, API proxies, GPU nodes, multi-model routers, and custom model endpoints.',
  keywords: 'AI compute marketplace, AI token router, GPU compute, LLM pricing, decentralized AI, Solana AI, model providers',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/providers' },
  openGraph: {
    title: 'ClawFarm Provider Registry',
    description: 'Open registry for model, API, and GPU compute providers.',
    url: 'https://www.clawfarm.network/providers',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ClawFarm Provider Registry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm Provider Registry',
    description: 'Open registry for model, API, and GPU compute providers.',
    images: ['/og-image.png'],
  },
}

export default function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return children
}
