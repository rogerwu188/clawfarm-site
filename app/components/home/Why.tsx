const PILLARS = [
  { title: 'Open Supply', desc: 'Anyone can register as a Provider — GPU operators, cloud instances, API resellers, fine-tuned model hosts. No approval. No whitelist.' },
  { title: 'Unified Metering', desc: 'Every request is metered with dual-signature verification. Client counts tokens independently. Both parties sign. No trust required.' },
  { title: 'Automatic Settlement', desc: 'Smart contract splits every payment: 97% to Provider, 3% to Treasury. No invoices. No payment delays.' },
  { title: 'Non-Custodial', desc: 'User USDC sits in a program-owned escrow (PDA). No human holds the key. Withdraw anytime.' },
]

export default function Why() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Why ClawFarm</p>
        <h2 className="section-title">
          Open supply. Unified metering.<br />
          <span className="accent">Automatic</span> settlement.
        </h2>
        <div className="grid-2" style={{ marginTop: 48 }}>
          {PILLARS.map((p) => (
            <div key={p.title} className="grid-cell">
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
