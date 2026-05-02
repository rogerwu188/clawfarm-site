import Link from 'next/link'

type LLMRow = { m: string; nm: string; p: string; i: string; o: string; c: string; u: string; n: number }
type ImgRow = { m: string; nm: string; p: string; pr: string; r: string; u: string; n: number }
type VidRow = ImgRow

const LLM: LLMRow[] = [
  { m: 'GPT-4o', nm: 'NodeX Labs', p: '0x7a3f...e2c1', i: '$2.50', o: '$10.00', c: '128K', u: '12.4M tkn', n: 14 },
  { m: 'Claude Sonnet 4', nm: 'InferStack', p: '0xb91d...4f08', i: '$3.00', o: '$15.00', c: '200K', u: '9.8M tkn', n: 11 },
  { m: 'DeepSeek R1', nm: 'Dragon Compute', p: '0x2e8c...a7b3', i: '$0.55', o: '$2.19', c: '128K', u: '8.2M tkn', n: 23 },
  { m: 'GPT-4o Mini', nm: 'MiniGPU Pool', p: '0x5cf2...d914', i: '$0.15', o: '$0.60', c: '128K', u: '7.6M tkn', n: 18 },
  { m: 'Gemini 2.5 Pro', nm: 'GCloud Relay', p: '0x41ae...8c5f', i: '$1.25', o: '$7.00', c: '1M', u: '6.1M tkn', n: 9 },
  { m: 'Claude Opus 4', nm: 'InferStack', p: '0xb91d...4f08', i: '$10.00', o: '$50.00', c: '200K', u: '5.5M tkn', n: 7 },
  { m: 'Llama 4 Maverick', nm: 'OpenPool DAO', p: '0x9d0f...31e7', i: '$0.20', o: '$0.50', c: '256K', u: '5.0M tkn', n: 31 },
  { m: 'DeepSeek V3', nm: 'Dragon Compute', p: '0x2e8c...a7b3', i: '$0.27', o: '$0.55', c: '128K', u: '4.8M tkn', n: 26 },
  { m: 'Qwen 3 235B', nm: 'SinoNodes', p: '0x6b4a...f2d0', i: '$0.25', o: '$0.60', c: '128K', u: '4.3M tkn', n: 19 },
  { m: 'Gemini 2.5 Flash', nm: 'GCloud Relay', p: '0x41ae...8c5f', i: '$0.075', o: '$0.30', c: '1M', u: '4.1M tkn', n: 12 },
]

const IMG: ImgRow[] = [
  { m: 'FLUX 1.1 Pro', nm: 'DiffusionDAO', p: '0xc3e7...b8a2', pr: '$0.040', r: '1024×1024', u: '820K img', n: 8 },
  { m: 'Midjourney v7', nm: 'MJ Relay', p: '0xf12b...6d4e', pr: '$0.050', r: '1024×1024', u: '680K img', n: 5 },
  { m: 'DALL·E 3 HD', nm: 'NodeX Labs', p: '0x7a3f...e2c1', pr: '$0.080', r: '1024×1792', u: '520K img', n: 11 },
  { m: 'Stable Diffusion 3.5', nm: 'OpenPool DAO', p: '0x9d0f...31e7', pr: '$0.006', r: '1024×1024', u: '490K img', n: 27 },
  { m: 'Seedream 3.0', nm: 'ByteNodes', p: '0xa8d1...c3f9', pr: '$0.016', r: '1024×1024', u: '290K img', n: 6 },
]

const VID: VidRow[] = [
  { m: 'Kling 2.0', nm: 'SinoNodes', p: '0x6b4a...f2d0', pr: '$0.10', r: '1080p', u: '45K sec', n: 9 },
  { m: 'Sora', nm: 'NodeX Labs', p: '0x7a3f...e2c1', pr: '$0.40', r: '1080p', u: '38K sec', n: 4 },
  { m: 'MiniMax Video-02', nm: 'SinoNodes', p: '0x6b4a...f2d0', pr: '$0.08', r: '1080p', u: '32K sec', n: 6 },
  { m: 'Runway Gen-4', nm: 'StudioRelay', p: '0xd4c8...17ab', pr: '$0.25', r: '1080p', u: '28K sec', n: 5 },
  { m: 'Wan 2.1 14B', nm: 'OpenPool DAO', p: '0x9d0f...31e7', pr: '$0.04', r: '720p', u: '22K sec', n: 15 },
]

function ProviderCell({ nm, p }: { nm: string; p: string }) {
  return (
    <td data-label="Top Provider">
      <div className="td-provider-name">{nm}</div>
      <div className="td-provider-addr">{p}</div>
    </td>
  )
}

