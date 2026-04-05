import Link from 'next/link'

export const metadata = {
  title: 'For Users — ClawFarm | Decentralized AI Compute',
  description: 'Connect your Solana wallet, deposit USDC, and access any AI model through decentralized routing. Non-custodial escrow. eco / auto / premium modes. Start integrating in minutes.',
  keywords: 'decentralized AI inference, Solana AI, non-custodial AI, AI compute marketplace, GPU compute, DePIN, AI routing, USDC escrow, Solana DeFi',
  openGraph: {
    title: 'ClawFarm — Decentralized AI Compute Network',
    description: 'One wallet. All AI models. Zero platform risk. Route AI requests through eco, auto, or premium mode. Settlement is automatic and on-chain.',
    url: 'https://www.clawfarm.network/users',
    siteName: 'ClawFarm',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.clawfarm.network/og-users.png',
        width: 1200,
        height: 630,
        alt: 'ClawFarm — Decentralized AI Compute for Users',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm — Decentralized AI Compute Network',
    description: 'One wallet. All AI models. Zero platform risk. Non-custodial USDC escrow. eco / auto / premium routing.',
    site: '@ClawFarm54892',
    creator: '@ClawFarm54892',
  },
  alternates: {
    canonical: 'https://www.clawfarm.network/users',
  },
}

