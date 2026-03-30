import Link from 'next/link'
import { services, contactInfo, BG } from '@/lib/siteData'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'
import type { Locale, Messages } from '@/lib/i18n'

interface NavItem {
  label: string
  href: string
}

interface ServicePageProps {
  locale: Locale
  t: Messages
  serviceIndex: number
  navItems: NavItem[]
}

function parseLine(text: string) {
  const sep = text.indexOf(' — ')
  return sep >= 0
    ? { title: text.slice(0, sep), desc: text.slice(sep + 3) }
    : { title: text, desc: '' }
}

export function ServicePage({ locale, t, serviceIndex, navItems }: ServicePageProps) {
  const service = t.services.items[serviceIndex]
  const serviceId = services[serviceIndex].id

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden min-h-[60vh] flex items-center">

        {/* Décoration géométrique */}
        <div className="absolute right-0 top-0 bottom-0 w-[480px] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-gold/15" />
          <div className="absolute top-1/2 right-[-60px] -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-gold/10" />
          <div className="absolute top-[30%] right-[120px] w-[12px] h-[12px] rounded-full bg-gold/30" />
          <div className="absolute top-[20%] right-[200px] w-px h-[120px] bg-gold/20" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 container-main py-24 sm:py-32 lg:max-w-[55%]">

          <p className="section-label text-gold mb-6">{t.services.pageOverline}</p>

          <PremiumHeading as="h1" size="hero" color="light" className="mb-8">
            <span className="block">{service.heroTitle1}</span>
            <Accent><span className="block">{service.heroTitle2}</span></Accent>
          </PremiumHeading>

          <p className="font-body text-white/55 text-base sm:text-lg max-w-lg leading-relaxed mb-10">
            {service.heroIntro}
          </p>

          <Link href={`/${locale}/contact`} className="btn-primary">
            {t.cta.button}
            <Icon name="arrow" size={16} strokeWidth={2} aria-hidden="true" />
          </Link>

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

      {/* ── Main content — two-column editorial ───────────── */}
      <section className="relative bg-cream overflow-hidden">

        <div className="container-main pt-20 sm:pt-28 pb-24 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-16 items-start">

            {/* ── Left column ──────────────────────────────── */}
            <div>

              {/* Section A — Ce que nous prenons en charge */}
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-10 leading-tight">
                {t.services.chargeTitle}
              </h2>

              <ScrollReveal stagger={0.1}>
                {service.bullets.map((bullet, i) => {
                  const { title, desc } = parseLine(bullet)
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-6 py-7 border-b border-primary-100/40 last:border-b-0"
                    >
                      <span
                        className="font-body text-[10px] font-semibold tracking-[0.14em] text-gold/60 w-5 shrink-0 mt-0.5 select-none"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-body font-semibold text-navy text-base leading-snug">{title}</p>
                        {desc && (
                          <p className="font-body text-sm text-muted leading-relaxed mt-1">{desc}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </ScrollReveal>

              {/* Separator between A and B */}
              <div className="flex items-center gap-4 my-12" aria-hidden="true">
                <div className="h-px flex-1 bg-primary-100/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-champagne/40" />
                <div className="h-px flex-1 bg-primary-100/40" />
              </div>

              {/* Section B — Pour qui */}
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-10 leading-tight">
                {t.services.forWhoTitle}
              </h2>

              <ScrollReveal stagger={0.1}>
                {service.forWho.map((item, i) => {
                  const { title, desc } = parseLine(item)
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-4 border-b border-primary-100/25 last:border-b-0"
                    >
                      <span className="text-gold/60 text-xs mt-1 shrink-0 select-none" aria-hidden="true">
                        →
                      </span>
                      <div>
                        <p className="font-body text-sm font-medium text-navy">{title}</p>
                        {desc && (
                          <p className="font-body text-xs text-muted leading-relaxed mt-0.5">{desc}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </ScrollReveal>

            </div>

            {/* ── Right column — sticky sidebar ─────────────── */}
            <aside className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border border-primary-100/70 shadow-card overflow-hidden">

                {/* Top accent strip */}
                <div
                  className="h-px w-full bg-ink/[0.05]"
                  aria-hidden="true"
                />

                <div className="p-7 space-y-6">

                  {/* Contact person */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-2">
                      {t.contact.directContact}
                    </p>
                    <p className="font-body font-semibold text-navy text-sm">{contactInfo.contact}</p>
                    <p className="font-body text-xs text-muted mt-0.5">{contactInfo.role}</p>
                  </div>

                  <div className="h-px w-full bg-primary-50" aria-hidden="true" />

                  {/* Phone */}
                  <div>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 hover:bg-gold/[0.07] flex items-center justify-center transition-colors duration-150">
                        <Icon name="chevron" size={16} strokeWidth={2} className="text-gold -rotate-90" />
                      </div>
                      <span className="font-body text-sm text-navy group-hover:text-gold transition-colors duration-150">
                        {contactInfo.phone}
                      </span>
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 hover:bg-gold/[0.07] flex items-center justify-center transition-colors duration-150">
                        <Icon name="arrow" size={16} strokeWidth={2} className="text-gold" />
                      </div>
                      <span className="font-body text-sm text-navy group-hover:text-gold transition-colors duration-150 break-all">
                        {contactInfo.email}
                      </span>
                    </a>
                  </div>

                  <div className="h-px w-full bg-primary-50" aria-hidden="true" />

                  {/* Response delay */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-2">
                      {t.contact.responseDelay}
                    </p>
                    <p className="font-body text-xs text-muted leading-relaxed">{t.contact.form.trustLine}</p>
                    <p className="font-body text-xs text-muted mt-1">{t.contact.hours}</p>
                  </div>

                  {/* CTA */}
                  <Link href={`/${locale}/contact`} className="btn-primary w-full justify-center">
                    {t.cta.button}
                    <Icon name="arrow" size={16} strokeWidth={2} aria-hidden="true" />
                  </Link>

                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Contact form section ────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.cream} id="contact">
        <div className="max-w-2xl mx-auto">

          <div className="mb-8">
            <span className="section-label">{t.contact.form.overline}</span>
            <h2 className="section-title">{t.contact.form.title}</h2>
            <p className="font-body text-sm text-muted mt-3 leading-relaxed">
              {t.contact.form.subtitle}
            </p>
          </div>

          <ContactForm t={t.contact.form} variant="compact" />

        </div>
      </Section>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer locale={locale} t={t} navItems={navItems} slantFill={BG.stone} />
    </>
  )
}
