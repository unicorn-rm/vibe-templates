import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/vibe-templates/10-yoga-wellness").
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  vite: { plugins: [tailwindcss()] },
});
