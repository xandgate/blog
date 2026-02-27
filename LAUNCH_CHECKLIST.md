# Launch checklist – personal blog (varunbaker.com)

Use this to get the site ready to publish and to reword copy for your personal brand.

---

## 1. Copy to reword (single source of truth)

All user-facing text lives in these places. Edit for your voice before going live.

### `src/resources/content.tsx`

| Section | What to edit |
|--------|---------------|
| **person** | `firstName`, `lastName`, `name`, `role`, `email`, `location`, `languages` |
| **newsletter** | `title`, `description` (value proposition) |
| **home** | `title`, `description`, `headline`, `subline`, `featured.title`, `featured.href` |
| **about** | `title`, `description`, `intro.title`, `intro.description`, work `experiences` (company, role, timeframe, achievements), `studies` (institutions), `technical.skills` (title, description, tags) |
| **blog** | `title`, `description` |
| **work** | `title`, `description` |
| **gallery** | `title`, `description`, image `alt` text |

### `src/resources/once-ui.config.ts`

| Item | What to edit |
|------|---------------|
| **baseURL** | Already `https://varunbaker.com` – confirm for production |
| **schema** | `name`, `description`, `email` (use same email as in content) |

### Homepage (`src/app/page.tsx`)

- **"Latest from the blog"** – line ~100 (heading above blog preview). Change if you want a different label (e.g. “Recent writing”, “From the blog”).

### Blog index (`src/app/blog/page.tsx`)

- **"Earlier posts"** – line ~42 (heading for older posts).

### Transparency notice (`src/components/TransparencyNotice.tsx`)

- **"This site shows different content based on your location."** – line ~68  
- **"Choose which version you'd like to see:"** – line ~71  
- Button labels: **"Government/Healthcare Focus"**, **"AI/Tech Focus"**, **"Keep auto-detected"** – lines ~75–81  

Align with AGENTS.md disclosure: *"This site adapts based on context as a demonstration of applied personalization."*

### Footer (`src/components/Footer.tsx`)

- **"Develop Digitally"** link – line ~29. Update href and/or text if this is your brand or remove if you prefer different attribution.

---

## 2. Images to add (you’re handling this)

- **Blog posts** – Add images under `public/images/blog/` and set `image` in each post’s frontmatter (e.g. `image: "/images/blog/your-post.jpg"`).
- **OG/home** – `home.image` in content is `/images/og/home.jpg`; ensure that file exists and looks good for social previews.
- **Avatar** – `person.avatar` is `/images/avatar.jpg`; ensure it’s in `public/images/`.

---

## 3. Publish on Vercel (your domain)

1. **Push to GitHub**  
   Blog repo: **https://github.com/xandgate/blog**

2. **Import in Vercel**  
   [vercel.com/new](https://vercel.com/new) → Import your repo → Deploy (Next.js is auto-detected).

3. **Add domain**  
   Project → **Settings → Domains** → Add `varunbaker.com` (and `www.varunbaker.com` if desired).  
   Add the DNS records Vercel shows at your registrar (A or CNAME).

4. **Env vars (optional)**  
   If you use protected routes or Mailchimp, set in **Settings → Environment Variables**:
   - `PAGE_ACCESS_PASSWORD` (for password-protected pages)
   - Mailchimp endpoint in `once-ui.config.ts` (or via env if you add that later)

5. **Deploy**  
   Every push to `main` deploys automatically.

---

## 4. Pre-launch checks

- [ ] All copy in **Section 1** reviewed and reworded
- [ ] `baseURL` in `once-ui.config.ts` is `https://varunbaker.com`
- [ ] Schema `email` in `once-ui.config.ts` matches the email you want publicly (e.g. same as `person.email` in content)
- [ ] OG image exists: `public/images/og/home.jpg`
- [ ] Avatar exists: `public/images/avatar.jpg`
- [ ] Blog post images added and frontmatter `image` set where desired
- [ ] Run `npm run build` locally – no errors
- [ ] Optional: set `NEXT_PUBLIC_SHOW_TRANSPARENCY_NOTICE=false` for production if you want to hide the notice at launch (you can enable later for experiments)

---

## 5. After launch

- Submit sitemap: `https://varunbaker.com/sitemap.xml`
- RSS: `https://varunbaker.com/api/rss`
- Consider adding analytics (e.g. Vercel Analytics or Plausible) and document in AGENTS.md if you want experiments to use it.

---

For **second blog / second domain** from the same codebase, see `MULTI_SITE_STRATEGY.md`.
