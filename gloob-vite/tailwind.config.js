/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#004d1a',
        'primary-light': '#008000',
        'secondary': '#3b3f3c',
        'secondary-light': '#a8a8a8',
      },
    },
    plugins: [],
  }
}

