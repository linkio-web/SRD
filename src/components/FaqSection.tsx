'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface FaqItem {
  question: string
  answer: string
  ctaLabel?: string
}

interface FaqSectionProps {
  t: {
    overline: string
    titleMain: string
    titleAccent: string
    subtitle: string
    items: FaqItem[]
  }
  contactHref: string
}

export function FaqSection({ t, contactHref }: FaqSectionProps) {
  // "Est-ce confidentiel ?" is the last item — open by default
  const [openIndex, setOpenIndex] = useState<number | null>(t.items.length - 1)

  return (
    <section className="relative bg-cream py-20 sm:py-28 overflow-hidden">
      <div className="container-main">

        {/* En-tête */}
        <div className="max-w-xl mb-14 sm:mb-18">
          <span className="section-label">{t.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark" className="mt-2 mb-3">
            {t.titleMain} <Accent>{t.titleAccent}</Accent>
          </PremiumHeading>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        {/* Accordéon */}
        <div>
          {t.items.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className="border-b border-ink/[0.06] last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={cn(
                    'w-full flex items-center justify-between gap-6 py-6 sm:py-7 text-left',
                    'font-display text-lg sm:text-xl font-light leading-snug',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded',
                    isOpen ? 'text-navy' : 'text-navy/80 hover:text-navy',
                  )}
                >
                  <span>{item.question}</span>

                  <span
                    className={cn(
                      'flex-shrink-0 transition-transform duration-300 ease-smooth text-muted/50',
                      isOpen ? 'rotate-90' : '',
                    )}
                    aria-hidden="true"
                  >
                    <Icon name="chevron" size={14} strokeWidth={2} />
                  </span>
                </button>

                {/* Réponse — animation grid-template-rows */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-smooth"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 sm:pb-7 pr-10 max-w-2xl">
                      <p
                        className={cn(
                          'font-body text-sm sm:text-[15px] text-muted leading-[1.80]',
                          'transition-opacity duration-200',
                          isOpen ? 'opacity-100' : 'opacity-0',
                        )}
                      >
                        {item.answer}
                      </p>

                      {item.ctaLabel && (
                        <Link
                          href={contactHref}
                          className={cn(
                            'inline-flex items-center gap-1.5 mt-4',
                            'font-body text-sm font-medium text-gold hover:text-gold/80',
                            'transition-colors duration-200',
                            isOpen ? 'opacity-100' : 'opacity-0',
                          )}
                        >
                          {item.ctaLabel}
                          <Icon name="arrow" size={13} strokeWidth={2} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
