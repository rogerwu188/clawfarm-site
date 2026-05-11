import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whitepaper — ClawFarm Protocol v2.0 | Decentralized AI Token Router',
  description: 'ClawFarm protocol architecture for AI token routing, model-token metering, non-custodial escrow, on-chain settlement, and token economics.',
  metadataBase: new URL('https://www.clawfarm.network'),
  alternates: { canonical: '/whitepaper' },
  openGraph: {
    title: 'ClawFarm Whitepaper v2.0',
    description: 'Protocol architecture, routing, metering, settlement, and token economics.',
    url: 'https://www.clawfarm.network/whitepaper',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ClawFarm Whitepaper' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm Whitepaper v2.0',
    description: 'Protocol architecture and token economics.',
    images: ['/og-image.png'],
  },
}

export default function Whitepaper() {
  return (
    <main className="doc-page">
      <div className="state-strip">
        <div className="section-inner" style={{ display: "flex", gap: 32 }}>
          <span>Surface: <span className="text-[#8a8f98]">Protocol Definition</span></span>
          <span>Version: <span className="text-[#8a8f98]">v2.0</span></span>
        </div>
      </div>

      {/* Title */}
      <section className="section">
        <div className="section-inner">
          <h1 className="section-title text-[36px]">ClawFarm Whitepaper</h1>
          <p className="section-text" style={{fontSize:'18px', marginTop:'8px'}}>
            Decentralized AI Token Router
          </p>
          <p className="section-text" style={{marginTop:'24px', color:'var(--green)'}}>
            v2.0 — April 2026
          </p>
        </div>
      </section>

      {/* Abstract */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Abstract</div>
          <p className="section-text">
            ClawFarm is a permissionless, non-custodial AI token router and AI compute marketplace. Users, apps, and agents deposit USDC into on-chain escrow, choose an automatic routing mode (eco / auto / premium), and route AI requests across registered model, API, and GPU providers — without signing provider contracts, configuring many billing accounts, or trusting a central platform with their funds.
          </p>
          <p className="section-text" style={{marginTop:'16px'}}>
            Providers register on-chain with model endpoints, public pricing, and a $CLAF stake. The protocol routes requests, meters model-token consumption via dual-signed usage proofs, settles payments through smart contracts, and distributes rewards — all without admin override.
          </p>
          <p className="section-text" style={{marginTop:'24px', borderLeft:'3px solid var(--green)', paddingLeft:'16px', fontStyle:'italic'}}>
            <strong>Central Claim:</strong> ClawFarm turns AI model usage into a routable, metered, and settled on-chain market. Model/API/GPU providers compete on price, latency, and quality while users keep custody of funds in USDC escrow.
          </p>
        </div>
      </section>

      {/* 1. Problem */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">1. Problem Statement</div>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-4 mb-3">1.1 Centralized AI Inference Market</h3>
          <p className="section-text">
            Today&#39;s AI inference market is dominated by centralized intermediaries. Users must register with each provider individually, manage multiple API keys and billing accounts, and trust each platform with payment credentials. Providers must build their own payment infrastructure and accept opaque revenue splits.
          </p>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">1.2 Existing Decentralized AI Projects Fall Short</h3>
          <p className="section-text">
            Most decentralized AI compute networks suffer from subjective quality scoring, governance-controlled treasuries, verification theater, and high provider barriers.
          </p>
          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">1.3 The Gap</h3>
          <p className="section-text">
            No AI compute marketplace is simultaneously permissionless, non-custodial, transparent, and practical. ClawFarm fills this gap.
          </p>
        </div>
      </section>

      {/* 2. Architecture */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">2. Architecture Overview</div>
          <div className="panel mt-4">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>{`USER LAYER
  Wallet + ClawFarm SDK
  USDC Deposit/Withdraw · Route Selection
  Client-Side Token Counting · Usage Proof Signing
       │
       ▼
PROTOCOL LAYER (Solana Programs)
  Escrow · Provider Registry · Settlement
  Treasury · Reward Distribution
       │
       ▼
PROVIDER LAYER
  GPU Nodes · Cloud GPU · API Resellers · Custom Models`}</pre>
          </div>
        </div>
      </section>

      {/* 2b. Future Agent Commerce */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Future Use Case: Agent-to-Agent Commerce</div>
          <p className="section-text">
            The same routing, metering, and settlement primitives may support future
            agent-to-agent transactions such as data retrieval, evaluation, and tool
            execution. Today, ClawFarm&apos;s core focus is decentralized AI compute routing.
          </p>
          <div className="panel mt-4">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>{`AGENT / APP LAYER
  Apps · Agents · Demand Apps · Enterprise Frontends · StoryClaw
       │
       ▼
COMPUTE REGISTRY
  Models · GPUs · APIs · Routers · Custom Model Endpoints
       │
       ▼
PROTOCOL LAYER
  Escrow · Registry · Token Metering · Usage Proofs · Settlement · Rewards
       │
       ▼
PROVIDER LAYER
  Compute Providers · Model Providers · API Proxy Providers · GPU Nodes`}</pre>
          </div>
          <div className="grid-2 mt-6">
            {[
              ['1. Request specification', 'App or agent defines model, context, route mode, and price constraints.'],
              ['2. Provider discovery', 'The registry returns matching model, API, GPU, or router providers.'],
              ['3. Escrow authorization', 'USDC escrow authorizes spend without giving custody to a platform.'],
              ['4. Inference', 'The selected provider executes the AI request.'],
              ['5. Usage proof', 'Metered input and output tokens are signed and recorded.'],
              ['6. Settlement check', 'Dual signatures and token counts are validated.'],
              ['7. Settlement', 'Smart contracts pay providers from escrow after proof validation.'],
              ['8. Reward accounting', 'Verified token usage feeds supply-side and demand-side reward ledgers.'],
            ].map(([title, desc]) => (
              <div key={title} className="grid-cell">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Smart Contracts */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">3. Smart Contracts (Solana Programs)</div>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-6 mb-3">3.1 Escrow Contract</h3>
          <p className="section-text mb-4">Holds all user USDC in a Program Derived Address (PDA). No admin key can withdraw on behalf of a user.</p>
          <div className="panel">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>{`deposit(amount)  → USDC from wallet to PDA → update balance → emit event
withdraw(amount) → verify signature → check available → PDA to wallet
balance()        → available = deposited - settled - pending`}</pre>
          </div>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">3.2 Provider Registry</h3>
          <p className="section-text mb-4">Permissionless registration. Requires $CLAF stake as collateral.</p>
          <div className="panel">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>{`register_provider(endpoint, models[], pricing[], stake_amount)
  → verify minimum stake (1,000 $CLAF)
  → lock $CLAF in staking account
  → create on-chain ProviderAccount
  → status = Active`}</pre>
          </div>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">3.3 Settlement Contract</h3>
          <p className="section-text mb-4">Processes dual-signed usage proofs. Both user and provider must sign — neither can fabricate usage.</p>
          <div className="panel">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto" style={{padding:'18px 22px'}}>{`settle(usage_proofs[])
  for each proof:
    1. verify user_signature + provider_signature
    2. cost = input_tokens × input_price + output_tokens × output_price
    3. deduct from user escrow
    4. transfer 97% → provider wallet
    5. transfer 3% → treasury
    6. record verified token usage for rewards`}</pre>
          </div>

          <h3 className="text-[#e8e8e8] text-[16px] font-semibold mt-8 mb-3">3.4 Treasury Contract</h3>
          <p className="section-text mb-4">Non-discretionary buyback-and-burn engine. No governance.</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">Tax</span><span className="panel-value">3% of every settlement</span></div>
            <div className="panel-row"><span className="panel-label">Buyback Cycle</span><span className="panel-value">Every 24 hours (TWAP-adaptive)</span></div>
            <div className="panel-row"><span className="panel-label">Burn</span><span className="panel-value">All bought tokens → burn address</span></div>
            <div className="panel-row"><span className="panel-label">Governance</span><span className="panel-value" style={{color:'#ef4444'}}>NONE</span></div>
          </div>
        </div>
      </section>

      {/* 4. Routing Engine */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">4. Routing Engine</div>
          <p className="section-text">Off-chain but open-source. Runs client-side in the ClawFarm SDK. Reads on-chain Provider Registry.</p>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">eco</span><span className="panel-value">Lowest cost — score = 1/price</span></div>
            <div className="panel-row"><span className="panel-label">auto</span><span className="panel-value">Balanced — quality×0.4 + (1/price)×0.3 + (1/latency)×0.3</span></div>
            <div className="panel-row"><span className="panel-label">premium</span><span className="panel-value">Best model — quality×0.7 + tier×0.3</span></div>
          </div>
          <p className="section-text" style={{marginTop:'16px'}}>
            Routing signals: prompt length, tool calls, deep thinking flag, on-chain price table, historical quality scores, user preferences.
          </p>
        </div>
      </section>

      {/* 5. Verification */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">5. Usage Verification (4-Layer Hybrid)</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>Layer 1: Client-Side Counting</h4>
              <p>Input tokens: deterministic (tokenizer). Output tokens: stream counting. Independent of Provider.</p>
            </div>
            <div className="grid-cell">
              <h4>Layer 2: Dual Signature</h4>
              <p>User SDK + Provider both sign usage proof. Mismatch → no settlement.</p>
            </div>
            <div className="grid-cell">
              <h4>Layer 3: Sampling Audit</h4>
              <p>Random N% re-executed on different Provider. Deviation → dispute.</p>
            </div>
            <div className="grid-cell">
              <h4>Layer 4: Stake Slashing</h4>
              <p>On-chain evidence resolves disputes. Guilty → $CLAF stake slashed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Roles */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">6. Role Definitions</div>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <div className="grid-cell">
              <h4>User</h4>
              <p>Deposits USDC to escrow. Selects routing mode. Signs usage proofs. Earns $CLAF demand-side rewards below the core settlement flow. Withdraws anytime.</p>
            </div>
            <div className="grid-cell">
              <h4>Provider</h4>
              <p>Registers on-chain with stake. Serves inference. Sets own prices. Earns 97% revenue + $CLAF rewards.</p>
            </div>
            <div className="grid-cell">
              <h4>Protocol</h4>
              <p>Holds escrow (PDA). Settles payments. Computes rewards. Collects 3% tax. Burns $CLAF. No admin override.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Capital Flow */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">7. Capital Flow</div>
          <div className="panel mt-4">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-mid)', lineHeight:2, padding:'18px 22px'}}>{`User Escrow (PDA)
  ├─ dual-signature usage proof verified
  ├─ 97%  → Provider Wallet (on-chain transfer)
  └─  3%  → Treasury Contract (AI Agent Controlled)
              ├─ 70% → TWAP buyback $CLAF → burned
              ├─ 20% → Core development & Maintenance
              └─ 10% → Infrastructure Resilience (Mirror Nodes)`}</pre>
          </div>
        </div>
      </section>

      {/* 8. Reward Formula */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">8. Provider Reward Formula</div>
          <div className="panel mt-4">
            <pre style={{fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--green)', lineHeight:2, padding:'18px 22px'}}>{`W_i = Tokens_i × (P_avg / P_i) × Q_i

Reward_i = E_t × W_i / ΣW`}</pre>
            <div className="panel-row"><span className="panel-label">Tokens_i</span><span className="panel-value">Verified model-token usage delivered</span></div>
            <div className="panel-row"><span className="panel-label">P_avg / P_i</span><span className="panel-value">Cheaper = higher weight</span></div>
            <div className="panel-row"><span className="panel-label">Q_i</span><span className="panel-value">SuccessRate × LatencyScore × UptimeScore</span></div>
            <div className="panel-row"><span className="panel-label">E_t</span><span className="panel-value">Epoch $CLAF issuance pool</span></div>
          </div>

          <h3 className="text-[#e8e8e8] text-[15px] font-semibold mt-6 mb-3">Epoch Distribution</h3>
          <div className="panel mt-2">
            <div className="panel-row"><span className="panel-label">Supply-Side Pool (Providers)</span><span className="panel-value" style={{color:'var(--green)'}}>70% — weighted by W_i</span></div>
            <div className="panel-row"><span className="panel-label">Demand-Side Pool (Consumers)</span><span className="panel-value" style={{color:'var(--green)'}}>30% — verified AI token consumption</span></div>
          </div>
        </div>
      </section>

      {/* 9. Staking */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">9. Provider Staking</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Minimum Stake</span><span className="panel-value">1,000 $CLAF</span></div>
            <div className="panel-row"><span className="panel-label">Slash Conditions</span><span className="panel-value">Token count fraud, sustained downtime, response manipulation</span></div>
            <div className="panel-row"><span className="panel-label">Slash Amount</span><span className="panel-value">Up to 100% of stake</span></div>
            <div className="panel-row"><span className="panel-label">Unstaking Period</span><span className="panel-value">7 days (pending disputes)</span></div>
            <div className="panel-row"><span className="panel-label">Reward Vesting</span><span className="panel-value">180-day linear</span></div>
          </div>
        </div>
      </section>

      {/* 10. Anti-Gaming */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">10. Anti-Gaming</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>Self-Flooding</h4>
              <p>Requires real USDC payment. Circular patterns detected. Dual-sig adds coordination cost.</p>
            </div>
            <div className="grid-cell">
              <h4>Token Inflation</h4>
              <p>Client-side counting + dual-sig + sampling audit + stake slashing.</p>
            </div>
            <div className="grid-cell">
              <h4>Phantom Service</h4>
              <p>Q_i degrades to 0. Sampling audit detects unusable responses. Failed requests are excluded from verified token usage.</p>
            </div>
            <div className="grid-cell">
              <h4>Predatory Pricing</h4>
              <p>Low price × low quality = W_i ≈ 0. Formula self-corrects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Decentralization Guarantees */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">11. Decentralization Guarantees</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell">
              <h4>No fund custody</h4>
              <p>User USDC in PDA escrow. No human holds private key. Withdraw anytime.</p>
            </div>
            <div className="grid-cell">
              <h4>No whitelist</h4>
              <p>Providers register via contract call. Protocol cannot exclude a compliant Provider.</p>
            </div>
            <div className="grid-cell">
              <h4>No manual rewards</h4>
              <p>Formula-only allocation. No admin key. No special allocation.</p>
            </div>
            <div className="grid-cell">
              <h4>No centralized pricing</h4>
              <p>Each Provider sets own price on-chain. Routing by market signal.</p>
            </div>
            <div className="grid-cell">
              <h4>No subjective scoring</h4>
              <p>Quality = success rate × latency × uptime. Machine-verifiable only.</p>
            </div>
            <div className="grid-cell">
              <h4>No governance treasury</h4>
              <p>Buyback and burn is automatic. No allocation committee. No human spending.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Tokenomics */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">12. Tokenomics</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Token</span><span className="panel-value">$CLAF (SPL on Solana)</span></div>
            <div className="panel-row"><span className="panel-label">Total Supply</span><span className="panel-value">1,000,000,000 $CLAF</span></div>
            <div className="panel-row"><span className="panel-label">Release Horizon</span><span className="panel-value">10 years</span></div>
            <div className="panel-row"><span className="panel-label">Halving</span><span className="panel-value">Every 2 years</span></div>
            <div className="panel-row"><span className="panel-label">Epoch Duration</span><span className="panel-value">Configurable (default: 1 hour)</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">Inflation</span><span className="panel-value">Zero — distribution from fixed pool</span></div>
          </div>
        </div>
      </section>

      {/* 13. Comparison */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">13. vs. Centralized Aggregators</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Fund Custody</span><span className="panel-value">Smart contract escrow (not platform)</span></div>
            <div className="panel-row"><span className="panel-label">Provider Registration</span><span className="panel-value">Permissionless on-chain (not approval)</span></div>
            <div className="panel-row"><span className="panel-label">Revenue Split</span><span className="panel-value">97/3 enforced by contract (not opaque)</span></div>
            <div className="panel-row"><span className="panel-label">Routing</span><span className="panel-value">Open-source, client-side (not closed)</span></div>
            <div className="panel-row"><span className="panel-label">Settlement</span><span className="panel-value">On-chain, verifiable (not off-chain)</span></div>
            <div className="panel-row"><span className="panel-label">Token Counting</span><span className="panel-value">Dual-sign + client verify (not trust)</span></div>
            <div className="panel-row"><span className="panel-label">Governance</span><span className="panel-value">None — code is law</span></div>
          </div>
        </div>
      </section>

      {/* 14. Roadmap */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">14. Roadmap</div>
          <div className="grid-2 mt-6">
            <div className="grid-cell" style={{borderTop:'2px solid var(--green)'}}>
              <h4>Phase 1: Foundation (Q2 2026)</h4>
              <p>Deploy Escrow, Registry, Settlement on devnet. Open-source SDK with routing. Testnet launch. Initial Provider onboarding.</p>
            </div>
            <div className="grid-cell" style={{borderTop:'2px solid var(--accent)'}}>
              <h4>Phase 2: Mainnet (Q3 2026)</h4>
              <p>Mainnet deployment + audit. $CLAF token launch. Provider staking + slashing. Sampling audit live. Public API + SDK.</p>
            </div>
            <div className="grid-cell" style={{borderTop:'2px solid var(--amber)'}}>
              <h4>Phase 3: Full Decentralization (Q4 2026)</h4>
              <p>Client-side routing (no relay). Upgrade authority renounced. Cross-chain USDC deposits. Community relay nodes. Mobile SDK.</p>
            </div>
            <div className="grid-cell" style={{borderTop:'2px solid var(--text-dim)'}}>
              <h4>Phase 4: Maturity (2027)</h4>
              <p>ZK proofs for token counting. Multi-chain providers. Inference marketplace (jobs + bids). Protocol-level SLA enforcement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Conclusion</div>
          <p className="section-text">
            ClawFarm is not another centralized aggregator on a blockchain. It is a fundamentally different architecture: users own their funds, providers own their business, and the protocol owns nothing — it executes rules, collects 3%, and burns tokens.
          </p>
          <p className="section-text" style={{marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'13px', borderLeft:'3px solid var(--green)', paddingLeft:'16px'}}>
            Compute is permissionless. Payment is trustless. Rewards follow contribution.
          </p>
          <p className="section-text" style={{marginTop:'16px', fontSize:'12px', color:'var(--text-dim)'}}>
            Official $CLAF Token Mirror: [https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/](https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/)
          </p>
        </div>
      </section>

      {/* Appendix */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Appendix A. Genesis Parameters</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Chain</span><span className="panel-value">Solana</span></div>
            <div className="panel-row"><span className="panel-label">Fund Custody</span><span className="panel-value">PDA Escrow (non-custodial)</span></div>
            <div className="panel-row"><span className="panel-label">Provider Revenue</span><span className="panel-value">97% of payment</span></div>
            <div className="panel-row"><span className="panel-label">Protocol Tax</span><span className="panel-value">3% → Treasury</span></div>
            <div className="panel-row"><span className="panel-label">Supply-Side Pool</span><span className="panel-value">70% of Epoch issuance</span></div>
            <div className="panel-row"><span className="panel-label">Demand-Side Pool</span><span className="panel-value">30% of Epoch issuance for verified demand</span></div>
            <div className="panel-row"><span className="panel-label">Min Provider Stake</span><span className="panel-value">1,000 $CLAF</span></div>
            <div className="panel-row"><span className="panel-label">Unstaking Period</span><span className="panel-value">7 days</span></div>
            <div className="panel-row"><span className="panel-label">Vesting</span><span className="panel-value">180-day linear</span></div>
            <div className="panel-row"><span className="panel-label">Total Supply</span><span className="panel-value">1,000,000,000 $CLAF</span></div>
            <div className="panel-row"><span className="panel-label">Halving</span><span className="panel-value">Every 2 years</span></div>
            <div className="panel-row"><span className="panel-label">Routing Modes</span><span className="panel-value">eco / auto / premium</span></div>
            <div className="panel-row"><span className="panel-label">Verification</span><span className="panel-value">Dual-signature + sampling audit</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
