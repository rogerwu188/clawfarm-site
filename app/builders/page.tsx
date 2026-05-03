import Link from 'next/link'

export const metadata = {
  title: 'Builders — ClawFarm',
  description: 'Build AI apps with decentralized model routing, token metering, provider pricing, and non-custodial USDC settlement.',
}

const WORKFLOWS = [
  ['Model routing', 'Route text, image, and video requests through eco, auto, or premium mode.'],
  ['Provider pricing', 'Read provider price tables and choose by cost, latency, model support, or route mode.'],
  ['Token metering', 'Record model-token usage with dual-signed usage proofs.'],
  ['USDC settlement', 'Settle usage from escrow to the provider wallet without centralized billing.'],
]

export default function Builders() {
  return (
    <main>
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Builders</p>
          <h1 className="section-title text-[38px] leading-tight">
            Build AI apps without billing risk.
          </h1>
          <p className="section-text mt-5">
            Use the ClawFarm SDK to route model calls across competing providers,
            meter model-token usage, and settle payments through non-custodial
            USDC escrow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/docs" className="btn-primary">Integrate SDK</Link>
            <Link href="/whitepaper" className="btn-secondary">Protocol Specs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Routing workflows</p>
          <h2 className="section-title text-[28px]">Route, meter, and settle model usage.</h2>
          <p className="section-text mt-4">
            Your app can sponsor usage through a Master Pool or let users deposit
            directly into escrow. In both cases, ClawFarm handles provider routing,
            usage metering, and settlement records.
          </p>
          <div className="grid-2 mt-6">
            {WORKFLOWS.map(([title, desc]) => (
              <div key={title} className="grid-cell">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">SDK Example</p>
          <div className="panel mt-4">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`import { ClawFarm } from '@clawfarm/sdk'

const cf = new ClawFarm({
  wallet: appWallet,
  sponsor: 'master-pool'
})

// route a model request across registered providers
const draft = await cf.chat({
  mode: 'auto',
  messages: [{ role: 'user', content: 'Summarize this contract' }]
})

// read metered token usage and provider price
const usage = draft.usage

// settle through a dual-signed usage proof
await cf.settle({
  provider: draft.provider,
  tokens: usage.total_tokens,
  proof: draft.proof
})`}
            </pre>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Builder surface</p>
          <div className="grid-3 mt-6">
            <div className="grid-cell">
              <h4>Master Pool</h4>
              <p>Sponsor usage for your users while keeping settlement transparent and metered.</p>
            </div>
            <div className="grid-cell">
              <h4>Direct Escrow</h4>
              <p>Let each user deposit USDC directly into ClawFarm escrow and own their balance.</p>
            </div>
            <div className="grid-cell">
              <h4>Provider Choice</h4>
              <p>Route across compute providers, model providers, API proxies, and custom endpoints.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Future extension</p>
          <p className="section-text">
            The same routing and settlement rails may support future agent-to-agent
            transactions. Today, the builder surface is focused on AI compute routing,
            token metering, and provider settlement.
          </p>
        </div>
      </section>
    </main>
  )
}
