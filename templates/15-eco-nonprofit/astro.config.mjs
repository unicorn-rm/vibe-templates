import { defineConfig } from "astro/config";

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/vibe-templates/15-eco-nonprofit").
export default defineConfig({ base: process.env.BASE_PATH || "/" });
