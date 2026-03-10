import Link from 'next/link'

export const metadata = { title: 'Master Pool — ClawFarm', description: 'Pool and Custody Surface' }

export default function MasterPool() {
  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          <span>Surface: <span className="text-[#8a8f98]">Pool & Custody</span></span>
          <span>Chain: <span className="text-[#8a8f98]">Solana</span></span>
          <span>Custody: <span className="text-[#8a8f98]">Program-controlled</span></span>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Master Pool</h1>
          <p className="section-text">
            The on-chain vault for Genesis emission and protocol-controlled distribution.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#e8e8e8] text-[18px] leading-relaxed mb-4">
            This is not a private wallet.<br />
            This is a program-controlled vault.
          </p>
          <p className="section-text">
            No founder, operator, or bot can move assets directly from it.<br />
            All future transfers must follow protocol rules.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Addresses</div>
          <div className="space-y-2 mt-4">
            {[
              ['Program ID', 'TBD — pending deployment'],
              ['Master Pool Vault', 'TBD — pending deployment'],
              ['Treasury Vault', 'TBD — pending deployment'],
              ['Config Account', 'TBD — pending deployment'],
            ].map(([label, addr], i) => (
              <div key={i}>
                <div className="text-[#505560] text-xs mb-1">{label}</div>
                <div className="addr">
                  <span>{addr}</span>
                  <span className="text-[#505560] text-xs">copy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Rules</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Compute Pool</span><span className="panel-value">50%</span></div>
            <div className="panel-row"><span className="panel-label">Outcome Pool</span><span className="panel-value">50%</span></div>
            <div className="panel-row"><span className="panel-label">Treasury Tax</span><span className="panel-value">3% USDC on billed usage</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Authority status</div>
          <div className="panel mt-4">
            <div className="panel-row"><span className="panel-label">Mint Authority</span><span className="panel-value text-[#f59e0b]">Pending Revocation</span></div>
            <div className="panel-row"><span className="panel-label">Freeze Authority</span><span className="panel-value text-[#f59e0b]">Pending Revocation</span></div>
            <div className="panel-row"><span className="panel-label">Upgrade Authority</span><span className="panel-value text-[#f59e0b]">Multisig Timelock</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Genesis order</div>
          <div className="space-y-0 mt-4">
            {[
              'Deploy program',
              'Create vaults',
              'Publish addresses',
              'Verify rules',
              'Mint full supply',
              'Deposit into Master Pool',
              'Revoke mint authority',
              'Revoke freeze authority',
              'Freeze upgrade authority after stabilization',
            ].map((s, i) => (
              <div key={i} className="seq-item">
                <span className="seq-num">{i + 1}</span>
                <span className="seq-text">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Public verification</div>
          <p className="section-text">
            This page exists so anyone can inspect the structure, the addresses, and the authority state of the pool.
          </p>
        </div>
      </section>
    </main>
  )
}
