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
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060708]/92 backdrop-blur-md border-b border-[#1a1d1f]">
          <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-wider text-[13px] text-[#e8eaed]" style={{fontFamily:'var(--font-display)'}}>
              CLAWFARM
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link href="/install" className="nav-link">Install</Link>
              <Link href="/masterpool" className="nav-link">Pool</Link>
              <Link href="/market" className="nav-link">Market</Link>
              <Link href="/providers" className="nav-link">Providers</Link>
              <Link href="/whitepaper" className="nav-link">Protocol</Link>
              <Link href="/docs" className="nav-link">Docs</Link>
              <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="nav-link">GitHub</a>
              <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener" className="nav-link">X</a>
            </div>
            <Link href="/install" className="btn-primary text-[11px] py-2 px-4">
              INSTALL SKILL
            </Link>
          </div>
        </nav>
        <div className="pt-12 flex-1">
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
