import { contactInfo } from './siteData'
import { locales, type Locale } from './i18n'

export const SITE_URL = contactInfo.website // https://www.srdpartners.ch

export const OG_LOCALE: Record<Locale, string> = {
  fr: 'fr_CH',
  en: 'en_US',
  pt: 'pt_PT',
}

/** All public routes (without locale prefix). */
const ROUTES = [
  '',
  '/services',
  '/services/comptabilite-fiscalite',
  '/services/ressources-humaines',
  '/services/gestion-administrative',
  '/services/gestion-immobiliere',
  '/qui-sommes-nous',
  '/contact',
  '/politique-de-confidentialite',
] as const

/** Generate full URLs for every locale + route combination (sitemap, etc.). */
export function allPages(): { url: string; locale: Locale; route: string }[] {
  return locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      locale,
      route,
    })),
  )
}

/** Build `alternates` object for a given route (canonical + hreflang). */
export function buildAlternates(locale: Locale, route: string) {
  return {
    canonical: `${SITE_URL}/${locale}${route}`,
    languages: {
      fr: `${SITE_URL}/fr${route}`,
      en: `${SITE_URL}/en${route}`,
      pt: `${SITE_URL}/pt${route}`,
      'x-default': `${SITE_URL}/fr${route}`,
    },
  }
}

/** Shared OpenGraph + Twitter fields for a page. */
export function socialMeta(
  locale: Locale,
  title: string,
  description: string,
  route: string,
) {
  const url = `${SITE_URL}/${locale}${route}`
  return {
    openGraph: {
      type: 'website' as const,
      locale: OG_LOCALE[locale],
      siteName: 'SRD Partners Sarl',
      title,
      description,
      url,
    },
    twitter: {
      card: 'summary' as const,
      title,
      description,
    },
  }
}

/** JSON-LD FinancialService schema (injected once in layout). */
export function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'SRD Partners Sarl',
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
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.0,
        longitude: 6.85,
      },
      geoRadius: '100000',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  }
}
