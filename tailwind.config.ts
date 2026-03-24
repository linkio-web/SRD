import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────
      // TYPOGRAPHIE
      // Primary : Manrope (sans-serif, corporate moderne)
      // Display : Playfair Display (serif, accentuation italique éditoriale)
      // ─────────────────────────────────────────
      // MODIFIED: Updated fonts — Cormorant Garamond (display) + DM Sans (body)
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'DM Sans', 'Manrope', 'system-ui', 'sans-serif'],
      },

      // ─────────────────────────────────────────
      // COULEURS — extraites du logo SRD Partners
      //
      // Sections claires :
      //   cream  → fond principal (cool near-white)
      //   stone  → fond alterné  (cool light gray)
      // Sections sombres :
      //   navy   → fond sombre / hero / footer (dark violet)
      // Accents :
      //   gold   → alias sémantique crimson (CTA, labels, micro-accents)
      //   primary → échelle complète violet (titres, liens, highlights)
      //   accent → échelle complète crimson (miroir de gold)
      // Texte :
      //   ink    → texte principal dark
      //   muted  → texte secondaire cool gray
      // ─────────────────────────────────────────
      colors: {
        // Fonds de sections (cool, pas de tons chauds)
        cream:    '#F8F9FC',
        stone:    '#D2C9D6',
        // Fond minéral — lavande grise subtile, sections premium
        mineral:  '#D2C9D6',

        // Fond sombre — violet profond dérivé du logo SRD (même teinte que primary, plus sombre)
        navy: {
          DEFAULT: '#46184E',
          800:     '#301236',
          700:     '#3B163D',
        },

        // Alias sémantique accent/bordeaux → utilisé pour CTA, overlines, séparateurs
        // (préserve les classes bg-gold, text-gold, etc. déjà en place)
        gold: {
          DEFAULT: '#800F33',
          light:   '#C01F55',
          pale:    '#FFF0F3',
          dark:    '#6A0B2B',
        },

        // Texte principal — violet nuit très sombre
        ink: '#1E0F28',

        // Texte secondaire — cool muted
        muted: '#5A6080',

        // ── Échelle primaire complète (violet logo SRD — #65366D)
        primary: {
          50:  '#F4F0F6',
          100: '#E7DEEC',
          200: '#CEB9D8',
          300: '#AE8DC3',
          400: '#886BAD',
          500: '#65366D', // rgb(101, 54, 109) — violet logo officiel
          600: '#552C5B',
          700: '#432249',
          800: '#311838',
          900: '#200F26',
          950: '#130918',
        },

        // ── Échelle accent complète (bordeaux arrow du logo — #800F33)
        accent: {
          50:  '#FFF0F3',
          100: '#FFE1EA',
          200: '#FFC3D4',
          300: '#FF95B3',
          400: '#E05580',
          500: '#C01F55',
          600: '#800F33',
          700: '#6A0B2B',
          800: '#550820',
          900: '#400618',
          950: '#28030E',
        },

        // Champagne — or chaud subtil pour numéros de stats, séparateurs, accents titres
        champagne: '#C9A96E',

        // ── Nuancier gris cool (zéro ton chaud/beige)
        gray: {
          50:  '#F8F9FC',
          100: '#D2C9D6',
          200: '#DDE1ED',
          300: '#C4CAD9',
          400: '#9BA4BB',
          500: '#6B7490',
          600: '#515B75',
          700: '#3C445C',
          800: '#272E44',
          900: '#161B2E',
          950: '#0C1020',
        },
      },

      // ─────────────────────────────────────────
      // OMBRES
      // ─────────────────────────────────────────
      boxShadow: {
        card: '0 1px 3px rgba(26,10,40,0.06), 0 4px 16px rgba(26,10,40,0.06)',
        'card-hover': '0 8px 32px rgba(26,10,40,0.14)',
        // Ombre teintée bordeaux pour les CTA
        gold: '0 4px 20px rgb(128, 15, 51,0.30)',
        // Ombres multicouches premium (légèrement violet-tintées)
        premium: [
          '0 0 0 1px rgba(26,10,40,0.05)',
          '0 2px 4px rgba(26,10,40,0.04)',
          '0 8px 16px rgba(26,10,40,0.05)',
          '0 20px 40px rgba(26,10,40,0.04)',
        ].join(', '),
        'premium-hover': [
          '0 0 0 1px rgba(26,10,40,0.07)',
          '0 4px 8px rgba(26,10,40,0.05)',
          '0 16px 32px rgba(26,10,40,0.08)',
          '0 40px 64px rgba(26,10,40,0.07)',
        ].join(', '),
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config



