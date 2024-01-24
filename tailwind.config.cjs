/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        faded: 'var(--color-faded)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        secondary2: 'var(--color-secondary2)',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'kumbh-sans': ['Kumbh Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
