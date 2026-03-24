import Image from 'next/image'
import { BG } from '@/lib/siteData'

interface ImageBreakProps {
  /** Short premium tagline displayed in the center of the break */
  tagline: string
}

/**
 * Scene C — Image Break.
 * Reuses the hero building image with a deep navy overlay.
 * The image itself has extra vertical bleed (top/bottom) to allow
 * the GSAP parallax in HomeParallax.tsx to animate without exposing edges.
 * The bottom gradient fades toward BG.cream so the rising Features panel
 * blends naturally over it.
 */
export function ImageBreak({ tagline }: ImageBreakProps) {
  return (
    <section
      data-section="image-break"
      className="relative h-[38vh] sm:h-[44vh] overflow-hidden"
      aria-label="Section visuelle"
    >
      {/* ── Background image layer — extends beyond section for parallax travel ── */}
      <div
        data-parallax="break-img"
        className="absolute left-0 right-0 will-change-transform"
        style={{ top: '-14%', bottom: '-14%' }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-building.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Primary dark overlay — keeps image readable and brand-consistent */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(var(--primary-950-rgb),0.84) 0%, rgba(var(--primary-900-rgb),0.72) 100%)' }}
        />
        {/* Accent glow — echoes the hero radial */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 75% 40%, rgba(var(--gold-rgb),0.08) 0%, transparent 65%)' }}
        />
        {/* Bottom gradient — blends into the cream Features panel rising over it */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${BG.cream})` }}
        />
      </div>

      {/* ── Centered tagline ── */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <figure className="text-center">
          <div className="w-10 h-px bg-gold/50 mx-auto mb-7" aria-hidden="true" />
          <blockquote className="font-display text-white/88 text-xl sm:text-2xl lg:text-[1.75rem] font-light italic leading-relaxed max-w-sm sm:max-w-lg mx-auto">
            {tagline}
          </blockquote>
          <div className="w-10 h-px bg-gold/50 mx-auto mt-7" aria-hidden="true" />
        </figure>
      </div>
    </section>
  )
}

