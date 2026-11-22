import type { NextConfig } from "next";

// Static export so the template can be hosted anywhere (GitHub Pages, Netlify, S3).
// BASE_PATH is set by the Pages workflow, e.g. "/vibe-templates/01-swiss-saas".
const config: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  images: { unoptimized: true },
};

export default config;
