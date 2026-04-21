import Link from 'next/link'

export default function Mining() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Dual-sided mining</p>
        <h2 className="section-title">
          Earn $CLAF by <span className="accent">serving</span><br />
          or <span className="accent">consuming</span> AI.
        </h2>
        <p className="section-text">
          The $CLAF token is distributed daily to both sides of the marketplace. Supply
          compute to earn 70%, or build and consume to earn 30%.
        </p>

        <div className="grid-3" style={{ marginTop: 56 }}>
          <div className="stat-card">
            <div className="stat-value"><span className="accent">70</span>%</div>
            <div className="stat-label">Supply-side Rewards</div>
            <p className="stat-desc">Distributed to Providers based on usage, price, and quality scores.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value"><span className="accent">30</span>%</div>
            <div className="stat-label">Demand-side Rewards</div>
            <p className="stat-desc">Usage mining: earn $CLAF proportional to the AI tokens you consume.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value"><span className="accent">3</span>%</div>
            <div className="stat-label">Autonomous Treasury</div>
            <p className="stat-desc">70% Buyback · 20% Core Maintenance · 10% Infra Resilience.</p>
          </div>
        </div>

        <div className="panel" style={{ marginTop: 48, maxWidth: 640 }}>
          <div className="panel-header">
            <span className="panel-tag">Treasury Allocation Mandate</span>
          </div>
          <div style={{ padding: '22px 24px' }}>
            <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: 18 }}>
              Every settlement collects a 3% fee into the Treasury PDA. An autonomous on-chain
              AI agent manages these funds:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['70% Buyback & Burn', 'Constant deflationary pressure for $CLAF.'],
                ['20% Core Maintenance', 'Security audits and protocol development.'],
                ['10% Infra Resilience', 'Funding Mirror Nodes and IPFS/Arweave storage.'],
              ].map(([k, v]) => (
                <li key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--green-bright)', fontSize: 14, lineHeight: 1.6 }}>↪</span>
                  <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.55, margin: 0 }}>
                    <b style={{ color: 'var(--text-high)', fontWeight: 500 }}>{k}:</b> {v}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <Link href="/whitepaper" style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--green-bright)' }}>
            → Detailed Economics in the Whitepaper
          </Link>
        </div>
      </div>
    </section>
  )
}
