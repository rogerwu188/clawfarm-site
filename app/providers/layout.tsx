import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace — ClawFarm | Open AI Work Provider Registry',
  description: 'Browse the ClawFarm provider registry for compute providers, model providers, API proxies, data agents, service agents, and evaluators.',
  keywords: 'AI work registry, agent commerce, GPU compute, LLM pricing, decentralized AI, Solana AI, evaluator providers',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/providers' },
  openGraph: {
    title: 'ClawFarm Provider Registry',
    description: 'Open registry for AI work providers and agent services.',
    url: 'https://www.clawfarm.network/providers',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ClawFarm Provider Registry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm Provider Registry',
    description: 'Open registry for AI work providers and agent services.',
    images: ['/og-image.png'],
  },
}

export default function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return children
}
