const STEPS = [
  { num: '01', title: 'Route', desc: 'Users, apps, and agents route AI requests across registered model, API, and compute providers.' },
  { num: '02', title: 'Meter', desc: 'Every request is measured by model-token usage, provider, price, route, and account.' },
  { num: '03', title: 'Settle', desc: 'USDC moves through non-custodial escrow and settles on-chain after verified usage.' },
  { num: '04', title: 'Reward', desc: 'Verified supply and demand participation earn protocol rewards over time.' },
]

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">How it works</p>
        <h2 className="section-title">
          From request to <span className="accent">settlement</span><br />
          in one flow.
        </h2>
        <div className="exec-flow exec-flow-4">
          {STEPS.map((s) => (
            <div key={s.num} className="flow-step">
              <span className="flow-step-num">{s.num}</span>
              <div className="flow-step-title">{s.title}</div>
              <div className="flow-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
