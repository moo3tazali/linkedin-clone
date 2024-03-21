/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A66C2",
        secondary: "#666666",
        background: "#EBEBEB",
        linkedBlack: "#191919",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "991px",
      lg: "1060px",
      xl: "1200px",
      xxl: "1700px",
    },
  },
  plugins: [],
};
