import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ─── Accent ───────────────────────────────────────────────────────────────────
// Mot ou fragment mis en valeur : italique + champagne gold.
// Usage : <PremiumHeading>Notre <Accent>engagement</Accent></PremiumHeading>
// MODIFIED: text-gold → text-champagne pour un rendu plus luxueux et chaud
export function Accent({ children }: { children: ReactNode }) {
  return <span className="italic font-light text-champagne">{children}</span>
}

// ─── PremiumHeading ───────────────────────────────────────────────────────────

type HeadingLevel = 'h1' | 'h2' | 'h3'

/** Taille du titre selon son contexte. */
type HeadingSize =
  | 'hero'    // H1 plein écran (accueil)          5xl → 8xl
  | 'page'    // H1 hero de sous-page              5xl → 7xl
  | 'section' // H2 section standard               3xl → 5xl

/** Couleur du texte selon le fond. */
type HeadingColor =
  | 'light'   // Fond sombre (navy) → texte blanc
  | 'dark'    // Fond clair (cream/stone) → texte navy

interface PremiumHeadingProps {
  children: ReactNode
  as?: HeadingLevel
  size?: HeadingSize
  color?: HeadingColor
  className?: string
}

const sizeClasses: Record<HeadingSize, string> = {
  // H1 plein écran : très grand, serré — présence maximale
  hero:    'text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-[-0.02em]',
  // H1 sous-page : grand mais lisible, légèrement resserré
  page:    'text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-[-0.015em]',
  // H2 section : équilibre hiérarchie / lisibilité
  section: 'text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.01em]',
}

const colorClasses: Record<HeadingColor, string> = {
  light: 'text-white',
  dark:  'text-navy',
}

export function PremiumHeading({
  children,
  as: Tag = 'h2',
  size = 'section',
  color = 'dark',
  className,
}: PremiumHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display font-light',
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
