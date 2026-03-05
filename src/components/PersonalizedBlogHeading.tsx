"use client";

import { Heading, Text } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";

interface PersonalizedBlogHeadingProps {
  /** Default title (used for metadata and when no segment or no override). */
  fallbackTitle: string;
  /** Default description (used when no segment or no override). */
  fallbackDescription: string;
  /** Segment-specific title and description for the on-page heading. */
  bySegment?: {
    govtech?: { title: string; description: string };
    "ai-enabled"?: { title: string; description: string };
    international?: { title: string; description: string };
  };
}

/**
 * Blog page heading. Shows segment-specific title and description when available:
 * govtech → Drupal/gov platforms; international/ai-enabled → AI-augmented engineering.
 */
export function PersonalizedBlogHeading({
  fallbackTitle,
  fallbackDescription,
  bySegment,
}: PersonalizedBlogHeadingProps) {
  const { segment, isLoading } = useVisitorContext();

  // ai-enabled and international both get the AI engineering heading
  const variant =
    segment === "ai-enabled" || segment === "international"
      ? ("ai-enabled" as const)
      : ("govtech" as const);
  const segmentHeading = bySegment?.[variant];

  const title = segmentHeading?.title ?? fallbackTitle;
  const description = segmentHeading?.description ?? fallbackDescription;

  if (isLoading) {
    return (
      <>
        <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
          {fallbackTitle}
        </Heading>
      </>
    );
  }

  return (
    <>
      <Heading marginBottom="8" variant="heading-strong-xl" marginLeft="24">
        {title}
      </Heading>
      <Text
        variant="body-default-m"
        onBackground="neutral-weak"
        marginLeft="24"
        marginBottom="l"
      >
        {description}
      </Text>
    </>
  );
}
