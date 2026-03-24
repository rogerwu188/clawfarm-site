import Link from 'next/link'

export const metadata = { title: 'Providers — ClawFarm', description: 'Become a ClawFarm Provider — Open AI Compute Mining' }

export default function Providers() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Provider Integration</span></span>
          <span>Policy: <span className="text-[#8a8f98]">Open — No Whitelist</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Anyone can be a Provider.</h1>
          <p className="section-text">
            ClawFarm is an open compute network. No approval process. No whitelist. If you can serve AI inference — with your own GPU, a cloud node, or a third-party API — you can register as a Provider and start earning CLAW rewards and USDC service revenue.
          </p>
        </div>
      </section>

      {/* What counts as a Provider */}
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
              <p>Spin up GPU instances on Lambda, RunPod, CoreWeave, or any cloud provider. Wrap them into a ClawFarm-compatible endpoint and register.</p>
            </div>
            <div className="grid-cell">
              <h4>Third-Party API Proxy</h4>
              <p>Proxy OpenAI, Anthropic, Gemini, or any model API through your registered endpoint. Every verified request earns you CLAW rewards.</p>
            </div>
            <div className="grid-cell">
              <h4>Custom Model Service</h4>
              <p>Fine-tuned models, domain-specific inference, proprietary runtimes — if it serves tokens and can be metered, it qualifies as a Provider.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Providers are rewarded */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">How Provider Rewards Work</div>
          <p className="section-text mb-4">
            Rewards are computed by the public formula each Epoch. No human decides your reward.
          </p>
          <div className="panel">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2.2, padding:'8px 0'}}>
{`W_i = AWU_i × (P_avg / P_i) × Q_i

Reward_i = E_t × W_i / ΣW`}
            </pre>
            <div className="panel-row"><span className="panel-label">AWU_i</span><span className="panel-value">Your true metered workload (AI Work Units)</span></div>
            <div className="panel-row"><span className="panel-label">P_avg / P_i</span><span className="panel-value">Lower price than network average = higher weight</span></div>
            <div className="panel-row"><span className="panel-label">Q_i</span><span className="panel-value">Your quality score: success rate × latency × uptime</span></div>
            <div className="panel-row"><span className="panel-label">E_t</span><span className="panel-value">Total CLAW issued this Epoch (70% goes to Providers)</span></div>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>
            In addition to CLAW rewards, you receive <strong>97% of every USDC payment</strong> from Users in direct service revenue.
          </p>
        </div>
      </section>

      {/* Cold-start */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Cold-Start Incentive</div>
          <p className="section-text">
            New Providers have no usage history. ClawFarm reserves 20% of each Epoch's issuance as a cold-start pool for Providers who are online but not yet fully utilized. You earn from the moment you're registered and serving — even before significant traffic arrives.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Cold-Start Pool</span><span className="panel-value">20% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Eligibility</span><span className="panel-value">Online Provider with active endpoint</span></div>
            <div className="panel-row"><span className="panel-label">Basis</span><span className="panel-value">Uptime × base weight (with per-Provider cap)</span></div>
            <div className="panel-row"><span className="panel-label">Cap</span><span className="panel-value">Hard limit prevents idle-farming</span></div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Registration Requirements</div>
          <p className="section-text mb-4">To join as a Provider, register the following:</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">public_key</span><span className="panel-value">Your Solana wallet address</span></div>
            <div className="panel-row"><span className="panel-label">endpoint</span><span className="panel-value">Your inference API endpoint (HTTPS)</span></div>
            <div className="panel-row"><span className="panel-label">models</span><span className="panel-value">List of supported model IDs</span></div>
            <div className="panel-row"><span className="panel-label">price</span><span className="panel-value">Your price per AWU (USDC, self-set)</span></div>
            <div className="panel-row"><span className="panel-label">version</span><span className="panel-value">ClawFarm provider interface version</span></div>
          </div>
        </div>
      </section>

      {/* Required interface */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Required Response Format</div>
          <p className="section-text mb-4">Every model call response must include:</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">request_id</span><span className="panel-value">string</span></div>
            <div className="panel-row"><span className="panel-label">awu_used</span><span className="panel-value">decimal — metered work units consumed</span></div>
            <div className="panel-row"><span className="panel-label">token_usage</span><span className="panel-value">integer — input + output tokens</span></div>
            <div className="panel-row"><span className="panel-label">billed_amount</span><span className="panel-value">decimal — USDC billed this call</span></div>
            <div className="panel-row"><span className="panel-label">response_time_ms</span><span className="panel-value">integer — latency in milliseconds</span></div>
            <div className="panel-row"><span className="panel-label">success</span><span className="panel-value">boolean</span></div>
          </div>
        </div>
      </section>

      {/* Treasury rule */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Protocol Tax</div>
          <p className="section-text">
            For every billed call, 3% of the payment is automatically routed to the Treasury. The remaining 97% is yours. The Treasury runs a non-discretionary buyback-and-burn engine — no governance, no human allocation.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Your Revenue</span><span className="panel-value" style={{color:'var(--green)'}}>97% of every payment</span></div>
            <div className="panel-row"><span className="panel-label">Protocol Tax</span><span className="panel-value">3% → Treasury → Buyback & Burn</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/install" className="btn-primary">Register as Provider</Link>
            <Link href="/whitepaper" className="btn-secondary">Read Full Protocol</Link>
            <Link href="/docs" className="btn-secondary">Technical Docs</Link>
            <Link href="/masterpool" className="btn-secondary">View Reward Pool</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
