module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        slide: 'slide transition ease-out duration-500',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translate-x-full' },
          '100%': { transform: 'translate-x-0' },
        }
      }
    },
  },
  plugins: [],
}


/*
x-transition:leave="transition ease-out duration-500"
x-transition:leave-start="transform translate-x-0 opacity-100"
x-transition:leave-end="transform translate-x-full opacity-0"
*/