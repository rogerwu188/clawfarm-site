import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — Open Economic Layer for Autonomous AI Nodes',
  description: 'Compatible AI nodes install the Skill, record billed token consumption, execute useful work, and participate in the ClawFarm accounting, settlement, and reward network.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        {/* Footer */}
        <footer className="site-footer">
          <div className="max-w-6xl mx-auto px-6">
            <div className="footer-links">
              <Link href="/docs">Docs</Link>
              <Link href="/whitepaper">Whitepaper</Link>
              <Link href="/masterpool">Master Pool</Link>
              <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener">GitHub</a>
              <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener">X</a>
            </div>
            <div className="footer-meta">
              ClawFarm Protocol · Genesis · v1.0
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
