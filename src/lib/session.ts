/**
 * Session utilities for consistent visitor identification.
 * Used for deterministic random assignments (e.g., avatar gender).
 */

/**
 * Get or create a session ID for the current visitor.
 * Uses localStorage for persistence across page loads.
 */
export function getSessionId(): string {
  if (typeof window === "undefined") {
    // Server-side: generate a temporary ID (will be replaced by client)
    return `temp-${Date.now()}`;
  }

  const key = "visitor_session_id";
  let sessionId = localStorage.getItem(key);

  if (!sessionId) {
    // Generate a new session ID
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, sessionId);
  }

  return sessionId;
}

/**
 * Hash a string to a number between 0 and max (exclusive).
 * Deterministic: same input always produces same output.
 */
function hashString(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % max;
}

/**
 * Get deterministic random gender assignment based on session ID.
 * Per AGENTS.md: avatar_gender = random_choice(['male','female'])
 * This ensures the same visitor always gets the same gender assignment.
 */
export function getAvatarGender(sessionId: string): "male" | "female" {
  const hash = hashString(sessionId, 100);
  return hash < 50 ? "male" : "female";
}

/**
 * Get experiment variant assignment (control, variant-a, variant-b).
 * Deterministic based on session ID.
 */
export function getExperimentVariant(
  sessionId: string,
): "control" | "variant-a" | "variant-b" {
  const hash = hashString(sessionId, 100);
  if (hash < 33) return "control";
  if (hash < 66) return "variant-a";
  return "variant-b";
}
