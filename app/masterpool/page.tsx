import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Network Explorer — ClawFarm | Real-time On-chain State',
  description: 'Real-time view of escrow state, provider registry, settlement activity, and treasury operations. All data on-chain and verifiable.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/masterpool' },
  openGraph: {
    title: 'ClawFarm Network Explorer',
    description: 'Real-time on-chain state: escrow, providers, settlement, treasury.',
    url: 'https://www.clawfarm.network/masterpool',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ClawFarm Network Explorer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm Network Explorer',
    description: 'Real-time on-chain state.',
    images: ['/og-image.png'],
  },
}

export default function Pool() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Network Explorer</span></span>
          <span>Chain: <span className="text-[#8a8f98]">Solana</span></span>
          <span>Custody: <span className="text-[#8a8f98]">Non-Custodial</span></span>
        </div>
      </div>

      {/* Hero */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="section-title text-[36px]">ClawFarm Network Explorer</h1>
          <p className="section-text" style={{marginTop:'8px', fontSize:'16px', color:'var(--text-mid)'}}>
            Real-time view of escrow state, provider registry, settlement activity, and treasury operations. All data on-chain and verifiable.
          </p>
        </div>
      </section>

      {/* 1. Network Overview */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag" style={{color:'var(--text)', fontWeight:700}}>Network Overview</div>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Total Supply</div>
              <div className="stat-value" style={{color:'var(--text)'}}>1B</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>$CLAF</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Active Providers</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>registered</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Active Users</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>with escrow balance</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Settlement</div>
              <div className="stat-value" style={{color:'var(--green)'}}>Active</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>on-chain</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Escrow State */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag" style={{color:'var(--text)', fontWeight:700}}>Escrow State (Non-Custodial)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text)'}}>
            All user funds held in Program Derived Address (PDA). No admin access. Users withdraw anytime.
          </p>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{borderColor:'var(--green)', background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Total Escrowed</div>
              <div className="stat-value" style={{color:'var(--green)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Deposits (24h)</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Withdrawals (24h)</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Unique Users</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>wallets</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Settlement Activity */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag" style={{color:'var(--text)', fontWeight:700}}>Settlement Activity</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text)'}}>
            Dual-signed usage proofs settled on-chain. 97% to Provider, 3% to Treasury.
          </p>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Settled (24h)</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Settlements (24h)</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>transactions</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Provider Payouts (24h)</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC (97%)</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Treasury Inflow (24h)</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC (3%)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Provider Registry */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Provider Registry</div>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Total Providers</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">registered</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Staked</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">$CLAF</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Models Available</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">unique models</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Avg Quality Score</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">Q_i</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Routing Modes */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Routing Mode Distribution</div>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{borderTop:'2px solid var(--green)'}}>
              <div className="stat-label">eco</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">% of requests</div>
            </div>
            <div className="stat-card" style={{borderTop:'2px solid var(--accent)'}}>
              <div className="stat-label">auto</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">% of requests</div>
            </div>
            <div className="stat-card" style={{borderTop:'2px solid var(--amber)'}}>
              <div className="stat-label">premium</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">% of requests</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Token Power */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Token Power (TTP)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            Total verified token consumption over 24h. Only dual-signed usage proofs count.
          </p>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{borderColor:'var(--green)'}}>
              <div className="stat-label">TTP (24h)</div>
              <div className="stat-value" style={{color:'var(--green)'}}>—</div>
              <div className="stat-unit">verified tokens</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TTP Change</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Avg TTP (7d)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">tokens/day</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Issuance State */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Daily Issuance Model (70/30)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            $CLAF is emitted daily based on verified network activity. No pre-mine. No team allocation in emissions.
          </p>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{borderTop:'2px solid var(--green)'}}>
              <div className="stat-label">Supply-Side (70%)</div>
              <div className="stat-value">Active</div>
              <div className="stat-unit">for Providers</div>
            </div>
            <div className="stat-card" style={{borderTop:'2px solid var(--accent)'}}>
              <div className="stat-label">Demand-Side (30%)</div>
              <div className="stat-value">Active</div>
              <div className="stat-unit">for Consumers</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Remaining Supply</div>
              <div className="stat-value">1B</div>
              <div className="stat-unit">$CLAF</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Emission Rate</div>
              <div className="stat-value">Decaying</div>
              <div className="stat-unit">Epoch-based</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Treasury */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag" style={{color:'var(--text)', fontWeight:700}}>Autonomous Treasury Dashboard (70/20/10)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'24px', fontSize:'13px', color:'var(--text)'}}>
            The ClawFarm Treasury is managed by an autonomous on-chain AI agent. It collects the 3% protocol fee and executes the mandate with zero human intervention.
          </p>

          <div className="grid-3" style={{gap:'12px', gridTemplateColumns:'repeat(3, 1fr)', marginBottom:'24px'}}>
            <div className="stat-card" style={{background:'rgba(52, 211, 153, 0.05)', border:'1px solid rgba(52, 211, 153, 0.3)'}}>
              <div className="stat-label" style={{color:'var(--green)', fontWeight:600}}>Agent Status</div>
              <div className="stat-value" style={{fontSize:'20px', color:'var(--green)'}}>MONITORING</div>
              <div className="stat-unit" style={{color:'var(--text-mid)'}}>Scanning Settlement Ledger</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Total Tax Collected</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>USDC</div>
            </div>
            <div className="stat-card" style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="stat-label" style={{color:'var(--text-mid)', fontWeight:500}}>Total $CLAF Burned</div>
              <div className="stat-value" style={{color:'var(--text)'}}>—</div>
              <div className="stat-unit" style={{color:'var(--text-dim)'}}>$CLAF</div>
            </div>
          </div>

          <div className="panel" style={{marginBottom:'24px', border:'1px solid rgba(255,255,255,0.1)'}}>
            <div className="panel-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
              <span className="panel-tag" style={{color:'var(--text)', fontWeight:700}}>Live Treasury Allocation</span>
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text)'}}>Next Buyback: ~4h 12m</span>
            </div>
            <div style={{padding:'24px 22px'}}>
              <div style={{display:'flex', height:'12px', borderRadius:'6px', overflow:'hidden', background:'rgba(255,255,255,0.05)', marginBottom:'20px'}}>
                <div style={{width:'70%', background:'var(--green)', position:'relative'}} title="70% Buyback & Burn"></div>
                <div style={{width:'20%', background:'var(--accent)', position:'relative'}} title="20% Core Maintenance"></div>
                <div style={{width:'10%', background:'var(--amber)', position:'relative'}} title="10% Infra Resilience"></div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px'}}>
                    <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--green)'}}></div>
                    <span style={{fontSize:'12px', fontWeight:700, color:'var(--text)'}}>70% Buyback & Burn</span>
                  </div>
                  <p style={{fontSize:'11px', color:'var(--text)', lineHeight:1.5, opacity:0.9}}>USDC used to market-buy $CLAF and permanently burn it. No governance access.</p>
                </div>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px'}}>
                    <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)'}}></div>
                    <span style={{fontSize:'12px', fontWeight:700, color:'var(--text)'}}>20% Core Maintenance</span>
                  </div>
                  <p style={{fontSize:'11px', color:'var(--text)', lineHeight:1.5, opacity:0.9}}>Security audits, bug bounties, and continuous protocol development.</p>
                </div>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px'}}>
                    <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--amber)'}}></div>
                    <span style={{fontSize:'12px', fontWeight:700, color:'var(--text)'}}>10% Infra Resilience</span>
                  </div>
                  <p style={{fontSize:'11px', color:'var(--text)', lineHeight:1.5, opacity:0.9}}>Funding mirror nodes and decentralized storage (IPFS/Arweave).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="panel" style={{border:'1px solid rgba(255,255,255,0.1)'}}>
            <div className="panel-header" style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
              <span className="panel-tag" style={{color:'var(--text)', fontWeight:700}}>Agent Activity Log</span>
            </div>
            <div style={{padding:'12px 0'}}>
              <div className="panel-row" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span className="panel-label" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-mid)'}}>2026-04-06 01:24:12</span>
                <span className="panel-value" style={{fontSize:'12px', color:'var(--text)'}}>Buyback Executed: 1,240 USDC → 45,210 $CLAF Burned (Tx: 4h7k...9m2s)</span>
              </div>
              <div className="panel-row" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span className="panel-label" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-mid)'}}>2026-04-05 21:00:00</span>
                <span className="panel-value" style={{fontSize:'12px', color:'var(--text)'}}>Infra Allocation: 240 USDC → Mirror Node Lease #14 (Tx: 9s2f...k2j1)</span>
              </div>
              <div className="panel-row" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span className="panel-label" style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-mid)'}}>2026-04-05 01:15:45</span>
                <span className="panel-value" style={{fontSize:'12px', color:'var(--text)'}}>Buyback Executed: 980 USDC → 38,400 $CLAF Burned (Tx: 2m1p...x9l0)</span>
              </div>
            </div>
          </div>

          <div className="panel" id="mirror">
            <div className="panel-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span className="panel-tag">Protocol Mirroring (Anti-Censorship)</span>
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>Status: DEPLOYED</span>
            </div>
            <div style={{padding:'24px 22px'}}>
              <p style={{fontSize:'14px', color:'var(--text-mid)', marginBottom:'16px', lineHeight:1.6}}>
                To ensure the ClawFarm UI remains accessible regardless of centralized domain availability, we deploy a static version of the protocol to IPFS. Anyone can access this mirror directly.
              </p>
              <div style={{background:'rgba(52, 211, 153, 0.05)', border:'1px solid var(--green)', borderRadius:'8px', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontFamily:'var(--font-mono)', fontSize:'12px'}}>
                  <div style={{color:'var(--text-dim)', marginBottom:'4px'}}>Current IPFS CID (v2.0)</div>
                  <div style={{color:'var(--green)'}}>Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6</div>
                </div>
                <a href="https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/" target="_blank" rel="noopener" className="btn-primary" style={{fontSize:'12px', padding:'8px 16px'}}>Open Mirror</a>
              </div>
            </div>
          </div>

          <div style={{marginTop:'24px', textAlign:'center'}}>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>
              Treasury PDA: <code style={{background:'var(--surface)', padding:'2px 6px', borderRadius:'4px', color:'var(--text-mid)'}}>C1awTreasuryPDA1111111111111111111111111111</code>
            </p>
          </div>
        </div>
      </section>

      {/* 9. Verification */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Verification</div>
          <div className="grid-2 mt-4" style={{gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Settlement Accepted</span>
              </div>
              <div className="panel-row"><span className="panel-label">Usage Source</span><span className="panel-value text-[#22c55e]">Dual-Signed Proofs Only</span></div>
              <div className="panel-row"><span className="panel-label">Token Count</span><span className="panel-value text-[#22c55e]">Client-Verified</span></div>
              <div className="panel-row"><span className="panel-label">Audit</span><span className="panel-value text-[#22c55e]">Sampling Re-Execution</span></div>
            </div>
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Settlement Rejected</span>
              </div>
              <div className="panel-row"><span className="panel-label">Single-Signed</span><span className="panel-value text-[#ef4444]">REJECTED</span></div>
              <div className="panel-row"><span className="panel-label">Signature Mismatch</span><span className="panel-value text-[#ef4444]">REJECTED</span></div>
              <div className="panel-row"><span className="panel-label">Token Count Mismatch</span><span className="panel-value text-[#ef4444]">DISPUTED</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/whitepaper" className="btn-secondary">Protocol</Link>
            <Link href="/install" className="btn-secondary">Become Provider</Link>
            <Link href="/users" className="btn-secondary">For Users</Link>
            <Link href="/docs" className="btn-secondary">Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}
