"use client";

import { Text } from "@once-ui-system/core";
import { useEffect, useState } from "react";
import type { VisitorSegment } from "@/lib/geo/types";

interface PersonalizedSublineProps {
  fallback: React.ReactNode;
}

interface VisitorData {
  segment: VisitorSegment;
  contextualMessage: string;
}

export function PersonalizedSubline({ fallback }: PersonalizedSublineProps) {
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
  const isAgenticFocus =
    visitorData.segment === "ai-enabled" || visitorData.segment === "international";

  return (
    <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
      {isAgenticFocus ? (
        <>
          The code is automated.{" "}
          The judgment is not.
        </>
      ) : (
        <>
          The requirements are long.{" "}
          The systems are built.
        </>
      )}
    </Text>
  );
}
