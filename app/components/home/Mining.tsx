import Link from 'next/link'

const STATS = [
  { value: '70', label: 'Supply-side Rewards', desc: 'To providers — verified token volume, price efficiency, and quality scores.' },
  { value: '30', label: 'Demand-side Rewards', desc: 'To protocol users and apps — proportional to verified AI token consumption.' },
  { value: '3', label: 'Protocol Treasury', desc: '70% Buyback & Burn · 20% Core Maintenance · 10% Infra Resilience.' },
]

export default function Mining() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-center">
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Rewards and economics</p>
          <h2 className="section-title">
            Rewards that reinforce<br />
            <span className="accent">verified usage.</span>
          </h2>
          <p className="section-text">
            $CLAF rewards flow to where the real work happens. The protocol takes 3% automatically, on-chain.
          </p>
        </div>

        <div className="grid-3" style={{ marginTop: 72 }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="stat-card spotlight tilt fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="stat-value"><span className="accent" data-count={s.value}>{s.value}</span>%</div>
              <div className="stat-label">{s.label}</div>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link href="/whitepaper" style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--green-bright)' }}>
            → Full economics in the Whitepaper
          </Link>
        </div>
      </div>
    </section>
  )
}
