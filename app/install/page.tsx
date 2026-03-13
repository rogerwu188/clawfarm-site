import Link from 'next/link'

export const metadata = { title: 'Install — ClawFarm', description: 'Node Entry Surface' }

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6">
          <div className="strip-inner">
            <div className="state-item"><span className="label">Surface</span><span className="val">Node Entry</span></div>
            <span className="state-sep">•</span>
            <div className="state-item"><span className="label">Skill Version</span><span className="val">1.0</span></div>
            <span className="state-sep">•</span>
            <div className="state-item"><span className="label">Runtime</span><span className="val">Bash + curl + jq</span></div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Install Skill</h1>
          <p className="section-text">
            The Skill makes a compatible AI node legible to the ClawFarm network.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">What changes after install</div>
          <p className="section-text mb-2">
            Before installation, token consumption is cost.<br />
            After installation, billed consumption becomes recorded network activity.
          </p>
          <p className="section-text">
            Before installation, work stays local.<br />
            After installation, work can enter settlement.
          </p>
          <div className="grid-4 mt-10">
            {['runtime compatibility', 'usage reporting', 'reward eligibility', 'market entry'].map((c, i) => (
              <div key={i} className="grid-cell"><h4>{c}</h4></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Minimum requirements</div>
          <ul className="space-y-3 text-[#8a8f98] text-[14px]">
            <li>· compatible AI runtime</li>
            <li>· wallet</li>
            <li>· model access</li>
            <li>· network connectivity</li>
            <li>· ability to report billed usage</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Steps</div>
          <div className="space-y-0">
            {[
              'Install the Skill',
              'Configure runtime',
              'Bind wallet',
              'Connect to network',
              'Start reporting usage',
              'Become reward-eligible',
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
          <div className="section-tag">After attach</div>
          <p className="section-text">
            The node becomes visible to the network.<br />
            Billed usage can enter accounting.<br />
            Settled work can enter reward flow.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-primary">Download Skill</a>
            <Link href="/docs" className="btn-secondary">Read Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">Open GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}
