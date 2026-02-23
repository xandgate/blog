import { NextResponse } from "next/server";
import { buildAffinityProfile, determineSegment } from "@/lib/geo";
import { detectGeoLocation } from "@/lib/geo/detect-server";
import type { VisitorContext } from "@/lib/geo/types";

/**
 * Visitor Context API
 * Returns geo location and content segment for personalization
 * US visitors: Drupal/govtech messaging
 * International: AI-enabled architect messaging
 */
export async function GET() {
  try {
    const geo = await detectGeoLocation();
    const segment = determineSegment(geo);
    const affinity = buildAffinityProfile(geo);

    const visitorContext: VisitorContext = {
      geo,
      segment,
      affinity,
    };

    return NextResponse.json(visitorContext, {
      headers: {
        // Cache for 1 hour, allow stale for 1 day
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error detecting visitor context:", error);

    // Return default US context on error
    const defaultContext: VisitorContext = {
      geo: {
        country: "United States",
        countryCode: "US",
        region: "",
        city: "",
        timezone: "America/New_York",
        continent: "North America",
      },
      segment: "general",
      affinity: {
        segment: "general",
        greeting: "Welcome",
        avatarVariant: "/images/avatar.jpg",
        contextualMessage: "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
      },
    };

    return NextResponse.json(defaultContext);
  }
}
