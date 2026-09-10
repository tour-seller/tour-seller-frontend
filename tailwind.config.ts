import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#f7f7f6',
          100: '#ececeb',
          200: '#d8d8d6',
          300: '#b8b8b5',
          400: '#8f8f8b',
          500: '#6b6b67',
          600: '#4a4a47',
          700: '#2e2e2c',
          800: '#1a1a19',
          900: '#0c0c0b',
        },
        brand: {
          ink: '#12344d',
          deep: '#0b2d42',
          navy: '#12344d',
          ocean: '#176b87',
          blue: '#1c8aa8',
          orange: '#f2785c',
          coral: '#f2785c',
          amber: '#f4b860',
          gold: '#e9a84c',
          yellow: '#ffd166',
          sand: '#f4fbfc',
          light: '#fbfefe',
          mute: '#6f8792',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(12, 12, 11, 0.08)',
        card: '0 16px 40px -16px rgba(12, 12, 11, 0.1)',
        'card-hover': '0 24px 48px -18px rgba(12, 12, 11, 0.14)',
        float: '0 28px 60px -20px rgba(12, 12, 11, 0.18)',
        glow: '0 0 0 1px rgba(12, 12, 11, 0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.32, 0.72, 0, 1)',
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(2.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.32, 0.72, 0, 1)',
        'reveal-up': 'reveal-up 0.9s cubic-bezier(0.32, 0.72, 0, 1)',
        'pulse-subtle': 'pulse-subtle 3s infinite cubic-bezier(0.32, 0.72, 0, 1)',
        'float-slow': 'float-slow 5s cubic-bezier(0.32, 0.72, 0, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
