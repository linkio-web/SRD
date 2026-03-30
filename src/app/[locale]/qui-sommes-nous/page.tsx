import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { TeamCard } from '@/components/TeamCard'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'
import { StatCounter } from '@/components/StatCounter'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.whoWeAreTitle,
    description: t.meta.whoWeAreDescription,
    openGraph: { title: t.meta.whoWeAreTitle, description: t.meta.whoWeAreDescription },
  }
}

export default async function QuiSommesNousPage({
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

  const stats = [
    { value: '15+', label: t.about.stats.years   },
    { value: '200+', label: t.about.stats.clients },
    { value: '4',   label: t.about.stats.experts  },
    { value: '2',   label: t.about.stats.offices  },
  ]

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-32 pb-16 sm:pt-44 sm:pb-20">
        <div className="container-main relative z-10 text-center">
          <span className="section-label text-gold/55">{t.about.overline}</span>
          <PremiumHeading as="h1" size="page" color="light" className="mt-2 mb-6">
            {t.about.title1}{' '}
            <Accent>{t.about.title2}</Accent>
          </PremiumHeading>
          <div className="flex justify-center mb-6">
            <div className="w-8 h-px bg-white/20" />
          </div>
          <p className="font-body text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* ── Mission & Stats ─────────────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="max-w-xl">
          <span className="section-label">{t.about.missionOverline}</span>
          <h2 className="section-title mb-5">{t.about.missionTitle}</h2>
          <p className="font-body text-sm text-muted leading-relaxed">{t.about.missionP1}</p>
          <Link
            href={`/${validLocale}/contact`}
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-navy hover:text-gold transition-colors mt-7 group"
          >
            {t.about.missionCta}
            <Icon name="arrow" size={14} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="mt-14 pt-10 border-t border-ink/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-10 sm:divide-x divide-ink/[0.06]">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Section>

      {/* ── Valeurs ─────────────────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.cream}>
        <div className="text-center mb-12 sm:mb-14">
          <span className="section-label">{t.about.valuesOverline}</span>
          <h2 className="section-title">{t.about.valuesTitle}</h2>
        </div>

        <div className="max-w-xl mx-auto">
          {t.about.values.map((v, i) => (
            <div key={v.title} className="pb-10 sm:pb-12 last:pb-0">

              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-[9.5px] tracking-[0.18em] text-gold/55 font-medium select-none">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-ink/[0.06]" aria-hidden="true" />
              </div>

              <h3 className="font-display text-[1.5rem] sm:text-[1.75rem] font-light text-navy mb-3 leading-[1.25]">
                {v.title}
              </h3>
              <p className="font-body text-sm text-muted leading-[1.80] max-w-md">
                {v.description}
              </p>

            </div>
          ))}
        </div>
      </Section>

      {/* ── Équipe ──────────────────────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.stone}>
        <div className="text-center mb-12">
          <span className="section-label">{t.team.overline}</span>
          <h2 className="section-title">{t.team.title}</h2>
          <p className="section-subtitle mx-auto text-center mt-3">{t.team.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
          {t.team.members.map((member, i) => (
            <div key={member.name} className={`animate-fade-up delay-${(i + 1) * 100}`}>
              <TeamCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                initials={member.initials}
                quote={member.quote}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ─────────────────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── Footer ──────────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
