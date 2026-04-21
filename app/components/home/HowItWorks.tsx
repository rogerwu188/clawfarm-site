const STEPS = [
  { num: '01', title: 'Provide', desc: 'Register your model, GPU, or API endpoint. Set your own price. Stake $CLAF.' },
  { num: '02', title: 'Route', desc: 'Requests are routed to the best Provider by eco, auto, or premium mode.' },
  { num: '03', title: 'Meter', desc: 'Every token is counted client-side. Both parties sign a usage proof.' },
  { num: '04', title: 'Settle', desc: 'Smart contract splits payment: 97% Provider, 3% Treasury. Automatic.' },
  { num: '05', title: 'Earn', desc: '$CLAF tokens distributed every Epoch. More usage × better price × higher quality = more rewards.' },
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
        <div className="exec-flow">
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
