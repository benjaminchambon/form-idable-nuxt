import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  imports: {
    dirs: ["composables/**"],
  },
  compatibilityDate: "2025-07-27",
  nitro: {
    preset: "cloudflare",
  },
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
