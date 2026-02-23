import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy for testing different visitor segments.
 * 
 * To test different segments, add query parameters to your URL:
 * - ?test-segment=local (DC Metro area)
 * - ?test-segment=tech-hub (Tech hub cities)
 * - ?test-segment=federal (Federal workers)
 * - ?test-segment=drupal-community (Drupal conference cities)
 * - ?test-segment=healthcare (Healthcare hubs)
 * - ?test-segment=international (Outside US)
 * - ?test-segment=general (Default)
 * 
 * You can also test specific geo locations:
 * - ?test-geo=us (United States)
 * - ?test-geo=gb (United Kingdom)
 * - ?test-geo=in (India)
 * - ?test-city=Fairfax&test-region=VA (DC Metro)
 * - ?test-city=San Francisco&test-region=CA (Tech hub)
 * 
 * The proxy will set custom headers that override the geo detection.
 */
export function proxy(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const response = NextResponse.next();

  // Test segment override
  const testSegment = searchParams.get("test-segment");
  if (testSegment) {
    // Set a custom header that can be read by geo detection
    response.headers.set("x-test-segment", testSegment);
  }

  // Test geo location override
  const testGeo = searchParams.get("test-geo");
  const testCity = searchParams.get("test-city");
  const testRegion = searchParams.get("test-region");

  if (testGeo) {
    // Override country code
    response.headers.set("x-vercel-ip-country", testGeo.toUpperCase());
    
    // Set appropriate continent based on country
    const continentMap: Record<string, string> = {
      US: "North America",
      CA: "North America",
      MX: "North America",
      GB: "Europe",
      DE: "Europe",
      FR: "Europe",
      IN: "Asia",
      CN: "Asia",
      JP: "Asia",
      AU: "Oceania",
      BR: "South America",
    };
    const continent = continentMap[testGeo.toUpperCase()] || "Unknown";
    response.headers.set("x-test-continent", continent);
  }

  if (testCity) {
    // Override city
    response.headers.set("x-vercel-ip-city", encodeURIComponent(testCity));
  }

  if (testRegion) {
    // Override region/state
    response.headers.set("x-vercel-ip-country-region", testRegion.toUpperCase());
  }

  // Set timezone if not already set
  if (!request.headers.get("x-vercel-ip-timezone")) {
    response.headers.set("x-vercel-ip-timezone", "America/New_York");
  }

  // Test interest override (for explicit intent)
  const testInterest = searchParams.get("interest");
  if (testInterest && (testInterest === "frontend" || testInterest === "drupal")) {
    response.headers.set("x-test-interest", testInterest);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
