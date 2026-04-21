import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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
import { services } from '@/lib/siteData'
import { MEGA_COL_INDICES } from '@/lib/navConfig'
import { buildAlternates, socialMeta, jsonLd } from '@/lib/seo'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

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

  const { openGraph, twitter } = socialMeta(
    validLocale,
    t.meta.homeTitle,
    t.meta.homeDescription,
    '',
  )

  return {
    metadataBase: new URL('https://www.srdpartners.ch'),
    title: {
      default: t.meta.homeTitle,
      template: t.meta.titleTemplate,
    },
    description: t.meta.homeDescription,
    alternates: buildAlternates(validLocale, ''),
    openGraph,
    twitter,
    icons: {
      icon: '/NewLogoDR.svg',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-navy focus:font-body focus:text-sm focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {t.a11y.skipToContent}
        </a>
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
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
