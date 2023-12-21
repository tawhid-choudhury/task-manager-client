/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', 'sans-serif'",
      },
    },
    colors: {
      tmnavy: "#004265",
      tmred: "#ed3245",
      tmbeigh: "#d7b67b",
      tmwhite: "#ffffff",
    },
  },
  plugins: [require("daisyui")],
};
