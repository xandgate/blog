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

  // US visitors (all segments except international) - Drupal/govtech focus
  const isUSVisitor = visitorData.segment !== "international";

  return (
    <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
      {isUSVisitor ? (
        <>20 years delivering secure, accessible platforms for federal & state agencies.</>
      ) : (
        <>
          The code is automated.{" "}
          The judgment is not.
        </>
      )}
    </Text>
  );
}
