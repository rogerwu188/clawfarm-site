'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import NetworkProvider from './components/NetworkProvider'
import SolanaWalletProvider from './components/SolanaWalletProvider'
const ConnectWalletButton = dynamic(() => import('./components/ConnectWalletButton'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <NetworkProvider>
      <SolanaWalletProvider>
        <>
        {/* Protocol Header */}
        <header className="protocol-header">
          <div className="header-row header-top">
            {isHome ? (
              <Link href="/" className="brand">CLAWFARM</Link>
            ) : (
              <Link href="/" className="back-button" aria-label="Back to home">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
            )}

            <nav className="header-nav-inner" aria-label="Primary">
              <Link href="/users" className="nav-item">AI Users</Link>
              <Link href="/builders" className="nav-item">Builders</Link>
              <Link href="/providers" className="nav-item">Marketplace</Link>
              <Link href="/install" className="nav-item">Become Provider</Link>
              <Link href="/masterpool" className="nav-item">Explorer</Link>
              <Link href="/whitepaper" className="nav-item">Protocol</Link>
              <Link href="/docs" className="nav-item">Docs</Link>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="cmdk-hint" aria-hidden>
                <kbd>⌘</kbd><kbd>K</kbd>
              </span>
              <ConnectWalletButton />
            </div>
          </div>

          <div className="header-row header-nav">
            <div className="header-status">
              <span className="status-item"><span className="status-label">Chain</span><span className="status-val">Solana</span></span>
              <span className="status-sep">·</span>
              <span className="status-item"><span className="status-label">Custody</span><span className="status-val status-live"><span className="state-dot" />Non-Custodial</span></span>
              <span className="status-sep">·</span>
              <span className="status-item"><span className="status-label">Settlement</span><span className="status-val">On-Chain</span></span>
              <span className="status-sep">·</span>
              <span className="status-item"><span className="status-label">Routing</span><span className="status-val">eco · auto · premium</span></span>
              <span className="status-sep">·</span>
              <span className="status-item"><span className="status-label">Settle</span><span className="status-val">&lt; 400ms</span></span>
            </div>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="nav-item" style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>GITHUB ↗</a>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-links">
              <Link href="/users">AI Users</Link>
              <Link href="/builders">Builders</Link>
              <Link href="/providers">Marketplace</Link>
              <Link href="/install">Become Provider</Link>
              <Link href="/masterpool">Explorer</Link>
              <Link href="/docs">Docs</Link>
              <Link href="/whitepaper">Whitepaper</Link>
              <a href="/docs#mirror" style={{ color: 'var(--green-bright)' }}>Mirror this UI</a>
              <a href="https://discord.gg/zxZmCFbzEn" target="_blank" rel="noopener">Discord</a>
              <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener">GitHub</a>
              <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener">X</a>
            </div>
            <div className="footer-meta">
              <span>ClawFarm Protocol · v2.0 · Decentralized AI Compute Marketplace</span>
              <span>© 2026 — Non-custodial · On-chain settlement · Solana</span>
            </div>
          </div>
        </footer>
        </>
      </SolanaWalletProvider>
    </NetworkProvider>
  )
}
