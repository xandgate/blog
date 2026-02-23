/**
 * Privacy-friendly intent detection for content personalization.
 * Uses first-party data only: URL params, referrer, search terms, and local behavior tracking.
 * All data stored in localStorage (user's device only).
 */

import type { ContentInterest } from "../geo/types";

/**
 * Detect content interest from URL parameters (explicit intent).
 * Example: ?interest=frontend or ?interest=drupal or ?interest=govtech
 */
export function detectInterestFromURL(): ContentInterest | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const interest = params.get("interest")?.toLowerCase();

  if (interest === "frontend" || interest === "drupal" || interest === "govtech") {
    return interest;
  }

  return null;
}

/**
 * Detect interest from referrer (implicit intent).
 * If visitor comes from Drupal-related sites, likely interested in Drupal.
 */
export function detectInterestFromReferrer(): ContentInterest | null {
  if (typeof window === "undefined" || !document.referrer) return null;

  const referrer = document.referrer.toLowerCase();

  // Drupal-related domains
  const drupalDomains = [
    "drupal.org",
    "drupalcon",
    "drupalcamp",
    "drupal.stackexchange",
    "drupalize.me",
    "acquia.com",
    "pantheon.io",
  ];

  if (drupalDomains.some((domain) => referrer.includes(domain))) {
    return "drupal";
  }

  // Frontend-related domains (could expand this)
  const frontendDomains = [
    "reactjs.org",
    "vuejs.org",
    "svelte.dev",
    "nextjs.org",
    "vercel.com",
    "github.com/react",
    "github.com/vue",
    "github.com/svelte",
  ];

  if (frontendDomains.some((domain) => referrer.includes(domain))) {
    return "frontend";
  }

  // GovTech-related domains
  const govtechDomains = [
    ".gov",
    "digital.gov",
    "18f.gov",
    "gsa.gov",
    "govtech.com",
    "govloop.com",
    "statescoop.com",
    "fedscoop.com",
    "gcn.com",
    "nextgov.com",
    "meritalk.com",
    "governmenttechnology.com",
  ];

  if (govtechDomains.some((domain) => referrer.includes(domain))) {
    return "govtech";
  }

  return null;
}

/**
 * Detect interest from search terms (implicit intent).
 * Extracts search query from common search engines.
 */
export function detectInterestFromSearch(): ContentInterest | null {
  if (typeof window === "undefined" || !document.referrer) return null;

  const referrer = new URL(document.referrer);
  const searchParams = referrer.searchParams;

  // Google, Bing, DuckDuckGo, etc.
  const query = searchParams.get("q") || searchParams.get("query") || "";

  if (!query) return null;

  const queryLower = query.toLowerCase();

  // Drupal-related keywords
  const drupalKeywords = ["drupal", "drupal developer", "drupal architect", "drupal cms"];
  if (drupalKeywords.some((keyword) => queryLower.includes(keyword))) {
    return "drupal";
  }

  // Frontend-related keywords
  const frontendKeywords = [
    "react developer",
    "frontend developer",
    "svelte developer",
    "next.js developer",
    "ui developer",
    "frontend engineer",
  ];
  if (frontendKeywords.some((keyword) => queryLower.includes(keyword))) {
    return "frontend";
  }

  // GovTech-related keywords
  const govtechKeywords = [
    "government developer",
    "govtech",
    "gov tech",
    "federal developer",
    "federal contractor",
    "state government",
    "public sector developer",
    "government website",
    "digital services",
    "civic tech",
    "government cms",
    "fedramp",
    "section 508",
    "accessibility government",
  ];
  if (govtechKeywords.some((keyword) => queryLower.includes(keyword))) {
    return "govtech";
  }

  return null;
}

/**
 * Get stored interest from behavior tracking (localStorage).
 * This is updated as users interact with content.
 */
export function getStoredInterest(): ContentInterest | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("content_interest");
  if (stored === "frontend" || stored === "drupal") {
    return stored;
  }

  return null;
}

