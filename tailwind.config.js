/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#164E63",
        "weather-secondary": "#004E71",
        "input-bg": "rgba(255,255,255, 0.4)",
        "dark": "rgba(0,0,0,0.25)",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
    backgroundImage: {
      "warm": "url('./src/assets/warm-bg.jpg')",
      "cold": "url('./src/assets/cold-bg.jpg')"
    }
  },
  plugins: [],
};
