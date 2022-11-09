/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Tailwindcss 3.0 default is 'media',  'class'
  theme: {
    extend: {
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        t: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        orange: '0px 20px 20px -15px rgba(245,56,56,0.81) ',
        'orange-md': '0px 20px 40px -15px rgba(245,56,56,0.81) ',
        none: 'none',
      },
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        black: {
          500: '#4F5665',
          600: '#0B132A',
        },
        orange: {
          100: '#FFECEC',
          500: '#F53855',
        },
        green: {
          500: '#2FAB73',
        },
        white: {
          300: '#F8F8F8',
          500: '#fff',
        },
        gray: {
          100: '#EEEFF2',
          400: '#AFB5C0',
          500: '#DDDDDD',
        },
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        'fade-in': {
          '0%': { opacity: 0.01 },
          '100%': { opacity: 1 },
        },
        'my-ping': {
          '0%': { transform: 'scale(1, 1)', opacity: 0.5 },
          '100%': { transform: 'scale(1.2, 1.2)', opacity: 0.01 },
        },
        'loading-spinner': {
          '0%': { '-webkit-transform': 'scale(0)' },
          '80%': { '-webkit-transform': 'scale(0)' },
          '100%': { '-webkit-transform': 'scale(0)' },
          '40%': { '-webkit-transform': 'scale(1.0)' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        'fade-in': 'fade-in 0.2s linear',
        'my-ping': 'my-ping 1s linear infinite',
        'loading-spinner': 'loading-spinner 1.4s infinite ease-in-out both',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active', 'hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
