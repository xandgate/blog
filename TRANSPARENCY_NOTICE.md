# Transparency Notice - How It Works

## What Visitors See

On **first visit**, a popup appears (bottom-left):

```
┌─────────────────────────────────────┐
│ This site shows different content   │
│ based on your location.             │
│                                     │
│ Choose which version you'd like     │
│ to see:                             │
│                                     │
│ [🏛️ Government/Healthcare Focus]   │
│ [🤖 AI/Tech Focus]                  │
│ [Keep auto-detected]                │
└─────────────────────────────────────┘
```

## What Each Button Does

### 🏛️ Government/Healthcare Focus
- Sets `?segment=govtech` in URL
- Saves choice to localStorage
- Shows Drupal, government work, healthcare experience
- Headlines emphasize stability and deep experience
- Persists across all pages

### 🤖 AI/Tech Focus
- Sets `?segment=ai-enabled` in URL  
- Saves choice to localStorage
- Shows AI tools, modern architecture, innovation
- Headlines emphasize adaptability and cutting-edge skills
- Persists across all pages

### Keep auto-detected
- Dismisses popup
- Uses automatic geo-based detection:
  - US visitors → govtech
  - International → ai-enabled
- No localStorage save (respects auto-detection on every visit)

## Privacy & Ethics

**Why we show this:**
- Transparency about personalization
- User control over their experience
- Professional credibility (shows thoughtfulness)

**What we track:**
- Visitor segment (govtech/ai-enabled/general)
- Geographic location (city-level, via IP)
- Newsletter signup segment

**What we DON'T track:**
- No cookies for tracking
- No third-party analytics (unless you add GA4)
- No personal identification
- Email addresses only stored locally (`data/subscribers.json`)

## Resetting Choice

Users can reset their choice by:
1. Clearing localStorage (browser dev tools)
2. Visiting `?segment=` with a different value
3. Going to `?segment=general` for the default experience

## Technical Implementation

- **Popup:** `src/components/TransparencyNotice.tsx`
- **Storage:** `localStorage.setItem("segment_override", "govtech")`
- **Persistence:** Checked on every page load via `VisitorContextProvider`
- **URL priority:** URL param overrides saved preference
- **Auto-detection:** Falls back to geo-detection if no choice saved

---

This approach balances **ethics** (transparency), **UX** (user control), and **functionality** (effective personalization).
