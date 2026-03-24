import Image from 'next/image'
import Link from 'next/link'
import { type Locale, type Messages } from '@/lib/i18n'
import { contactInfo, services, socials } from '@/lib/siteData'
import { Icon } from '@/lib/icons'

interface FooterProps {
  locale: Locale
  t: Messages
  /** Gardé pour compatibilité API — non rendu. */
  navItems?: Array<{ label: string; href: string }>
  /** Gardé pour compatibilité API — non rendu. */
  slantFill?: string
}

export function Footer({ locale, t }: FooterProps) {
  const year = new Date().getFullYear()

  const navLinks = [
    { label: t.nav.home,     href: `/${locale}` },
    { label: t.nav.services, href: `/${locale}/services` },
    { label: t.nav.whoWeAre, href: `/${locale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${locale}/contact` },
  ]

  return (
    <footer>

      {/* ── Séparateur bordeaux — haut ──────────────────── */}
      <div className="h-[3px] bg-gold" aria-hidden="true" />

      {/* ── Corps principal — fond navy ─────────────────── */}
      <div className="bg-navy">
        <div className="container-main pt-14 pb-10 lg:pt-16 lg:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* ── Colonne 1 : Marque ─── */}
            <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-5">

              {/* Logo */}
              <Link
                href={`/${locale}`}
                className="inline-flex self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={t.brand.legal}
              >
                <div className="bg-white rounded-lg px-3 py-2">
                  <Image
                    src="/logo.png"
                    alt={t.brand.legal}
                    width={900}
                    height={600}
                    className="h-10 w-auto"
                  />
                </div>
              </Link>

              {/* Signature */}
              <p className="font-body text-[0.8rem] text-white/45 leading-relaxed max-w-[220px]">
                {t.footer.signature}
              </p>

              {/* MODIFIED: Réseaux sociaux — masqués si href="#" ou vide */}
              {socials.some((s) => s.href && !s.href.startsWith('#')) && (
                <div className="flex gap-2">
                  {socials.filter((s) => s.href && !s.href.startsWith('#')).map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center
                                 text-white/35 hover:text-white hover:border-white/40
                                 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={s.icon} size={13} strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              )}

            </div>

            {/* ── Colonne 2 : Navigation ─── */}
            <div className="flex flex-col gap-4">
              <p className="font-body text-[10px] tracking-[0.22em] uppercase font-semibold text-gold">
                {t.footer.navigation}
              </p>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/50 hover:text-white
                                 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Colonne 3 : Services ─── */}
            <div className="flex flex-col gap-4">
              <p className="font-body text-[10px] tracking-[0.22em] uppercase font-semibold text-gold">
                {t.footer.services}
              </p>
              <ul className="flex flex-col gap-2.5">
                {services.map((s, i) => (
                  <li key={s.id}>
                    <Link
                      href={`/${locale}/services/${s.id}`}
                      className="font-body text-sm text-white/50 hover:text-white
                                 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                    >
                      {t.services.items[i].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Colonne 4 : Contact ─── */}
            <div className="flex flex-col gap-4">
              <p className="font-body text-[10px] tracking-[0.22em] uppercase font-semibold text-gold">
                {t.footer.contact}
              </p>
              <ul className="flex flex-col gap-3">

                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="group flex items-start gap-2.5
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    <Icon
                      name="mail" size={13} strokeWidth={1.5}
                      className="mt-[3px] shrink-0 text-white/25 group-hover:text-gold transition-colors duration-200"
                    />
                    <span className="font-body text-sm text-white/50 group-hover:text-white transition-colors duration-200 break-all">
                      {contactInfo.email}
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="group flex items-center gap-2.5
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    <Icon
                      name="phone" size={13} strokeWidth={1.5}
                      className="shrink-0 text-white/25 group-hover:text-gold transition-colors duration-200"
                    />
                    <span className="font-body text-sm text-white/50 group-hover:text-white transition-colors duration-200">
                      {contactInfo.phone}
                    </span>
                  </a>
                </li>

                {contactInfo.addresses.map((addr) => (
                  <li key={addr.id} className="flex items-start gap-2.5">
                    <Icon
                      name="mappin" size={13} strokeWidth={1.5}
                      className="mt-[3px] shrink-0 text-white/25"
                    />
                    <span className="font-body text-sm text-white/50">
                      {addr.street}<br />{addr.city}
                    </span>
                  </li>
                ))}

                <li>
                  <a
                    href={contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    <Icon
                      name="globe" size={13} strokeWidth={1.5}
                      className="shrink-0 text-white/25 group-hover:text-gold transition-colors duration-200"
                    />
                    <span className="font-body text-sm text-white/50 group-hover:text-white transition-colors duration-200">
                      {contactInfo.website.replace('https://', '')}
                    </span>
                  </a>
                </li>

              </ul>
            </div>

          </div>
        </div>

        {/* ── Barre de copyright ─────────────────────────── */}
        {/* MODIFIED: Added privacy policy link */}
        <div className="border-t border-white/[0.07]">
          <div className="container-main py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="font-body text-xs text-white/25">
                &copy; {year} {t.brand.legal}. {t.footer.rights}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href={`/${locale}/politique-de-confidentialite`}
                  className="font-body text-xs text-white/25 hover:text-white/55 transition-colors duration-200
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
                >
                  {t.footer.privacy}
                </Link>
                <p className="font-body text-xs text-white/20">
                  {t.footer.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </footer>
  )
}
