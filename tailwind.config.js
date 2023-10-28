/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#3BB77E",
        blue_black: "#253D4E",
      },
      backgroundImage: {
        hero: "url('https://i.hizliresim.com/2skeeyj.jpg')",
      },
    },
  },
  plugins: [],
};
