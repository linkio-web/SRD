import Image from 'next/image'
import Link from 'next/link'
import { type Locale, type Messages } from '@/lib/i18n'
import { contactInfo, services } from '@/lib/siteData'
import { Icon } from '@/lib/icons'

interface FooterProps {
  locale: Locale
  t: Messages
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
    <footer className="bg-navy">
      <div className="container-main pt-14 pb-8 lg:pt-16 lg:pb-10">

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/[0.07]">

          {/* Marque */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link
              href={`/${locale}`}
              className="inline-flex self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={t.brand.legal}
            >
              <div className="bg-white rounded-lg px-3 py-2">
                <Image
                  src="/NewLogoDR.svg"
                  alt={t.brand.legal}
                  width={1790}
                  height={830}
                  className="h-9 w-auto"
                />
              </div>
            </Link>
            <p className="font-body text-[0.8rem] text-white/40 leading-relaxed max-w-[200px]">
              {t.footer.signature}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="font-body text-[9.5px] tracking-[0.20em] uppercase font-semibold text-white/35">
              {t.footer.navigation}
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/45 hover:text-white/80
                               transition-colors duration-150
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <p className="font-body text-[9.5px] tracking-[0.20em] uppercase font-semibold text-white/35">
              {t.footer.services}
            </p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={`/${locale}/services/${s.id}`}
                    className="font-body text-sm text-white/45 hover:text-white/80
                               transition-colors duration-150
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {t.services.items[i].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-body text-[9.5px] tracking-[0.20em] uppercase font-semibold text-white/35">
              {t.footer.contact}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-start gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  <Icon name="mail" size={12} strokeWidth={1.5} className="mt-[3px] shrink-0 text-white/25 group-hover:text-gold transition-colors duration-150" />
                  <span className="font-body text-sm text-white/45 group-hover:text-white/75 transition-colors duration-150 break-all">
                    {contactInfo.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  <Icon name="phone" size={12} strokeWidth={1.5} className="shrink-0 text-white/25 group-hover:text-gold transition-colors duration-150" />
                  <span className="font-body text-sm text-white/45 group-hover:text-white/75 transition-colors duration-150">
                    {contactInfo.phone}
                  </span>
                </a>
              </li>
              {contactInfo.addresses.map((addr) => (
                <li key={addr.id} className="flex items-start gap-2.5">
                  <Icon name="mappin" size={12} strokeWidth={1.5} className="mt-[3px] shrink-0 text-white/25" />
                  <span className="font-body text-sm text-white/45">
                    {addr.street}<br />{addr.city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-white/22">
            &copy; {year} {t.brand.legal}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`/${locale}/politique-de-confidentialite`}
              className="font-body text-xs text-white/22 hover:text-white/50 transition-colors duration-150
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              {t.footer.privacy}
            </Link>
            <p className="font-body text-xs text-white/18">
              {t.footer.tagline}
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <a
            href="https://linkio.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[11px] text-white/18 hover:text-white/40 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
          >
            made with ♥ by Linkio
          </a>
        </div>
      </div>
    </footer>
  )
}
