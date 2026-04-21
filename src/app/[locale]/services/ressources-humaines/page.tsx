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
    title: t.meta.rhTitle,
    description: t.meta.rhDescription,
    alternates: buildAlternates(validLocale, '/services/ressources-humaines'),
    ...socialMeta(validLocale, t.meta.rhTitle, t.meta.rhDescription, '/services/ressources-humaines'),
  }
}

export default async function RessourcesHumainesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  return <ServicePage locale={validLocale} t={t} serviceIndex={1} />
}
