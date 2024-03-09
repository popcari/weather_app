/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      'weather-primary': '#00668a',
      'weather-secondary': '#004e71',
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [],
}
