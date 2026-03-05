import type { AffinityProfile, GeoLocation, VisitorSegment, ContentInterest } from "./types";
import { determineSegment } from "./detect";

/** Segments used in practice: US → govtech, non-US → international, or ?segment= override */
const GREETINGS: Record<VisitorSegment, string> = {
  local: "Welcome",
  "tech-hub": "Welcome",
  federal: "Welcome",
  "drupal-community": "Welcome",
  healthcare: "Welcome",
  international: "Welcome",
  general: "Welcome",
  govtech: "Welcome",
  "ai-enabled": "Welcome",
};

/** US/govtech: enterprise & government. International/ai-enabled: agentic developer focus. */
const CONTEXTUAL_MESSAGES: Record<VisitorSegment, string> = {
  local: "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
  "tech-hub": "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
  federal: "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
  "drupal-community": "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
  healthcare: "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
  international:
    "AI-enabled full-stack architect. Leveraging LLMs and modern tooling to accelerate enterprise development.",
  general: "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
  govtech:
    "20 years delivering Drupal platforms for federal and state agencies. Section 508, procurement cycles, multi-site at scale — I know the territory.",
  "ai-enabled":
    "Building with Claude, Cursor, and MCP servers. Engineering judgment at machine speed.",
};

const FEATURED_CONTENT_BY_SEGMENT: Record<VisitorSegment, string> = {
  local: "/blog/why-drupal-dominates-government",
  "tech-hub": "/blog/why-drupal-dominates-government",
  federal: "/blog/why-drupal-dominates-government",
  "drupal-community": "/blog/why-drupal-dominates-government",
  healthcare: "/blog/why-drupal-dominates-government",
  international: "/blog/context-graphs-for-ai-agents",
  general: "/blog/why-drupal-dominates-government",
  govtech: "/blog/why-drupal-dominates-government",
  "ai-enabled": "/blog/context-graphs-for-ai-agents",
};

/**
 * Build affinity profile from geo.
 * US → govtech (enterprise/gov focus). Non-US → international (agentic focus).
 * Single avatar for all; no location-based avatar variants.
 */
export function buildAffinityProfile(
  geo: GeoLocation,
  _interest?: ContentInterest | null,
): AffinityProfile {
  const segment = determineSegment(geo);
  return {
    segment,
    greeting: GREETINGS[segment],
    avatarVariant: "/images/avatar.jpg",
    contextualMessage: CONTEXTUAL_MESSAGES[segment],
    featuredContent: FEATURED_CONTENT_BY_SEGMENT[segment],
  };
}

/**
 * Build affinity profile from a manual segment override (no geo needed).
 * Used when the visitor explicitly picks GovTech Focus or AI Engineering Focus.
 */
export function buildAffinityFromSegmentOverride(
  segment: "govtech" | "ai-enabled",
): AffinityProfile {
  return {
    segment,
    greeting: GREETINGS[segment],
    avatarVariant: "/images/avatar.jpg",
    contextualMessage: CONTEXTUAL_MESSAGES[segment],
    featuredContent: FEATURED_CONTENT_BY_SEGMENT[segment],
  };
}

/**
 * Get time-based greeting prefix based on visitor's timezone.
 */
export function getTimeBasedGreeting(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    });
    const hour = Number.parseInt(formatter.format(now), 10);

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Hello";
  } catch {
    return "Hello";
  }
}

/**
 * Get combined greeting: time-based prefix + segment-specific greeting.
 */
export function getCombinedGreeting(
  segment: VisitorSegment,
  timezone: string,
): string {
  const timePrefix = getTimeBasedGreeting(timezone);
  const segmentGreeting = GREETINGS[segment];

  // For general segment, just use time prefix
  if (segment === "general") {
    return timePrefix;
  }

  // Combine time prefix with segment greeting
  // Example: "Good morning, fellow technologist"
  return `${timePrefix}, ${segmentGreeting.toLowerCase()}`;
}
