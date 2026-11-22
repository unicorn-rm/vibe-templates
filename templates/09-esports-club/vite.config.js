import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// three.js is split into its own lazy chunk, so a large chunk here is expected
export default defineConfig({ plugins: [react()], base: "./", build: { chunkSizeWarningLimit: 1200 } });
