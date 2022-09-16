/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Nunito', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(9rem, 1fr))',
      },
    },
  },
  plugins: [],
  safelist: [
    'border-red-500',
    'border-green-500',
    'border-blue-500',
    'border-sky-500',
    'border-yellow-500',
    'border-orange-500',
    'border-white',
    'border-black',
  ],
}
