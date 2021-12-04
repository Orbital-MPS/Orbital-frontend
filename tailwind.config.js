module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
          wiggle: {
              '0%, 100%': {
                  transform: 'rotate(-3deg)'
              },
              '50%': {
                  transform: 'rotate(3deg)'
              },
          }
      },
      animation: {
          wiggle: 'wiggle 1s ease-in-out infinite',
      }
  },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.025em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".1em",
      widest1: "3.25em",
    },
    fontFamily: {
      anton: ["Anton", "sans-serif"],
      Tenali: ["Tenali Ramakrishna", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

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
