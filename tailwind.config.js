/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "components/**/*.{vue,js}",
    "layouts/**/*.{html,vue}",
    "pages/**/*.{html,vue}",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        lora: ["Lora", "serif"],
        inter: ["Inter", "sans-serif"],
        satisfy: ["Satisfy", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated"), require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
