'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const SolanaWalletProvider = dynamic(() => import('./components/SolanaWalletProvider'), { ssr: false })
const ConnectWalletButton = dynamic(() => import('./components/ConnectWalletButton'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  
  return (
    <SolanaWalletProvider>
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
            <span className="status-item"><span className="status-label">Custody</span><span className="status-val status-live"><span className="state-dot" />Non-Custodial</span></span>
            <span className="status-sep">·</span>
            <span className="status-item"><span className="status-label">Settlement</span><span className="status-val">On-Chain</span></span>
            <span className="status-sep">·</span>
            <span className="status-item"><span className="status-label">Routing</span><span className="status-val">eco · auto · premium</span></span>
          </div>
          <ConnectWalletButton />
        </div>
        <div className="header-row header-nav">
          <nav className="header-nav-inner">
            <Link href="/users" className="nav-item">For Users</Link>
            <Link href="/install" className="nav-item">Become Provider</Link>
            <Link href="/masterpool" className="nav-item">Explorer</Link>
            <Link href="/providers" className="nav-item">Providers</Link>
            <Link href="/whitepaper" className="nav-item">Protocol</Link>
            <Link href="/docs" className="nav-item">Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="nav-item">GitHub</a>
          </nav>
        </div>
      </div>
      
      <div className="flex-1">
        {children}
      </div>
      
      {/* Footer */}
      <footer className="site-footer">
        <div className="max-w-6xl mx-auto px-6">
          <div className="footer-links">
            <Link href="/users">For Users</Link>
            <Link href="/providers">Providers</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/whitepaper">Whitepaper</Link>
            <Link href="/masterpool">Explorer</Link>
            <a href="https://discord.gg/zxZmCFbzEn" target="_blank" rel="noopener">Discord</a>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener">GitHub</a>
            <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener">X</a>
          </div>
          <div className="footer-meta">
            ClawFarm Protocol · v2.0 · Decentralized AI Compute Marketplace
          </div>
        </div>
      </footer>
    </>
    </SolanaWalletProvider>
  )
}
