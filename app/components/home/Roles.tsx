import Link from 'next/link'

type Role = { tag: string; title: string; accent: string; desc: string; ctaLabel: string; ctaHref: string; titleAccent?: string }

const ROLES: Role[] = [
  {
    tag: 'PROTOCOL USERS',
    title: 'Route AI',
    titleAccent: 'requests.',
    desc: 'Connect a wallet, deposit USDC, and route model calls through eco, auto, or premium — no centralized billing.',
    ctaLabel: 'Start Routing',
    ctaHref: '/users',
    accent: 'var(--green-bright)',
  },
  {
    tag: 'BUILDERS',
    title: 'Add model',
    titleAccent: 'routing.',
    desc: 'Drop the SDK into any AI app or agent. Provider choice, token metering, and on-chain settlement in one integration.',
    ctaLabel: 'Build with SDK',
    ctaHref: '/builders',
    accent: 'var(--accent)',
  },
  {
    tag: 'PROVIDERS',
    title: 'Sell compute',
    titleAccent: 'capacity.',
    desc: 'Register model APIs, GPU nodes, or custom endpoints. Earn 97% of every settled request — no approval gate.',
    ctaLabel: 'Become a Provider',
    ctaHref: '/install',
    accent: 'var(--amber)',
  },
  {
    tag: 'NODE OPERATORS',
    title: 'Compete on',
    titleAccent: 'price and latency.',
    desc: 'Publish route pricing into the open registry. Let demand flow to you based on efficiency and quality scores.',
    ctaLabel: 'Explore Registry',
    ctaHref: '/providers',
    accent: 'var(--green-bright)',
  },
]

export default function Roles() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-center">
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Who is ClawFarm for</p>
          <h2 className="section-title">
            Four entry points.<br />
            <span className="accent">One AI compute router.</span>
          </h2>
        </div>

        <div className="grid-roles">
          {ROLES.map((r, i) => (
            <div
              key={r.tag}
              className="role-card spotlight tilt fade-up"
              style={{
                ['--card-accent' as string]: r.accent,
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: r.accent, letterSpacing: '0.12em', marginBottom: 24 }}>
                {r.tag}
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16, color: 'var(--text-high)' }}>
                {r.title}{' '}
                {r.titleAccent && (
                  <span className="serif-italic" style={{ color: r.accent }}>{r.titleAccent}</span>
                )}
              </h4>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.65, marginBottom: 32 }}>
                {r.desc}
              </p>
              <Link href={r.ctaHref} className="btn-secondary" style={{ borderColor: r.accent, color: r.accent, display: 'inline-flex' }}>
                {r.ctaLabel} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
