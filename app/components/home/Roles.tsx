import Link from 'next/link'

type Role = {
  tag: string
  title: string
  titleAccent?: string
  desc: string
  ctaLabel: string
  ctaHref: string
  accent: string
}

const ROLES: Role[] = [
  {
    tag: 'PROVIDER',
    title: 'Sell verified',
    titleAccent: 'AI work.',
    desc: 'Sell models, API endpoints, GPU compute, data services, or agent capabilities. Earn USDC and protocol rewards for verified work.',
    ctaLabel: 'Become a Provider',
    ctaHref: '/install',
    accent: 'var(--green-bright)',
  },
  {
    tag: 'BUILDER',
    title: 'Build autonomous',
    titleAccent: 'AI apps.',
    desc: 'Build AI apps and autonomous agents that route work through ClawFarm without managing billing, provider contracts, or usage ledgers.',
    ctaLabel: 'Build with SDK',
    ctaHref: '/builders',
    accent: 'var(--accent)',
  },
  {
    tag: 'DEMAND APP',
    title: 'Bring demand',
    titleAccent: 'into the protocol.',
    desc: 'Bring human or enterprise demand into the protocol through apps like StoryClaw. Let users consume AI work while ClawFarm handles routing, metering, and settlement.',
    ctaLabel: 'Protocol Users',
    ctaHref: '/users',
    accent: 'var(--amber)',
  },
  {
    tag: 'EVALUATOR',
    title: 'Verify outputs',
    titleAccent: 'before settlement.',
    desc: 'Verify task quality, output validity, and service completion for agent-to-agent transactions.',
    ctaLabel: 'Explore Registry',
    ctaHref: '/providers',
    accent: 'var(--green-bright)',
  },
]

export default function Roles() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Who is ClawFarm for</p>
        <h2 className="section-title">
          Four roles. <span className="accent">One settlement layer.</span>
        </h2>
        <div className="grid-4" style={{ marginTop: 48 }}>
          {ROLES.map((r) => (
            <div key={r.tag} style={{ borderTop: `2px solid ${r.accent}` }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: r.accent, letterSpacing: '0.12em', marginBottom: 16 }}>{r.tag}</p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 16, color: 'var(--text-high)' }}>
                {r.title}{' '}
                {r.titleAccent && <span className="serif-italic" style={{ color: r.accent }}>{r.titleAccent}</span>}
              </h4>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>{r.desc}</p>
              <Link
                href={r.ctaHref}
                className="btn-secondary"
                style={{ borderColor: r.accent, color: r.accent, display: 'inline-flex' }}
              >
                {r.ctaLabel} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
