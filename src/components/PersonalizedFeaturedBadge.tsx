"use client";

import { Badge, Row, Line, Text } from "@once-ui-system/core";
import { usePersonalizedFeatured } from "./PersonalizedContent";
import { home } from "@/resources";

/**
 * Featured badge that adapts based on visitor context.
 * Shows personalized featured project/blog post when available.
 */
export function PersonalizedFeaturedBadge() {
  const personalizedHref = usePersonalizedFeatured();
  const href = personalizedHref || home.featured.href;

  if (!home.featured.display) {
    return null;
  }

  return (
    <Badge
      background="brand-alpha-weak"
      paddingX="12"
      paddingY="4"
      onBackground="neutral-strong"
      textVariant="label-default-s"
      arrow={false}
      href={href}
    >
      <Row paddingY="2">{home.featured.title}</Row>
    </Badge>
  );
}
