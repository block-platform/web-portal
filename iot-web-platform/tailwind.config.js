// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // "apps/site/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// const { join } = require('path');

// module.exports = {
//   content: [
//     join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
//     join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// module.exports = {
//   mode: 'jit',
//   content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
