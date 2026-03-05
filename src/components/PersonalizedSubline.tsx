"use client";

import { Text } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";

interface PersonalizedSublineProps {
  fallback: React.ReactNode;
  bySegment?: {
    govtech?: React.ReactNode;
    "ai-enabled"?: React.ReactNode;
  };
}

/**
 * Home page subline. Renders segment-specific copy when available.
 * govtech → enterprise/government credibility, no AI.
 * ai-enabled → AI practitioner framing, high-stakes context.
 * Falls back to content.tsx home.subline for undetected segments.
 */
export function PersonalizedSubline({ fallback, bySegment }: PersonalizedSublineProps) {
  const { segment, isLoading } = useVisitorContext();

  const segmentKey = segment as keyof typeof bySegment;
  const content =
    !isLoading && bySegment && bySegment[segmentKey]
      ? bySegment[segmentKey]
      : fallback;

  return (
    <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
      {content}
    </Text>
  );
}
