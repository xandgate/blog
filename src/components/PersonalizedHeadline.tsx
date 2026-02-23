"use client";

import { Heading, Text } from "@once-ui-system/core";
import { useEffect, useState } from "react";
import type { VisitorSegment } from "@/lib/geo/types";

interface PersonalizedHeadlineProps {
  fallback: React.ReactNode;
}

interface VisitorData {
  segment: VisitorSegment;
  greeting: string;
  contextualMessage: string;
}

export function PersonalizedHeadline({ fallback }: PersonalizedHeadlineProps) {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVisitorContext() {
      try {
        const response = await fetch("/api/visitor-context");
        if (response.ok) {
          const data = await response.json();
          setVisitorData({
            segment: data.affinity.segment,
            greeting: data.affinity.greeting,
            contextualMessage: data.affinity.contextualMessage,
          });
        }
      } catch (error) {
        console.error("Failed to fetch visitor context:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVisitorContext();
  }, []);

  // Show fallback while loading or if fetch fails
  if (isLoading || !visitorData) {
    return <>{fallback}</>;
  }

  // US visitors (all segments except international) - Drupal/govtech focus
  const isUSVisitor = visitorData.segment !== "international";

  return (
    <>
      <Heading wrap="balance" variant="display-strong-l">
        {isUSVisitor ? (
          <>
            <Text as="span" size="xl" weight="strong">
              Drupal architect.
            </Text>{" "}
            Government platforms.
          </>
        ) : (
          <>
            <Text as="span" size="xl" weight="strong">
              AI writes code.
            </Text>{" "}
            I architect outcomes.
          </>
        )}
      </Heading>
    </>
  );
}
