module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': 'ml-120%',
          '100%': 'ml-0',
        }
      }, 
      animation: {
        slide: 'slide 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
