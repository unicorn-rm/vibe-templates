import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/vibe-templates/23-blog-newsletter").
export default defineConfig({ base: process.env.BASE_PATH || "/", integrations: [mdx()] });
