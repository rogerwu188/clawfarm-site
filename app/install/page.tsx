import Link from 'next/link'

export const metadata = { title: 'Install — ClawFarm', description: 'Install ClawFarm Gateway - The Trusted Usage Meter' }

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Gateway Installation</span></span>
          <span>Version: <span className="text-[#8a8f98]">1.0</span></span>
          <span>Security: <span className="text-[#8a8f98]">Open Source</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Install ClawFarm Gateway</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            Deploy the trusted gateway into your OpenClaw box or local runtime, connect your own model APIs, and route all model calls through a verified metering layer.
          </p>
          <div className="mt-6">
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="btn-secondary">
              📂 View Gateway Source Code on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel" style={{borderLeft:'3px solid var(--green)'}}>
            <p className="section-text" style={{fontSize:'15px'}}>
              <strong>Only model calls routed through the ClawFarm Gateway are reward-eligible. Gateway-signed verified usage receipts are the basis of settlement and mining.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Treasury Tax Flow - Buyback & Burn */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag" style={{backgroundColor:'var(--green)'}}>3% Treasury = Buyback & Burn Engine</div>
          <p className="section-text mt-4" style={{fontSize:'14px'}}>
            The Protocol collects <strong>3% Treasury tax</strong> from every model call. The Treasury is a <strong>non-discretionary buyback-and-burn engine</strong> — it has no governance, no allocation committee, and no human-controlled spending.
          </p>
          
          <div className="panel mt-6" style={{borderLeft:'3px solid var(--green)'}}>
            <div className="grid-2" style={{gap:'24px', gridTemplateColumns:'repeat(2, 1fr)'}}>
              <div>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px'}}>TREASURY FLOW</p>
                <ol style={{fontSize:'12px', color:'var(--text-dim)', paddingLeft:'16px', lineHeight:'1.8'}}>
                  <li>1. User pays for API calls via Gateway</li>
                  <li>2. Gateway forwards call to Model Provider</li>
                  <li>3. Model Provider receives payment</li>
                  <li>4. <strong style={{color:'var(--green)'}}>3% tax → Treasury</strong></li>
                  <li>5. Every 24h: Treasury buys back & burns tokens</li>
                </ol>
              </div>
              <div>
                <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'12px', fontSize:'13px'}}>TWAP ADAPTIVE BUYBACK</p>
                <ul className="section-text space-y-2" style={{fontSize:'12px'}}>
                  <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> <strong>Cycle:</strong> Every 24 hours</li>
                  <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> <strong>Base:</strong> 80% of Treasury USDC</li>
                  <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> <strong>熊市:</strong> 偏离&lt;-10% → 150% (护盘)</li>
                  <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> <strong>牛市:</strong> 偏离&gt;+10% → 50% (控盘)</li>
                  <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> <strong>Burn:</strong> All bought → burn address</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="panel mt-4" style={{backgroundColor:'rgba(0,255,0,0.05)'}}>
            <pre className="text-[11px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`Treasury = TWAP Adaptive Buyback & Burn Engine
