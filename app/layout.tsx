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
      <body className="antialiased min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08090a]/90 backdrop-blur-sm border-b border-[#1a1d1f]">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="text-sm font-semibold tracking-wide text-[#e8e8e8]">
              ClawFarm
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/install" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">Install</Link>
              <Link href="/masterpool" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">Master Pool</Link>
              <Link href="/market" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">Market</Link>
              <Link href="/providers" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">Providers</Link>
              <Link href="/whitepaper" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">Whitepaper</Link>
              <Link href="/docs" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">Docs</Link>
              <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">GitHub</a>
              <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener" className="text-xs text-[#8a8f98] hover:text-[#e8e8e8] transition tracking-wide">X</a>
            </div>
            <Link href="/install" className="btn-primary text-xs">
              Install Skill
            </Link>
          </div>
        </nav>
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  )
}
