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
        <div className="section-center">
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Explore</p>
          <h2 className="section-title">Keep <span className="accent">digging.</span></h2>
        </div>

        <div className="grid-4" style={{ marginTop: 56 }}>
          {TILES.map((t, i) => {
            const inner = (
              <>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-high)', marginBottom: 6 }}>
                  {t.label} <span style={{ color: 'var(--text-dim)' }}>→</span>
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-mid)', margin: 0 }}>{t.desc}</p>
              </>
            )
            const cls = `grid-cell spotlight tilt fade-up`
            const style = {
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px',
              textDecoration: 'none',
              transitionDelay: `${i * 0.08}s`,
            }
            return t.external ? (
              <a key={t.label} href={t.href} target="_blank" rel="noopener" className={cls} style={style}>{inner}</a>
            ) : (
              <Link key={t.label} href={t.href} className={cls} style={style}>{inner}</Link>
            )
          })}
        </div>

        <div style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link href="/install" className="btn-cta">Become a Provider →</Link>
          <Link href="/users" className="btn-secondary">For Users</Link>
        </div>
      </div>
    </section>
  )
}
