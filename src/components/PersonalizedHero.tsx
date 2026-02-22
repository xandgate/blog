"use client";

import { Column, Text, RevealFx, Badge } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";
import { PersonalizedAvatar } from "./PersonalizedAvatar";

interface PersonalizedHeroProps {
  defaultHeadline: React.ReactNode;
  defaultSubline: React.ReactNode;
}

/**
 * A hero section that adapts based on visitor geography and context.
 * Shows personalized greeting, contextual badges, and tailored messaging.
 */
export function PersonalizedHero({
  defaultHeadline,
  defaultSubline,
}: PersonalizedHeroProps) {
  const { segment, geo, affinity, isLoading } = useVisitorContext();

  // Contextual badges based on segment
  const getBadge = () => {
    if (isLoading) return null;

    const badges: Record<string, { label: string; icon?: string }> = {
      local: { label: "Local to DC Metro" },
      "tech-hub": { label: `Hello from ${geo?.city || "your city"}!` },
      "drupal-community": { label: "Fellow Drupalist" },
      healthcare: { label: "Healthcare Tech" },
      international: { label: `Welcome from ${geo?.country}` },
    };

    const badge = badges[segment];
    if (!badge) return null;

    return (
      <Badge
        background="accent-alpha-weak"
        onBackground="accent-strong"
        textVariant="label-default-s"
      >
        {badge.label}
      </Badge>
    );
  };

  return (
    <Column gap="16" horizontal="center" align="center">
      {/* Contextual badge */}
      <RevealFx translateY="4" delay={0.1}>
        {getBadge()}
      </RevealFx>

      {/* Avatar with personalization */}
      <RevealFx translateY="4" delay={0.2}>
        <PersonalizedAvatar size="xl" />
      </RevealFx>

      {/* Main content */}
      <Column gap="8" horizontal="center" align="center">
        <RevealFx translateY="4" delay={0.3}>
          <Text variant="display-strong-l" wrap="balance">
            {defaultHeadline}
          </Text>
        </RevealFx>

        <RevealFx translateY="8" delay={0.4}>
          <Text
            variant="heading-default-xl"
            onBackground="neutral-weak"
            wrap="balance"
          >
            {defaultSubline}
          </Text>
        </RevealFx>

        {/* Contextual message */}
        {affinity?.contextualMessage && (
          <RevealFx translateY="8" delay={0.5}>
            <Text
              variant="body-default-m"
              onBackground="neutral-medium"
              style={{ fontStyle: "italic", maxWidth: "480px" }}
              wrap="balance"
            >
              {affinity.contextualMessage}
            </Text>
          </RevealFx>
        )}
      </Column>
    </Column>
  );
}
