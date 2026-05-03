import Link from 'next/link'

const COMPUTE_PROVIDERS = [
  ['NodeX Labs', 'Model API Proxy', 'GPT-4o · Claude · embeddings', '$2.50 / 1M input', '99.7%', '380ms', '94', 'Staked', '12.4M tokens'],
  ['Dragon Compute', 'GPU Node', 'DeepSeek R1 · V3 · Qwen', '$0.55 / 1M input', '99.9%', '420ms', '92', 'Staked', '8.2M tokens'],
  ['OpenPool DAO', 'Multi-Model Router', 'Llama · SD · Wan video', '$0.20 / 1M input', '99.4%', '510ms', '88', 'Staked', '5.0M tokens'],
  ['StudioRelay', 'Custom Model Endpoint', 'Runway · Kling · image/video', '$0.25 / sec', '99.2%', '610ms', '90', 'Staked', '410K seconds'],
  ['MiniGPU Pool', 'GPU / Compute Node', 'GPT-4o Mini · embeddings', '$0.15 / 1M input', '99.5%', '340ms', '87', 'Staked', '7.6M tokens'],
]

function ProviderTable({ rows }: { rows: string[][] }) {
  const headers = ['Provider', 'Type', 'Models / Services', 'Price', 'Success', 'Latency', 'Quality', 'Stake', '30d Usage', '']
  return (
    <div className="mkt-table-wrap">
      <table className="mkt-table">
        <thead>
          <tr>
            {headers.map((h) => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <td className="td-model" data-label="Provider">{row[0]}</td>
              <td data-label="Type">{row[1]}</td>
              <td data-label="Services">{row[2]}</td>
              <td className="td-right" data-label="Price">{row[3]}</td>
              <td className="td-usage" data-label="Success rate">{row[4]}</td>
              <td className="td-ctx" data-label="Latency">{row[5]}</td>
              <td className="td-usage" data-label="Quality score">{row[6]}</td>
              <td className="td-providers-link" data-label="Stake status">{row[7]}</td>
              <td className="td-right" data-label="30d usage">{row[8]}</td>
              <td className="td-cta">
                <Link href="/docs" className="mkt-integrate-btn">Route / Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ProvidersPage() {
  return (
    <main>
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
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
        <div className="max-w-6xl mx-auto px-6">
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
