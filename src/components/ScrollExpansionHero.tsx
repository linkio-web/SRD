'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

interface ScrollExpansionHeroProps {
  mediaSrc: string
  bgImageSrc?: string
  title: string
  subtitle?: string
  scrollLabel?: string
  textBlend?: boolean
  children?: ReactNode
}

export function ScrollExpansionHero({
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollLabel = 'Faire défiler pour découvrir',
  textBlend = false,
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
  const titleLeftX = useTransform(scrollYProgress, [0.05, 0.4], [0, -150])
  const titleRightX = useTransform(scrollYProgress, [0.05, 0.4], [0, 150])
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])

  /* ── Phase 1 : bg & subtitle fade (10 → 40 %) ── */
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0])
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0])

  /* ── Scroll indicator ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  /* ── Phase 2 : children fade in (55 → 75 %) ── */
  const childrenOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const childrenY = useTransform(scrollYProgress, [0.55, 0.75], [50, 0])

  return (
    <div ref={containerRef} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background layer (navy + optional image) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: bgOpacity }}
          aria-hidden="true"
        >
          {bgImageSrc ? (
            <>
              <Image
                src={bgImageSrc}
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
            </>
          ) : (
            <div className="absolute inset-0 bg-navy" />
          )}
        </motion.div>

        {/* Expanding media */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden will-change-transform"
          style={{
            scale: mediaScale,
            borderRadius: mediaBorderRadius,
          }}
        >
          <Image
            src={mediaSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/35" aria-hidden="true" />
        </motion.div>

        {/* Title overlay — two lines, "SRD" slides left, "Partners" slides right */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: titleOpacity }}
        >
          <div className={`flex flex-col items-center ${textBlend ? 'mix-blend-difference' : ''}`}>
            <motion.span
              className="font-display text-6xl sm:text-8xl lg:text-[8rem] font-light text-white leading-none"
              style={{ x: titleLeftX }}
            >
              {firstWord}
            </motion.span>
            {restWords && (
              <motion.span
                className="font-display text-6xl sm:text-8xl lg:text-[8rem] font-light italic text-gold leading-none mt-2"
                style={{ x: titleRightX }}
              >
                {restWords}
              </motion.span>
            )}
            {subtitle && (
              <motion.p
                className="font-body text-xs sm:text-sm tracking-[0.18em] uppercase text-white/60 mt-6"
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
        >
          <span className="font-body text-[10px] tracking-[0.18em] uppercase text-white/50">
            {scrollLabel}
          </span>
          <span className="block w-px h-8 bg-white/30 animate-pulse" aria-hidden="true" />
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
