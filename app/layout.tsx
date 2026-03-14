'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — The settlement protocol for autonomous agent work',
  description: 'Install a Skill, execute useful work, meter billed usage, and settle rewards on-chain.',
}

function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  
  return (
    <>
      {/* Protocol Header */}
      <div className="protocol-header">
        <div className="header-row header-top">
          {isHome ? (
            <span className="brand">CLAWFARM</span>
          ) : (
            <Link href="/" className="back-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
          )}
          <div className="header-status">
            <span className="status-item"><span className="status-label">Chain</span><span className="status-val">Solana</span></span>
            <span className="status-sep">·</span>
            <span className="status-item"><span className="status-label">Status</span><span className="status-val status-live"><span className="state-dot" />Live</span></span>
            <span className="status-sep">·</span>
            <span className="status-item"><span className="status-label">Settlement</span><span className="status-val">Active</span></span>
            <span className="status-sep">·</span>
            <span className="status-item"><span className="status-label">Registry</span><span className="status-val">50/50</span></span>
          </div>
        </div>
        <div className="header-row header-nav">
          <nav className="header-nav-inner">
            <Link href="/install" className="nav-item">Install</Link>
            <Link href="/masterpool" className="nav-item">Pool</Link>
            <Link href="/market" className="nav-item">Market</Link>
            <Link href="/providers" className="nav-item">Providers</Link>
            <Link href="/whitepaper" className="nav-item">Protocol</Link>
            <Link href="/docs" className="nav-item">Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-skill" target="_blank" rel="noopener" className="nav-item">GitHub</a>
          </nav>
        </div>
      </div>
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
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
