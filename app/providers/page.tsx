'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useMemo, Suspense } from 'react'

const MODELS = [
  'GPT-4o','GPT-4o Mini','Claude Sonnet 4','Claude Opus 4','Claude 3.5 Haiku',
  'DeepSeek R1','DeepSeek V3','Gemini 2.5 Pro','Gemini 2.5 Flash',
  'Llama 4 Maverick','Llama 4 Scout','Qwen 3 235B','Mistral Large',
  'Grok 3','Grok 3 Mini','MiniMax M2.7','Kimi K2.5','Seed 2.0 Pro','Seed 2.0 Mini',
]

const PROVIDERS: Record<string, Array<{
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
  'Claude Sonnet 4': [
    {nm:'InferStack',addr:'0xb91d...4f08',eI:'$2.20',eO:'$11.00',aI:'$3.00',aO:'$15.00',pI:'$4.50',pO:'$22.00',usage:'9.8M',tps:'78 t/s',sr:'99.6%'},
    {nm:'NodeX Labs',addr:'0x7a3f...e2c1',eI:'$1.80',eO:'$9.00',aI:'$2.60',aO:'$13.00',pI:'$3.80',pO:'$19.00',usage:'6.4M',tps:'82 t/s',sr:'99.5%'},
    {nm:'HaikuFarm',addr:'0xd4c8...17ab',eI:'$2.00',eO:'$10.00',aI:'$2.80',aO:'$14.00',pI:'$4.00',pO:'$20.00',usage:'3.9M',tps:'71 t/s',sr:'99.3%'},
  ],
}

const FALLBACK_PROVIDERS = [
  {nm:'OpenPool DAO',addr:'0x9d0f...31e7',eI:'$0.80',eO:'$3.20',aI:'$1.20',aO:'$4.80',pI:'$1.80',pO:'$7.20',usage:'4.2M',tps:'95 t/s',sr:'99.4%'},
  {nm:'SinoNodes',addr:'0x6b4a...f2d0',eI:'$0.60',eO:'$2.40',aI:'$0.90',aO:'$3.60',pI:'$1.40',pO:'$5.60',usage:'3.1M',tps:'108 t/s',sr:'99.6%'},
  {nm:'ByteNodes',addr:'0xa8d1...c3f9',eI:'$0.70',eO:'$2.80',aI:'$1.00',aO:'$4.00',pI:'$1.50',pO:'$6.00',usage:'2.0M',tps:'88 t/s',sr:'99.2%'},
]

