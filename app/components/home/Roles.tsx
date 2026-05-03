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
    tag: 'PROTOCOL USERS',
    title: 'Route AI',
    titleAccent: 'requests.',
    desc: 'Connect a wallet, deposit USDC into escrow, and route model calls through eco, auto, or premium modes without centralized billing.',
    ctaLabel: 'Start Routing',
    ctaHref: '/users',
    accent: 'var(--green-bright)',
  },
  {
    tag: 'BUILDERS',
    title: 'Add model',
    titleAccent: 'routing.',
    desc: 'Use the SDK to add provider choice, token metering, escrow, and on-chain settlement to AI apps and agent products.',
    ctaLabel: 'Build with SDK',
    ctaHref: '/builders',
    accent: 'var(--accent)',
  },
  {
    tag: 'PROVIDERS',
    title: 'Sell compute',
    titleAccent: 'capacity.',
    desc: 'Register model endpoints, API proxies, GPU nodes, multi-model routers, or custom model services. Earn USDC and protocol rewards for verified usage.',
    ctaLabel: 'Become a Provider',
    ctaHref: '/install',
    accent: 'var(--amber)',
  },
  {
    tag: 'NODE OPERATORS',
    title: 'Compete on',
    titleAccent: 'price and latency.',
    desc: 'Operate GPU or model infrastructure, publish route pricing, and let demand flow through the open provider registry.',
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
          Four entry points. <span className="accent">One AI compute router.</span>
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
