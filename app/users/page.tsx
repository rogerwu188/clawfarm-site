import Link from 'next/link'

export const metadata = {
  title: 'Protocol Users — ClawFarm',
  description: 'Use AI compute through ClawFarm without centralized billing. Non-custodial USDC escrow, open routing, token metering, and settlement.',
}

const FLOW = [
  ['01', 'Connect wallet', 'Use a Solana wallet to interact with ClawFarm directly.'],
  ['02', 'Deposit USDC', 'Funds enter non-custodial PDA escrow, not a platform balance.'],
  ['03', 'Route AI requests', 'Choose eco, auto, or premium routing across registered model, API, and compute providers.'],
  ['04', 'Meter token usage', 'Dual-signed usage proofs confirm model-token counts, provider price, and route.'],
  ['05', 'Settle', 'USDC moves from escrow to provider wallets through smart contracts.'],
  ['06', 'Withdraw', 'Unused escrow balance remains under user control and can be withdrawn.'],
]

const DETAILS = [
  ['Wallet-native usage', 'For users and apps that want protocol-native settlement instead of centralized accounts.'],
  ['Open provider registry', 'Model providers, GPU nodes, API proxies, and custom model endpoints can all compete.'],
  ['Transparent ledger', 'Every routed request can be traced through provider, price, usage proof, settlement, and transaction hash.'],
  ['Rewards below utility', '$CLAF usage rewards remain available, but settlement and access come first.'],
]

export default function Users() {
  return (
    <main>
      <section className="section">
        <div className="section-inner">
          <p className="section-tag">Protocol Users</p>
          <h1 className="section-title text-[38px] leading-tight">
            Use AI compute without centralized billing.
          </h1>
          <p className="section-text mt-5">
            Connect a Solana wallet, deposit USDC into non-custodial escrow, and route AI
            requests across registered providers. For a business-friendly AI compute purchase
            experience, use StoryClaw. For protocol-native usage, use ClawFarm directly.
          </p>
          <div className="panel mt-6" style={{ borderLeft: '3px solid var(--green)' }}>
            <p className="section-text" style={{ padding: '18px 22px', fontSize: 14 }}>
              Looking for enterprise billing, AI compute packages, or API credits without
              wallet-based settlement? Use StoryClaw AI Compute Market.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/docs" className="btn-primary">Start with Docs</Link>
            <Link href="/providers" className="btn-secondary">Browse Registry</Link>
            <a href="https://www.storyclaw.com/ai-token" target="_blank" rel="noopener" className="btn-ghost">
              StoryClaw AI Compute Market
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-tag">Core usage flow</p>
          <div className="exec-flow exec-flow-3">
            {FLOW.map(([num, title, desc]) => (
              <div key={num} className="flow-step">
                <span className="flow-step-num">{num}</span>
                <div className="flow-step-title">{title}</div>
                <div className="flow-step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-tag">Why use ClawFarm directly</p>
          <div className="grid-2 mt-6">
            {DETAILS.map(([title, desc]) => (
              <div key={title} className="grid-cell">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-tag">Usage rewards</p>
          <h2 className="section-title text-[28px]">Rewards support verified demand.</h2>
          <p className="section-text mt-4">
            Usage mining remains part of ClawFarm economics, but it sits below the core
            protocol flow. Demand-side rewards accrue from verified token usage and are
            weighted by real usage, not by marketing claims.
          </p>
          <div className="panel mt-6">
            <div className="panel-row"><span className="panel-label">Demand pool</span><span className="panel-value">30% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Basis</span><span className="panel-value">Verified model tokens consumed</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear release</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
