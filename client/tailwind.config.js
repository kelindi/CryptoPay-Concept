const { green } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "blue-gray":colors.blueGray,
        "cool-gray":colors.coolGray,
        "gray":colors.gray,
        "true-gray":colors.trueGray,
        "warm-gray":colors.warmGray,
        "custom":{
          "100":"#FFFBF8",
        }
      },
      keyframes: {
        "small-slow-ping": {
          "75%, 100%": { transform: "scale(1.1)", opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "small-slow-ping": "small-slow-ping 3s ease-in-out infinite",
      },
      maxHeight: {
        '0': '0',
         '1/4': '25%',
         '1/2': '50%',
         '3/4': '75%',
         'full': '100%',
      }
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: "auto",
    },
    
  },
  variants: {
    extend: {},
    animation: ["responsive", "motion-safe", "motion-reduce", "hover"],
  },
  plugins: [],
};
