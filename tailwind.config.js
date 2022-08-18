/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontSize:{
        x:'0.5rem'
      }
    },
  },
  plugins: [],
}
