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
            A public view into issuance, metered execution, treasury state, and protocol distribution.
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
              <div className="stat-value">1,000,000,000</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Mined to Date</div>
              <div className="stat-value">0</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Remaining Supply</div>
              <div className="stat-value">1,000,000,000</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Daily Issuance</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW/day</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Nodes</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">online</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Providers</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">integrated</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Treasury Balance</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Settlement</div>
              <div className="stat-value" style={{color:'var(--green)'}}>Active</div>
              <div className="stat-unit">daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Issuance State */}
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
              <div className="stat-label">Remaining to Mine</div>
              <div className="stat-value">1B</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Vesting Outstanding</div>
              <div className="stat-value">0</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Unlocked</div>
              <div className="stat-value">0</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Halving Phase</div>
              <div className="stat-value">Phase 1</div>
              <div className="stat-unit">Year 1-2</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Next Halving</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">days</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Emission Rate</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW/block</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metered Activity */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Metered Activity</div>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Eligible Consumption Today</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC billed</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Cumulative Billed Usage</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Tasks 24h</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Settled Tasks 24h</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Connected Runtimes</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">nodes</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">OpenClaw / ClawBox</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Token Power (TTP) */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Token Power (TTP)</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            Token Power (TTP) represents the total eligible token consumption intensity across the ClawFarm network over the past 24 hours. Similar to BTC hash rate, TTP measures the computational work securing and powering the network.
          </p>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card" style={{borderColor:'var(--green)'}}>
              <div className="stat-label">TTP (24h)</div>
              <div className="stat-value" style={{color:'var(--green)'}}>—</div>
              <div className="stat-unit">tokens consumed</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TTP Change (24h)</div>
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

      {/* 5. Treasury and Settlement */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Treasury & Settlement</div>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'12px'}}>
            <div className="stat-card">
              <div className="stat-label">Treasury Balance</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Treasury Inflow (24h)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Treasury Inflow (7d)</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">USDC</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Rewards Allocated Today</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Rewards Vesting</div>
              <div className="stat-value">—</div>
              <div className="stat-unit">CLAW (180d)</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Governance</div>
              <div className="stat-value" style={{color:'var(--green)'}}>Agent DAO</div>
              <div className="stat-unit">autonomous</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Master Pool Vault */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Master Pool Vault</div>
          <p className="section-text" style={{marginTop:'8px', marginBottom:'16px', fontSize:'13px', color:'var(--text-mid)'}}>
            This is not a private wallet. This is a program-controlled vault. No founder, operator, or bot can move assets directly. All transfers follow protocol rules.
          </p>
          
          <div className="grid-2 mt-4" style={{gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            <div>
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-tag">Vault Status</span>
                  <span className="panel-live"><span className="state-dot" /> DEPLOYED</span>
                </div>
                <div className="panel-row"><span className="panel-label">Custody Model</span><span className="panel-value">program-owned</span></div>
                <div className="panel-row"><span className="panel-label">Private Key</span><span className="panel-value text-[#22c55e]">none</span></div>
                <div className="panel-row"><span className="panel-label">Transfer Rules</span><span className="panel-value">protocol-defined</span></div>
                <div className="panel-row"><span className="panel-label">Reward Vesting</span><span className="panel-value">180-day linear</span></div>
              </div>
            </div>
            
            <div>
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-tag">Protocol Addresses</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-[#505560] uppercase tracking-wider">Program ID</div>
                    <div className="addr"><span>3sk574EAo5fhTCaj9hyDou4pgLBV7TgTSWZPyNeA8TLM</span></div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#505560] uppercase tracking-wider">Master Pool Vault</div>
                    <div className="addr"><span>TBD — pending deployment</span></div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#505560] uppercase tracking-wider">Treasury Vault</div>
                    <div className="addr"><span>TBD — pending deployment</span></div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#505560] uppercase tracking-wider">Vesting Vault</div>
                    <div className="addr"><span>TBD — pending deployment</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/whitepaper" className="btn-secondary">Protocol</Link>
            <Link href="/install" className="btn-secondary">Integrate</Link>
            <Link href="/docs" className="btn-secondary">Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}
