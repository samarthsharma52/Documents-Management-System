// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'custom-gray': '#FAF9F6',
//         'custom-dark-gray': '#767676',
//         'custome-blue': '#005AE6',
//         'lightgray': '#F4F4F4',
//         'tableblue': '#005AE61A',
//         'tabgray': '#BEBEBE',
//       },
//     },
//   },
//   plugins: [require('tailwind-scrollbar-hide')],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        app: {
          bg: "#0f172a",
          surface: "#111827",
          surface2: "#1e293b",

          primary: "#4f46e5",
          primaryHover: "#6366f1",

          secondary: "#6d28d9",

          muted: "#94a3b8",
          soft: "#cbd5e1",

          border: "#334155",

          success: "#34d399",
          error: "#f87171",
        },
      },

      boxShadow: {
        "primary-glow":
          "0 8px 25px rgba(79, 70, 229, 0.2)",

        "primary-soft":
          "0 4px 20px rgba(79, 70, 229, 0.15)",
      },
    },
  },

  plugins: [],
};