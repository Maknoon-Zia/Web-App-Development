/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#213555',       // rgb(33, 53, 85)
        blue: '#3E5879',       // rgb(62, 88, 121)
        tan: '#D8C4B6',        // rgb(216, 196, 182)
        offwhite: '#F5EFE7',   // rgb(245, 239, 231)
      },
    },
  },
  plugins: [],
};
