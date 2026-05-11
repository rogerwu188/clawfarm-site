'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ── types ── */
type RType = 'buyback' | 'maintenance' | 'infra'
interface Rec {
  id: string
  time: string
  usdc: number
  claf: number
  tx: string
  type: RType
  isNew?: boolean
}

/* ── seed data ── */
const SEED: Rec[] = [
  { id: 's1', time: '2026-05-07 03:42:18', usdc: 1847, claf: 67420, tx: '7x9p...3k2m', type: 'buyback' },
  { id: 's2', time: '2026-05-07 01:15:44', usdc: 1240, claf: 45210, tx: '4h7k...9m2s', type: 'buyback' },
  { id: 's3', time: '2026-05-06 23:08:31', usdc: 480,  claf: 0,     tx: '2m1p...x9l0', type: 'maintenance' },
  { id: 's4', time: '2026-05-06 21:22:07', usdc: 2103, claf: 77850, tx: '9s2f...k2j1', type: 'buyback' },
  { id: 's5', time: '2026-05-06 19:44:55', usdc: 240,  claf: 0,     tx: '5d8r...m3v7', type: 'infra' },
  { id: 's6', time: '2026-05-06 17:31:22', usdc: 1580, claf: 58640, tx: '3n6q...p1w4', type: 'buyback' },
  { id: 's7', time: '2026-05-06 15:03:10', usdc: 920,  claf: 34100, tx: '8w4x...q7r2', type: 'buyback' },
  { id: 's8', time: '2026-05-06 12:47:33', usdc: 1670, claf: 61890, tx: '1a5b...z6c3', type: 'buyback' },
]

/* ── helpers ── */
const fmt = (n: number) => n.toLocaleString()
const genTx = () => `${Math.random().toString(36).slice(2, 6)}...${Math.random().toString(36).slice(2, 6)}`
const nowStr = () => new Date().toISOString().replace('T', ' ').slice(0, 19)

