import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      // BASE_PATH is set by the GitHub Pages workflow, e.g. "/vibe-templates/07-photographer"
      paths: { base: process.env.BASE_PATH || "" },
    }),
  ],
});
