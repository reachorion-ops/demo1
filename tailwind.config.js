/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          950: '#040705',
          900: '#080E0A',
          850: '#0E1712',
          800: '#14211A',
          700: '#1D2F25',
          600: '#2A4335',
          500: '#3D5F4D',
          400: '#5A856E',
          300: '#86B39A',
          200: '#B8D9C6',
          100: '#E2F1E8',
        },
        emeraldGlow: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        champagne: {
          DEFAULT: '#DFCCA6',
          light: '#F4ECE1',
          gold: '#C9A96E',
          muted: '#96815B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient-atrium': 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.12), transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

