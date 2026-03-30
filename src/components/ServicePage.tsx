import Image from 'next/image'
import Link from 'next/link'
import { services, contactInfo, BG } from '@/lib/siteData'
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
      <section className="relative bg-navy overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">


        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">

            {/* Inline breadcrumb — white variant */}
            <nav aria-label="Fil d'Ariane" className="mb-10">
              <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="font-body text-xs text-white/35 hover:text-white/65 transition-colors"
                  >
                    {t.nav.home}
                  </Link>
                </li>
                <li><span className="text-white/20 text-xs mx-1">›</span></li>
                <li>
                  <Link
                    href={`/${locale}/services`}
                    className="font-body text-xs text-white/35 hover:text-white/65 transition-colors"
                  >
                    {t.nav.services}
                  </Link>
                </li>
                <li><span className="text-white/20 text-xs mx-1">›</span></li>
                <li>
                  <span className="font-body text-xs text-white/60" aria-current="page">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>

            <span className="section-label text-gold/55">{t.services.pageOverline}</span>

            <PremiumHeading as="h1" size="page" color="light" className="mt-2">
              {service.heroTitle1} <Accent>{service.heroTitle2}</Accent>
            </PremiumHeading>

            <div className="w-8 h-px bg-white/18 my-6" aria-hidden="true" />

            <p className="font-body text-white/58 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              {service.heroIntro}
            </p>

            <Link href={`/${locale}/contact`} className="btn-primary">
              {t.cta.button}
              <Icon name="arrow" size={16} strokeWidth={2} aria-hidden="true" />
            </Link>

          </div>

            {/* Service illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                <Image
                  src={`/images/services/${serviceId}.png`}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 0px, 448px"
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Main content — two-column editorial ───────────── */}
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-16 items-start">

            {/* ── Left column ──────────────────────────────── */}
            <div>

              {/* Section A — Ce que nous prenons en charge */}
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-10 leading-tight">
                {t.services.chargeTitle}
              </h2>

              <div>
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
              </div>

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

              <div>
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
              </div>

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
