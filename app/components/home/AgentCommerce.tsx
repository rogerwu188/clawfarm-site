export default function AgentCommerce() {
  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div className="agent-label" style={{ maxWidth: 720, margin: '0 auto 24px' }}>Future Use Case</div>

          <div className="agent-display" style={{ maxWidth: 720, margin: '0 auto 24px' }}>
            The AI economy runs<br />
            <span className="gradient-text">agent to agent.</span>
          </div>

          <p className="section-text" style={{ maxWidth: 1000, margin: '0 auto 40px' }}>
            The same routing, metering, and settlement primitives extend naturally to
            agent-to-agent transactions — data retrieval, evaluation, tool execution.
            Today: AI compute. Tomorrow: the full agent economy.
          </p>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-dim)',
            letterSpacing: '0.08em',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 14px',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
            On the roadmap — core focus today is AI compute routing
          </span>
        </div>
      </div>
    </section>
  )
}
