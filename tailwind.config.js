/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf6f8',
          100: '#fce8ef',
          200: '#f9d0de',
          300: '#f4a8c0',
          400: '#ec739a',
          500: '#e04d7a',
          600: '#cc2f5e',
          700: '#ab2149',
          800: '#8e1e3e',
          900: '#771d38',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf8f0',
          200: '#faf0dc',
          300: '#f5e3be',
          400: '#eecf96',
          500: '#e5b76b',
          600: '#d49843',
          700: '#b07830',
          800: '#8e5f28',
          900: '#744e22',
        },
        nude: {
          50: '#faf7f5',
          100: '#f4ede8',
          200: '#ead9d0',
          300: '#dbbdaf',
          400: '#c89a87',
          500: '#b87d68',
          600: '#a5674f',
          700: '#895441',
          800: '#714638',
          900: '#5e3c31',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

