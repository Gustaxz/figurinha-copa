/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back-animated': "url('/backgrounds/background.svg')"
      },
      fontFamily: {
        'roboto': ["Roboto", "sans-serif"]
      },
      colors: {
        'qatar-gray': "#efe7e2",
        'qatar-middle-wine': "#81193e",
        'qatar-wine': "#5d1031"
      }
    },
  },
  plugins: [],
}
