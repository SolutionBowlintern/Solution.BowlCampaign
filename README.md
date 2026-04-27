# SolutionBowl AI Landing Page

This repository contains the code and assets for the **SolutionBowl AI Landing Page** — a modern, responsive single-page website built for hosting on **GitHub Pages**.

## Live Demo

Once deployed, your site will be available at:
```
https://<your-username>.github.io/<repo-name>/
```

## Project Overview

SolutionBowl is a mobile app development agency targeting startups. The core offering is building scalable iOS and Android applications, with a unique value proposition: **Free UI/UX Design Suite ($5,000+ value) for new projects.**

### Key Sections
- **Hero** — High-converting headline with interactive CSS phone mockups
- **Problem / Solution** — Streamlined approach vs. traditional fragmented development
- **Process** — 5-step workflow from brief to launch
- **Benefits** — Six key value propositions
- **Case Studies** — Real project showcases (Qahwa, FieldForce, ModulERP)
- **Testimonials** — Client feedback
- **FAQ** — Common questions with accordion toggle
- **Lead Generation Form** — Formspree-powered brief submission

## File Structure

```
solutionbowl-v1/
├── index.html                  # Main landing page (entry point)
├── assets/
│   ├── css/
│   │   └── style.css           # All styles (extracted from inline)
│   ├── js/
│   │   └── main.js             # All scripts (extracted from inline)
│   └── solution-bowls-logo.png # Brand logo
├── .gitignore                  # Excludes dev-only files
├── .nojekyll                   # Disables Jekyll on GitHub Pages
└── README.md                   # This file
```

## Technical Details

- **Stack:** Vanilla HTML5, CSS3, JavaScript — no build step required
- **Styling:** CSS custom properties (`:root`), Flexbox, CSS Grid, glassmorphism (`backdrop-filter`), responsive media queries
- **Typography:** Google Fonts — **Geist** (body) and **Fraunces** (serif headings)
- **Animations:** [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) for scroll-based reveal animations
- **Icons:** [Devicon](https://devicon.dev/) for technology stack icons
- **Form Backend:** [Formspree](https://formspree.io/) — works on static hosts, no server needed

## Deploy to GitHub Pages

### Option 1: Quick Deploy (from `main` branch)

1. **Create a GitHub repository** and push this code:
   ```bash
   cd solutionbowl-v1
   git init
   git add .
   git commit -m "Initial commit — SolutionBowl landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

### Option 2: Custom Domain

1. Complete Option 1 first
2. In **Settings → Pages → Custom domain**, enter your domain (e.g. `solutionbowl.ai`)
3. Add a `CNAME` file to the repo root containing your domain:
   ```
   solutionbowl.ai
   ```
4. Configure your DNS provider:
   - **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME record** pointing to `<your-username>.github.io`

## Local Development

No build tools needed. Just open `index.html` in a browser, or use any local server:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

## Form Submissions

The contact form uses **Formspree** (`https://formspree.io/f/xgordvap`). Submissions are sent directly from the browser — no backend server required. To use your own Formspree endpoint, update the `FORMSPREE_URL` variable in `assets/js/main.js`.
