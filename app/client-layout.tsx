'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

import SolanaWalletProvider from './components/SolanaWalletProvider'
const ConnectWalletButton = dynamic(() => import('./components/ConnectWalletButton'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // 1. Spotlight: mouse-follow radial glow
    document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
        el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
      })
    })

    // 2. Tilt: 3D perspective + lift on .tilt cards (gives "thickness" feedback)
    document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width / 2) / r.width
        const y = (e.clientY - r.top - r.height / 2) / r.height
        // rotate + slight Y-lift + Z-pop forward → card feels like it floats off the surface
        el.style.transform = `perspective(700px) rotateX(${-y * 6.5}deg) rotateY(${x * 6.5}deg) translateY(-4px) translateZ(8px)`
      })
      el.addEventListener('mouseleave', () => { el.style.transform = '' })
    })

    // 3. Counter: animate [data-count] numbers (supports decimals via data-decimals)
    const countEl = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || '0')
      if (!target) return
      const decimals = parseInt(el.dataset.decimals || '0', 10)
      const duration = 1600
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        const value = eased * target
        el.textContent = decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    // 4. Scroll reveal + trigger counters
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          entry.target.querySelectorAll<HTMLElement>('[data-count]').forEach(countEl)
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    // 4b. Hero counters: always above-the-fold on load → trigger immediately with stagger
    document.querySelectorAll<HTMLElement>('.hero-stat-card [data-count]').forEach((el, i) => {
      setTimeout(() => countEl(el), 200 + i * 180)
    })

    // 5. Aurora parallax on mousemove
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28
      const y = (e.clientY / window.innerHeight - 0.5) * 18
      const o1 = document.querySelector<HTMLElement>('.aurora-orb-1')
      const o2 = document.querySelector<HTMLElement>('.aurora-orb-2')
      if (o1) o1.style.transform = `translateY(${y * 0.9}px) translateX(${x * 0.6}px)`
      if (o2) o2.style.transform = `translateY(${-y * 0.6}px) translateX(${-x * 0.4}px)`
    }
    window.addEventListener('mousemove', handleMouse)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [pathname])

  return (
    <SolanaWalletProvider>
      <>
        {/* Protocol Header */}
        <header className="protocol-header">
          <div className="header-row header-top">
            <Link href="/" className="brand" aria-label="ClawFarm home" />

            <nav className="header-nav-inner" aria-label="Primary">
              <Link href="/users" className="nav-item">Protocol Users</Link>
              <Link href="/builders" className="nav-item">Builders</Link>
              <Link href="/providers" className="nav-item">Marketplace</Link>
              <Link href="/install" className="nav-item">Become Provider</Link>
              <Link href="/masterpool" className="nav-item">Network</Link>
              <Link href="/whitepaper" className="nav-item">Protocol</Link>
              <Link href="/docs" className="nav-item">Docs</Link>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
              <Link href="/users">Protocol Users</Link>
              <Link href="/builders">Builders</Link>
              <Link href="/providers">Marketplace</Link>
              <Link href="/install">Become Provider</Link>
              <Link href="/masterpool">Network</Link>
              <Link href="/docs">Docs</Link>
              <Link href="/whitepaper">Whitepaper</Link>
              <a href="/docs#mirror" style={{ color: 'var(--green-bright)' }}>Mirror this UI</a>
              <a href="https://discord.gg/zxZmCFbzEn" target="_blank" rel="noopener">Discord</a>
              <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener">GitHub</a>
              <a href="https://x.com/ClawFarm54892" target="_blank" rel="noopener">X</a>
            </div>
            <div className="footer-meta">
              <span>ClawFarm Protocol · v2.0 · Decentralized AI Token Router</span>
              <span>© 2026 — Non-custodial · On-chain settlement · Solana</span>
            </div>
          </div>
        </footer>
      </>
    </SolanaWalletProvider>
  )
}
