import Link from 'next/link'
import DevnetFaucetCard from '../components/devnet/DevnetFaucetCard'

export const metadata = {
  title: 'Devnet Phase 1 — ClawFarm Current Implementation',
  description:
    'Current ClawFarm devnet implementation status, including Solana program addresses, implemented Phase 1 contract capabilities, AIRouter runtime routes, and known limitations.',
}

const DEPLOYMENT = [
  ['Cluster', 'devnet'],
  ['Masterpool Program', 'AP5gMEh6yHjvZBjh7Xg5fgs4EnBiCbVUoDyXxMi1omux'],
  ['Attestation Program', '52WWsrQQcpAJn4cjSxMe4XGBvgGzPXa9gjAqUSfryAx2'],
  ['CLAW Mint', 'GNWh9hfyEpbnNRzVdYBT7ZiB6VRJwXecSwTRohZByky8'],
  ['Test USDC Mint', 'D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P'],
  ['Pool Authority', '55Cncw3fj9P8RVmgmm1RdAnjYpyF27erJGo1Noz3S3sY'],
  ['Masterpool Config', 'Fu2CZPqHZWpSqu9MtxseTurXQidEe54MQxvAkj1Gg54B'],
  ['Attestation Config', 'JAyZqdunWRWstiNYvkcHAU3GXSCnfoorNUYT6JYTnfZG'],
  ['Reward Vault', 'DcNDAyT6EGt9incxH3zQ9Uw6D7NyV9behQ44tPPSUKJx'],
  ['Treasury USDC Vault', '2qtYn8G3fpTT8bA4uox3M2r9bJwFurvYnqsnZABBodeJ'],
  ['Provider Stake USDC Vault', '4m3L1R2QHrXnJAPHr6qPk1M6HKbVzbLyEFMtCgQ9F3Zf'],
  ['Provider Pending USDC Vault', '8uVf5kMAFRorRTrDucyDH7DAp7oYic5G8C1mVbHAMhV8'],
] as const

const IMPLEMENTED = [
  {
    title: 'Receipt-driven settlement',
    text: 'The active Phase 1 flow records one economic settlement per attested receipt instead of using the removed epoch settlement model.',
  },
  {
    title: 'Provider USDC stake',
    text: 'Providers register one wallet and post the configured USDC stake into a dedicated provider stake vault.',
  },
  {
    title: 'Treasury and pending-revenue vaults',
    text: 'Receipt recording splits user-paid USDC into treasury USDC and provider pending-revenue USDC vaults.',
  },
  {
    title: 'Finalized provider payout',
    text: 'Provider USDC is released from the pending vault only after attestation finalizes the receipt.',
  },
  {
    title: 'CLAW reward accounting',
    text: 'User and provider CLAW rewards are snapshotted per receipt, tracked as pending, locked, released, and claimed balances.',
  },
  {
    title: 'Challenge economics',
    text: 'Challenges use CLAW bonds and can return the bond, refund the payer provider-share USDC, slash provider CLAW position, reward challengers, and burn CLAW.',
  },
  {
    title: 'AIRouter model catalog',
    text: 'AIRouter can aggregate provider model catalogs from models_url, cache normalized model metadata, and expose provider-prefixed model IDs.',
  },
  {
    title: 'AIRouter routing profiles',
    text: 'The runtime supports service-side clawfarm/eco, clawfarm/auto, and clawfarm/premium routing with capability filtering, scoring, and fallback attempts.',
  },
] as const

const LIMITATIONS = [
  'No user pre-funded PDA escrow flow is implemented in the current masterpool instruction surface.',
  'No user self-service balance exit flow is implemented for a pre-funded escrow balance, because that balance model is not part of Phase 1.',
  'No published ClawFarm JavaScript SDK package is confirmed from this repository set or the npm registry.',
  'No self-serve on-chain model price table exists in the current provider account; model pricing lives in AIRouter provider catalog/cache configuration.',
  'No automated daily reward release executor is included; Phase 1 has reward accounting and claim/release primitives.',
  'The current Phase 1 default USDC split is provider 30% and treasury 70%, not the mainnet-target provider-majority split.',
  'SolanaService production enablement cannot be confirmed from repository defaults; the default AIRouter config sets it disabled.',
] as const

const API_ROUTES = [
  ['GET', '/clawfarm/v1/models', 'List aggregated provider models and built-in routing profiles.'],
  ['POST', '/clawfarm/chat/completions', 'OpenAI-compatible ClawFarm chat completion entrypoint.'],
  ['POST', '/clawfarm/v1/messages', 'Anthropic-compatible ClawFarm messages entrypoint.'],
  ['POST', '/clawfarm/google/v1/models/{model}:generateContent', 'Google Generative AI compatible entrypoint.'],
  ['GET', '/api/public/v1/proofs/{proof_id}', 'Fetch public proof bundles by proof id.'],
  ['GET', '/api/public/v1/proofs/by-request-nonce/{request_nonce}', 'Fetch public proof bundles by request nonce.'],
  ['POST', '/clawfarm/v1/challenges/prepare-open', 'Prepare a wallet-signable challenge-open transaction.'],
  ['GET', '/clawfarm/v1/challenges/by-request-nonce/{request_nonce}', 'Query challenge state for a request nonce.'],
] as const