/**
 * Store detected interest in localStorage for future visits.
 */
export function storeInterest(interest: ContentInterest): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("content_interest", interest);
  localStorage.setItem("content_interest_updated", new Date().toISOString());
}

/**
 * Track content interaction to infer interest.
 * Call this when user clicks on or spends time with content.
 */
export function trackContentInteraction(
  slug: string,
  type: "project" | "blog",
  tags?: string[]
): void {
  if (typeof window === "undefined") return;

  // Get existing interactions
  const stored = localStorage.getItem("content_interactions");
  const interactions: Array<{ slug: string; type: string; tags?: string[]; timestamp: string }> =
    stored ? JSON.parse(stored) : [];

  // Add new interaction
  interactions.push({
    slug,
    type,
    tags,
    timestamp: new Date().toISOString(),
  });

  // Keep only last 20 interactions
  const recent = interactions.slice(-20);
  localStorage.setItem("content_interactions", JSON.stringify(recent));

  // Infer interest from interactions
  const inferredInterest = inferInterestFromInteractions(recent);
  if (inferredInterest) {
    storeInterest(inferredInterest);
  }
}

/**
 * Infer interest from interaction history.
 * Analyzes which types of content user engages with most.
 */
function inferInterestFromInteractions(
  interactions: Array<{ slug: string; type: string; tags?: string[] }>
): ContentInterest | null {
  if (interactions.length < 3) return null; // Need at least 3 interactions

  // Keywords that suggest Drupal interest
  const drupalKeywords = ["drupal", "cms", "content management", "enterprise"];
  // Keywords that suggest frontend interest
  const frontendKeywords = ["react", "svelte", "ui", "design system", "frontend", "component"];
  // Keywords that suggest govtech interest
  const govtechKeywords = ["government", "govtech", "federal", "state", "public sector", "civic", "accessibility", "508"];

  let drupalScore = 0;
  let frontendScore = 0;
  let govtechScore = 0;

  interactions.forEach((interaction) => {
    const slugLower = interaction.slug.toLowerCase();
    const tagsLower = (interaction.tags || []).join(" ").toLowerCase();

    // Check slug and tags for keywords
    const text = `${slugLower} ${tagsLower}`;

    if (drupalKeywords.some((keyword) => text.includes(keyword))) {
      drupalScore++;
    }
    if (frontendKeywords.some((keyword) => text.includes(keyword))) {
      frontendScore++;
    }
    if (govtechKeywords.some((keyword) => text.includes(keyword))) {
      govtechScore++;
    }
  });

  // If clear preference (at least 2x more interactions in one category)
  if (govtechScore >= 2 && govtechScore > drupalScore * 2 && govtechScore > frontendScore * 2) {
    return "govtech";
  }
  if (drupalScore >= 2 && drupalScore > frontendScore * 2 && drupalScore > govtechScore * 2) {
    return "drupal";
  }
  if (frontendScore >= 2 && frontendScore > drupalScore * 2 && frontendScore > govtechScore * 2) {
    return "frontend";
  }

  return null;
}

/**
 * Main function to detect content interest.
 * Priority: URL param > Referrer > Search > Stored > null
 */
export function detectContentInterest(): ContentInterest | null {
  // 1. Explicit URL parameter (highest priority)
  const urlInterest = detectInterestFromURL();
  if (urlInterest) {
    storeInterest(urlInterest);
    return urlInterest;
  }

  // 2. Referrer-based detection
  const referrerInterest = detectInterestFromReferrer();
  if (referrerInterest) {
    storeInterest(referrerInterest);
    return referrerInterest;
  }

  // 3. Search term detection
  const searchInterest = detectInterestFromSearch();
  if (searchInterest) {
    storeInterest(searchInterest);
    return searchInterest;
  }

  // 4. Stored interest from previous visits
  return getStoredInterest();
}
