module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    fontFamily:{
            anton:['Anton', 'sans-serif'],
            Tenali:['Tenali Ramakrishna', 'sans-serif'],
          },
     extend: {},
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }

// module.exports = {
//   mode: '',
//   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './Components/**/*.{js,ts,jsx,tsx}'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     fontFamily:{
//       anton:['Anton', 'sans-serif'],
//       Tenali:['Tenali Ramakrishna', 'sans-serif'],
//     },
//     extend: {
//       keyframes: {
//         wiggle: {
//           "0%, 100%": { transform: "rotate(-3deg)" },
//           "50%": { transform: "rotate(3deg)" }
//         }
//       },
//       animation: {
//         wiggle: "wiggle 200ms ease-in-out"
//       }
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
