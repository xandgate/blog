"use client";

import { useEffect } from "react";
import { useVisitorContext } from "./VisitorContextProvider";
import { getFeatureFlags } from "@/lib/features";

/**
 * Component that displays current visitor segment in the UI.
 * Useful for debugging and understanding personalization.
 * Can be shown as a badge or in console.
 */
export function SegmentIndicator({ showInUI = false }: { showInUI?: boolean }) {
  const { geo, segment, affinity, isLoading } = useVisitorContext();
  const flags = getFeatureFlags();

  // Log segment info to console for debugging
  useEffect(() => {
    if (!isLoading && flags.personalization.enabled) {
      console.log("🎯 Visitor Segment:", {
        segment,
        location: `${geo?.city || "Unknown"}, ${geo?.region || ""} ${geo?.countryCode || ""}`,
        country: geo?.country,
        timezone: geo?.timezone,
        featuredContent: affinity?.featuredContent,
        greeting: affinity?.greeting,
        avatarVariant: affinity?.avatarVariant,
      });
    }
  }, [segment, geo, affinity, isLoading, flags.personalization.enabled]);

  if (!showInUI || isLoading) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 9997,
        padding: "8px 12px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: "monospace",
      }}
    >
      <div>Segment: <strong>{segment}</strong></div>
      <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "4px" }}>
        {geo?.city}, {geo?.countryCode}
      </div>
    </div>
  );
}
