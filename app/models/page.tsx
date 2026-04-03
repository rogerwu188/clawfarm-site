'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const MODEL_CATEGORIES = {
  'Language Models': [
    'GPT-4o','GPT-4o Mini','GPT-4.5 Preview',
    'Claude Opus 4','Claude Sonnet 4','Claude 3.5 Haiku',
    'Gemini 2.5 Pro','Gemini 2.5 Flash',
    'DeepSeek V3','DeepSeek R1',
    'Llama 4 Maverick','Llama 4 Scout',
    'Qwen 3 235B','Mistral Large',
    'Grok 3','Grok 3 Mini',
    'MiniMax M2.7','Kimi K2.5','Seed 2.0 Pro','Seed 2.0 Mini',
  ],
  'Image Generation': [
    'DALL·E 3','DALL·E 3 HD','GPT-4o Image',
    'Midjourney v7','Stable Diffusion 3.5','SDXL Turbo',
    'FLUX 1.1 Pro','FLUX Schnell',
    'Ideogram 3.0','Recraft V3',
    'Seedream 3.0','Kolors','Kling Image',
  ],
  'Video Generation': [
    'Sora','Veo 3',
    'Kling 2.0','Kling 2.0 Master',
    'Runway Gen-4','MiniMax Video-02',
    'Pika 2.0','Luma Dream Machine',
    'Wan 2.1 14B','HunyuanVideo','CogVideoX-5B','Seaweed',
  ],
}

const PROVIDER_DATA: Record<string, Array<{
  nm: string; addr: string;
  eI: string; eO: string;
  aI: string; aO: string;
  pI: string; pO: string;
  usage: string; tps: string; sr: string;
}>> = {
  'GPT-4o': [
    {nm:'NodeX Labs',addr:'0x7a3f...e2c1',eI:'$1.80',eO:'$7.20',aI:'$2.50',aO:'$10.00',pI:'$3.50',pO:'$14.00',usage:'12.4M',tps:'89 t/s',sr:'99.7%'},
    {nm:'InferStack',addr:'0xb91d...4f08',eI:'$2.20',eO:'$8.80',aI:'$3.00',aO:'$12.00',pI:'$4.20',pO:'$16.80',usage:'8.1M',tps:'72 t/s',sr:'99.4%'},
    {nm:'GCloud Relay',addr:'0x41ae...8c5f',eI:'$1.50',eO:'$6.00',aI:'$2.10',aO:'$8.40',pI:'$3.00',pO:'$12.00',usage:'5.9M',tps:'95 t/s',sr:'99.8%'},
    {nm:'Dragon Compute',addr:'0x2e8c...a7b3',eI:'$1.60',eO:'$6.40',aI:'$2.30',aO:'$9.20',pI:'$3.20',pO:'$12.80',usage:'3.2M',tps:'68 t/s',sr:'99.1%'},
    {nm:'MiniGPU Pool',addr:'0x5cf2...d914',eI:'$1.40',eO:'$5.60',aI:'$1.90',aO:'$7.60',pI:'$2.80',pO:'$11.20',usage:'2.7M',tps:'61 t/s',sr:'98.8%'},
  ],
  'DeepSeek R1': [
    {nm:'Dragon Compute',addr:'0x2e8c...a7b3',eI:'$0.38',eO:'$1.52',aI:'$0.55',aO:'$2.19',pI:'$0.78',pO:'$3.10',usage:'8.2M',tps:'124 t/s',sr:'99.9%'},
    {nm:'OpenPool DAO',addr:'0x9d0f...31e7',eI:'$0.42',eO:'$1.68',aI:'$0.60',aO:'$2.40',pI:'$0.85',pO:'$3.40',usage:'5.6M',tps:'118 t/s',sr:'99.8%'},
    {nm:'SinoNodes',addr:'0x6b4a...f2d0',eI:'$0.35',eO:'$1.40',aI:'$0.50',aO:'$2.00',pI:'$0.72',pO:'$2.88',usage:'4.1M',tps:'131 t/s',sr:'99.7%'},
    {nm:'ByteNodes',addr:'0xa8d1...c3f9',eI:'$0.50',eO:'$2.00',aI:'$0.70',aO:'$2.80',pI:'$1.00',pO:'$4.00',usage:'2.3M',tps:'105 t/s',sr:'99.5%'},
  ],
}

const FALLBACK = [
  {nm:'OpenPool DAO',addr:'0x9d0f...31e7',eI:'$0.80',eO:'$3.20',aI:'$1.20',aO:'$4.80',pI:'$1.80',pO:'$7.20',usage:'4.2M',tps:'95 t/s',sr:'99.4%'},
  {nm:'SinoNodes',addr:'0x6b4a...f2d0',eI:'$0.60',eO:'$2.40',aI:'$0.90',aO:'$3.60',pI:'$1.40',pO:'$5.60',usage:'3.1M',tps:'108 t/s',sr:'99.6%'},
  {nm:'ByteNodes',addr:'0xa8d1...c3f9',eI:'$0.70',eO:'$2.80',aI:'$1.00',aO:'$4.00',pI:'$1.50',pO:'$6.00',usage:'2.0M',tps:'88 t/s',sr:'99.2%'},
]

