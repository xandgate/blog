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

  // Explicit focus overrides take priority; fall back to geo-based detection.
  // ai-enabled segment (manual or international geo) → Agentic Musings
  // everything else → GovTech
  const isAgenticFocus =
    visitorData.segment === "ai-enabled" || visitorData.segment === "international";

  return (
    <>
      <Heading wrap="balance" variant="display-strong-l">
        {isAgenticFocus ? (
          <>
            <Text as="span" size="xl" weight="strong">
              AI writes code.
            </Text>{" "}
            I architect outcomes.
          </>
        ) : (
          <>
            <Text as="span" size="xl" weight="strong">
              Drupal architect.
            </Text>{" "}
            Government platforms.
          </>
        )}
      </Heading>
    </>
  );
}
