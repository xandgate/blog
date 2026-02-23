# How to Identify Visitor Segments

## Quick Methods

### 1. GeoDebugPanel (Easiest)
- **Location:** Bottom-right corner of the page
- **How to access:** Click the "🌍 Geo Debug" button
- **Shows:**
  - Detected location (city, region, country)
  - Current segment (local, tech-hub, federal, etc.)
  - Affinity profile (greeting, avatar, contextual message)
  - Featured content path

### 2. Browser Console (Automatic)
- **Location:** Browser DevTools Console (F12 or Cmd+Option+I)
- **What you'll see:** Automatic log when page loads:
  ```javascript
  🎯 Visitor Segment: {
    segment: "local",
    location: "Fairfax, VA US",
    country: "United States",
    timezone: "America/New_York",
    featuredContent: "/work/building-once-ui-a-customizable-design-system",
    greeting: "Hey neighbor! 👋",
    avatarVariant: "/images/avatars/us-male.jpg"
  }
  ```

### 3. Segment Indicator (Development Only)
- **Location:** Top-right corner (only in development mode)
- **Shows:** Current segment and location in a small badge
- **Enable:** Already enabled in development, disabled in production

### 4. Programmatic Access
You can access segment info anywhere in your components:

```tsx
import { useVisitorContext } from "@/components";

function MyComponent() {
  const { segment, geo, affinity } = useVisitorContext();
  
  console.log("Current segment:", segment);
  console.log("Location:", geo?.city, geo?.country);
  console.log("Featured content:", affinity?.featuredContent);
  
  return <div>Segment: {segment}</div>;
}
```

## Segment Types

The system identifies these segments:

1. **`local`** - DC Metro area (VA, MD, DC)
2. **`tech-hub`** - Major tech cities (SF, NYC, Austin, Seattle, Boston, etc.)
3. **`federal`** - Federal government workers (currently not auto-detected, would need explicit detection)
4. **`drupal-community`** - Drupal conference cities (Portland, Nashville, etc.)
5. **`healthcare`** - Healthcare hubs (Boston, St. Louis, Minneapolis, etc.)
6. **`international`** - Outside United States
7. **`general`** - Default/fallback

## Testing Different Segments

Use query parameters in the URL:

### By Segment Name:
- `?test-segment=local`
- `?test-segment=tech-hub`
- `?test-segment=healthcare`
- `?test-segment=international`
- `?test-segment=general`

### By Location:
- `?test-city=Fairfax&test-region=VA` → `local`
- `?test-city=San Francisco&test-region=CA` → `tech-hub`
- `?test-city=Boston&test-region=MA` → `healthcare`
- `?test-geo=gb` → `international`
- `?test-geo=in` → `international` (Asia)

## Real-Time Monitoring

### In Development:
1. **GeoDebugPanel** - Always visible (can be toggled)
2. **Console logs** - Automatic segment logging
3. **Segment Indicator** - Top-right badge (dev only)

### In Production:
1. **GeoDebugPanel** - Hidden by default (set `FORCE_SHOW_DEBUG = true` to show)
2. **Console logs** - Still work, but less visible
3. **Segment Indicator** - Disabled

## Understanding the Segment Logic

Segments are determined in `src/lib/geo/detect.ts`:

1. **International check first:** If countryCode !== "US" → `international`
2. **DC Metro check:** If city/region matches DC Metro → `local`
3. **Healthcare hubs:** If city matches healthcare hubs → `healthcare`
4. **Drupal cities:** If city matches Drupal conference cities → `drupal-community`
5. **Tech hubs:** If city matches tech hub cities → `tech-hub`
6. **Default:** → `general`

## Quick Reference

| Segment | How to Test | Example URL |
|---------|-------------|-------------|
| local | `?test-city=Fairfax&test-region=VA` | `http://localhost:3000?test-city=Fairfax&test-region=VA` |
| tech-hub | `?test-city=San Francisco&test-region=CA` | `http://localhost:3000?test-city=San Francisco&test-region=CA` |
| healthcare | `?test-city=Boston&test-region=MA` | `http://localhost:3000?test-city=Boston&test-region=MA` |
| international | `?test-geo=gb` | `http://localhost:3000?test-geo=gb` |
| general | `?test-city=Omaha&test-region=NE` | `http://localhost:3000?test-city=Omaha&test-region=NE` |

### Content Interest (Intent-Based)

| Interest | How to Test | Example URL |
|----------|-------------|-------------|
| frontend | `?interest=frontend` | `http://localhost:3000?interest=frontend` |
| drupal | `?interest=drupal` | `http://localhost:3000?interest=drupal` |
| govtech | `?interest=govtech` | `http://localhost:3000?interest=govtech` |

GovTech interest also detects automatically from:
- Referrers from .gov domains, govtech.com, fedscoop.com, statescoop.com, etc.
- Search terms containing "government", "govtech", "federal", "public sector", etc.

## Pro Tips

1. **Keep GeoDebugPanel open** while testing - it updates in real-time
2. **Check console** for detailed segment information
3. **Use query params** to quickly test different segments
4. **Clear localStorage** if you want to reset session-based assignments (gender, etc.)