const EVIDENCE = [
  ['Devnet deployment', 'clawfarm-masterpool/deployments/devnet-phase1.json'],
  ['Masterpool instructions', 'programs/clawfarm-masterpool/src/lib.rs'],
  ['Provider registration', 'programs/clawfarm-masterpool/src/instructions/provider.rs'],
  ['Receipt settlement', 'programs/clawfarm-masterpool/src/instructions/receipt.rs'],
  ['Challenge economics', 'programs/clawfarm-masterpool/src/instructions/challenge.rs'],
  ['AIRouter runtime routes', 'AIRouter/api/clawfarm/routes.go'],
  ['AIRouter route selection', 'AIRouter/api/clawfarm/routing_selector.go'],
  ['AIRouter chain worker', 'AIRouter/cmd/clawfarm-chain-worker/main.go'],
] as const

function ShortAddress({ value }: { value: string }) {
  const compact = value.length > 18 ? `${value.slice(0, 6)}...${value.slice(-6)}` : value
  return (
    <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-mid)', wordBreak: 'break-all' }} title={value}>
      {compact}
    </code>
  )
}

export default function DevnetPage() {
  return (
    <main>
      <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Devnet implementation</div>
          <h1 className="section-title text-[36px]" style={{ maxWidth: 820 }}>
            Devnet Phase 1 — Current Implementation
          </h1>
          <p className="section-text" style={{ maxWidth: 760, marginTop: 16 }}>
            This page documents the implementation that can be verified from the local ClawFarm masterpool,
            attestation, and AIRouter repositories. It is a devnet status surface, not a mainnet launch claim.
          </p>

          <div className="grid-3" style={{ marginTop: 32 }}>
            <div className="stat-card">
              <div className="stat-label">Network</div>
              <div className="stat-value" style={{ fontSize: 28, color: 'var(--green)' }}>Solana</div>
              <div className="stat-unit">Devnet</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Status</div>
              <div className="stat-value" style={{ fontSize: 28 }}>Phase 1</div>
              <div className="stat-unit">receipt settlement implementation</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Mainnet</div>
              <div className="stat-value" style={{ fontSize: 28, color: 'var(--amber)' }}>Target</div>
              <div className="stat-unit">not represented by this page</div>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <DevnetFaucetCard />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Program addresses</div>
          <p className="section-text" style={{ maxWidth: 760, marginBottom: 24 }}>
            Static values copied from the local devnet deployment file. They are shown for verification and
            integration context; the faucet card above requests Gateway-sponsored devnet claims where the
            recipient public key receives tokens and the Gateway signs as fee payer.
          </p>
          <div className="panel">
            {DEPLOYMENT.map(([label, value]) => (
              <div className="panel-row" key={label}>
                <span className="panel-label">{label}</span>
                <span className="panel-value"><ShortAddress value={value} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Implemented capabilities</div>
          <div className="grid-4" style={{ marginTop: 24 }}>
            {IMPLEMENTED.map((item) => (
              <div className="grid-cell" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Current limitations</div>
          <div className="panel" style={{ marginTop: 24 }}>
            {LIMITATIONS.map((item, index) => (
              <div className="panel-row" key={item}>
                <span className="panel-label">{String(index + 1).padStart(2, '0')}</span>
                <span className="panel-value" style={{ textAlign: 'left', maxWidth: 780 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Developer API surface</div>
          <p className="section-text" style={{ maxWidth: 760, marginBottom: 24 }}>
            AIRouter exposes these runtime routes in code. They still require a running AIRouter deployment,
            configured providers, API credentials, and any operator-side SolanaService settings.
          </p>
          <div className="panel">
            {API_ROUTES.map(([method, route, desc]) => (
              <div className="panel-row" key={`${method} ${route}`}>
                <span className="panel-label" style={{ color: method === 'GET' ? 'var(--green)' : 'var(--accent)' }}>{method}</span>
                <span className="panel-value" style={{ textAlign: 'left', flex: 1 }}>
                  <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-high)' }}>{route}</code>
                  <span style={{ display: 'block', color: 'var(--text-low)', marginTop: 4 }}>{desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-tag">Evidence map</div>
          <div className="grid-2" style={{ marginTop: 24 }}>
            {EVIDENCE.map(([label, path]) => (
              <div className="grid-cell" key={path}>
                <h4>{label}</h4>
                <p style={{ fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>{path}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/" className="btn-secondary">Back to main site</Link>
            <Link href="/masterpool" className="btn-secondary">Existing explorer page</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