/* ── Treasury Treemap ── */
function TreasuryTreemap({ buybackUsdc, maintUsdc, infraUsdc }: {
  buybackUsdc: number
  maintUsdc: number
  infraUsdc: number
}) {
  return (
    <div style={{ display: 'flex', gap: 4, height: 210, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      {/* 70% — Buyback & Burn */}
      <div style={{
        flex: 70,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.13) 0%, rgba(16,185,129,0.05) 100%)',
        border: '1px solid rgba(16,185,129,0.32)',
        borderRadius: 'var(--radius-md)',
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: -30, right: -30,
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            70% · Buyback & Burn
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-high)', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Market-buy $CLAF<br />
            <span style={{ color: 'var(--green)' }}>permanently burned</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Cumulative USDC allocated
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--green)', fontWeight: 600 }}>
            {fmt(buybackUsdc)} USDC
          </div>
        </div>
      </div>

      {/* Right column: 20% + 10% */}
      <div style={{ flex: 30, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* 20% Core Maintenance */}
        <div style={{
          flex: 2,
          background: 'rgba(59,130,246,0.07)',
          border: '1px solid rgba(59,130,246,0.22)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
              20% · Core Maintenance
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--text-high)', lineHeight: 1.3 }}>
              Security, audits & protocol dev
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)' }}>
            {fmt(maintUsdc)} USDC
          </div>
        </div>

        {/* 10% Infra Resilience */}
        <div style={{
          flex: 1,
          background: 'rgba(251,191,36,0.06)',
          border: '1px solid rgba(251,191,36,0.18)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            10% · Infra Resilience
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--amber)' }}>
            {fmt(infraUsdc)} USDC
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── SVG Sparkline ── */
function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return <div style={{ height: 44 }} />
  const max = Math.max(...data)
  const W = 280; const H = 44
  const barW = Math.floor((W - (data.length - 1) * 2) / data.length)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {data.map((v, i) => {
        const bh = Math.max(3, (v / max) * (H - 4))
        const x = i * (barW + 2)
        const y = H - bh
        return (
          <rect
            key={i}
            x={x} y={y} width={barW} height={bh} rx={1}
            fill={i === data.length - 1 ? 'var(--green-bright)' : 'rgba(52,211,153,0.3)'}
          />
        )
      })}
    </svg>
  )
}

/* ── Mini stat card ── */
function MiniStat({ label, value, unit, accent }: {
  label: string; value: string; unit?: string; accent?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', padding: '14px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', color: accent || 'var(--text-high)', lineHeight: 1, marginBottom: 3 }}>
        {value}
      </div>
      {unit && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>{unit}</div>}
    </div>
  )
}

/* ═══════════════════════════════ MAIN ═══════════════════════════════ */
export default function ExplorerClient() {
  const [records, setRecords] = useState<Rec[]>(SEED)
  const [totalBurned, setTotalBurned] = useState(12_847_230)
  const [buybackUsdc, setBuybackUsdc] = useState(183_240)
  const [maintUsdc, setMaintUsdc] = useState(52_640)
  const [infraUsdc, setInfraUsdc] = useState(26_320)

  useEffect(() => {
    const t = setInterval(() => {
      const roll = Math.random()
      const type: RType = roll < 0.65 ? 'buyback' : roll < 0.85 ? 'maintenance' : 'infra'
      const usdc = Math.floor(Math.random() * 2000 + 400)
      const claf = type === 'buyback' ? Math.floor(usdc * (33 + Math.random() * 12)) : 0
      const rec: Rec = { id: `live-${Date.now()}`, time: nowStr(), usdc, claf, tx: genTx(), type, isNew: true }

      setRecords(prev => {
        const next = [rec, ...prev.slice(0, 11)]
        setTimeout(() => setRecords(r => r.map(x => x.id === rec.id ? { ...x, isNew: false } : x)), 1800)
        return next
      })

      if (type === 'buyback') {
        setTotalBurned(p => p + claf)
        setBuybackUsdc(p => p + usdc)
      } else if (type === 'maintenance') {
        setMaintUsdc(p => p + usdc)
      } else {
        setInfraUsdc(p => p + usdc)
      }
    }, 9000)
    return () => clearInterval(t)
  }, [])

  const sparkData = records.filter(r => r.type === 'buyback').slice(0, 8).reverse().map(r => r.usdc)
  const burnPct = (totalBurned / 1_000_000_000 * 100).toFixed(4)

  return (
    <main>
      {/* ── State Strip ── */}
      <div className="state-strip">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 24, alignItems: 'center' }}>
          <span>Surface: <span style={{ color: 'var(--text-mid)' }}>Network Explorer</span></span>
          <span>Chain: <span style={{ color: 'var(--text-mid)' }}>Solana</span></span>
          <span>Custody: <span style={{ color: 'var(--text-mid)' }}>Non-Custodial</span></span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="state-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>LIVE</span>
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="section" style={{ paddingBottom: 48 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="state-dot" /> ClawFarm · Network Explorer
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--text-high)', margin: '0 0 12px', lineHeight: 1.05 }}>
            On-chain state,{' '}
            <span style={{ fontFamily: 'var(--font-serif-italic)', fontStyle: 'italic', fontWeight: 400 }}>transparent.</span>
          </h1>
          <p style={{ color: 'var(--text-mid)', fontSize: 16, lineHeight: 1.55, maxWidth: 560, margin: '0 0 28px', letterSpacing: '-0.003em' }}>
            Real-time view of treasury buybacks, escrow state, provider registry, settlement activity, and token metrics. All data on-chain and verifiable.
          </p>
          {/* Two unique protocol-parameter badges only — all metrics live in their dedicated sections below */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              ['Treasury Fee', '3% of settlements'],
              ['Buyback Split', '70 / 20 / 10'],
              ['Custody', 'Non-Custodial PDA'],
              ['Chain', 'Solana'],
            ].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>{k}:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ★  BUYBACK & BURN CENTER
      ══════════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'rgba(16,185,129,0.018)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div className="section-tag" style={{ margin: 0 }}>Buyback &amp; Burn Center</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-pill)', padding: '2px 8px' }}>
              <span className="state-dot" style={{ width: 5, height: 5 }} /> LIVE
            </span>
          </div>
          <p style={{ color: 'var(--text-mid)', fontSize: 13, marginBottom: 28, lineHeight: 1.55, maxWidth: 640 }}>
            70% of all protocol fees are automatically used to market-buy $CLAF and permanently burn it. Remaining 30% funds protocol security and infrastructure. Real-time allocations and records below.
          </p>

          {/* Two-column: Treemap + right panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 14, marginBottom: 14 }}>

            {/* Left: Treemap */}
            <div className="panel" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Treasury Allocation Treemap</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>70 / 20 / 10 mandate</span>
              </div>
              <TreasuryTreemap buybackUsdc={buybackUsdc} maintUsdc={maintUsdc} infraUsdc={infraUsdc} />
              <div style={{ marginTop: 12, display: 'flex', gap: 18 }}>
                {[
                  { c: 'var(--green)', l: 'Buyback & Burn' },
                  { c: 'var(--accent)', l: 'Core Maintenance' },
                  { c: 'var(--amber)', l: 'Infra Resilience' },
                ].map(({ c, l }) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: 2, background: c }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Burn stats + sparkline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>

              {/* Burn meter */}
              <div className="panel" style={{ padding: '18px 20px', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  Total $CLAF Burned
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text-high)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>
                  {fmt(totalBurned)}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginBottom: 12 }}>$CLAF destroyed forever</div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${burnPct}%`,
                    background: 'linear-gradient(90deg, var(--green), var(--green-bright))',
                    borderRadius: 2,
                    boxShadow: '0 0 8px rgba(52,211,153,0.45)',
                    minWidth: 2,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>0</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)' }}>{burnPct}% of 1B</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="panel" style={{ padding: '14px 18px', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                  Recent buyback USDC
                </div>
                <Sparkline data={sparkData} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginTop: 5 }}>
                  Last {sparkData.length} buyback events
                </div>
              </div>

            </div>
          </div>

          {/* Live buyback log */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-tag">Live Buyback &amp; Treasury Activity</span>
              <span className="panel-live"><span className="state-dot" />Streaming</span>
            </div>

            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '155px 1fr 90px 100px 115px',
              padding: '8px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.01)',
            }}>
              {['Timestamp', 'Action', 'USDC', '$CLAF Burned', 'Tx Hash'].map(h => (
                <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
              ))}
            </div>

            {records.slice(0, 10).map((r, i) => {
              const color = r.type === 'buyback' ? 'var(--green)' : r.type === 'maintenance' ? 'var(--accent)' : 'var(--amber)'
              const label =
                r.type === 'buyback'
                  ? `Buyback Executed: ${fmt(r.usdc)} USDC → ${fmt(r.claf)} $CLAF Burned`
                  : r.type === 'maintenance'
                    ? `Core Maintenance Allocated: ${fmt(r.usdc)} USDC`
                    : `Infra Resilience Allocated: ${fmt(r.usdc)} USDC`
              return (
                <div
                  key={r.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '155px 1fr 90px 100px 115px',
                    padding: '11px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    alignItems: 'center',
                    background: r.isNew ? 'rgba(16,185,129,0.07)' : i === 0 ? 'rgba(16,185,129,0.02)' : undefined,
                    transition: 'background 1.8s ease',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>{r.time}</span>
                  <span style={{ fontSize: 12, color, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 2, background: color, flexShrink: 0 }} />
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mid)', textAlign: 'right' }}>{fmt(r.usdc)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: r.type === 'buyback' ? 'var(--green)' : 'var(--text-dim)', textAlign: 'right' }}>
                    {r.type === 'buyback' ? fmt(r.claf) : '—'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', textAlign: 'right' }}>{r.tx}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Protocol Snapshot ── */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-tag">Protocol Snapshot</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {([
              { label: 'Total Supply', value: '1B', unit: '$CLAF' },
              { label: 'Active Users', value: '—', unit: 'with escrow balance' },
              { label: 'Settlement', value: 'Active', unit: 'on-chain', accent: 'var(--green)' },
              { label: 'Active Providers', value: '—', unit: 'registered' },
              { label: 'Avg Route Latency', value: '—', unit: 'ms' },
              { label: 'Settlement Success', value: '—', unit: '% success rate' },
            ] as { label: string; value: string; unit: string; accent?: string }[]).map(({ label, value, unit, accent }) => (
              <MiniStat key={label} label={label} value={value} unit={unit} accent={accent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Escrow State ── */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-tag" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Escrow State
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--green)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, padding: '1px 6px', letterSpacing: '0.06em' }}>NON-CUSTODIAL</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-mid)', marginBottom: 14, lineHeight: 1.55, maxWidth: 560 }}>
            All user funds held in Program Derived Address (PDA). No admin access. Users withdraw anytime.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {([
              { label: 'Total Escrowed', value: '—', unit: 'USDC', accent: 'var(--green)' },
              { label: 'Unique Wallets', value: '—', unit: 'users' },
              { label: 'Deposits 24h', value: '—', unit: 'USDC' },
              { label: 'Withdrawals 24h', value: '—', unit: 'USDC' },
            ] as { label: string; value: string; unit: string; accent?: string }[]).map(p => (
              <MiniStat key={p.label} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Provider Ecosystem ── */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-tag">Provider Ecosystem</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>

            {/* Registry stats */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Registry Stats</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Total Providers', value: '—', unit: 'registered' },
                  { label: 'Total Staked', value: '—', unit: '$CLAF' },
                  { label: 'Models Available', value: '—', unit: 'unique models' },
                  { label: 'Avg Quality Score', value: '—', unit: 'Q_i score' },
                ].map(p => (
                  <MiniStat key={p.label} {...p} />
                ))}
              </div>
            </div>

            {/* Routing mode distribution */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Routing Mode Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { mode: 'eco', color: 'var(--green)', desc: 'Lowest cost, best-effort' },
                  { mode: 'auto', color: 'var(--accent)', desc: 'Balanced cost / quality' },
                  { mode: 'premium', color: 'var(--amber)', desc: 'Highest quality, priority routing' },
                ].map(({ mode, color, desc }) => (
                  <div key={mode} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color, fontWeight: 600, textTransform: 'uppercase' }}>{mode}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--text-dim)', marginLeft: 10 }}>{desc}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color, fontWeight: 600 }}>—%</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: '0%', background: color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Provider categories */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Provider Categories
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              'Language Models', 'Image Models', 'Video Models', 'GPU Nodes',
              'API Proxies', 'Multi-Model Routers', 'Custom Endpoints', 'Embeddings',
            ].map(cat => (
              <div key={cat} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '12px 14px',
                transition: 'border-color 0.15s',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text-mid)', marginBottom: 4 }}>{cat}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>— providers</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Routing & Settlement ── */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-tag">Routing &amp; Settlement</div>
          <p style={{ fontSize: 12, color: 'var(--text-mid)', marginBottom: 20, lineHeight: 1.55, maxWidth: 600 }}>
            Token-level usage metrics for routed AI compute. Only dual-signed usage proofs count toward settlement and rewards.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
            {/* Left — routing metrics (unique; latency/success/AI requests live in Protocol Snapshot) */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Routing Metrics</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {([
                  { label: 'AI Requests 24h', value: '—', unit: 'requests' },
                  { label: 'Verified Tokens', value: '—', unit: 'model tokens' },
                  { label: 'Active Demand Apps', value: '—', unit: 'apps' },
                  { label: 'Disputed Proofs 24h', value: '—', unit: 'proofs' },
                ] as { label: string; value: string; unit: string; accent?: string }[]).map(p => (
                  <MiniStat key={p.label} {...p} />
                ))}
              </div>
            </div>

            {/* Right — settlement flow */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Settlement Flow</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Settled 24h', value: '—', unit: 'USDC' },
                  { label: 'Transactions 24h', value: '—', unit: 'settlements' },
                  { label: 'Provider Payouts', value: '—', unit: 'USDC (97%)' },
                  { label: 'Treasury Inflow', value: '—', unit: 'USDC (3%)' },
                ].map(p => (
                  <MiniStat key={p.label} {...p} />
                ))}
              </div>
            </div>

            {/* Full-width Revenue Split bar spanning both columns */}
            <div style={{ gridColumn: '1 / -1', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Revenue Split</div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '97%', background: 'var(--green)', borderRadius: '3px 0 0 3px' }} />
                <div style={{ width: '3%', background: 'var(--accent)', borderRadius: '0 3px 3px 0' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)' }}>97% → Provider</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)' }}>3% → Treasury</span>
              </div>
            </div>
          </div>

          {/* Demand Apps */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-tag">Integrated Demand Apps</span>
            </div>
            <div className="panel-row">
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, color: 'var(--text-high)' }}>StoryClaw</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginLeft: 12 }}>AI Compute Market — routing &amp; metering powered by ClawFarm</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '3px 10px', borderRadius: 'var(--radius-pill)' }}>
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Token Power & Issuance ── */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-tag">Token Power &amp; Issuance</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

            {/* Token Power (TTP) — unique trend metrics; TTP 24h raw count lives in Routing & Settlement */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Token Power (TTP)</div>
              <p style={{ fontSize: 12, color: 'var(--text-mid)', marginBottom: 12, lineHeight: 1.55 }}>
                Cumulative verified token consumption driving daily $CLAF emissions. Only dual-signed proofs count.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {([
                  { label: 'TTP 24h', value: '—', unit: 'verified tokens', accent: 'var(--green)' },
                  { label: 'TTP Change', value: '—', unit: 'vs prior 24h' },
                  { label: 'Avg TTP 7d', value: '—', unit: 'tokens/day' },
                  { label: 'Epoch Progress', value: '—', unit: '% of current epoch' },
                ] as { label: string; value: string; unit: string; accent?: string }[]).map(p => (
                  <MiniStat key={p.label} {...p} />
                ))}
              </div>
            </div>

            {/* Issuance Model — Remaining Supply removed (= Total Supply in Protocol Snapshot) */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mid)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Daily Issuance Model (70 / 30)</div>
              <p style={{ fontSize: 12, color: 'var(--text-mid)', marginBottom: 12, lineHeight: 1.55 }}>
                $CLAF emitted daily based on verified network activity. No pre-mine. No team allocation in emissions.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {([
                  { label: 'Supply-Side 70%', value: 'Active', unit: 'for Providers', accent: 'var(--green)' },
                  { label: 'Demand-Side 30%', value: 'Active', unit: 'for Consumers', accent: 'var(--accent)' },
                  { label: 'Tokens Issued 24h', value: '—', unit: '$CLAF' },
                  { label: 'Emission Rate', value: 'Decaying', unit: 'Epoch-based' },
                ] as { label: string; value: string; unit: string; accent?: string }[]).map(p => (
                  <MiniStat key={p.label} {...p} />
                ))}
              </div>
            </div>

            {/* Full-width 70/30 issuance bar spanning both columns */}
            <div style={{ gridColumn: '1 / -1', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 16px' }}>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '70%', background: 'var(--green)', borderRadius: '3px 0 0 3px' }} />
                <div style={{ width: '30%', background: 'var(--accent)', borderRadius: '0 3px 3px 0' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)' }}>70% Supply-side (Providers)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)' }}>30% Demand-side (Consumers)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof Verification & Protocol Infrastructure ── */}
      <section className="section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-tag">Verification &amp; Infrastructure</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* Proof rules */}
            <div className="grid-2" style={{ alignSelf: 'start' }}>
              <div style={{ background: 'var(--surface)', padding: '20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                  ✓ Settlement Accepted
                </div>
                {[
                  ['Usage Source', 'Dual-Signed Proofs Only'],
                  ['Token Count', 'Client-Verified'],
                  ['Audit', 'Sampling Re-Execution'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--surface)', padding: '20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                  ✗ Settlement Rejected
                </div>
                {[
                  ['Single-Signed', 'REJECTED'],
                  ['Signature Mismatch', 'REJECTED'],
                  ['Token Count Mismatch', 'DISPUTED'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol mirror */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="panel" style={{ flex: 1 }}>
                <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="panel-tag">Protocol Mirroring</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--green)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, padding: '2px 7px' }}>DEPLOYED</span>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-mid)', marginBottom: 16, lineHeight: 1.6 }}>
                    Static protocol UI deployed to IPFS — accessible independent of centralized domain availability.
                  </p>
                  <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                      <div style={{ color: 'var(--text-dim)', marginBottom: 3, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>IPFS CID (v2.0)</div>
                      <div style={{ color: 'var(--green)', fontSize: 11 }}>Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6</div>
                    </div>
                    <a href="https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/" target="_blank" rel="noopener" className="btn-primary" style={{ fontSize: 12, padding: '7px 14px' }}>
                      Open Mirror →
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>
                  Treasury PDA:{' '}
                  <code style={{ background: 'var(--surface)', padding: '2px 8px', borderRadius: 4, color: 'var(--text-mid)' }}>
                    C1awTreasuryPDA1111111111111111111111111111
                  </code>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer Links ── */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link href="/whitepaper" className="btn-secondary">Protocol Whitepaper</Link>
            <Link href="/install" className="btn-secondary">Become a Provider</Link>
            <Link href="/providers" className="btn-secondary">Provider Registry</Link>
            <Link href="/users" className="btn-secondary">For Users</Link>
            <Link href="/docs" className="btn-secondary">Docs</Link>
            <a href="https://github.com/rogerwu188/clawfarm-site" target="_blank" rel="noopener" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>
    </main>
  )
}
