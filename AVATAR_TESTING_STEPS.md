# Avatar Testing Steps

## Testing US Female Avatar

1. **Set your location to US:**
   - Add query parameter: `?test-geo=us`
   - Or: `?test-city=Fairfax&test-region=VA`

2. **Ensure you get a female assignment:**
   - The gender is determined by your session ID (stored in localStorage)
   - To get a female avatar, you may need to clear your session:
     - Open browser console
     - Run: `localStorage.removeItem('visitor_session_id')`
     - Refresh the page
   - The gender assignment is deterministic (50/50 chance based on session hash)
   - If you get male, clear session again and refresh until you get female

3. **Verify the avatar loads:**
   - Check the GeoDebugPanel (bottom-right, click "🌍 Geo Debug")
   - Look for "Avatar: /images/avatars/us-female.jpg"
   - The avatar should display on the page (if PersonalizedAvatar is used)

4. **Expected result:**
   - Geo bucket: `us`
   - Gender: `female`
   - Avatar path: `/images/avatars/us-female.jpg`
   - Segment: `local` (if DC Metro) or `tech-hub` (if tech city) or `general`

## Testing Asia Male Avatar

1. **Set your location to India (Asia):**
   - Add query parameter: `?test-geo=in`
   - This sets country to India, which maps to Asia continent

2. **Ensure you get a male assignment:**
   - Clear session if needed: `localStorage.removeItem('visitor_session_id')`
   - Refresh until you get male (50/50 chance)

3. **Verify the avatar loads:**
   - Check GeoDebugPanel
   - Look for "Avatar: /images/avatars/asia-male.jpg"
   - Segment should be: `international`

4. **Expected result:**
   - Geo bucket: `asia` (from continent)
   - Gender: `male`
   - Avatar path: `/images/avatars/asia-male.jpg`
   - Segment: `international`

## Quick Test URLs

### US Female:
```
http://localhost:3000?test-geo=us&test-city=Fairfax&test-region=VA
```
Then clear session and refresh until female appears.

### Asia Male:
```
http://localhost:3000?test-geo=in
```
Then clear session and refresh until male appears.

## Debugging Tips

1. **Check GeoDebugPanel:**
   - Shows detected location, segment, and avatar path
   - Verify the avatar path matches what you expect

2. **Check browser console:**
   - Look for any 404 errors for avatar images
   - If you see 404, the file doesn't exist at that path

3. **Check Network tab:**
   - Look for requests to `/images/avatars/us-female.jpg` or `/images/avatars/asia-male.jpg`
   - Verify the response is 200 (not 404)

4. **Force gender assignment (for testing):**
   - You can temporarily modify `src/lib/session.ts` to always return a specific gender
   - Or create multiple browser profiles/sessions to get different assignments

## Expected File Structure

Make sure these files exist:
```
/public/images/avatars/
  - us-female.jpg ✅ (you have this)
  - asia-male.jpg ✅ (you have this)
  - avatar.jpg (neutral fallback - should exist)
```

## Notes

- Gender assignment is deterministic per session (same session = same gender)
- To get a different gender, you need a new session ID
- Avatar experiment must be enabled (it is by default now)
- Personalization must be enabled (it is by default)
