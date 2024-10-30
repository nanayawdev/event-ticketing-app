/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '300% 300%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '300% 300%',
            'background-position': 'right center'
          },
        },
      },
      maxWidth: {
        '1600': '1600px',
      },
    },
  },
  plugins: [],
}

