import Link from 'next/link'

export const metadata = { title: 'Network Explorer — ClawFarm', description: 'Real-time network state: escrow, providers, settlement, treasury' }

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
          <div className="section-tag">Network Overview</div>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Total Supply</div>
              <div className="stat-value">1B</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Providers</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">registered</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Users</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">with escrow balance</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Settlement</div>
              <div className="stat-value" style={{color:'var(--green)'}}>Active</div>
              <div className="stat-unit">on-chain</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Escrow State */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Escrow State (Non-Custodial)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            All user funds held in Program Derived Address (PDA). No admin access. Users withdraw anytime.
          </p>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{borderColor:'var(--green)'}}>
              <div className="stat-label">Total Escrowed</div>
              <div className="stat-value" style={{color:'var(--green)'}}>—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Deposits (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Withdrawals (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Unique Users</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">wallets</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Settlement Activity */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Settlement Activity</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            Dual-signed usage proofs settled on-chain. 97% to Provider, 3% to Treasury.
          </p>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Settled (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Settlements (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">transactions</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Provider Payouts (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC (97%)</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Treasury Inflow (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC (3%)</div>
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
              <div className="stat-unit">CLAW</div>
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
              <div className="stat-unit">CLAW</div>
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
          <div className="section-tag">Autonomous Treasury Dashboard (70/20/10)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            3% protocol fee on all settlements. Managed by an autonomous on-chain AI agent with a hard-coded mandate.
          </p>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Treasury Balance</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC (PDA)</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Buyback & Burn</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW Burned</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Infrastructure Funded</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">Mirror Nodes</div>
            </div>
          </div>
          <div className="panel mt-6" style={{borderLeft:'3px solid var(--green)'}}>
            <div className="grid-3" style={{gap:'24px', gridTemplateColumns:'repeat(3, 1fr)'}}>
              <div style={{padding:'18px 22px'}}>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px', fontWeight:700}}>70% BUYBACK & BURN</p>
                <p style={{fontSize:'12px', color:'var(--text-mid)', lineHeight:'1.7'}}>
                  Automatic USDC market buybacks and permanent burn. No governance control. Hard-coded deflation.
                </p>
                <div style={{marginTop:'12px', fontSize:'11px', color:'var(--green)', fontFamily:'var(--font-mono)'}}>Status: ACTIVE</div>
              </div>
              <div style={{padding:'18px 22px'}}>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px', fontWeight:700}}>20% CORE MAINTENANCE</p>
                <p style={{fontSize:'12px', color:'var(--text-mid)', lineHeight:'1.7'}}>
                  Security audits, bug bounties, and protocol development. Ensuring long-term architecture stability.
                </p>
                <div style={{marginTop:'12px', fontSize:'11px', color:'var(--accent)', fontFamily:'var(--font-mono)'}}>Status: PENDING AUDIT</div>
              </div>
              <div style={{padding:'18px 22px'}}>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px', fontWeight:700}}>10% INFRA RESILIENCE</p>
                <p style={{fontSize:'12px', color:'var(--text-mid)', lineHeight:'1.7'}}>
                  Mirror nodes and decentralized UI hosting (IPFS/Arweave). Ensuring zero-downtime protocol access.
                </p>
                <div style={{marginTop:'12px', fontSize:'11px', color:'var(--amber)', fontFamily:'var(--font-mono)'}}>Status: 1 NODE ACTIVE</div>
              </div>
            </div>
          </div>
          <div className="mt-6" style={{textAlign:'center'}}>
            <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>
              Treasury PDA: <span style={{color:'var(--text-mid)'}}>[Solana Treasury Address TBD]</span>
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
