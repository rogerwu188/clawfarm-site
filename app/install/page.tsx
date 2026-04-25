import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Provider — ClawFarm | Earn with AI Compute',
  description: 'Register on-chain with a model endpoint, pricing, and start earning. No approval. No whitelist. 97% USDC revenue + $CLAF rewards.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/install' },
  openGraph: {
    title: 'Become a Provider — ClawFarm',
    description: 'Register on-chain, set your price, start earning. No approval needed.',
    url: 'https://www.clawfarm.network/install',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Become a ClawFarm Provider' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become a Provider — ClawFarm',
    description: 'Register on-chain, set your price, start earning.',
    images: ['/og-image.png'],
  },
}

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Provider Registration</span></span>
          <span>Version: <span className="text-[#8a8f98]">v2.0</span></span>
          <span>Gate: <span className="text-[#8a8f98]">Permissionless</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Become a Provider</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            Register on-chain with a model endpoint, a price table, and a $CLAF stake. No approval. No billing infrastructure. Settlement goes directly from user escrow to your wallet via smart contract.
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
            <p className="section-text" style={{fontSize:'15px', padding:'18px 22px'}}>
              <strong>Two revenue streams: 97% of every USDC payment (direct, on-chain) + $CLAF token rewards per Epoch.</strong>
            </p>
          </div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Service Revenue</span><span className="panel-value" style={{color:'var(--green)'}}>97% of every user payment (USDC, on-chain)</span></div>
            <div className="panel-row"><span className="panel-label">$CLAF Rewards</span><span className="panel-value" style={{color:'var(--green)'}}>70% of Epoch issuance, weighted by W_i</span></div>
            <div className="panel-row"><span className="panel-label">Staking Requirement</span><span className="panel-value">Minimum 1,000 $CLAF</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear release</span></div>
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
              <p>Deploy LLaMA, Mistral, Qwen, DeepSeek, or any open-source model on your own hardware or cloud GPU (Lambda, RunPod, CoreWeave).</p>
            </div>
            <div className="grid-cell">
              <h4>Third-Party API Proxy</h4>
              <p>Wrap OpenAI, Anthropic, Gemini, MiniMax, or any model API behind a ClawFarm-compatible endpoint.</p>
            </div>
            <div className="grid-cell">
              <h4>Custom Model Service</h4>
              <p>Fine-tuned models, domain-specific inference services, or proprietary runtimes — if it serves tokens, it qualifies.</p>
            </div>
            <div className="grid-cell">
              <h4>Multi-Model Router</h4>
              <p>Register a single endpoint that routes to multiple models. The protocol meters each call individually.</p>
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
              {step:'1', title:'Get the Provider SDK', desc:'Clone from GitHub — includes registration script and dual-sig support'},
              {step:'2', title:'Configure endpoint and pricing', desc:'Set your inference endpoint URL, supported models, and per-token pricing (on-chain)'},
              {step:'3', title:'Stake $CLAF tokens', desc:'Minimum 1,000 $CLAF locked as collateral against misbehavior'},
              {step:'4', title:'Register on-chain', desc:'Call the registry contract — no approval, instant activation'},
              {step:'5', title:'Implement dual-signature', desc:'Your endpoint must sign usage proofs per response (SDK handles this)'},
              {step:'6', title:'Go live', desc:'Traffic routes to you immediately. $CLAF rewards from first Epoch.'},
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
          <div className="section-tag">Step 1: Get Provider SDK</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`git clone https://github.com/rogerwu188/clawfarm-skill.git ~/clawfarm-provider

cd ~/clawfarm-provider
npm install`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 2: Configure</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`# provider.config.json
{
  "endpoint": "https://your-endpoint.example.com/v1",
  "models": [
    {
      "id": "llama-3-70b",
      "input_price_per_token": 0.0000008,
      "output_price_per_token": 0.0000024
    },
    {
      "id": "mistral-7b",
      "input_price_per_token": 0.0000002,
      "output_price_per_token": 0.0000006
    }
  ],
  "wallet": "your_solana_wallet_address",
  "stake_amount": 1000
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 3: Register and Go Live</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`# Register on-chain (stakes $CLAF + creates Provider account)
npx clawfarm register

# Check status
npx clawfarm status

# View earnings (USDC revenue + $CLAF rewards)
npx clawfarm earnings

# Update pricing
npx clawfarm update-pricing --config provider.config.json

# Begin unstaking (7-day period)
npx clawfarm unstake`}
            </pre>
          </div>
        </div>
      </section>

      {/* Settlement flow */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Settlement Flow</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>
{`User deposits USDC to escrow contract
  ↓
User sends request → routed to your endpoint
  ↓
You serve inference → return response + sign usage proof
  ↓
User SDK counts tokens client-side → co-signs usage proof
  ↓
Settlement contract processes dual-signed proof:
  ├── 0.97 × cost → your wallet (on-chain)
  └── 0.03 × cost → treasury → buyback & burn

No Stripe. No billing system. No payment processing.`}
            </pre>
          </div>
        </div>
      </section>

      {/* Repos */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Open Source Repositories</div>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="grid-cell">
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-skill</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Provider SDK & registration</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="grid-cell">
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-gateway</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Protocol routing & metering</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-contracts" target="_blank" rel="noopener" className="grid-cell">
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-contracts</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Solana programs (Escrow, Registry, Settlement)</p>
            </a>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/masterpool" className="btn-primary">Network Explorer</Link>
            <Link href="/providers" className="btn-secondary">Provider Guide</Link>
            <Link href="/whitepaper" className="btn-secondary">Full Protocol</Link>
            <Link href="/docs" className="btn-secondary">Docs</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
