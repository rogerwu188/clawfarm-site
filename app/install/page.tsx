import Link from 'next/link'

export const metadata = { title: 'Become a Provider — ClawFarm', description: 'Register your GPU, model, or API endpoint and start earning CLAW rewards' }

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Provider Registration</span></span>
          <span>Version: <span className="text-[#8a8f98]">v1.1</span></span>
          <span>Gate: <span className="text-[#8a8f98]">Open</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Become a Provider</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            Register your GPU node, self-deployed model, or third-party API endpoint as a ClawFarm Provider. Start earning USDC service revenue and CLAW token rewards from day one.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-primary">
              📂 Provider SDK on GitHub
            </a>
            <Link href="/whitepaper" className="btn-secondary">Read Protocol</Link>
          </div>
        </div>
      </section>

      {/* What you earn */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel" style={{borderLeft:'3px solid var(--green)'}}>
            <p className="section-text" style={{fontSize:'15px'}}>
              <strong>As a Provider you earn two things: 97% of every USDC payment from Users, and CLAW token rewards computed each Epoch by the public formula.</strong>
            </p>
          </div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Service Revenue</span><span className="panel-value" style={{color:'var(--green)'}}>97% of every user payment (USDC)</span></div>
            <div className="panel-row"><span className="panel-label">CLAW Rewards</span><span className="panel-value" style={{color:'var(--green)'}}>70% of Epoch issuance, weighted by W_i</span></div>
            <div className="panel-row"><span className="panel-label">Cold-Start Bonus</span><span className="panel-value">20% of Epoch issuance for new / under-utilized nodes</span></div>
            <div className="panel-row"><span className="panel-label">Protocol Tax</span><span className="panel-value">3% of payment → Treasury → Buyback & Burn</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear release</span></div>
          </div>
        </div>
      </section>

      {/* Reward formula */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Reward Formula</div>
          <p className="section-text mt-4">Your CLAW reward each Epoch is determined entirely by this public formula — no human allocation.</p>
          <div className="panel mt-4">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2.2, padding:'8px 0'}}>
{`W_i = AWU_i × (P_avg / P_i) × Q_i

Reward_i = E_t × W_i / ΣW`}
            </pre>
            <div className="panel-row"><span className="panel-label">AWU_i</span><span className="panel-value">Your metered AI Work Units this Epoch</span></div>
            <div className="panel-row"><span className="panel-label">P_avg / P_i</span><span className="panel-value">Price factor — lower price = higher weight</span></div>
            <div className="panel-row"><span className="panel-label">Q_i</span><span className="panel-value">Quality score: success rate × latency × uptime</span></div>
            <div className="panel-row"><span className="panel-label">E_t</span><span className="panel-value">Total CLAW issued this Epoch</span></div>
          </div>
        </div>
      </section>

      {/* Provider types */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">What Can You Register?</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>GPU Node (Local or Cloud)</h4>
              <p>Deploy LLaMA, Mistral, Qwen, DeepSeek, or any open-source model on your own hardware or cloud GPU (Lambda, RunPod, CoreWeave). Register the endpoint.</p>
            </div>
            <div className="grid-cell">
              <h4>Third-Party API Proxy</h4>
              <p>Wrap OpenAI, Anthropic, Gemini, MiniMax, or any model API behind a ClawFarm-compatible endpoint. Every routed request counts toward your AWU.</p>
            </div>
            <div className="grid-cell">
              <h4>Custom Model Service</h4>
              <p>Fine-tuned models, domain-specific inference services, or proprietary runtimes — if it serves tokens and reports AWU, it qualifies.</p>
            </div>
            <div className="grid-cell">
              <h4>Multi-Model Router</h4>
              <p>Register a single endpoint that routes to multiple models. The protocol meters each call individually. Aggregate traffic, aggregate rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Registration Steps</div>
          <div className="space-y-0 mt-6">
            {[
              {step:'1', title:'Clone the Provider SDK', desc:'Get the ClawFarm skill script from GitHub'},
              {step:'2', title:'Configure your endpoint and pricing', desc:'Set your inference endpoint URL, supported models, and price per AWU'},
              {step:'3', title:'Bind your Solana wallet', desc:'Rewards and service revenue settle to your wallet'},
              {step:'4', title:'Register to the network', desc:'Submit your Provider registration — no approval, instant activation'},
              {step:'5', title:'Implement the response interface', desc:'Ensure your endpoint returns awu_used, token_usage, billed_amount, response_time_ms, success'},
              {step:'6', title:'Go live and start earning', desc:'Traffic routes to you immediately. Cold-start rewards activate from first Epoch online'},
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

      {/* Step 1 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 1: Clone Provider SDK</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`git clone https://github.com/rogerwu188/clawfarm-skill.git ~/clawfarm-provider

cd ~/clawfarm-provider
chmod +x provider.sh`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 2: Configure Your Provider</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`cat > ~/.clawfarm/provider.config << 'EOF'
# Your inference endpoint (HTTPS required)
PROVIDER_ENDPOINT=https://your-endpoint.example.com/v1

# Supported model IDs (comma-separated)
SUPPORTED_MODELS=llama-3-70b,mistral-7b,qwen-72b

# Your price per AWU (USDC)
PRICE_PER_AWU=0.0012

# Solana wallet for reward settlement
SOLANA_WALLET=your_wallet_address
EOF`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 3: Register and Go Live</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Register as Provider (instant, no approval)
./provider.sh register

# Check registration status
./provider.sh status

# View earnings
./provider.sh earnings

# Update your price
./provider.sh config --price 0.0010`}
            </pre>
          </div>
        </div>
      </section>

      {/* Required response format */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Required Response Format</div>
          <p className="section-text mt-4">
            Every model call response from your endpoint must include these fields. Missing fields will cause the call to be excluded from AWU calculation.
          </p>
          <div className="panel mt-4">
            <pre className="text-[11px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`{
  "request_id": "req_xxx",
  "output": "...",              // your model response
  "awu_used": 1.42,             // AI Work Units consumed
  "token_usage": {
    "input_tokens": 800,
    "output_tokens": 1200,
    "total_tokens": 2000
  },
  "billed_amount": 0.0017,      // USDC billed this call
  "response_time_ms": 312,      // latency (affects Q_i)
  "success": true               // false = excluded from AWU
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Treasury flow */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Payment & Treasury Flow</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`User pays 1.00 USDC
  ├── 0.97 USDC → You (Provider, immediate)
  └── 0.03 USDC → Treasury

Treasury (every 24h):
  ├── Fetch TWAP price
  ├── Bear (<-10%): 150% buyback strength
  ├── Normal (±10%): 80% buyback
  ├── Bull (>+10%): 50% buyback
  └── All bought CLAW → burn address (destroyed)`}
            </pre>
          </div>
          <p className="section-small" style={{marginTop:'12px'}}>
            No governance. No allocation committee. The Treasury runs one function: buyback and burn.
          </p>
        </div>
      </section>

      {/* Cold-start */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Cold-Start Incentive</div>
          <p className="section-text mt-4">
            New Providers earn from the first Epoch they're online — even before traffic arrives. 20% of each Epoch's issuance goes to the cold-start pool, distributed by uptime with a per-Provider cap to prevent idle farming.
          </p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Pool size</span><span className="panel-value">20% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Eligibility</span><span className="panel-value">Registered Provider with active endpoint</span></div>
            <div className="panel-row"><span className="panel-label">Basis</span><span className="panel-value">Uptime × base weight</span></div>
            <div className="panel-row"><span className="panel-label">Cap</span><span className="panel-value">Hard per-Provider limit (anti-idle-farming)</span></div>
          </div>
        </div>
      </section>

      {/* Open source repos */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">All Repositories (Open Source)</div>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-skill</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Provider SDK & registration script</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-gateway</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Protocol routing & metering layer</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-masterpool" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-masterpool</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Solana reward vault program</p>
            </a>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">After Registration</div>
          <p className="section-text mt-4">
            Your node is live from the first Epoch. Cold-start rewards activate immediately.<br/>
            As traffic routes to you, AWU accumulates and your Provider Pool share grows.<br/>
            CLAW rewards vest over 180 days. USDC revenue is immediate.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/masterpool" className="btn-primary">View Network State</Link>
            <Link href="/providers" className="btn-secondary">Provider Guide</Link>
            <Link href="/whitepaper" className="btn-secondary">Full Protocol</Link>
            <Link href="/docs" className="btn-secondary">Docs</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
