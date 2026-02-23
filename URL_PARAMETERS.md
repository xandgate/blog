# URL Parameters Guide

## Segment Override

### Two Ways to Choose Your Experience:

1. **Transparency Notice (First Visit)** - Click one of the options:
   - 🏛️ Government/Healthcare Focus (`govtech`)
   - 🤖 AI/Tech Focus (`ai-enabled`)
   - Keep auto-detected (uses your location)

2. **Manual URL Parameter** - Add to any URL:

### Usage

```
https://yoursite.com/?segment=govtech
https://yoursite.com/?segment=ai-enabled
https://yoursite.com/?segment=general
```

### What It Does

- **Bypasses geo-detection** - Shows specific content regardless of visitor location
- **Useful for testing** - See how different audiences experience your site
- **Shareable** - Send links to show specific views to others

### Available Segments

1. **`?segment=govtech`**
   - Content focused on Drupal, government work, healthcare
   - Headlines emphasize reliability and experience
   - US-centric messaging

2. **`?segment=ai-enabled`**
   - Content focused on AI tools, modern architecture
   - Headlines emphasize innovation and adaptability
   - Global/international messaging

3. **`?segment=general`**
   - Default, non-personalized experience
   - Generic headlines and content

### Examples

Share your portfolio with different audiences:

```bash
# For government recruiters
https://varun.dev/?segment=govtech

# For tech companies/startups
https://varun.dev/?segment=ai-enabled

# For general audience (no personalization)
https://varun.dev/?segment=general
```

### Technical Details

- Parameter is read client-side via `URLSearchParams`
- Overrides server-side geo-detection
- Does not store in cookies/localStorage (clean on refresh without param)
- Works with all pages, not just homepage

### Default Behavior (No Parameter)

Without URL parameters, the site uses automatic geo-based segmentation:
- **US visitors** → `govtech` segment
- **International visitors** → `ai-enabled` segment
