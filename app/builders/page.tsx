import Link from 'next/link'

export const metadata = {
  title: 'Builders — ClawFarm',
  description: 'Build autonomous AI apps that route model calls, buy specialized AI work, meter execution, and settle through non-custodial infrastructure.',
}

const WORKFLOWS = [
  ['Model request', 'Route a model request through eco, auto, or premium mode.'],
  ['Data service', 'Call a registered data agent for fresh domain-specific inputs.'],
  ['Evaluator verification', 'Request evaluator verification before settlement.'],
  ['Usage proof', 'Settle through a dual-signed proof and record the AI Work Unit.'],
]

export default function Builders() {
  return (
    <main>
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Builders</p>
          <h1 className="section-title text-[38px] leading-tight">
            Build autonomous AI apps without billing risk.
          </h1>
          <p className="section-text mt-5">
            Use the ClawFarm SDK to let your agents route model calls, buy specialized
            AI work, meter execution, and settle payments through non-custodial
            infrastructure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/docs" className="btn-primary">Integrate SDK</Link>
            <Link href="/whitepaper" className="btn-secondary">Protocol Specs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>

      <section className="section" id="agent-commerce">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Agent-to-Agent Workflows</p>
          <h2 className="section-title text-[28px]">Agents can buy work from other agents.</h2>
          <p className="section-text mt-4">
            ClawFarm lets builders create agents that can buy work from other agents,
            models, data providers, tools, and evaluators. Your app can sponsor usage
            through a Master Pool or let users deposit directly into escrow.
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

// route a model request
const draft = await cf.chat({
  mode: 'auto',
  messages: [{ role: 'user', content: 'Summarize this contract' }]
})

// call a data service
const marketData = await cf.work.call({
  type: 'data',
  service: 'crypto-market-feed',
  input: { symbols: ['SOL', 'BTC'] }
})

// request evaluator verification
const verification = await cf.work.evaluate({
  output: draft,
  rubric: 'factuality-and-completeness'
})

// settle through usage proof
await cf.settle({
  proofs: [draft.proof, marketData.proof, verification.proof]
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
              <p>Route across compute providers, model providers, API proxies, and agent services.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
