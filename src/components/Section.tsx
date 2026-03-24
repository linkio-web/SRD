// MODIFIED: Implement diagonal slant SVG + increase padding vertical
import { cn } from '@/lib/utils'

type BgVariant = 'cream' | 'stone' | 'navy' | 'white' | 'mineral'

interface SectionProps {
  children: React.ReactNode
  /** Couleur de fond de la section */
  bg?: BgVariant
  /**
   * Direction du biseau supérieur.
   * 'left'  → la ligne diagonale monte vers la gauche (/)
   * 'right' → la ligne diagonale descend vers la droite (\)
   * false   → pas de biseau (première section)
   */
  slant?: 'left' | 'right' | false
  /**
   * Couleur de remplissage du triangle de biseau.
   * Doit correspondre à la couleur de fond de la section PRÉCÉDENTE.
   */
  slantFill?: string
  id?: string
  className?: string
  /** Supprime le padding vertical par défaut */
  noPadding?: boolean
}

const bgMap: Record<BgVariant, string> = {
  cream:   'bg-cream',
  stone:   'bg-stone',
  navy:    'bg-navy',
  white:   'bg-white',
  mineral: 'bg-mineral',
}

export function Section({
  children,
  bg = 'cream',
  slant = false,
  slantFill,
  id,
  className,
  noPadding = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative w-full overflow-hidden', bgMap[bg], className)}>

      {/* ── Grain texture sur fond navy — profondeur quasi imperceptible ── */}
      {bg === 'navy' && (
        <div
          className="navy-grain absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
          aria-hidden="true"
        />
      )}

      {/* ── Biseau diagonal — décoratif, transition section précédente ── */}
      {slant && slantFill && (
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full pointer-events-none z-0"
          style={{ height: 'var(--slant-h)' }}
        >
          {/*
           * slant="right" (\) : triangle haut-gauche → bas-droite
           *   → polygon remplit le triangle supérieur-gauche avec la couleur précédente
           * slant="left"  (/) : triangle haut-droite → bas-gauche
           *   → polygon remplit le triangle supérieur-droit avec la couleur précédente
           */}
          <polygon
            points={slant === 'right' ? '0,0 1440,0 0,80' : '0,0 1440,0 1440,80'}
            fill={slantFill}
          />
        </svg>
      )}

      <div className={cn(
        'relative z-10 container-main',
        noPadding ? '' : slant ? 'pt-32 sm:pt-40 pb-28 sm:pb-36' : 'py-28 sm:py-36',
      )}>
        {children}
      </div>
    </section>
  )
}
