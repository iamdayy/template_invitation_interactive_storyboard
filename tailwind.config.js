/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        'navy-dark': 'rgb(var(--color-navy-dark) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        'gold-light': 'rgb(var(--color-gold-light) / <alpha-value>)',
        'gold-dark': 'rgb(var(--color-gold-dark) / <alpha-value>)',
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        dark: 'rgb(var(--color-navy-dark) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      animation: {
        'curtain-left': 'curtainLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'curtain-right': 'curtainRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        shimmer: 'shimmer 3s infinite linear',
        'spin-slow': 'spin 8s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        glitch: 'glitch 3s infinite',
        'ornament-reveal': 'ornamentReveal 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'typing': 'typing 2s steps(20, end) forwards',
      },
      keyframes: {
        curtainLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        curtainRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)', clipPath: 'none' },
          '91%': { transform: 'translate(-2px, 1px)', clipPath: 'inset(10% 0 85% 0)' },
          '92%': { transform: 'translate(2px, -1px)', clipPath: 'inset(55% 0 30% 0)' },
          '93%': { transform: 'translate(0)', clipPath: 'none' },
          '94%': { transform: 'translate(-1px, 2px)', clipPath: 'inset(80% 0 5% 0)' },
          '95%': { transform: 'translate(1px, -2px)', clipPath: 'inset(20% 0 65% 0)' },
          '96%': { transform: 'translate(0)', clipPath: 'none' },
        },
        ornamentReveal: {
          '0%': { opacity: '0', transform: 'scaleX(0)' },
          '100%': { opacity: '1', transform: 'scaleX(1)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gold-shimmer':
          'linear-gradient(90deg, rgb(var(--color-gold)) 0%, rgb(var(--color-gold-light)) 50%, rgb(var(--color-gold)) 100%)',
        'navy-gradient':
          'linear-gradient(180deg, rgb(var(--color-navy-dark)) 0%, rgb(var(--color-navy)) 50%, rgb(var(--color-navy-dark)) 100%)',
      },
    },
  },
  plugins: [],
}
