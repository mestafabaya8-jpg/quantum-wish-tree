/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'love-red': '#E02424', // Rouge amour vif
        'gold-premium': '#C6A15E', // Or mat premium
        'dark-deep': '#090A0C', // Noir profond
        'dark-surface': '#14161A', // Surface sombre
      },
    },
  },
  plugins: [],
}