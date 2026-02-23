# Publishing Guide for magic-portfolio

## Domain Strategy

### Should you use varunbaker.com?

**Yes, keep it.** Here's why:

**Pros of personal domain:**
- Professional credibility — recruiters and clients expect it
- You own your content forever — no platform risk
- SEO builds over time under your name
- LinkedIn, GitHub, resume all point to one canonical source
- GovTech/enterprise clients specifically value personal brands over anonymous blogs

**Cons (minor):**
- If you pivot careers dramatically, the content follows you
- Some people prefer topical domains (e.g., govtech.dev)

**Verdict:** For a 20-year professional building thought leadership, `varunbaker.com` is the right call. It's what clients and recruiters will search for.

**Alternative structure if you want segmentation:**
- `varunbaker.com` — main site (portfolio, about)
- `varunbaker.com/blog` — all content (with tag filtering)
- Or subdomain: `blog.varunbaker.com` (adds complexity, not recommended)

---

## Easiest Publishing Options

### Option 1: Vercel (Recommended) ⭐

**Why:** magic-portfolio is a Next.js app. Vercel made Next.js. Zero-config deployment.

**Setup time:** 5 minutes

**Steps:**
1. Push your repo to GitHub (if not already)
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Import your `magic-portfolio` repository
4. Vercel auto-detects Next.js and configures everything
5. Add your custom domain (`varunbaker.com`)
6. Done. Every push to `main` auto-deploys.

**Cost:** Free tier covers most personal sites. Paid ($20/mo) if you need analytics or team features.

**Editing workflow:**
- Edit MDX files locally → commit → push → live in ~60 seconds

---

### Option 2: Netlify

**Why:** Similar to Vercel, good alternative if you prefer it.

**Setup time:** 10 minutes

**Steps:**
1. Push to GitHub
2. Sign up at [netlify.com](https://netlify.com)
3. "Add new site" → Import from GitHub
4. Build command: `npm run build`
5. Publish directory: `.next` (or `out` if using static export)
6. Add custom domain

**Cost:** Free tier is generous.

---

### Option 3: GitHub Pages (More Manual)

**Why:** Free, simple, GitHub-native.

**Caveats:** Requires static export (no server-side features). More setup.

**Steps:**
1. Add to `next.config.mjs`:
   ```js
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   };
   ```
2. Build: `npm run build`
3. Deploy the `out` folder to GitHub Pages
4. Add custom domain in repo settings

**Cost:** Free forever.

---

## CI/CD Pipeline with GitHub Actions

### Recommended: Vercel (Automatic)

If you use Vercel, CI/CD is automatic. No GitHub Actions needed:
- Push to `main` → Production deploy
- Push to feature branch → Preview deploy with unique URL

### Alternative: GitHub Actions + GitHub Pages

If you want full control, here's a complete workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_BASE_URL: https://varunbaker.com

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Alternative: GitHub Actions + Vercel

For more control while still using Vercel:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Recommended Setup (5 Minutes)

### Step 1: Push to GitHub

```bash
cd /Users/varunbaker/dev/magic-portfolio
git remote add origin https://github.com/varunity/magic-portfolio.git  # or your repo URL
git push -u origin main
```

### Step 2: Connect Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click "Deploy" (defaults are fine for Next.js)

### Step 3: Add Custom Domain

1. In Vercel dashboard → your project → Settings → Domains
2. Add `varunbaker.com`
3. Vercel gives you DNS records to add
4. Update your domain registrar's DNS:
   - A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`
5. Wait 5-10 minutes for DNS propagation

### Step 4: You're Live

Every time you:
```bash
git add .
git commit -m "New blog post"
git push
```

Your site updates automatically in ~60 seconds.

---

## Content Workflow

### Adding a new blog post:

1. Create file: `src/app/blog/posts/your-post-title.mdx`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   subtitle: "Optional subtitle"
   summary: "1-2 sentence summary for cards and SEO"
   image: "/images/blog/your-image.jpg"
   publishedAt: "2025-02-01"
   tag: "AI Engineering"  # or "GovTech"
   ---
   ```
3. Write your content in MDX (Markdown + JSX)
4. Add image to `public/images/blog/`
5. Commit and push
6. Live in 60 seconds

### Editing existing posts:

1. Edit the MDX file
2. Commit and push
3. Done

---

## Environment Variables

If you need them (for features like analytics, contact forms):

**Vercel:**
- Project Settings → Environment Variables
- Add your keys (e.g., `MAILCHIMP_API_KEY`)

**Local development:**
- Copy `.env.example` to `.env.local`
- Add your keys

---

## Summary

| Option | Setup Time | Cost | Complexity | Recommended? |
|--------|-----------|------|------------|--------------|
| Vercel | 5 min | Free | Low | ⭐ Yes |
| Netlify | 10 min | Free | Low | Good alternative |
| GitHub Pages | 30 min | Free | Medium | If you want DIY |

**My recommendation:** Use Vercel. It's free, fast, and zero-config for Next.js. You'll be live in 5 minutes.
