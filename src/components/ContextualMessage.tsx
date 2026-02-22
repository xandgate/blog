"use client";

import { Text, RevealFx } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";

interface ContextualMessageProps {
  className?: string;
}

/**
 * Displays a contextual message tailored to the visitor's segment.
 * Great for adding personalized touches below main content.
 */
export function ContextualMessage({ className }: ContextualMessageProps) {
  const { affinity, isLoading } = useVisitorContext();

  if (isLoading || !affinity?.contextualMessage) {
    return null;
  }

  return (
    <RevealFx translateY="4" delay={0.3}>
      <Text
        variant="body-default-m"
        onBackground="neutral-weak"
        className={className}
        style={{ fontStyle: "italic" }}
      >
        {affinity.contextualMessage}
      </Text>
    </RevealFx>
  );
}
