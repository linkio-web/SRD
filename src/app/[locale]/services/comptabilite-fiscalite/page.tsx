import type { Metadata } from 'next'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { buildAlternates, socialMeta } from '@/lib/seo'
import { ServicePage } from '@/components/ServicePage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)
  return {
    title: t.meta.comptaTitle,
    description: t.meta.comptaDescription,
    alternates: buildAlternates(validLocale, '/services/comptabilite-fiscalite'),
    ...socialMeta(validLocale, t.meta.comptaTitle, t.meta.comptaDescription, '/services/comptabilite-fiscalite'),
  }
}

export default async function ComptabiliteFiscalitePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return <ServicePage locale={validLocale} t={t} serviceIndex={0} />
}
