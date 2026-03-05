/**
 * Client-safe utilities for geo-based personalization.
 * Server-only detection is in detect-server.ts
 */

import type { GeoLocation, VisitorSegment } from "./types";

/**
 * Determine visitor segment from geolocation.
 * US → govtech/enterprise focus; all other countries → agentic/international focus.
 * CLIENT-SAFE: no server APIs, safe to use in client components.
 */
export function determineSegment(geo: GeoLocation): VisitorSegment {
  return geo.countryCode === "US" ? "govtech" : "international";
}
