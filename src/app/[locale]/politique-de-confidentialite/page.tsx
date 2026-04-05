import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { contactInfo } from '@/lib/siteData'
import { buildAlternates, socialMeta } from '@/lib/seo'
import { Footer } from '@/components/Footer'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)
  return {
    title: t.meta.privacyTitle,
    description: t.meta.privacyDescription,
    alternates: buildAlternates(validLocale, '/politique-de-confidentialite'),
    ...socialMeta(validLocale, t.meta.privacyTitle, t.meta.privacyDescription, '/politique-de-confidentialite'),
  }
}

export default async function PolitiqueDeConfidentialitePage({
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
      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-16 sm:pt-48 sm:pb-20">
        <div className="hero-grid absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true" />
        <div className="container-main relative z-10">
          <Link
            href={`/${validLocale}`}
            className="inline-flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-white/65 transition-colors duration-200 mb-8"
          >
            ← {t.nav.home}
          </Link>
          <span className="section-label text-gold/70 block">{t.brand.legal}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-white mt-2 leading-[1.1]">
            {t.footer.privacy}
          </h1>
        </div>
      </section>

      {/* ── Contenu ────────────────────────────────── */}
      <main className="bg-cream py-20 sm:py-28">
        <div className="container-main max-w-3xl">
          <div className="prose prose-lg max-w-none font-body text-ink">

            {/* Intro */}
            <p className="text-muted text-sm mb-12">
              Dernière mise à jour : mars 2026 · Conformément à la loi fédérale sur la protection des données (nLPD / révisée)
            </p>

            {/* 1. Responsable */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                1. Responsable du traitement
              </h2>
              <p className="text-muted leading-relaxed">
                Le responsable du traitement des données personnelles collectées via ce site est :
              </p>
              <div className="mt-4 p-6 bg-white rounded-xl border border-primary-100 text-sm">
                <p className="font-semibold text-navy">{t.brand.legal}</p>
                <p className="text-muted mt-1">{contactInfo.addresses[0].street}</p>
                <p className="text-muted">{contactInfo.addresses[0].city}</p>
                <p className="text-muted mt-2">
                  <a href={`mailto:${contactInfo.email}`} className="text-gold hover:underline">
                    {contactInfo.email}
                  </a>
                </p>
                <p className="text-muted">
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gold hover:underline">
                    {contactInfo.phone}
                  </a>
                </p>
              </div>
            </section>

            {/* 2. Données collectées */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                2. Données personnelles collectées
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Nous collectons uniquement les données que vous nous transmettez volontairement via le formulaire de contact :
              </p>
              <ul className="space-y-2 text-muted text-sm">
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Nom et prénom</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Adresse e-mail</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Numéro de téléphone (optionnel)</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Nom de la société (optionnel)</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Contenu du message</li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                Ces données sont utilisées exclusivement pour répondre à votre demande. Aucune donnée n&apos;est transmise à des tiers à des fins commerciales.
              </p>
            </section>

            {/* 3. Finalités */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                3. Finalités du traitement
              </h2>
              <p className="text-muted leading-relaxed">
                Les données collectées sont traitées dans le but de :
              </p>
              <ul className="space-y-2 text-muted text-sm mt-4">
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Répondre à vos demandes d&apos;information ou de devis</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Établir une relation contractuelle le cas échéant</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Respecter nos obligations légales en tant que cabinet fiduciaire</li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                La base légale du traitement est votre consentement (art. 6 al. 6 nLPD) ainsi que nos intérêts légitimes à répondre aux demandes clients.
              </p>
            </section>

            {/* 4. Durée de conservation */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                4. Durée de conservation
              </h2>
              <p className="text-muted leading-relaxed">
                Les données personnelles issues du formulaire de contact sont conservées pendant une durée maximale de <strong className="text-navy">12 mois</strong> à compter de la dernière interaction, sauf obligation légale de conservation plus longue (notamment en matière comptable et fiscale : 10 ans conformément au Code des obligations suisse).
              </p>
            </section>

            {/* 5. Droits */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                5. Vos droits
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Conformément à la nLPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="space-y-2 text-muted text-sm">
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Droit d&apos;accès à vos données</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Droit de rectification</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Droit à la portabilité des données</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Droit d&apos;opposition au traitement</li>
                <li className="flex gap-3"><span className="text-gold mt-1">→</span> Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                Pour exercer vos droits, contactez-nous à l&apos;adresse :{' '}
                <a href={`mailto:${contactInfo.email}`} className="text-gold hover:underline">
                  {contactInfo.email}
                </a>
              </p>
            </section>

            {/* 6. Sécurité */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                6. Sécurité des données
              </h2>
              <p className="text-muted leading-relaxed">
                Nous prenons les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Le site est servi en HTTPS et les transmissions sont chiffrées.
              </p>
            </section>

            {/* 7. Cookies */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                7. Cookies
              </h2>
              <p className="text-muted leading-relaxed">
                Ce site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement (langue sélectionnée). Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé.
              </p>
            </section>

            {/* 8. Contact DPO */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                8. Contact — Responsable de la protection des données
              </h2>
              <p className="text-muted leading-relaxed">
                Pour toute question relative à la protection de vos données ou pour exercer vos droits, adressez votre demande à :
              </p>
              <div className="mt-4 p-6 bg-white rounded-xl border border-primary-100 text-sm">
                <p className="font-semibold text-navy">{contactInfo.contact}</p>
                <p className="text-muted mt-1">{t.brand.legal}</p>
                <p className="text-muted">{contactInfo.addresses[0].street}, {contactInfo.addresses[0].city}</p>
                <p className="text-muted mt-2">
                  <a href={`mailto:${contactInfo.email}`} className="text-gold hover:underline">
                    {contactInfo.email}
                  </a>
                </p>
              </div>
              <p className="text-muted text-sm mt-4">
                Vous avez également le droit de déposer une plainte auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT) :{' '}
                <span className="text-navy">www.edoeb.admin.ch</span>
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} />
    </>
  )
}
