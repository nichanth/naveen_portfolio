# Naveen Prasath — QA Campaign Portfolio

A static, animated game-HUD portfolio. **No build step** — pure HTML/CSS/JS that
runs straight from this folder.

## Files
- `index.html` — entry point
- `styles.css` — theme + palette system
- `*.jsx` — React components (transpiled in-browser by Babel, loaded from CDN)
- `fx.js`, `three-hero.js` — scroll/mouse graphics + hero animation
- `resume-data.js` — the résumé PDF embedded for reliable download
- `controller.png`, `Naveen_Prasath_Resume.pdf` — assets
- `vercel.json` — static-host config (correct content types + clean URLs)

---

## Deploy to Vercel

### Option A — Dashboard (no tools, easiest)
1. Go to **https://vercel.com/new**
2. Choose **"Deploy"** → you can **drag-and-drop this whole `deploy` folder**
   onto the page (or click "Browse" and select it).
3. When asked for a **Framework Preset**, pick **"Other"** (it's a static site —
   no build command, no output directory needed).
4. Click **Deploy**. Done — you'll get a live `*.vercel.app` URL in ~20 seconds.

### Option B — Vercel CLI
```bash
npm i -g vercel        # one-time install
cd deploy              # this folder
vercel                 # follow prompts (first run links/creates the project)
vercel --prod          # promote to your production URL
```
When prompted:
- "In which directory is your code located?" → `./`
- "Want to override the settings?" → **No** (it's static)

### Option C — GitHub + Vercel (auto-deploy on push)
1. Create a new GitHub repo and push the **contents of this `deploy` folder**
   to the repo root.
2. In Vercel: **Add New → Project → Import** that repo.
3. Framework Preset: **Other**. Leave build/output empty. **Deploy**.
4. Every future `git push` re-deploys automatically.

---

## Notes
- The site needs an internet connection on first load (React + Babel + fonts
  come from CDNs). Everything else is local to this folder.
- The résumé download works fully offline once the page has loaded (it's embedded).
- Custom domain: add it under **Project → Settings → Domains** in Vercel.
