/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-sky-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-white',
    'bg-black',
  ],
}
