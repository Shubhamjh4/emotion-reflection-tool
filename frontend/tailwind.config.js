// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', 'system-ui', 'sans-serif'],
//       },
//       animation: {
//         'spin': 'spin 1s linear infinite',
//         'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       },
//       backdropBlur: {
//         'xs': '2px',
//       },
//       colors: {
//         'glass': 'rgba(255, 255, 255, 0.1)',
//       }
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
