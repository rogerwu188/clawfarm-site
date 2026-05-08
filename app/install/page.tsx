import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Provider - ClawFarm',
  description: 'Register an AI service gateway, capacity pool, or compute storefront with pricing, metering, usage proof signing, and on-chain settlement.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/install' },
  openGraph: {
    title: 'Become a Provider - ClawFarm',
    description: 'Register a provider endpoint, publish pricing, sign usage proofs, and earn from routed demand.',
    url: 'https://www.clawfarm.network/install',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Become a ClawFarm Provider' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become a Provider - ClawFarm',
    description: 'Register a provider endpoint, publish pricing, sign usage proofs, and earn from routed demand.',
    images: ['/og-image.png'],
  },
}

const revenueRows = [
  ['Service Revenue', '97% of eligible USDC usage revenue settles to the provider wallet.'],
  ['Protocol Treasury', '3% routes to the protocol treasury for buyback, burn, and network operations.'],
  ['$CLAF Rewards', 'Epoch rewards are weighted by metered usage, price efficiency, uptime, and routing reputation.'],
  ['Staking Requirement', 'Minimum 1,000 $CLAF for provider registration.'],
  ['Vesting', '180-day linear release for protocol rewards.'],
]

const revenueRowStyle = {
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '8px 24px',
} as const

const revenueValueStyle = {
  flex: '1 1 260px',
  minWidth: 0,
  textAlign: 'left',
  lineHeight: 1.55,
} as const

const providerTypes = [
  {
    title: 'API Gateway',
    desc: 'Expose any AI service through a ClawFarm-compatible gateway with pricing, metering, limits, and signed usage proofs.',
  },
  {
    title: 'Community Capacity Pool',
    desc: 'Aggregate capacity from multiple operators into one routed endpoint, with internal settlement handled by the pool operator.',
  },
  {
    title: 'AI Compute Storefront',
    desc: 'Launch a branded storefront that sells routed AI compute with custom pricing, customer limits, margin rules, and billing logic.',
  },
]

