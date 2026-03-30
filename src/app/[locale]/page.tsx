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
import { HomeParallax } from '@/components/HomeParallax'
import { ScrollReveal } from '@/components/ScrollReveal'
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
      <HomeParallax />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-dark"
      >
        {/* Image de fond */}
        <div
          data-parallax="hero-img"
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/dd9685_afdddc3055804f4a8b4851f53718c39d~mv2.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-dark/60" />
        </div>

        {/* Overlay directionnel */}
        <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-bottom-fade absolute bottom-0 inset-x-0 h-40 pointer-events-none" aria-hidden="true" />

        {/* Contenu */}
        <div className="relative z-10 container-main w-full py-32 lg:py-0 min-h-[92vh] flex items-center">
          <div className="w-full lg:max-w-[52%] animate-fade-up">

            <p className="section-label text-gold/75 mb-5">{t.hero.overline}</p>

            <PremiumHeading as="h1" size="hero" color="light" className="mb-6">
              <span className="block">SRD</span>
              <Accent><span className="block">Partners</span></Accent>
            </PremiumHeading>

            <p className="font-body text-white/55 text-base sm:text-lg max-w-md leading-relaxed mb-9 animate-fade-up delay-200">
              {t.hero.baseline}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 animate-fade-up delay-300">
              <Link href={`/${validLocale}/contact`} className="btn-primary w-full sm:w-auto justify-center">
                {t.nav.cta}
                <Icon name="arrow" size={15} strokeWidth={2} />
              </Link>
              <Link href={`/${validLocale}/services`} className="btn-outline-dark w-full sm:w-auto justify-center">
                {t.hero.ctaSecondary}
              </Link>
            </div>

          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── ENGAGEMENTS ─────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        {/* Biseau hero → cream */}
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ height: 'var(--slant-h)' }}
        >
          <polygon points="0,0 1440,0 0,56" fill={BG.navy} />
        </svg>

        <div className="relative z-10 container-main pt-28 sm:pt-36 pb-20 sm:pb-28">

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
          <div className="flex items-end justify-between pb-8 sm:pb-10 border-b border-white/[0.08]">
            <div>
              <span className="section-label text-gold/60">{t.services.overline}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-white mt-1 leading-tight">
                {t.services.titleMain}{' '}
                <span className="italic text-white/60">{t.services.titleAccent}</span>
              </h2>
            </div>
            <Link
              href={`/${validLocale}/services`}
              className="hidden sm:flex items-center gap-1.5 font-body text-xs text-white/30 hover:text-white/70 transition-colors duration-200 shrink-0 ml-8 pb-1"
            >
              {t.services.cta}
              <Icon name="arrow" size={13} strokeWidth={2} />
            </Link>
          </div>

          {/* Liste services */}
          <div>
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/${validLocale}/services/${s.id}`}
                className="group flex items-center justify-between py-6 sm:py-8 border-b border-white/[0.05] hover:border-white/[0.12] transition-colors duration-300"
              >
                <div className="flex items-center gap-5 sm:gap-10">
                  <span
                    className="font-body text-[9px] tracking-[0.18em] text-white/15 font-medium w-5 shrink-0 select-none group-hover:text-white/35 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] font-light text-white/85 group-hover:text-white transition-colors duration-300 leading-tight">
                      {t.services.items[i].title}
                    </p>
                    <p className="font-body text-xs text-white/25 mt-1 group-hover:text-white/45 transition-colors duration-300">
                      {t.services.items[i].shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="hidden sm:block relative w-20 h-13 lg:w-24 lg:h-[3.75rem] rounded-lg overflow-hidden opacity-35 group-hover:opacity-65 transition-opacity duration-300">
                    <Image
                      src={`/images/services/${s.id}.png`}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="w-9 h-9 rounded-full border border-white/[0.10] flex items-center justify-center text-white/20 group-hover:border-white/30 group-hover:text-white/70 transition-all duration-300">
                    <Icon name="arrow" size={14} strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
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
        </div>
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
