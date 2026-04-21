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
    title: t.meta.immoTitle,
    description: t.meta.immoDescription,
    alternates: buildAlternates(validLocale, '/services/gestion-immobiliere'),
    ...socialMeta(validLocale, t.meta.immoTitle, t.meta.immoDescription, '/services/gestion-immobiliere'),
  }
}

export default async function GestionImmobilierePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return <ServicePage locale={validLocale} t={t} serviceIndex={3} />
}
