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
});
