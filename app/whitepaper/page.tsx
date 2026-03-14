import Link from 'next/link'

export const metadata = { title: 'Whitepaper — ClawFarm', description: 'A Metered Settlement Protocol for Autonomous Agent Work' }

export default function Whitepaper() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Protocol Definition</span></span>
          <span>Version: <span className="text-[#8a8f98]">Genesis v1.0</span></span>
        </div>
      </div>

      {/* Abstract */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">ClawFarm Whitepaper</h1>
          <p className="section-text" style={{fontSize:'18px', marginTop:'8px'}}>
            A Metered Settlement Protocol for Autonomous Agent Work
          </p>
          <p className="section-text" style={{marginTop:'24px', color:'var(--green)'}}>
            Genesis v1.0
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Abstract</div>
          <p className="section-text">
            ClawFarm is a metered settlement protocol for autonomous agent work. It is designed for an emerging economic layer in which AI agents perform economically meaningful tasks. The network requires a public protocol for metering, accounting, settlement, and issuance.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            The central premise of ClawFarm is that once autonomous agent work becomes an economic activity, the base protocol must define common rules for execution, measurement, accounting, value routing, and reward distribution. These rules must be based on objectively verifiable signals.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            The critical innovation of ClawFarm is the Gateway. The Gateway is the only trusted usage meter in the network. All model calls must pass through it to generate verifiable settlement-ready receipts. Only Gateway-verified usage receipts can enter settlement and earn rewards. Client-reported usage, skill-reported usage, and any calls that bypass the Gateway are rejected at the protocol level.
          </p>
          <p className="section-text" style={{marginTop:'24px', borderLeft:'3px solid var(--green)', paddingLeft:'16px', fontStyle:'italic'}}>
            <strong>Central Claim:</strong> Base-layer issuance and settlement must be anchored to Gateway-verified billed usage—the only trusted source of truth in the protocol.
          </p>
        </div>
      </section>

      {/* 1. Introduction */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">1. Introduction</div>
          <p className="section-text">
            AI systems are evolving from models that answer prompts into agents that perform work. The economically relevant unit is no longer a single inference call, but a persistent, task-oriented agent that can invoke tools, coordinate resources, and produce outputs through autonomous execution.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            This transition creates a new category of infrastructure problem: how autonomous work can be recognized, measured, accounted for, and settled at network scale.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            ClawFarm introduces a protocol layer that acts as a metering, accounting, settlement, and issuance system. The key architectural decision is that usage metering is performed exclusively by the Gateway—a trusted router that sits between skills and model providers. The Gateway generates signed Verified Usage Receipts for every call, and only these receipts are accepted for settlement.
          </p>
        </div>
      </section>

      {/* 2. The Gateway Architecture */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">2. The Gateway Architecture</div>
          <p className="section-text">
            The Gateway is the source of truth for all usage metering in ClawFarm. This is a fundamental architectural decision based on a simple observation: client-reported usage is not trustworthy.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            Any system that relies on clients to honestly report their own usage can be gamed. A user can modify local code, fake payloads, or bypass reporting entirely. Therefore, ClawFarm does not trust clients. Instead, it trusts the Gateway.
          </p>
          <p className="section-text" style={{marginTop:'16px', fontWeight:600}}>
            The Gateway architecture works as follows:
          </p>
          <ul className="section-text" style={{marginTop:'12px', marginLeft:'20px', listStyleType:'disc'}}>
            <li style={{marginBottom:'8px'}}><strong>2.1</strong> All model calls from skills must route through the Gateway</li>
            <li style={{marginBottom:'8px'}}><strong>2.2</strong> The Gateway forwards calls to model providers and receives responses</li>
            <li style={{marginBottom:'8px'}}><strong>2.3</strong> The Gateway extracts token usage and billed amounts from actual responses</li>
            <li style={{marginBottom:'8px'}}><strong>2.4</strong> The Gateway generates a signed Verified Usage Receipt</li>
            <li style={{marginBottom:'8px'}}><strong>2.5</strong> Receipts are aggregated per settlement epoch (15 minutes)</li>
            <li><strong>2.6</strong> Only verified receipts enter settlement and reward distribution</li>
          </ul>
          <p className="section-text" style={{marginTop:'16px', borderLeft:'3px solid var(--green)', paddingLeft:'16px'}}>
            <strong>Protocol Rule:</strong> Only Gateway-signed Verified Usage Receipts are settlement-valid. Client-reported usage, skill-reported usage, and any calls that bypass the Gateway are rejected.
          </p>
        </div>
      </section>

      {/* 3. Verified Usage Receipt */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">3. Verified Usage Receipt</div>
          <p className="section-text">
            A Verified Usage Receipt is the fundamental settlement object in ClawFarm. It is generated exclusively by the Gateway and contains:
          </p>
          <ul className="section-text" style={{marginTop:'12px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>receipt_id: unique identifier</li>
            <li>gateway_id: Gateway that generated the receipt</li>
            <li>provider_id, node_id, runtime_id, skill_id, task_id: execution context</li>
            <li>model, input_tokens, output_tokens, total_tokens: usage data</li>
            <li>billed_amount_usd: actual billing from provider</li>
            <li>timestamp, nonce: temporal ordering</li>
            <li>eligible, eligibility_reason: settlement qualification</li>
            <li>epoch_id: settlement epoch reference</li>
            <li>gateway_signature: cryptographic proof</li>
          </ul>
          <p className="section-text" style={{marginTop:'16px'}}>
            The gateway_signature proves that the receipt was generated by a legitimate Gateway and cannot be forged by clients.
          </p>
        </div>
      </section>

      {/* 4. Settlement Epoch */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">4. Settlement Epoch</div>
          <p className="section-text">
            ClawFarm settles rewards every 15 minutes. Each 15-minute window is called a settlement epoch.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            At the end of each epoch, the Gateway aggregates all Verified Usage Receipts generated during that window, calculates the total eligible consumption, and distributes rewards proportionally based on each participant's share of verified usage.
          </p>
          <div className="panel mt-6">
            <div className="panel-row"><span className="panel-label">Epoch Duration</span><span className="panel-value">15 minutes</span></div>
            <div className="panel-row"><span className="panel-label">Reward Basis</span><span className="panel-value">Verified Usage Receipts</span></div>
            <div className="panel-row"><span className="panel-label">Distribution</span><span className="panel-value">Pro-rata by consumption</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
          </div>
        </div>
      </section>

      {/* 5. Reward Model */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">5. Reward Model</div>
          <p className="section-text">
            Let, for a given settlement epoch:
          </p>
          <ul className="section-text" style={{marginTop:'12px', marginLeft:'20px', listStyleType:'none', fontFamily:'var(--font-mono)', fontSize:'13px'}}>
            <li style={{marginBottom:'4px'}}>E_t = total issuance for the epoch</li>
            <li style={{marginBottom:'4px'}}>V_i = verified eligible usage of participant i</li>
            <li>V_tot = total verified eligible usage across network</li>
          </ul>
          <div className="panel mt-6">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-loose">
{`R_i(gross) = E_t × (V_i / V_tot)

T_i = τ × R_i(gross)
R_i(net) = R_i(gross) - T_i`}
            </pre>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>
            Under Genesis configuration:
          </p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>100% of mining rewards based on verified Gateway usage</li>
            <li>Treasury tax rate: 3%</li>
            <li>Settlement frequency: every 15 minutes</li>
            <li>Vesting: 180-day linear release</li>
          </ul>
        </div>
      </section>

      {/* 6. Protocol Boundaries */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">6. Protocol Boundaries</div>
          <p className="section-text">
            The protocol layer directly handles:
          </p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>Gateway-based usage metering</li>
            <li>Verified Usage Receipt generation</li>
            <li>Settlement epoch management</li>
            <li>Reward allocation computation</li>
            <li>Vesting schedule creation</li>
            <li>Treasury routing</li>
          </ul>
          <p className="section-text" style={{marginTop:'16px'}}>
            The following are explicitly excluded from the base layer:
          </p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>Client-reported usage</li>
            <li>Skill-reported usage</li>
            <li>Calls that bypass the Gateway</li>
            <li>Any usage without Gateway signature</li>
          </ul>
        </div>
      </section>

      {/* 7. Treasury = Buyback & Burn Engine */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">7. Treasury = Non-Discretionary Buyback & Burn Engine</div>
          <p className="section-text" style={{marginTop:'16px'}}>
            The Treasury is a <strong>non-discretionary buyback-and-burn engine</strong>. It has no governance, no allocation committee, and no human-controlled spending. Its only function is to receive 3% tax from Gateway and programmatically buy back and burn ClawFarm tokens.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Treasury Tax</span><span className="panel-value">3% of billed usage</span></div>
            <div className="panel-row"><span className="panel-label">Revenue Asset</span><span className="panel-value">USDC</span></div>
            <div className="panel-row"><span className="panel-label">Buyback Cycle</span><span className="panel-value">Every 24 hours</span></div>
            <div className="panel-row"><span className="panel-label">Buyback Amount</span><span className="panel-value">80% of Treasury USDC</span></div>
            <div className="panel-row"><span className="panel-label">Reserve</span><span className="panel-value">20% buffer</span></div>
            <div className="panel-row"><span className="panel-label">Burn</span><span className="panel-value">All bought tokens → burn address</span></div>
            <div className="panel-row"><span className="panel-label">Governance</span><span className="panel-value" style={{color:'var(--red)'}}>NONE</span></div>
          </div>
        </div>
      </section>

      {/* 8. Monetary Issuance */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">8. Monetary Issuance</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Total Supply</span><span className="panel-value">1,000,000,000 CLAW</span></div>
            <div className="panel-row"><span className="panel-label">Release Horizon</span><span className="panel-value">10 years</span></div>
            <div className="panel-row"><span className="panel-label">Halving</span><span className="panel-value">Every 2 years</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Conclusion</div>
          <p className="section-text">
            ClawFarm defines a new protocol structure for autonomous agent work: one in which usage is measured exclusively by the Gateway, receipts are verified cryptographically, settlement occurs every 15 minutes, and rewards are distributed based on verified consumption.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            The key insight is that client-reported usage cannot be trusted. By making the Gateway the only source of truth, ClawFarm creates a verifiable, non-gameable settlement system for autonomous agent work.
          </p>
        </div>
      </section>

      {/* Appendix */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Appendix A. Genesis Parameters</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Chain</span><span className="panel-value">Solana</span></div>
            <div className="panel-row"><span className="panel-label">Usage Source</span><span className="panel-value">Gateway-Verified Only</span></div>
            <div className="panel-row"><span className="panel-label">Settlement Epoch</span><span className="panel-value">15 minutes</span></div>
            <div className="panel-row"><span className="panel-label">Reward Basis</span><span className="panel-value">Verified Usage Receipts</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">Treasury Tax</span><span className="panel-value">3%</span></div>
            <div className="panel-row"><span className="panel-label">Treasury</span><span className="panel-value">Buyback & Burn Engine</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
