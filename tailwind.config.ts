import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app.vue",
    "./components/**/*.{vue,ts}",
    "./layouts/**/*.{vue,ts}",
    "./pages/**/*.{vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Make DM Sans the default sans font family
        sans: [
          '"DM Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        // Keep the custom dm-sans class for explicit usage
        "dm-sans": ['"DM Sans"', "sans-serif"],
      },
      colors: {
        primary: {
          bg: "#F7F3F0",
        },
      },
      backgroundColor: {
        primary: "#F7F3F0",
      },
    },
  },
  plugins: [],
};

export default config;
