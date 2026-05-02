import Link from 'next/link'

const HERO_PATHS = [
  { label: 'Protocol users', href: '/users', desc: 'Route AI work through escrow, metering, and settlement.' },
  { label: 'Builders', href: '/builders', desc: 'Let agents buy models, tools, data, and evaluation.' },
  { label: 'Providers', href: '/install', desc: 'Register compute, APIs, data, evaluators, or agent services.' },
]

const HERO_BADGES = [
  'Agent-to-Agent Commerce',
  'Non-Custodial USDC Escrow',
  'Verifiable Usage Metering',
  'Provider Registry',
  'On-Chain Settlement',
  'Open Routing Modes',
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
              The settlement layer for <span className="accent">autonomous AI work.</span>
            </h1>

            <p className="hero-subtitle">
              ClawFarm enables AI agents, apps, and providers to discover, route,
              meter, verify, and settle AI work across models, tools, data services,
              and compute endpoints — without custody or centralized billing.
            </p>

            <div className="hero-badges" aria-label="Protocol capabilities">
              {HERO_BADGES.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>

            <div className="hero-actions">
              <Link href="/docs" className="btn-primary">Build on ClawFarm →</Link>
              <Link href="/install" className="btn-secondary">Become a Provider</Link>
              <Link href="/masterpool" className="btn-ghost">Explore the Network</Link>
              <Link href="/whitepaper" className="btn-ghost">Read the Protocol</Link>
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
              <div className="panel-row"><span className="panel-label">Settlement</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>On-Chain (Solana)</span></div>
              <div className="panel-row"><span className="panel-label">Custody</span><span className="panel-value" style={{ color: 'var(--green-bright)' }}>Non-Custodial</span></div>
              <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">97%</span></div>
              <div className="panel-row"><span className="panel-label">Provider Gate</span><span className="panel-value">Open — No Approval</span></div>
              <div className="panel-row"><span className="panel-label">AI Work Units</span><span className="panel-value">Models · Tools · Data · Eval</span></div>
              <div className="panel-note">
                Select a route, sign usage, and let settlement happen without platform custody.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
