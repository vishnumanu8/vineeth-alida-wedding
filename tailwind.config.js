/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          50: '#FFFFFF',
          100: '#FFFDF9',
          DEFAULT: '#FFF9F1',
          200: '#FBF2E3',
        },
        champagne: {
          DEFAULT: '#F4E8D8',
          light: '#FAF3E9',
          border: '#E8D7C2',
          dark: '#D9C2A5',
        },
        botanical: {
          light: '#3E725F',
          DEFAULT: '#315B4B',
          dark: '#244438',
          deep: '#1A332A',
        },
        peacock: {
          light: '#4B9B95',
          DEFAULT: '#397F7A',
          dark: '#2A605C',
        },
        gold: {
          light: '#D4A359',
          DEFAULT: '#B88A45',
          dark: '#956D32',
          shimmer: '#F0D49E',
        },
        rose: {
          light: '#DDAAB0',
          DEFAULT: '#C77F83',
          dark: '#A65F63',
        },
        charcoal: {
          DEFAULT: '#282B2A',
          light: '#3E4240',
        },
        slate: {
          DEFAULT: '#646864',
          light: '#858985',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'wedding': '0 10px 30px -5px rgba(49, 91, 75, 0.08), 0 4px 12px -2px rgba(184, 138, 69, 0.06)',
        'wedding-lg': '0 20px 40px -10px rgba(49, 91, 75, 0.12), 0 8px 20px -4px rgba(184, 138, 69, 0.10)',
        'wax-seal': '0 4px 14px rgba(149, 109, 50, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
        'gold-glow': '0 0 25px rgba(184, 138, 69, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
