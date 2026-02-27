# Multi-site strategy: same codebase, two domains

This doc outlines how to run **two different blogs** (different content and personalization) on **two domains** from this single repo, without implementing it yet.

---

## Goal

- **Site A:** Your personal brand (e.g. varunbaker.com) – current content, current personalization.
- **Site B:** Different blog (different theme, content, possibly different personalization) on another domain.
- **Shared:** Same Next.js app, same components, same magic-portfolio base. Only content, config, and optionally feature flags differ per deployment.

---

## Approach: tenant per deployment (recommended)

Use a **single codebase**, and choose tenant at **build time** via environment variables. Each Vercel project = one site.

### How it works

1. **Tenant identifier**  
   e.g. `NEXT_PUBLIC_SITE_ID=varunbaker` or `otherblog`. Set in Vercel per project.

2. **Content and config per tenant**  
   - **Option A (simple):** Multiple entry points in code, e.g.  
     `src/resources/content.varunbaker.tsx` and `src/resources/content.otherblog.tsx`, and `src/resources/index.ts` does:
     ```ts
     const siteId = process.env.NEXT_PUBLIC_SITE_ID || "varunbaker";
     export * from `./content.${siteId}`;
     ```
     Same for config (baseURL, schema, routes, etc.) if you split it.
   - **Option B (scalable):** Content and config live in JSON/MDX in a folder like `content/varunbaker/` and `content/otherblog/`, and the app reads based on `NEXT_PUBLIC_SITE_ID`. No code change when adding copy or new posts per site.

3. **baseURL and SEO**  
   Each tenant has its own `baseURL` (and schema name, description, etc.) in config, so meta tags, sitemap, RSS, and OG are correct per domain.

4. **Personalization**  
   - Keep feature flags and personalization logic in code.
   - Per-tenant behavior via env: e.g. `NEXT_PUBLIC_SITE_ID=otherblog` and in code, if `siteId === "otherblog"` then disable avatar experiment or use different copy. No need for a second codebase.

5. **Deployment**  
   - **Vercel project 1:** Repo + branch, domain varunbaker.com, env `NEXT_PUBLIC_SITE_ID=varunbaker`, `BASE_URL=https://varunbaker.com`.
   - **Vercel project 2:** Same repo (same or different branch), domain otherblog.com, env `NEXT_PUBLIC_SITE_ID=otherblog`, `BASE_URL=https://otherblog.com`.

Same repo, two projects, two domains, two “sites.”

---

## What to change in code (when you implement)

- Add `NEXT_PUBLIC_SITE_ID` and optionally `BASE_URL` to `.env.example`.
- Load content and config by tenant (dynamic import or JSON per `NEXT_PUBLIC_SITE_ID`).
- Ensure `baseURL` (and schema, etc.) always come from config that is tenant-specific (env or tenant config).
- Use tenant in feature flags or personalization only where you want different behavior per site (e.g. different default for transparency notice).

No need to change routing or layout structure; only the **data** (content + config) and **optional** behavior differ per tenant.

---

## Alternative: monorepo with two apps

- **apps/varunbaker** and **apps/otherblog** (or **apps/site-a** and **apps/site-b**), with a **packages/site-core** (or shared package) for layout, components, and personalization.
- Each app has its own `content` and config; shared code is in the package.
- **Pros:** Strong separation, different Next.js/React versions per app if ever needed.  
- **Cons:** More structure, two app folders to maintain, reusing magic-portfolio updates requires merging into both or into the shared package.

Recommendation: start with **tenant per deployment**; move to monorepo only if you need different dependencies or build steps per site.

---

## Staying up to date with magic-portfolio upstream

You mentioned a separate branch to redo your customization on the latest upstream. When you’re ready:

1. Add upstream: `git remote add upstream https://github.com/once-ui-system/magic-portfolio.git` (if not already).
2. Branch for “sync”: e.g. `sync-upstream`. Periodically:  
   `git fetch upstream` → merge or rebase `upstream/main` into `sync-upstream`.
3. Re-apply your customizations on top of the updated code (personalization, content, config, transparency notice, etc.) and keep them in a small set of files (content, config, and a few components) so future syncs are easier.
4. Keep `main` as your stable “personal blog” branch; use `sync-upstream` for testing and then merge into `main` when happy.

This is independent of the multi-site strategy: tenant-based config and content work the same after an upstream sync.

---

## Summary

| Topic | Recommendation |
|-------|----------------|
| Two blogs, two domains | Same repo; tenant per Vercel project via `NEXT_PUBLIC_SITE_ID` and tenant-specific content/config. |
| Content per site | Per-tenant content files or JSON (e.g. `content/varunbaker/`, `content/otherblog/`) loaded at build time. |
| baseURL / SEO | From tenant config (or env) so each deployment has correct domain and schema. |
| Upstream sync | Separate branch (e.g. `sync-upstream`) to merge upstream and re-apply customizations; keep customizations localized. |

Implement when you’re ready to launch the second blog; until then, focus on making the first site (varunbaker.com) stellar.