function ProvidersContent() {
  const searchParams = useSearchParams()
  const model = searchParams.get('model') || 'GPT-4o'
  const providers = useMemo(() => PROVIDERS[model] || FALLBACK_PROVIDERS, [model])

  return (
    <>
      {/* Model selector strip */}
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 overflow-x-auto">
          <span className="shrink-0 text-[11px] text-[#8a8f98] font-mono">MODEL</span>
          <div className="flex gap-2 flex-wrap">
            {MODELS.map(m => (
              <Link
                key={m}
                href={`/providers?model=${encodeURIComponent(m)}`}
                className={`shrink-0 text-[11px] font-mono px-3 py-1 rounded transition-colors ${
                  m === model
                    ? 'bg-[var(--green)] text-black'
                    : 'text-[#8a8f98] hover:text-white border border-[var(--border)]'
                }`}
              >
                {m}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Page header */}
      <section className="section" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-[11px] text-[var(--text-dim)] mb-2 tracking-wider">PROVIDER LIST</div>
              <h1 className="text-[28px] font-bold">{model}</h1>
              <p className="text-[var(--text-mid)] text-[14px] mt-1">
                {providers.length} providers registered · Sorted by 30D usage
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/providers/register" className="btn-primary text-[13px]">Register as Provider</Link>
              <Link href="/docs" className="btn-secondary text-[13px]">API Docs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Provider table */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', letterSpacing:'0.5px', width:'220px'}}>PROVIDER</th>
                  <th style={{textAlign:'center', padding:'6px 8px', color:'var(--green)', fontWeight:600, fontSize:'11px', borderBottom:'1px solid var(--border)'}} colSpan={2}>ECO</th>
                  <th style={{textAlign:'center', padding:'6px 8px', color:'var(--accent)', fontWeight:600, fontSize:'11px', borderBottom:'1px solid var(--border)'}} colSpan={2}>AUTO</th>
                  <th style={{textAlign:'center', padding:'6px 8px', color:'var(--amber)', fontWeight:600, fontSize:'11px', borderBottom:'1px solid var(--border)'}} colSpan={2}>PREMIUM</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D USAGE</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>SPEED</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>SR</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr>
                <tr>
                  <th></th>
                  <th style={{textAlign:'right', padding:'3px 8px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px', borderBottom:'1px solid var(--border)'}}>input</th>
                  <th style={{textAlign:'right', padding:'3px 8px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px', borderBottom:'1px solid var(--border)'}}>output</th>
                  <th style={{textAlign:'right', padding:'3px 8px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px', borderBottom:'1px solid var(--border)'}}>input</th>
                  <th style={{textAlign:'right', padding:'3px 8px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px', borderBottom:'1px solid var(--border)'}}>output</th>
                  <th style={{textAlign:'right', padding:'3px 8px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px', borderBottom:'1px solid var(--border)'}}>input</th>
                  <th style={{textAlign:'right', padding:'3px 8px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px', borderBottom:'1px solid var(--border)'}}>output</th>
                  <th colSpan={4}></th>
                </tr>
              </thead>
              <tbody>
                {providers.map((p, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'12px 12px'}}>
                      <div style={{fontWeight:600, color:'var(--green)', fontSize:'13px'}}>{p.nm}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'2px'}}>{p.addr}</div>
                    </td>
                    <td style={{padding:'10px 8px', textAlign:'right', color:'var(--text-mid)'}}>{p.eI}</td>
                    <td style={{padding:'10px 8px', textAlign:'right', color:'var(--text-mid)', opacity:0.7}}>{p.eO}</td>
                    <td style={{padding:'10px 8px', textAlign:'right', color:'var(--text-mid)'}}>{p.aI}</td>
                    <td style={{padding:'10px 8px', textAlign:'right', color:'var(--text-mid)', opacity:0.7}}>{p.aO}</td>
                    <td style={{padding:'10px 8px', textAlign:'right', color:'var(--text-mid)'}}>{p.pI}</td>
                    <td style={{padding:'10px 8px', textAlign:'right', color:'var(--text-mid)', opacity:0.7}}>{p.pO}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontWeight:500}}>{p.usage}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)', fontSize:'12px'}}>{p.tps}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--green)', fontSize:'12px'}}>{p.sr}</td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}>
                      <Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Connect</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'20px'}}>
            ⚠ Simulated data — live provider feed coming soon
          </p>

          <div style={{marginTop:'32px', padding:'20px', border:'1px solid var(--border)', borderRadius:'8px'}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:'14px', fontWeight:600, marginBottom:'12px'}}>Are you a provider for {model}?</div>
            <p style={{color:'var(--text-mid)', fontSize:'14px', marginBottom:'16px', lineHeight:1.7}}>
              Register your endpoint on-chain. Set your own prices. Start earning 97% USDC revenue + CLAW rewards. No approval needed.
            </p>
            <Link href="/providers/register" className="btn-primary text-[13px]">Register Provider</Link>
          </div>
        </>
  )
}

export default function ProvidersPage() {
  return (
    <main>
      <Suspense fallback={<div className="section p-10 text-center font-mono text-dim">Loading providers...</div>}>
        <ProvidersContent />
      </Suspense>

      {/* Column legend */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>
            <span style={{color:'var(--green)'}}>ECO</span> — cheapest provider for cost-first workloads &nbsp;·&nbsp;
            <span style={{color:'var(--accent)'}}>AUTO</span> — best balance of cost and quality &nbsp;·&nbsp;
            <span style={{color:'var(--amber)'}}>PREMIUM</span> — fastest, highest quality &nbsp;·&nbsp;
            <span>SR</span> — success rate &nbsp;·&nbsp;
            <span>Speed</span> — tokens per second
          </p>
        </div>
      </section>
    </main>
  )
}
