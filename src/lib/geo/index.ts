// Geo-based personalization utilities
export * from "./types";
export * from "./detect"; // Client-safe utilities
export * from "./affinity";

// Server-only exports (must be imported explicitly)
export { detectGeoLocation } from "./detect-server";
