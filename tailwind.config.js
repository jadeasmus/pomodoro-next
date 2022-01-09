const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      blue: colors.blue,
      white: colors.white,
      black: colors.black,
      green: {
        glow: "#29FF75",
        spotify: "#24DC65"
      } 
    },
    extend: {},
  },
  plugins: [],
}
