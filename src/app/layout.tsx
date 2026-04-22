import type { ReactNode } from 'react'
import type { Viewport } from 'next'

// Layout racine minimal — toutes les routes passent par [locale]/layout.tsx
// qui fournit <html lang={locale}> et <body>.

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#301B4A',
}

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children
}
