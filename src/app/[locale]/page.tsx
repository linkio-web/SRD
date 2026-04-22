import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
import { buildAlternates, socialMeta } from '@/lib/seo'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ProcessSection } from '@/components/ProcessSection'
import { FaqSection } from '@/components/FaqSection'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ScrollExpansionHero } from '@/components/ScrollExpansionHero'
import { Icon } from '@/lib/icons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)
  return {
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    alternates: buildAlternates(validLocale, ''),
    ...socialMeta(validLocale, t.meta.homeTitle, t.meta.homeDescription, ''),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return (
    <>
      {/* Set data-hero-active before paint so the Header starts hidden (no flash) */}
      <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.heroActive=""' }} />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <ScrollExpansionHero
        mediaSrc="/images/vernets-bg.webp"
        title={t.brand.name}
        subtitle={t.hero.overline}
        scrollLabel={t.hero.scroll}
      >
        <div className="flex flex-col items-center text-center px-6 sm:px-16 gap-5 sm:gap-6 max-w-2xl mx-auto w-full">
          <p className="section-label text-gold/80">{t.hero.overline}</p>

          <p className="font-body text-white/80 text-sm sm:text-lg max-w-md leading-relaxed">
            {t.hero.baseline}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <Link href={`/${validLocale}/contact`} className="btn-primary justify-center">
              {t.nav.cta}
              <Icon name="arrow" size={15} strokeWidth={2} />
            </Link>
            <Link href={`/${validLocale}/services`} className="btn-outline-dark justify-center">
              {t.hero.ctaSecondary}
            </Link>
          </div>

          {/* Tags services */}
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-2 pt-5 border-t border-white/10 w-full">
            {t.services.items.map((s) => (
              <span key={s.title} className="text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.14em] text-white/50 font-body">
                <span className="text-gold/60 mr-2" aria-hidden="true">—</span>{s.title}
              </span>
            ))}
          </div>
        </div>
      </ScrollExpansionHero>

      {/* ── SERVICES ────────────────────────────────────────────── */}
      <section className="bg-navy relative overflow-hidden">

        <div className="relative z-10 container-main py-20 sm:py-28">

          {/* En-tête */}
          <div className="flex items-end justify-between pb-8 sm:pb-10 border-b border-white/[0.14]">
            <div>
              <span className="section-label text-gold">{t.services.overline}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-white mt-1 leading-tight">
                {t.services.titleMain}{' '}
                <span className="italic text-white/75">{t.services.titleAccent}</span>
              </h2>
            </div>
            <Link
              href={`/${validLocale}/services`}
              className="hidden sm:flex items-center gap-1.5 font-body text-xs text-white/50 hover:text-white transition-colors duration-200 shrink-0 ml-8 pb-1"
            >
              {t.services.cta}
              <Icon name="arrow" size={13} strokeWidth={2} />
            </Link>
          </div>

          {/* Liste services */}
          <ScrollReveal stagger={0.08}>
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/${validLocale}/services/${s.id}`}
                className="group flex items-center justify-between py-6 sm:py-8 border-b border-white/[0.10] hover:border-white/[0.22] transition-colors duration-300"
              >
                <div className="flex items-center gap-5 sm:gap-10">
                  <span
                    className="font-body text-[9px] tracking-[0.18em] text-white/35 font-medium w-5 shrink-0 select-none group-hover:text-gold transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] font-light text-white group-hover:text-white transition-colors duration-300 leading-tight">
                      {t.services.items[i].title}
                    </p>
                    <p className="font-body text-xs text-white/50 mt-1 group-hover:text-white/70 transition-colors duration-300">
                      {t.services.items[i].shortDesc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-4">
                  <div className="w-9 h-9 rounded-full border border-white/[0.18] flex items-center justify-center text-white/40 group-hover:border-white/50 group-hover:text-white transition-all duration-300">
                    <Icon name="arrow" size={14} strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </ScrollReveal>

          {/* CTA mobile */}
          <div className="mt-8 sm:hidden">
            <Link href={`/${validLocale}/services`} className="btn-outline-dark w-full justify-center">
              {t.services.cta}
              <Icon name="arrow" size={15} strokeWidth={2} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── ENGAGEMENTS ─────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        <div className="relative z-10 container-main pt-20 sm:pt-28 pb-20 sm:pb-28">

          <div className="max-w-xl mb-14 sm:mb-18">
            <h2 className="font-display text-3xl sm:text-[2.4rem] font-light text-navy leading-[1.2] tracking-[-0.015em]">
              {t.features.titleMain}{' '}
              <span className="italic text-gold/80">{t.features.titleAccent}</span>
            </h2>
          </div>

          <ScrollReveal stagger={0.14} distance={16} duration={0.75}>
            {t.features.items.map((item, i) => (
              <div
                key={item.title}
                className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-x-12 lg:gap-x-20 gap-y-2 py-8 sm:py-10 border-b border-ink/[0.06] last:border-b-0"
              >
                <h3 className="font-display text-lg sm:text-xl font-light text-navy leading-snug">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted leading-[1.80]">
                  {item.description}
                </p>
              </div>
            ))}
          </ScrollReveal>

          {/* CTA engagements */}
          <div className="flex items-center gap-6 pt-10 sm:pt-14">
            <Link
              href={`/${validLocale}/contact`}
              className="btn-primary text-sm"
            >
              {t.nav.cta}
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
            <Link
              href={`/${validLocale}/services`}
              className="inline-flex items-center gap-1.5 font-body text-sm text-muted hover:text-navy transition-colors duration-200"
            >
              {t.services.cta}
              <Icon name="arrow" size={13} strokeWidth={2} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── TÉMOIGNAGES ─────────────────────────────────────────── */}
      <Section bg="stone" slant="right" slantFill={BG.cream}>
        <div className="text-center mb-14 sm:mb-18">
          <span className="section-label">{t.testimonials.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark">
            {t.testimonials.titleMain} <Accent>{t.testimonials.titleAccent}</Accent>
          </PremiumHeading>
        </div>

        {/* Citation principale */}
        <figure className="text-center max-w-2xl mx-auto">
          <blockquote>
            <p className="font-display font-light italic text-xl sm:text-[1.55rem] text-ink/75 leading-[1.65]">
              &ldquo;{t.testimonials.items[0].quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-1">
            <div className="w-6 h-px bg-gold/40 mb-3" aria-hidden="true" />
            <p className="font-body text-sm font-semibold text-navy">{t.testimonials.items[0].author}</p>
            <p className="font-body text-xs text-muted">{t.testimonials.items[0].role}</p>
          </figcaption>
        </figure>

        {/* Séparateur */}
        <div className="flex items-center gap-4 my-12 sm:my-14" aria-hidden="true">
          <div className="flex-1 h-px bg-ink/[0.06]" />
          <div className="w-1 h-1 rounded-full bg-gold/35" />
          <div className="flex-1 h-px bg-ink/[0.06]" />
        </div>

        {/* Citations secondaires */}
        <ScrollReveal stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {t.testimonials.items.slice(1).map((item) => (
            <figure key={item.author} className="flex flex-col gap-4">
              <blockquote>
                <p className="font-display font-light italic text-base sm:text-lg text-ink/65 leading-[1.72]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-ink/[0.07]">
                <div
                  className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-body text-[9px] font-semibold tracking-[0.06em] shrink-0"
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-navy leading-snug">{item.author}</p>
                  <p className="font-body text-xs text-muted mt-0.5">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </Section>

      {/* ── CTA BAND ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Top slant: stone → navy diagonal */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block w-full"
          style={{ height: 'var(--slant-h)' }}
        >
          <polygon points="0,0 1440,0 1440,80" fill={BG.stone} />
          <polygon points="0,0 1440,80 0,80" fill={BG.navy} />
        </svg>

        <div className="bg-navy">
          <div className="container-main py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <span className="section-label text-gold">{t.cta.overline}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white mt-1 leading-tight">
                {t.cta.titleMain}{' '}
                <span className="italic text-white/75">{t.cta.titleAccent}</span>
              </h2>
              <p className="font-body text-sm text-white/50 mt-3 max-w-md">
                {t.cta.subtitle}
              </p>
            </div>
            <Link
              href={`/${validLocale}/contact`}
              className="btn-primary shrink-0"
            >
              {t.cta.button}
              <Icon name="arrow" size={15} strokeWidth={2} />
            </Link>
          </div>
        </div>

      </section>

      {/* ── PROCESSUS ───────────────────────────────────────────── */}
      <ProcessSection t={t.process} slantFill={BG.navy} />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <FaqSection t={t.faq} contactHref={`/${validLocale}/contact`} />

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} />
    </>
  )
}
