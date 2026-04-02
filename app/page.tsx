import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="hero-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="hero-grid">
            {/* Left Column */}
            <div className="hero-left">
              <h1 className="hero-title">
                The decentralized AI compute marketplace. Non-custodial. Permissionless.
              </h1>
              <p className="hero-subtitle">
                Deposit USDC into an on-chain escrow. Choose a routing mode — eco, auto, or premium. Consume AI inference from any registered Provider. Your funds stay in the smart contract. The platform never holds your money.
              </p>
              <div className="hero-actions">
                <Link href="/users" className="btn-primary">Start Using AI</Link>
                <Link href="/install" className="btn-secondary">Become a Provider</Link>
                <Link href="/whitepaper" className="btn-secondary">Read Protocol</Link>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="hero-right">
              <div className="hero-image-container">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
                  alt="ClawFarm Network"
                  className="hero-image"
                />
                <div className="hero-image-overlay">
                  <span className="hero-image-tag">DECENTRALIZED AI COMPUTE MARKETPLACE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EXECUTION FLOW ========== */}
      <section className="flow-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="exec-flow">
            <div className="flow-step">
              <div className="flow-step-num">01</div>
              <div className="flow-step-title">Deposit</div>
              <div className="flow-step-desc">User deposits USDC into on-chain escrow contract</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">02</div>
              <div className="flow-step-title">Route</div>
              <div className="flow-step-desc">Open-source engine routes by eco / auto / premium mode</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">03</div>
              <div className="flow-step-title">Verify</div>
              <div className="flow-step-desc">Dual-signature usage proof (user + provider)</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">04</div>
              <div className="flow-step-title">Settle</div>
              <div className="flow-step-desc">Contract auto-settles: 97% Provider, 3% Treasury</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">05</div>
              <div className="flow-step-title">Reward</div>
              <div className="flow-step-desc">CLAW distributed by AWU × Price × Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORE DIFFERENCE ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Why ClawFarm</div>
          <h2 className="section-title">The AI compute layer that belongs to no one.</h2>
          <p className="section-text">
            ClawFarm is a fully decentralized AI compute marketplace. No platform holds your funds. Every USDC sits in a program-owned escrow on Solana. Every settlement is a contract execution. Every Provider payout is an on-chain transfer. No middleman. No custody risk.
          </p>
          <div className="grid-2 mt-10">
            <div className="grid-cell">
              <h4>Non-Custodial</h4>
              <p>Your USDC lives in a Solana escrow contract controlled by a PDA — no human holds the private key. Withdraw anytime.</p>
            </div>
            <div className="grid-cell">
              <h4>Permissionless</h4>
              <p>No whitelist. No approval. Providers register via contract call. Users deposit and start consuming immediately.</p>
            </div>
            <div className="grid-cell">
              <h4>Smart Routing</h4>
              <p>Three modes — eco (cheapest), auto (balanced), premium (best model). Routes by prompt length, tool calls, deep thinking needs.</p>
            </div>
            <div className="grid-cell">
              <h4>Transparent Settlement</h4>
              <p>Every call's Provider, token count, and cost is verifiable on-chain. Dual-signature proofs prevent fabrication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DATA PANEL ========== */}
      <section className="data-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="data-panel">
            <div className="data-column">
              <div className="data-item"><span className="data-label">Fund Custody</span><span className="data-value data-value-live">On-chain Escrow (PDA)</span></div>
              <div className="data-item"><span className="data-label">Provider Gate</span><span className="data-value">Open — anyone can join</span></div>
              <div className="data-item"><span className="data-label">Routing Modes</span><span className="data-value">eco / auto / premium</span></div>
              <div className="data-item"><span className="data-label">Routing Engine</span><span className="data-value">Open-source, client-side</span></div>
              <div className="data-item"><span className="data-label">Settlement</span><span className="data-value data-value-live">Smart Contract (automatic)</span></div>
            </div>
            <div className="data-column">
              <div className="data-item"><span className="data-label">Provider Revenue</span><span className="data-value">97% of payment</span></div>
              <div className="data-item"><span className="data-label">Protocol Tax</span><span className="data-value">3% → Treasury → Buyback & Burn</span></div>
              <div className="data-item"><span className="data-label">Verification</span><span className="data-value">Dual-signature + sampling audit</span></div>
              <div className="data-item"><span className="data-label">Provider Staking</span><span className="data-value">CLAW stake required</span></div>
              <div className="data-item"><span className="data-label">Treasury Asset</span><span className="data-value">USDC</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOR USERS ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">For Users</div>
          <h2 className="section-title">One wallet. All models. Zero platform risk.</h2>
          <p className="section-text">
            Connect your Solana wallet, deposit USDC, and access every Provider on the network. No more signing up with individual API providers. No more managing multiple billing accounts. New Providers join → you get access automatically.
          </p>
          <div className="grid-2 mt-10">
            <div className="grid-cell">
              <h4>eco Mode</h4>
              <p>Lowest cost per token. Ideal for bulk processing, summarization, and non-critical tasks. Automatically routes to the cheapest qualified Provider.</p>
            </div>
            <div className="grid-cell">
              <h4>auto Mode</h4>
              <p>Balanced routing — optimizes across cost, quality, and latency. The default mode for general-purpose AI consumption.</p>
            </div>
            <div className="grid-cell">
              <h4>premium Mode</h4>
              <p>Routes to the highest-tier model available. For complex reasoning, code generation, and deep thinking tasks.</p>
            </div>
            <div className="grid-cell">
              <h4>Instant Access to New Providers</h4>
              <p>When a new Provider registers — cheaper, faster, or with a new model — your next request can route to them. No config needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOR PROVIDERS ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">For Providers</div>
          <h2 className="section-title">Anyone with compute or a model can earn.</h2>
          <p className="section-text">
            Register on-chain with a model endpoint, a price table, and a CLAW stake. No payment infrastructure needed — ClawFarm settles directly from user escrow to your wallet. Focus on serving inference, not building billing systems.
          </p>
          <div className="grid-2 mt-10">
            <div className="grid-cell">
              <h4>GPU Node Operators</h4>
              <p>Run your own hardware. Deploy open-source models (LLaMA, Mistral, Qwen, etc.). Sell compute as CLAW-rewarded AI capacity.</p>
            </div>
            <div className="grid-cell">
              <h4>Cloud GPU Providers</h4>
              <p>Wrap cloud GPU capacity (Lambda, RunPod, CoreWeave) into a registered Provider endpoint and route traffic through the protocol.</p>
            </div>
            <div className="grid-cell">
              <h4>Third-Party API Resellers</h4>
              <p>Proxy OpenAI, Anthropic, Gemini or any model API through a registered ClawFarm endpoint. Earn rewards for every verified request.</p>
            </div>
            <div className="grid-cell">
              <h4>Self-Deployed Model Services</h4>
              <p>Fine-tuned models, domain-specific inference, custom runtimes — if it serves tokens, it counts toward your AWU and earns rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VERIFICATION ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Verification</div>
          <h2 className="section-title">Four layers. No trust required.</h2>
          <p className="section-text">
            ClawFarm uses a hybrid verification model that makes cheating economically irrational without requiring expensive on-chain computation for every request.
          </p>
          <div className="grid-2 mt-10">
            <div className="grid-cell">
              <h4>Layer 1: Client-Side Token Counting</h4>
              <p>Input tokens computed deterministically by open-source tokenizer. Output tokens counted during streaming. No reliance on Provider's count.</p>
            </div>
            <div className="grid-cell">
              <h4>Layer 2: Dual Signature</h4>
              <p>Both user SDK and Provider sign the usage proof. Neither party can unilaterally fabricate usage. Mismatch → no settlement.</p>
            </div>
            <div className="grid-cell">
              <h4>Layer 3: Sampling Audit</h4>
              <p>Random N% of requests re-executed on a different Provider. Token count compared. Deviation beyond threshold triggers dispute.</p>
            </div>
            <div className="grid-cell">
              <h4>Layer 4: Stake Slashing</h4>
              <p>Disputes resolved by on-chain evidence. Guilty Provider's CLAW stake gets slashed. 7-day unstaking period ensures pending disputes resolve first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROTOCOL PRINCIPLE ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">The Protocol Principle</div>
          <h2 className="section-title">Rewards follow real contribution. Always.</h2>
          <p className="section-text">
            ClawFarm rewards one thing: <strong>objectively measurable contribution</strong>. Every AI Work Unit (AWU), every verified request, every metered output is recorded and fed into the reward formula. No human decides who gets paid.
          </p>
          <div className="grid-2 mt-10">
            <div className="grid-cell">
              <h4>What is rewarded</h4>
              <p>AWU consumption, competitive pricing, and service quality (success rate, latency, uptime) — things the protocol can verify without human judgment.</p>
            </div>
            <div className="grid-cell">
              <h4>What is NOT rewarded</h4>
              <p>Subjective quality scores, outcome claims, or human endorsements — these require centralization and introduce manipulation risk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REWARD FORMULA ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Reward Formula</div>
          <h2 className="section-title">Open formula. No discretion.</h2>
          <div className="panel" style={{maxWidth:'520px', marginTop:'24px'}}>
            <div className="panel-header">
              <span className="panel-tag">Provider Weight</span>
            </div>
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'8px 22px'}}>
{`W_i = AWU_i × (P_avg / P_i) × Q_i

Reward_i = E_t × W_i / ΣW`}
            </pre>
            <div className="panel-row"><span className="panel-label">AWU_i</span><span className="panel-value">AI Work Units (true usage)</span></div>
            <div className="panel-row"><span className="panel-label">P_avg / P_i</span><span className="panel-value">Price factor (cheaper = higher weight)</span></div>
            <div className="panel-row"><span className="panel-label">Q_i</span><span className="panel-value">Quality factor (success rate × latency × uptime)</span></div>
            <div className="panel-row"><span className="panel-label">E_t</span><span className="panel-value">Epoch CLAW issuance pool</span></div>
          </div>
        </div>
      </section>

      {/* ========== ECONOMICS ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Economics</div>
          <h2 className="section-title">Funded by real usage. Burned by protocol.</h2>
          <div className="flow" style={{marginBottom:'32px'}}>
            <span className="flow-step">User Escrow</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">97% to Provider</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">3% to Treasury</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">Auto Buyback</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">CLAW Burned</span>
          </div>
          <div className="grid-2">
            <div className="grid-cell">
              <h4>Provider Revenue</h4>
              <p>97% of every payment goes directly to the Provider wallet via smart contract. No platform intermediary. No payment processing delay.</p>
            </div>
            <div className="grid-cell">
              <h4>Treasury = Buyback & Burn</h4>
              <p>Non-discretionary engine. No governance. No allocation. 80% of USDC used for buyback every 24h. All bought tokens burned.</p>
            </div>
          </div>
          <p className="section-small">The Treasury has one function: receive 3% tax and programmatically buy back and burn CLAW tokens.</p>
        </div>
      </section>

      {/* ========== COMPARISON ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">vs. Centralized Aggregators</div>
          <h2 className="section-title">What makes ClawFarm different.</h2>
          <div className="panel mt-6">
            <div className="panel-row"><span className="panel-label">Fund Custody</span><span className="panel-value">Smart contract escrow (not platform)</span></div>
            <div className="panel-row"><span className="panel-label">Provider Registration</span><span className="panel-value">Permissionless on-chain (not approval)</span></div>
            <div className="panel-row"><span className="panel-label">Revenue Split</span><span className="panel-value">97/3 enforced by contract (not opaque)</span></div>
            <div className="panel-row"><span className="panel-label">Routing Engine</span><span className="panel-value">Open-source, client-side (not closed)</span></div>
            <div className="panel-row"><span className="panel-label">Settlement</span><span className="panel-value">On-chain, verifiable (not off-chain)</span></div>
            <div className="panel-row"><span className="panel-label">Token Counting</span><span className="panel-value">Dual-sign + client verify (not trust platform)</span></div>
            <div className="panel-row"><span className="panel-label">Price Discovery</span><span className="panel-value">Provider-set, on-chain (not platform-set)</span></div>
            <div className="panel-row"><span className="panel-label">Governance</span><span className="panel-value">No governance — code is law</span></div>
          </div>
        </div>
      </section>

      {/* ========== MASTER POOL ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Master Pool</div>
          <h2 className="section-title">Program-controlled vault.</h2>
          <div className="panel" style={{maxWidth:'420px'}}>
            <div className="panel-header">
              <span className="panel-tag">Vault</span>
              <span className="panel-live"><span className="state-dot" /> LIVE</span>
            </div>
            <div className="panel-row"><span className="panel-label">vault status</span><span className="panel-value">deployed</span></div>
            <div className="panel-row"><span className="panel-label">custody model</span><span className="panel-value">program-owned (PDA)</span></div>
            <div className="panel-row"><span className="panel-label">provider pool</span><span className="panel-value">70% of epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">cold-start pool</span><span className="panel-value">20% of epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">user cashback pool</span><span className="panel-value">10% of epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">reward vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">verification</span><span className="panel-value">dual-signature + sampling</span></div>
          </div>
          <div className="mt-6">
            <Link href="/masterpool" className="btn-secondary">INSPECT POOL</Link>
          </div>
        </div>
      </section>

      {/* ========== LINKS ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/users" className="btn-primary">Start Using AI</Link>
            <Link href="/install" className="btn-primary">Become a Provider</Link>
            <Link href="/whitepaper" className="btn-secondary">WHITEPAPER</Link>
            <Link href="/docs" className="btn-secondary">DOCS</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GITHUB</a>
            <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener" className="btn-secondary">X</a>
          </div>
          <p style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-dim)', lineHeight:1.6}}>
            Decentralized AI compute marketplace. Non-custodial escrow. Permissionless providers. On-chain settlement.
            No human decides who earns. No platform holds your funds.
          </p>
        </div>
      </section>
    </main>
  )
}
