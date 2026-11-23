import { defineConfig } from "vite";

// three.js is loaded lazily in its own chunk
export default defineConfig({ base: "./", build: { chunkSizeWarningLimit: 800 } });
