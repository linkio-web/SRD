'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  value: string      // e.g. "15+", "200+", "4"
  label: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function StatCounter({ value, label }: StatCounterProps) {
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

    const duration = 1400 // ms
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
  }, [started, target])

  return (
    <div ref={ref} className="text-center py-6">
      {/* MODIFIED: text-navy → text-champagne pour les chiffres de stats */}
      <p className="font-display text-[2rem] sm:text-5xl font-semibold text-champagne leading-none mb-2">
        {displayed}{suffix}
      </p>
      <p className="font-body text-[10px] sm:text-xs text-muted tracking-wide">{label}</p>
    </div>
  )
}
