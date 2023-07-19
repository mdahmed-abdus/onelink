/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      primary: '#2F6E75',
      secondary: '#DEEBED',
      success: '#76C985',
      danger: '#FC0341',
      warning: '#FF8B41',
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
