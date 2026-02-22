import { NextResponse } from "next/server";
import { detectGeoLocation, buildAffinityProfile, determineSegment } from "@/lib/geo";
import type { VisitorContext } from "@/lib/geo/types";

// Using nodejs runtime - works both locally and on Vercel
// Edge runtime would be faster but requires static export declaration

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

    // Return default context on error
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
        contextualMessage: "15+ years building enterprise platforms with Drupal and React.",
      },
    };

    return NextResponse.json(defaultContext);
  }
}