const registrationSteps = [
  {
    step: '1',
    title: 'Install Provider SDK',
    desc: 'Run a ClawFarm-compatible provider gateway.',
  },
  {
    step: '2',
    title: 'Configure Service and Pricing',
    desc: 'Publish service metadata, price tables, rate limits, routing tags, and wallet address.',
  },
  {
    step: '3',
    title: 'Stake and Register',
    desc: 'Stake $CLAF and register your provider address on-chain.',
  },
  {
    step: '4',
    title: 'Sign Usage Proofs',
    desc: 'Return responses with signed usage receipts for metering and settlement.',
  },
  {
    step: '5',
    title: 'Receive Routed Demand',
    desc: 'Routers and users route requests based on price, uptime, latency, stake, reputation, limits, and service type.',
  },
  {
    step: '6',
    title: 'Earn Settlement',
    desc: 'Completed usage settles through smart contracts according to your published price table.',
  },
]

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-x-8 gap-y-2">
          <span>Surface: <span className="text-[#8a8f98]">Provider Registration</span></span>
          <span>Version: <span className="text-[#8a8f98]">v2.0</span></span>
          <span>Gate: <span className="text-[#8a8f98]">Provider Registration</span></span>
          <span><span className="text-[#8a8f98]">No centralized billing · No approval queue · Market-based routing</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Become a Provider</h1>
          <p className="section-text" style={{ marginTop: '12px', fontSize: '16px', color: 'var(--text-mid)' }}>
            Register an AI service gateway, capacity pool, or compute storefront, publish pricing,
            sign usage proofs, and earn from routed demand through ClawFarm settlement.
          </p>
          <p className="section-text" style={{ marginTop: '18px', fontSize: '14px', color: 'var(--text-dim)' }}>
            ClawFarm does not decide who gets to provide AI service. Providers register
            capacity; routers and users decide where demand flows based on price, uptime,
            latency, stake, reputation, limits, and historical proof data.
          </p>
          <p className="section-text" style={{ marginTop: '18px', fontSize: '15px' }}>
            Register your provider endpoint, publish a price table, stake $CLAF, and let
            ClawFarm settle completed usage directly from user escrow to your wallet through
            smart contracts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-primary">
              Provider SDK on GitHub
            </a>
            <Link href="/whitepaper" className="btn-secondary">Read Protocol</Link>
          </div>
        </div>
      </section>

      {/* Revenue */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Provider Economics</div>
          <div className="panel mt-4">
            {revenueRows.map(([label, value]) => (
              <div className="panel-row" style={revenueRowStyle} key={label}>
                <span className="panel-label">{label}</span>
                <span
                  className="panel-value"
                  style={{
                    ...revenueValueStyle,
                    ...(label === 'Service Revenue' || label === '$CLAF Rewards' ? { color: 'var(--green)' } : {}),
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider types */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">WHAT CAN YOU REGISTER?</div>
          <p className="section-text mt-4">
            Any AI service gateway, capacity pool, or storefront that can meter usage
            and sign proofs can become a ClawFarm Provider.
          </p>
          <div className="grid-3 mt-6">
            {providerTypes.map((type) => (
              <div className="grid-cell" key={type.title}>
                <h4>{type.title}</h4>
                <p>{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Registration Steps</div>
          <div className="space-y-0 mt-6">
            {registrationSteps.map((f) => (
              <div key={f.step} className="seq-item">
                <span className="seq-num">{f.step}</span>
                <div>
                  <span className="seq-text">{f.title}</span>
                  <span className="block text-[11px] text-[#505560] mt-1">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="section-small" style={{ marginTop: '18px' }}>
            Registration makes your provider discoverable. It does not guarantee demand;
            routing remains market-based.
          </p>
        </div>
      </section>

      {/* Step 1 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 1: Get Provider SDK</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
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
          <div className="section-tag">Step 2: Configure Provider</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`# provider.config.json
{
  "provider_type": "api_gateway | community_capacity_pool | compute_storefront",
  "endpoint": "https://your-provider.example.com/v1",
  "wallet": "your_solana_wallet_address",
  "stake_amount": 1000,
  "pricing": {
    "unit": "token | request | second | task",
    "input_price": 0.0000008,
    "output_price": 0.0000024,
    "currency": "USDC"
  },
  "limits": {
    "max_requests_per_minute": 120,
    "max_spend_per_user": 100,
    "timeout_ms": 60000
  },
  "routing_tags": [
    "text",
    "image",
    "video",
    "agent",
    "enterprise",
    "low-latency"
  ],
  "proofs": {
    "usage_proof": true,
    "provider_signature": true,
    "client_cosign": true
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 3: Register and Operate</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`# Register on-chain: stakes $CLAF + creates Provider account
npx clawfarm register

# Check provider status
npx clawfarm status

# View earnings: USDC revenue + $CLAF rewards
npx clawfarm earnings

# Update pricing and limits
npx clawfarm update-pricing --config provider.config.json

# Begin unstaking
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
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`User deposits USDC to escrow contract
  ↓
User sends request → router selects a provider endpoint
  ↓
Provider serves response → returns signed usage proof
  ↓
Client co-signs usage proof
  ↓
Settlement contract processes dual-signed proof:
  ├── 0.97 × cost → provider wallet
  └── 0.03 × cost → protocol treasury → buyback, burn, and network operations

No Stripe. No centralized billing system. No payment processor custody.`}
            </pre>
          </div>
          <p className="section-small" style={{ marginTop: '18px' }}>
            ClawFarm verifies usage proofs and settlement logic. Providers are responsible
            for their own capacity sources, pricing, limits, uptime, and endpoint behavior.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
            <div style={{ padding: '24px 22px' }}>
              <h2 className="section-title text-[30px]">Start as a Provider</h2>
              <p className="section-text" style={{ marginTop: '12px' }}>
                Register a gateway, capacity pool, or storefront. Publish pricing. Sign
                usage proofs. Earn from routed AI demand.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-primary">
                  Provider SDK on GitHub
                </a>
                <Link href="/masterpool" className="btn-secondary">View Network Explorer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
