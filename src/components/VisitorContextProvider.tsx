"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { VisitorContext, AffinityProfile, GeoLocation, VisitorSegment } from "@/lib/geo/types";

interface VisitorContextValue {
  geo: GeoLocation | null;
  affinity: AffinityProfile | null;
  segment: VisitorSegment;
  isLoading: boolean;
  error: Error | null;
}

const VisitorCtx = createContext<VisitorContextValue>({
  geo: null,
  affinity: null,
  segment: "general",
  isLoading: true,
  error: null,
});

export function useVisitorContext() {
  return useContext(VisitorCtx);
}

interface VisitorContextProviderProps {
  children: ReactNode;
  // Server-side detected context (passed from server component)
  initialContext?: VisitorContext;
}

/**
 * Provider that makes visitor context available throughout the app.
 * Can receive initial context from server-side detection or fetch client-side.
 */
export function VisitorContextProvider({
  children,
  initialContext,
}: VisitorContextProviderProps) {
  const [context, setContext] = useState<VisitorContextValue>({
    geo: initialContext?.geo || null,
    affinity: initialContext?.affinity || null,
    segment: initialContext?.segment || "general",
    isLoading: !initialContext,
    error: null,
  });

  useEffect(() => {
    // If we already have initial context from server, skip client fetch
    if (initialContext) {
      return;
    }

    // Fetch context from API endpoint
    async function fetchVisitorContext() {
      try {
        const response = await fetch("/api/visitor-context");
        if (!response.ok) {
          throw new Error("Failed to fetch visitor context");
        }
        const data: VisitorContext = await response.json();
        setContext({
          geo: data.geo,
          affinity: data.affinity,
          segment: data.segment,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setContext((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err : new Error("Unknown error"),
        }));
      }
    }

    fetchVisitorContext();
  }, [initialContext]);

  return <VisitorCtx.Provider value={context}>{children}</VisitorCtx.Provider>;
}
