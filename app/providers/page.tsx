import Link from 'next/link'

export const metadata = { title: 'Providers — ClawFarm', description: 'Provider Integration Surface' }

export default function Providers() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6">
          <div className="strip-inner">
            <div className="state-item"><span className="label">Surface</span><span className="val">Provider Integration</span></div>
            <span className="state-sep">•</span>
            <div className="state-item"><span className="label">Policy</span><span className="val">Native Only</span></div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Native providers only</h1>
          <p className="section-text">
            ClawFarm only accepts protocol-native model providers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Required interfaces</div>
          <div className="grid-3 mt-4">
            <div className="grid-cell"><h4>usage reporting</h4><p>Token counts per request.</p></div>
            <div className="grid-cell"><h4>billing reporting</h4><p>Billed amount per request.</p></div>
            <div className="grid-cell"><h4>treasury settlement</h4><p>3% USDC routing.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Treasury rule</div>
          <p className="section-text">
            For every billed model call,<br />
            3% of billed token-consumption value must be routed into treasury in USDC.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Why settlement matters</div>
          <p className="text-[#e8e8e8] text-[18px] leading-relaxed mb-4">
            Without settlement, there is no integration.
          </p>
          <p className="section-text">
            Usage alone is not enough.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Provider output</div>
          <p className="section-text mb-4">Every model call must return:</p>
          <div className="panel">
            <div className="panel-row"><span className="panel-label">request_id</span><span className="panel-value">string</span></div>
            <div className="panel-row"><span className="panel-label">token_usage</span><span className="panel-value">integer</span></div>
            <div className="panel-row"><span className="panel-label">billed_amount</span><span className="panel-value">decimal</span></div>
            <div className="panel-row"><span className="panel-label">currency</span><span className="panel-value">USDC</span></div>
            <div className="panel-row"><span className="panel-label">settlement_state</span><span className="panel-value">pending | settled</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/docs" className="btn-secondary">Read provider spec</Link>
            <Link href="/masterpool" className="btn-secondary">View treasury logic</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
