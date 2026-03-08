/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        espresso: {
          black: 'rgb(var(--c-black) / <alpha-value>)',
          dark: 'rgb(var(--c-dark) / <alpha-value>)',
          card: 'rgb(var(--c-card) / <alpha-value>)',
          border: 'rgb(var(--c-border) / <alpha-value>)',
          red: '#C0392B',
          'red-light': '#E74C3C',
          gold: '#D4AF6A',
          ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
          muted: 'rgb(var(--c-muted) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
