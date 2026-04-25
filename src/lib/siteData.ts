// Données structurelles non-traduites : icônes, IDs, liens, coordonnées.
// Les textes visibles sont dans src/messages/*.json

// Couleurs de fond des sections — utilisées pour les biseaux (slantFill).
// Centralisé ici pour éviter la duplication dans chaque page.
export const BG = {
  cream: '#F7F6F4',
  stone: '#EDEBE7',
  navy:  '#301B4A',
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

export const partnerLogos = [
  { src: '/images/WB-logo_white.svg', alt: 'WB' },
] as const