export default function Marketplace() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Provider Registry</p>
        <h2 className="section-title">
          Open supply for <span className="accent">AI work.</span>
        </h2>
        <p className="section-text">
          Model routing is the first live surface. The same registry can price and route
          data services, agent services, evaluators, API proxies, GPU nodes, and custom endpoints.
        </p>

        {/* LLM */}
        <div style={{ marginTop: 56, marginBottom: 56 }}>
          <div className="mkt-category-head">
            <div>
              <div className="mkt-category-title">Language <span className="accent">models</span></div>
              <div className="mkt-category-meta" style={{ marginTop: 6 }}>Per 1M tokens · Top 10 by 30d volume</div>
            </div>
            <Link href="/models?category=Language+Models" className="mkt-category-link">→ View all language models</Link>
          </div>
          <div className="mkt-table-wrap">
            <table className="mkt-table">
              <thead><tr>
                <th style={{ width: 40 }}>#</th>
                <th>Model</th>
                <th>Top Provider</th>
                <th className="num">Input</th>
                <th className="num">Output</th>
                <th className="ctr">Ctx</th>
                <th className="num">30d Usage</th>
                <th className="ctr">All</th>
                <th></th>
              </tr></thead>
              <tbody>
                {LLM.map((r, i) => (
                  <tr key={i}>
                    <td className="td-num" data-label="Rank">{i + 1}</td>
                    <td className="td-model" data-label="Model">{r.m}</td>
                    <ProviderCell nm={r.nm} p={r.p} />
                    <td className="td-right" data-label="Input">{r.i}</td>
                    <td className="td-muted" data-label="Output">{r.o}</td>
                    <td className="td-ctx" data-label="Ctx">{r.c}</td>
                    <td className="td-usage" data-label="30d Usage">{r.u}</td>
                    <td className="td-providers-link" data-label="Providers">
                      <Link href={`/providers?model=${encodeURIComponent(r.m)}`}>{r.n} providers</Link>
                    </td>
                    <td className="td-cta">
                      <Link href="/docs" className="mkt-integrate-btn">Start Integrating</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IMAGE */}
        <div style={{ marginBottom: 56 }}>
          <div className="mkt-category-head">
            <div>
              <div className="mkt-category-title">Image <span className="accent">generation</span></div>
              <div className="mkt-category-meta" style={{ marginTop: 6 }}>Per image · Top 5 by 30d volume</div>
            </div>
            <Link href="/models?category=Image+Generation" className="mkt-category-link">→ View all image models</Link>
          </div>
          <div className="mkt-table-wrap">
            <table className="mkt-table">
              <thead><tr>
                <th style={{ width: 40 }}>#</th>
                <th>Model</th>
                <th>Top Provider</th>
                <th className="num">Price</th>
                <th className="ctr">Res</th>
                <th className="num">30d Usage</th>
                <th className="ctr">All</th>
                <th></th>
              </tr></thead>
              <tbody>
                {IMG.map((r, i) => (
                  <tr key={i}>
                    <td className="td-num" data-label="Rank">{i + 1}</td>
                    <td className="td-model" data-label="Model">{r.m}</td>
                    <ProviderCell nm={r.nm} p={r.p} />
                    <td className="td-right" data-label="Price">{r.pr}</td>
                    <td className="td-ctx" data-label="Res">{r.r}</td>
                    <td className="td-usage" data-label="30d Usage">{r.u}</td>
                    <td className="td-providers-link" data-label="Providers">
                      <Link href={`/providers?model=${encodeURIComponent(r.m)}`}>{r.n} providers</Link>
                    </td>
                    <td className="td-cta">
                      <Link href="/docs" className="mkt-integrate-btn">Start Integrating</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* VIDEO */}
        <div>
          <div className="mkt-category-head">
            <div>
              <div className="mkt-category-title">Video <span className="accent">generation</span></div>
              <div className="mkt-category-meta" style={{ marginTop: 6 }}>Per second · Top 5 by 30d volume</div>
            </div>
            <Link href="/models?category=Video+Generation" className="mkt-category-link">→ View all video models</Link>
          </div>
          <div className="mkt-table-wrap">
            <table className="mkt-table">
              <thead><tr>
                <th style={{ width: 40 }}>#</th>
                <th>Model</th>
                <th>Top Provider</th>
                <th className="num">Price/s</th>
                <th className="ctr">Res</th>
                <th className="num">30d Usage</th>
                <th className="ctr">All</th>
                <th></th>
              </tr></thead>
              <tbody>
                {VID.map((r, i) => (
                  <tr key={i}>
                    <td className="td-num" data-label="Rank">{i + 1}</td>
                    <td className="td-model" data-label="Model">{r.m}</td>
                    <ProviderCell nm={r.nm} p={r.p} />
                    <td className="td-right" data-label="Price/s">{r.pr}</td>
                    <td className="td-ctx" data-label="Res">{r.r}</td>
                    <td className="td-usage" data-label="30d Usage">{r.u}</td>
                    <td className="td-providers-link" data-label="Providers">
                      <Link href={`/providers?model=${encodeURIComponent(r.m)}`}>{r.n} providers</Link>
                    </td>
                    <td className="td-cta">
                      <Link href="/docs" className="mkt-integrate-btn">Start Integrating</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/providers" className="btn-primary">Become a Provider</Link>
          <Link href="/docs" className="btn-secondary">Full API Docs</Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>
            * Provider &amp; pricing data illustrative. Network stats update in real time.
          </span>
        </div>
      </div>
    </section>
  )
}
