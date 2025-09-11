/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'cursive': ['Dancing Script', 'cursive'],
      },
      colors: {
        'hopely-pink': '#EB9594',
        'hopely-pink-dark': '#D67B7A',
      },
    },
  },
  plugins: [],
}

