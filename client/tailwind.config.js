/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('media/Carousel-1.jpg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
