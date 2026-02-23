"use client";

import { useState, useEffect } from "react";
import { Avatar } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";
import { person } from "@/resources";
import { getFeatureFlags } from "@/lib/features";

type SpacingToken = "4" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "80" | "104" | "128" | "160";

interface PersonalizedAvatarProps {
  size?: "xs" | "s" | "m" | "l" | "xl";
  className?: string;
  style?: React.CSSProperties;
  marginRight?: SpacingToken;
}

/**
 * Avatar component that adapts based on visitor geography and context.
 * Per AGENTS.md: Avatar variant selected to isolate geo-based familiarity effects.
 * Falls back to neutral avatar if personalized variant unavailable or opt-out.
 */
export function PersonalizedAvatar({
  size = "m",
  className,
  style,
  marginRight,
}: PersonalizedAvatarProps) {
  const { affinity, isLoading, isOptedOut } = useVisitorContext();
  const flags = getFeatureFlags();
  const [avatarSrc, setAvatarSrc] = useState<string>(person.avatar);
  const [hasError, setHasError] = useState(false);

  // Use personalized avatar only if enabled, not opted out, and experiment is on
  const shouldPersonalize =
    flags.personalization.enabled &&
    flags.personalization.avatarExperiment &&
    !isOptedOut &&
    !isLoading;

  // Determine the target avatar source
  const targetAvatarSrc = shouldPersonalize
    ? affinity?.avatarVariant || person.avatar
    : person.avatar;

  // Update avatar source when context changes
  useEffect(() => {
    if (!isLoading) {
      setAvatarSrc(targetAvatarSrc);
      setHasError(false);
    }
  }, [targetAvatarSrc, isLoading]);

  // Handle image load errors - fallback to neutral avatar
  useEffect(() => {
    if (hasError && avatarSrc !== person.avatar) {
      setAvatarSrc(person.avatar);
    }
  }, [hasError, avatarSrc]);

  // Test if image exists by trying to load it
  useEffect(() => {
    if (shouldPersonalize && targetAvatarSrc && targetAvatarSrc !== person.avatar) {
      const img = new Image();
      img.onerror = () => {
        // Image doesn't exist, use fallback
        setAvatarSrc(person.avatar);
        setHasError(true);
      };
      img.onload = () => {
        // Image exists, use it
        setAvatarSrc(targetAvatarSrc);
        setHasError(false);
      };
      img.src = targetAvatarSrc;
    } else {
      setAvatarSrc(person.avatar);
    }
  }, [shouldPersonalize, targetAvatarSrc]);

  return (
    <Avatar
      src={avatarSrc}
      size={size}
      className={className}
      style={{
        ...style,
        // Subtle loading state
        opacity: isLoading ? 0.8 : 1,
        transition: "opacity 0.3s ease",
      }}
      marginRight={marginRight}
    />
  );
}
