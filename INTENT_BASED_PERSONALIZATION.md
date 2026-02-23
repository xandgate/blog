# Intent-Based Personalization Guide

## Overview

This system personalizes content based on visitor intent (e.g., "frontend developer" vs "Drupal developer") using **privacy-friendly, first-party methods only**. No third-party tracking, no cookies sent to external servers—everything stays on the user's device.

## How It Works

### 1. **Explicit Intent (URL Parameters)** ⭐ Recommended

Send visitors specific links with their interest:

```
https://yoursite.com?interest=frontend
https://yoursite.com?interest=drupal
```

**Use Cases:**
- Share different links on social media (e.g., "Looking for a frontend developer? Check this out: [link]")
- Email campaigns targeting specific audiences
- Conference/event landing pages
- Job board postings

**Example:**
- Post on LinkedIn: "Looking for a Drupal architect? See my work: [link]?interest=drupal"
- Post on Twitter: "Building modern UIs with Svelte and React: [link]?interest=frontend"

### 2. **Implicit Intent (Auto-Detection)**

The system automatically detects intent from:

#### A. **Referrer Analysis**
If visitor comes from:
- `drupal.org`, `drupalcon.org`, `drupalcamp.org` → Detected as `drupal` interest
- `reactjs.org`, `svelte.dev`, `nextjs.org` → Detected as `frontend` interest

#### B. **Search Terms**
If visitor arrives via search with:
- "Drupal developer", "Drupal architect" → Detected as `drupal` interest
- "React developer", "frontend engineer" → Detected as `frontend` interest

#### C. **Behavior Tracking** (LocalStorage)
As users interact with content:
- Clicks on Drupal-related projects → Interest inferred
- Time spent on frontend posts → Interest inferred
- After 3+ interactions, preference is stored for future visits

**Privacy Note:** All behavior tracking is stored in `localStorage` (user's device only). No data sent to servers.

## Content Mapping

### Current Featured Content

| Interest | Featured Content |
|----------|------------------|
| `frontend` | `/work/building-once-ui-a-customizable-design-system` |
| `drupal` | `/work/building-once-ui-a-customizable-design-system` (update when you have Drupal projects) |
| `general` | `/work/building-once-ui-a-customizable-design-system` |

### How to Add More Content

Edit `src/lib/geo/affinity.ts`:

```typescript
const FEATURED_CONTENT_BY_INTEREST: Record<ContentInterest, string> = {
  frontend: "/work/your-frontend-project",
  drupal: "/work/your-drupal-project",
  general: "/work/default-project",
};
```

## Testing

### Test Explicit Intent
```
http://localhost:3000?interest=frontend
http://localhost:3000?interest=drupal
```

### Test Implicit Intent (Referrer)
1. Open browser console
2. Navigate to: `http://localhost:3000`
3. In console, simulate referrer:
   ```javascript
   // This is just for understanding - actual referrer comes from browser
   // To test, you'd need to visit from an actual Drupal site
   ```

### Test Behavior Tracking
1. Visit several frontend-related projects
2. Check `localStorage.getItem("content_interest")` in console
3. After 3+ interactions, interest should be inferred

### View in GeoDebugPanel
- Click "🌍 Geo Debug" button (bottom-right)
- Look for "Content Interest" badge
- Shows detected interest: `frontend`, `drupal`, or not shown if `general`

## Privacy & Ethics

✅ **What We Do:**
- First-party data only (user's browser)
- localStorage (no server tracking)
- Transparent (visible in GeoDebugPanel)
- Opt-out available (via TransparencyNotice)
- No third-party cookies
- No external analytics

❌ **What We Don't Do:**
- Send data to external servers
- Use third-party tracking pixels
- Share data with advertisers
- Track across domains
- Fingerprint users

## Implementation Details

### Files

- `src/lib/intent/detect.ts` - Intent detection logic
- `src/lib/geo/affinity.ts` - Content mapping and affinity profiles
- `src/components/ContentInteractionTracker.tsx` - Tracks page visits
- `src/components/VisitorContextProvider.tsx` - Merges intent into context
- `src/proxy.ts` - Handles `?interest=` URL parameter

### Detection Priority

1. **URL Parameter** (`?interest=frontend`) - Highest priority
2. **Referrer** (drupal.org, reactjs.org, etc.)
3. **Search Terms** (from Google/Bing search queries)
4. **Stored Interest** (from previous visits/behavior)
5. **Default** (no personalization)

### Storing Interest

Interest is stored in `localStorage`:
- Key: `content_interest` (value: `"frontend"` or `"drupal"`)
- Key: `content_interest_updated` (timestamp)
- Key: `content_interactions` (array of recent interactions)

Users can clear this by:
- Clearing browser localStorage
- Using browser's "Clear site data" feature
- Opting out via TransparencyNotice

## Use Cases

### 1. Social Media Posts

**Frontend-focused:**
```
"Building modern UIs with Svelte and React. Check out my latest project: 
https://yoursite.com?interest=frontend"
```

**Drupal-focused:**
```
"15+ years building enterprise Drupal platforms. See my work: 
https://yoursite.com?interest=drupal"
```

### 2. Email Campaigns

Segment your email list:
- Frontend developers → Link with `?interest=frontend`
- Drupal developers → Link with `?interest=drupal`

### 3. Conference/Event Landing Pages

Create specific landing pages:
- DrupalCon → `?interest=drupal`
- React Summit → `?interest=frontend`

### 4. Job Board Postings

When posting jobs:
- Frontend role → `?interest=frontend`
- Drupal role → `?interest=drupal`

## Future Enhancements

Potential additions (all privacy-friendly):

1. **Time-based Interest** - Weight recent interactions more heavily
2. **Content Tags** - Auto-detect from post metadata/tags
3. **Scroll Depth** - Track how much of content is read
4. **Return Visits** - Remember interest across sessions
5. **Interest Combinations** - Support multiple interests (e.g., "frontend + drupal")

## Troubleshooting

### Interest Not Detected

1. **Check GeoDebugPanel** - Look for "Content Interest" badge
2. **Check Console** - Run `localStorage.getItem("content_interest")`
3. **Check URL** - Ensure `?interest=frontend` or `?interest=drupal` is in URL
4. **Check Referrer** - Only works if coming from known domains

### Interest Not Persisting

1. **Check localStorage** - Ensure not blocked by browser
2. **Check Opt-Out** - Ensure personalization is enabled
3. **Check Feature Flags** - Ensure `NEXT_PUBLIC_PERSONALIZATION_ENABLED !== "false"`

### Content Not Reordering

1. **Check Featured Content** - Ensure interest has mapped content
2. **Check Content Prominence** - Ensure feature flag is enabled
3. **Check Opt-Out** - Ensure user hasn't opted out

## Summary

This system gives you **ethical, privacy-friendly personalization** that:
- ✅ Respects user privacy (first-party only)
- ✅ Works without cookies (localStorage)
- ✅ Is transparent (visible in debug panel)
- ✅ Allows opt-out
- ✅ Improves user experience (shows relevant content first)

Perfect for portfolio sites where you want to show different content to different audiences without compromising trust.
