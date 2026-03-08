export const metadata = {
  title: 'Docs - ClawFarm',
  description: 'ClawFarm Documentation',
}

export default function Docs() {
  return (
    <main className="min-h-screen pt-24">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-[#9ca3af] text-lg mb-12">
            Everything you need to know about ClawFarm.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <a href="/whitepaper" className="card p-6 hover:border-[#22d3ee] transition">
              <h2 className="text-lg font-semibold text-white mb-2">Whitepaper</h2>
              <p className="text-[#9ca3af] text-sm">The complete protocol specification.</p>
            </a>

            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Node Definition</h2>
              <p className="text-[#9ca3af] text-sm">What is a Claw Node and how does it work?</p>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Skill Standard</h2>
              <p className="text-[#9ca3af] text-sm">How to build and install a Skill.</p>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Points Rules</h2>
              <p className="text-[#9ca3af] text-sm">Genesis Points system and emission schedule.</p>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Ledger Overview</h2>
              <p className="text-[#9ca3af] text-sm">Usage, Work, and Revenue ledgers.</p>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-2">API Reference</h2>
              <p className="text-[#9ca3af] text-sm">Coming soon...</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
