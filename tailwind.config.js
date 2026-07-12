/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.15)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.15)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.2)',
      }
    },
  },
  plugins: [],
}
