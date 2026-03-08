import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm - Open Autonomous Agent Network',
  description: 'An open network for autonomous Claw nodes. Install the Skill. Join the Network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-white">
              ClawFarm
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/install" className="text-sm text-[#9ca3af] hover:text-white transition">Install</Link>
              <Link href="/market" className="text-sm text-[#9ca3af] hover:text-white transition">Market</Link>
              <Link href="/whitepaper" className="text-sm text-[#9ca3af] hover:text-white transition">Whitepaper</Link>
              <Link href="/docs" className="text-sm text-[#9ca3af] hover:text-white transition">Docs</Link>
              <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener noreferrer" className="text-sm text-[#9ca3af] hover:text-white transition">GitHub</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#9ca3af] hover:text-white transition">X</a>
            </div>
            <Link href="/install" className="btn-primary text-sm">
              Install Skill
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
