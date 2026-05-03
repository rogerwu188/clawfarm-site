import Link from 'next/link'

const HERO_PATHS = [
  { label: 'Protocol users', href: '/users', desc: 'Route AI requests through USDC escrow and on-chain settlement.' },
  { label: 'Builders', href: '/builders', desc: 'Integrate model routing, token metering, and provider pricing.' },
  { label: 'Providers', href: '/install', desc: 'Register model APIs, GPU nodes, routers, or custom endpoints.' },
]

const HERO_BADGES = [
  'AI Token Routing',
  'Model Provider Marketplace',
  'Usage-Based Metering',
  'Non-Custodial USDC Escrow',
  'On-Chain Settlement',
  'Provider Rewards',
]

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
              The decentralized <span className="accent">AI token router.</span>
            </h1>

            <p className="hero-subtitle">
              ClawFarm routes AI requests across competing model, API, and compute
              providers, meters every token of usage, and settles payments on-chain
              through non-custodial USDC escrow.
            </p>

            <div className="hero-badges" aria-label="Protocol capabilities">
              {HERO_BADGES.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>

            <div className="hero-actions">
              <Link href="/users" className="btn-primary">Start Routing →</Link>
              <Link href="/install" className="btn-secondary">Become a Provider</Link>
              <Link href="/providers" className="btn-ghost">Explore Marketplace</Link>
            </div>

            <div className="hero-paths" aria-label="Choose your ClawFarm path">
              {HERO_PATHS.map((path) => (
                <Link key={path.label} href={path.href} className="hero-path-card">
                  <span>{path.label}</span>
                  <small>{path.desc}</small>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Network Status</span>
                <span className="panel-live"><span className="state-dot" /> LIVE</span>
              </div>
              <div className="panel-row"><span className="panel-label">Routing</span><span className="panel-value">eco · auto · premium</span></div>
              <div className="panel-row"><span className="panel-label">Settlement</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>On-Chain Solana</span></div>
              <div className="panel-row"><span className="panel-label">Custody</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>Non-Custodial</span></div>
              <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">97%</span></div>
              <div className="panel-row"><span className="panel-label">Provider Gate</span><span className="panel-value">Open — No Approval</span></div>
              <div className="panel-row"><span className="panel-label">Metering</span><span className="panel-value">AI Tokens / Model Tokens</span></div>
              <div className="panel-row"><span className="panel-label">Marketplace</span><span className="panel-value">Models · APIs · GPUs</span></div>
              <div className="panel-note">
                Select a route, sign token usage, and let settlement happen without platform custody.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
