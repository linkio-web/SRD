import frMessages from '@/messages/fr.json'
import enMessages from '@/messages/en.json'
import ptMessages from '@/messages/pt.json'

export type Locale = 'fr' | 'en' | 'pt'
export type Messages = typeof frMessages

// Vérifie statiquement que en/pt ont la même structure que fr
const _typeCheck: Record<Locale, Messages> = {
  fr: frMessages,
  en: enMessages satisfies Messages,
  pt: ptMessages satisfies Messages,
}

export const locales: Locale[] = ['fr', 'en', 'pt']
export const defaultLocale: Locale = 'fr'

const allMessages: Record<Locale, Messages> = _typeCheck

export function isValidLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

export function getMessages(locale: Locale): Messages {
  return allMessages[locale] ?? allMessages[defaultLocale]
}
