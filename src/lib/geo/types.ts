// Visitor context types for audience-aware personalization

export interface GeoLocation {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  timezone: string;
  continent: string;
}

export interface VisitorContext {
  geo: GeoLocation;
  segment: VisitorSegment;
  affinity: AffinityProfile;
}

export type VisitorSegment =
  | "local" // DC/VA/MD area
  | "tech-hub" // SF, NYC, Austin, Seattle, Boston
  | "federal" // Federal government workers
  | "drupal-community" // Drupal conference cities
  | "healthcare" // Healthcare industry regions
  | "international" // Outside US
  | "general"; // Default

export type ContentInterest = "frontend" | "drupal" | "govtech" | "general";

export interface AffinityProfile {
  segment: VisitorSegment;
  greeting: string;
  avatarVariant: string;
  accentColor?: string;
  featuredContent?: string;
  contextualMessage?: string;
  interest?: ContentInterest; // Detected or explicit content interest
}

// Geographic mapping configurations
export const TECH_HUB_CITIES = [
  "San Francisco",
  "San Jose",
  "Palo Alto",
  "Mountain View",
  "New York",
  "Brooklyn",
  "Austin",
  "Seattle",
  "Boston",
  "Los Angeles",
  "Denver",
  "Portland",
  "Chicago",
  "Atlanta",
  "Raleigh",
  "Durham",
];

export const DC_METRO_CITIES = [
  "Washington",
  "Arlington",
  "Alexandria",
  "Fairfax",
  "Reston",
  "McLean",
  "Tysons",
  "Bethesda",
  "Rockville",
  "Silver Spring",
  "College Park",
  "Herndon",
  "Falls Church",
  "Vienna",
  "Ashburn",
];

export const DRUPAL_CONFERENCE_CITIES = [
  "Portland",
  "Nashville",
  "Pittsburgh",
  "Minneapolis",
  "Denver",
  "Vienna", // DrupalCon Europe
  "Barcelona",
  "Amsterdam",
  "Prague",
  "Lille",
];

export const HEALTHCARE_HUBS = [
  "Boston",
  "St. Louis",
  "Minneapolis",
  "Houston",
  "Cleveland",
  "Rochester", // Mayo Clinic
  "Nashville",
  "Philadelphia",
  "Baltimore",
];
