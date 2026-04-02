import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* ========== SCREEN 1: HERO ========== */}
      <section className="hero-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="hero-grid">
            <div className="hero-left">
              <p style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--green)', letterSpacing:'0.5px', marginBottom:'16px'}}>DECENTRALIZED AI COMPUTE NETWORK</p>
              <h1 className="hero-title" style={{fontSize:'42px', lineHeight:1.15}}>
                Route AI requests.<br/>Meter usage.<br/>Settle on-chain.
              </h1>
              <p className="hero-subtitle" style={{fontSize:'17px', marginTop:'20px', maxWidth:'520px'}}>
                ClawFarm connects AI consumers with compute providers through decentralized routing, verifiable metering, and automatic settlement. No middleman. No custody. No permission needed.
              </p>
              <div className="hero-actions" style={{marginTop:'32px', gap:'12px'}}>
                <Link href="/providers" className="btn-primary" style={{fontSize:'15px', padding:'12px 28px'}}>Become a Provider</Link>
                <Link href="/docs" className="btn-primary" style={{fontSize:'15px', padding:'12px 28px', background:'transparent', border:'1px solid var(--border)'}}>Build on ClawFarm</Link>
                <Link href="/masterpool" className="btn-secondary" style={{fontSize:'15px', padding:'12px 28px'}}>Explore the Network</Link>
              </div>
            </div>
            <div className="hero-right">
              <div className="panel" style={{maxWidth:'380px'}}>
                <div className="panel-header">
                  <span className="panel-tag">Network Status</span>
                  <span className="panel-live"><span className="state-dot" /> LIVE</span>
                </div>
                <div className="panel-row"><span className="panel-label">Routing</span><span className="panel-value">eco · auto · premium</span></div>
                <div className="panel-row"><span className="panel-label">Settlement</span><span className="panel-value" style={{color:'var(--green)'}}>On-Chain (Solana)</span></div>
                <div className="panel-row"><span className="panel-label">Custody</span><span className="panel-value" style={{color:'var(--green)'}}>Non-Custodial</span></div>
                <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">97%</span></div>
                <div className="panel-row"><span className="panel-label">Provider Gate</span><span className="panel-value">Open — No Approval</span></div>
                <div className="panel-row"><span className="panel-label">CLAW Rewards</span><span className="panel-value" style={{color:'var(--green)'}}>Active</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROVIDER MARKETPLACE ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>PROVIDER MARKETPLACE</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Every major model. Priced by competing providers.</h2>
          <p className="section-text" style={{maxWidth:'680px', marginTop:'8px', marginBottom:'28px'}}>Showing the top provider per model by volume. Anyone can register as a provider for any model — prices are set by the market, not the platform.</p>

          {/* LLM */}
          <div style={{marginBottom:'40px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>💬 Language Models</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per 1M tokens · Sorted by 30d volume</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', width:'30px'}}>#</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>TOP PROVIDER</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>INPUT</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>OUTPUT</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D VOL</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>CTX</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr></thead>
                <tbody>{[
                  {m:'GPT-4o',p:'NodeX Labs',i:'$2.50',o:'$10.00',v:'12.4M',c:'128K'},
                  {m:'Claude Sonnet 4',p:'InferStack',i:'$3.00',o:'$15.00',v:'9.8M',c:'200K'},
                  {m:'DeepSeek R1',p:'Dragon Compute',i:'$0.55',o:'$2.19',v:'8.2M',c:'128K'},
                  {m:'GPT-4o Mini',p:'MiniGPU Pool',i:'$0.15',o:'$0.60',v:'7.6M',c:'128K'},
                  {m:'Gemini 2.5 Pro',p:'GCloud Relay',i:'$1.25',o:'$7.00',v:'6.1M',c:'1M'},
                  {m:'Claude Opus 4',p:'InferStack',i:'$10.00',o:'$50.00',v:'5.5M',c:'200K'},
                  {m:'Llama 4 Maverick',p:'OpenPool DAO',i:'$0.20',o:'$0.50',v:'5.0M',c:'256K'},
                  {m:'DeepSeek V3',p:'Dragon Compute',i:'$0.27',o:'$0.55',v:'4.8M',c:'128K'},
                  {m:'Qwen 3 235B',p:'SinoNodes',i:'$0.25',o:'$0.60',v:'4.3M',c:'128K'},
                  {m:'Gemini 2.5 Flash',p:'GCloud Relay',i:'$0.075',o:'$0.30',v:'4.1M',c:'1M'},
                  {m:'Grok 3',p:'xRelay Network',i:'$3.00',o:'$15.00',v:'3.7M',c:'128K'},
                  {m:'Claude 3.5 Haiku',p:'HaikuFarm',i:'$0.80',o:'$4.00',v:'3.5M',c:'200K'},
                  {m:'MiniMax M2.7',p:'SinoNodes',i:'$0.30',o:'$1.20',v:'3.2M',c:'1M'},
                  {m:'Mistral Large',p:'EU Compute Co',i:'$2.00',o:'$6.00',v:'2.9M',c:'128K'},
                  {m:'Llama 4 Scout',p:'OpenPool DAO',i:'$0.11',o:'$0.25',v:'2.8M',c:'512K'},
                  {m:'Kimi K2.5',p:'MoonRelay',i:'$0.10',o:'$3.00',v:'2.5M',c:'128K'},
                  {m:'Seed 2.0 Pro',p:'ByteNodes',i:'$1.00',o:'$6.00',v:'2.1M',c:'128K'},
                  {m:'Grok 3 Mini',p:'xRelay Network',i:'$0.30',o:'$0.60',v:'1.9M',c:'128K'},
                  {m:'GPT-4.5 Preview',p:'NodeX Labs',i:'$45.00',o:'$90.00',v:'1.7M',c:'128K'},
                  {m:'Seed 2.0 Mini',p:'ByteNodes',i:'$0.20',o:'$0.80',v:'1.4M',c:'128K'},
                ].map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'10px 12px', color:'var(--text-dim)', fontSize:'12px'}}>{i+1}</td>
                    <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{r.m}</td>
                    <td style={{padding:'10px 12px', color:'var(--green)', fontSize:'12px'}}>{r.p}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)'}}>{r.i}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)', opacity:0.7}}>{r.o}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontSize:'12px'}}>{r.v}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.c}</td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Connect API</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          {/* IMAGE */}
          <div style={{marginBottom:'40px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>🎨 Image Generation</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per image · Sorted by 30d volume</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', width:'30px'}}>#</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>TOP PROVIDER</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>PRICE</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>RES</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D VOL</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr></thead>
                <tbody>{[
                  {m:'FLUX 1.1 Pro',p:'DiffusionDAO',pr:'$0.040',r:'1024×1024',v:'820K'},
                  {m:'Midjourney v7',p:'MJ Relay',pr:'$0.050',r:'1024×1024',v:'680K'},
                  {m:'DALL·E 3 HD',p:'NodeX Labs',pr:'$0.080',r:'1024×1792',v:'520K'},
                  {m:'Stable Diffusion 3.5',p:'OpenPool DAO',pr:'$0.006',r:'1024×1024',v:'490K'},
                  {m:'GPT-4o Image',p:'NodeX Labs',pr:'$0.040',r:'1024×1024',v:'430K'},
                  {m:'Ideogram 3.0',p:'PixelRelay',pr:'$0.040',r:'1024×1024',v:'380K'},
                  {m:'FLUX Schnell',p:'DiffusionDAO',pr:'$0.003',r:'1024×1024',v:'350K'},
                  {m:'Seedream 3.0',p:'ByteNodes',pr:'$0.016',r:'1024×1024',v:'290K'},
                  {m:'Recraft V3',p:'PixelRelay',pr:'$0.040',r:'1024×1024',v:'250K'},
                  {m:'DALL·E 3',p:'NodeX Labs',pr:'$0.040',r:'1024×1024',v:'220K'},
                  {m:'Kolors',p:'SinoNodes',pr:'$0.005',r:'1024×1024',v:'180K'},
                  {m:'Kling Image',p:'SinoNodes',pr:'$0.010',r:'1024×1024',v:'150K'},
                  {m:'SDXL Turbo',p:'OpenPool DAO',pr:'$0.002',r:'512×512',v:'130K'},
                ].map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'10px 12px', color:'var(--text-dim)', fontSize:'12px'}}>{i+1}</td>
                    <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{r.m}</td>
                    <td style={{padding:'10px 12px', color:'var(--green)', fontSize:'12px'}}>{r.p}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)'}}>{r.pr}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.r}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontSize:'12px'}}>{r.v}</td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Connect API</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          {/* VIDEO */}
          <div style={{marginBottom:'20px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>🎬 Video Generation</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per second · Sorted by 30d volume</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', width:'30px'}}>#</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>TOP PROVIDER</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>PRICE/s</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>RES</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>DUR</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D VOL</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr></thead>
                <tbody>{[
                  {m:'Kling 2.0',p:'SinoNodes',pr:'$0.10',r:'1080p',d:'5–10s',v:'45K'},
                  {m:'Sora',p:'NodeX Labs',pr:'$0.40',r:'1080p',d:'5–20s',v:'38K'},
                  {m:'MiniMax Video-02',p:'SinoNodes',pr:'$0.08',r:'1080p',d:'6s',v:'32K'},
                  {m:'Runway Gen-4',p:'StudioRelay',pr:'$0.25',r:'1080p',d:'5–10s',v:'28K'},
                  {m:'Veo 3',p:'GCloud Relay',pr:'$0.30',r:'1080p',d:'8s',v:'25K'},
                  {m:'Wan 2.1 14B',p:'OpenPool DAO',pr:'$0.04',r:'720p',d:'5s',v:'22K'},
                  {m:'Kling 2.0 Master',p:'SinoNodes',pr:'$0.20',r:'1080p',d:'5–10s',v:'19K'},
                  {m:'Luma Dream Machine',p:'StudioRelay',pr:'$0.12',r:'1080p',d:'5s',v:'16K'},
                  {m:'Pika 2.0',p:'StudioRelay',pr:'$0.15',r:'1080p',d:'3–5s',v:'14K'},
                  {m:'HunyuanVideo',p:'Dragon Compute',pr:'$0.06',r:'720p',d:'5s',v:'11K'},
                  {m:'CogVideoX-5B',p:'OpenPool DAO',pr:'$0.04',r:'720p',d:'6s',v:'8K'},
                  {m:'Seaweed',p:'OpenPool DAO',pr:'$0.05',r:'720p',d:'5s',v:'5K'},
                ].map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'10px 12px', color:'var(--text-dim)', fontSize:'12px'}}>{i+1}</td>
                    <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{r.m}</td>
                    <td style={{padding:'10px 12px', color:'var(--green)', fontSize:'12px'}}>{r.p}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)'}}>{r.pr}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.r}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.d}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontSize:'12px'}}>{r.v}</td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', border:'1px solid var(--green)', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Connect API</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          <div style={{marginTop:'24px', display:'flex', gap:'16px', alignItems:'center', flexWrap:'wrap'}}>
            <Link href="/providers" className="btn-primary" style={{fontSize:'13px', padding:'10px 20px'}}>Become a Provider</Link>
            <Link href="/docs" className="btn-secondary" style={{fontSize:'13px', padding:'10px 20px'}}>Full API Docs</Link>
            <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>Prices set by independent providers competing on-chain. Anyone can supply any model.</span>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>HOW IT WORKS</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>From request to settlement in one flow.</h2>
          <div className="exec-flow" style={{marginTop:'36px'}}>
            <div className="flow-step"><div className="flow-step-num">01</div><div className="flow-step-title">Provide</div><div className="flow-step-desc">Register your model, GPU, or API endpoint. Set your own price. Stake CLAW.</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-num">02</div><div className="flow-step-title">Route</div><div className="flow-step-desc">Requests are routed to the best Provider by eco, auto, or premium mode.</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-num">03</div><div className="flow-step-title">Meter</div><div className="flow-step-desc">Every token is counted client-side. Both parties sign a usage proof.</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-num">04</div><div className="flow-step-title">Settle</div><div className="flow-step-desc">Smart contract splits payment: 97% Provider, 3% Treasury. Automatic.</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-num">05</div><div className="flow-step-title">Earn</div><div className="flow-step-desc">CLAW tokens distributed every Epoch. More usage × better price × higher quality = more rewards.</div></div>
          </div>
        </div>
      </section>

      {/* ========== WHO IS IT FOR ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>WHO IS CLAWFARM FOR</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Three roles. One network.</h2>
          <div className="grid-3 mt-8" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
            <div className="grid-cell" style={{borderTop:'3px solid var(--green)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', letterSpacing:'1px', marginBottom:'8px'}}>PROVIDER</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Sell compute. Earn USDC + CLAW.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>You have a GPU, a model endpoint, or an API key. Register on-chain, set your price, and start serving inference. Settlement goes directly to your wallet.</p>
              <div style={{marginTop:'20px'}}><Link href="/providers" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)'}}>→ Become a Provider</Link></div>
            </div>
            <div className="grid-cell" style={{borderTop:'3px solid var(--accent)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)', letterSpacing:'1px', marginBottom:'8px'}}>BUILDER</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Build on decentralized AI infra.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>Use ClawFarm SDK to route AI requests across multiple providers with one integration. Auto-failover, cost optimization, and on-chain usage receipts built in.</p>
              <div style={{marginTop:'20px'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)'}}>→ Read the Docs</Link></div>
            </div>
            <div className="grid-cell" style={{borderTop:'3px solid var(--amber)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--amber)', letterSpacing:'1px', marginBottom:'8px'}}>NODE OPERATOR</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Run infrastructure. Power the network.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>Deploy GPU nodes, host open-source models, or run relay infrastructure. Earn CLAW rewards proportional to your verified contribution.</p>
              <div style={{marginTop:'20px'}}><Link href="/install" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--amber)'}}>→ Set Up a Node</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY DIFFERENT ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>WHY CLAWFARM</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Open supply. Unified metering. Automatic settlement.</h2>
          <div className="grid-2 mt-8">
            <div className="grid-cell"><h4>Open Supply</h4><p>Anyone can register as a Provider — GPU operators, cloud instances, API resellers, fine-tuned model hosts. No approval. No whitelist.</p></div>
            <div className="grid-cell"><h4>Unified Metering</h4><p>Every request is metered with dual-signature verification. Client counts tokens independently. Both parties sign. No trust required.</p></div>
            <div className="grid-cell"><h4>Automatic Settlement</h4><p>Smart contract splits every payment: 97% to Provider, 3% to Treasury. No invoices. No payment delays.</p></div>
            <div className="grid-cell"><h4>Non-Custodial</h4><p>User USDC sits in a program-owned escrow (PDA). No human holds the key. Withdraw anytime.</p></div>
          </div>
        </div>
      </section>

      {/* ========== MINING REWARDS ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>NETWORK MINING</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Serve AI. Mine CLAW.</h2>
          <p className="section-text" style={{maxWidth:'640px', marginTop:'12px'}}>Every AI request you serve earns you CLAW tokens. The more you serve, the cheaper your price, and the better your quality — the more you mine.</p>
          <div className="grid-3 mt-8" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <div className="panel" style={{textAlign:'center', padding:'28px 20px'}}>
              <div style={{fontSize:'36px', fontWeight:700, color:'var(--green)'}}>97%</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'8px'}}>USDC REVENUE TO YOU</div>
              <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'12px'}}>Direct on-chain payment for every request served. No middleman cut.</p>
            </div>
            <div className="panel" style={{textAlign:'center', padding:'28px 20px'}}>
              <div style={{fontSize:'36px', fontWeight:700, color:'var(--green)'}}>CLAW</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'8px'}}>TOKEN REWARDS PER EPOCH</div>
              <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'12px'}}>70% of Epoch issuance goes to Providers. Weighted by usage × price × quality.</p>
            </div>
            <div className="panel" style={{textAlign:'center', padding:'28px 20px'}}>
              <div style={{fontSize:'36px', fontWeight:700, color:'var(--green)'}}>20%</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'8px'}}>COLD-START BONUS</div>
              <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'12px'}}>New Providers get extra rewards in their first 30 days. Early = more CLAW.</p>
            </div>
          </div>
          <div className="panel mt-6" style={{maxWidth:'560px'}}>
            <div className="panel-header"><span className="panel-tag">Provider Reward Formula</span></div>
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2, padding:'12px 22px'}}>
{`Reward = Epoch_Pool × Your_Weight / Total_Weight\n\nWeight = Usage × (Avg_Price / Your_Price) × Quality`}
            </pre>
            <p style={{fontSize:'12px', color:'var(--text-dim)', padding:'0 22px 16px'}}>Cheaper price + more usage + higher quality = larger share of the reward pool.</p>
          </div>
          <div style={{marginTop:'24px'}}><Link href="/whitepaper" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)'}}>→ Full economics in the Whitepaper</Link></div>
        </div>
      </section>

      {/* ========== QUICK LINKS ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>EXPLORE</p>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
            <Link href="/docs" className="grid-cell" style={{textAlign:'center', padding:'28px 16px'}}>
              <div style={{fontSize:'24px', marginBottom:'8px'}}>📄</div>
              <h4 style={{fontSize:'14px'}}>Docs</h4>
              <p style={{fontSize:'12px', color:'var(--text-dim)', marginTop:'4px'}}>SDK, guides, API reference</p>
            </Link>
            <Link href="/whitepaper" className="grid-cell" style={{textAlign:'center', padding:'28px 16px'}}>
              <div style={{fontSize:'24px', marginBottom:'8px'}}>📋</div>
              <h4 style={{fontSize:'14px'}}>Protocol</h4>
              <p style={{fontSize:'12px', color:'var(--text-dim)', marginTop:'4px'}}>Architecture, economics, verification</p>
            </Link>
            <Link href="/masterpool" className="grid-cell" style={{textAlign:'center', padding:'28px 16px'}}>
              <div style={{fontSize:'24px', marginBottom:'8px'}}>🔍</div>
              <h4 style={{fontSize:'14px'}}>Explorer</h4>
              <p style={{fontSize:'12px', color:'var(--text-dim)', marginTop:'4px'}}>Network state, providers, settlement</p>
            </Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="grid-cell" style={{textAlign:'center', padding:'28px 16px'}}>
              <div style={{fontSize:'24px', marginBottom:'8px'}}>💻</div>
              <h4 style={{fontSize:'14px'}}>GitHub</h4>
              <p style={{fontSize:'12px', color:'var(--text-dim)', marginTop:'4px'}}>Open-source code, contribute</p>
            </a>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/providers" className="btn-primary">Become a Provider</Link>
            <Link href="/users" className="btn-secondary">For Users</Link>
            <a href="https://discord.gg/zxZmCFbzEn" target="_blank" rel="noopener" className="btn-secondary">Discord</a>
            <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener" className="btn-secondary">X</a>
          </div>
        </div>
      </section>
    </main>
  )
}