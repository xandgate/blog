import { headers } from "next/headers";
import type { GeoLocation } from "./types";

/**
 * Mock geo for local development when no real geo headers exist.
 * Set countryCode to "US" for govtech focus, or any other (e.g. "GB") for international/agentic.
 */
const DEV_MOCK_GEO = {
  countryCode: "US",
  region: "VA",
  city: "Fairfax",
  timezone: "America/New_York",
};

/**
 * Detect visitor geolocation from request headers (SERVER-ONLY).
 * Supports Vercel, Cloudflare, and optional x-test-country for testing.
 * In development with no geo headers, uses DEV_MOCK_GEO.
 */
export async function detectGeoLocation(): Promise<GeoLocation> {
  const headersList = await headers();

  // Testing: override country via header (e.g. curl -H "x-test-country: GB" ...)
  const testCountry = headersList.get("x-test-country");

  const vercelCountry = headersList.get("x-vercel-ip-country");
  const vercelRegion = headersList.get("x-vercel-ip-country-region");
  const vercelCity = headersList.get("x-vercel-ip-city");
  const vercelTimezone = headersList.get("x-vercel-ip-timezone");
  const cfCountry = headersList.get("cf-ipcountry");
  const cfCity = headersList.get("cf-ipcity");
  const cfTimezone = headersList.get("cf-timezone");

  const hasRealGeo = vercelCountry || cfCountry;

  if (!hasRealGeo && process.env.NODE_ENV === "development") {
    const code = testCountry || DEV_MOCK_GEO.countryCode;
    return {
      country: getCountryName(code),
      countryCode: code,
      region: DEV_MOCK_GEO.region,
      city: DEV_MOCK_GEO.city,
      timezone: DEV_MOCK_GEO.timezone,
      continent: getContinent(code),
    };
  }

  const countryCode = testCountry || vercelCountry || cfCountry || "US";
  return {
    country: getCountryName(countryCode),
    countryCode,
    region: vercelRegion || "",
    city: decodeURIComponent(vercelCity || cfCity || ""),
    timezone: vercelTimezone || cfTimezone || "America/New_York",
    continent: getContinent(countryCode),
  };
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
