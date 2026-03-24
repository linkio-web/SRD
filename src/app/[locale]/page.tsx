// MODIFIED: Refonte éditoriale — suppression des grilles de cards répétitives.
// Features → liste réglée | Services → répertoire directory style index
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
      {/* Client-side parallax effects — no DOM output */}
      <HomeParallax />

      {/* ─────────────────────────────────────────────────────────────────────
          HERO
          Image à remplacer : placez votre photo dans /public/images/hero-building.jpg
          puis changez le src ci-dessous en "/images/hero-building.jpg"
      ───────────────────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-primary-950 hero-grain"
      >
        <div className="hero-gradient absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div
          data-parallax="hero-img"
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-grid absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true" />
        <div className="hero-mineral absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-bottom-fade absolute bottom-0 inset-x-0 h-48 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 container-main w-full py-36 lg:py-0 min-h-[90vh] md:min-h-screen flex items-center">
          <div className="w-full lg:max-w-[56%] text-center lg:text-left animate-fade-up">

            <p className="section-label text-gold/80 mb-6">{t.hero.overline}</p>

            <PremiumHeading as="h1" size="hero" color="light" className="mb-5">
              <span className="block">SRD</span>
              <Accent><span className="block">Partners</span></Accent>
            </PremiumHeading>

            <div className="flex justify-center lg:justify-start mb-8">
              <div className="w-16 h-px bg-gold/50" />
            </div>

            <p className="font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 animate-fade-up delay-200">
              {t.hero.baseline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up delay-300">
              <Link href={`/${validLocale}/contact`} className="btn-primary w-full sm:w-auto justify-center">
                {t.nav.cta}
                <Icon name="arrow" size={16} strokeWidth={2} />
              </Link>
              <Link href={`/${validLocale}/services`} className="btn-outline-dark w-full sm:w-auto justify-center">
                {t.hero.ctaSecondary}
              </Link>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up delay-500 z-10" aria-hidden="true">
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          ENGAGEMENT — liste réglée éditoriale (remplace les 3 cards)
          Transition hero navy → cream via biseau SVG
      ───────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        {/* Biseau de transition hero → cream */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full pointer-events-none z-0"
          style={{ height: 'var(--slant-h)' }}
        >
          <polygon points="0,0 1440,0 0,80" fill={BG.navy} />
        </svg>

        <div className="relative z-10 container-main pt-32 sm:pt-40 pb-20 sm:pb-24">

          {/* Titre éditorial centré */}
          <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
            <h2 className="font-display text-3xl sm:text-[2.6rem] lg:text-5xl font-light text-navy leading-[1.2] tracking-[-0.01em]">
              {t.features.titleMain}{' '}
              <span className="italic text-champagne">{t.features.titleAccent}</span>
            </h2>
          </div>

          {/* 3 engagements — liste réglée horizontale, aucune card */}
          <div>
            {t.features.items.map((item, i) => (
              <div
                key={item.title}
                className="grid grid-cols-1 sm:grid-cols-[2rem_18rem_1fr] gap-x-10 lg:gap-x-16 gap-y-2 py-10 sm:py-12 border-t border-black/[0.06] items-start sm:items-center"
              >
                <span
                  className="font-body text-[10px] tracking-[0.22em] text-champagne font-medium select-none"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-light text-navy leading-tight">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted leading-[1.80] col-start-1 sm:col-start-auto">
                  {item.description}
                </p>
              </div>
            ))}
            <div className="border-t border-black/[0.06]" />
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SERVICES — répertoire / index éditorial (remplace la grille de cards)
          Fond navy foncé — coupure franche depuis cream, effet intentionnel
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-navy relative overflow-hidden">
        {/* Grain texture */}
        <div className="navy-grain absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" />

        <div className="relative z-10 container-main py-24 sm:py-32">

          {/* En-tête — titre à gauche, CTA à droite */}
          <div className="flex items-end justify-between pb-10 sm:pb-14 border-b border-white/[0.07]">
            <div>
              <span className="section-label text-champagne/70">{t.services.overline}</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-1 leading-tight">
                {t.services.titleMain}{' '}
                <span className="italic text-champagne">{t.services.titleAccent}</span>
              </h2>
            </div>
            <Link
              href={`/${validLocale}/services`}
              className="hidden sm:flex items-center gap-2 font-body text-xs text-white/30 hover:text-champagne transition-colors duration-200 shrink-0 ml-8 pb-1"
            >
              {t.services.cta}
              <Icon name="arrow" size={13} strokeWidth={2} />
            </Link>
          </div>

          {/* Lignes de service — chaque service est un lien cliquable pleine largeur */}
          <div>
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/${validLocale}/services/${s.id}`}
                className="group flex items-center justify-between py-7 sm:py-9 border-b border-white/[0.05] hover:border-champagne/25 transition-colors duration-300"
              >
                <div className="flex items-center gap-6 sm:gap-12">
                  <span
                    className="font-body text-[10px] tracking-[0.20em] text-white/18 font-medium w-5 shrink-0 select-none group-hover:text-champagne/50 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl lg:text-[2.6rem] font-light text-white group-hover:text-champagne transition-colors duration-300 leading-tight">
                      {t.services.items[i].title}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/28 mt-1.5 group-hover:text-white/50 transition-colors duration-300">
                      {t.services.items[i].shortDesc}
                    </p>
                  </div>
                </div>

                {/* Flèche en cercle */}
                <div className="shrink-0 ml-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/20 group-hover:border-champagne/35 group-hover:text-champagne transition-all duration-300 group-hover:scale-110">
                    <Icon name="arrow" size={14} strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA mobile */}
          <div className="mt-10 sm:hidden">
            <Link href={`/${validLocale}/services`} className="btn-outline-dark w-full justify-center">
              {t.services.cta}
              <Icon name="arrow" size={16} strokeWidth={2} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── Testimonials — reste éditorial, slantFill mis à jour (navy) ──── */}
      <Section bg="mineral" slant="right" slantFill={BG.navy}>
        <div className="text-center mb-16 sm:mb-20">
          <span className="section-label">{t.testimonials.overline}</span>
          <PremiumHeading as="h2" size="section" color="dark">
            {t.testimonials.titleMain} <Accent>{t.testimonials.titleAccent}</Accent>
          </PremiumHeading>
        </div>

        <figure className="text-center max-w-3xl mx-auto">
          <span
            className="font-display block leading-[0.75] text-gold/[0.13] select-none pointer-events-none -mb-5"
            style={{ fontSize: 'clamp(5rem, 12vw, 8rem)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote>
            <p className="font-display font-light italic text-xl sm:text-[1.6rem] text-ink/80 leading-[1.62]">
              {t.testimonials.items[0].quote}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-1.5">
            <div className="w-8 h-px bg-gold/45 mb-3" aria-hidden="true" />
            <p className="font-body text-sm font-semibold text-navy">{t.testimonials.items[0].author}</p>
            <p className="font-body text-xs text-muted">{t.testimonials.items[0].role}</p>
          </figcaption>
        </figure>

        <div className="flex items-center gap-5 my-14 sm:my-16" aria-hidden="true">
          <div className="flex-1 h-px bg-black/[0.07]" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="flex-1 h-px bg-black/[0.07]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
          {t.testimonials.items.slice(1).map((item) => (
            <figure key={item.author} className="flex flex-col gap-5">
              <Icon name="quote" size={20} className="text-gold/35" />
              <blockquote>
                <p className="font-display font-light italic text-base sm:text-lg text-ink/70 leading-[1.76]">
                  {item.quote}
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-black/[0.07]">
                <div
                  className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-body text-[10px] font-semibold tracking-[0.08em] shrink-0"
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

      {/* ── Process (parallax — ne pas modifier) ─────────────────────────── */}
      <ProcessSection t={t.process} slantFill={BG.mineral} />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FaqSection t={t.faq} />

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      {/* slantFill=BG.cream car FaqSection a bg-cream */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
