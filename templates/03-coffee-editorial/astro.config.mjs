import { defineConfig } from "astro/config";

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/vibe-templates/03-coffee-editorial").
export default defineConfig({
  base: process.env.BASE_PATH || "/",
});
