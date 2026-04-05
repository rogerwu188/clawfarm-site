import Link from 'next/link'

export const metadata = {
  title: 'For Builders — ClawFarm | The AI Compute Protocol',
  description: 'Integrate decentralized AI compute into your apps. Open-source SDK, on-chain settlement, and protocol-level routing. No billing infrastructure to manage.',
  keywords: 'AI SDK, decentralized AI, Solana AI, AI infrastructure, DePIN protocol, AI dApps, on-chain billing',
  openGraph: {
    title: 'ClawFarm — Build the Future of AI',
    description: 'The open-source protocol for decentralized AI compute. Integrate via the ClawFarm SDK. Settlement is automatic and on-chain.',
    url: 'https://www.clawfarm.network/builders',
    siteName: 'ClawFarm',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm — Build the Future of AI',
    description: 'Integrate decentralized AI compute into your apps. Settlement is handled on-chain—no billing systems to manage.',
    site: '@ClawFarm54892',
    creator: '@ClawFarm54892',
  },
}

export default function Builders() {
  return (
    <main>
      <section className="section" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <p style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'12px'}}>FOR BUILDERS</p>
          <h1 className="section-title" style={{fontSize:'38px', lineHeight:1.2}}>
            Build AI DApps<br />Without Billing Risk.
          </h1>
          <p style={{marginTop:'20px', fontSize:'17px', color:'var(--text-mid)', lineHeight:1.7, maxWidth:'680px'}}>
            ClawFarm is a programmable protocol for AI compute. Integrate a single SDK to access any model on the network. Settlement is handled automatically by the Solana smart contract—no Stripe, no invoices, no platform counterparty risk.
          </p>
          <div style={{marginTop:'24px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <Link href="/docs" className="btn-primary">Integrate SDK</Link>
            <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="btn-secondary">Protocol Source</a>
            <Link href="/whitepaper" className="btn-secondary">Technical Specs</Link>
          </div>
        </div>
      </section>

      {/* Protocol Architecture */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>THE PROTOCOL</h2>
          <p style={{fontSize:'14px', color:'var(--text-mid)', marginBottom:'24px'}}>The open-source stack for decentralized AI inference.</p>
          
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'24px'}}>
            <div style={{border:'1px solid var(--border)', borderRadius:'8px', padding:'24px'}}>
              <h3 style={{fontSize:'16px', fontWeight:700, marginBottom:'12px'}}>ClawFarm Gateway (SDK)</h3>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Client-side routing engine. Discovers providers from the on-chain registry, manages dual-signature usage proofs, and handles failover across the network.</p>
              <div style={{marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)'}}>open-source · client-side · non-custodial</div>
            </div>
            <div style={{border:'1px solid var(--border)', borderRadius:'8px', padding:'24px'}}>
              <h3 style={{fontSize:'16px', fontWeight:700, marginBottom:'12px'}}>Solana Programs</h3>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Non-custodial escrow (PDA), Provider Registry, and the Settlement Engine. Validates usage receipts and disperses payments in one atomic transaction.</p>
              <div style={{marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--accent)'}}>non-upgradable · audited · on-chain</div>
            </div>
            <div style={{border:'1px solid var(--border)', borderRadius:'8px', padding:'24px'}}>
              <h3 style={{fontSize:'16px', fontWeight:700, marginBottom:'12px'}}>Provider Registry</h3>
              <h4 style={{fontSize:'14px', fontWeight:700, marginBottom:'12px'}}>Provider Nodes</h4>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Permissionless nodes serving inference. Any GPU node can join the registry by staking CLAW and publishing a price table. Performance metrics are recorded on-chain.</p>
              <div style={{marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--amber)'}}>permissionless · staked · competitive</div>
            </div>
            <div style={{border:'1px solid var(--border)', borderRadius:'8px', padding:'24px'}}>
              <h3 style={{fontSize:'16px', fontWeight:700, marginBottom:'12px'}}>Settlement Protocol</h3>
              <p style={{fontSize:'14px', color:'var(--text-mid)', lineHeight:1.6}}>Real-time metering and payments. Every token is accounted for. Payments flow directly from the user's escrow account to the Provider's wallet.</p>
              <div style={{marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--green)'}}>low latency · 0.97/0.03 split · automatic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Code */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>SDK INTEGRATION</h2>
          <h3 className="section-title" style={{fontSize:'24px'}}>One interface for every model.</h3>
          <div style={{marginTop:'24px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden'}}>
            <div style={{padding:'12px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-dim)'}}>ClawFarm Builder SDK</span>
              <span style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)'}}>npm install @clawfarm/sdk</span>
            </div>
            <pre style={{padding:'20px 24px', fontFamily:'var(--font-mono)', fontSize:'13px', color:'#9ca3af', lineHeight:1.8, overflowX:'auto', margin:'0'}}>{`import { ClawFarm } from '@clawfarm/sdk'

// Connect using your protocol wallet
const cf = new ClawFarm({ 
  wallet: yourAppWallet,
  routing: 'auto' // Balance cost and quality
})

// Single call to GPT-4o or any other model
const response = await cf.chat({
  messages: [{ role: 'user', content: 'Design a DeFi protocol' }],
  model: 'gpt-4o' // or 'claude-3-sonnet', 'deepseek-r1'
})

// Payment happens automatically on-chain
console.log('Cost:', response.cost, 'USDC')
console.log('Tx:', response.txHash)`}</pre>
          </div>
        </div>
      </section>

      {/* Builder Benefits */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>BENEFITS FOR BUILDERS</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'24px', marginTop:'24px'}}>
            <div>
              <h4 style={{fontSize:'15px', fontWeight:700, marginBottom:'8px'}}>Single Endpoint</h4>
              <p style={{fontSize:'13px', color:'var(--text-mid)', lineHeight:1.6}}>Access GPT, Claude, Gemini, Llama, and DeepSeek through a single protocol interface. No more managing 10+ API keys.</p>
            </div>
            <div>
              <h4 style={{fontSize:'15px', fontWeight:700, marginBottom:'8px'}}>On-Chain Settlement</h4>
              <p style={{fontSize:'13px', color:'var(--text-mid)', lineHeight:1.6}}>Forget Stripe and billing logic. Users pay the protocol directly via non-custodial escrow. Your app is just the conduit.</p>
            </div>
            <div>
              <h4 style={{fontSize:'15px', fontWeight:700, marginBottom:'8px'}}>Permissionless</h4>
              <p style={{fontSize:'13px', color:'var(--text-mid)', lineHeight:1.6}}>No KYC, no platform bans, no counterparty risk. If you have a wallet and USDC, you have compute.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Builder FAQ */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', letterSpacing:'1px', marginBottom:'8px'}}>BUILDER FAQ</h2>
          <div style={{marginTop:'28px', display:'flex', flexDirection:'column', gap:'0'}}>
            {[
              {
                q:'Is the routing logic centralized?',
                a:'No. The routing engine is part of the ClawFarm SDK and runs client-side in your app or backend. It reads the Provider Registry directly from the Solana blockchain.'
              },
              {
                q:'How do I handle user payments in my app?',
                a:'The simplest way is to let users connect their own wallets and deposit into the ClawFarm escrow contract. Your app then signs requests on their behalf, and the protocol handles the per-token settlement.'
              },
              {
                q:'What if I want to pay for my users?',
                a:'You can create a "Master Pool" for your app wallet and deposit USDC. Your app can then subsidize inference for your users. The metering and settlement remains the same.'
              },
              {
                q:'Which chains are supported?',
                a:'ClawFarm is currently live on Solana Mainnet for low-cost, high-speed settlement.'
              },
            ].map((faq, i) => (
              <div key={i} style={{borderBottom: i < 3 ? '1px solid var(--border)' : 'none', padding:'20px 0'}}>
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
              <h4 style={{fontSize:'18px', fontWeight:700, marginBottom:'6px'}}>Ready to build?</h4>
              <p style={{fontSize:'13px', color:'var(--text-mid)'}}>Integrate the SDK today and build decentralized AI apps.</p>
            </div>
            <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
              <Link href="/docs" className="btn-primary">Developer Docs</Link>
              <a href="https://github.com/rogerwu188/clawfarm-gateway" target="_blank" rel="noopener" className="btn-secondary">Source Code</a>
              <Link href="/whitepaper" className="btn-secondary">Protocol</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
