/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8FAF1",
          100: "#C6F4DC",
          200: "#8EEDB8",
          300: "#52E292",
          400: "#22D779",
          DEFAULT: "#00D06C", // Vibrant Electric Green from Charging 'C' & Checkmark
          500: "#00D06C",
          600: "#00B25C",
          700: "#00914B",
          800: "#006E39",
          900: "#004D28",
        },
        secondary: {
          50: "#EFF4FC",
          100: "#D6E4F8",
          200: "#ACCBF2",
          300: "#7AA9E9",
          400: "#3E7EDB",
          DEFAULT: "#0A3D91", // Royal Electric Blue from Checkout 'C'
          500: "#0A3D91",
          600: "#083277",
          700: "#06265B",
          800: "#041B41",
          900: "#021026",
        },
        teal: {
          DEFAULT: "#0090B8", // Gradient transition color from the Charging 'C'
          light: "#00A8D6",
          dark: "#007696",
        },
        dark: {
          DEFAULT: "#0A0F1D",
          surface: "#111827",
          card: "#161F33",
          border: "#1E293B",
        },
      },
    },
  },
  plugins: [],
};