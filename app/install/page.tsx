import Link from 'next/link'

export const metadata = { title: 'Install — ClawFarm', description: 'Connect Your Runtime to the ClawFarm Network' }

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Provider Integration</span></span>
          <span>Skill Version: <span className="text-[#8a8f98]">1.0</span></span>
          <span>Runtime: <span className="text-[#8a8f98]">Bash + curl + jq</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Install the ClawFarm Skill</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            Install the Skill into your runtime, ClawBox, or OpenClaw environment so token usage inside the ecosystem becomes metered network activity eligible for settlement and rewards.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel" style={{borderLeft:'3px solid var(--green)'}}>
            <p className="section-text" style={{fontSize:'15px'}}>
              <strong>The Skill turns token consumption inside a compatible runtime, ClawBox, or OpenClaw environment from internal cost into metered protocol activity.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">What changes after install</div>
          
          <div className="grid-2 mt-6" style={{gap:'32px'}}>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>BEFORE INSTALLATION</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> token usage remains an internal operating cost</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> execution stays inside your local runtime or provider stack</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> no protocol accounting</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--red)'}}>×</span> no reward eligibility</li>
              </ul>
            </div>
            <div>
              <p className="section-text" style={{color:'var(--green)', marginBottom:'16px'}}>AFTER INSTALLATION</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> token usage is metered by the ClawFarm Skill</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> billed consumption is recorded as network activity</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> execution inside OpenClaw / ClawBox can enter settlement</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> eligible usage can earn protocol token rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid-4 mt-6" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
            {[
              {title:'runtime integration', desc:'compatible runtime or provider stack'},
              {title:'usage metering', desc:'token consumption tracked'},
              {title:'settlement eligibility', desc:'enters protocol accounting'},
              {title:'network rewards', desc:'eligible for token issuance'},
            ].map((c, i) => (
              <div key={i} className="grid-cell">
                <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em'}}>{c.title}</h4>
                <p className="section-small" style={{marginTop:'8px'}}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Minimum requirements</div>
          <ul className="space-y-3 text-[#8a8f98] text-[14px]">
            <li>· compatible runtime or provider stack</li>
            <li>· access to token-billed model execution</li>
            <li>· ClawFarm Skill installation path</li>
            <li>· wallet / settlement address (Solana)</li>
            <li>· OpenClaw or ClawBox compatibility (if applicable)</li>
            <li>· network connectivity for usage reporting</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Steps</div>
          <div className="space-y-0">
            {[
              'Install the ClawFarm Skill into your runtime',
              'Configure provider stack or OpenClaw environment',
              'Bind settlement wallet address',
              'Connect to ClawFarm network',
              'Start reporting metered usage',
              'Become settlement-eligible and earn rewards',
            ].map((s, i) => (
              <div key={i} className="seq-item">
                <span className="seq-num">{i + 1}</span>
                <span className="seq-text">{s}</span>
              </div>
            ))}
          </div>

          <div className="panel mt-10">
            <div className="text-xs text-[#505560] tracking-widest uppercase mb-4">Quick install</div>
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`git clone https://github.com/rogerwu188/clawfarm-skill.git
cd clawfarm-skill && chmod +x clawfarm.sh

./clawfarm.sh config --wallet <SOLANA_ADDRESS>
./clawfarm.sh register
./clawfarm.sh status`}
            </pre>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">After integration</div>
          <p className="section-text">
            Your runtime becomes connected to the ClawFarm network.<br />
            Token usage is metered and recorded as protocol activity.<br />
            Eligible consumption enters settlement and earns token rewards.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/install" className="btn-primary">Download Skill</Link>
            <Link href="/docs" className="btn-secondary">Read Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">Open GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}
