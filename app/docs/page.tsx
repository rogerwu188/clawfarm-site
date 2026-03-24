import Link from 'next/link'

export const metadata = { title: 'Docs — ClawFarm', description: 'Provider Setup, Reward Mechanics, and Protocol Behavior' }

export default function Docs() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Operational</span></span>
          <span>Version: <span className="text-[#8a8f98]">v1.1</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Docs</h1>
          <p className="section-text">Provider setup, reward mechanics, protocol behavior, and integration reference.</p>
        </div>
      </section>

      {/* Provider Node */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Provider Node</div>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mb-4">What qualifies as a Provider node</h3>
          <p className="section-text mb-4">
            Any compute endpoint that can serve AI inference, report metered consumption, and accept USDC settlement. Provider nodes are the miners of the ClawFarm network.
          </p>
          <div className="panel">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3">Accepted node types</div>
            <div className="panel-row"><span className="panel-label">GPU Node</span><span className="panel-value">Self-hosted GPU running open-source models</span></div>
            <div className="panel-row"><span className="panel-label">Cloud GPU</span><span className="panel-value">Cloud instance (Lambda, RunPod, CoreWeave, etc.)</span></div>
            <div className="panel-row"><span className="panel-label">API Proxy</span><span className="panel-value">Third-party model API wrapped in ClawFarm interface</span></div>
            <div className="panel-row"><span className="panel-label">Custom Model</span><span className="panel-value">Fine-tuned or proprietary inference service</span></div>
          </div>
          <div className="panel mt-4">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3">Runtime requirements</div>
            <div className="panel-row"><span className="panel-label">HTTPS endpoint</span><span className="panel-value">TLS-secured inference API</span></div>
            <div className="panel-row"><span className="panel-label">AWU reporting</span><span className="panel-value">Must return awu_used per response</span></div>
            <div className="panel-row"><span className="panel-label">Token usage</span><span className="panel-value">Input + output token counts per call</span></div>
            <div className="panel-row"><span className="panel-label">Billing</span><span className="panel-value">USDC-denominated billed_amount per call</span></div>
            <div className="panel-row"><span className="panel-label">Wallet</span><span className="panel-value">Solana address for reward settlement</span></div>
          </div>
        </div>
      </section>

      {/* AWU Standard */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">AWU — AI Work Unit</div>
          <p className="section-text mb-4">
            All Provider workloads are normalized into AWU (AI Work Units) to enable fair cross-provider reward comparison.
          </p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Definition</span><span className="panel-value">Standardized inference workload unit</span></div>
            <div className="panel-row"><span className="panel-label">Base unit</span><span className="panel-value">1000 normalized output tokens</span></div>
            <div className="panel-row"><span className="panel-label">Alternative</span><span className="panel-value">1 sec effective inference on reference GPU</span></div>
            <div className="panel-row"><span className="panel-label">Conversion</span><span className="panel-value">Per-model table published in protocol params</span></div>
          </div>
          <p className="section-text" style={{marginTop:'12px', fontSize:'13px', color:'var(--text-dim)'}}>
            The AWU conversion table is immutable between protocol upgrades and is publicly auditable.
          </p>
        </div>
      </section>

      {/* Skill / SDK */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Skill (Provider Integration Script)</div>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mb-4">How the Skill connects your node</h3>
          <p className="section-text mb-6">The ClawFarm Skill is a script (bash or SDK) that registers your node, reports usage, and interfaces with the protocol over Supabase REST API.</p>
          <div className="panel">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3">Commands</div>
            <div className="panel-row"><span className="panel-label">config</span><span className="panel-value">Set wallet, endpoint, model list, price</span></div>
            <div className="panel-row"><span className="panel-label">register</span><span className="panel-value">Register Provider node to network</span></div>
            <div className="panel-row"><span className="panel-label">status</span><span className="panel-value">View node state, uptime, Q score</span></div>
            <div className="panel-row"><span className="panel-label">usage</span><span className="panel-value">Report metered AWU for a completed call</span></div>
            <div className="panel-row"><span className="panel-label">earnings</span><span className="panel-value">View accrued CLAW and vesting schedule</span></div>
            <div className="panel-row"><span className="panel-label">tasks</span><span className="panel-value">List available work routed to your node</span></div>
            <div className="panel-row"><span className="panel-label">claim</span><span className="panel-value">Accept a routed task</span></div>
            <div className="panel-row"><span className="panel-label">complete</span><span className="panel-value">Mark task as settled with output hash</span></div>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Reward Mechanics</div>
          <p className="section-text mb-4">
            Rewards are computed per Epoch using the public formula. No manual allocation.
          </p>
          <div className="panel mt-4">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3">Epoch distribution</div>
            <div className="panel-row"><span className="panel-label">Provider Pool</span><span className="panel-value" style={{color:'var(--green)'}}>70% — weighted by W_i = AWU × Price × Quality</span></div>
            <div className="panel-row"><span className="panel-label">Cold-Start Pool</span><span className="panel-value">20% — online Providers with low utilization</span></div>
            <div className="panel-row"><span className="panel-label">User Cashback</span><span className="panel-value">10% — proportional to User payment (γ rate)</span></div>
            <div className="panel-row"><span className="panel-label">Treasury</span><span className="panel-value">3% of every payment → Buyback & Burn</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear release</span></div>
            <div className="panel-row"><span className="panel-label">Verification</span><span className="panel-value">Objective (programmatic — no human scoring)</span></div>
          </div>
          <p className="section-small" style={{marginTop:'12px'}}>
            Quality score Q_i = SuccessRate × LatencyScore × UptimeScore. All three are machine-verifiable. No subjective input accepted.
          </p>
        </div>
      </section>

      {/* Ledgers */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Protocol Ledgers</div>
          <div className="grid-3 mt-4">
            <div className="grid-cell">
              <h4>Call Ledger</h4>
              <p>provider_id, user_id, model_id, payment, awu_used, response_time, success_flag, timestamp</p>
            </div>
            <div className="grid-cell">
              <h4>Reward Ledger</h4>
              <p>provider_id, epoch_id, W_i, reward_claw, cashback_claw, vesting_start</p>
            </div>
            <div className="grid-cell">
              <h4>Treasury Ledger</h4>
              <p>epoch_id, tax_usdc_collected, buyback_usdc, claw_burned, tx_hash</p>
            </div>
          </div>
          <p className="section-small">All ledger entries are append-only. Settlement inputs are derived exclusively from these on-chain records.</p>
        </div>
      </section>

      {/* Links */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/install" className="btn-primary">Register as Provider</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
            <Link href="/whitepaper" className="btn-secondary">Whitepaper</Link>
            <Link href="/providers" className="btn-secondary">Provider Guide</Link>
            <Link href="/masterpool" className="btn-secondary">Master Pool</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
