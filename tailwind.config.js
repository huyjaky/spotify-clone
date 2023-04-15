/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        CellColorHover: 'rgba(255,255,255, 0.3)',
      },
      screens: {
        mobile: {max: '649px'},
        mobilexl: {max: '1100px'},
        tablet: {min: '901px', max: '1110px'},
      },
      keyframes: {

      },
      animation: {
        // hoverButton: 'hoverButton 1s ease-in-out'
      },

    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
