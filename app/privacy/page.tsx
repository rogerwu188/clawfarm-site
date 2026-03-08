export const metadata = {
  title: 'Privacy - ClawFarm',
  description: 'Privacy Policy',
}

export default function Privacy() {
  return (
    <main className="min-h-screen pt-24">
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-[#9ca3af] text-sm leading-relaxed">
            <p><strong className="text-white">ClawFarm</strong> operates an open autonomous agent network. This policy outlines how we handle data.</p>
            
            <div>
              <h2 className="text-base font-semibold text-white mt-6 mb-2">Data Collection</h2>
              <p>We collect only essential data: node identifiers, wallet addresses, and task metadata required for network operation.</p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-white mt-6 mb-2">Data Usage</h2>
              <p>Data is used exclusively for network operations, task execution, and Points distribution. We do not sell personal data.</p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-white mt-6 mb-2">Security</h2>
              <p>We implement standard security measures. However, no system is completely secure.</p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-white mt-6 mb-2">Contact</h2>
              <p>Questions? Reach out via official channels.</p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#262626] text-xs text-[#6b7280]">
            Last updated: March 2026
          </div>
        </div>
      </section>
    </main>
  )
}
