// Données structurelles non-traduites : icônes, IDs, liens, coordonnées.
// Les textes visibles sont dans src/messages/*.json

// Couleurs de fond des sections — utilisées pour les biseaux (slantFill).
// Centralisé ici pour éviter la duplication dans chaque page.
export const BG = {
  cream:   '#F8F9FC',
  stone:   '#D2C9D6',
  navy:    '#46184E',
  mineral: '#D2C9D6',
} as const

export type IconName =
  | 'shield'
  | 'handshake'
  | 'lock'
  | 'calculator'
  | 'trending'
  | 'search'
  | 'home'
  | 'rocket'
  | 'users'
  | 'linkedin'
  | 'instagram'
  | 'facebook'

export const services = [
  { id: 'comptabilite-fiscalite',  icon: 'calculator' as IconName },
  { id: 'ressources-humaines',     icon: 'users'      as IconName },
  { id: 'gestion-administrative',  icon: 'shield'     as IconName },
  { id: 'gestion-immobiliere',     icon: 'home'       as IconName },
] as const

export const activityDomains = [
  { id: 'revision',       icon: 'search'     as IconName },
  { id: 'payroll',        icon: 'users'      as IconName },
  { id: 'tax',            icon: 'calculator' as IconName },
  { id: 'administration', icon: 'shield'     as IconName },
] as const

export const contactInfo = {
  /** Interlocutrice principale */
  contact: 'Cremilde Hirschi',
  role:    'Administration · Finance · RH',
  email:   'cremilde.hirschi@srdpartners.ch',
  phone:   '+41 32 857 24 19',
  website: 'https://www.srdpartners.ch',
  addresses: [
    { id: 'main', street: 'Les Vernets 2', city: '2035 Corcelles NE' },
  ],
} as const

export const socials = [
  { label: 'LinkedIn',  href: '#', icon: 'linkedin'  as IconName },
  { label: 'Instagram', href: '#', icon: 'instagram' as IconName },
  { label: 'Facebook',  href: '#', icon: 'facebook'  as IconName },
] as const



