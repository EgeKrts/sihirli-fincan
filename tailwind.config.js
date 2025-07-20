/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A148C',
        secondary: '#7B1FA2',
        accent: '#E1BEE7',
        dark: '#1A0E2E',
        light: '#F8F5FF'
      },
      fontFamily: {
        'mystical': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
} 