┌────────────────────────────────────────────────────────────┐
│  Every 24 hours:                                         │
│  ├── Fetch 24h TWAP price                                 │
│  ├── Calculate deviation from current price                 │
│  ├── Apply adaptive buyback strength:                     │
│  │   ├── Bear market (<-10%): 150% (strong buy)         │
│  │   ├── Normal (±10%): 80% (standard)                   │
│  │   └── Bull market (>+10%): 50% (light buy)          │
│  ├── 80% USDC → Programmatic buyback (randomized)       │
│  ├── 20% USDC → Treasury reserve                         │
│  └── Bought tokens → Burn address (destroyed)            │
│                                                            │
│  NO governance. NO allocation. NO human control.          │
└────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      {/* Why Gateway */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Why Gateway?</div>
          <div className="grid-2 mt-6" style={{gap:'32px'}}>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>WITHOUT GATEWAY (UNTRUSTED)</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> Usage reported by skill can be faked</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> No verification of actual API calls</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> Client decides what to report</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> Not eligible for rewards</li>
              </ul>
            </div>
            <div>
              <p className="section-text" style={{color:'var(--green)', marginBottom:'16px'}}>WITH GATEWAY (TRUSTED)</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> All model calls route through Gateway</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Real request/response logged</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> 3% tax auto-deducted</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Gateway-signed receipt = reward eligible</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Installation Steps</div>
          <div className="space-y-0 mt-6">
            {[
              {step:'1', title:'Download Gateway', desc:'Clone the Gateway code from GitHub'},
              {step:'2', title:'Install into OpenClaw / ClawBox', desc:'Deploy Gateway to your local runtime environment'},
              {step:'3', title:'Configure Your Model Provider APIs', desc:'Add your API keys for OpenAI, Anthropic, Google, MiniMax, etc.'},
              {step:'4', title:'Set Gateway as Default Model Router', desc:'All model calls now route through Gateway'},
              {step:'5', title:'Integrate Settlement API', desc:'Model provider must call Gateway settlement API to pay 3% tax per epoch'},
              {step:'6', title:'Bind Wallet / Node Identity', desc:'Connect your wallet for receiving rewards'},
              {step:'7', title:'Start Generating Verified Usage Receipts', desc:'Every model call creates a signed receipt'},
              {step:'8', title:'Enter Settlement and Mining', desc:'Verified receipts enter the reward distribution'},
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

      {/* Step 1: Clone */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 1: Download Gateway</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Clone ClawFarm Gateway to your machine
git clone https://github.com/rogerwu188/clawfarm-gateway.git ~/clawfarm-gateway

cd ~/clawfarm-gateway
chmod +x gateway.sh`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 2: Configure */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 2: Configure Your Model API Keys</div>
          <p className="section-text mt-4">
            Add your model provider API keys. These stay local - Gateway uses them to make real API calls.
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Create config at ~/.clawfarm/config
mkdir -p ~/.clawfarm

cat > ~/.clawfarm/config << 'EOF'
# Model Provider API Keys (add your own)
OPENAI_API_KEY=sk-xxx           # OpenAI GPT models
ANTHROPIC_API_KEY=sk-ant-xxx    # Claude models
GOOGLE_API_KEY=xxx              # Gemini models
MINIMAX_API_KEY=xxx            # MiniMax models

# Solana Wallet (for receiving rewards)
SOLANA_WALLET=your_wallet_address

# Gateway Settings
GATEWAY_PORT=18790
SETTLEMENT_EPOCH_MINUTES=15
VESTING_DAYS=180
EOF

chmod 600 ~/.clawfarm/config`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 3: Install */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 3: Install and Start Gateway</div>
          <p className="section-text mt-4">
            Register Gateway with the network and start it as the trusted router.
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Register Gateway with the network
./gateway.sh register

# Start Gateway (becomes trusted router)
./gateway.sh start

# Check status
./gateway.sh status

# View logs
./gateway.sh logs`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 4: Route */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 4: Route All Model Calls Through Gateway</div>
          <p className="section-text mt-4">
            Configure your AI runtime to use Gateway as the model proxy. All calls must pass through Gateway to generate verified receipts.
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Example: Set Gateway as model endpoint
export OPENAI_API_BASE="http://localhost:18790/v1"
export ANTHROPIC_API_BASE="http://localhost:18790/v1"

# Now all model calls route through Gateway
# Gateway logs the call, forwards to provider,
# verifies response, deducts 3% tax, generates signed receipt`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 5: Settlement - NEW */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 5: Model Provider Settlement Integration</div>
          <p className="section-text mt-4">
            Model providers must integrate with Gateway's settlement API to pay 3% tax per epoch. This is automatic and built into Gateway.
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Gateway settlement happens automatically every epoch (15 min)
# The 3% tax is deducted from user payments
# Treasury address is hardcoded in Gateway

# Settlement API (called automatically by Gateway):
POST /api/settlement
{
  "epoch_id": "epoch_20260314_10:30",
  "total_billed": "100.00",
  "tax_amount": "3.00",  # 3% automatically calculated
  "treasury_address": "TreasuryWalletAddress...",
  "signature": "ed25519_xxx"
}

# Model providers receive: 97% of billed amount
# Treasury receives: 3% tax (auto-deducted by Gateway)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Verified Usage Receipt */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Verified Usage Receipt</div>
          <p className="section-text mt-4">
            Every model call through Gateway generates a signed receipt. Only these receipts are eligible for settlement.
          </p>
          <div className="panel mt-4">
            <pre className="text-[11px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`{
  "receipt_id": "vur_xxx",
  "gateway_id": "gw_xxx",
  "model": "gpt-4.1",
  "input_tokens": 1200,
  "output_tokens": 3400,
  "total_tokens": 4600,
  "billed_amount_usd": "0.92",
  "tax_paid_usd": "0.0276",    // 3% tax already deducted
  "timestamp": "2026-03-14T10:30:00Z",
  "eligible": true,
  "eligibility_reason": "gateway_verified_billed_usage",
  "epoch_id": "epoch_20260314_10:30",
  "gateway_signature": "ed25519_xxx"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Security & Transparency */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Security & Transparency</div>
          <div className="grid-2 mt-6" style={{gap:'32px'}}>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>ALL CODE OPEN SOURCE</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> GitHub: rogerwu188/clawfarm-gateway</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Inspect all gateway code</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Treasury address hardcoded & public</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Pull requests welcome</li>
              </ul>
            </div>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>LOCAL DEPLOYMENT</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Runs on your machine/box</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> API keys never leave your device</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> 3% tax automatic & transparent</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Your wallet, your rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* All Repositories */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">All Repositories (Open Source)</div>
          <p className="section-text mt-4" style={{fontSize:'14px', color:'var(--text-mid)'}}>
            All code is open source and inspectable. Humans and AI agents can verify the implementation.
          </p>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-gateway</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>This Gateway - trusted router</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-site</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Website - clawfarm.network</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-masterpool" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-masterpool</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Solana program</p>
            </a>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Next Steps</div>
          <p className="section-text mt-4">
            After Gateway is running, all model calls generate verified receipts.<br/>
            Every 15 minutes, verified receipts enter settlement. 3% tax is auto-deducted.<br/>
            Rewards vest over 180 days.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/masterpool" className="btn-primary">View Network</Link>
            <Link href="/whitepaper" className="btn-secondary">Read Protocol</Link>
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}