/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Electrigrid Design System
        canvas: '#F4F6F8',
        'prussian': '#003153',
        'prussian-light': '#004070',
        'cerulean': '#2A75D3',
        'cerulean-light': '#4A8FE8',
        'mint': '#2EBA7E',
        'amber-eg': '#F5A623',
        'crimson': '#D0021B',
        'charcoal': '#1A1A1A',
        'slate': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'draw-up': 'drawUp 0.6s ease-out',
        'wave': 'wave 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ticker': 'ticker 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawUp: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        ticker: {
          '0%': { transform: 'translateY(-6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,49,83,0.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,49,83,0.12)',
      },
    },
  },
  plugins: [],
}
