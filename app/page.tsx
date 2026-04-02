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

      {/* ========== SCREEN 1.5: MODEL PRICING ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>MODEL PRICING</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Access every major model. Pay per token.</h2>
          <p className="section-text" style={{maxWidth:'640px', marginTop:'8px', marginBottom:'28px'}}>Providers set their own prices — anyone can supply any model. Three routing modes pick the best offer for your workload.</p>

          {/* --- Language Models --- */}
          <div style={{marginBottom:'40px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>💬 Language Models</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per 1M tokens</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--border)'}}>
                    <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', letterSpacing:'0.5px'}} rowSpan={2}>MODEL</th>
                    <th style={{textAlign:'center', padding:'6px 12px', color:'var(--green)', fontWeight:600, fontSize:'11px', borderBottom:'1px solid var(--border)'}} colSpan={2}>ECO</th>
                    <th style={{textAlign:'center', padding:'6px 12px', color:'var(--accent)', fontWeight:600, fontSize:'11px', borderBottom:'1px solid var(--border)'}} colSpan={2}>AUTO</th>
                    <th style={{textAlign:'center', padding:'6px 12px', color:'var(--amber)', fontWeight:600, fontSize:'11px', borderBottom:'1px solid var(--border)'}} colSpan={2}>PREMIUM</th>
                    <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}} rowSpan={2}>CTX</th>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border)'}}>
                    <th style={{textAlign:'right', padding:'4px 12px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px'}}>input</th>
                    <th style={{textAlign:'right', padding:'4px 12px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px'}}>output</th>
                    <th style={{textAlign:'right', padding:'4px 12px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px'}}>input</th>
                    <th style={{textAlign:'right', padding:'4px 12px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px'}}>output</th>
                    <th style={{textAlign:'right', padding:'4px 12px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px'}}>input</th>
                    <th style={{textAlign:'right', padding:'4px 12px', color:'var(--text-dim)', fontWeight:400, fontSize:'10px'}}>output</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { model:'GPT-4o',          eI:'$1.50', eO:'$6.00',  aI:'$2.50', aO:'$10.00', pI:'$3.50', pO:'$14.00', ctx:'128K' },
                    { model:'GPT-4o Mini',      eI:'$0.07', eO:'$0.30',  aI:'$0.15', aO:'$0.60',  pI:'$0.25', pO:'$1.00',  ctx:'128K' },
                    { model:'GPT-4.5 Preview',  eI:'$30.00',eO:'$60.00', aI:'$45.00',aO:'$90.00', pI:'$75.00',pO:'$150.00',ctx:'128K' },
                    { model:'Claude Opus 4',     eI:'$5.00', eO:'$25.00', aI:'$10.00',aO:'$50.00', pI:'$15.00',pO:'$75.00', ctx:'200K' },
                    { model:'Claude Sonnet 4',   eI:'$1.50', eO:'$8.00',  aI:'$3.00', aO:'$15.00', pI:'$4.50', pO:'$22.00', ctx:'200K' },
                    { model:'Claude 3.5 Haiku',  eI:'$0.40', eO:'$2.00',  aI:'$0.80', aO:'$4.00',  pI:'$1.20', pO:'$6.00',  ctx:'200K' },
                    { model:'Gemini 2.5 Pro',    eI:'$0.60', eO:'$3.50',  aI:'$1.25', aO:'$7.00',  pI:'$2.00', pO:'$10.00', ctx:'1M' },
                    { model:'Gemini 2.5 Flash',  eI:'$0.03', eO:'$0.15',  aI:'$0.075',aO:'$0.30',  pI:'$0.15', pO:'$0.60',  ctx:'1M' },
                    { model:'DeepSeek V3',       eI:'$0.14', eO:'$0.28',  aI:'$0.27', aO:'$0.55',  pI:'$0.50', pO:'$1.10',  ctx:'128K' },
                    { model:'DeepSeek R1',       eI:'$0.28', eO:'$1.10',  aI:'$0.55', aO:'$2.19',  pI:'$1.00', pO:'$4.00',  ctx:'128K' },
                    { model:'Llama 4 Maverick',  eI:'$0.10', eO:'$0.25',  aI:'$0.20', aO:'$0.50',  pI:'$0.40', pO:'$0.80',  ctx:'256K' },
                    { model:'Llama 4 Scout',     eI:'$0.05', eO:'$0.12',  aI:'$0.11', aO:'$0.25',  pI:'$0.22', pO:'$0.50',  ctx:'512K' },
                    { model:'Qwen 3 235B',       eI:'$0.12', eO:'$0.30',  aI:'$0.25', aO:'$0.60',  pI:'$0.50', pO:'$1.20',  ctx:'128K' },
                    { model:'Mistral Large',     eI:'$1.00', eO:'$3.00',  aI:'$2.00', aO:'$6.00',  pI:'$3.00', pO:'$9.00',  ctx:'128K' },
                    { model:'Grok 3',            eI:'$1.50', eO:'$7.50',  aI:'$3.00', aO:'$15.00', pI:'$5.00', pO:'$25.00', ctx:'128K' },
                    { model:'Grok 3 Mini',       eI:'$0.15', eO:'$0.30',  aI:'$0.30', aO:'$0.60',  pI:'$0.50', pO:'$1.00',  ctx:'128K' },
                    { model:'MiniMax M2.7',      eI:'$0.15', eO:'$0.60',  aI:'$0.30', aO:'$1.20',  pI:'$0.50', pO:'$2.00',  ctx:'1M' },
                    { model:'Kimi K2.5',         eI:'$0.05', eO:'$1.50',  aI:'$0.10', aO:'$3.00',  pI:'$0.20', pO:'$5.00',  ctx:'128K' },
                    { model:'Seed 2.0 Pro',      eI:'$0.50', eO:'$3.00',  aI:'$1.00', aO:'$6.00',  pI:'$2.00', pO:'$10.00', ctx:'128K' },
                    { model:'Seed 2.0 Mini',     eI:'$0.10', eO:'$0.40',  aI:'$0.20', aO:'$0.80',  pI:'$0.40', pO:'$1.50',  ctx:'128K' },
                  ].map((m, i) => (
                    <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                      <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{m.model}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--green)'}}>{m.eI}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--green)', opacity:0.7}}>{m.eO}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)'}}>{m.aI}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', opacity:0.7}}>{m.aO}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--amber)'}}>{m.pI}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--amber)', opacity:0.7}}>{m.pO}</td>
                      <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{m.ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Image Generation --- */}
          <div style={{marginBottom:'40px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>🎨 Image Generation</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per image</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--border)'}}>
                    <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                    <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>RESOLUTION</th>
                    <th style={{textAlign:'right', padding:'10px 12px', color:'var(--green)', fontWeight:600, fontSize:'11px'}}>ECO</th>
                    <th style={{textAlign:'right', padding:'10px 12px', color:'var(--accent)', fontWeight:600, fontSize:'11px'}}>AUTO</th>
                    <th style={{textAlign:'right', padding:'10px 12px', color:'var(--amber)', fontWeight:600, fontSize:'11px'}}>PREMIUM</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { model:'DALL\u00b7E 3',            res:'1024\u00d71024', eco:'$0.020', auto:'$0.040', premium:'$0.060' },
                    { model:'DALL\u00b7E 3 HD',         res:'1024\u00d71792', eco:'$0.040', auto:'$0.080', premium:'$0.120' },
                    { model:'GPT-4o Image',       res:'1024\u00d71024', eco:'$0.020', auto:'$0.040', premium:'$0.067' },
                    { model:'Midjourney v7',       res:'1024\u00d71024', eco:'$0.030', auto:'$0.050', premium:'$0.080' },
                    { model:'Stable Diffusion 3.5', res:'1024\u00d71024', eco:'$0.003', auto:'$0.006', premium:'$0.012' },
                    { model:'SDXL Turbo',          res:'512\u00d7512',   eco:'$0.001', auto:'$0.002', premium:'$0.004' },
                    { model:'FLUX 1.1 Pro',        res:'1024\u00d71024', eco:'$0.020', auto:'$0.040', premium:'$0.060' },
                    { model:'FLUX Schnell',        res:'1024\u00d71024', eco:'$0.002', auto:'$0.003', premium:'$0.006' },
                    { model:'Ideogram 3.0',        res:'1024\u00d71024', eco:'$0.020', auto:'$0.040', premium:'$0.080' },
                    { model:'Recraft V3',          res:'1024\u00d71024', eco:'$0.020', auto:'$0.040', premium:'$0.060' },
                    { model:'Seedream 3.0',        res:'1024\u00d71024', eco:'$0.008', auto:'$0.016', premium:'$0.030' },
                    { model:'Kolors',              res:'1024\u00d71024', eco:'$0.003', auto:'$0.005', premium:'$0.010' },
                    { model:'Kling Image',         res:'1024\u00d71024', eco:'$0.005', auto:'$0.010', premium:'$0.020' },
                  ].map((m, i) => (
                    <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                      <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{m.model}</td>
                      <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{m.res}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--green)'}}>{m.eco}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)'}}>{m.auto}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--amber)'}}>{m.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Video Generation --- */}
          <div style={{marginBottom:'20px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>🎬 Video Generation</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per second of video</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--border)'}}>
                    <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                    <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>RESOLUTION</th>
                    <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>DURATION</th>
                    <th style={{textAlign:'right', padding:'10px 12px', color:'var(--green)', fontWeight:600, fontSize:'11px'}}>ECO</th>
                    <th style={{textAlign:'right', padding:'10px 12px', color:'var(--accent)', fontWeight:600, fontSize:'11px'}}>AUTO</th>
                    <th style={{textAlign:'right', padding:'10px 12px', color:'var(--amber)', fontWeight:600, fontSize:'11px'}}>PREMIUM</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { model:'Sora',              res:'1080p', dur:'5\u201320s', eco:'$0.20/s',  auto:'$0.40/s',  premium:'$0.60/s' },
                    { model:'Veo 3',             res:'1080p', dur:'8s',     eco:'$0.15/s',  auto:'$0.30/s',  premium:'$0.50/s' },
                    { model:'Kling 2.0',         res:'1080p', dur:'5\u201310s', eco:'$0.05/s',  auto:'$0.10/s',  premium:'$0.20/s' },
                    { model:'Kling 2.0 Master',  res:'1080p', dur:'5\u201310s', eco:'$0.10/s',  auto:'$0.20/s',  premium:'$0.35/s' },
                    { model:'Runway Gen-4',      res:'1080p', dur:'5\u201310s', eco:'$0.10/s',  auto:'$0.25/s',  premium:'$0.50/s' },
                    { model:'MiniMax Video-02',  res:'1080p', dur:'6s',     eco:'$0.04/s',  auto:'$0.08/s',  premium:'$0.15/s' },
                    { model:'Pika 2.0',          res:'1080p', dur:'3\u20135s',  eco:'$0.08/s',  auto:'$0.15/s',  premium:'$0.30/s' },
                    { model:'Luma Dream Machine', res:'1080p', dur:'5s',    eco:'$0.06/s',  auto:'$0.12/s',  premium:'$0.25/s' },
                    { model:'Wan 2.1 14B',       res:'720p',  dur:'5s',     eco:'$0.02/s',  auto:'$0.04/s',  premium:'$0.08/s' },
                    { model:'HunyuanVideo',      res:'720p',  dur:'5s',     eco:'$0.03/s',  auto:'$0.06/s',  premium:'$0.12/s' },
                    { model:'CogVideoX-5B',      res:'720p',  dur:'6s',     eco:'$0.02/s',  auto:'$0.04/s',  premium:'$0.08/s' },
                    { model:'Seaweed',           res:'720p',  dur:'5s',     eco:'$0.02/s',  auto:'$0.05/s',  premium:'$0.10/s' },
                  ].map((m, i) => (
                    <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                      <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{m.model}</td>
                      <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{m.res}</td>
                      <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{m.dur}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--green)'}}>{m.eco}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)'}}>{m.auto}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', color:'var(--amber)'}}>{m.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{marginTop:'20px', display:'flex', gap:'16px', alignItems:'center', flexWrap:'wrap'}}>
            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
              <span style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--green)', display:'inline-block'}} />
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>ECO — Cheapest provider</span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
              <span style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)', display:'inline-block'}} />
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>AUTO — Best balance of cost + quality</span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
              <span style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--amber)', display:'inline-block'}} />
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>PREMIUM — Fastest, highest quality</span>
            </div>
          </div>

          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'16px'}}>Prices set by independent providers competing on the network. More providers = lower prices. Anyone can supply any model.</p>
        </div>
      </section>

      {/* ========== SCREEN 2: HOW IT WORKS ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>HOW IT WORKS</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>From request to settlement in one flow.</h2>
          <div className="exec-flow" style={{marginTop:'36px'}}>
            <div className="flow-step">
              <div className="flow-step-num">01</div>
              <div className="flow-step-title">Provide</div>
              <div className="flow-step-desc">Register your model, GPU, or API endpoint. Set your own price. Stake CLAW.</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">02</div>
              <div className="flow-step-title">Route</div>
              <div className="flow-step-desc">Requests are routed to the best Provider by eco, auto, or premium mode.</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">03</div>
              <div className="flow-step-title">Meter</div>
              <div className="flow-step-desc">Every token is counted client-side. Both parties sign a usage proof.</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">04</div>
              <div className="flow-step-title">Settle</div>
              <div className="flow-step-desc">Smart contract splits payment: 97% Provider, 3% Treasury. Automatic.</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">05</div>
              <div className="flow-step-title">Earn</div>
              <div className="flow-step-desc">CLAW tokens distributed every Epoch. More usage × better price × higher quality = more rewards.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SCREEN 3: WHO IS IT FOR ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>WHO IS CLAWFARM FOR</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Three roles. One network.</h2>
          <div className="grid-3 mt-8" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
            <div className="grid-cell" style={{borderTop:'3px solid var(--green)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)', letterSpacing:'1px', marginBottom:'8px'}}>PROVIDER</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Sell compute. Earn USDC + CLAW.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>
                You have a GPU, a model endpoint, or an API key. Register on-chain, set your price, and start serving inference. No billing system needed — settlement goes directly to your wallet.
              </p>
              <div style={{marginTop:'20px'}}>
                <Link href="/providers" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)'}}>→ Become a Provider</Link>
              </div>
            </div>
            <div className="grid-cell" style={{borderTop:'3px solid var(--accent)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)', letterSpacing:'1px', marginBottom:'8px'}}>BUILDER</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Build on decentralized AI infra.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>
                Use ClawFarm SDK to route AI requests across multiple providers with one integration. Auto-failover, cost optimization, and on-chain usage receipts built in.
              </p>
              <div style={{marginTop:'20px'}}>
                <Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)'}}>→ Read the Docs</Link>
              </div>
            </div>
            <div className="grid-cell" style={{borderTop:'3px solid var(--amber)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--amber)', letterSpacing:'1px', marginBottom:'8px'}}>NODE OPERATOR</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Run infrastructure. Power the network.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>
                Deploy GPU nodes, host open-source models, or run relay infrastructure. Earn CLAW rewards proportional to your verified contribution.
              </p>
              <div style={{marginTop:'20px'}}>
                <Link href="/install" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--amber)'}}>→ Set Up a Node</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SCREEN 4: WHY DIFFERENT ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>WHY CLAWFARM</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Open supply. Unified metering. Automatic settlement.</h2>
          <div className="grid-2 mt-8">
            <div className="grid-cell">
              <h4>Open Supply</h4>
              <p>Anyone can register as a Provider — GPU operators, cloud instances, API resellers, fine-tuned model hosts. No approval. No whitelist. The network grows without gatekeepers.</p>
            </div>
            <div className="grid-cell">
              <h4>Unified Metering</h4>
              <p>Every request is metered with dual-signature verification. Client counts tokens independently. Both parties sign. No trust required.</p>
            </div>
            <div className="grid-cell">
              <h4>Automatic Settlement</h4>
              <p>Smart contract splits every payment: 97% to Provider, 3% to Treasury. No invoices. No payment delays. Settlement is a contract execution.</p>
            </div>
            <div className="grid-cell">
              <h4>Non-Custodial</h4>
              <p>User USDC sits in a program-owned escrow (PDA). No human holds the key. Withdraw anytime. The platform never touches your funds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SCREEN 4.5: MINING REWARDS ========== */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>NETWORK MINING</p>
          <h2 className="section-title" style={{fontSize:'28px'}}>Serve AI. Mine CLAW.</h2>
          <p className="section-text" style={{maxWidth:'640px', marginTop:'12px'}}>
            Every AI request you serve earns you CLAW tokens. The more you serve, the cheaper your price, and the better your quality — the more you mine.
          </p>
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
            <div className="panel-header">
              <span className="panel-tag">Provider Reward Formula</span>
            </div>
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2, padding:'12px 22px'}}>
{`Reward = Epoch_Pool × Your_Weight / Total_Weight

Weight = Usage × (Avg_Price / Your_Price) × Quality`}
            </pre>
            <p style={{fontSize:'12px', color:'var(--text-dim)', padding:'0 22px 16px'}}>Cheaper price + more usage + higher quality = larger share of the reward pool. Simple.</p>
          </div>
          <div style={{marginTop:'24px'}}>
            <Link href="/whitepaper" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)'}}>→ Full economics in the Whitepaper</Link>
          </div>
        </div>
      </section>

      {/* ========== SCREEN 5: QUICK LINKS ========== */}
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
