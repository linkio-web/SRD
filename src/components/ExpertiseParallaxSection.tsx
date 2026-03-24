'use client'

/**
 * ExpertiseParallaxSection
 * ─────────────────────────────────────────────────────────────────────────────
 * Desktop ≥ 1024px
 *   • Section 200vh (.expertise-track) — espace de scroll pour le parallaxe
 *   • Contenu pincé 100vh (.expertise-pin) — sticky top:0
 *   • Grid 2 col : texte à gauche | scène visuelle à droite
 *   • GSAP scrub anime 3 blobs CSS dans la colonne droite
 *
 * Mobile < 1024px
 *   • Bandeau visuel statique (gradient CSS) en haut, contenu en dessous
 *   • Aucune animation, aucun sticky
 *
 * Accessibilité : prefers-reduced-motion → aucun GSAP, scène statique
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { Icon } from '@/lib/icons'
import type { IconName } from '@/lib/siteData'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExpertiseItem {
  title: string
  shortDesc: string
  href: string
  icon: IconName
}

export interface ExpertiseParallaxSectionProps {
  overline: string
  titleMain: string
  titleAccent: string
  subtitle: string
  items: ExpertiseItem[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExpertiseParallaxSection({
  overline,
  titleMain,
  titleAccent,
  subtitle,
  items,
}: ExpertiseParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const blob1Ref   = useRef<HTMLDivElement>(null)
  const blob2Ref   = useRef<HTMLDivElement>(null)
  const blob3Ref   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      if (!section) return

      const trigger = {
        trigger: section,
        start: 'top bottom',
        end:   'bottom top',
        scrub: 1.4,
      }

      // Blob violet — monte lentement avec le scroll
      if (blob1Ref.current) {
        gsap.fromTo(blob1Ref.current,
          { y: 60 },
          { y: -100, ease: 'none', scrollTrigger: trigger },
        )
      }
      // Blob cramoisi — descend en sens inverse (profondeur)
      if (blob2Ref.current) {
        gsap.fromTo(blob2Ref.current,
          { y: -70 },
          { y: 110, ease: 'none', scrollTrigger: trigger },
        )
      }
      // Accent subtil — très léger (quasi statique)
      if (blob3Ref.current) {
        gsap.fromTo(blob3Ref.current,
          { y: 30, x: -12 },
          { y: -45, x: 18, ease: 'none', scrollTrigger: trigger },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative bg-navy expertise-track"
    >
      {/* Fondu de raccord hero → expertise */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #130918, transparent)' }}
        aria-hidden="true"
      />

      <div className="expertise-pin">

        {/* ── Mobile : bandeau visuel statique ──────────────────────────── */}
        <div
          className="lg:hidden relative h-52 overflow-hidden"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 72% 28%, rgb(101, 54, 109,0.32) 0%, transparent 58%),' +
              'radial-gradient(ellipse at 20% 72%, rgb(128, 15, 51,0.20) 0%, transparent 52%),' +
              '#301236',
          }}
        >
          <svg
            viewBox="0 0 500 250"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.055 }}
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <circle cx="250" cy="125" r="230" stroke="white" strokeWidth="1"   fill="none" />
            <circle cx="250" cy="125" r="160" stroke="white" strokeWidth="0.6" fill="none" />
            <circle cx="250" cy="125" r="85"  stroke="white" strokeWidth="0.4" fill="none" />
          </svg>
        </div>

        {/* ── Grille principale ─────────────────────────────────────────── */}
        <div className="container-main py-12 lg:py-0 lg:h-full">
          <div className="lg:grid lg:grid-cols-2 lg:h-full">

            {/* ── Colonne texte ──────────────────────────────────────────── */}
            <div className="lg:flex lg:flex-col lg:justify-center lg:pr-16">

              {/* En-tête */}
              <div className="mb-10">
                <p className="section-label text-gold/80 mb-5">{overline}</p>
                <PremiumHeading as="h2" size="section" color="light">
                  {titleMain} <Accent>{titleAccent}</Accent>
                </PremiumHeading>
                <p className="font-body text-white/55 text-base sm:text-lg leading-relaxed mt-5 max-w-[50ch]">
                  {subtitle}
                </p>
              </div>

              {/* Liste numérotée des services */}
              <ul>
                {items.map((item, i) => (
                  <li
                    key={item.href}
                    className={i > 0 ? 'border-t border-white/[0.07]' : ''}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center gap-5 py-[1.15rem] -mx-2 px-2 rounded-xl hover:bg-white/[0.04] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      {/* Index */}
                      <span className="font-display text-[11px] leading-none text-gold/40 group-hover:text-gold/65 transition-colors duration-300 w-6 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Icône */}
                      <div className="w-9 h-9 rounded-lg bg-gold/[0.08] text-gold flex items-center justify-center shrink-0 group-hover:bg-gold/[0.16] transition-colors duration-300">
                        <Icon name={item.icon} size={17} strokeWidth={1.5} />
                      </div>

                      {/* Texte */}
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-white/85 group-hover:text-white transition-colors duration-200 leading-snug">
                          {item.title}
                        </p>
                        <p className="font-body text-xs text-white/40 leading-relaxed mt-0.5 truncate">
                          {item.shortDesc}
                        </p>
                      </div>

                      {/* Flèche */}
                      <Icon
                        name="arrow"
                        size={15}
                        strokeWidth={1.5}
                        className="shrink-0 text-gold/30 group-hover:text-gold transition-all duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            {/* ── Colonne visuelle (desktop uniquement) ──────────────────── */}
            <div
              className="hidden lg:block relative overflow-hidden"
              aria-hidden="true"
            >
              {/* Blob violet — haut-droite, monte au scroll */}
              <div
                ref={blob1Ref}
                className="absolute -top-36 -right-10 w-[540px] h-[540px] rounded-full bg-primary-500/[0.22] blur-3xl will-change-transform"
              />

              {/* Blob cramoisi — bas-gauche, descend au scroll */}
              <div
                ref={blob2Ref}
                className="absolute -bottom-36 -left-20 w-[420px] h-[420px] rounded-full bg-gold/[0.16] blur-3xl will-change-transform"
              />

              {/* Accent violet-clair — centre, léger mouvement diagonal */}
              <div
                ref={blob3Ref}
                className="absolute top-[30%] left-[22%] w-[240px] h-[240px] rounded-full bg-primary-400/[0.13] blur-2xl will-change-transform"
              />

              {/* Anneaux décoratifs concentriques */}
              <svg
                viewBox="0 0 500 700"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.05 }}
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <circle cx="250" cy="350" r="310" stroke="white" strokeWidth="1"   fill="none" />
                <circle cx="250" cy="350" r="220" stroke="white" strokeWidth="0.6" fill="none" />
                <circle cx="250" cy="350" r="125" stroke="white" strokeWidth="0.4" fill="none" />
                <circle cx="250" cy="350" r="55"  stroke="white" strokeWidth="0.3" fill="none" />
              </svg>

              {/* Fondu bord gauche → raccord avec la colonne texte */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

