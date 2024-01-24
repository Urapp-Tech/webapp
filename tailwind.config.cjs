/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'kumbh-sans': ['Kumbh Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