function ModelCard({ model, category }: { model: string; category: string }) {
  const providers = useMemo(() => PROVIDER_DATA[model] || FALLBACK, [model])
  const [expanded, setExpanded] = useState(false)
  const display = expanded ? providers : providers.slice(0, 3)

  return (
    <div style={{ borderBottom:'1px solid var(--border)', padding:'20px 0' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px', marginBottom:'16px' }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'4px' }}>{category.toUpperCase()}</div>
          <h3 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)' }}>{model}</h3>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)', marginTop:'4px' }}>{providers.length} providers</div>
        </div>
        <Link
          href={`/providers?model=${encodeURIComponent(model)}`}
          style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'4px', padding:'6px 14px', whiteSpace:'nowrap' }}
        >
          View all providers →
        </Link>
      </div>

      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'12px', minWidth:'600px' }}>
          <thead>
            <tr style={{ borderBottom:'2px solid var(--border)' }}>
              <th style={{ textAlign:'left', padding:'6px 10px', color:'var(--text-dim)', fontWeight:500, fontSize:'10px' }}>PROVIDER</th>
              <th style={{ textAlign:'center', padding:'6px 8px', color:'var(--green)', fontWeight:600, fontSize:'10px', borderBottom:'1px solid var(--border)' }} colSpan={2}>ECO</th>
              <th style={{ textAlign:'center', padding:'6px 8px', color:'var(--accent)', fontWeight:600, fontSize:'10px', borderBottom:'1px solid var(--border)' }} colSpan={2}>AUTO</th>
              <th style={{ textAlign:'center', padding:'6px 8px', color:'var(--amber)', fontWeight:600, fontSize:'10px', borderBottom:'1px solid var(--border)' }} colSpan={2}>PREMIUM</th>
              <th style={{ textAlign:'right', padding:'6px 10px', color:'var(--text-dim)', fontWeight:500, fontSize:'10px' }}>30D</th>
              <th style={{ textAlign:'center', padding:'6px 10px' }}></th>
            </tr>
          </thead>
          <tbody>
            {display.map((p, i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--border)' }}>
                <td style={{ padding:'10px 10px' }}>
                  <div style={{ fontWeight:600, color:'var(--green)', fontSize:'12px' }}>{p.nm}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-dim)' }}>{p.addr}</div>
                </td>
                <td style={{ padding:'10px 6px', textAlign:'right', color:'var(--text-mid)', fontSize:'11px' }}>{p.eI}</td>
                <td style={{ padding:'10px 6px', textAlign:'right', color:'var(--text-mid)', fontSize:'11px', opacity:0.7 }}>{p.eO}</td>
                <td style={{ padding:'10px 6px', textAlign:'right', color:'var(--text-mid)', fontSize:'11px' }}>{p.aI}</td>
                <td style={{ padding:'10px 6px', textAlign:'right', color:'var(--text-mid)', fontSize:'11px', opacity:0.7 }}>{p.aO}</td>
                <td style={{ padding:'10px 6px', textAlign:'right', color:'var(--text-mid)', fontSize:'11px' }}>{p.pI}</td>
                <td style={{ padding:'10px 6px', textAlign:'right', color:'var(--text-mid)', fontSize:'11px', opacity:0.7 }}>{p.pO}</td>
                <td style={{ padding:'10px 10px', textAlign:'right', color:'var(--accent)', fontSize:'11px', fontWeight:500 }}>{p.usage}</td>
                <td style={{ padding:'10px 8px', textAlign:'center' }}>
                  <Link href="/docs" style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'3px', padding:'3px 8px', whiteSpace:'nowrap' }}>Connect</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {providers.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ marginTop:'12px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)', background:'none', border:'none', cursor:'pointer', padding:'4px 0' }}
        >
          {expanded ? 'Show less ↑' : `Show all ${providers.length} providers ↓`}
        </button>
      )}
    </div>
  )
}

export default function ModelsPage() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'Language Models'
  const models = MODEL_CATEGORIES[activeCategory as keyof typeof MODEL_CATEGORIES] || []

  return (
    <main>
      {/* Page header */}
      <section className="section" style={{ borderBottom:'1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-mono text-[11px] text-[var(--text-dim)] mb-2 tracking-wider">MODEL DIRECTORY</div>
          <h1 className="text-[28px] font-bold">All models & providers</h1>
          <p className="text-[var(--text-mid)] text-[14px] mt-2 max-w-2xl">
            Every model on ClawFarm and the providers serving it. Click any model to see all providers, prices, and performance data.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div style={{ borderBottom:'1px solid var(--border)', background:'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display:'flex', gap:'0', overflowX:'auto' }}>
            {Object.keys(MODEL_CATEGORIES).map(cat => (
              <Link
                key={cat}
                href={`/models?category=${encodeURIComponent(cat)}`}
                style={{
                  fontFamily:'var(--font-mono)',
                  fontSize:'12px',
                  padding:'14px 20px',
                  whiteSpace:'nowrap',
                  borderBottom:'2px solid transparent',
                  color: cat === activeCategory ? 'var(--text)' : 'var(--text-dim)',
                  borderBottomColor: cat === activeCategory ? 'var(--green)' : 'transparent',
                  transition:'all 0.15s',
                  textDecoration:'none',
                }}
              >
                {cat === 'Language Models' ? '💬' : cat === 'Image Generation' ? '🎨' : '🎬'} {cat}
                <span style={{ marginLeft:'8px', fontSize:'10px', color:'var(--text-dim)' }}>({MODEL_CATEGORIES[cat as keyof typeof MODEL_CATEGORIES].length})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Model list */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          {models.map(model => (
            <ModelCard key={model} model={model} category={activeCategory} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ padding:'24px', border:'1px solid var(--border)', borderRadius:'8px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'14px', fontWeight:600, marginBottom:'6px' }}>Don&apos;t see your model?</div>
              <p style={{ color:'var(--text-mid)', fontSize:'13px' }}>ClawFarm is open — any provider can register any model. Missing a model? Become a provider.</p>
            </div>
            <Link href="/providers" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'4px', padding:'10px 20px', whiteSpace:'nowrap' }}>Register as Provider →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

