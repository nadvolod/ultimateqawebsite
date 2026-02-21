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
        'uqa-deep-blue': '#003c96',
        'uqa-purple': '#8c3cf9',
        'uqa-bright-blue': '#1B5AB9',
        'uqa-sky': '#2ea3f2',
        'uqa-dark': '#252525',
        'uqa-gray-mid': '#797979',
        'uqa-gray-light': '#dbdbdb',
        'uqa-gray-bg': '#fafafa',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      keyframes: {
        orbit: {
          from: { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'orbit-slow': 'orbit 20s linear infinite',
        'orbit-medium': 'orbit 14s linear infinite',
        'orbit-fast': 'orbit 9s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px 0 rgba(0,0,0,0.12), 0 0 0 1px rgba(0,60,150,0.12)',
        'glow-blue': '0 0 24px 0 rgba(46,163,242,0.25)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #000d24 0%, #001a4d 60%, #0a0520 100%)',
        'gradient-brand': 'linear-gradient(135deg, #003c96 0%, #1B5AB9 50%, #8c3cf9 100%)',
        'gradient-card': 'linear-gradient(135deg, #001a4d 0%, #0a0520 100%)',
      },
    },
  },
  plugins: [],
}

export default config
