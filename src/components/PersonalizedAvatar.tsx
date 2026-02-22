"use client";

import { Avatar } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";
import { person } from "@/resources";

interface PersonalizedAvatarProps {
  size?: "xs" | "s" | "m" | "l" | "xl";
  className?: string;
  style?: React.CSSProperties;
  marginRight?: string;
}

/**
 * Avatar component that adapts based on visitor geography and context.
 * Falls back to default avatar if personalized variant unavailable.
 */
export function PersonalizedAvatar({
  size = "m",
  className,
  style,
  marginRight,
}: PersonalizedAvatarProps) {
  const { affinity, isLoading } = useVisitorContext();

  // Use personalized avatar if available, otherwise default
  const avatarSrc = affinity?.avatarVariant || person.avatar;

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
      marginRight={marginRight as any}
    />
  );
}
