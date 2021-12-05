module.exports = {
  purge: ["./src/components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "small-slow-ping": {
          "75%, 100%": { transform: "scale(1.1)", opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "small-slow-ping": "small-slow-ping 3s ease-in-out infinite",
      },
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
