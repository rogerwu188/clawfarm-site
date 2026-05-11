const STATS = [
  { prefix: '', num: 97, suffix: '%', label: 'Provider Revenue', desc: 'Paid directly to providers on every settled request.' },
  { prefix: '<', num: 400, suffix: 'ms', label: 'Settlement Time', desc: 'On-chain finality on Solana. No batching, no delays.' },
  { prefix: '', num: 0, suffix: '∞', label: 'Provider Gate', desc: 'Open. No approval. Register and start earning today.' },
]

export default function Stats() {
  return (
    <div className="stats-strip">
      {STATS.map((s, i) => (
        <div key={i} className="stats-item spotlight fade-up">
          <div className="stats-num">
            {s.prefix}
            {s.num > 0
              ? <span data-count={s.num}>{s.num}</span>
              : null}
            <span className="hi">{s.suffix}</span>
          </div>
          <div className="stats-label">{s.label}</div>
          <div className="stats-desc">{s.desc}</div>
        </div>
      ))}
    </div>
  )
}
