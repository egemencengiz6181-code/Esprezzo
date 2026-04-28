/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#ffe2e2',
          500: '#c0392b',
          600: '#a93226',
          700: '#922b21',
        },
      },
    },
  },
  plugins: [],
}
