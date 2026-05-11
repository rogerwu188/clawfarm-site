import Link from 'next/link'

export const metadata = {
  title: 'Docs — ClawFarm',
  description: 'Quickstart, routing modes, SDK reference, provider setup, usage metering, settlement ledger, rewards, and UI mirroring.',
}

const SECTIONS = [
  'Quickstart',
  'Routing Modes',
  'SDK Reference',
  'Provider Setup',
  'Usage Metering',
  'Verification',
  'Settlement Ledger',
  'Rewards',
  'Future Use Case',
  'UI Mirroring',
]

export default function Docs() {
  return (
    <main>
      <section className="section">
        <div className="section-inner">
          <p className="section-tag">Documentation</p>
          <h1 className="section-title text-[36px]">Build on ClawFarm</h1>
          <p className="section-text mt-4">
            Docs for AI token routing, model-token metering, provider setup,
            non-custodial escrow, settlement, and rewards.
          </p>
          <div className="grid-3 mt-6">
            {SECTIONS.map((section) => (
              <a key={section} href={`#${section.toLowerCase().replaceAll(' ', '-')}`} className="grid-cell">
                <h4>{section}</h4>
                <p>Jump to section.</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="quickstart">
        <div className="section-inner">
          <p className="section-tag">Quickstart</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">1. Connect wallet</span><span className="panel-value">Use a Solana wallet or app Master Pool</span></div>
            <div className="panel-row"><span className="panel-label">2. Deposit USDC</span><span className="panel-value">Funds enter non-custodial escrow</span></div>
            <div className="panel-row"><span className="panel-label">3. Route AI requests</span><span className="panel-value">Models, APIs, GPU nodes, custom endpoints</span></div>
            <div className="panel-row"><span className="panel-label">4. Meter and settle</span><span className="panel-value">Dual-signed token usage creates settlement ledger entries</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="routing-modes">
        <div className="section-inner">
          <p className="section-tag">Routing Modes</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">eco</span><span className="panel-value">Lowest cost qualified provider</span></div>
            <div className="panel-row"><span className="panel-label">auto</span><span className="panel-value">Balanced cost, quality, and latency</span></div>
            <div className="panel-row"><span className="panel-label">premium</span><span className="panel-value">Highest quality route for complex work</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="sdk-reference">
        <div className="section-inner">
          <p className="section-tag">SDK Reference</p>
          <div className="panel">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`import { ClawFarm } from '@clawfarm/sdk'

const cf = new ClawFarm({ wallet })

const result = await cf.chat({
  mode: 'auto',
  model: 'auto',
  messages: [{ role: 'user', content: 'Review this code diff' }]
})

await cf.settle({
  provider: result.provider,
  tokens: result.usage.total_tokens,
  proof: result.proof
})`}
            </pre>
          </div>
        </div>
      </section>

      <section className="section" id="provider-setup">
        <div className="section-inner">
          <p className="section-tag">Provider Setup</p>
          <p className="section-text mb-4">
            Providers can register GPU nodes, API proxies, custom model services,
            multi-model routers, and hosted model endpoints.
          </p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Endpoint</span><span className="panel-value">HTTPS model or routing endpoint</span></div>
            <div className="panel-row"><span className="panel-label">Pricing</span><span className="panel-value">Published on-chain by model and token type</span></div>
            <div className="panel-row"><span className="panel-label">Stake</span><span className="panel-value">Minimum $CLAF stake for accountability</span></div>
            <div className="panel-row"><span className="panel-label">Proofs</span><span className="panel-value">Must sign model-token usage proofs</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="usage-metering">
        <div className="section-inner">
          <p className="section-tag">Usage Metering</p>
          <div className="grid-2 mt-6">
            {[
              ['AI Token', 'A metered token of model usage that can be priced, routed, and settled through ClawFarm.'],
              ['Model Token', 'Input and output token counts reported by the model/API provider and verified by the client.'],
              ['Demand App', 'An application that brings users into ClawFarm and routes their AI requests through the protocol.'],
              ['Usage Proof', 'A dual-signed record containing provider, model, route, price, token count, and account.'],
            ].map(([title, desc]) => (
              <div key={title} className="grid-cell">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="verification">
        <div className="section-inner">
          <p className="section-tag">Verification</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Usage proof</span><span className="panel-value">User and provider agree on metered token usage</span></div>
            <div className="panel-row"><span className="panel-label">Client count</span><span className="panel-value">Client verifies model-token counts before signing</span></div>
            <div className="panel-row"><span className="panel-label">Sampling audit</span><span className="panel-value">Suspicious usage can be re-checked and disputed</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="settlement-ledger">
        <div className="section-inner">
          <p className="section-tag">Settlement Ledger</p>
          <p className="section-text">
            Ledger entries record account, demand app, provider, model, route mode,
            token count, price, proof hash, provider payout, treasury fee, and
            transaction hash.
          </p>
        </div>
      </section>

      <section className="section" id="rewards">
        <div className="section-inner">
          <p className="section-tag">Rewards</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Supply-side</span><span className="panel-value">70% based on verified usage, price efficiency, and quality</span></div>
            <div className="panel-row"><span className="panel-label">Demand-side</span><span className="panel-value">30% based on verified consumption</span></div>
            <div className="panel-row"><span className="panel-label">Treasury fee</span><span className="panel-value">3% of settlement, allocated 70/20/10</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="future-use-case">
        <div className="section-inner">
          <p className="section-tag">Future Use Case</p>
          <p className="section-text">
            Agent-to-agent commerce may use the same routing, metering, and settlement
            primitives for future transactions such as data retrieval, evaluation, and
            tool execution. Today, ClawFarm&apos;s core focus is decentralized AI compute
            routing.
          </p>
        </div>
      </section>

      <section className="section" id="ui-mirroring">
        <div className="section-inner">
          <p className="section-tag">UI Mirroring</p>
          <p className="section-text mb-4">
            The interface is a static client that can be mirrored without changing the
            protocol. Keep GitHub, Discord, and X links intact when hosting a mirror.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
            <Link href="/whitepaper" className="btn-primary">Protocol</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
