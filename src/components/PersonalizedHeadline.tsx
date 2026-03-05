"use client";

import { Heading } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";

interface PersonalizedHeadlineProps {
  fallback: React.ReactNode;
  bySegment?: {
    govtech?: React.ReactNode;
    "ai-enabled"?: React.ReactNode;
  };
}

/**
 * Home page headline. Renders segment-specific copy when available.
 * govtech → government/enterprise positioning (no AI mention).
 * ai-enabled → AI engineering practitioner positioning.
 * Falls back to content.tsx home.headline for undetected segments.
 */
export function PersonalizedHeadline({ fallback, bySegment }: PersonalizedHeadlineProps) {
  const { segment, isLoading } = useVisitorContext();

  const segmentKey = segment as keyof typeof bySegment;
  const content =
    !isLoading && bySegment && bySegment[segmentKey]
      ? bySegment[segmentKey]
      : fallback;

  return (
    <Heading wrap="balance" variant="display-strong-l">
      {content}
    </Heading>
  );
}
