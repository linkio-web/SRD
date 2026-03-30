import type { Metadata } from 'next'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { contactInfo, BG } from '@/lib/siteData'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
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
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden min-h-[55vh] flex items-center">

        {/* Décoration géométrique */}
        <div className="absolute right-0 top-0 bottom-0 w-[480px] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-gold/15" />
          <div className="absolute top-1/2 right-[-60px] -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-gold/10" />
          <div className="absolute top-[30%] right-[120px] w-[12px] h-[12px] rounded-full bg-gold/30" />
          <div className="absolute top-[20%] right-[200px] w-px h-[120px] bg-gold/20" />
        </div>

        <div className="relative z-10 container-main py-24 sm:py-32 lg:max-w-[55%]">

          <p className="section-label text-gold mb-6">{t.contact.overline}</p>

          <PremiumHeading as="h1" size="hero" color="light" className="mb-8">
            <span className="block">{t.contact.title1}</span>
            <Accent><span className="block">{t.contact.title2}</span></Accent>
          </PremiumHeading>

          <p className="font-body text-white/55 text-base sm:text-lg leading-relaxed max-w-lg">
            {t.contact.subtitle}
          </p>

        </div>

        {/* Biseau bas */}
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ height: 'var(--slant-h)' }}
        >
          <polygon points="0,56 1440,0 1440,56" fill={BG.cream} />
        </svg>

      </section>

      {/* ── Coordonnées + Formulaire ────────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        <div className="container-main pt-20 sm:pt-28 pb-20 sm:pb-28">
          <ScrollReveal stagger={0.15} className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14 items-start">

            {/* Coordonnées — sticky (gauche) */}
            <aside className="lg:sticky lg:top-28 space-y-5">

              <div className="bg-white rounded-2xl border border-ink/[0.05] shadow-card overflow-hidden">
                <div className="p-6 space-y-5">

                  <div>
                    <p className="font-body text-[9.5px] tracking-[0.14em] uppercase font-semibold text-muted/50 mb-1.5">
                      {t.contact.directContact}
                    </p>
                    <p className="font-body font-semibold text-navy text-sm">{contactInfo.contact}</p>
                    <p className="font-body text-xs text-muted mt-0.5">{contactInfo.role}</p>
                  </div>

                  <div className="h-px w-full bg-ink/[0.05]" aria-hidden="true" />

                  {/* Téléphone */}
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary-50 group-hover:bg-gold/[0.06] flex items-center justify-center transition-colors duration-150">
                      <Icon name="phone" size={14} strokeWidth={1.8} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[9.5px] tracking-[0.10em] uppercase font-semibold text-muted/45 mb-0.5">
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
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary-50 group-hover:bg-gold/[0.06] flex items-center justify-center transition-colors duration-150">
                      <Icon name="mail" size={14} strokeWidth={1.8} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[9.5px] tracking-[0.10em] uppercase font-semibold text-muted/45 mb-0.5">
                        {t.contact.emailLabel}
                      </p>
                      <span className="font-body text-sm text-navy group-hover:text-gold transition-colors duration-150 break-all">
                        {contactInfo.email}
                      </span>
                    </div>
                  </a>

                  <div className="h-px w-full bg-ink/[0.05]" aria-hidden="true" />

                  {/* Adresse */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Icon name="mappin" size={14} strokeWidth={1.8} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[9.5px] tracking-[0.10em] uppercase font-semibold text-muted/45 mb-0.5">
                        {t.contact.mainOfficeLabel}
                      </p>
                      <p className="font-body text-sm text-navy">{contactInfo.addresses[0].street}</p>
                      <p className="font-body text-xs text-muted">{contactInfo.addresses[0].city}</p>
                      <p className="font-body text-xs text-muted">{t.contact.country}</p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-ink/[0.05]" aria-hidden="true" />

                  {/* Horaires */}
                  <div>
                    <p className="font-body text-[9.5px] tracking-[0.14em] uppercase font-semibold text-muted/50 mb-2">
                      {t.contact.responseDelay}
                    </p>
                    <p className="font-body text-xs text-muted leading-relaxed">{t.contact.form.trustLine}</p>
                    <p className="font-body text-xs text-muted mt-1">{t.contact.hours}</p>
                  </div>

                </div>
              </div>

            </aside>

            {/* Formulaire (droite) */}
            <div>
              <div className="mb-7">
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

          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
