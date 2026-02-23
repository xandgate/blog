"use client";

import { Text, Row, Badge } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";
import { getCombinedGreeting } from "@/lib/geo/affinity";
import { getFeatureFlags } from "@/lib/features";

interface PersonalizedGreetingProps {
  showBadge?: boolean;
  variant?: "heading-default-xl" | "body-default-l" | "label-default-s";
  useTimeBased?: boolean;
}

/**
 * Displays a personalized greeting based on visitor context.
 * Shows contextual badge for recognized segments.
 * Can combine time-based prefix with segment greeting.
 */
export function PersonalizedGreeting({
  showBadge = true,
  variant = "body-default-l",
  useTimeBased = true,
}: PersonalizedGreetingProps) {
  const { affinity, segment, geo, isLoading, isOptedOut } = useVisitorContext();
  const flags = getFeatureFlags();

  if (isLoading || isOptedOut || !flags.personalization.enabled) {
    return (
      <Text variant={variant} onBackground="neutral-weak">
        Welcome
      </Text>
    );
  }

  // Use combined greeting (time-based + segment) if enabled
  let greeting: string;
  if (useTimeBased && flags.personalization.greetingExperiment && geo?.timezone) {
    greeting = getCombinedGreeting(segment, geo.timezone);
  } else {
    greeting = affinity?.greeting || "Welcome";
  }

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
