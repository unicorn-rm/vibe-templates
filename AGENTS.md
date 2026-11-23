# AGENTS.md — vibe-templates

Rules for AI coding agents working anywhere in this repository.

## Layout
- Each template is a self-contained folder in `templates/NN-name/` with its own `AGENTS.md` and `DESIGN.md`. **Read both before touching a template.**
- `templates.json` is the catalog. Template READMEs, DESIGN.md and AGENTS.md are generated from it by `npm run docs` — edit the JSON, not the generated files.

## Adding a template
1. Pick a style that no existing template uses (palette, font pair, graphic language, signature block). Start from a **real-world reference** (a printed object, signage system, document type, product) — not from "dark background + neon accent", glassmorphism, gradient blobs or "cream + serif + terracotta". Those read as AI defaults and are rejected.
2. Fonts must support Cyrillic (check Google Fonts "Language: Cyrillic").
3. All copy lives in one content file with `en` and `ru`. English is default; support `?lang=ru` and a toggle; remember choice in `localStorage` under `vt-lang` (wrap storage in try/catch).
4. Tokens (colors, fonts, radii) at the top of the styles.
5. Static only: no backend, no booking/payment flows, no trackers.
6. Accessibility: semantic landmarks, visible focus, alt text, `prefers-reduced-motion`, body contrast ≥ 4.5:1.
7. Builds must be relative-path friendly (Vite `base: "./"`, Next `output: "export"` + `BASE_PATH`).
8. Add an entry to `templates.json`, run `npm run docs`, add a 1280×800 `preview.png`.

## Don't
- Don't share code between templates — copying a folder must be enough.
- Don't add `Co-Authored-By` or tool signatures to commits.
