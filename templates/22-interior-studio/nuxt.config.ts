// Static site: `npm run build` runs `nuxt generate` and copies .output/public to ./dist.
// BASE_PATH is set by the GitHub Pages workflow (e.g. "/vibe-templates/22-interior-studio").
const base = process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : "/";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-01",
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  app: {
    baseURL: base,
    head: {
      htmlAttrs: { lang: "en" },
      title: "Atelier Hira — interiors from material up",
      meta: [
        { name: "description", content: "Interior studio template styled as an architect's material sample board: a room elevation re-skinned by material schemes. Nuxt + Vue." },
        { name: "theme-color", content: "#d9d7d2" },
      ],
      link: [
        { rel: "icon", href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23d9d7d2'/%3E%3Crect x='5' y='5' width='10' height='10' fill='%23b88a5a'/%3E%3Crect x='17' y='5' width='10' height='10' fill='%23e8e2d4'/%3E%3Crect x='5' y='17' width='10' height='10' fill='%238a8f86'/%3E%3Crect x='17' y='17' width='10' height='10' fill='%23c9a44a'/%3E%3C/svg%3E" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=PT+Mono&family=Ysabeau:ital,wght@0,300;0,500;0,700;1,300&display=swap" },
      ],
    },
  },
});
