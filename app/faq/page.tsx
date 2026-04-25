import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — ClawFarm | Decentralized AI Compute',
  description: 'Frequently asked questions about ClawFarm: decentralized AI compute, routing, metering, settlement, provider economics, $CLAF token, and how to get started.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — ClawFarm | Decentralized AI Compute',
    description: 'Everything you need to know about decentralized AI compute, routing, metering, and settlement.',
    url: 'https://www.clawfarm.network/faq',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — ClawFarm',
    description: 'Frequently asked questions about decentralized AI compute.',
    images: ['/og-image.png'],
  },
}

const FAQS = [
  {
    q: 'What is a decentralized AI compute network?',
    a: 'A decentralized AI compute network connects AI consumers with compute providers through three core functions: routing, metering, and settlement. Unlike aggregation platforms that hold API keys and set prices centrally, a decentralized network lets providers register directly, compete on price, and receive automatic payment.',
  },
  {
    q: 'How is ClawFarm different from OpenRouter or LiteLLM?',
    a: 'OpenRouter is an aggregation platform — it holds API keys and sets centralized pricing. LiteLLM is a developer tool — a unified interface layer you self-host, but you bring your own provider relationships. ClawFarm is a two-sided network — providers compete openly, users get transparent pricing, and settlement is automatic on-chain with no platform controlling custody or pricing.',
  },
  {
    q: 'How does routing work?',
    a: 'ClawFarm offers three routing modes: eco (cheapest provider for cost-first workloads), auto (best balance of cost and quality), and premium (fastest, highest quality). Requests are routed to the best provider based on the selected mode, with real-time performance data.',
  },
  {
    q: 'What is verifiable metering?',
    a: 'Every token is counted client-side using dual-signature proofs. Both the consumer and provider sign a usage proof, creating an auditable, tamper-resistant record of exactly how many tokens were processed. No trust required.',
  },
  {
    q: 'How does settlement work?',
    a: 'Smart contracts split every USDC payment automatically: 97% to the provider, 3% to the autonomous treasury. No invoices, no payment delays, no manual reconciliation. Settlement completes on Solana in under 400ms.',
  },
  {
    q: 'How much do providers earn?',
    a: 'Providers keep 97% of USDC payments. There is no middleman fee. Additionally, providers earn $CLAF tokens distributed every epoch based on usage, pricing competitiveness, and quality scores.',
  },
  {
    q: 'Do I need to stake tokens to become a provider?',
    a: 'No. ClawFarm uses reputation-based routing, not staking requirements. Anyone can register as a provider by submitting a model endpoint and pricing. No approval, no whitelist, no lock-in.',
  },
  {
    q: 'What is $CLAF?',
    a: '$CLAF is the protocol token distributed to both sides of the marketplace. 70% goes to supply-side (providers), 30% to demand-side (users/consumers). A 3% treasury fee on every settlement funds buyback & burn (70%), core maintenance (20%), and infrastructure resilience (10%).',
  },
  {
    q: 'Is ClawFarm non-custodial?',
    a: 'Yes. User USDC sits in a program-owned escrow (PDA) on Solana. No human or platform holds the key. Providers and users can withdraw anytime.',
  },
  {
    q: 'How do I integrate as a builder?',
    a: 'Use the ClawFarm SDK to route AI requests across multiple providers with one integration. Auto-failover, cost optimization, and on-chain usage receipts are built in. Visit /docs for API reference and quickstart guides.',
  },
  {
    q: 'Which models are supported?',
    a: 'Any model endpoint can be registered by a provider. Current marketplace includes GPT-4o, Claude Sonnet/Opus, DeepSeek R1/V3, Gemini 2.5 Pro/Flash, Llama 4, Qwen 3, Mistral Large, Grok 3, and more — plus image and video generation models.',
  },
  {
    q: 'What blockchain does ClawFarm use?',
    a: 'ClawFarm is built on Solana for its sub-second finality, low transaction costs, and high throughput — making real-time compute settlement economically viable at production scale.',
  },
]

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-[36px] font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-[var(--text-mid)] text-[16px] leading-relaxed">
            Everything you need to know about ClawFarm, decentralized AI compute, and how to get started.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-8">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                id={`q${i}`}
                style={{
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '32px',
                }}
              >
                <h2 className="text-[20px] font-semibold mb-3" style={{ color: 'var(--text-high)' }}>
                  {faq.q}
                </h2>
                <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text-mid)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-16 p-6"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)',
            }}
          >
            <h3 className="text-[18px] font-semibold mb-2">Still have questions?</h3>
            <p className="text-[14px] mb-4" style={{ color: 'var(--text-mid)' }}>
              Join our Discord community or check the documentation for technical details.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://discord.gg/zxZmCFbzEn" target="_blank" rel="noopener" className="btn-secondary text-[13px]">
                Join Discord
              </a>
              <a href="/docs" className="btn-ghost text-[13px]">Read Docs</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
