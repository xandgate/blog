# Personalization

This doc describes how the site adapts to visitors and how to test it.

## Model

- **One segment dimension:** US vs non-US (no city/region or avatar variants).
- **US visitors** → **GovTech / enterprise focus**: messaging and featured content emphasize Drupal, government platforms, Section 508, and federal/state experience.
- **Non-US visitors** → **Agentic / international focus**: messaging and featured content emphasize AI-enabled architecture, modern tooling, and agentic development.

Headline and subline are **the same for everyone**: *"Systems Shape Behavior."* and *"Architected to adapt. Built to endure. Designed to be understood."* They are set in `src/resources/content.tsx` (`home.headline`, `home.subline`) and are not personalized.

The **avatar** is a single image for all visitors (no location-based variants).

## What is personalized

| What | US (govtech) | Non-US (international) |
|------|----------------|------------------------|
| **Featured badge** | Links to govtech-oriented post (e.g. *Why Drupal dominates government*) | Links to agentic-oriented post (e.g. *Context graphs for AI agents*) |
| **Content prominence** | Project/blog order can favor govtech content when experiment is on | Project/blog order can favor agentic content when experiment is on |
| **Contextual message / greeting** | Gov/Drupal messaging | AI-enabled architect messaging |
| **Blog page heading** | "Writing about Drupal, government platforms, and enterprise delivery" (+ govtech description) | "Writing about AI-augmented engineering and building at 100x speed" (+ agentic description) |
| **Blog post listings** | Posts with tag "AI Engineering" are **hidden** (on /blog and on home "Latest from the blog") | All posts shown |

Headline, subline, and avatar do **not** change by segment.

## How segment is determined

1. **Geo:** `countryCode === "US"` → segment **govtech**; otherwise **international**.
2. **Optional override:** URL query `?segment=govtech` or `?segment=ai-enabled` (and optionally `?segment=general`) overrides geo. The choice can be stored in `localStorage` so it persists across pages.

Geo is read from request headers in the API route `GET /api/visitor-context` (Vercel `x-vercel-ip-country`, Cloudflare `cf-ipcountry`, or in dev from a mock or test header).

## Key files

- **Copy:** `src/resources/content.tsx` — `home.headline`, `home.subline`
- **Segment logic:** `src/lib/geo/detect.ts` — `determineSegment(geo)` (US → govtech, else → international)
- **Geo detection (server):** `src/lib/geo/detect-server.ts` — `detectGeoLocation()`; supports `x-test-country` for testing
- **Affinity (messaging, featured content):** `src/lib/geo/affinity.ts` — `buildAffinityProfile(geo)`, `buildAffinityFromSegmentOverride(segment)`
- **API:** `src/app/api/visitor-context/route.ts` — returns `{ geo, segment, affinity }`
- **Provider:** `src/components/VisitorContextProvider.tsx` — fetches or uses initial context, applies URL override and opt-out
- **Home hero:** `src/components/PersonalizedHeadline.tsx`, `PersonalizedSubline.tsx` — render static fallback from content
- **Featured badge:** `src/components/PersonalizedFeaturedBadge.tsx` — uses `affinity.featuredContent` (segment-based)
- **Avatar:** `src/components/PersonalizedAvatar.tsx` — always shows `person.avatar` (no segment)

## Testing

### 1. US vs non-US in development (no real geo headers)

In dev, the app falls back to mock geo. You can force segment in two ways.

**Option A: Change the mock in code**

Edit `src/lib/geo/detect-server.ts` and set `DEV_MOCK_GEO.countryCode`:

- `"US"` → govtech (e.g. featured badge points to govtech post)
- `"GB"` (or any non-US) → international (featured badge points to agentic post)

Restart the dev server and reload the home page. Check the **Featured work** badge link and, if visible, any segment indicator or contextual message.

**Option B: Use the test header**

Call the API with a header so the server uses that country instead of the mock:

```bash
# US → govtech
curl -s http://localhost:3000/api/visitor-context -H "x-test-country: US" | jq .segment
# "govtech"

# Non-US → international
curl -s http://localhost:3000/api/visitor-context -H "x-test-country: GB" | jq .segment
# "international"
```

In the browser you cannot set arbitrary request headers for the page load. So for **page** testing in dev, use Option A (change mock and restart) or Option C.

### 2. URL override (any environment)

You can force segment without changing code or headers:

- **GovTech focus:** open the site with `?segment=govtech` (e.g. `http://localhost:3000/?segment=govtech`).
- **Agentic focus:** open with `?segment=ai-enabled` (e.g. `http://localhost:3000/?segment=ai-enabled`).

The choice is stored in `localStorage` under `segment_override`, so it can persist until you clear it or use another override. Reload and navigate around; the featured badge and any segment-dependent content should match the chosen focus.

### 3. Headline and subline

Headline and subline are **not** personalized. You should always see:

- **Headline:** *Systems Shape Behavior.*
- **Subline:** *Architected to adapt. Built to endure. Designed to be understood.*

If you see different copy, check that `home.headline` and `home.subline` in `src/resources/content.tsx` are correct and that the home page uses `PersonalizedHeadline` and `PersonalizedSubline` with those as fallbacks.

### 4. Avatar

A single avatar is used for everyone. There are no segment-based avatar variants.

### 5. Opt-out

If the site has a “View default experience” or similar opt-out, it sets `personalization_opt_out` in `localStorage`. When opted out, the app uses a default context (e.g. govtech) and does not send geo to the API for segment. You can clear that key to re-enable personalization.

### 6. Production

On Vercel/Cloudflare, geo comes from the platform’s request headers. To test “international” in production you can use a VPN or a browser in another country, or keep using `?segment=ai-enabled` as an override.

## Summary

| Goal | How |
|------|-----|
| See US (govtech) experience in dev | Set `DEV_MOCK_GEO.countryCode = "US"` in `detect-server.ts` and restart, or open `?segment=govtech`. |
| See non-US (international) experience in dev | Set `DEV_MOCK_GEO.countryCode = "GB"` in `detect-server.ts` and restart, or open `?segment=ai-enabled`. |
| Verify headline/subline | Open home; expect *Systems Shape Behavior.* and *Architected to adapt. Built to endure. Designed to be understood.* |
| Verify featured badge changes by segment | Toggle segment (mock or `?segment=`) and check the Featured work link. |
| Test API segment directly | `curl -H "x-test-country: US" http://localhost:3000/api/visitor-context` and same with `GB`. |
