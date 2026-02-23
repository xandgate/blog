import { headers } from "next/headers";
import {
  GeoLocation,
  VisitorSegment,
  TECH_HUB_CITIES,
  DC_METRO_CITIES,
  DRUPAL_CONFERENCE_CITIES,
  HEALTHCARE_HUBS,
} from "./types";

/**
 * Mock geo data for local development testing.
 * Change these values to test different visitor segments:
 * - DC Metro: city="Fairfax", region="VA"
 * - Tech Hub: city="San Francisco", region="CA"
 * - International: country="GB", city="London"
 * - Healthcare: city="Boston", region="MA"
 * - Drupal: city="Portland", region="OR"
 */
const DEV_MOCK_GEO = {
  country: "US",
  region: "VA",
  city: "Fairfax",
  timezone: "America/New_York",
};

/**
 * Detect visitor geolocation from request headers (SERVER-ONLY).
 * Works with Vercel, Cloudflare, and falls back to mock data in development
 */
export async function detectGeoLocation(): Promise<GeoLocation> {
  const headersList = await headers();

  // Check for test headers from middleware first (for testing different segments)
  const testContinent = headersList.get("x-test-continent");

  // Try Vercel headers first
  const vercelCountry = headersList.get("x-vercel-ip-country");
  const vercelRegion = headersList.get("x-vercel-ip-country-region");
  const vercelCity = headersList.get("x-vercel-ip-city");
  const vercelTimezone = headersList.get("x-vercel-ip-timezone");

  // Try Cloudflare headers
  const cfCountry = headersList.get("cf-ipcountry");
  const cfCity = headersList.get("cf-ipcity");
  const cfTimezone = headersList.get("cf-timezone");

  // Check if we have real geo headers (production) or test headers
  const hasRealGeoHeaders = vercelCountry || cfCountry;

  // In development without real headers, use mock data
  if (!hasRealGeoHeaders && process.env.NODE_ENV === "development") {
    const continent = getContinent(DEV_MOCK_GEO.country);
    return {
      country: getCountryName(DEV_MOCK_GEO.country),
      countryCode: DEV_MOCK_GEO.country,
      region: DEV_MOCK_GEO.region,
      city: DEV_MOCK_GEO.city,
      timezone: DEV_MOCK_GEO.timezone,
      continent,
    };
  }

  // Use real headers (production) or test headers (from middleware)
  const countryCode = vercelCountry || cfCountry || "US";
  const continent = testContinent || getContinent(countryCode);

  return {
    country: getCountryName(countryCode),
    countryCode,
    region: vercelRegion || "",
    city: decodeURIComponent(vercelCity || cfCity || ""),
    timezone: vercelTimezone || cfTimezone || "America/New_York",
    continent,
  };
}

/**
 * Determine visitor segment based on geolocation (CLIENT-SAFE).
 * This function doesn't use server-only APIs, so it can be used in client components.
 */
export function determineSegment(geo: GeoLocation): VisitorSegment {
  const { city, countryCode, region } = geo;
  const cityLower = city.toLowerCase();

  // Check if international
  if (countryCode !== "US") {
    return "international";
  }

  // Check DC Metro area (local)
  if (
    DC_METRO_CITIES.some((c) => cityLower.includes(c.toLowerCase())) ||
    region === "VA" ||
    region === "MD" ||
    region === "DC"
  ) {
    return "local";
  }

  // Check healthcare hubs
  if (HEALTHCARE_HUBS.some((c) => cityLower.includes(c.toLowerCase()))) {
    return "healthcare";
  }

  // Check Drupal conference cities
  if (DRUPAL_CONFERENCE_CITIES.some((c) => cityLower.includes(c.toLowerCase()))) {
    return "drupal-community";
  }

  // Check tech hubs
  if (TECH_HUB_CITIES.some((c) => cityLower.includes(c.toLowerCase()))) {
    return "tech-hub";
  }

  return "general";
}

function getContinent(countryCode: string): string {
  const continentMap: Record<string, string> = {
    US: "North America",
    CA: "North America",
    MX: "North America",
    GB: "Europe",
    DE: "Europe",
    FR: "Europe",
    NL: "Europe",
    ES: "Europe",
    IT: "Europe",
    AT: "Europe",
    CZ: "Europe",
    IN: "Asia",
    CN: "Asia",
    JP: "Asia",
    AU: "Oceania",
    NZ: "Oceania",
    BR: "South America",
    JM: "Caribbean",
    // Add more as needed
  };
  return continentMap[countryCode] || "Unknown";
}

function getCountryName(countryCode: string): string {
  const countryNames: Record<string, string> = {
    US: "United States",
    CA: "Canada",
    MX: "Mexico",
    GB: "United Kingdom",
    DE: "Germany",
    FR: "France",
    NL: "Netherlands",
    ES: "Spain",
    IT: "Italy",
    AU: "Australia",
    IN: "India",
    JM: "Jamaica",
    // Add more as needed
  };
  return countryNames[countryCode] || countryCode;
}
