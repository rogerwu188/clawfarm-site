import Link from 'next/link'

const CTA_CARDS = [
  {
    label: 'Start Routing →',
    desc: 'Connect a wallet, deposit USDC, and route AI requests across providers in real time.',
    href: '/users',
    primary: true,
  },
  {
    label: 'Become a Provider',
    desc: 'Register model APIs, GPU nodes, or custom endpoints. Earn 97% of every settled request.',
    href: '/install',
    primary: false,
  },
  {
    label: 'Explore Marketplace',
    desc: 'Browse providers across language, image, and video models with live pricing and usage.',
    href: '/providers',
    primary: false,
  },
]

// Deterministic seeded line path: wavy upward trend with multi-frequency noise
function genLinePath(seed: number) {
  const rand = (i: number) => {
    const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  const points: Array<[number, number]> = []
  const N = 36
  // End at x=226 (not 240) so the 14px-radius glow dot stays inside viewBox
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1)
    const x = t * 226
    const trend = 86 - t * 82
    const noise =
      Math.sin(t * 22 + seed) * 3.5 +
      Math.sin(t * 9 + seed * 2) * 4.5 +
      (rand(i) - 0.5) * 5
    const y = Math.max(3, Math.min(88, trend + noise))
    points.push([x, y])
  }
  // Catmull-Rom-ish: connect midpoints with Q curves through original points
  let d = `M ${points[0][0]} ${points[0][1].toFixed(1)}`
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i][0] + points[i + 1][0]) / 2
    const yc = (points[i][1] + points[i + 1][1]) / 2
    d += ` Q ${points[i][0]} ${points[i][1].toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`
  }
  const last = points[points.length - 1]
  d += ` L ${last[0]} ${last[1].toFixed(1)}`
  return { d, endX: last[0], endY: last[1] }
}

function LineChart({ id }: { id: number }) {
  const { d, endX, endY } = genLinePath(id)
  // Closed area path for fill below line — close vertically at endX (line endpoint)
  const areaD = `${d} L ${endX} 90 L 0 90 Z`
  return (
    <svg className="hsc-chart" viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`hsc-line-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.55)" />
          <stop offset="100%" stopColor="rgba(167, 139, 250, 1)" />
        </linearGradient>
        <linearGradient id={`hsc-area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(167, 139, 250, 0.22)" />
          <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
        </linearGradient>
        <radialGradient id={`hsc-glow-${id}`}>
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="50%" stopColor="rgba(167, 139, 250, 0.6)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`hsc-blur-${id}`}>
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>
      <path d={areaD} fill={`url(#hsc-area-${id})`} />
      <path
        d={d}
        stroke={`url(#hsc-line-${id})`}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#hsc-blur-${id})`}
      />
      <circle cx={endX} cy={endY} r="14" fill={`url(#hsc-glow-${id})`} />
      <circle cx={endX} cy={endY} r="3.5" fill="#fff" />
    </svg>
  )
}

function BarChart() {
  const bars = [18, 14, 24, 30, 20, 26, 32, 40, 28, 36, 30, 38, 44, 36, 48]
  return (
    <svg className="hsc-chart" viewBox="0 0 240 50" preserveAspectRatio="none" aria-hidden>
      {bars.map((h, idx) => (
        <rect
          key={idx}
          x={idx * 16 + 2}
          y={50 - h}
          width={10}
          height={h}
          rx="1.5"
          fill="rgba(255, 255, 255, 0.22)"
        />
      ))}
    </svg>
  )
}

type Stat = {
  label: string
  value: React.ReactNode
  desc?: string
  chart: 'line' | 'bar' | 'none'
  className: string
}

const STATS: Stat[] = [
  {
    label: 'Provider Revenue',
    value: <><span data-count={97}>97</span><span className="hi">%</span></>,
    chart: 'line',
    className: 'card-1',
  },
  {
    label: 'Settlement Time',
    value: <>&lt;<span data-count={400}>400</span><span className="hi">ms</span></>,
    chart: 'bar',
    className: 'card-2',
  },
  {
    label: 'Requests Routed',
    value: <><span data-count="12.4" data-decimals="1">12.4</span><span className="hi">M</span></>,
    chart: 'line',
    className: 'card-3',
  },
  {
    label: 'Marketplace',
    value: <span className="hi">∞</span>,
    desc: 'Open to all',
    chart: 'none',
    className: 'card-4',
  },
]

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-aurora" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-beam" />
        <div className="hero-streak" />
        <div className="hero-glow-right" />
      </div>

      <div className="hero-inner-split">
        <div className="hero-grid-split">
          <div className="hero-left">
            <span className="hero-eyebrow">
              <span className="dot" />
              Early Access
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              &lt;400ms Settlement
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              Solana
            </span>

            <h1 className="hero-title">
              The decentralized<br />
              <span className="accent">AI token router.</span>
            </h1>

            <p className="hero-subtitle">
              Route AI requests across competing providers — every token metered,
              every payment settled on-chain. No middleman custody.
            </p>

            <div className="hero-cta-cards">
              {CTA_CARDS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={`hero-cta-item spotlight${c.primary ? ' cta-primary' : ''}`}
                >
                  <span className="hero-cta-label">{c.label}</span>
                  <span className="hero-cta-desc">{c.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-right hero-right-grid">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`hero-stat-card spotlight tilt ${s.className}${s.chart === 'none' ? ' hsc-mini' : ''}`}
              >
                <div className="hsc-label">{s.label}</div>
                <div className="hsc-value">{s.value}</div>
                {s.chart === 'line' && <LineChart id={i + 1} />}
                {s.chart === 'bar' && <BarChart />}
                {s.desc && <div className="hsc-mini-desc">{s.desc}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Subtle horizontal "Live Network" status strip — sits below the hero grid */}
        <div className="live-network-strip">
          <div className="lns-row">
            <span className="lns-head">
              <span className="state-dot" />
              Live Network
            </span>
            <span className="lns-divider" />
            <span className="lns-item">
              <span className="lns-label">Routing</span>
              <span className="lns-value">eco · auto · premium</span>
            </span>
            <span className="lns-item">
              <span className="lns-label">Settlement</span>
              <span className="lns-value lns-accent">On-Chain · Solana</span>
            </span>
            <span className="lns-item">
              <span className="lns-label">Custody</span>
              <span className="lns-value lns-accent">Non-Custodial</span>
            </span>
            <span className="lns-item">
              <span className="lns-label">Provider Gate</span>
              <span className="lns-value">Open — No Approval</span>
            </span>
            <span className="lns-item">
              <span className="lns-label">Metering</span>
              <span className="lns-value">Per-Token · Per-Request</span>
            </span>
            <span className="lns-item">
              <span className="lns-label">Marketplace</span>
              <span className="lns-value">Models · APIs · GPUs</span>
            </span>
          </div>
          <p className="lns-note">
            Select a route, sign token usage — settlement happens on-chain without platform custody.
          </p>
        </div>
      </div>
    </section>
  )
}
