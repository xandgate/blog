"use client";

import { Avatar } from "@once-ui-system/core";
import { person } from "@/resources";

type SpacingToken = "4" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "80" | "104" | "128" | "160";

interface PersonalizedAvatarProps {
  size?: "xs" | "s" | "m" | "l" | "xl";
  className?: string;
  style?: React.CSSProperties;
  marginRight?: SpacingToken;
}

/**
 * Avatar on the about CTA. Single image for all visitors; no location-based variants.
 */
export function PersonalizedAvatar({
  size = "m",
  className,
  style,
  marginRight,
}: PersonalizedAvatarProps) {
  return (
    <Avatar
      src={person.avatar}
      size={size}
      className={className}
      style={style}
      marginRight={marginRight}
    />
  );
}
