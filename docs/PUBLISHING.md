# Publishing checklist (maintainer)

Run these once from the repo root. Nothing here is automated on purpose.

## 1. Create the GitHub repo and push

```bash
gh repo create unicorn-rm/vibe-templates --public --source=. --remote=origin --description "24 free, open-source website templates built to be remixed by AI — HTML, React, Next.js, Tailwind, Astro, Vue, Nuxt, Svelte, Three.js. EN + RU." --homepage "https://unicorn-rm.github.io/vibe-templates/"
git push -u origin main
```

## 2. Topics (max 20)

```bash
gh repo edit unicorn-rm/vibe-templates --add-topic website-templates,landing-page,free-templates,html-css,react,nextjs,tailwindcss,astro,vue,nuxt,svelte,threejs,ai-ready,vibe-coding,design-system,portfolio-template,web-design,frontend,open-source,bilingual
```

## 3. GitHub Pages

Settings → Pages → **Source: GitHub Actions**. The `Deploy gallery to GitHub Pages` workflow builds every template on each push to `main` (Node 24).

```bash
gh api -X POST repos/unicorn-rm/vibe-templates/pages -f build_type=workflow
```

## 4. Social preview

Replace `.github/assets/banner.png` (README) and `gallery/banner.png` (Open Graph) with the mascot banner, 1280×640. Upload the same image in Settings → General → Social preview.

## 5. Nice to have

- Enable Discussions (the issue template links to them): `gh repo edit unicorn-rm/vibe-templates --enable-discussions`
- Pin the repo on your profile.
- Create a release `v1.0.0` with the CHANGELOG section as notes: `gh release create v1.0.0 --title "v1.0.0 — 24 templates" --notes-file CHANGELOG.md`
