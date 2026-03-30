import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ProcessSection } from '@/components/ProcessSection'
import { FaqSection } from '@/components/FaqSection'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { StatCounter } from '@/components/StatCounter'
import { Icon } from '@/lib/icons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    openGraph: { title: t.meta.homeTitle, description: t.meta.homeDescription },
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

  const navItems = [
    { label: t.nav.home,     href: `/${validLocale}` },
    { label: t.nav.services, href: `/${validLocale}/services` },
    { label: t.nav.whoWeAre, href: `/${validLocale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="relative flex min-h-screen overflow-hidden pt-16 sm:pt-[4.5rem]"
      >
        {/* ── GAUCHE ── */}
        <div className="flex flex-1 flex-col items-center justify-center bg-cream px-8 sm:px-16 py-16 gap-8 text-center">

          {/* Overline */}
          <p className="section-label text-gold mb-5">{t.hero.overline}</p>

          {/* Titre */}
          <PremiumHeading as="h1" size="hero" color="dark" className="mb-6">
            <span className="block">SRD</span>
            <Accent><span className="block">Partners</span></Accent>
          </PremiumHeading>

          {/* Sous-titre */}
          <p className="font-body text-muted text-base sm:text-lg max-w-md leading-relaxed mb-9">
            {t.hero.baseline}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-auto">
            <Link href={`/${validLocale}/contact`} className="btn-primary">
              {t.nav.cta}
              <Icon name="arrow" size={15} strokeWidth={2} />
            </Link>
            <Link href={`/${validLocale}/services`} className="btn-outline">
              {t.hero.ctaSecondary}
            </Link>
          </div>

          {/* Tags services */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 pt-6 border-t border-primary-500/10 mt-auto w-full">
            {t.services.items.map((s) => (
              <span key={s.title} className="text-[11px] tracking-[0.14em] text-muted font-body">
                <span className="text-gold mr-2" aria-hidden="true">—</span>{s.title}
              </span>
            ))}
          </div>
        </div>

        {/* ── DROITE ── */}
        <div className="relative hidden lg:flex w-[420px] flex-col justify-end p-12 overflow-hidden">

          {/* Photo de fond */}
          <Image
            src="/images/dd9685_afdddc3055804f4a8b4851f53718c39d~mv2.png"
            alt=""
            fill
            priority
            sizes="420px"
            className="object-cover object-center"
            aria-hidden="true"
          />
          {/* Overlay navy */}
          <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />

          {/* Cercles décoratifs */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full border border-gold/20 pointer-events-none" aria-hidden="true" />
          <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full border border-gold/10 pointer-events-none" aria-hidden="true" />

          {/* Contenu relatif au-dessus de l'overlay */}
          <div className="relative z-10 flex flex-col justify-end">
            {/* Stat 1 */}
            <StatCounter value="15+" label={t.hero.stat1Label} duration={1500} color="light" />

            <div className="w-8 h-px bg-gold/60 my-7" aria-hidden="true" />

            {/* Stat 2 */}
            <StatCounter value="400+" label={t.hero.stat2Label} duration={2000} color="light" />

            <div className="w-8 h-px bg-gold/60 my-7" aria-hidden="true" />

            {/* Tagline */}
            <p className="font-body text-[13px] text-cream/60 leading-relaxed max-w-[240px]">
              {t.hero.statTagline}
            </p>
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

        </div>
      </section>

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

      {/* ── TÉMOIGNAGES ─────────────────────────────────────────── */}
      <Section bg="stone" slant="right" slantFill={BG.navy}>
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

      {/* ── PROCESSUS ───────────────────────────────────────────── */}
      <ProcessSection t={t.process} slantFill={BG.stone} />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <FaqSection t={t.faq} />

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
