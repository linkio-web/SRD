'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

interface ScrollExpansionHeroProps {
  mediaSrc: string
  title: string
  subtitle?: string
  scrollLabel?: string
  children?: ReactNode
}

export function ScrollExpansionHero({
  mediaSrc,
  title,
  subtitle,
  scrollLabel = 'Faire défiler pour découvrir',
  children,
}: ScrollExpansionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Split title on first space
  const spaceIdx = title.indexOf(' ')
  const firstWord = spaceIdx > -1 ? title.slice(0, spaceIdx) : title
  const restWords = spaceIdx > -1 ? title.slice(spaceIdx + 1) : ''

  /* ── Header visibility: hidden until animation completes ── */
  useEffect(() => {
    document.documentElement.dataset.heroActive = ''
    return () => { delete document.documentElement.dataset.heroActive }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.45) {
      delete document.documentElement.dataset.heroActive
    } else {
      document.documentElement.dataset.heroActive = ''
    }
  })

  /* ── Phase 1 : media expansion (0 → 45 %) ── */
  const mediaScale = useTransform(scrollYProgress, [0, 0.45], [0.6, 1])
  const mediaBorderRadius = useTransform(scrollYProgress, [0, 0.45], [28, 0])

  /* ── Phase 1 : title split left/right & fade (5 → 40 %) ── */
  const titleLeftX = useTransform(scrollYProgress, [0.05, 0.4], [0, -80])
  const titleRightX = useTransform(scrollYProgress, [0.05, 0.4], [0, 80])
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])

  /* ── Phase 1 : subtitle fade (10 → 35 %) ── */
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0])

  /* ── Scroll indicator ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  /* ── Phase 2 : children fade in (55 → 75 %) ── */
  const childrenOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const childrenY = useTransform(scrollYProgress, [0.55, 0.75], [50, 0])

  return (
    <div ref={containerRef} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background navy uni avec dégradé subtil */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(151,20,79,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 100%, rgba(48,27,74,0.8) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Panneau central expansif (image arrondie → plein écran) */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden will-change-transform"
          style={{
            scale: mediaScale,
            borderRadius: mediaBorderRadius,
          }}
          aria-hidden="true"
        >
          <Image
            src={mediaSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/65" />
        </motion.div>

        {/* Title overlay — two lines, "SRD" slides left, "Partners" slides right */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: titleOpacity }}
        >
          <div className="flex flex-col items-center">
            <motion.span
              className="font-display text-5xl sm:text-8xl lg:text-[8rem] font-light text-white leading-none"
              style={{ x: titleLeftX }}
            >
              {firstWord}
            </motion.span>
            {restWords && (
              <motion.span
                className="font-display text-5xl sm:text-8xl lg:text-[8rem] font-light italic text-gold leading-none mt-1 sm:mt-2"
                style={{ x: titleRightX }}
              >
                {restWords}
              </motion.span>
            )}
            {subtitle && (
              <motion.p
                className="font-body text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white/90 mt-5 px-6 text-center"
                style={{ opacity: subtitleOpacity }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
          style={{ opacity: indicatorOpacity }}
          aria-hidden="true"
        >
          <span className="font-body text-[10px] tracking-[0.18em] uppercase text-white/50">
            {scrollLabel}
          </span>
          <span className="block w-px h-8 bg-white/30 animate-pulse" />
        </motion.div>

        {/* Children content (appears after expansion) */}
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ opacity: childrenOpacity, y: childrenY }}
        >
          <div className="w-full">{children}</div>
        </motion.div>
      </div>
    </div>
  )
}
