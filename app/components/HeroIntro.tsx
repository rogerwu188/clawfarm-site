'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Full-screen video intro shown only on the very first homepage mount of a JS context.
 *
 * - Module-level `hasShownIntro` survives SPA navigations (Link clicks),
 *   so going /docs → / via the router skips the intro.
 * - A browser refresh or fresh URL entry re-evaluates the module → intro plays again.
 * - Strict-Mode-safe: a per-instance ref distinguishes "we set the module flag" from
 *   "another component instance set it", so React 18 dev double-invocation doesn't break.
 *
 * Total timing: ≤2s (1.4s video / cap + 0.6s fade).
 */
let hasShownIntro = false

export default function HeroIntro() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const ownsFlagRef = useRef(false)

  useEffect(() => {
    // If the flag is set but THIS instance didn't set it, another instance already played → skip.
    // (In React Strict Mode the same instance's effect runs twice; ownsFlagRef stays true the
    //  second time, so we still re-schedule timers correctly after the cleanup clears them.)
    if (hasShownIntro && !ownsFlagRef.current) {
      setVisible(false)
      return
    }
    hasShownIntro = true
    ownsFlagRef.current = true
    setMounted(true)

    const fadeTimer = window.setTimeout(() => setFading(true), 1400)
    const removeTimer = window.setTimeout(() => setVisible(false), 2000)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!mounted || !visible) return null

  return (
    <div className={`hero-intro${fading ? ' is-fading' : ''}`} aria-hidden="true">
      <video
        ref={videoRef}
        src="/0506%20(3).mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setFading(true)}
      />
    </div>
  )
}
