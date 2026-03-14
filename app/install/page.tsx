import Link from 'next/link'

export const metadata = { title: 'Install — ClawFarm', description: 'Install ClawFarm Gateway - The Trusted Usage Meter' }

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Gateway Installation</span></span>
          <span>Version: <span className="text-[#8a8f98]">1.0</span></span>
          <span>Security: <span className="text-[#8a8f98]">Gateway-Verified</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Install ClawFarm Gateway</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            The Gateway is the only trusted usage meter in the ClawFarm network. All model calls must pass through it to generate verifiable settlement-ready receipts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel" style={{borderLeft:'3px solid var(--green)'}}>
            <p className="section-text" style={{fontSize:'15px'}}>
              <strong>The Gateway is the source of truth. Only Gateway-verified usage generates settlement-valid receipts.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Why Gateway?</div>
          <div className="grid-2 mt-6" style={{gap:'32px'}}>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>CLIENT-REPORTED USAGE (UNTRUSTED)</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> Skill can be modified</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> Usage payload can be faked</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> Calls can bypass Skill</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> No verification</li>
              </ul>
            </div>
            <div>
              <p className="section-text" style={{color:'var(--green)', marginBottom:'16px'}}>GATEWAY-VERIFIED USAGE (TRUSTED)</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Gateway is the only exit point</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Real request/response logged</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Token usage verified from response</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Gateway-signed receipt</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Data Models - Updated for Gateway */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Core Objects</div>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            {[
              {title:'Gateway', desc:'Trusted router, usage meter, receipt generator'},
              {title:'VerifiedUsageReceipt', desc:'Settlement-valid, gateway-signed usage record'},
              {title:'SettlementEpoch', desc:'15-minute settlement interval'},
              {title:'RewardAllocation', desc:'Per-epoch reward distribution'},
              {title:'VestingEntry', desc:'180-day linear unlock schedule'},
              {title:'AgentDAO', desc:'Autonomous governance'},
            ].map((m, i) => (
              <div key={i} className="grid-cell">
                <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>{m.title}</h4>
                <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Usage Receipt Structure */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Verified Usage Receipt</div>
          <div className="panel mt-4">
            <pre className="text-[11px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`{
  "receipt_id": "vur_xxx",
  "gateway_id": "gw_xxx",           // Gateway that generated this receipt
  "provider_id": "prov_xxx",
  "node_id": "node_xxx",
  "runtime_id": "rt_xxx",
  "skill_id": "skill_xxx",
  "task_id": "task_xxx",
  "model": "gpt-4.1",
  "input_tokens": 1200,
  "output_tokens": 3400,
  "total_tokens": 4600,
  "billed_amount_usd": "0.92",
  "timestamp": "2026-03-14T10:30:00Z",
  "nonce": 12345,
  "eligible": true,
  "eligibility_reason": "gateway_verified_billed_usage",
  "epoch_id": "epoch_20260314_10:30",
  "gateway_signature": "ed25519_xxx"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Integration Flow */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Gateway Integration Flow</div>
          <div className="space-y-0 mt-6">
            {[
              {step:'1', title:'Install Gateway', desc:'Download and configure Gateway on your ClawBox'},
              {step:'2', title:'Register Gateway', desc:'Gateway registers with network, receives identity'},
              {step:'3', title:'Skill Calls Gateway', desc:'All model calls route through Gateway'},
              {step:'4', title:'Gateway Forwards', desc:'Gateway calls model provider, receives response'},
              {step:'5', title:'Generate Receipt', desc:'Gateway creates signed VerifiedUsageReceipt'},
              {step:'6', title:'Epoch Aggregation', desc:'Receipts aggregated per 15-min epoch'},
              {step:'7', title:'Settlement', desc:'Verified receipts enter reward distribution'},
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

      {/* Settlement Rules */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Settlement Rules</div>
          <div className="grid-2 mt-4" style={{gap:'16px'}}>
            <div className="panel">
              <div className="panel-row"><span className="panel-label">Epoch Duration</span><span className="panel-value">15 minutes</span></div>
              <div className="panel-row"><span className="panel-label">Reward Basis</span><span className="panel-value">Verified Usage</span></div>
              <div className="panel-row"><span className="panel-label">Receipt Validity</span><span className="panel-value">Gateway-Signed Only</span></div>
              <div className="panel-row"><span className="panel-label">Settlement Trigger</span><span className="panel-value">Epoch Complete</span></div>
            </div>
            <div className="panel">
              <div className="panel-row"><span className="panel-label">Vesting Period</span><span className="panel-value">180 days linear</span></div>
              <div className="panel-row"><span className="panel-label">Treasury Tax</span><span className="panel-value">3% of billed</span></div>
              <div className="panel-row"><span className="panel-label">Governance</span><span className="panel-value">Agent DAO</span></div>
              <div className="panel-row"><span className="panel-label">Chain</span><span className="panel-value">Solana</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Install */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Quick Install</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Install ClawFarm Gateway
git clone https://github.com/rogerwu188/clawfarm-gateway.git
cd clawfarm-gateway && chmod +x gateway.sh

# Configure with your wallet
./gateway.sh config --wallet <SOLANA_ADDRESS>

# Register Gateway with network
./gateway.sh register

# Start Gateway (becomes trusted router)
./gateway.sh start

# Check status
./gateway.sh status`}
            </pre>
          </div>
        </div>
      </section>

      {/* After Installation */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">After Gateway Installation</div>
          <p className="section-text">
            The Gateway becomes the only trusted exit point for all model calls.<br />
            Every call generates a Verified Usage Receipt.<br />
            Only verified receipts enter settlement and earn rewards.
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
