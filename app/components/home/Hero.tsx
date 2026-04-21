import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-grid">
          <div>
            <span className="hero-eyebrow">
              <span className="dot" />
              Early Access Network
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              Settlement &lt; 400ms
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              Solana
            </span>

            <h1 className="hero-title">
              Route AI requests.<br />
              Meter <span className="accent">usage.</span><br />
              Settle on-chain.
            </h1>

            <p className="hero-subtitle">
              ClawFarm connects AI consumers with compute providers through decentralized
              routing, verifiable metering, and automatic settlement. No middleman.
              No custody. No permission needed.
            </p>

            <div className="hero-actions">
              <Link href="/providers" className="btn-primary">Become a Provider →</Link>
              <Link href="/docs" className="btn-secondary">Build on ClawFarm</Link>
              <Link href="/masterpool" className="btn-ghost">Explore the Network</Link>
            </div>
          </div>

          <div>
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Network Status</span>
                <span className="panel-live"><span className="state-dot" /> LIVE</span>
              </div>
              <div className="panel-row"><span className="panel-label">Routing</span><span className="panel-value">eco · auto · premium</span></div>
              <div className="panel-row"><span className="panel-label">Settlement</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>On-Chain (Solana)</span></div>
              <div className="panel-row"><span className="panel-label">Custody</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>Non-Custodial</span></div>
              <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">97%</span></div>
              <div className="panel-row"><span className="panel-label">Provider Gate</span><span className="panel-value">Open — No Approval</span></div>
              <div className="panel-row"><span className="panel-label">$CLAF Rewards</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>Active</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
