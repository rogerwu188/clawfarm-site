import Link from 'next/link'

type Row = {
  provider: string
  type: string
  models: string
  price: string
  success: string
  latency: string
  usage: string
}

const COMPUTE_PROVIDERS: Row[] = [
  { provider: 'NodeX Labs',     type: 'Model API Proxy',       models: 'GPT-4o · Claude · embeddings', price: '$2.50 / 1M input', success: '99.7%', latency: '380ms', usage: '12.4M tokens' },
  { provider: 'Dragon Compute', type: 'GPU Node',              models: 'DeepSeek R1 · V3 · Qwen',      price: '$0.55 / 1M input', success: '99.9%', latency: '420ms', usage: '8.2M tokens'  },
  { provider: 'OpenPool DAO',   type: 'Multi-Model Router',    models: 'Llama · SD · Wan video',       price: '$0.20 / 1M input', success: '99.4%', latency: '510ms', usage: '5.0M tokens'  },
  { provider: 'StudioRelay',    type: 'Custom Model Endpoint', models: 'Runway · Kling · image/video', price: '$0.25 / sec',      success: '99.2%', latency: '610ms', usage: '410K seconds' },
  { provider: 'MiniGPU Pool',   type: 'GPU / Compute Node',    models: 'GPT-4o Mini · embeddings',     price: '$0.15 / 1M input', success: '99.5%', latency: '340ms', usage: '7.6M tokens'  },
]

const GRID = 'minmax(0,160px) minmax(0,170px) minmax(220px,1fr) minmax(0,150px) minmax(0,80px) minmax(0,80px) minmax(0,130px) minmax(0,150px)'

function ProviderTable({ rows }: { rows: Row[] }) {
  return (
    <div className="mkt-table-wrap" style={{ padding: 0 }}>
      <div className="provider-grid-head" style={{ display: 'grid', gridTemplateColumns: GRID, alignItems: 'center', padding: '11px 20px', borderBottom: '1px solid var(--border)', background: 'rgba(20,23,27,0.5)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
        <div>Provider</div>
        <div>Type</div>
        <div>Models / Services</div>
        <div style={{ textAlign: 'right' }}>Price</div>
        <div style={{ textAlign: 'right' }}>Success</div>
        <div style={{ textAlign: 'right' }}>Latency</div>
        <div style={{ textAlign: 'right' }}>30d Usage</div>
        <div></div>
      </div>
      {rows.map((r, idx) => (
        <div
          key={r.provider}
          className="provider-grid-row"
          style={{
            display: 'grid',
            gridTemplateColumns: GRID,
            alignItems: 'center',
            padding: '13px 20px',
            borderBottom: idx === rows.length - 1 ? 'none' : '1px solid rgba(26,29,34,0.7)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text-high)', letterSpacing: '-0.015em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{r.provider}</div>
          <div style={{ color: 'var(--text-mid)', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{r.type}</div>
          <div style={{ color: 'var(--text-mid)', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{r.models}</div>
          <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>{r.price}</div>
          <div style={{ textAlign: 'right', color: 'var(--green)', fontSize: 12 }}>{r.success}</div>
          <div style={{ textAlign: 'right', color: 'var(--text-dim)', fontSize: 12 }}>{r.latency}</div>
          <div style={{ textAlign: 'right', color: 'var(--text-dim)', fontSize: 12, whiteSpace: 'nowrap' }}>{r.usage}</div>
          <div style={{ textAlign: 'right' }}>
            <Link href="/docs" className="mkt-integrate-btn">Route / Details</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProvidersPage() {
  return (
    <main>
      <section className="section">
        <div className="section-inner">
          <p className="section-tag">Marketplace</p>
          <h1 className="section-title text-[38px] leading-tight">
            Open marketplace for AI compute providers.
          </h1>
          <p className="section-text mt-5">
            The marketplace is not a curated SaaS catalog. It is an open provider
            registry for model providers, API proxies, GPU nodes, multi-model routers,
            and custom model endpoints. Any compliant provider can register, publish
            pricing, stake $CLAF, and compete for routed AI requests.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/install" className="btn-primary">Become a Provider</Link>
            <Link href="/docs" className="btn-secondary">Provider Setup</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="mkt-category-head">
            <div>
              <div className="mkt-category-title">Compute <span className="accent">Providers</span></div>
              <div className="mkt-category-meta mt-1">Models, APIs, GPU nodes, routers, custom endpoints</div>
            </div>
          </div>
          <ProviderTable rows={COMPUTE_PROVIDERS} />
        </div>
      </section>
    </main>
  )
}
