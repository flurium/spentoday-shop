const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        secondary: colors.zinc,
        lines: colors.zinc[300]
      }
    }
  },
  plugins: []
}
