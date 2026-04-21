import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
import { buildAlternates, socialMeta } from '@/lib/seo'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Icon } from '@/lib/icons'
import { parseLine } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)
  return {
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    alternates: buildAlternates(validLocale, '/services'),
    ...socialMeta(validLocale, t.meta.servicesTitle, t.meta.servicesDescription, '/services'),
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-32 pb-16 sm:pt-44 sm:pb-20">

        <div className="container-main relative z-10 text-center">
          <div className="max-w-2xl mx-auto">

            <span className="section-label text-gold/55">{t.services.pageOverline}</span>

            <PremiumHeading as="h1" size="page" color="light" className="mt-2">
              {t.services.pageTitle1} <Accent>{t.services.pageTitle2}</Accent>
            </PremiumHeading>

            <div className="w-8 h-px bg-white/20 mx-auto my-6" aria-hidden="true" />

            <p className="font-body text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              {t.services.pageSubtitle}
            </p>

          </div>
        </div>
      </section>

      {/* ── Liste des services ─────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full"
          style={{ height: 'var(--slant-h)' }}
        >
          <polygon points="0,0 1440,0 1440,56" fill={BG.navy} />
        </svg>

        <div className="container-main pt-28 sm:pt-36 pb-20 sm:pb-28">

          <ScrollReveal stagger={0.12}>
          {services.map((s, i) => (
            <article
              key={s.id}
              className="py-10 sm:py-12 border-b border-ink/[0.06] last:border-b-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[2.5rem_1fr_1fr] gap-x-10 lg:gap-x-16 gap-y-5 items-start">

                {/* Numéro */}
                <div
                  className="font-body text-[9px] tracking-[0.20em] text-muted/40 font-medium mt-1 select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Titre + description */}
                <div>
                  <h2 className="font-display text-2xl sm:text-[1.75rem] font-light text-navy leading-tight mb-3">
                    {t.services.items[i].title}
                  </h2>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {t.services.items[i].shortDesc}
                  </p>
                </div>

                {/* Bullets + CTA */}
                <div>
                  <ul className="mb-0">
                    {t.services.items[i].bullets.slice(0, 2).map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 py-2 border-b border-ink/[0.05] last:border-b-0"
                      >
                        <span className="text-gold/60 text-xs mt-0.5 shrink-0" aria-hidden="true">—</span>
                        <span className="font-body text-xs text-muted">
                          {parseLine(bullet).title}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${validLocale}/services/${s.id}`}
                    className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-navy hover:text-gold transition-colors group"
                  >
                    {t.services.discoverCta}
                    <Icon
                      name="arrow"
                      size={14}
                      strokeWidth={2}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>

              </div>
            </article>
          ))}
          </ScrollReveal>

        </div>
      </section>

      {/* ── Promesse ───────────────────────────────────── */}
      <section className="bg-stone py-20 sm:py-28">
        <div className="container-main">
          <ScrollReveal stagger={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div>
              <span className="section-label">{t.services.promiseOverline}</span>
              <h2 className="font-display text-3xl sm:text-[2.4rem] font-light text-navy leading-[1.2] mt-1">
                {t.services.promiseTitle}
              </h2>
              <div className="w-8 h-px bg-gold/35 mt-6" aria-hidden="true" />
            </div>

            <div>
              <p className="font-body text-sm text-muted leading-relaxed mb-8">
                {t.services.promiseText}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link href={`/${validLocale}/contact`} className="btn-primary">
                  {t.services.promiseCta1}
                  <Icon name="arrow" size={15} strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link href={`/${validLocale}/qui-sommes-nous`} className="btn-outline">
                  {t.services.promiseCta2}
                </Link>
              </div>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <ContactBlock bg="cream" slant="right" slantFill={BG.stone} t={t.contact.form} />

      {/* ── Footer ─────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} />
    </>
  )
}
