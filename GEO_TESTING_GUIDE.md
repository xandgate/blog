# Geographic Segmentation Testing Guide

This guide explains how to test the geographic-based content personalization on your portfolio site.

## What Changes Based on Location

### US Visitors (Federal, Local, Tech Hub, Healthcare, Drupal Community, General)
**Headline:**
> **Drupal architect.** Government platforms.

**Subline:**
> 20 years delivering secure, accessible platforms for federal & state agencies.

**Contextual Messages:**
- **Local (DC metro):** "Drupal architect based in the DC metro area. 20 years delivering government web platforms."
- **Tech Hub:** "Drupal architect specializing in government platforms. Federal & state agency experience."
- **Federal:** "20 years delivering web platforms for federal and state agencies. Deep Drupal expertise, security clearance available."
- **Drupal Community:** "Active Drupal contributor with 20 years of experience. From small sites to federal platforms."
- **Healthcare:** "Currently building HIPAA-compliant healthcare platforms at Express Scripts with Drupal backend."
- **General (US):** "Drupal architect with 20 years delivering government platforms. Federal & state agency experience."

### International Visitors
**Headline:**
> **AI writes code.** I architect outcomes.

**Subline:**
> The code is automated. The judgment is not.

**Contextual Message:**
> AI-enabled full-stack architect. Leveraging LLMs and modern tooling to accelerate enterprise development.

---

## Testing Methods

### Method 1: VPN Testing (Recommended)

1. **Install a VPN** (if you don't have one):
   - NordVPN, ExpressVPN, ProtonVPN, or any service with multiple server locations

2. **Test US View:**
   - Connect to a US server (any city)
   - Open incognito/private window
   - Visit https://varunbaker.com
   - Should see: "Drupal architect. Government platforms."

3. **Test International View:**
   - Connect to a non-US server (UK, Germany, Japan, etc.)
   - Open new incognito/private window
   - Visit https://varunbaker.com
   - Should see: "AI writes code. I architect outcomes."

4. **Clear between tests:**
   - Always use incognito/private browsing
   - Close and reopen browser between location changes
   - This ensures fresh geo detection

### Method 2: Browser DevTools Override (Chrome/Edge)

1. **Open DevTools** (F12 or Cmd+Option+I)

2. **Access Sensors Panel:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
   - Type "Show Sensors"
   - Press Enter

3. **Override Location:**
   - In Sensors panel, find "Location" section
   - Select from presets or enter custom coordinates:
     - **US (DC):** `38.9072, -77.0369`
     - **UK (London):** `51.5074, -0.1278`
     - **Germany (Berlin):** `52.5200, 13.4050`

4. **Refresh page** to see changes

5. **Note:** This method may not work perfectly as Vercel uses IP-based geo detection, not browser coordinates.

### Method 3: Testing API Directly

You can check what segment is detected for your current location:

```bash
curl https://varunbaker.com/api/visitor-context | jq
```

This returns:
```json
{
  "geo": {
    "country": "United States",
    "countryCode": "US",
    "region": "Virginia",
    "city": "Arlington",
    ...
  },
  "affinity": {
    "segment": "local",
    "greeting": "Hey neighbor! 👋",
    "contextualMessage": "Drupal architect based in the DC metro area...",
    ...
  }
}
```

### Method 4: Ask Friends in Different Countries

Share the link with contacts in:
- Europe (UK, Germany, France)
- Asia (India, Japan, Singapore)
- South America (Brazil, Argentina)
- Africa (South Africa, Nigeria)

Ask them to screenshot the homepage headline and send it to you.

---

## Verification Checklist

- [ ] US visitor sees "Drupal architect" headline
- [ ] US visitor sees govtech-focused subline
- [ ] International visitor sees "AI writes code" headline
- [ ] International visitor sees AI-focused subline
- [ ] Contextual message changes based on segment
- [ ] Avatar remains consistent per session (same geo = same avatar)
- [ ] Featured badge updates appropriately

---

## Debug Panel

For development/testing, you can add a debug panel to see detected segment:

1. Press `Cmd+Shift+D` (or add `?debug=true` to URL)
2. You'll see overlay showing:
   - Detected country
   - Visitor segment
   - Current messaging

---

## Segment Detection Logic

**How visitors are categorized:**

1. **Local:** DC metro area cities (Washington, Arlington, Alexandria, etc.)
2. **Tech Hub:** San Francisco, NYC, Austin, Seattle, Boston, etc.
3. **Federal:** DC metro + specific indicators
4. **Drupal Community:** Cities with frequent Drupal camps/conferences
5. **Healthcare:** Healthcare hub cities (Boston, Minneapolis, Nashville, etc.)
6. **International:** Any non-US country
7. **General:** US visitors not matching above categories

**All US segments (except international) get Drupal/govtech messaging.**

---

## Troubleshooting

**Not seeing changes?**
- Clear browser cache and cookies
- Use incognito/private browsing mode
- Try a different browser
- Wait 30 seconds after changing VPN location

**API returns wrong location?**
- Vercel uses Cloudflare's geo headers
- Some VPNs leak real location
- Try disconnecting/reconnecting VPN

**Still seeing fallback content?**
- Check browser console for errors (`F12` → Console tab)
- Verify `/api/visitor-context` returns data
- May take 1-2 seconds for personalized content to load

---

## Implementation Notes

- Geo detection happens server-side via Vercel headers
- Client-side React components fetch visitor context on mount
- Fallback content shown during loading (~500ms)
- Session-based: same visitor sees consistent experience
- Privacy-focused: no tracking, no cookies stored
