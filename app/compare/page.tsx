import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ClawFarm vs OpenRouter vs LiteLLM | Layer Comparison',
  description: 'Understand the difference between ClawFarm (decentralized network), OpenRouter (aggregation platform), and LiteLLM (developer tool). Same space, fundamentally different architectures.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'ClawFarm vs OpenRouter vs LiteLLM',
    description: 'Decentralized network vs aggregation platform vs developer tool. Understand the architectural differences.',
    url: 'https://www.clawfarm.network/compare',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm vs OpenRouter vs LiteLLM',
    description: 'Decentralized network vs aggregation platform vs developer tool.',
    images: ['/og-image.png'],
  },
}

export default function ComparePage() {
  return (
    <main>
      <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-[36px] font-bold mb-4">ClawFarm vs OpenRouter vs LiteLLM</h1>
          <p className="text-[var(--text-mid)] text-[16px] leading-relaxed">
            They all &quot;route AI requests.&quot; But they are not the same thing. Here is the actual difference.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div
              className="p-6"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '3px solid var(--green-bright)',
              }}
            >
              <div
                className="font-mono text-[11px] mb-3 tracking-wider"
                style={{ color: 'var(--green-bright)' }}
              >
                DECENTRALIZED NETWORK
              </div>
              <h2 className="text-[22px] font-bold mb-3">ClawFarm</h2>
              <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text-mid)' }}>
                A two-sided marketplace where providers register directly, compete on price, and
                receive automatic on-chain settlement. No platform controls custody or pricing.
              </p>
            </div>

            <div
              className="p-6"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '3px solid var(--accent)',
              }}
            >
              <div
                className="font-mono text-[11px] mb-3 tracking-wider"
                style={{ color: 'var(--accent)' }}
              >
                AGGREGATION PLATFORM
              </div>
              <h2 className="text-[22px] font-bold mb-3">OpenRouter</h2>
              <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text-mid)' }}>
                Sells access to 300+ models through one API key. Great for prototyping. Centralized
                pricing, custodial API keys, platform-controlled access.
              </p>
            </div>

            <div
              className="p-6"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '3px solid var(--amber)',
              }}
            >
              <div
                className="font-mono text-[11px] mb-3 tracking-wider"
                style={{ color: 'var(--amber)' }}
              >
                DEVELOPER TOOL
              </div>
              <h2 className="text-[22px] font-bold mb-3">LiteLLM</h2>
              <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text-mid)' }}>
                A unified interface layer you self-host. Control over routing logic without building
                from scratch. You bring your own API keys and provider relationships.
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <h2 className="text-[24px] font-bold mb-8">The Key Differences</h2>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontWeight: 600,
                      color: 'var(--text-dim)',
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    DIMENSION
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontWeight: 600,
                      color: 'var(--green-bright)',
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    CLAWFARM
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    OPENROUTER
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontWeight: 600,
                      color: 'var(--amber)',
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    LITELLM
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Type', 'Two-sided network', 'Aggregation platform', 'Developer tool'],
                  ['Custody', 'Non-custodial', 'Platform holds keys', 'You hold keys'],
                  ['Pricing', 'Market-driven by providers', 'Platform sets', 'You configure'],
                  ['Settlement', 'Automatic on-chain', 'Platform bills you', 'You manage'],
                  ['Provider economics', '97% to provider', 'Opaque revenue share', 'N/A'],
                  ['Registration', 'Open, no approval', 'Provider must be approved', 'N/A'],
                  ['Metering', 'Dual-signature, verifiable', 'Platform-controlled', 'You implement'],
                  ['Best for', 'Decentralized infra', 'Quick model access', 'Self-hosted control'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td
                      style={{
                        padding: '14px 16px',
                        fontWeight: 600,
                        color: 'var(--text-high)',
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row[0]}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-mid)', fontSize: '13px' }}>
                      {row[1]}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-mid)', fontSize: '13px' }}>
                      {row[2]}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-mid)', fontSize: '13px' }}>
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-16 p-8"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)',
            }}
          >
            <h3 className="text-[20px] font-bold mb-3">The Bottom Line</h3>
            <p className="text-[15px] leading-[1.7] mb-6" style={{ color: 'var(--text-mid)' }}>
              <strong style={{ color: 'var(--text-high)' }}>
                OpenRouter and LiteLLM route TO providers. ClawFarm IS the network of providers.
              </strong>{' '}
              If you want decentralized, transparent compute with automatic settlement and no
              platform controlling your access or pricing, use ClawFarm. If you want quick access
              to many models or a self-hosted control layer, use OpenRouter or LiteLLM.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="/providers" className="btn-primary text-[13px]">
                Become a Provider →
              </a>
              <a href="/docs" className="btn-secondary text-[13px]">
                Build on ClawFarm
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
