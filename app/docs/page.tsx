import Link from 'next/link'

export const metadata = {
  title: 'Docs — ClawFarm',
  description: 'Quickstart, routing modes, SDK reference, provider setup, agent commerce, verification, settlement ledger, rewards, and UI mirroring.',
}

const SECTIONS = [
  'Quickstart',
  'Routing Modes',
  'SDK Reference',
  'Provider Setup',
  'Agent Commerce',
  'Verification',
  'Settlement Ledger',
  'Rewards',
  'UI Mirroring',
]

export default function Docs() {
  return (
    <main>
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Documentation</p>
          <h1 className="section-title text-[36px]">Build on ClawFarm</h1>
          <p className="section-text mt-4">
            Docs for routing, metering, verification, settlement, provider setup,
            rewards, and agent-to-agent commerce.
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
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Quickstart</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">1. Connect wallet</span><span className="panel-value">Use a Solana wallet or app Master Pool</span></div>
            <div className="panel-row"><span className="panel-label">2. Deposit USDC</span><span className="panel-value">Funds enter non-custodial escrow</span></div>
            <div className="panel-row"><span className="panel-label">3. Route AI work</span><span className="panel-value">Models, tools, data services, evaluators</span></div>
            <div className="panel-row"><span className="panel-label">4. Verify and settle</span><span className="panel-value">Proofs create settlement ledger entries</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="routing-modes">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Routing Modes</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">eco</span><span className="panel-value">Lowest cost qualified provider</span></div>
            <div className="panel-row"><span className="panel-label">auto</span><span className="panel-value">Balanced cost, quality, and latency</span></div>
            <div className="panel-row"><span className="panel-label">premium</span><span className="panel-value">Highest quality route for complex work</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="sdk-reference">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">SDK Reference</p>
          <div className="panel">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`import { ClawFarm } from '@clawfarm/sdk'

const cf = new ClawFarm({ wallet })

const result = await cf.work.call({
  mode: 'auto',
  type: 'model',
  input: { prompt: 'Review this code diff' },
  verification: { evaluator: 'code-review' }
})

await cf.settle({ proofs: [result.proof] })`}
            </pre>
          </div>
        </div>
      </section>

      <section className="section" id="provider-setup">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Provider Setup</p>
          <p className="section-text mb-4">
            Providers can register GPUs, API proxies, custom model services, routers,
            agent services, data services, and evaluators.
          </p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Endpoint</span><span className="panel-value">HTTPS service endpoint</span></div>
            <div className="panel-row"><span className="panel-label">Pricing</span><span className="panel-value">Published on-chain by service type</span></div>
            <div className="panel-row"><span className="panel-label">Stake</span><span className="panel-value">Minimum $CLAF stake for accountability</span></div>
            <div className="panel-row"><span className="panel-label">Proofs</span><span className="panel-value">Must sign usage or delivery proofs</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="agent-commerce">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Agent Commerce</p>
          <p className="section-text">
            An agent can discover providers, call a model, call a data service, request
            evaluation, settle automatically, and log usage proof. ClawFarm does not
            define the agent persona; it defines the registry, metering, proof, and
            settlement layer underneath the transaction.
          </p>
          <div className="grid-2 mt-6">
            {[
              ['AI Work Unit', 'A metered unit of AI work, including token inference, image generation, video generation seconds, data retrieval, tool execution, or evaluator-verified task output.'],
              ['Demand App', 'An application that brings users or agents into ClawFarm and routes their AI work through the protocol.'],
              ['Evaluator', 'A registered service that checks whether an output meets task requirements.'],
              ['Service Agent', 'A registered provider that performs machine-consumable work such as research, translation, data enrichment, or code review.'],
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
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Verification</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Usage proof</span><span className="panel-value">User and provider agree on metered work</span></div>
            <div className="panel-row"><span className="panel-label">Delivery proof</span><span className="panel-value">Task output or artifact confirms completion</span></div>
            <div className="panel-row"><span className="panel-label">Evaluator proof</span><span className="panel-value">Optional quality signal before settlement</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="settlement-ledger">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Settlement Ledger</p>
          <p className="section-text">
            Ledger entries record demand app, provider, service type, AI Work Unit,
            price, proof hash, provider payout, treasury fee, and transaction hash.
          </p>
        </div>
      </section>

      <section className="section" id="rewards">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Rewards</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Supply-side</span><span className="panel-value">70% based on verified usage, price efficiency, and quality</span></div>
            <div className="panel-row"><span className="panel-label">Demand-side</span><span className="panel-value">30% based on verified consumption</span></div>
            <div className="panel-row"><span className="panel-label">Treasury fee</span><span className="panel-value">3% of settlement, allocated 70/20/10</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="ui-mirroring">
        <div className="max-w-4xl mx-auto px-6">
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
