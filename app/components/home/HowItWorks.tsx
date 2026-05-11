'use client'

import Link from 'next/link'
import { useState } from 'react'

type Step = {
  num: string
  title: string
  desc: string
  cta: { label: string; href: string }
  color: string
  icon: React.ReactNode
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Route',
    desc: 'Apps and agents send requests across registered model, API, and GPU providers in real time.',
    cta: { label: 'Explore Routing', href: '/users' },
    color: '#a78bfa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7 7l3.5 9.5M17 7l-3.5 9.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Meter',
    desc: 'Every token tracked — provider, price, route mode, and account recorded on-chain.',
    cta: { label: 'View Metrics', href: '/masterpool' },
    color: '#7dd3fc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 1 0-9-9" />
        <path d="M12 12l5-3" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Settle',
    desc: 'USDC clears through non-custodial escrow directly on Solana. No invoices, no delays.',
    cta: { label: 'Learn More', href: '/whitepaper' },
    color: '#67e8f9',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
        <path d="M9 12l2.2 2.2L15 10.5" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Reward',
    desc: 'Providers and active users earn protocol rewards for verified supply and demand.',
    cta: { label: 'See Rewards', href: '/masterpool' },
    color: '#c4b5fd',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="5" rx="1" />
        <path d="M5 13v8h14v-8M12 8v13" />
        <path d="M12 8c-2.5 0-4-1-4-2.5S9.5 3 12 5c2.5-2 4-1 4 .5S14.5 8 12 8z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  // Default 01 active. Hover changes active to that card; clicking locks it.
  // Mouse leaving the grid reverts to last locked card (default 0).
  const [locked, setLocked] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? locked

  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-center">
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>How it works</p>
          <h2 className="section-title">
            From request to <span className="accent">settlement,</span><br />
            in a single flow.
          </h2>
        </div>

        <div
          className="flow-grid"
          style={{ marginTop: 72 }}
          onMouseLeave={() => setHovered(null)}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`flow-card${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onClick={() => setLocked(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLocked(i) }}
            >
              <div className="flow-card-head">
                <span className="flow-card-num" style={{ ['--num-color' as string]: s.color }}>{s.num}</span>
                <span className="flow-card-icon" aria-hidden style={{ color: s.color }}>
                  {s.icon}
                </span>
              </div>
              <div className="flow-card-title">{s.title}</div>
              <div className="flow-card-divider" />
              <p className="flow-card-desc">{s.desc}</p>
              <Link href={s.cta.href} className="flow-card-cta" onClick={(e) => e.stopPropagation()}>
                {s.cta.label}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 9l6-6M4 3h5v5" />
                </svg>
              </Link>
              {i < STEPS.length - 1 && (
                <span className="flow-card-connector" aria-hidden>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 1.5L7 5L3.5 8.5" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
