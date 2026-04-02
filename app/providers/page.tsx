import Link from 'next/link'

export const metadata = { title: 'Providers — ClawFarm', description: 'Register as a Provider on the decentralized AI compute marketplace' }

export default function Providers() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Provider Integration</span></span>
          <span>Policy: <span className="text-[#8a8f98]">Permissionless — On-Chain Registration</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Anyone can be a Provider.</h1>
          <p className="section-text">
            ClawFarm is a decentralized AI compute marketplace. No approval process. No whitelist. Register on-chain with a model endpoint, a price table, and a CLAW stake. Start earning 97% USDC service revenue and CLAW token rewards — settlement goes directly from user escrow to your wallet.
          </p>
          <p className="section-text" style={{marginTop:'16px', borderLeft:'3px solid var(--green)', paddingLeft:'16px'}}>
            <strong>No payment infrastructure needed.</strong> ClawFarm settles directly from user escrow to your wallet via smart contract. Focus on serving inference, not building billing systems.
          </p>
        </div>
      </section>

      {/* Provider Types */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Provider Types</div>
          <div className="grid-2 mt-4">
            <div className="grid-cell">
              <h4>GPU Node Operator</h4>
              <p>Run consumer or datacenter GPU hardware. Deploy LLaMA, Mistral, Qwen, or any open-source model. Sell compute capacity to the network.</p>
            </div>
            <div className="grid-cell">
              <h4>Cloud GPU Node</h4>
              <p>Spin up GPU instances on Lambda, RunPod, CoreWeave, or any cloud provider. Wrap them into a ClawFarm-compatible endpoint.</p>
            </div>
            <div className="grid-cell">
              <h4>Third-Party API Proxy</h4>
              <p>Proxy OpenAI, Anthropic, Gemini, or any model API through your registered endpoint. Every verified request earns you CLAW rewards.</p>
            </div>
            <div className="grid-cell">
              <h4>Custom Model Service</h4>
              <p>Fine-tuned models, domain-specific inference, proprietary runtimes — if it serves tokens and can be metered, it qualifies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How rewards work */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">How Provider Rewards Work</div>
          <p className="section-text mb-4">
            Two revenue streams: direct USDC from users, and CLAW token rewards from the protocol.
          </p>
          <div className="panel">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2.2, padding:'18px 22px'}}>
{`W_i = AWU_i × (P_avg / P_i) × Q_i

Reward_i = E_t × W_i / ΣW`}
            </pre>
            <div className="panel-row"><span className="panel-label">USDC Revenue</span><span className="panel-value" style={{color:'var(--green)'}}>97% of every user payment (direct, on-chain)</span></div>
            <div className="panel-row"><span className="panel-label">CLAW Rewards</span><span className="panel-value">70% of Epoch issuance, weighted by W_i</span></div>
            <div className="panel-row"><span className="panel-label">Cold-Start Bonus</span><span className="panel-value">20% of Epoch issuance for new providers</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear release</span></div>
          </div>
        </div>
      </section>

      {/* Staking */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Provider Staking</div>
          <p className="section-text mb-4">
            Providers must stake CLAW tokens to register. The stake acts as collateral — if you serve honestly, you keep it. If you cheat, it gets slashed.
          </p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Minimum Stake</span><span className="panel-value">1,000 CLAW</span></div>
            <div className="panel-row"><span className="panel-label">Slash Conditions</span><span className="panel-value">Token count fraud, sustained downtime, response manipulation</span></div>
            <div className="panel-row"><span className="panel-label">Slash Amount</span><span className="panel-value">Up to 100% of stake</span></div>
            <div className="panel-row"><span className="panel-label">Unstaking Period</span><span className="panel-value">7 days (allows pending disputes to resolve)</span></div>
          </div>
        </div>
      </section>

      {/* Settlement */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Settlement Flow</div>
          <p className="section-text mb-4">
            You don&#39;t need Stripe, payment processing, or your own billing system. Settlement is automatic:
          </p>
          <div className="panel">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`User sends AI request
  ↓ routed to your endpoint by eco/auto/premium
You serve inference + sign usage proof
  ↓ user SDK also signs (dual-signature)
Settlement contract processes proof
  ↓
├── 97% USDC → your wallet (on-chain)
└── 3% USDC → Treasury → buyback & burn`}
            </pre>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">On-Chain Registration</div>
          <p className="section-text mb-4">To register as a Provider, call the registry contract with:</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">endpoint</span><span className="panel-value">Your inference API endpoint (HTTPS)</span></div>
            <div className="panel-row"><span className="panel-label">models</span><span className="panel-value">List of supported model IDs + per-token pricing</span></div>
            <div className="panel-row"><span className="panel-label">stake</span><span className="panel-value">CLAW tokens to lock (min 1,000)</span></div>
            <div className="panel-row"><span className="panel-label">wallet</span><span className="panel-value">Your Solana wallet for settlement</span></div>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>
            No approval. No human review. Your Provider account is active from the next block. Traffic can route to you immediately.
          </p>
        </div>
      </section>

      {/* Verification */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Verification Requirements</div>
          <p className="section-text mb-4">
            Every response from your endpoint must support dual-signature verification:
          </p>
          <div className="panel">
            <pre className="text-[11px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`{
  "request_id": "req_xxx",
  "output": "...",
  "token_usage": {
    "input_tokens": 800,
    "output_tokens": 1200
  },
  "response_time_ms": 312,
  "success": true,
  "provider_signature": "..."    // your signature on the usage proof
}`}
            </pre>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>
            The user SDK independently counts tokens and co-signs. Both signatures required for settlement. This protects both parties.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/install" className="btn-primary">Register as Provider</Link>
            <Link href="/whitepaper" className="btn-secondary">Read Full Protocol</Link>
            <Link href="/docs" className="btn-secondary">Technical Docs</Link>
            <Link href="/masterpool" className="btn-secondary">Network Explorer</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
