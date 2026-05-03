export default function PoweredDemandApps() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-eyebrow">StoryClaw example</p>
        <div className="panel demand-app-panel">
          <div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Demand-side <span className="accent">apps</span>
            </h2>
            <p className="section-text">
              StoryClaw is a commercial AI compute market built on top of ClawFarm
              routing and metering. StoryClaw gives enterprise customers and developers
              a business-friendly purchase experience, while ClawFarm provides
              decentralized routing, metering, and settlement underneath.
            </p>
          </div>
          <a
            href="https://www.storyclaw.com/ai-token"
            target="_blank"
            rel="noopener"
            className="btn-secondary"
          >
            Visit StoryClaw AI Compute Market
          </a>
        </div>
      </div>
    </section>
  )
}
