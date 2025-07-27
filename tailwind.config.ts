import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F7F3F0',
        },
      },
      backgroundColor: {
        primary: '#F7F3F0',
      },
    },
  },
  plugins: [],
};

export default config;
