/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#FAF9F6',
        'custom-dark-gray': '#767676',
        'custome-blue': '#005AE6',
        'lightgray': '#F4F4F4',
        'tableblue': '#005AE61A',
        'tabgray': '#BEBEBE',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}