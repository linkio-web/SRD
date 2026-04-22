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
    title: t.meta.mentionsTitle,
    description: t.meta.mentionsDescription,
    alternates: buildAlternates(validLocale, '/mentions-legales'),
    ...socialMeta(validLocale, t.meta.mentionsTitle, t.meta.mentionsDescription, '/mentions-legales'),
  }
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

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
            {t.footer.mentions}
          </h1>
        </div>
      </section>

      {/* ── Contenu ────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-main max-w-3xl">
          <div className="prose prose-lg max-w-none font-body text-ink">

            <p className="text-muted text-sm mb-12">
              Dernière mise à jour : avril 2026
            </p>

            {/* 1. Éditeur du site */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                1. Éditeur du site
              </h2>
              <div className="p-6 bg-white rounded-xl border border-primary-100 text-sm">
                <p className="font-semibold text-navy">{t.brand.legal}</p>
                <p className="text-muted mt-1">Société à responsabilité limitée (Sàrl) de droit suisse</p>
                <p className="text-muted mt-2">{contactInfo.addresses[0].street}</p>
                <p className="text-muted">{contactInfo.addresses[0].city}</p>
                <p className="text-muted mt-2">
                  Téléphone :{' '}
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gold hover:underline">
                    {contactInfo.phone}
                  </a>
                </p>
                <p className="text-muted">
                  E-mail :{' '}
                  <a href={`mailto:${contactInfo.email}`} className="text-gold hover:underline">
                    {contactInfo.email}
                  </a>
                </p>
                <p className="text-muted mt-2">
                  Site web :{' '}
                  <a href={contactInfo.website} className="text-gold hover:underline">
                    {contactInfo.website}
                  </a>
                </p>
              </div>
            </section>

            {/* 2. Responsable de la publication */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                2. Responsable de la publication
              </h2>
              <p className="text-muted leading-relaxed">
                {contactInfo.contact}, {contactInfo.role} — {t.brand.legal}
              </p>
            </section>

            {/* 3. Hébergement */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                3. Hébergement
              </h2>
              <div className="p-6 bg-white rounded-xl border border-primary-100 text-sm">
                <p className="font-semibold text-navy">Vercel Inc.</p>
                <p className="text-muted mt-1">440 N Barranca Ave #4133</p>
                <p className="text-muted">Covina, CA 91723 — États-Unis</p>
                <p className="text-muted mt-2">
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                    vercel.com
                  </a>
                </p>
              </div>
            </section>

            {/* 4. Propriété intellectuelle */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="text-muted leading-relaxed">
                L&apos;ensemble des contenus présents sur ce site (textes, images, logos, graphismes, structure) est la propriété exclusive de {t.brand.legal} ou de ses partenaires. Toute reproduction, représentation ou utilisation, en tout ou partie, sans autorisation préalable écrite est strictement interdite et constitue une violation des droits d&apos;auteur.
              </p>
            </section>

            {/* 5. Limitation de responsabilité */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                5. Limitation de responsabilité
              </h2>
              <p className="text-muted leading-relaxed">
                {t.brand.legal} s&apos;efforce de maintenir les informations publiées sur ce site à jour et exactes. Toutefois, nous ne pouvons garantir l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des informations diffusées. L&apos;utilisation des informations et contenus du site s&apos;effectue sous la seule responsabilité de l&apos;utilisateur. Les informations présentées ne constituent pas un conseil juridique, fiscal ou financier.
              </p>
            </section>

            {/* 6. Liens hypertextes */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                6. Liens hypertextes
              </h2>
              <p className="text-muted leading-relaxed">
                Ce site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre informatif. {t.brand.legal} n&apos;exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur contenu ou leur disponibilité.
              </p>
            </section>

            {/* 7. Droit applicable */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                7. Droit applicable
              </h2>
              <p className="text-muted leading-relaxed">
                Le présent site et ses mentions légales sont soumis au droit suisse. Tout litige relatif à l&apos;utilisation de ce site sera soumis à la compétence exclusive des tribunaux du canton de Neuchâtel.
              </p>
            </section>

            {/* 8. Protection des données */}
            <section className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-navy mb-4">
                8. Protection des données personnelles
              </h2>
              <p className="text-muted leading-relaxed">
                La collecte et le traitement de vos données personnelles sont régis par notre{' '}
                <Link href={`/${validLocale}/politique-de-confidentialite`} className="text-gold hover:underline">
                  Politique de confidentialité
                </Link>
                , conforme à la loi fédérale sur la protection des données (nLPD).
              </p>
            </section>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <Footer locale={validLocale} t={t} />
    </>
  )
}
