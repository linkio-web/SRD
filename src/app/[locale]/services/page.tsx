import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'

function parseLine(text: string) {
  const sep = text.indexOf(' — ')
  return sep >= 0
    ? { title: text.slice(0, sep), desc: text.slice(sep + 3) }
    : { title: text, desc: '' }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    openGraph: { title: t.meta.servicesTitle, description: t.meta.servicesDescription },
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

  const navItems = [
    { label: t.nav.home,     href: `/${validLocale}` },
    { label: t.nav.services, href: `/${validLocale}/services` },
    { label: t.nav.whoWeAre, href: `/${validLocale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  return (
    <>
      {/* ── Hero — typographic, no image ──────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-20 sm:pt-48 sm:pb-24">

        {/* Decorative layers */}
        <div className="navy-grain absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true" />
        <div className="hero-grid absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true" />

        {/* Decorative concentric circles — right side */}
        <svg
          aria-hidden="true"
          className="absolute right-[-8rem] top-1/2 -translate-y-1/2 pointer-events-none"
          width="960"
          height="960"
          viewBox="-480 -480 960 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="0" cy="0" r="200" stroke="white" strokeOpacity="0.05" />
          <circle cx="0" cy="0" r="340" stroke="white" strokeOpacity="0.05" />
          <circle cx="0" cy="0" r="480" stroke="white" strokeOpacity="0.05" />
        </svg>

        <div className="container-main relative z-10 text-center">
          <div className="max-w-2xl mx-auto">

            <span className="section-label text-champagne/70">{t.services.pageOverline}</span>

            <PremiumHeading as="h1" size="page" color="light" className="mt-2">
              {t.services.pageTitle1} <Accent>{t.services.pageTitle2}</Accent>
            </PremiumHeading>

            <div className="w-12 h-px bg-champagne/30 mx-auto my-6" aria-hidden="true" />

            <p className="font-body text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              {t.services.pageSubtitle}
            </p>

          </div>
        </div>
      </section>

      {/* ── Services index — editorial directory ──────────── */}
      <section className="relative bg-cream overflow-hidden">

        {/* SVG slant — upper-right triangle fills with navy from above */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full"
          style={{ height: 'var(--slant-h)' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,0 1440,0 1440,80" fill={BG.navy} />
        </svg>

        <div className="container-main pt-32 sm:pt-40 pb-24 sm:pb-32">

          {services.map((s, i) => (
            <article
              key={s.id}
              className="py-12 sm:py-14 border-b border-black/[0.06] last:border-b-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[3rem_1fr_1fr] gap-x-10 lg:gap-x-16 gap-y-4 items-start">

                {/* Column 1 — number */}
                <div
                  className="font-body text-[10px] tracking-[0.22em] text-champagne font-medium mt-2 select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Column 2 — title + desc */}
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-light text-navy leading-tight mb-2">
                    {t.services.items[i].title}
                  </h2>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {t.services.items[i].shortDesc}
                  </p>
                </div>

                {/* Column 3 — bullets preview + CTA */}
                <div>
                  <ul className="mb-0">
                    {t.services.items[i].bullets.slice(0, 2).map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 py-2 border-b border-primary-100/30 last:border-b-0"
                      >
                        <span className="text-champagne text-xs mt-0.5 shrink-0" aria-hidden="true">—</span>
                        <span className="font-body text-xs text-muted">
                          {parseLine(bullet).title}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${validLocale}/services/${s.id}`}
                    className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-navy hover:text-gold transition-colors group"
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

        </div>
      </section>

      {/* ── Promise — side-by-side editorial block ────────── */}
      <section className="bg-stone py-24 sm:py-32">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <span className="section-label">{t.services.promiseOverline}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-navy leading-[1.2] mt-1">
                {t.services.promiseTitle}
              </h2>
              <div className="w-10 h-px bg-champagne/50 my-6" aria-hidden="true" />
            </div>

            {/* Right */}
            <div>
              <p className="font-body text-base text-muted leading-relaxed mb-8">
                {t.services.promiseText}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href={`/${validLocale}/contact`} className="btn-primary">
                  {t.services.promiseCta1}
                  <Icon name="arrow" size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link href={`/${validLocale}/qui-sommes-nous`} className="btn-outline">
                  {t.services.promiseCta2}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <ContactBlock bg="cream" slant="right" slantFill={BG.stone} t={t.contact.form} />

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} slantFill={BG.cream} />
    </>
  )
}
