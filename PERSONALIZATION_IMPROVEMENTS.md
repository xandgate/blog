# Personalization System Improvements

Based on AGENTS.md requirements and current implementation analysis.

## Critical Issues to Address

### 1. Avatar Personalization Logic (HIGH PRIORITY)

**Current Problem:**
- Avatars are segment-based (`/images/avatars/local.jpg`, `/images/avatars/tech.jpg`, etc.)
- Doesn't match AGENTS.md specification which requires:
  - `avatar_geo = geo_bucket` (if geo_known) or 'global' (if not)
  - `avatar_gender = random_choice(['male','female'])`
  - Neutral avatar must always exist as control

**Required Changes:**
- Refactor `buildAffinityProfile` in `src/lib/geo/affinity.ts`
- Create avatar selection based on geo bucket + random gender
- Ensure neutral avatar (`/images/avatar.jpg`) is always available as fallback
- Add avatar images to `/public/images/avatars/` directory structure:
  ```
  /images/avatars/
    - neutral.jpg (control)
    - us-male.jpg
    - us-female.jpg
    - global-male.jpg
    - global-female.jpg
    - [continent]-male.jpg
    - [continent]-female.jpg
  ```

### 2. Missing Transparency & Opt-Out (HIGH PRIORITY)

**Current Problem:**
- No disclosure about personalization
- No "View default experience" option

**Required Changes:**
- Add subtle disclosure component (footer or header)
- Add opt-out mechanism that stores preference in localStorage
- Modify `VisitorContextProvider` to respect opt-out preference
- Disclosure text: "This site adapts based on context as a demonstration of applied personalization."

### 3. No Experimentation Framework (MEDIUM PRIORITY)

**Current Problem:**
- No A/B testing infrastructure
- No metrics tracking
- No control vs variant assignment

**Required Changes:**
- Create experiment assignment system (control, variant A, variant B)
- Add metrics tracking:
  - Page dwell time
  - Scroll depth
  - Newsletter sign-ups
  - Contact CTA clicks
- Store results anonymously (localStorage + optional analytics endpoint)
- Aggregate data only (no individual tracking)

### 4. Missing Feature Flags (MEDIUM PRIORITY)

**Current Problem:**
- No way to enable/disable experiments
- No way to control personalization features

**Required Changes:**
- Create feature flag system in `src/lib/features.ts`
- Add flags for:
  - `personalization.enabled`
  - `personalization.avatarExperiment`
  - `personalization.greetingExperiment`
  - `personalization.contextualMessageExperiment`
- Make flags configurable via environment variables

### 5. Server-Side Context Not Passed (MEDIUM PRIORITY)

**Current Problem:**
- `VisitorContextProvider` accepts `initialContext` but it's never passed
- Causes unnecessary client-side fetch on every page load

**Required Changes:**
- Detect geo in `layout.tsx` (server component)
- Pass `initialContext` to `VisitorContextProvider`
- Only fetch client-side if server detection fails

### 6. Time-Based Greeting Not Used (LOW PRIORITY)

**Current Problem:**
- `getTimeBasedGreeting` function exists but is never called
- Greetings are static based on segment

**Required Changes:**
- Integrate time-based greeting into `PersonalizedGreeting` component
- Combine time-based prefix with segment-based greeting
- Example: "Good morning, fellow technologist" (for tech-hub segment)

### 7. Federal Segment Never Assigned (LOW PRIORITY)

**Current Problem:**
- `federal` segment exists in types but is never returned by `determineSegment`
- No logic to detect federal workers

**Required Changes:**
- Add detection logic (could use domain detection, IP ranges, or explicit opt-in)
- Or remove unused segment if not needed
- Update affinity profiles if keeping segment

### 8. Avatar Images Don't Exist (BLOCKER)

**Current Problem:**
- Code references `/images/avatars/[segment].jpg` but files don't exist
- Will cause broken images

**Required Changes:**
- Create placeholder avatar images
- Or update code to use existing `/images/avatar.jpg` as fallback
- Document avatar requirements

## Implementation Priority

1. **Fix avatar logic** (matches AGENTS.md, prevents broken images)
2. **Add transparency/opt-out** (ethical requirement)
3. **Pass server-side context** (performance improvement)
4. **Add feature flags** (enables controlled rollout)
5. **Add experimentation framework** (enables measurement)
6. **Use time-based greetings** (polish)
7. **Fix federal segment** (cleanup)

## Code Quality Improvements

### Current Strengths
- Clean separation of concerns (detect, affinity, types)
- Good TypeScript typing
- Proper error handling with fallbacks
- Debug panel for development

### Areas for Improvement
- Add JSDoc comments explaining experiment intent (per AGENTS.md)
- Add unit tests for segmentation logic
- Document avatar image requirements
- Add environment variable configuration

## Example Implementation Notes

### Avatar Selection Logic (per AGENTS.md)
```typescript
function selectAvatar(geo: GeoLocation): string {
  // Determine geo bucket
  const geoBucket = geo.countryCode === 'US' ? 'us' : 
                    geo.continent ? geo.continent.toLowerCase() : 'global';
  
  // Random gender (consistent per session)
  const sessionId = getSessionId(); // Use existing session
  const gender = hashToGender(sessionId); // Deterministic random
  
  // Try geo-specific avatar
  const avatarPath = `/images/avatars/${geoBucket}-${gender}.jpg`;
  
  // Fallback to neutral if not available
  return avatarExists(avatarPath) ? avatarPath : '/images/avatar.jpg';
}
```

### Transparency Component
```tsx
<TransparencyNotice>
  This site adapts based on context as a demonstration of applied personalization.
  <Button onClick={handleOptOut}>View default experience</Button>
</TransparencyNotice>
```

### Experiment Assignment
```typescript
function assignExperiment(sessionId: string): 'control' | 'variant-a' | 'variant-b' {
  // Deterministic assignment based on session
  const hash = hashSession(sessionId);
  const bucket = hash % 100;
  
  if (bucket < 33) return 'control';
  if (bucket < 66) return 'variant-a';
  return 'variant-b';
}
```
