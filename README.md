# Personal Portfolio — GitHub Pages Template

A responsive, accessible, data-analytics-focused personal portfolio built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools — commit and go live.

---

## File Structure

```
portfolio/                          ← Root of your GitHub repository
│
├── index.html                      ← Main page (all sections)
│
├── css/
│   ├── base.css                    ← CSS reset & accessible defaults
│   ├── tokens.css                  ← Design tokens (type, spacing, color, dark mode)
│   └── styles.css                  ← Component & layout styles
│
├── js/
│   └── main.js                     ← Dark mode, nav, scroll reveal, filtering, form
│
├── assets/
│   ├── img/
│   │   └── avatar.jpg              ← Your headshot (replace this file)
│   └── resume/
│       └── resume.pdf              ← Your resume PDF (replace this file)
│
└── README.md                       ← This file
```

---

## Quick Customization Checklist

Open `index.html` and replace every instance of:

| Placeholder              | Replace With                          |
|--------------------------|---------------------------------------|
| `Ari DeAundre Jones`            | Your full name                        |
| `you@example.com`        | Your email address                    |
| `aridjones1`           | Your GitHub username                  |
| `aridjones1`            | Your LinkedIn profile slug            |
| `YOUR_FORM_ID`           | Your Formspree form ID (see below)    |
| Project card GitHub URLs | Links to your actual repos            |
| Project card titles/desc | Your real project descriptions        |
| Skill percentages        | Your actual proficiency levels        |
| Avatar / resume files    | Your photo and PDF resume             |

---

## Contact Form Setup (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — copy the endpoint URL (looks like `https://formspree.io/f/abcdefgh`).
3. In `js/main.js`, replace `YOUR_FORM_ID` with your endpoint:
   ```js
   const FORMSPREE_URL = 'https://formspree.io/f/abcdefgh';
   ```
4. Formspree will send submissions to your email. Free tier: 50 submissions/month.

---

## GitHub Pages Deployment — Step-by-Step

### Step 1 — Create the Repository

1. Log in to [github.com](https://github.com).
2. Click the **+** icon → **New repository**.
3. **Repository name:** For your user site, use `aridjones1.github.io` exactly (replace `aridjones1` with your GitHub handle). This gives you the URL `https://aridjones1.github.io`.
4. Set visibility to **Public** (required for free GitHub Pages).
5. Do **not** initialize with a README (you already have one).
6. Click **Create repository**.

### Step 2 — Push Your Files

Option A — GitHub Desktop (easiest):
1. Open GitHub Desktop → **Add an Existing Repository from your Hard Drive**.
2. Select your `portfolio/` folder.
3. Click **Publish repository** and match the repository name from Step 1.

Option B — Git CLI:
```bash
# Inside your portfolio/ folder
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/aridjones1/aridjones1.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository on GitHub, click the **Settings** tab.
2. In the left sidebar, scroll to **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`.
5. Click **Save**.

### Step 4 — Wait for Deployment

1. GitHub will show a yellow spinner → then a green checkmark with your live URL.
2. Deployment usually takes **1–3 minutes** on first run.
3. Your site is live at: `https://aridjones1.github.io`

### Step 5 — Verify the Live Site

- [ ] Home page loads with correct name and content
- [ ] Dark mode toggle works
- [ ] Navigation links scroll smoothly to each section
- [ ] Project filter tabs show/hide cards correctly
- [ ] Resume PDF downloads when clicking the Download button
- [ ] Contact links (email, LinkedIn, GitHub) open correctly
- [ ] Site is mobile-responsive (test at 375px width)
- [ ] Open Graph preview shows correctly (test at [opengraph.xyz](https://www.opengraph.xyz))

### Step 6 — Custom Domain (Optional)

If you own a domain (e.g. `yourname.com`):
1. In **Settings → Pages**, enter your domain under **Custom domain**.
2. At your DNS provider, add a CNAME record pointing to `aridjones1.github.io`.
3. Check **Enforce HTTPS** once DNS propagates (~24 hours).

---

## Updating Your Portfolio

Every time you update files locally and push to `main`, GitHub Pages automatically redeploys within 1–3 minutes:

```bash
git add .
git commit -m "Add new project: my-new-project"
git push
```

Monitor deploys at: `https://github.com/aridjones1/aridjones1.github.io/actions`

---

## Technologies Used

- **HTML5** — Semantic markup with ARIA roles and attributes
- **CSS3** — Custom properties, CSS Grid, `clamp()` fluid type, dark mode
- **Vanilla JavaScript** — IntersectionObserver, Fetch API, no dependencies
- **Google Fonts** — DM Serif Display + DM Sans (loaded via CDN)
- **Formspree** — Serverless contact form backend
- **GitHub Pages** — Free static hosting with HTTPS

---

## Performance Notes

- Zero JavaScript frameworks — instant parse time
- Fonts preconnected via `<link rel="preconnect">`
- Images use `loading="lazy"` for below-fold assets
- CSS transitions respect `prefers-reduced-motion`
- Total page weight (without your images): ~50KB
