"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackContentInteraction } from "@/lib/intent/detect";
import { getFeatureFlags } from "@/lib/features";

/**
 * Component that tracks content interactions to infer visitor interest.
 * Tracks when users visit project/blog pages to learn their preferences.
 * All tracking is client-side and stored in localStorage (privacy-friendly).
 * 
 * Note: We infer tags from the slug itself (no server-side file reading needed).
 */
export function ContentInteractionTracker() {
  const pathname = usePathname();
  const flags = getFeatureFlags();

  useEffect(() => {
    // Only track if personalization is enabled
    if (!flags.personalization.enabled) {
      return;
    }

    // Extract slug from pathname
    // Examples: /work/building-once-ui -> "building-once-ui"
    //           /blog/from-typing-to-thinking -> "from-typing-to-thinking"
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length < 2) return; // Not a project/blog page

    const [type, slug] = pathParts;
    if (type !== "work" && type !== "blog") return;

    // Infer tags from slug (no server-side file reading needed)
    const slugLower = slug.toLowerCase();
    const tags: string[] = [];

    // Keyword detection from slug
    if (slugLower.includes("drupal")) {
      tags.push("drupal");
    }
    if (
      slugLower.includes("react") ||
      slugLower.includes("svelte") ||
      slugLower.includes("frontend") ||
      slugLower.includes("ui") ||
      slugLower.includes("design-system") ||
      slugLower.includes("component")
    ) {
      tags.push("frontend");
    }

    // Track the interaction
    trackContentInteraction(slug, type === "work" ? "project" : "blog", tags);
  }, [pathname, flags.personalization.enabled]);

  return null; // This component doesn't render anything
}