export default function Users() {
  return (
    <main>
      {/* Page header — SSR H1 */}
      <section className="section" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'12px'}}>FOR USERS</p>
          <h1 className="section-title" style={{fontSize:'38px', lineHeight:1.2}}>
            The Decentralized Gateway<br />to All AI Models.
          </h1>
          <p style={{marginTop:'20px', fontSize:'17px', color:'var(--text-mid)', lineHeight:1.7, maxWidth:'680px'}}>
            Connect your Solana wallet to access every major AI model through non-custodial routing. No individual sign-ups. No billing accounts. No platform lock-in. Pay only for the tokens you use.
          </p>
          <div style={{marginTop:'24px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <Link href="/docs" className="btn-primary">Start Integrating</Link>
            <Link href="/providers" className="btn-secondary">Browse Providers</Link>
            <Link href="/whitepaper" className="btn-secondary">Read the Whitepaper</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>HOW IT WORKS</h2>
          <p style={{fontSize:'14px', color:'var(--text-mid)', marginBottom:'24px'}}>Seven steps from wallet connection to automatic settlement — all on-chain.</p>
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            {[
              {n:'01', t:'Connect your Solana wallet', d:'Use Phantom, Solflare, Backpack, or any Solana wallet. No email, no sign-up form.'},
              {n:'02', t:'Deposit USDC into the Escrow Contract', d:'Your USDC goes to a Program Derived Address (PDA) controlled by the ClawFarm smart contract. No human holds your private key.'},
              {n:'03', t:'Select a routing mode', d:'eco — cheapest. auto — best balance. premium — highest quality. Or specify a model directly.'},
              {n:'04', t:'Send your AI request', d:'The ClawFarm SDK routes your request to the optimal Provider based on real-time on-chain data.'},
              {n:'05', t:'Usage proof is generated and signed', d:'Token counting happens client-side. Both you and the Provider sign the usage receipt independently.'},
              {n:'06', t:'Contract settles automatically', d:'97% of the USDC goes directly to the Provider wallet. 3% to Treasury. All in one on-chain transaction.'},
              {n:'07', t:'Withdraw your balance anytime', d:'Your available USDC balance (total minus pending settlements) can be withdrawn at any moment. No lock-up. No approval.'},
            ].map((f, i) => (
              <div key={i} style={{display:'flex', gap:'16px', padding:'16px 0', borderBottom: i < 6 ? '1px solid var(--border)' : 'none'}}>
                <span style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)', fontWeight:700, width:'28px', flexShrink:0}}>{f.n}</span>
                <div>
                  <p style={{fontWeight:600, fontSize:'15px', color:'var(--text)'}}>{f.t}</p>
                  <p style={{fontSize:'13px', color:'var(--text-mid)', marginTop:'4px', lineHeight:1.6}}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing modes */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>ROUTING MODES</h2>
          <h3 className="section-title" style={{fontSize:'24px'}}>Three modes. Automatic. Transparent.</h3>
          <p style={{marginTop:'12px', fontSize:'14px', color:'var(--text-mid)', lineHeight:1.7, marginBottom:'28px'}}>
            The routing engine is open-source and runs client-side in the ClawFarm SDK. It reads the on-chain Provider Registry — real-time prices and quality scores — then selects the optimal Provider for each request. No black box.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <div style={{borderTop:'3px solid var(--green)', padding:'20px 0 0'}}>
              <h4 style={{fontSize:'16px', fontWeight:700, color:'var(--green)', marginBottom:'8px'}}>eco</h4>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Routes to the cheapest qualified Provider. Best for bulk processing, background tasks, and non-critical inference.</p>
              <p style={{marginTop:'12px', fontSize:'12px', color:'var(--text-dim)'}}>Best for: summarization, classification, batch processing, cost-sensitive workloads</p>
            </div>
            <div style={{borderTop:'3px solid var(--accent)', padding:'20px 0 0'}}>
              <h4 style={{fontSize:'16px', fontWeight:700, color:'var(--accent)', marginBottom:'8px'}}>auto</h4>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Balanced routing across cost, quality, and latency. The default mode for most use cases.</p>
              <p style={{marginTop:'12px', fontSize:'12px', color:'var(--text-dim)'}}>Best for: general-purpose usage, chatbots, coding assistants, content generation</p>
            </div>
            <div style={{borderTop:'3px solid var(--amber)', padding:'20px 0 0'}}>
              <h4 style={{fontSize:'16px', fontWeight:700, color:'var(--amber)', marginBottom:'8px'}}>premium</h4>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Routes to the highest-tier model available. Maximum quality for complex reasoning and deep analysis.</p>
              <p style={{marginTop:'12px', fontSize:'12px', color:'var(--text-dim)'}}>Best for: complex reasoning, code generation, deep research, agentic workflows</p>
            </div>
          </div>
        </div>
      </section>

      {/* Routing signals */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>ROUTING SIGNALS</h2>
          <h3 className="section-title" style={{fontSize:'24px'}}>The router reads these signals from on-chain data.</h3>
          <div style={{marginTop:'24px', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden'}}>
            {[
              {l:'Prompt length', v:'Filters Providers that support the required context window'},
              {l:'Tool calls', v:'Routes to Providers with function-calling enabled models'},
              {l:'Deep thinking flag', v:'Routes to reasoning models (o1, Claude with thinking, R1 series)'},
              {l:'Real-time price table', v:'On-chain Provider Registry, updated at each settlement'},
              {l:'Quality score', v:'Historical success rate, latency, and uptime from on-chain metrics'},
              {l:'User preference', v:'Optional model whitelist or blacklist via SDK configuration'},
            ].map((r, i) => (
              <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom: i < 5 ? '1px solid var(--border)' : 'none', gap:'24px'}}>
                <span style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text)', fontWeight:500, flexShrink:0}}>{r.l}</span>
                <span style={{fontSize:'13px', color:'var(--text-mid)', textAlign:'right'}}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-custodial */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>NON-CUSTODIAL GUARANTEE</h2>
          <h3 className="section-title" style={{fontSize:'24px'}}>Your USDC. Your control. Always.</h3>
          <p style={{marginTop:'12px', fontSize:'14px', color:'var(--text-mid)', lineHeight:1.7, marginBottom:'28px'}}>
            Unlike centralized AI API platforms, ClawFarm never holds your funds. Your USDC lives in a smart contract. The contract logic — not any human or company — moves your money.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'16px'}}>
            {[
              {t:'Program-Owned Account (PDA)', p:'Your USDC is held in a Solana PDA. Only the ClawFarm program can authorize transfers — and only for valid settlements. No back door.'},
              {t:'Withdraw Anytime', p:'Your available balance (total minus pending settlements) is always withdrawable. No lock-up. No KYC. No approval queue.'},
              {t:'On-Chain Balance', p:'Your balance is a real Solana token account. Verify it on Solscan or any block explorer. Not a number in a company database.'},
              {t:'Transparent Billing', p:'Every inference call generates a full paper trail: Provider, model, token counts, price, USDC deducted, settlement transaction hash.'},
            ].map((b, i) => (
              <div key={i} style={{border:'1px solid var(--border)', borderRadius:'8px', padding:'20px'}}>
                <h4 style={{fontSize:'14px', fontWeight:700, marginBottom:'10px'}}>{b.t}</h4>
                <p style={{fontSize:'13px', color:'var(--text-mid)', lineHeight:1.6}}>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demand-Side Rewards (Usage Mining) */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">USAGE MINING</div>
          <h3 className="section-title" style={{fontSize:'24px'}}>Earn $CLAF while you spend on inference.</h3>
          <p style={{marginTop:'12px', fontSize:'14px', color:'var(--text-mid)', lineHeight:1.7}}>
            30% of each Epoch's $CLAF token issuance is distributed to the Demand-Side Pool. Your share is proportional to your verified token consumption. This "Usage Mining" effectively lowers your compute costs as the network grows. No staking required. No claiming step. It accrues automatically.
          </p>
          <div style={{marginTop:'20px', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden', maxWidth:'520px'}}>
            {[
              {l:'Pool size', v:'30% of Epoch $CLAF issuance'},
              {l:'Distribution basis', v:'Proportional to USDC spent on inference'},
              {l:'Vesting', v:'180-day linear from accrual'},
              {l:'Claim required', v:'No — automatic accrual'},
            ].map((r, i) => (
              <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'12px 20px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', gap:'24px'}}>
                <span style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-dim)'}}>{r.l}</span>
                <span style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--green)', fontWeight:500}}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick start code */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>QUICK START</h2>
          <h3 className="section-title" style={{fontSize:'24px'}}>Integrate in under five minutes.</h3>
          <div style={{marginTop:'24px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden'}}>
            <div style={{padding:'12px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-dim)'}}>TypeScript / JavaScript</span>
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>npm install @clawfarm/sdk</span>
            </div>
            <pre style={{padding:'20px 24px', fontFamily:'var(--font-mono)', fontSize:'13px', color:'#9ca3af', lineHeight:1.8, overflowX:'auto', margin:'0'}}>{`import { ClawFarm } from '@clawfarm/sdk'

// 1. Connect wallet
const cf = new ClawFarm({ wallet: yourSolanaWallet })

// 2. Deposit USDC into escrow
await cf.deposit({ amount: 100 })  // 100 USDC

// 3. Send a request — auto routing
const response = await cf.chat({
  mode: 'auto',
  messages: [
    { role: 'user', content: 'Explain ZK proofs simply' }
  ],
})

// Full transparency after each call:
response.provider    // '0x7a3f...e2c1'
response.model      // 'GPT-4o'
response.tokens     // { input: 42, output: 318 }
response.cost       // 0.000031 USDC
response.txHash     // on-chain settlement tx

// 4. Check balance anytime
const balance = await cf.balance()

// 5. Withdraw — no lock-up
await cf.withdraw({ amount: 50 })  // back to your wallet`}</pre>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>FREQUENTLY ASKED</h2>
          <h3 className="section-title" style={{fontSize:'24px'}}>Common questions from users.</h3>
          <div style={{marginTop:'28px', display:'flex', flexDirection:'column', gap:'0'}}>
            {[
              {
                q:'Do I need a crypto wallet to use ClawFarm?',
                a:'Yes. Any Solana wallet works — Phantom, Solflare, Backpack, Glow, or hardware wallets. You need a small amount of SOL for transaction fees. Your AI inference budget is in USDC, which you deposit into the escrow contract.'
              },
              {
                q:'Is my USDC safe? Can the platform take it?',
                a:"Your USDC is held in a Program Derived Address (PDA) controlled by the ClawFarm Solana program. The program can only move your USDC to settle valid inference requests. It cannot freeze your funds, transfer them to the team, or do anything outside its defined logic. You can verify the contract code on-chain."
              },
              {
                q:'How is ClawFarm different from buying API keys directly from OpenAI or Anthropic?',
                a:'With centralized providers, you sign up, give them your credit card, and they can rate-limit or ban you at any time. On ClawFarm, your funds are in a smart contract you control. Multiple Providers compete for your traffic — lowering prices. And settlement is automatic: no invoices, no payment delays.'
              },
              {
                q:'What is the eco / auto / premium routing?',
                a:"eco routes to the cheapest Provider that meets your request requirements. auto balances cost, quality, and latency. premium routes to the highest-capability model. You can also bypass routing and specify a model or Provider directly via the SDK."
              },
              {
                q:'How does billing work?',
                a:"You're billed per token — input tokens and output tokens at the Provider's published rate. Each settlement transaction deducts USDC from your escrow balance and sends 97% to the Provider and 3% to the Treasury contract in one atomic on-chain transaction."
              },
              {
                q:'What is the $CLAF token and do I need it?',
                a:"$CLAF is the protocol token. You don't need $CLAF to use the network — inference is paid in USDC. $CLAF is earned by Providers as staking rewards and by users as Usage Mining rewards. It accrues automatically; no claiming step required."
              },
              {
                q:'Can I see my usage history?',
                a:'Yes. Every inference call produces an on-chain settlement record with: Provider address, model, token counts, cost, and transaction hash. You can query the smart contract directly or use the ClawFarm block explorer at masterpool.clawfarm.network.'
              },
              {
                q:'What happens if a Provider goes offline mid-request?',
                a:'The ClawFarm SDK has built-in failover. If a Provider times out or returns an error, the request is automatically retried with the next best Provider based on your routing mode. You only pay for successful settlements.'
              },
              {
                q:'Is there a minimum deposit?',
                a:'There is no minimum deposit. However, each inference call requires a small USDC balance in escrow. We recommend at least $5–10 for initial usage to account for settlement fees.'
              },
              {
                q:'How do I stop using ClawFarm?',
                a:"You can withdraw your entire available USDC balance at any time — there is no lock-up and no penalty. Your funds are always yours. Simply call the withdraw function from your connected wallet."
              },
            ].map((faq, i) => (
              <div key={i} style={{borderBottom: i < 9 ? '1px solid var(--border)' : 'none', padding:'20px 0'}}>
                <h4 style={{fontSize:'15px', fontWeight:600, marginBottom:'10px', lineHeight:1.4}}>{faq.q}</h4>
                <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.7}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px', padding:'28px', border:'1px solid var(--border)', borderRadius:'8px'}}>
            <div>
              <h4 style={{fontSize:'18px', fontWeight:700, marginBottom:'6px'}}>Ready to start?</h4>
              <p style={{fontSize:'13px', color:'var(--text-mid)'}}>Browse the full provider list, read the SDK docs, or connect your wallet.</p>
            </div>
            <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
              <Link href="/providers" className="btn-primary">Browse Providers</Link>
              <Link href="/docs" className="btn-secondary">Read Docs</Link>
              <Link href="/whitepaper" className="btn-secondary">Whitepaper</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
