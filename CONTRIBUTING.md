# Contributing

Thanks for helping! This repo values **distinct** designs over many similar ones.

## Ways to help
- **Fix** a bug or accessibility issue in a template.
- **Translate** — add a language to a template's content file.
- **Add a template** — open a "Template proposal" issue first so we can check it doesn't overlap an existing style.

## Template checklist
- [ ] Own folder `templates/NN-short-name/`, runs on its own after copying.
- [ ] A style not used by any other template + one signature block.
- [ ] EN (default) + RU copy in one content file; `?lang=ru` works.
- [ ] Fonts with Cyrillic support; tokens at the top of the styles.
- [ ] No backend, no booking or payment flows, no tracking scripts.
- [ ] Keyboard and screen-reader friendly, `prefers-reduced-motion` respected.
- [ ] 360–1920 px layouts checked; no console errors.
- [ ] Entry in `templates.json`, `npm run docs` run, `preview.png` (1280×800) added.

## Commits & PRs
- Conventional commits: `feat(05-neon-festival): add stage filter`, `fix(02): caret position on mobile`.
- One template per PR. Include before/after screenshots for visual changes.

By contributing you agree your work is released under the MIT license.
