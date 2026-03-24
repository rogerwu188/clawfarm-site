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
                The truly open AI compute network. Powered by Providers.
              </h1>
              <p className="hero-subtitle">
                Anyone can supply GPU compute, deploy open-source models, or resell third-party APIs as a Provider. Agents route work. Protocol meters consumption. Rewards go to those who actually serve.
              </p>
              <div className="hero-actions">
                <Link href="/install" className="btn-primary">Become a Provider</Link>
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
                  <span className="hero-image-tag">OPEN COMPUTE NETWORK</span>
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
              <div className="flow-step-title">Provide</div>
              <div className="flow-step-desc">Provider registers GPU / model / API endpoint</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">02</div>
              <div className="flow-step-title">Route</div>
              <div className="flow-step-desc">Protocol routes agent requests by price + quality</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">03</div>
              <div className="flow-step-title">Meter</div>
              <div className="flow-step-desc">AWU consumption recorded on-chain</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-step-num">04</div>
              <div className="flow-step-title">Settle</div>
              <div className="flow-step-desc">97% of payment goes to Provider</div>
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

      {/* ========== DATA PANEL ========== */}
      <section className="data-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="data-panel">
            <div className="data-column">
              <div className="data-item"><span className="data-label">Provider Gate</span><span className="data-value">Open — anyone can join</span></div>
              <div className="data-item"><span className="data-label">Provider Types</span><span className="data-value">GPU / Model / API</span></div>
              <div className="data-item"><span className="data-label">Reward Basis</span><span className="data-value">AWU × Price × Quality</span></div>
              <div className="data-item"><span className="data-label">Treasury Asset</span><span className="data-value">USDC</span></div>
              <div className="data-item"><span className="data-label">Settlement Mode</span><span className="data-value data-value-live">Automatic (per Epoch)</span></div>
            </div>
            <div className="data-column">
              <div className="data-item"><span className="data-label">Provider Reward Pool</span><span className="data-value">70% of Epoch issuance</span></div>
              <div className="data-item"><span className="data-label">Cold-Start Incentive</span><span className="data-value">20% for new providers</span></div>
              <div className="data-item"><span className="data-label">User Cashback</span><span className="data-value">10% of Epoch issuance</span></div>
              <div className="data-item"><span className="data-label">Protocol Tax</span><span className="data-value">3% → Treasury</span></div>
              <div className="data-item"><span className="data-label">Verification</span><span className="data-value">Programmatic / On-chain</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHO IS A PROVIDER ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Who Can Be a Provider</div>
          <h2 className="section-title">Anyone with compute or a model can earn.</h2>
          <p className="section-text">
            ClawFarm has no whitelist. No gatekeepers. Any entity that can serve AI inference joins as a Provider and earns CLAW rewards proportional to their real contribution.
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

      {/* ========== PRINCIPLE ========== */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">The Protocol Principle</div>
          <h2 className="section-title">Rewards follow real contribution. Always.</h2>
          <p className="section-text">
            ClawFarm rewards one thing: <strong>objectively measurable contribution</strong>. Every AI Work Unit (AWU) of compute, every verified request, every metered output is recorded and fed into the reward formula. No human decides who gets paid.
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
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'8px 0'}}>
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
            <span className="flow-step">User pays USDC</span>
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
              <p>97% of every payment goes directly to the Provider. Protocol takes 3% only — no platform rent.</p>
            </div>
            <div className="grid-cell">
              <h4>Treasury = Buyback & Burn</h4>
              <p>Non-discretionary engine. No governance. No allocation. 80% of USDC used for buyback every 24h. All bought tokens burned.</p>
            </div>
          </div>
          <p className="section-small">The Treasury has one function: receive 3% tax and programmatically buy back and burn CLAW tokens.</p>
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
            <div className="panel-row"><span className="panel-label">custody model</span><span className="panel-value">program-owned</span></div>
            <div className="panel-row"><span className="panel-label">provider pool</span><span className="panel-value">70% of epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">cold-start pool</span><span className="panel-value">20% of epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">user cashback pool</span><span className="panel-value">10% of epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">reward vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">verification</span><span className="panel-value">objective</span></div>
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
            <Link href="/install" className="btn-primary">Become a Provider</Link>
            <Link href="/whitepaper" className="btn-secondary">WHITEPAPER</Link>
            <Link href="/docs" className="btn-secondary">DOCS</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">GITHUB</a>
            <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener" className="btn-secondary">X</a>
          </div>
          <p style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-dim)', lineHeight:1.6}}>
            This network rewards metered contribution: real usage, competitive price, and verifiable quality.
            No human decides who earns.
          </p>
        </div>
      </section>
    </main>
  )
}
