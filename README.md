# Ajanta Luhana — Portfolio

Static site (HTML + CSS + JS, Three.js from CDN). Works on GitHub Pages.

## Files
- `index.html` — 3D front page (hero, journey, contact)
- `index.html.html` — full portfolio (about, projects, experience, reviews, credentials…)
- `assets/css/theme.css` — shared neon/HUD theme (both pages)
- `assets/css/sections.css` — Albion case study, reviews, details popup
- `assets/js/extra-data.js` — **edit here**: Albion case study, per-project details, reviews
- `assets/js/portfolio.js` — rendering and interactions for the full portfolio
- `assets/videos/` — demo clips (`albion-hr.mp4` + poster added)
- `Ajanta_Luhana_Resume.pdf`

Main profile data (projects, experience, skills, certificates) is still the `window.PORTFOLIO` block inside `index.html.html`.

## Adding real names to reviews
In `assets/js/extra-data.js`, add `name`, `role` and optionally `url` to any review, e.g.
`{ g: "ai", title: "...", text: "...", name: "Jane Doe", role: "CTO, Acme", url: "https://linkedin.com/in/..." }`

## Deploy
Copy everything into the repo root, commit, push. GitHub → Settings → Pages → Deploy from branch `main` / root.
