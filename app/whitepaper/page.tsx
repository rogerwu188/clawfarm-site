import Link from 'next/link'

export const metadata = { title: 'Whitepaper — ClawFarm', description: 'Open AI Compute Network — Decentralized Economic Model v1' }

export default function Whitepaper() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Protocol Definition</span></span>
          <span>Version: <span className="text-[#8a8f98]">Genesis v1.1</span></span>
        </div>
      </div>

      {/* Abstract */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">ClawFarm Whitepaper</h1>
          <p className="section-text" style={{fontSize:'18px', marginTop:'8px'}}>
            Open AI Compute Network — Decentralized Economic Model
          </p>
          <p className="section-text" style={{marginTop:'24px', color:'var(--green)'}}>
            Genesis v1.1
          </p>
        </div>
      </section>

      {/* Abstract */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Abstract</div>
          <p className="section-text">
            ClawFarm is a fully open, fully transparent, fully decentralized AI compute and model supply-demand network. Any person can act as a Provider — deploying GPU hardware, self-hosted open-source models, or third-party API endpoints. Any agent, user, or application can call these capabilities through the ClawFarm routing layer.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            The protocol's economic design is anchored in five principles: open supply, open demand, transparent rewards, on-chain verifiability, and zero human intervention in reward outcomes. Token rewards are computed automatically per Epoch using a public formula based on real consumption, competitive pricing, and service quality.
          </p>
          <p className="section-text" style={{marginTop:'24px', borderLeft:'3px solid var(--green)', paddingLeft:'16px', fontStyle:'italic'}}>
            <strong>Central Claim:</strong> Provider rewards must be derived entirely from objectively verifiable on-chain signals — real usage (AWU), price competitiveness, and service quality. No human allocation. No whitelist. No discretion.
          </p>
        </div>
      </section>

      {/* 1. Introduction */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">1. Introduction</div>
          <p className="section-text">
            AI inference is becoming an economic commodity. As autonomous agents proliferate, the demand for compute, models, and API capacity will grow at network scale. Today's supply of AI compute is controlled by a small number of centralized providers. Access is gated, pricing is opaque, and reward mechanisms for infrastructure operators are non-existent.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            ClawFarm changes this. The protocol opens the supply side to anyone who can serve inference: independent GPU operators, cloud node runners, open-source model deployers, and API resellers all compete on equal footing under the same public reward formula.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            This creates a new economic layer: a permissionless AI compute market where supply is incentivized by protocol token rewards and demand is satisfied by transparent, programmatic routing.
          </p>
        </div>
      </section>

      {/* 2. Roles */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">2. Role Definitions</div>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-6 mb-3">2.1 User</h3>
          <p className="section-text">Any agent, application, or person that calls AI services through ClawFarm.</p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>Pays in USDC / stablecoin</li>
            <li>Receives AI service output</li>
            <li>Receives a small CLAW cashback reward proportional to spend</li>
          </ul>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">2.2 Provider</h3>
          <p className="section-text">Any entity that supplies AI model capacity, inference compute, or API access to the network. Providers are the miners of the ClawFarm network.</p>
          <div className="grid-2 mt-4">
            <div className="grid-cell">
              <h4>Accepted Provider Types</h4>
              <ul style={{fontSize:'13px', color:'var(--text-mid)', paddingLeft:'16px', lineHeight:'1.8', marginTop:'8px'}}>
                <li>• Local GPU node (consumer or datacenter)</li>
                <li>• Cloud GPU instance (Lambda, RunPod, CoreWeave…)</li>
                <li>• Third-party API proxy (OpenAI, Anthropic, Gemini…)</li>
                <li>• Self-deployed model service (LLaMA, Mistral, Qwen…)</li>
              </ul>
            </div>
            <div className="grid-cell">
              <h4>Provider Earns</h4>
              <ul style={{fontSize:'13px', color:'var(--text-mid)', paddingLeft:'16px', lineHeight:'1.8', marginTop:'8px'}}>
                <li>• 97% of user payment (service revenue)</li>
                <li>• CLAW token rewards per Epoch (protocol issuance)</li>
                <li>• Cold-start incentive during ramp-up (first Epochs)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">2.3 Protocol</h3>
          <p className="section-text">The protocol itself performs only three functions:</p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>Record all verified calls</li>
            <li>Compute rewards by public formula</li>
            <li>Extract 3% protocol tax into Treasury</li>
          </ul>
          <p className="section-text" style={{marginTop:'12px', borderLeft:'3px solid var(--green)', paddingLeft:'16px'}}>
            The protocol never manually allocates rewards. No admin override. No whitelist approval.
          </p>
        </div>
      </section>

      {/* 3. Capital Flow */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">3. Capital Flow</div>
          <p className="section-text">Every time a User calls an AI service:</p>
          <div className="panel mt-4">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'8px 0'}}>
{`Payment (USDC)
  └─ 97%  → Provider (service revenue)
  └─  3%  → Treasury (protocol tax)`}
            </pre>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>Provider revenue is settled immediately per call. Protocol tax accumulates in Treasury and triggers the buyback engine every 24 hours.</p>
        </div>
      </section>

      {/* 4. AWU Standard */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">4. AI Work Unit (AWU)</div>
          <p className="section-text">
            Providers differ in hardware, model size, and service type. To compute rewards fairly across heterogeneous supply, ClawFarm normalizes all work into a single unit: the <strong>AI Work Unit (AWU)</strong>.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Definition</span><span className="panel-value">Standardized inference workload unit</span></div>
            <div className="panel-row"><span className="panel-label">Reference</span><span className="panel-value">1000 normalized output tokens</span></div>
            <div className="panel-row"><span className="panel-label">Alternatively</span><span className="panel-value">1 second effective inference on reference GPU</span></div>
            <div className="panel-row"><span className="panel-label">Scope</span><span className="panel-value">All provider types (GPU / model / API)</span></div>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>
            The AWU conversion table for each supported model and provider type is published in protocol parameters and is immutable between Epoch upgrades.
          </p>
        </div>
      </section>

      {/* 5. Reward Formula */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">5. Provider Reward Formula</div>
          <p className="section-text">
            Each Epoch, the protocol releases a fixed CLAW reward pool <code style={{fontFamily:'var(--font-mono)', fontSize:'13px'}}>E_t</code>. Each Provider receives a share proportional to their <strong>weighted contribution</strong>.
          </p>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">5.1 Provider Weight</h3>
          <div className="panel mt-2">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2, padding:'8px 0'}}>
{`W_i = AWU_i × (P_avg / P_i) × Q_i`}
            </pre>
            <div className="panel-row"><span className="panel-label">AWU_i</span><span className="panel-value">Total AI Work Units delivered by Provider i</span></div>
            <div className="panel-row"><span className="panel-label">P_avg / P_i</span><span className="panel-value">Price factor — cheaper than average = higher weight</span></div>
            <div className="panel-row"><span className="panel-label">Q_i</span><span className="panel-value">Quality factor ∈ [0, 1]</span></div>
          </div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">5.2 Provider Reward</h3>
          <div className="panel mt-2">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2, padding:'8px 0'}}>
{`Reward_i = E_t × W_i / ΣW`}
            </pre>
          </div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">5.3 Quality Factor</h3>
          <div className="panel mt-2">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'8px 0'}}>
{`Q_i = SuccessRate_i × LatencyScore_i × UptimeScore_i`}
            </pre>
            <div className="panel-row"><span className="panel-label">SuccessRate</span><span className="panel-value">Successful responses / total requests</span></div>
            <div className="panel-row"><span className="panel-label">LatencyScore</span><span className="panel-value">Normalized score vs. network median latency</span></div>
            <div className="panel-row"><span className="panel-label">UptimeScore</span><span className="panel-value">Online time / Epoch duration</span></div>
          </div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">5.4 What the Formula Enforces</h3>
          <div className="grid-2 mt-4">
            <div className="grid-cell">
              <h4>More real usage → more reward</h4>
              <p>Higher AWU_i means more genuine contribution. Fake calls require real payment — making self-gaming economically irrational.</p>
            </div>
            <div className="grid-cell">
              <h4>Lower price → more reward</h4>
              <p>P_avg / P_i rewards competitive pricing. Providers who undercut the average gain higher weight — driving down costs for Users.</p>
            </div>
            <div className="grid-cell">
              <h4>Higher quality → more reward</h4>
              <p>Q_i punishes failures, slow responses, and downtime. Bad actors accumulate low Q scores and are automatically deprioritized.</p>
            </div>
            <div className="grid-cell">
              <h4>Gaming is self-defeating</h4>
              <p>Ultra-low price with low quality gives W_i ≈ 0. Self-faking usage requires paying real USDC. All three factors must coexist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reward Distribution */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">6. Epoch Reward Distribution</div>
          <p className="section-text">Each Epoch issuance pool <code style={{fontFamily:'var(--font-mono)', fontSize:'13px'}}>E_t</code> is split as follows:</p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Provider Pool</span><span className="panel-value" style={{color:'var(--green)'}}>70% — weighted by W_i</span></div>
            <div className="panel-row"><span className="panel-label">Cold-Start Pool</span><span className="panel-value">20% — new / under-utilized Providers</span></div>
            <div className="panel-row"><span className="panel-label">User Cashback Pool</span><span className="panel-value">10% — proportional to Payment</span></div>
          </div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">6.1 Cold-Start Incentive</h3>
          <p className="section-text">
            New Providers have no AWU history. Without a separate incentive, new nodes can never overcome early network effects. The Cold-Start Pool distributes 20% of issuance to Providers who are online but under-utilized, proportional to uptime, with a per-Provider cap to prevent idle farming.
          </p>
          <div className="panel mt-4">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'8px 0'}}>
{`IdleReward_i = OnlineHours_i × BaseWeight × Cap`}
            </pre>
            <div className="panel-row"><span className="panel-label">Cap</span><span className="panel-value">Hard limit per Provider per Epoch</span></div>
            <div className="panel-row"><span className="panel-label">Pool cap</span><span className="panel-value">20% of E_t — cannot be exceeded</span></div>
          </div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">6.2 User Cashback</h3>
          <div className="panel mt-2">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'8px 0'}}>
{`UserReward = Payment × γ`}
            </pre>
            <div className="panel-row"><span className="panel-label">γ</span><span className="panel-value">Fixed cashback rate (3%–10% CLAW equivalent)</span></div>
            <div className="panel-row"><span className="panel-label">Principle</span><span className="panel-value">Demand is not scarce early — supply is. User reward is secondary.</span></div>
          </div>
        </div>
      </section>

      {/* 7. Treasury */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">7. Treasury = Non-Discretionary Buyback & Burn Engine</div>
          <p className="section-text" style={{marginTop:'16px'}}>
            The Treasury is a <strong>non-discretionary TWAP-adaptive buyback-and-burn engine</strong>. It has no governance, no allocation committee, and no human-controlled spending. Its only function is to receive 3% protocol tax and programmatically buy back and burn CLAW tokens.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Treasury Tax</span><span className="panel-value">3% of every payment</span></div>
            <div className="panel-row"><span className="panel-label">Revenue Asset</span><span className="panel-value">USDC</span></div>
            <div className="panel-row"><span className="panel-label">Buyback Cycle</span><span className="panel-value">Every 24 hours</span></div>
            <div className="panel-row"><span className="panel-label">Bear (&lt;-10% TWAP)</span><span className="panel-value">150% buyback</span></div>
            <div className="panel-row"><span className="panel-label">Normal (±10%)</span><span className="panel-value">80% buyback</span></div>
            <div className="panel-row"><span className="panel-label">Bull (&gt;+10% TWAP)</span><span className="panel-value">50% buyback</span></div>
            <div className="panel-row"><span className="panel-label">Burn</span><span className="panel-value">All bought tokens → burn address immediately</span></div>
            <div className="panel-row"><span className="panel-label">Governance</span><span className="panel-value" style={{color:'var(--red)'}}>NONE</span></div>
          </div>
        </div>
      </section>

      {/* 8. Anti-Gaming */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">8. Anti-Gaming Requirements</div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-2">8.1 Self-Flooding (Fake Usage)</h3>
          <p className="section-text">A Provider acting as its own User to inflate AWU.</p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>All calls require real USDC payment — self-gaming has direct cost</li>
            <li>Minimum payment thresholds applied per call</li>
            <li>Circular address patterns flagged and excluded from settlement</li>
          </ul>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-2">8.2 Phantom Service (Accept but Not Execute)</h3>
          <p className="section-text">A Provider accepting requests but returning empty or fake responses.</p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>Failed requests are not counted toward AWU</li>
            <li>Repeated failures degrade Q_i toward 0</li>
            <li>Random spot-verification sampling enforced by Gateway</li>
          </ul>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-2">8.3 Predatory Low Price (Race to Bottom)</h3>
          <p className="section-text">A Provider setting extreme low prices to capture weight while delivering poor service.</p>
          <ul className="section-text" style={{marginTop:'8px', marginLeft:'20px', listStyleType:'disc'}}>
            <li>Price factor alone cannot determine reward — must be multiplied by Q_i</li>
            <li>Low price + low quality → W_i ≈ 0</li>
            <li>The formula naturally self-corrects against this attack</li>
          </ul>
        </div>
      </section>

      {/* 9. Decentralization Requirements */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">9. Decentralization Guarantees</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>No manual reward override</h4>
              <p>Reward outcomes are computed only by formula. No admin key, no special allocation, no human discretion.</p>
            </div>
            <div className="grid-cell">
              <h4>No whitelist</h4>
              <p>Any Provider meeting interface standards can join. Protocol cannot exclude a compliant Provider.</p>
            </div>
            <div className="grid-cell">
              <h4>No centralized pricing</h4>
              <p>Each Provider sets their own price. The routing layer selects by market signal, not admin preference.</p>
            </div>
            <div className="grid-cell">
              <h4>No subjective scoring</h4>
              <p>Quality comes only from: success rate, latency, uptime. All three are machine-verifiable without human judgment.</p>
            </div>
            <div className="grid-cell">
              <h4>All parameters public</h4>
              <p>Tax rate, epoch duration, AWU standard, PriceFactor formula, QualityFactor formula — all published in protocol config.</p>
            </div>
            <div className="grid-cell">
              <h4>On-chain audit trail</h4>
              <p>Every billing event, reward calculation, treasury inflow, and buyback transaction is verifiable on-chain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Monetary Issuance */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">10. Monetary Issuance</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Total Supply</span><span className="panel-value">1,000,000,000 CLAW</span></div>
            <div className="panel-row"><span className="panel-label">Release Horizon</span><span className="panel-value">10 years</span></div>
            <div className="panel-row"><span className="panel-label">Halving</span><span className="panel-value">Every 2 years</span></div>
            <div className="panel-row"><span className="panel-label">Settlement Epoch</span><span className="panel-value">Configurable (default: 1 hour)</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
          </div>
        </div>
      </section>

      {/* 11. V1 Implementation Modules */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">11. V1 Implementation Modules</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>Module 1: Provider Registry</h4>
              <p>Register public key, endpoint, supported models, and pricing. Open to any compliant provider.</p>
            </div>
            <div className="grid-cell">
              <h4>Module 2: Request Router</h4>
              <p>Routes incoming requests to best Provider by price × quality signal. Records every call.</p>
            </div>
            <div className="grid-cell">
              <h4>Module 3: Call Ledger</h4>
              <p>Records: provider_id, user_id, model_id, payment, awu_used, response_time, success_flag, timestamp.</p>
            </div>
            <div className="grid-cell">
              <h4>Module 4: Epoch Settlement</h4>
              <p>Per epoch: compute P_avg, W_i for all Providers, distribute 70% / 20% / 10% reward pools, settle User cashback.</p>
            </div>
            <div className="grid-cell">
              <h4>Module 5: Treasury Engine</h4>
              <p>Collects 3% tax. Runs 24h buyback cycle. Burns all purchased CLAW. Logs everything on-chain.</p>
            </div>
            <div className="grid-cell">
              <h4>Module 6: Anti-Gaming Monitor</h4>
              <p>Detects circular payments, phantom service, quality degradation. Excludes ineligible calls from settlement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Conclusion</div>
          <p className="section-text">
            ClawFarm is a permissionless AI compute marketplace governed entirely by protocol. Providers compete on price and quality. Rewards are allocated by formula, not committee. Every USDC of protocol tax flows to a buyback engine that burns supply. No human approves, allocates, or intervenes.
          </p>
          <p className="section-text" style={{marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'13px', borderLeft:'3px solid var(--green)', paddingLeft:'16px'}}>
            Users pay stablecoin to call AI.<br/>
            Providers deliver the service and earn revenue + CLAW.<br/>
            Protocol auto-extracts 3% and burns CLAW.<br/>
            No one decides the reward. The formula does.
          </p>
        </div>
      </section>

      {/* Appendix */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Appendix A. Genesis Parameters</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Chain</span><span className="panel-value">Solana</span></div>
            <div className="panel-row"><span className="panel-label">Protocol Tax</span><span className="panel-value">3% of payment</span></div>
            <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">97% of payment</span></div>
            <div className="panel-row"><span className="panel-label">Provider Pool</span><span className="panel-value">70% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Cold-Start Pool</span><span className="panel-value">20% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">User Cashback Pool</span><span className="panel-value">10% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">Treasury</span><span className="panel-value">Buyback & Burn Engine (24h cycle)</span></div>
            <div className="panel-row"><span className="panel-label">Total Supply</span><span className="panel-value">1,000,000,000 CLAW</span></div>
            <div className="panel-row"><span className="panel-label">Halving</span><span className="panel-value">Every 2 years</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
