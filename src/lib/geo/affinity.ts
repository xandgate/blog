import type { AffinityProfile, GeoLocation, VisitorSegment, ContentInterest } from "./types";
import { determineSegment } from "./detect";

/**
 * Contextual greetings based on visitor segment
 */
const GREETINGS: Record<VisitorSegment, string> = {
  local: "Hey neighbor! 👋",
  "tech-hub": "Welcome",
  federal: "Welcome",
  "drupal-community": "Hello, Drupal friend!",
  healthcare: "Welcome",
  international: "Welcome from across the globe",
  general: "Welcome",
};

/**
 * Greetings for content interest (used when interest overrides segment)
 */
const INTEREST_GREETINGS: Record<ContentInterest, string | null> = {
  frontend: null, // Use segment greeting
  drupal: "Hello, Drupal friend!",
  govtech: "Welcome", // Professional, understated
  general: null,
};

/**
 * Contextual messages to display based on segment
 * US visitors: Focus on Drupal & govtech consulting
 * International: Focus on AI-enabled architecture
 */
const CONTEXTUAL_MESSAGES: Record<VisitorSegment, string> = {
  local:
    "Drupal architect based in the DC metro area. 20 years delivering government web platforms.",
  "tech-hub":
    "Drupal architect specializing in government platforms. Federal & state agency experience.",
  federal:
    "20 years delivering web platforms for federal and state agencies. Deep Drupal expertise, security clearance available.",
  "drupal-community":
    "Active Drupal contributor with 20 years of experience. From small sites to federal platforms.",
  healthcare:
    "Currently building HIPAA-compliant healthcare platforms at Express Scripts with Drupal backend.",
  international:
    "AI-enabled full-stack architect. Leveraging LLMs and modern tooling to accelerate enterprise development.",
  general: "Drupal architect with 20 years delivering government platforms. Federal & state agency experience.",
};

/**
 * Contextual messages for content interest (used when interest overrides segment)
 */
const INTEREST_CONTEXTUAL_MESSAGES: Record<ContentInterest, string | null> = {
  frontend: null, // Use segment message
  drupal: "Deep Drupal expertise from small nonprofits to federal platforms.",
  govtech: "20 years delivering web platforms for government. I understand compliance, accessibility, and the procurement process.",
  general: null,
};

/**
 * Featured content suggestions based on segment
 */
const FEATURED_CONTENT_BY_SEGMENT: Record<VisitorSegment, string> = {
  local: "/work/building-once-ui-a-customizable-design-system",
  "tech-hub": "/work/building-once-ui-a-customizable-design-system",
  federal: "/work/building-once-ui-a-customizable-design-system",
  "drupal-community": "/work/building-once-ui-a-customizable-design-system",
  healthcare: "/work/building-once-ui-a-customizable-design-system",
  international: "/work/building-once-ui-a-customizable-design-system",
  general: "/work/building-once-ui-a-customizable-design-system",
};

// Map content slugs to interests for better matching
const CONTENT_INTEREST_MAP: Record<string, ContentInterest> = {
  // Frontend-focused projects
  "building-once-ui-a-customizable-design-system": "frontend",
  "automate-design-handovers-with-a-figma-to-code-pipeline": "frontend",
  "simple-portfolio-builder": "frontend",
  // Drupal-focused projects (add when you have them)
  // "drupal-federal-platform": "drupal",
  // "enterprise-cms-migration": "drupal",
};

/**
 * Featured content suggestions based on content interest.
 * Overrides segment-based content when interest is detected.
 */
const FEATURED_CONTENT_BY_INTEREST: Record<ContentInterest, string> = {
  frontend: "/work/building-once-ui-a-customizable-design-system",
  drupal: "/work/building-once-ui-a-customizable-design-system", // Update when you have Drupal-specific projects
  govtech: "/blog/what-government-gets-wrong-about-website-migrations", // Update when you have govtech-specific projects
  general: "/work/building-once-ui-a-customizable-design-system",
};

/**
 * Build affinity profile for a visitor.
 * US visitors: Drupal/govtech messaging
 * International: AI-enabled architect messaging
 */
export function buildAffinityProfile(
  geo: GeoLocation,
  interest?: ContentInterest | null,
): AffinityProfile {
  const segment = determineSegment(geo);

  // Use interest-based content if available, otherwise use segment-based
  const featuredContent = interest && interest !== "general"
    ? FEATURED_CONTENT_BY_INTEREST[interest]
    : FEATURED_CONTENT_BY_SEGMENT[segment];

  // Use interest-based greeting if available, otherwise use segment-based
  const greeting = (interest && INTEREST_GREETINGS[interest]) || GREETINGS[segment];

  // Use interest-based contextual message if available, otherwise use segment-based
  const contextualMessage = (interest && INTEREST_CONTEXTUAL_MESSAGES[interest]) || CONTEXTUAL_MESSAGES[segment];

  return {
    segment,
    greeting,
    avatarVariant: "/images/avatar.jpg", // Single avatar, no geo-based variants
    contextualMessage,
    featuredContent,
    interest: interest || undefined,
  };
}

/**
 * Get personalized headline based on visitor context
 * US visitors see Drupal/govtech focus
 * International visitors see AI-enabled architect focus
 */
export function getPersonalizedHeadline(segment: VisitorSegment, interest?: ContentInterest | null): string {
  // Interest-based headlines take priority
  if (interest && interest !== "general") {
    const interestHeadlines: Record<ContentInterest, string> = {
      frontend: "Modern frontend architecture for enterprise",
      drupal: "Drupal architect with 20 years of government experience",
      govtech: "Government web platforms built right",
      general: "Drupal architect & govtech consultant",
    };
    return interestHeadlines[interest];
  }

  const headlines: Record<VisitorSegment, string> = {
    local: "Drupal architect & government technology consultant",
    "tech-hub": "Drupal architect specializing in government platforms",
    federal: "Trusted Drupal architect for government web platforms",
    "drupal-community": "Drupal contributor & enterprise architect",
    healthcare: "Drupal architect building HIPAA-compliant platforms",
    international: "AI-enabled architect building enterprise platforms faster",
    general: "Drupal architect & govtech consultant",
  };

  return headlines[segment];
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
