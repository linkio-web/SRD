import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'DM Sans', 'Manrope', 'system-ui', 'sans-serif'],
      },

      colors: {
        // ── Fonds
        cream:   '#F7F6F4',   // blanc cassé chaud — fond principal
        stone:   '#EDEBE7',   // gris chaud doux — fond alterné

        // ── Violet SRD — fond sombre, hero, footer
        navy: {
          DEFAULT: '#301B4A',
          dark:    '#1E0D2B',
          light:   '#3E2056',
        },

        // ── Accent bordeaux/crimson — CTA, overlines, hover
        gold: {
          DEFAULT: '#8B1038',
          light:   '#B01B4A',
          pale:    '#FBF0F4',
          dark:    '#6A0B2B',
        },

        // ── Texte
        ink:   '#1A0D26',
        muted: '#6B6578',

        // ── Violet complet
        primary: {
          50:  '#F3F0F7',
          100: '#E4DDEE',
          200: '#C8BBDD',
          300: '#A594C7',
          400: '#8070AE',
          500: '#5C4A8A',
          600: '#4A3872',
          700: '#382858',
          800: '#26193E',
          900: '#180E28',
          950: '#0E0818',
        },

        // ── Accent complet
        accent: {
          50:  '#FBF0F4',
          100: '#F5DCEA',
          200: '#EABACC',
          300: '#D88BAF',
          400: '#C05E8D',
          500: '#A0306A',
          600: '#8B1038',
          700: '#6A0B2B',
          800: '#50071E',
          900: '#380414',
          950: '#24020D',
        },

        gray: {
          50:  '#F7F6F4',
          100: '#EDEBE7',
          200: '#D9D6CF',
          300: '#BAB6AC',
          400: '#968F83',
          500: '#6E6760',
          600: '#514B45',
          700: '#3A3530',
          800: '#26231F',
          900: '#161412',
          950: '#0D0C0A',
        },
      },

      boxShadow: {
        card:           '0 1px 2px rgba(26,13,38,0.05), 0 4px 12px rgba(26,13,38,0.06)',
        'card-hover':   '0 4px 20px rgba(26,13,38,0.12)',
        gold:           '0 4px 16px rgba(139,16,56,0.25)',
        subtle:         '0 0 0 1px rgba(26,13,38,0.06)',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
