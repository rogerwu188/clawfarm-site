import Link from 'next/link'

const TILES = [
  { label: 'Docs', desc: 'SDK, guides, API reference', href: '/docs', external: false },
  { label: 'Protocol', desc: 'Architecture, economics, verification', href: '/whitepaper', external: false },
  { label: 'Network', desc: 'Network state, providers, settlement', href: '/masterpool', external: false },
  { label: 'GitHub', desc: 'Open-source code, contribute', href: 'https://github.com/rogerwu188/clawfarm-site', external: true },
]

export default function Explore() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Explore</p>
        <h2 className="section-title">
          Keep <span className="accent">digging.</span>
        </h2>

        <div className="grid-4" style={{ marginTop: 40 }}>
          {TILES.map((t) => {
            const inner = (
              <>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-high)', marginBottom: 6 }}>
                  {t.label} <span style={{ color: 'var(--text-dim)' }}>→</span>
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-mid)', margin: 0 }}>{t.desc}</p>
              </>
            )
            const className = 'grid-cell'
            const style = {
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px',
              textDecoration: 'none',
            }
            return t.external ? (
              <a key={t.label} href={t.href} target="_blank" rel="noopener" className={className} style={style}>
                {inner}
              </a>
            ) : (
              <Link key={t.label} href={t.href} className={className} style={style}>
                {inner}
              </Link>
            )
          })}
        </div>

        <div style={{ marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/providers" className="btn-primary">Become a Provider →</Link>
          <Link href="/users" className="btn-secondary">For Users</Link>
          <a href="https://discord.gg/zxZmCFbzEn" target="_blank" rel="noopener" className="btn-ghost">Discord</a>
          <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener" className="btn-ghost">𝕏 @ClawFarm54892</a>
        </div>
      </div>
    </section>
  )
}
