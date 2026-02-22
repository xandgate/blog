"use client";

import { Text, Row, Badge } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";

interface PersonalizedGreetingProps {
  showBadge?: boolean;
  variant?: "heading-default-xl" | "body-default-l" | "label-default-s";
}

/**
 * Displays a personalized greeting based on visitor context.
 * Shows contextual badge for recognized segments.
 */
export function PersonalizedGreeting({
  showBadge = true,
  variant = "body-default-l",
}: PersonalizedGreetingProps) {
  const { affinity, segment, geo, isLoading } = useVisitorContext();

  if (isLoading) {
    return null; // Or a skeleton loader
  }

  const greeting = affinity?.greeting || "Welcome";

  // Badge labels for special segments
  const badgeLabels: Record<string, string> = {
    local: "📍 DC Metro",
    "tech-hub": "🚀 Tech Hub",
    "drupal-community": "💧 Drupal Fam",
    healthcare: "🏥 Healthcare",
    international: `🌍 ${geo?.country || "Global"}`,
  };

  const badge = badgeLabels[segment];

  return (
    <Row gap="8" vertical="center">
      <Text variant={variant} onBackground="neutral-weak">
        {greeting}
      </Text>
      {showBadge && badge && (
        <Badge
          background="brand-alpha-weak"
          onBackground="brand-strong"
          textVariant="label-default-s"
        >
          {badge}
        </Badge>
      )}
    </Row>
  );
}
