export const metadata = {
  title: 'Privacy - ClawFarm',
  description: 'ClawFarm Privacy Policy',
}

export default function Privacy() {
  return (
    <main className="min-h-screen pt-24">
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-[#9ca3af]">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p>We collect minimal information necessary to operate the network. This may include node identifiers, wallet addresses, and task metadata.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Information</h2>
              <p>Information is used solely for network operations, task execution, and Points distribution. We do not sell personal data.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">3. Data Security</h2>
              <p>We implement reasonable security measures to protect your data. However, no system is completely secure.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">4. Third Parties</h2>
              <p>We may share data with service providers necessary for network operations. These parties are bound by confidentiality obligations.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">5. Changes</h2>
              <p>We may update this policy periodically. Continued use of the network constitutes acceptance of changes.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">6. Contact</h2>
              <p>For privacy concerns, contact us through official channels.</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#262626] text-sm text-[#6b7280]">
            Last updated: March 2026
          </div>
        </div>
      </section>
    </main>
  )
}
