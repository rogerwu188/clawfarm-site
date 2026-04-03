import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* ========== HERO ========== */}
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
          <p className="section-text" style={{maxWidth:'680px', marginTop:'8px', marginBottom:'4px'}}>Showing the top provider per model by volume. Anyone can register as a provider for any model — prices are set by the market.</p>
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--amber)', marginBottom:'28px'}}>⚠ Simulated data — live provider feed coming soon</p>

          {/* LLM Top 10 */}
          <div style={{marginBottom:'40px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>💬 Language Models</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per 1M tokens · Top 10 by 30d volume</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', width:'30px'}}>#</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>TOP PROVIDER</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>INPUT</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>OUTPUT</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>CTX</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D USAGE</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>ALL</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr></thead>
                <tbody>{[
                  {m:'GPT-4o',nm:'NodeX Labs',p:'0x7a3f...e2c1',i:'$2.50',o:'$10.00',c:'128K',u:'12.4M tkn',n:14},
                  {m:'Claude Sonnet 4',nm:'InferStack',p:'0xb91d...4f08',i:'$3.00',o:'$15.00',c:'200K',u:'9.8M tkn',n:11},
                  {m:'DeepSeek R1',nm:'Dragon Compute',p:'0x2e8c...a7b3',i:'$0.55',o:'$2.19',c:'128K',u:'8.2M tkn',n:23},
                  {m:'GPT-4o Mini',nm:'MiniGPU Pool',p:'0x5cf2...d914',i:'$0.15',o:'$0.60',c:'128K',u:'7.6M tkn',n:18},
                  {m:'Gemini 2.5 Pro',nm:'GCloud Relay',p:'0x41ae...8c5f',i:'$1.25',o:'$7.00',c:'1M',u:'6.1M tkn',n:9},
                  {m:'Claude Opus 4',nm:'InferStack',p:'0xb91d...4f08',i:'$10.00',o:'$50.00',c:'200K',u:'5.5M tkn',n:7},
                  {m:'Llama 4 Maverick',nm:'OpenPool DAO',p:'0x9d0f...31e7',i:'$0.20',o:'$0.50',c:'256K',u:'5.0M tkn',n:31},
                  {m:'DeepSeek V3',nm:'Dragon Compute',p:'0x2e8c...a7b3',i:'$0.27',o:'$0.55',c:'128K',u:'4.8M tkn',n:26},
                  {m:'Qwen 3 235B',nm:'SinoNodes',p:'0x6b4a...f2d0',i:'$0.25',o:'$0.60',c:'128K',u:'4.3M tkn',n:19},
                  {m:'Gemini 2.5 Flash',nm:'GCloud Relay',p:'0x41ae...8c5f',i:'$0.075',o:'$0.30',c:'1M',u:'4.1M tkn',n:12},
                ].map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'10px 12px', color:'var(--text-dim)', fontSize:'12px'}}>{i+1}</td>
                    <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{r.m}</td>
                    <td style={{padding:'10px 12px'}}>
                      <div style={{fontWeight:600, color:'var(--green)', fontSize:'13px', marginBottom:'2px'}}>{r.nm}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>{r.p}</div>
                    </td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)'}}>{r.i}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)', opacity:0.7}}>{r.o}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.c}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontSize:'12px', fontWeight:500}}>{r.u}</td>
                    <td style={{padding:'10px 12px', textAlign:'center'}}><Link href={`/providers?model=${encodeURIComponent(r.m)}`} style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)'}}>{r.n} providers</Link></td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'#34d399', border:'1px solid #34d399', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Start Integrating</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{marginTop:'12px'}}><Link href="/models?category=Language+Models" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)'}}>→ View all language models</Link></div>
          </div>

          {/* IMAGE Top 5 */}
          <div style={{marginBottom:'40px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>🎨 Image Generation</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per image · Top 5 by 30d volume</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', width:'30px'}}>#</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>TOP PROVIDER</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>PRICE</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>RES</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D USAGE</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>ALL</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr></thead>
                <tbody>{[
                  {m:'FLUX 1.1 Pro',nm:'DiffusionDAO',p:'0xc3e7...b8a2',pr:'$0.040',r:'1024×1024',u:'820K img',n:8},
                  {m:'Midjourney v7',nm:'MJ Relay',p:'0xf12b...6d4e',pr:'$0.050',r:'1024×1024',u:'680K img',n:5},
                  {m:'DALL·E 3 HD',nm:'NodeX Labs',p:'0x7a3f...e2c1',pr:'$0.080',r:'1024×1792',u:'520K img',n:11},
                  {m:'Stable Diffusion 3.5',nm:'OpenPool DAO',p:'0x9d0f...31e7',pr:'$0.006',r:'1024×1024',u:'490K img',n:27},
                  {m:'Seedream 3.0',nm:'ByteNodes',p:'0xa8d1...c3f9',pr:'$0.016',r:'1024×1024',u:'290K img',n:6},
                ].map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'10px 12px', color:'var(--text-dim)', fontSize:'12px'}}>{i+1}</td>
                    <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{r.m}</td>
                    <td style={{padding:'10px 12px'}}>
                      <div style={{fontWeight:600, color:'var(--green)', fontSize:'13px', marginBottom:'2px'}}>{r.nm}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>{r.p}</div>
                    </td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)'}}>{r.pr}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.r}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontSize:'12px', fontWeight:500}}>{r.u}</td>
                    <td style={{padding:'10px 12px', textAlign:'center'}}><Link href={`/providers?model=${encodeURIComponent(r.m)}`} style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)'}}>{r.n} providers</Link></td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'#34d399', border:'1px solid #34d399', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Start Integrating</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{marginTop:'12px'}}><Link href="/models?category=Image+Generation" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)'}}>→ View all image models</Link></div>
          </div>

          {/* VIDEO Top 5 */}
          <div style={{marginBottom:'20px'}}>
            <h3 style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text)', marginBottom:'4px'}}>🎬 Video Generation</h3>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginBottom:'16px'}}>Per second · Top 5 by 30d volume</p>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
                <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px', width:'30px'}}>#</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>MODEL</th>
                  <th style={{textAlign:'left', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>TOP PROVIDER</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>PRICE/s</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>RES</th>
                  <th style={{textAlign:'right', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>30D USAGE</th>
                  <th style={{textAlign:'center', padding:'10px 12px', color:'var(--text-dim)', fontWeight:500, fontSize:'11px'}}>ALL</th>
                  <th style={{textAlign:'center', padding:'10px 12px'}}></th>
                </tr></thead>
                <tbody>{[
                  {m:'Kling 2.0',nm:'SinoNodes',p:'0x6b4a...f2d0',pr:'$0.10',r:'1080p',u:'45K sec',n:9},
                  {m:'Sora',nm:'NodeX Labs',p:'0x7a3f...e2c1',pr:'$0.40',r:'1080p',u:'38K sec',n:4},
                  {m:'MiniMax Video-02',nm:'SinoNodes',p:'0x6b4a...f2d0',pr:'$0.08',r:'1080p',u:'32K sec',n:6},
                  {m:'Runway Gen-4',nm:'StudioRelay',p:'0xd4c8...17ab',pr:'$0.25',r:'1080p',u:'28K sec',n:5},
                  {m:'Wan 2.1 14B',nm:'OpenPool DAO',p:'0x9d0f...31e7',pr:'$0.04',r:'720p',u:'22K sec',n:15},
                ].map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'10px 12px', color:'var(--text-dim)', fontSize:'12px'}}>{i+1}</td>
                    <td style={{padding:'10px 12px', fontWeight:600, color:'var(--text)'}}>{r.m}</td>
                    <td style={{padding:'10px 12px'}}>
                      <div style={{fontWeight:600, color:'var(--green)', fontSize:'13px', marginBottom:'2px'}}>{r.nm}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>{r.p}</div>
                    </td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--text-mid)'}}>{r.pr}</td>
                    <td style={{padding:'10px 12px', textAlign:'center', color:'var(--text-dim)', fontSize:'12px'}}>{r.r}</td>
                    <td style={{padding:'10px 12px', textAlign:'right', color:'var(--accent)', fontSize:'12px', fontWeight:500}}>{r.u}</td>
                    <td style={{padding:'10px 12px', textAlign:'center'}}><Link href={`/providers?model=${encodeURIComponent(r.m)}`} style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)'}}>{r.n} providers</Link></td>
                    <td style={{padding:'10px 8px', textAlign:'center'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'#34d399', border:'1px solid #34d399', borderRadius:'4px', padding:'4px 10px', whiteSpace:'nowrap'}}>Start Integrating</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{marginTop:'12px'}}><Link href="/models?category=Video+Generation" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)'}}>→ View all video models</Link></div>
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
              <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'8px'}}><Link href="/providers" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'#34d399', border:'1px solid #34d399', borderRadius:'4px', padding:'8px 14px', textAlign:'center' as const}}>Become a Provider</Link></div>
            </div>
            <div className="grid-cell" style={{borderTop:'3px solid var(--accent)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)', letterSpacing:'1px', marginBottom:'8px'}}>BUILDER</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Build on decentralized AI infra.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>Use ClawFarm SDK to route AI requests across multiple providers with one integration. Auto-failover, cost optimization, and on-chain usage receipts built in.</p>
              <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'8px'}}><Link href="/docs" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'#ffffff', border:'1px solid #3b82f6', background:'rgba(59,130,246,0.1)', borderRadius:'4px', padding:'8px 14px', textAlign:'center' as const}}>Build with SDK</Link></div>
            </div>
            <div className="grid-cell" style={{borderTop:'3px solid var(--amber)', paddingTop:'24px'}}>
              <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--amber)', letterSpacing:'1px', marginBottom:'8px'}}>NODE OPERATOR</p>
              <h4 style={{fontSize:'18px', marginBottom:'12px'}}>Run infrastructure. Power the network.</h4>
              <p style={{color:'var(--text-mid)', fontSize:'14px', lineHeight:1.7}}>Deploy GPU nodes, host open-source models, or run relay infrastructure. Earn CLAW rewards proportional to your verified contribution.</p>
              <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'8px'}}><Link href="/install" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'#1a1a1a', border:'1px solid #fbbf24', background:'rgba(251,191,36,0.15)', borderRadius:'4px', padding:'8px 14px', textAlign:'center' as const}}>Set Up a Node</Link></div>
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
              <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'12px'}}>Direct on-chain payment for every request served.</p>
            </div>
            <div className="panel" style={{textAlign:'center', padding:'28px 20px'}}>
              <div style={{fontSize:'36px', fontWeight:700, color:'var(--green)'}}>CLAW</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'8px'}}>TOKEN REWARDS PER EPOCH</div>
              <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'12px'}}>70% of Epoch issuance to Providers.</p>
            </div>
            <div className="panel" style={{textAlign:'center', padding:'28px 20px'}}>
              <div style={{fontSize:'36px', fontWeight:700, color:'var(--green)'}}>20%</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', marginTop:'8px'}}>COLD-START BONUS</div>
              <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'12px'}}>Extra rewards in your first 30 days.</p>
            </div>
          </div>
          <div className="panel mt-6" style={{maxWidth:'560px'}}>
            <div className="panel-header"><span className="panel-tag">Provider Reward Formula</span></div>
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2, padding:'12px 22px'}}>
{`Reward = Epoch_Pool × Your_Weight / Total_Weight

Weight = Usage × (Avg_Price / Your_Price) × Quality`}
            </pre>
            <p style={{fontSize:'12px', color:'var(--text-dim)', padding:'0 22px 16px'}}>Cheaper price + more usage + higher quality = larger share of the pool.</p>
          </div>
          <div style={{marginTop:'24px'}}><Link href="/whitepaper" style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)'}}>→ Full economics in the Whitepaper</Link></div>
        </div>
      </section>

      {/* ========== EXPLORE ========== */}
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