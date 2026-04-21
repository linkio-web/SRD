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
    title: t.meta.adminTitle,
    description: t.meta.adminDescription,
    alternates: buildAlternates(validLocale, '/services/gestion-administrative'),
    ...socialMeta(validLocale, t.meta.adminTitle, t.meta.adminDescription, '/services/gestion-administrative'),
  }
}

export default async function GestionAdministrativePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return <ServicePage locale={validLocale} t={t} serviceIndex={2} />
}
