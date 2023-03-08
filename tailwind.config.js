/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leagueBlue: {
          100: "#CDFAFA",
          200: "#0AC8B9",
          300: "#0397AB",
          400: "#005A82",
          500: "#0A323C",
          600: "#091428",
          700: "#0A1428",
        },
        leagueGold: {
          100: "#F0E6D2",
          200: "#C8AA6E",
          300: "#C8AA6E",
          400: "#C89B3C",
          500: "#785A28",
          600: "#463714",
          700: "#32281E",
        },
        leagueGrey: {
          100: "#A09B8C",
          200: "#5B5A56",
          300: "#3C3C41",
          400: "#1E2328",
          500: "#1E282D",
          600: "#010A13",
        },
        darkMode: {
          100: "#121212",
          200: "#1D1D1D",
          300: "#BB86FC",
          400: "#03DAC6",
          500: "#E1E1E1",
          600: "#E7E7E7",
          700: "#100B16",
          800: "#121212",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
