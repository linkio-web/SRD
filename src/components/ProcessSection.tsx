'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  number: string
  title: string
  description: string
  deliverables: string[]
}

interface ProcessSectionProps {
  t: {
    overline: string
    titleMain: string
    titleAccent: string
    deliverablesLabel: string
    steps: ProcessStep[]
  }
  /** Couleur du biseau supérieur — doit correspondre au bg de la section précédente */
  slantFill?: string
}

export function ProcessSection({ t, slantFill }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      // x est une fonction pour recalcul correct au resize (invalidateOnRefresh)
      gsap.to(track, {
        x: () => -(window.innerWidth * (t.steps.length - 1)),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // "bottom bottom" = quand le bas de la section atteint le bas du viewport
          // équivalent à l'ancien +=${innerHeight * 3} pour 4 étapes (4×100vh - 100vh = 300vh)
          end: 'bottom bottom',
          // Pas de pin:true — le sticky CSS gère l'ancrage sans toucher au DOM
          scrub: 1.2,
          snap: {
            snapTo: 1 / (t.steps.length - 1),
            duration: { min: 0.25, max: 0.5 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            setActiveStep(Math.round(self.progress * (t.steps.length - 1)))
          },
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [t.steps.length])

  const { steps } = t

  return (
    // Pas d'overflow-hidden sur la section : nécessaire pour que position:sticky
    // fonctionne sur l'enfant. Le biseau est clippé dans son propre wrapper.
    <section ref={sectionRef} className="relative bg-navy">

      {/* ── DESKTOP : conteneur tall pour le scroll, sticky interne ─────── */}
      {/* height = steps.length × 100vh crée l'espace de scroll nécessaire  */}
      <div
        className="hidden md:block"
        style={{ height: `${steps.length * 100}vh` }}
      >
        {/* sticky top-0 remplace pin:true — ancrage CSS, zéro manipulation DOM */}
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden z-20">
          {/* En-tête */}
          <div className="container-main text-center pt-28 pb-8 shrink-0">
            <span className="section-label text-gold/70">{t.overline}</span>
            <PremiumHeading as="h2" size="section" color="light" className="mt-2">
              {t.titleMain} <Accent>{t.titleAccent}</Accent>
            </PremiumHeading>
          </div>

          {/* Zone de défilement horizontal */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
              style={{
                width: `${steps.length * 100}vw`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center justify-center shrink-0 px-12 lg:px-20"
                  style={{ width: '100vw' }}
                >
                  <div className="max-w-2xl w-full">
                    {/* Numéro fantôme */}
                    <p
                      className="font-display leading-none text-white/[0.035] select-none -mb-6"
                      style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </p>

                    {/* Titre */}
                    <h3 className="font-body text-3xl lg:text-4xl font-light text-white mb-5 leading-[1.2]">
                      {step.title}
                    </h3>

                    {/* Séparateur doré */}
                    <div className="h-px w-10 bg-gold/50 mb-6" />

                    {/* Description */}
                    <p className="font-body text-white/55 text-base leading-relaxed mb-8">
                      {step.description}
                    </p>

                    {/* Livrables */}
                    <div>
                      <span className="section-label text-gold/60 mb-3 block">
                        {t.deliverablesLabel}
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <li
                            key={d}
                            className="font-body text-[13px] text-white/65 border border-white/[0.12] rounded-full px-4 py-1.5 bg-white/[0.04]"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nodes de la timeline */}
          <div className="container-main pb-14 mt-14 shrink-0">
            {/* Titre de l'étape active — au-dessus de la ligne */}
            <div className="flex justify-between mb-8 px-1">
              {steps.map((step, i) => (
                <span
                  key={step.number}
                  className={cn(
                    'font-body text-sm font-semibold leading-tight text-center transition-all duration-500 ease-out',
                    'w-[25%]',
                    i === activeStep
                      ? 'text-white/95 opacity-100 translate-y-0'
                      : 'text-white/0 opacity-0 translate-y-1',
                  )}
                  aria-hidden={i !== activeStep}
                >
                  {step.title}
                </span>
              ))}
            </div>

            {/* Ligne + nœuds */}
            <div className="relative flex items-center justify-between">
              {/* Ligne de fond */}
              <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/[0.10]" />
              {/* Barre de progression */}
              <div
                className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-gold/60 transition-all duration-500 ease-out"
                style={{
                  width:
                    steps.length > 1
                      ? `${(activeStep / (steps.length - 1)) * 100}%`
                      : '0%',
                }}
              />

              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={cn(
                      'flex items-center justify-center rounded-full',
                      'font-body font-bold tabular-nums',
                      'transition-all duration-500 ease-out',
                      i < activeStep
                        ? 'w-8 h-8 text-[11px] bg-primary-500/70 text-white'
                        : i === activeStep
                          ? 'w-11 h-11 text-[13px] bg-primary-500 text-white shadow-[0_0_0_5px_rgba(48,27,74,0.30)]'
                          : 'w-8 h-8 text-[11px] bg-white/10 text-white/35',
                    )}
                  >
                    {step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE : cartes verticales ──────────────────── */}
      <div className="md:hidden relative z-20 container-main pt-28 pb-16">
        <div className="text-center mb-12">
          <span className="section-label text-gold/70">{t.overline}</span>
          <PremiumHeading as="h2" size="section" color="light" className="mt-2">
            {t.titleMain} <Accent>{t.titleAccent}</Accent>
          </PremiumHeading>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center font-body font-bold text-[10px] shrink-0">
                  {step.number}
                </div>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <h3 className="font-body text-xl font-light text-white mb-3 leading-[1.25]">
                {step.title}
              </h3>
              <div className="h-px w-8 bg-gold/40 mb-4" />
              <p className="font-body text-sm text-white/55 leading-relaxed mb-6">
                {step.description}
              </p>

              <span className="section-label text-gold/60 mb-3 block">
                {t.deliverablesLabel}
              </span>
              <ul className="flex flex-wrap gap-2">
                {step.deliverables.map((d) => (
                  <li
                    key={d}
                    className="font-body text-[12px] text-white/60 border border-white/[0.10] rounded-full px-3 py-1 bg-white/[0.04]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
