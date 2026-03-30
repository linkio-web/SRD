'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  value: string           // e.g. "15+", "400+"
  label: string
  duration?: number       // animation duration in ms (default 1400)
  color?: 'dark' | 'light' // dark = on cream/stone bg, light = on navy bg (default: dark)
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function StatCounter({ value, label, duration = 1400, color = 'dark' }: StatCounterProps) {
  const match  = value.match(/^(\d+)(\D*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  const [displayed, setDisplayed] = useState(0)
  const [started, setStarted]     = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const startTime = performance.now()

    let raf: number
    function tick(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeOutCubic(progress)
      setDisplayed(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  return (
    <div ref={ref} className="py-6">
      <p className={`font-display text-[2rem] sm:text-5xl font-light leading-none mb-2 ${color === 'light' ? 'text-cream' : 'text-navy'}`}>
        {displayed}{suffix}
      </p>
      <p className={`font-body text-[10px] sm:text-xs tracking-wide ${color === 'light' ? 'text-cream/60' : 'text-muted'}`}>{label}</p>
    </div>
  )
}
