import { AffinityProfile, GeoLocation, VisitorSegment } from "./types";
import { determineSegment } from "./detect";

/**
 * Avatar variants mapped to visitor segments
 * You'll need to add these images to /public/images/avatars/
 */
export const AVATAR_VARIANTS: Record<VisitorSegment, string> = {
  local: "/images/avatars/local.jpg", // Casual, friendly
  "tech-hub": "/images/avatars/tech.jpg", // Tech-forward
  federal: "/images/avatars/federal.jpg", // Professional
  "drupal-community": "/images/avatars/drupal.jpg", // Drupal themed
  healthcare: "/images/avatars/healthcare.jpg", // Professional/medical context
  international: "/images/avatars/global.jpg", // Global/professional
  general: "/images/avatar.jpg", // Default avatar
};

/**
 * Contextual greetings based on visitor segment
 */
const GREETINGS: Record<VisitorSegment, string> = {
  local: "Hey neighbor! 👋",
  "tech-hub": "Welcome, fellow technologist",
  federal: "Welcome",
  "drupal-community": "Hello, Drupal friend!",
  healthcare: "Welcome",
  international: "Welcome from across the globe",
  general: "Welcome",
};

/**
 * Contextual messages to display based on segment
 */
const CONTEXTUAL_MESSAGES: Record<VisitorSegment, string> = {
  local:
    "I'm based right here in the DC metro area. Let's grab coffee and talk Drupal!",
  "tech-hub":
    "I've worked with teams across major tech hubs on enterprise platforms.",
  federal:
    "Extensive experience with federal agencies including DoL, DOI, and state governments.",
  "drupal-community":
    "Active Drupal contributor – maybe we've met at a camp or con?",
  healthcare:
    "Currently building HIPAA-compliant healthcare platforms at Express Scripts.",
  international:
    "I've delivered projects for governments in Jamaica, St. Lucia, and Arizona state agencies.",
  general: "15+ years building enterprise platforms with Drupal and React.",
};

/**
 * Featured content suggestions based on segment
 */
const FEATURED_CONTENT: Record<VisitorSegment, string> = {
  local: "/work/building-once-ui-a-customizable-design-system",
  "tech-hub": "/work/building-once-ui-a-customizable-design-system",
  federal: "/blog/drupal-federal-security",
  "drupal-community": "/blog/drupal-contribution-guide",
  healthcare: "/work/express-scripts-platform",
  international: "/work/jamaica-open-data-portal",
  general: "/work/building-once-ui-a-customizable-design-system",
};

/**
 * Build complete affinity profile for a visitor
 */
export function buildAffinityProfile(geo: GeoLocation): AffinityProfile {
  const segment = determineSegment(geo);

  return {
    segment,
    greeting: GREETINGS[segment],
    avatarVariant: AVATAR_VARIANTS[segment],
    contextualMessage: CONTEXTUAL_MESSAGES[segment],
    featuredContent: FEATURED_CONTENT[segment],
  };
}

/**
 * Get personalized headline based on visitor context
 */
export function getPersonalizedHeadline(segment: VisitorSegment): string {
  const headlines: Record<VisitorSegment, string> = {
    local: "Building enterprise platforms in the DMV",
    "tech-hub": "Enterprise Drupal & React expertise",
    federal: "Trusted partner for federal web platforms",
    "drupal-community": "Drupal contributor & enterprise architect",
    healthcare: "HIPAA-compliant healthcare platform specialist",
    international: "Global experience, enterprise results",
    general: "Building enterprise platforms with Drupal & React",
  };

  return headlines[segment];
}

/**
 * Get time-based greeting prefix
 */
export function getTimeBasedGreeting(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    });
    const hour = parseInt(formatter.format(now), 10);

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Hello";
  } catch {
    return "Hello";
  }
}
