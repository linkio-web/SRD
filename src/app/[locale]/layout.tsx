import type { Metadata } from 'next'
import type { ReactNode } from 'react'
// MODIFIED: Updated fonts to Cormorant Garamond (display) + DM Sans (body) for premium feel
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/app/globals.css'
import { Header } from '@/components/Header'
import {
  getMessages,
  isValidLocale,
  defaultLocale,
  locales,
  type Locale,
} from '@/lib/i18n'
import { services, contactInfo } from '@/lib/siteData'
import { MEGA_COL_INDICES } from '@/lib/navConfig'

// Cormorant Garamond — serif luxe raffiné, idéal pour un cabinet fiduciaire premium
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// DM Sans — sans-serif neutre et lisible, moderna pour le corps de texte et l'UI
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return {
    metadataBase: new URL(contactInfo.website),
    title: {
      default: t.meta.homeTitle,
      template: t.meta.titleTemplate,
    },
    description: t.meta.homeDescription,
    alternates: {
      canonical: `/${validLocale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        pt: '/pt',
        'x-default': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale:
        validLocale === 'fr' ? 'fr_CH' : validLocale === 'en' ? 'en_US' : 'pt_PT',
      siteName: 'SRD Partners Sàrl',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  // Construction du mega-menu Services à partir des données centralisées
  // Les liens pointent vers les pages dédiées (plus d'ancres)
  const megaColumns = MEGA_COL_INDICES.map((indices, colIdx) => ({
    title: colIdx === 0 ? t.header.megaMenu.col1Title : t.header.megaMenu.col2Title,
    links: indices.map((i) => ({
      label: t.services.items[i].title,
      description: t.services.items[i].shortDesc,
      href: `/${validLocale}/services/${services[i].id}`,
    })),
  }))

  const headerItems = [
    { label: t.nav.home,     href: `/${validLocale}` },
    {
      label: t.nav.services,
      href: `/${validLocale}/services`,
      columns: megaColumns,
      featured: {
        title:       t.header.megaMenu.featuredTitle,
        description: t.header.megaMenu.featuredDesc,
        href:        `/${validLocale}/services`,
        ctaLabel:    t.header.megaMenu.featuredCta,
      },
    },
    { label: t.nav.whoWeAre, href: `/${validLocale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body className={`${cormorantGaramond.variable} ${dmSans.variable} font-body antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // MODIFIED: Updated to FinancialService schema type
          __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              name: 'SRD Partners Sàrl',
              url: contactInfo.website,
              telephone: contactInfo.phone.replace(/\s/g, ''),
              email: contactInfo.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: contactInfo.addresses[0].street,
                postalCode: '2035',
                addressLocality: 'Corcelles-NE',
                addressCountry: 'CH',
              },
            }),
          }}
        />
        <Header
          locale={validLocale}
          items={headerItems}
          ctaLink={{ label: t.nav.cta, href: `/${validLocale}/contact` }}
          brandLegal={t.brand.legal}
          aria={{
            closeMenu: t.header.closeMenu,
            openMenu:  t.header.openMenu,
            mainNav:   t.header.mainNav,
            mobileNav: t.header.mobileNav,
          }}
        />
        <main>{children}</main>
      </body>
    </html>
  )
}
