/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#7569a8',
        iris: '#4f477d',
        ivory: '#fffdf7',
        gold: '#c8a96b',
      },
      fontFamily: {
        sans: ['Noto Sans Thai', 'Tahoma', 'sans-serif'],
        display: ['Noto Serif Thai', 'Th Sarabun New', 'serif'],
      },
    },
  },
  plugins: [],
}
