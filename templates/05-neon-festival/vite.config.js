import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base: the build works from any folder or sub-path (GitHub Pages, Netlify, a USB stick).
export default defineConfig({
  plugins: [react()],
  base: "./",
});
