const STEPS = [
  { num: '01', title: 'Register', desc: 'Providers register models, APIs, GPU nodes, agent services, data services, or evaluators.' },
  { num: '02', title: 'Discover', desc: 'Agents and apps discover available services through the provider registry.' },
  { num: '03', title: 'Execute', desc: 'Requests and tasks are routed through eco, auto, or premium modes.' },
  { num: '04', title: 'Verify', desc: 'Usage proofs, task outputs, and evaluator signals confirm valid work.' },
  { num: '05', title: 'Settle', desc: 'USDC flows from user escrow to the provider wallet through smart contracts.' },
  { num: '06', title: 'Reward', desc: 'Verified contribution earns protocol rewards based on usage, price, and quality.' },
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
