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
            Installing the ClawFarm Skill allows a compatible runtime, ClawBox, or OpenClaw environment to convert billed token consumption into protocol-recognized metered activity eligible for settlement and reward allocation.
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

      {/* Data Models */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Core Data Models</div>
          <div className="grid-3 mt-6" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:'16px'}}>
            {[
              {title:'Provider', desc:'model_vendor, runtime_operator, clawbox_operator, openclaw_ecosystem_app'},
              {title:'NodeRuntime', desc:'runtime environment, machine identity, public key'},
              {title:'SkillInstall', desc:'skill registration, metering enabled, settlement enabled'},
              {title:'TaskExecution', desc:'task state, source, status transitions'},
              {title:'UsageRecord', desc:'token count, billed amount, eligibility, signature'},
              {title:'SettlementRecord', desc:'gross reward, treasury tax, vesting schedule'},
            ].map((m, i) => (
              <div key={i} className="grid-cell">
                <h4 style={{fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--green)'}}>{m.title}</h4>
                <p className="section-small" style={{marginTop:'8px', fontSize:'11px'}}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Flow */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Integration Flow</div>
          <div className="space-y-0 mt-6">
            {[
              {step:'1', title:'Register Provider', endpoint:'POST /api/providers/register', desc:'Create provider identity'},
              {step:'2', title:'Register Runtime', endpoint:'POST /api/runtimes/register', desc:'Register runtime environment'},
              {step:'3', title:'Install Skill', endpoint:'POST /api/skill/install', desc:'Enable metering & settlement'},
              {step:'4', title:'Start Task', endpoint:'POST /api/tasks/start', desc:'Create task execution record'},
              {step:'5', title:'Report Usage', endpoint:'POST /api/usage/report', desc:'Submit token/billed usage'},
              {step:'6', title:'Complete Task', endpoint:'POST /api/tasks/complete', desc:'Mark task delivered'},
              {step:'7', title:'Query Settlement', endpoint:'GET /api/settlements/:providerId', desc:'View rewards & vesting'},
            ].map((f, i) => (
              <div key={i} className="seq-item">
                <span className="seq-num">{f.step}</span>
                <div>
                  <span className="seq-text">{f.title}</span>
                  <span className="block text-[11px] text-[#505560] font-mono mt-1">{f.endpoint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Usage Report API</div>
          <div className="panel mt-4">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`// POST /api/usage/report
{
  "providerId": "prov_001",
  "runtimeId": "rt_001", 
  "skillInstallId": "si_001",
  "taskExecutionId": "task_001",
  "modelName": "gpt-4.1",
  "tokenInput": 1200,
  "tokenOutput": 3400,
  "tokenTotal": 4600,
  "computeUnits": 12.5,
  "billedAmountUsd": "0.92",
  "usageClass": "generation",
  "usageSource": "clawbox",
  "signature": "ed25519_sig_xxx"
}

// Response
{
  "usageRecordId": "usage_001",
  "eligible": true,
  "eligibilityReason": "protocol_qualified_billed_usage"
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Settlement Response</div>
          <div className="panel mt-4">
            <pre className="text-[12px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`// GET /api/settlements/:providerId?epoch=2026-03-14
{
  "providerId": "prov_001",
  "runtimeId": "rt_001",
  "settlementEpoch": "2026-03-14",
  "totalEligibleConsumption": "142330.55",
  "providerEligibleConsumption": "240.92",
  "grossReward": "1692.40",
  "treasuryTax": "50.77",
  "netReward": "1641.63",
  "vestingDays": 180,
  "vestingStartAt": "2026-03-14T00:00:00Z",
  "vestingEndAt": "2026-09-10T00:00:00Z"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Minimum Requirements */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Minimum Requirements</div>
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

      {/* Quick Install */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Quick Install</div>
          <div className="panel mt-4">
            <pre className="text-[13px] text-[#8a8f98] font-mono leading-relaxed overflow-x-auto">
{`git clone https://github.com/rogerwu188/clawfarm-skill.git
cd clawfarm-skill && chmod +x clawfarm.sh

# Configure provider and wallet
./clawfarm.sh config --wallet <SOLANA_ADDRESS>
./clawfarm.sh config --provider "My Model Service"

# Register with network
./clawfarm.sh register

# Check status
./clawfarm.sh status`}
            </pre>
          </div>
        </div>
      </section>

      {/* After Integration */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">After Integration</div>
          <p className="section-text">
            Your runtime becomes connected to the ClawFarm network.<br />
            Token usage is metered and recorded as protocol activity.<br />
            Eligible consumption enters daily settlement with 180-day linear vesting.
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
