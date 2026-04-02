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
