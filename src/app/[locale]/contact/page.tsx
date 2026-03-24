import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { contactInfo, BG } from '@/lib/siteData'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    openGraph: { title: t.meta.contactTitle, description: t.meta.contactDescription },
  }
}

export default async function ContactPage({
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
      <section className="relative bg-navy overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">

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

        <div className="container-main relative z-10">
          <div className="max-w-2xl">

            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-10">
              <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
                <li>
                  <Link
                    href={`/${validLocale}`}
                    className="font-body text-xs text-white/35 hover:text-white/65 transition-colors"
                  >
                    {t.nav.home}
                  </Link>
                </li>
                <li><span className="text-white/20 text-xs mx-1">›</span></li>
                <li>
                  <span className="font-body text-xs text-white/60" aria-current="page">
                    {t.nav.contact}
                  </span>
                </li>
              </ol>
            </nav>

            <span className="section-label text-champagne/70">{t.contact.overline}</span>

            <PremiumHeading as="h1" size="page" color="light" className="mt-2">
              {t.contact.title1} <Accent>{t.contact.title2}</Accent>
            </PremiumHeading>

            <div className="w-10 h-px bg-champagne/30 my-6" aria-hidden="true" />

            <p className="font-body text-white/58 text-base sm:text-lg leading-relaxed max-w-lg">
              {t.contact.subtitle}
            </p>

          </div>
        </div>
      </section>

      {/* ── Main — form + contact details ─────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        {/* SVG slant */}
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-start">

            {/* ── Left — form ───────────────────────────────── */}
            <div>
              <div className="mb-8">
                <span className="section-label">{t.contact.form.overline}</span>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mt-1 leading-tight">
                  {t.contact.form.title}
                </h2>
                <p className="font-body text-sm text-muted mt-2 leading-relaxed">
                  {t.contact.form.subtitle}
                </p>
              </div>
              <ContactForm t={t.contact.form} variant="premium" />
            </div>

            {/* ── Right — sticky contact details ────────────── */}
            <aside className="lg:sticky lg:top-28 space-y-6">

              {/* Contact person card */}
              <div className="bg-white rounded-2xl border border-primary-100/70 shadow-card overflow-hidden">
                <div
                  className="h-1 w-full bg-gradient-to-r from-champagne/60 via-champagne to-champagne/60"
                  aria-hidden="true"
                />
                <div className="p-7 space-y-6">

                  <div>
                    <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-2">
                      {t.contact.directContact}
                    </p>
                    <p className="font-body font-semibold text-navy text-sm">{contactInfo.contact}</p>
                    <p className="font-body text-xs text-muted mt-0.5">{contactInfo.role}</p>
                  </div>

                  <div className="h-px w-full bg-primary-50" aria-hidden="true" />

                  {/* Phone */}
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-gold/[0.07] flex items-center justify-center transition-colors duration-150">
                      <Icon name="phone" size={15} strokeWidth={1.8} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-[0.12em] uppercase font-semibold text-muted/50 mb-0.5">
                        {t.contact.phoneLabel}
                      </p>
                      <span className="font-body text-sm text-navy group-hover:text-gold transition-colors duration-150">
                        {contactInfo.phone}
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-gold/[0.07] flex items-center justify-center transition-colors duration-150">
                      <Icon name="mail" size={15} strokeWidth={1.8} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-[0.12em] uppercase font-semibold text-muted/50 mb-0.5">
                        {t.contact.emailLabel}
                      </p>
                      <span className="font-body text-sm text-navy group-hover:text-gold transition-colors duration-150 break-all">
                        {contactInfo.email}
                      </span>
                    </div>
                  </a>

                  <div className="h-px w-full bg-primary-50" aria-hidden="true" />

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                      <Icon name="mappin" size={15} strokeWidth={1.8} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-[0.12em] uppercase font-semibold text-muted/50 mb-0.5">
                        {t.contact.mainOfficeLabel}
                      </p>
                      <p className="font-body text-sm text-navy">{contactInfo.addresses[0].street}</p>
                      <p className="font-body text-xs text-muted">{contactInfo.addresses[0].city}</p>
                      <p className="font-body text-xs text-muted">{t.contact.country}</p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-primary-50" aria-hidden="true" />

                  {/* Hours */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-2">
                      {t.contact.responseDelay}
                    </p>
                    <p className="font-body text-xs text-muted leading-relaxed">{t.contact.form.trustLine}</p>
                    <p className="font-body text-xs text-muted mt-1">{t.contact.hours}</p>
                  </div>

                </div>
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} slantFill={BG.cream} />
    </>
  )
}
