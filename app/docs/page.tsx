import Link from 'next/link'

export const metadata = { title: 'Docs — ClawFarm', description: 'User guide, Provider setup, routing modes, SDK reference, and protocol behavior' }

export default function Docs() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Documentation</span></span>
          <span>Version: <span className="text-[#8a8f98]">v2.0</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Docs</h1>
          <p className="section-text">User guide, Provider setup, routing modes, SDK reference, and protocol behavior.</p>
        </div>
      </section>

      {/* For Users */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">For Users</div>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mb-4">Getting Started</h3>
          <p className="section-text mb-4">
            ClawFarm is a non-custodial AI compute marketplace. Connect your wallet, deposit USDC, and access all Providers.
          </p>
          <div className="panel">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3" style={{padding:'12px 22px 0'}}>Quick start</div>
            <div className="panel-row"><span className="panel-label">1. Connect wallet</span><span className="panel-value">Phantom, Backpack, or any Solana wallet</span></div>
            <div className="panel-row"><span className="panel-label">2. Deposit USDC</span><span className="panel-value">Funds go to PDA escrow — not ClawFarm</span></div>
            <div className="panel-row"><span className="panel-label">3. Select mode</span><span className="panel-value">eco (cheap) / auto (balanced) / premium (best)</span></div>
            <div className="panel-row"><span className="panel-label">4. Send requests</span><span className="panel-value">SDK routes to optimal Provider automatically</span></div>
            <div className="panel-row"><span className="panel-label">5. View usage</span><span className="panel-value">Every call: provider, model, tokens, cost, tx hash</span></div>
            <div className="panel-row"><span className="panel-label">6. Withdraw</span><span className="panel-value">Anytime — no lock-up, no approval</span></div>
          </div>
        </div>
      </section>

      {/* Routing Modes */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Routing Modes</div>
          <p className="section-text mb-4">
            The routing engine is open-source and runs client-side. It reads the on-chain Provider Registry to select the best match for each request.
          </p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">eco</span><span className="panel-value">Lowest cost per token — cheapest qualified Provider</span></div>
            <div className="panel-row"><span className="panel-label">auto</span><span className="panel-value">Balanced — cost × quality × latency weighted</span></div>
            <div className="panel-row"><span className="panel-label">premium</span><span className="panel-value">Highest-tier model — maximum quality</span></div>
          </div>
          <div className="panel mt-4">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3" style={{padding:'12px 22px 0'}}>Routing input signals</div>
            <div className="panel-row"><span className="panel-label">Prompt length</span><span className="panel-value">Filters by context window support</span></div>
            <div className="panel-row"><span className="panel-label">Tool calls</span><span className="panel-value">Requires function-calling capable models</span></div>
            <div className="panel-row"><span className="panel-label">Deep thinking</span><span className="panel-value">Routes to reasoning models (o1, Claude thinking)</span></div>
            <div className="panel-row"><span className="panel-label">Model preference</span><span className="panel-value">Optional whitelist/blacklist</span></div>
          </div>
        </div>
      </section>

      {/* SDK */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">SDK Reference</div>
          <div className="panel mt-4">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`import { ClawFarm } from '@clawfarm/sdk'

const cf = new ClawFarm({ wallet })

// Deposit / Withdraw
await cf.deposit({ amount: 100 })      // 100 USDC to escrow
await cf.withdraw({ amount: 50 })      // 50 USDC back to wallet
const bal = await cf.balance()          // available balance

// AI Inference
const res = await cf.chat({
  mode: 'auto',                         // eco | auto | premium
  messages: [{ role: 'user', content: '...' }],
  // Optional overrides:
  model: 'claude-3.5-sonnet',           // force specific model
  tools: [...],                          // function calling
  thinking: true,                        // enable deep thinking
})

// Response transparency
res.provider    // which Provider served this
res.model       // which model was used
res.tokens      // { input, output, total }
res.cost        // USDC deducted
res.txHash      // on-chain settlement tx

// Provider Registry (read-only)
const providers = await cf.providers()  // all active providers
const prices = await cf.prices()        // current price table`}
            </pre>
          </div>
        </div>
      </section>

      {/* Provider Node */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">For Providers</div>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mb-4">Provider Node Setup</h3>
          <p className="section-text mb-4">
            Any endpoint that serves AI inference and supports dual-signature verification can register as a Provider.
          </p>
          <div className="panel">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3" style={{padding:'12px 22px 0'}}>Registration requirements</div>
            <div className="panel-row"><span className="panel-label">Endpoint</span><span className="panel-value">HTTPS inference API</span></div>
            <div className="panel-row"><span className="panel-label">Models</span><span className="panel-value">Supported model IDs + per-token pricing</span></div>
            <div className="panel-row"><span className="panel-label">Stake</span><span className="panel-value">Minimum 1,000 CLAW</span></div>
            <div className="panel-row"><span className="panel-label">Wallet</span><span className="panel-value">Solana address for settlement</span></div>
            <div className="panel-row"><span className="panel-label">Dual-sig</span><span className="panel-value">Must sign usage proofs per response</span></div>
          </div>
          <div className="panel mt-4">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3" style={{padding:'12px 22px 0'}}>Provider SDK commands</div>
            <div className="panel-row"><span className="panel-label">register</span><span className="panel-value">Register on-chain (instant, no approval)</span></div>
            <div className="panel-row"><span className="panel-label">status</span><span className="panel-value">View node state, uptime, Q score</span></div>
            <div className="panel-row"><span className="panel-label">update-pricing</span><span className="panel-value">Update your price table on-chain</span></div>
            <div className="panel-row"><span className="panel-label">earnings</span><span className="panel-value">View USDC revenue + CLAW rewards + vesting</span></div>
            <div className="panel-row"><span className="panel-label">unstake</span><span className="panel-value">Begin unstaking (7-day period)</span></div>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Verification</div>
          <p className="section-text mb-4">
            ClawFarm uses a 4-layer hybrid verification model:
          </p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Layer 1</span><span className="panel-value">Client-side token counting (deterministic tokenizer)</span></div>
            <div className="panel-row"><span className="panel-label">Layer 2</span><span className="panel-value">Dual signature (user + provider must agree)</span></div>
            <div className="panel-row"><span className="panel-label">Layer 3</span><span className="panel-value">Sampling audit (random re-execution)</span></div>
            <div className="panel-row"><span className="panel-label">Layer 4</span><span className="panel-value">Stake slashing (on-chain dispute resolution)</span></div>
          </div>
        </div>
      </section>

      {/* Reward Mechanics */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Reward Mechanics</div>
          <div className="panel mt-4">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-3" style={{padding:'12px 22px 0'}}>Epoch distribution</div>
            <div className="panel-row"><span className="panel-label">Provider Pool</span><span className="panel-value" style={{color:'var(--green)'}}>70% — W_i = AWU × Price × Quality</span></div>
            <div className="panel-row"><span className="panel-label">Cold-Start Pool</span><span className="panel-value">20% — new providers with low utilization</span></div>
            <div className="panel-row"><span className="panel-label">User Cashback</span><span className="panel-value">10% — proportional to USDC spent</span></div>
            <div className="panel-row"><span className="panel-label">Treasury</span><span className="panel-value">3% of payments → Buyback & Burn</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear release</span></div>
            <div className="panel-row"><span className="panel-label">Verification</span><span className="panel-value">Objective — no human scoring</span></div>
          </div>
        </div>
      </section>

      {/* Protocol Ledgers */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Protocol Ledgers</div>
          <div className="grid-3 mt-4" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <div className="grid-cell">
              <h4>Settlement Ledger</h4>
              <p>user, provider, model, input_tokens, output_tokens, cost_usdc, provider_payout, treasury_tax, tx_hash</p>
            </div>
            <div className="grid-cell">
              <h4>Reward Ledger</h4>
              <p>provider, epoch, W_i, reward_claw, cashback_claw, vesting_start</p>
            </div>
            <div className="grid-cell">
              <h4>Treasury Ledger</h4>
              <p>epoch, tax_usdc, buyback_usdc, claw_burned, tx_hash</p>
            </div>
          </div>
          <p className="section-small">All ledger entries are on-chain and append-only. Settlement derived exclusively from dual-signed usage proofs.</p>
        </div>
      </section>

      {/* Links */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/users" className="btn-primary">User Guide</Link>
            <Link href="/install" className="btn-primary">Register as Provider</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
            <Link href="/whitepaper" className="btn-secondary">Whitepaper</Link>
            <Link href="/masterpool" className="btn-secondary">Network Explorer</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
