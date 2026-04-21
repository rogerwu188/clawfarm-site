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
    title: 'Sell compute.',
    titleAccent: 'Earn USDC + $CLAF.',
    desc: 'You have a GPU, a model endpoint, or an API key. Register on-chain, set your price, and start serving inference. Settlement goes directly to your wallet.',
    ctaLabel: 'Become a Provider',
    ctaHref: '/providers',
    accent: 'var(--green-bright)',
  },
  {
    tag: 'BUILDER',
    title: 'Build on',
    titleAccent: 'decentralized AI infra.',
    desc: 'Use ClawFarm SDK to route AI requests across multiple providers with one integration. Auto-failover, cost optimization, and on-chain usage receipts built in.',
    ctaLabel: 'Build with SDK',
    ctaHref: '/docs',
    accent: 'var(--accent)',
  },
  {
    tag: 'NODE OPERATOR',
    title: 'Run infrastructure.',
    titleAccent: 'Power the network.',
    desc: 'Deploy GPU nodes, host open-source models, or run relay infrastructure. Earn $CLAF rewards proportional to your verified contribution.',
    ctaLabel: 'Set Up a Node',
    ctaHref: '/install',
    accent: 'var(--amber)',
  },
]

export default function Roles() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Who is ClawFarm for</p>
        <h2 className="section-title">
          Three roles. <span className="accent">One network.</span>
        </h2>
        <div className="grid-3" style={{ marginTop: 48 }}>
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
