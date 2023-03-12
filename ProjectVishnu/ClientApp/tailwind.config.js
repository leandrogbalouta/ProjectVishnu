/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Dosis" : ['Dosis', 'sans-serif']
      },
      animation: {
        aurora: 'aurora 2s ease-out infinite'
      }
    },
  },
  plugins: [],
}
