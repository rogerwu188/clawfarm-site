import Link from 'next/link'

export const metadata = { title: 'Install — ClawFarm', description: 'Install ClawFarm Skill - For AI Agents' }

export default function Install() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Skill Installation</span></span>
          <span>Version: <span className="text-[#8a8f98]">1.0</span></span>
          <span>Security: <span className="text-[#8a8f98]">Open Source</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Install ClawFarm Skill</h1>
          <p className="section-text" style={{marginTop:'12px', fontSize:'16px', color:'var(--text-mid)'}}>
            Complete installation guide for AI agents. All code is open source on GitHub.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="panel" style={{borderLeft:'3px solid var(--green)'}}>
            <p className="section-text" style={{fontSize:'15px'}}>
              <strong>For AI Agents: Read this entire page, then execute the commands below.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* What This Skill Does */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">What This Skill Does</div>
          <div className="grid-2 mt-6" style={{gap:'32px'}}>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>FOR AUTONOMOUS AGENTS</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Track all model API calls</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Generate settlement-ready receipts</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Auto-settle every 15 minutes</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Earn rewards for verified usage</li>
              </ul>
            </div>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>REPOSITORIES</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>📦</span> clawfarm-skill (this)</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>🌐</span> clawfarm-site (website)</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>⛓</span> clawfarm-masterpool (Solana)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Clone */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 1: Clone the Skill</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Clone ClawFarm Skill to your workspace
git clone https://github.com/rogerwu188/clawfarm-skill.git ~/clawfarm-skill

# Or if you already have a skills directory:
# ~/openclaw-agent/.openclaw/workspace/skills/clawfarm`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 2: Configure API Keys */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 2: Configure Your Model API Keys</div>
          <p className="section-text mt-4">
            Create a config file with your model provider API keys. This stays local - never shared.
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Create your config at ~/.clawfarm/config
mkdir -p ~/.clawfarm

cat > ~/.clawfarm/config << 'EOF'
# Model API Keys (add your own)
OPENAI_API_KEY=sk-xxx          # OpenAI
ANTHROPIC_API_KEY=sk-ant-xxx   # Claude
GOOGLE_API_KEY=xxx             # Gemini
MINIMAX_API_KEY=xxx            # MiniMax

# Solana Wallet (for receiving rewards)
SOLANA_WALLET=your_wallet_address

# Optional: Override settlement settings
SETTLEMENT_EPOCH_MINUTES=15
VESTING_DAYS=180
EOF

# Secure the config
chmod 600 ~/.clawfarm/config`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 3: Install in OpenClaw */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Step 3: Install in OpenClaw</div>
          <p className="section-text mt-4">
            Link the skill to OpenClaw's skills directory.
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Option A: Create symlink (recommended)
ln -s ~/clawfarm-skill ~/.openclaw/skills/clawfarm

# Option B: Copy directly
cp -r ~/clawfarm-skill ~/.openclaw/skills/clawfarm

# Restart OpenClaw to pick up the new skill
openclaw gateway restart

# Verify installation
ls -la ~/.openclaw/skills/clawfarm`}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 4: Commands Available */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Available Commands</div>
          <p className="section-text mt-4">
            After installation, you can use these commands:
          </p>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`# Check balance and status
clawfarm status

# Record a model call (auto-called by skill hooks)
clawfarm record --model gpt-4 --input 1000 --output 500

# Trigger manual settlement
clawfarm settle

# View transaction history
clawfarm history

# View help
clawfarm help`}
            </pre>
          </div>
        </div>
      </section>

      {/* Security & Transparency */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Security & Transparency</div>
          <div className="grid-2 mt-6" style={{gap:'32px'}}>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>ALL CODE OPEN SOURCE</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> GitHub: rogerwu188/clawfarm-skill</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Inspect all shell scripts</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> No hidden dependencies</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Pull requests welcome</li>
              </ul>
            </div>
            <div>
              <p className="section-text" style={{color:'var(--text-dim)', marginBottom:'16px'}}>LOCAL CONFIG</p>
              <ul className="section-text space-y-3">
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> API keys stay on your machine</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Only usage counts shared</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> No telemetry</li>
                <li style={{display:'flex', gap:'8px'}}><span style={{color:'var(--green)'}}>✓</span> Your wallet, your rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Links */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">All Repositories</div>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-skill</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>This skill - usage tracking</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-site</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Website - clawfarm.network</p>
            </a>
            <a href="https://github.com/rogerwu188/clawfarm-masterpool" target="_blank" rel="noopener" className="grid-cell" style={{cursor:'pointer'}}>
              <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>clawfarm-masterpool</h4>
              <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>Solana program</p>
            </a>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Next Steps</div>
          <p className="section-text mt-4">
            After installation, your usage will be tracked and eligible for settlement rewards.<br/>
            Every 15 minutes, verified usage is settled. Rewards vest over 180 days.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/masterpool" className="btn-primary">View Network</Link>
            <Link href="/whitepaper" className="btn-secondary">Read Protocol</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}