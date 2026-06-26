import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        raclif: {
          primary: '#8B5CF6',    // Violet principal
          secondary: '#7C3AED',  // Violet foncé
          accent: '#A78BFA',     // Violet clair
          dark: '#0A0A0F',       // Noir profond 1
          darker: '#111118',     // Noir profond 2
          darkest: '#1A1A2E',    // Noir profond 3
          light: '#F8F8FF',      // Blanc
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-raclif': 'linear-gradient(to bottom right, #0A0A0F, #111118, #1A1A2E, #2d1b4e)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6' },
          '100%': { boxShadow: '0 0 20px #7C3AED, 0 0 30px #7C3AED' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
export default config
