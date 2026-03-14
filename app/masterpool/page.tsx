import Link from 'next/link'

export const metadata = { title: 'Network Explorer — ClawFarm', description: 'ClawFarm Protocol Network State' }

export default function Pool() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Network Explorer</span></span>
          <span>Chain: <span className="text-[#8a8f98]">Solana</span></span>
          <span>Status: <span className="text-[#8a8f98]">Live</span></span>
        </div>
      </div>

      {/* Hero */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="section-title text-[36px]">ClawFarm Network Explorer</h1>
          <p className="section-text" style={{marginTop:'8px', fontSize:'16px', color:'var(--text-mid)'}}>
            Real-time view of Gateway-verified usage, settlement, issuance, and protocol state.
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
              <div className="stat-label">Verified Receipts</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">total</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Gateways</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">online</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Settlement</div>
              <div className="stat-value" style={{color:'var(--green)'}}>Active</div>
              <div className="stat-unit">15min epochs</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Treasury</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Daily Issuance</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Vesting Locked</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Epoch</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">#</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gateway-Verified Usage */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Gateway-Verified Usage</div>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Verified Usage Today</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC billed</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Verified Usage 24h</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Receipts Generated</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">total</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Receipts Epoch</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">current</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Calls Rejected</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">invalid</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Providers</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">active</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Runtimes</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">connected</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Skills</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">registered</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Token Power (TTP) */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Token Power (TTP)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            TTP measures total Gateway-verified token consumption over 24h. Only verified receipts count.
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

      {/* 4. Issuance State */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Issuance State</div>
          <div className="grid-4 mt-4" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Total Supply</div>
              <div className="stat-value">1B</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Allocated</div>
              <div className="stat-value">0</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Remaining</div>
              <div className="stat-value">1B</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Halving</div>
              <div className="stat-value">Phase 1</div>
              <div className="stat-unit">Year 1-2</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Treasury & Settlement */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Treasury = Buyback & Burn Engine</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            The Treasury is a non-discretionary buyback-and-burn engine. It has no governance, no allocation committee, and no human-controlled spending.
          </p>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Treasury Balance</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Inflow (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tokens Burned</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Vesting (180d)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Buyback Engine</div>
              <div className="stat-value" style={{color:'var(--green)'}}>Active</div>
              <div className="stat-unit">24h cycle</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tax Rate</div>
              <div className="stat-value">3%</div>
              <div className="stat-unit">of billed</div>
            </div>
          </div>
          <div className="panel mt-6" style={{borderLeft:'3px solid var(--green)'}}>
            <div className="grid-2" style={{gap:'24px', gridTemplateColumns:'repeat(2, 1fr)'}}>
              <div>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px'}}>TWAP ADAPTIVE BUYBACK</p>
                <ul style={{fontSize:'12px', color:'var(--text-dim)', paddingLeft:'16px', lineHeight:'1.8'}}>
                  <li>• Cycle: Every 24 hours</li>
                  <li>• Base: 80% of Treasury USDC</li>
                  <li>• Bear market (&lt;-10%): 150% buyback (support price)</li>
                  <li>• Normal (±10%): 80% buyback</li>
                  <li>• Bull market (>+10%): 50% buyback (cap price)</li>
                  <li>• Randomization: Time + split randomization</li>
                </ul>
              </div>
              <div>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px'}}>BURN MECHANICS</p>
                <ul style={{fontSize:'12px', color:'var(--text-dim)', paddingLeft:'16px', lineHeight:'1.8'}}>
                  <li>• All bought tokens → burn address</li>
                  <li>• No treasury allocation</li>
                  <li>• No governance control</li>
                  <li>• Fully programmatic</li>
                  <li>• Transparent & verifiable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Protocol Security */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Protocol Security</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            Only Gateway-verified usage receipts are settlement-valid. Client-reported usage is rejected.
          </p>
          <div className="grid-2 mt-4" style={{gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Trusted Sources</span>
              </div>
              <div className="panel-row"><span className="panel-label">Usage Source</span><span className="panel-value text-[#22c55e]">Gateway-Verified Only</span></div>
              <div className="panel-row"><span className="panel-label">Receipt Validity</span><span className="panel-value text-[#22c55e]">Gateway-Signed</span></div>
              <div className="panel-row"><span className="panel-label">Settlement Entry</span><span className="panel-value text-[#22c55e]">Verified Receipts</span></div>
            </div>
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Rejected Sources</span>
              </div>
              <div className="panel-row"><span className="panel-label">Client-Reported</span><span className="panel-value text-[#ef4444]">REJECTED</span></div>
              <div className="panel-row"><span className="panel-label">Skill-Reported</span><span className="panel-value text-[#ef4444]">REJECTED</span></div>
              <div className="panel-row"><span className="panel-label">Bypassed Calls</span><span className="panel-value text-[#ef4444]">REJECTED</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/whitepaper" className="btn-secondary">Protocol</Link>
            <Link href="/install" className="btn-secondary">Install Gateway</Link>
            <Link href="/docs" className="btn-secondary">Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}
