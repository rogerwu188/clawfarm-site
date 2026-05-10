import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Provider - ClawFarm',
  description: 'Register AI capacity into the ClawFarm decentralized AI token router as an API Gateway Provider or Community Spot Capacity Pool.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/install' },
  openGraph: {
    title: 'Become a Provider - ClawFarm',
    description: 'Register AI capacity, meter usage, sign usage proofs, and receive on-chain settlement.',
    url: 'https://www.clawfarm.network/install',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Become a ClawFarm Provider' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become a Provider - ClawFarm',
    description: 'Register AI capacity into the ClawFarm decentralized AI token router.',
    images: ['/og-image.png'],
  },
}

const providerModes = [
  {
    title: 'API Gateway Provider',
    desc: 'Connect an existing AI API, model endpoint, router, or enterprise inference service. Meter usage, sign usage proofs, and settle verified consumption through ClawFarm.',
  },
  {
    title: 'Community Spot Capacity Pool',
    desc: 'Aggregate idle AI execution capacity from multiple community operators into one routed pool. The pool operator handles routing, metering, quality control, and internal settlement.',
  },
]

const accordionSections = [
  {
    id: 'how-registration-works',
    title: 'How registration works',
    body: (
      <p className="section-text">
        Connect endpoint or pool gateway → configure capacity → stake CLAF → sign
        usage proofs → receive settlement.
      </p>
    ),
  },
  {
    id: 'pricing-settlement',
    title: 'Pricing & settlement',
    body: (
      <div className="panel">
        <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">Eligible usage revenue settles to the provider wallet.</span></div>
        <div className="panel-row"><span className="panel-label">Treasury Fee</span><span className="panel-value">Protocol fee routes to treasury for buyback, burn, and network operations.</span></div>
        <div className="panel-row"><span className="panel-label">$CLAF Rewards</span><span className="panel-value">Rewards may be weighted by metered usage, price efficiency, uptime, and routing reputation.</span></div>
      </div>
    ),
  },
  {
    id: 'staking-requirement',
    title: 'Staking requirement',
    body: (
      <p className="section-text">
        Provider registration requires a minimum 1,000 $CLAF stake. Unstaking follows
        the protocol delay and remains subject to pending disputes or settlement checks.
      </p>
    ),
  },
  {
    id: 'usage-proof-flow',
    title: 'Usage proof flow',
    body: (
      <p className="section-text">
        User request → router selects provider → provider serves task → usage proof
        signed → settlement contract verifies → provider receives payout.
      </p>
    ),
  },
  {
    id: 'sdk-setup',
    title: 'SDK setup',
    body: (
      <div className="panel">
        <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`git clone https://github.com/rogerwu188/clawfarm-skill.git ~/clawfarm-provider

cd ~/clawfarm-provider
npm install

# Register on-chain: stakes $CLAF + creates Provider account
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
    ),
  },
  {
    id: 'config-example',
    title: 'Config example',
    body: (
      <div className="panel">
        <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{ padding: '18px 22px' }}>
{`# provider.config.json
{
  "provider_type": "api_gateway | community_spot_capacity_pool",
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
    "low-latency",
    "spot-capacity"
  ],
  "proofs": {
    "usage_proof": true,
    "provider_signature": true,
    "client_cosign": true
  }
}`}
        </pre>
      </div>
    ),
  },
  {
    id: 'open-source-repositories',
    title: 'Open-source repositories',
    body: (
      <div className="grid-3">
        <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="grid-cell">
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--green)' }}>clawfarm-skill</h4>
          <p className="section-small" style={{ marginTop: '8px', fontSize: '11px' }}>Provider SDK and usage proof signing.</p>
        </a>
        <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="grid-cell">
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--green)' }}>clawfarm-gateway</h4>
          <p className="section-small" style={{ marginTop: '8px', fontSize: '11px' }}>Routing, metering, and provider discovery.</p>
        </a>
        <a href="https://github.com/rogerwu188/clawfarm-contracts" target="_blank" rel="noopener" className="grid-cell">
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--green)' }}>clawfarm-contracts</h4>
          <p className="section-small" style={{ marginTop: '8px', fontSize: '11px' }}>Escrow, registry, staking, and settlement programs.</p>
        </a>
      </div>
    ),
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
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag">Provider Console</p>
          <h1 className="section-title text-[36px]">Become a Provider</h1>
          <p className="section-text" style={{ marginTop: '12px', fontSize: '18px', color: 'var(--text-mid)' }}>
            Register AI capacity into the ClawFarm decentralized AI token router.
          </p>

          <div className="grid-2 mt-8">
            {providerModes.map((mode) => (
              <div key={mode.title} className="grid-cell">
                <h4>{mode.title}</h4>
                <p>{mode.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#sdk-setup" className="btn-primary">Start Registration</a>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">
              Read Provider SDK
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Provider Details</div>
          <div className="panel">
            {accordionSections.map((section) => (
              <details id={section.id} key={section.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <summary
                  style={{
                    cursor: 'pointer',
                    padding: '18px 20px',
                    color: 'var(--text-high)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    letterSpacing: '0.02em',
                  }}
                >
                  {section.title}
                </summary>
                <div style={{ padding: '0 20px 22px' }}>
                  {section.body}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
