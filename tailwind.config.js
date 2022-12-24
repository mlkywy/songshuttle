module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bitter: ["bitter", "serif"],
      },
      colors: {
        main: "var(--main-text)",
        alt: "var(--alternate-text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        highlight: "var(--highlight)",
      },
    },
  },
  plugins: [],
};
