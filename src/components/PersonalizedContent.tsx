"use client";

import { useMemo } from "react";
import { useVisitorContext } from "./VisitorContextProvider";
import { getFeatureFlags } from "@/lib/features";

// Type for post data (matches what getPosts returns)
export interface PostData {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    images?: string[];
    tag?: string;
    [key: string]: unknown;
  };
  content: string;
  [key: string]: unknown;
}

/**
 * Hook that personalizes content ordering based on visitor context.
 * Shows relevant projects/blog posts first without changing the actual content.
 * This is more ethical and trust-building than avatar personalization.
 * 
 * @param posts - Array of posts to personalize (must be fetched server-side)
 * @param defaultRange - Range of posts to return [start, end?]
 * @param exclude - Slugs to exclude from results
 */
export function usePersonalizedContent(
  posts: PostData[],
  defaultRange: [number, number?] = [1, 3],
  exclude: string[] = []
) {
  const { affinity, isLoading, isOptedOut } = useVisitorContext();
  const flags = getFeatureFlags();

  return useMemo(() => {
    // Filter excluded posts
    const filteredPosts = exclude.length
      ? posts.filter((post) => !exclude.includes(post.slug))
      : posts;

    // Sort by date (newest first)
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    });

    // If personalization is disabled or opted out, return default order
    const shouldPersonalize =
      flags.personalization.enabled &&
      flags.personalization.contentProminenceExperiment &&
      !isOptedOut &&
      !isLoading &&
      affinity?.featuredContent;

    if (!shouldPersonalize) {
      // Return default range
      const [start, end] = defaultRange;
      return sortedPosts.slice(start - 1, end ? end : sortedPosts.length);
    }

    // Extract slug from featured content path (e.g., "/work/project-slug" -> "project-slug")
    const featuredPath = affinity.featuredContent || "";
    const pathParts = featuredPath.split("/").filter(Boolean);
    const featuredSlug = pathParts[pathParts.length - 1] || "";

    // Find the featured content post
    const featuredPost = sortedPosts.find((post) => post.slug === featuredSlug);

    if (!featuredPost) {
      // Featured content doesn't exist, return default
      const [start, end] = defaultRange;
      return sortedPosts.slice(start - 1, end ? end : sortedPosts.length);
    }

    // Reorder: featured post first, then others
    const otherPosts = sortedPosts.filter((post) => post.slug !== featuredPost.slug);
    const reordered = [featuredPost, ...otherPosts];

    // Return the requested range
    const [start, end] = defaultRange;
    return reordered.slice(start - 1, end ? end : reordered.length);
  }, [
    posts,
    defaultRange,
    exclude,
    affinity?.featuredContent,
    isLoading,
    isOptedOut,
    flags.personalization.enabled,
    flags.personalization.contentProminenceExperiment,
  ]);
}

/**
 * Get personalized featured project/blog post slug
 */
export function usePersonalizedFeatured() {
  const { affinity, isLoading, isOptedOut } = useVisitorContext();
  const flags = getFeatureFlags();

  const shouldPersonalize =
    flags.personalization.enabled &&
    flags.personalization.contentProminenceExperiment &&
    !isOptedOut &&
    !isLoading;

  return shouldPersonalize ? affinity?.featuredContent : null;
}
