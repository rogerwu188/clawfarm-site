import Link from 'next/link'

export const metadata = { title: 'For Users — ClawFarm', description: 'Deposit USDC, choose a routing mode, consume AI inference. Non-custodial. No signups with providers.' }

export default function Users() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">User Guide</span></span>
          <span>Custody: <span className="text-[#8a8f98]">Non-Custodial Escrow</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">One wallet. All AI models. Zero platform risk.</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            Connect your Solana wallet, deposit USDC into the on-chain escrow, and access every Provider on the ClawFarm network. No more signing up with individual API providers. No more managing multiple billing accounts.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">How It Works</div>
          <div className="space-y-0 mt-6">
            {[
              {step:'1', title:'Connect your Solana wallet', desc:'Phantom, Backpack, or any Solana wallet'},
              {step:'2', title:'Deposit USDC into Escrow Contract', desc:'Your funds go to a program-owned account (PDA) — no human holds the key'},
              {step:'3', title:'Select routing mode: eco / auto / premium', desc:'Or specify a model directly'},
              {step:'4', title:'Send AI requests', desc:'The SDK routes to the best Provider based on your mode'},
              {step:'5', title:'Usage proof auto-generated', desc:'Client-side token counting + dual signature (you + Provider)'},
              {step:'6', title:'Contract settles automatically', desc:'97% to Provider wallet, 3% to Treasury — all on-chain'},
              {step:'7', title:'Withdraw remaining USDC anytime', desc:'No lock-up, no approval needed — your funds, your control'},
            ].map((f, i) => (
              <div key={i} className="seq-item">
                <span className="seq-num">{f.step}</span>
                <div>
                  <span className="seq-text">{f.title}</span>
                  <span className="block text-[11px] text-[#505560] mt-1">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing modes */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Routing Modes</div>
          <h2 className="section-title">Three modes. Automatic. Open-source.</h2>
          <p className="section-text mb-6">
            The routing engine is open-source and runs client-side in the ClawFarm SDK. It reads the on-chain Provider Registry (prices + quality scores) and selects the optimal Provider for each request.
          </p>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <div className="grid-cell" style={{borderTop:'2px solid var(--green)'}}>
              <h4 style={{color:'var(--green)'}}>eco</h4>
              <p style={{marginTop:'8px'}}>Lowest cost per token. Routes to the cheapest qualified Provider.</p>
              <p style={{marginTop:'12px', fontSize:'11px', color:'var(--text-dim)'}}>Best for: bulk processing, summarization, non-critical tasks</p>
            </div>
            <div className="grid-cell" style={{borderTop:'2px solid var(--accent)'}}>
              <h4 style={{color:'var(--accent)'}}>auto</h4>
              <p style={{marginTop:'8px'}}>Balanced — optimizes across cost, quality, and latency.</p>
              <p style={{marginTop:'12px', fontSize:'11px', color:'var(--text-dim)'}}>Best for: general-purpose usage, default mode</p>
            </div>
            <div className="grid-cell" style={{borderTop:'2px solid var(--amber)'}}>
              <h4 style={{color:'var(--amber)'}}>premium</h4>
              <p style={{marginTop:'8px'}}>Routes to the highest-tier model available. Maximum quality.</p>
              <p style={{marginTop:'12px', fontSize:'11px', color:'var(--text-dim)'}}>Best for: complex reasoning, code gen, deep thinking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Routing signals */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Routing Signals</div>
          <p className="section-text mb-4">
            The router automatically analyzes your request and selects the best Provider:
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Prompt length</span><span className="panel-value">Filters by context window support</span></div>
            <div className="panel-row"><span className="panel-label">Tool calls</span><span className="panel-value">Filters providers with function-calling models</span></div>
            <div className="panel-row"><span className="panel-label">Deep thinking</span><span className="panel-value">Routes to reasoning models (o1, Claude thinking, etc.)</span></div>
            <div className="panel-row"><span className="panel-label">Price table</span><span className="panel-value">On-chain Registry, real-time prices</span></div>
            <div className="panel-row"><span className="panel-label">Quality score</span><span className="panel-value">Historical success rate, latency, uptime</span></div>
            <div className="panel-row"><span className="panel-label">Your preference</span><span className="panel-value">Model whitelist/blacklist (optional)</span></div>
          </div>
        </div>
      </section>

      {/* Non-custodial guarantee */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Non-Custodial Guarantee</div>
          <h2 className="section-title">Your USDC. Your control. Always.</h2>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>Program-Owned Account</h4>
              <p>Your USDC is held in a Solana Program Derived Address (PDA). No human — not even ClawFarm — holds the private key. Only the smart contract logic can move funds.</p>
            </div>
            <div className="grid-cell">
              <h4>Withdraw Anytime</h4>
              <p>Your available balance (total - pending settlements) can be withdrawn at any time. No approval, no lock-up, no waiting period.</p>
            </div>
            <div className="grid-cell">
              <h4>On-Chain Balance</h4>
              <p>Your balance is a Solana token account, not a number in a database. Verify it on any block explorer.</p>
            </div>
            <div className="grid-cell">
              <h4>Transparent Billing</h4>
              <p>Every call shows: which Provider served it, how many tokens, what price, how much USDC was deducted. All on-chain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User cashback */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">User Cashback</div>
          <p className="section-text">
            10% of each Epoch's CLAW issuance goes to the User Cashback Pool. You earn CLAW proportional to how much USDC you spend on inference. It's automatic — no staking, no claiming, no action required.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Pool size</span><span className="panel-value">10% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Basis</span><span className="panel-value">Proportional to USDC spent</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">Action required</span><span className="panel-value">None — automatic</span></div>
          </div>
        </div>
      </section>

      {/* Quick start */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Quick Start</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`import { ClawFarm } from '@clawfarm/sdk'

// Connect wallet
const cf = new ClawFarm({ wallet: yourSolanaWallet })

// Deposit USDC
await cf.deposit({ amount: 100 })  // 100 USDC

// Send AI request with auto routing
const response = await cf.chat({
  mode: 'auto',                     // eco | auto | premium
  messages: [
    { role: 'user', content: 'Explain ZK proofs in simple terms' }
  ],
})

// Response includes full transparency
console.log(response.provider)       // which Provider served this
console.log(response.model)          // which model was used
console.log(response.tokens)         // input + output token counts
console.log(response.cost)           // USDC deducted
console.log(response.txHash)         // on-chain settlement tx

// Check balance
const balance = await cf.balance()

// Withdraw anytime
await cf.withdraw({ amount: 50 })   // 50 USDC back to your wallet`}
            </pre>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/docs" className="btn-primary">Full Documentation</Link>
            <Link href="/whitepaper" className="btn-secondary">Read Protocol</Link>
            <Link href="/masterpool" className="btn-secondary">Network Explorer</Link>
            <Link href="/providers" className="btn-secondary">Browse Providers</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
