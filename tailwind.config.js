/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lendsqr: {
          primary: "#39CDCC",
          navy: "#213F7D",
          muted: "#545F7D",
          border: "rgba(84, 95, 125, 0.15)",
          surface: "#FBFBFB",
          sidebar: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Work Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
