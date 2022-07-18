/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}',],
  theme: {
    colors: {
      black: '#000000',
      beige: '#FFEFE5',
      mainOrange: '#FF6500',
      orange: '#FF6709',
      grayLight: '#A2A4A5',
      white: '#FFFFFF'
    },
    extend: {
      width: {
        '30': '7rem',
      }
    },
  },
  plugins: [],
};
