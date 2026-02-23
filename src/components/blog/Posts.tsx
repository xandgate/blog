"use client";

import { Grid } from "@once-ui-system/core";
import Post from "./Post";
import { usePersonalizedContent, type PostData } from "@/components/PersonalizedContent";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  posts: PostData[]; // Required: posts must be fetched server-side and passed as props
}

/**
 * Posts component with optional content-based personalization.
 * Reorders blog posts to show most relevant first based on visitor context.
 */
export function Posts({
  range = [1],
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  posts,
}: PostsProps) {
  // Normalize range to [number, number?] format
  const normalizedRange: [number, number?] =
    range.length === 2 ? [range[0], range[1]] : [range[0]];

  // Use personalized content ordering if enabled
  const displayedBlogs = usePersonalizedContent(posts, normalizedRange, exclude);

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
