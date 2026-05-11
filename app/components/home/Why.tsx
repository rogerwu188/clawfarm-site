const PILLARS = [
  { title: 'Open Supply', desc: 'No gatekeepers. Any GPU operator, API reseller, or model host can register and start earning immediately.' },
  { title: 'Unified Metering', desc: 'Every request metered to the token — provider, price, route, and account recorded immutably on-chain.' },
  { title: 'Automatic Settlement', desc: 'Smart contracts split payments the moment usage is confirmed: 97% to the provider, 3% to treasury. Zero delays.' },
  { title: 'Non-Custodial', desc: 'Your USDC sits in a program-owned escrow (PDA). No human holds the key. Withdraw anytime, no questions asked.' },
]

export default function Why() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-center">
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Why ClawFarm</p>
          <h2 className="section-title">
            Open supply. Unified metering.<br />
            <span className="accent">Automatic</span> settlement.
          </h2>
        </div>

        <div className="grid-2" style={{ marginTop: 72 }}>
          {PILLARS.map((p, i) => (
            <div key={p.title} className="grid-cell spotlight tilt fade-up" style={{ transitionDelay: `${i * 0.08}s`, padding: '44px 40px' }}>
              <h4 style={{ fontSize: 22, marginBottom: 14 }}>{p.title}</h4>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
