const WORK_TYPES = [
  {
    title: 'Models',
    desc: 'Route text, image, video, and reasoning requests across competing providers.',
  },
  {
    title: 'Tools',
    desc: 'Let agents call specialized tools and pay only for verified execution.',
  },
  {
    title: 'Data',
    desc: 'Purchase fresh, domain-specific data feeds from service agents.',
  },
  {
    title: 'Evaluation',
    desc: 'Use evaluator agents to verify task quality before settlement.',
  },
  {
    title: 'Compute',
    desc: 'Connect GPU nodes, API proxies, and custom model endpoints.',
  },
  {
    title: 'Settlement',
    desc: 'Use dual-signed proofs, escrow, and automatic payout flows.',
  },
]

export default function AgentCommerce() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Agent Commerce</p>
        <h2 className="section-title">
          From model routing to <span className="accent">agent-to-agent commerce.</span>
        </h2>
        <p className="section-text">
          Today, ClawFarm routes AI inference across registered providers. Tomorrow,
          the same protocol layer can settle autonomous work between agents: data
          retrieval, research, translation, code review, evaluation, and
          domain-specific AI services.
        </p>

        <div className="grid-3" style={{ marginTop: 48 }}>
          {WORK_TYPES.map((item) => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
