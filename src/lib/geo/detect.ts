/**
 * Client-safe utilities for geo-based personalization.
 * Server-only detection is in detect-server.ts
 */

import {
  GeoLocation,
  VisitorSegment,
  TECH_HUB_CITIES,
  DC_METRO_CITIES,
  DRUPAL_CONFERENCE_CITIES,
  HEALTHCARE_HUBS,
} from "./types";

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
