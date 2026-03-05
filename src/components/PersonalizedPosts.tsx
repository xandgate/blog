"use client";

import { useVisitorContext } from "./VisitorContextProvider";
import { Posts } from "@/components/blog/Posts";
import type { PostData } from "@/components/PersonalizedContent";

interface PersonalizedPostsProps {
  posts: PostData[];
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
}

/**
 * Segment-filtered blog post list.
 *
 * govtech     → only "GovTech" tagged posts (no AI content visible)
 * ai-enabled  → only "AI Engineering" tagged posts (no GovTech content visible)
 * everything else → all posts (default, undetected segment)
 *
 * This keeps the two audiences completely separate: government/enterprise visitors
 * never see AI engineering content, and AI engineering visitors don't see GovTech
 * content unless they manually switch focus.
 */
export function PersonalizedPosts({
  posts,
  range,
  columns,
  thumbnail,
  direction,
}: PersonalizedPostsProps) {
  const { segment, isLoading } = useVisitorContext();

  const filteredPosts = isLoading
    ? posts
    : segment === "govtech"
    ? posts.filter((p) => p.metadata.tag === "GovTech")
    : segment === "ai-enabled"
    ? posts.filter((p) => p.metadata.tag === "AI Engineering")
    : posts;

  return (
    <Posts
      posts={filteredPosts}
      range={range}
      columns={columns}
      thumbnail={thumbnail}
      direction={direction}
    />
  );
}
