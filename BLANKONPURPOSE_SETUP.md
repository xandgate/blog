# blankonpurpose.com — Vercel Setup

Same repo, second Vercel project. Takes 5 minutes.

## What was built

| File | What it does |
|------|-------------|
| `src/resources/content.blankonpurpose.tsx` | Personal blog content (no portfolio, no gallery) |
| `src/resources/once-ui.config.blankonpurpose.ts` | Violet/orange palette, stripped-down nav, blankonpurpose.com baseURL |
| `src/resources/index.ts` | Tenant router — reads `NEXT_PUBLIC_SITE_ID` at build time |
| `src/utils/utils.ts` | `getPostsDir()` — returns the right posts directory per tenant |
| `src/app/blog/posts.blankonpurpose/` | Blog posts for blankonpurpose.com |

## Create the Vercel project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the **same repo** (`xandgate/blog`) — Vercel lets you create multiple projects from one repo
3. Name it something like `blankonpurpose`
4. Framework: Next.js (auto-detected)

## Set the environment variable

In the new project: **Settings → Environment Variables**

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SITE_ID` | `blankonpurpose` |

This is the only difference between the two deployments. Everything else — the code, the components, the build pipeline — is identical.

## Add the domain

**Settings → Domains** → Add `blankonpurpose.com`

Add the DNS records Vercel shows at your registrar.

## Test locally

```bash
NEXT_PUBLIC_SITE_ID=blankonpurpose npm run dev
```

The site will load with the blankonpurpose content, violet palette, and only the blankonpurpose posts.

## Publishing posts

Add `.mdx` files to `src/app/blog/posts.blankonpurpose/`.

Standard frontmatter:
```yaml
---
title: "Your title"
subtitle: "Optional subtitle"
summary: "One sentence for SEO and previews"
image: "/images/blog/your-image.jpg"
publishedAt: "2026-02-25"
tag: "Thinking Out Loud"
---
```

Push to `main` → both Vercel projects redeploy automatically.

## Adding a third site later

1. `src/resources/content.<id>.tsx`
2. `src/resources/once-ui.config.<id>.ts`
3. `src/app/blog/posts.<id>/`
4. Add `isTHIRDSITE` condition in `src/resources/index.ts`
5. Add posts dir in `src/utils/utils.ts` `getPostsDir()`
6. New Vercel project with `NEXT_PUBLIC_SITE_ID=<id>`
