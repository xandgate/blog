"use client";

import { useState, useEffect } from "react";
import { Column, Row, Text, Button, Badge } from "@once-ui-system/core";
import { useVisitorContext } from "./VisitorContextProvider";

// Set to true to always show the debug panel, false to hide in production
const FORCE_SHOW_DEBUG = false;

/**
 * Debug panel to inspect current visitor context.
 * Shows in development, or when FORCE_SHOW_DEBUG is true.
 */
export function GeoDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { geo, segment, affinity, isLoading, error } = useVisitorContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Hide in production unless forced
  if (!FORCE_SHOW_DEBUG && process.env.NODE_ENV === "production") {
    return null;
  }

  if (!isOpen) {
    return (
      <Button
        variant="tertiary"
        size="s"
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 9999,
          opacity: 0.7,
        }}
      >
        🌍 Geo Debug
      </Button>
    );
  }

  return (
    <Column
      gap="12"
      padding="16"
      radius="l"
      background="surface"
      border="neutral-alpha-medium"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 9998,
          maxWidth: "320px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}
    >
      <Row horizontal="between" vertical="center">
        <Text variant="label-strong-s">Geo Debug Panel</Text>
        <Button variant="tertiary" size="s" onClick={() => setIsOpen(false)}>
          ✕
        </Button>
      </Row>

      {isLoading && <Text variant="body-default-s">Loading...</Text>}

      {error && (
        <Text variant="body-default-s" onBackground="danger-strong">
          Error: {error.message}
        </Text>
      )}

      {!isLoading && !error && (
        <>
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Detected Location
            </Text>
            <Text variant="body-default-s">
              {geo?.city}, {geo?.region} {geo?.countryCode}
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {geo?.timezone}
            </Text>
          </Column>

          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Segment
            </Text>
            <Badge background="brand-alpha-weak" onBackground="brand-strong">
              {segment}
            </Badge>
          </Column>

          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Messaging
            </Text>
            <Text variant="body-default-xs">
              {segment === 'international' ? 'AI-Enabled Architect' : 'Drupal & GovTech'}
            </Text>
            <Text
              variant="body-default-xs"
              onBackground="neutral-weak"
              style={{ fontStyle: "italic", marginTop: "4px" }}
            >
              {affinity?.contextualMessage}
            </Text>
          </Column>
        </>
      )}

      <Column gap="4">
        <Text variant="label-default-s" onBackground="neutral-weak">
          Testing
        </Text>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Add query params to test:
          <br />
          • <code>?test-segment=local</code>
          <br />
          • <code>?test-city=Fairfax&test-region=VA</code>
          <br />
          • <code>?test-geo=gb</code> (international)
          <br />
          See src/proxy.ts for all options
        </Text>
        <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: "8px" }}>
          Check browser console for segment details
        </Text>
      </Column>
    </Column>
  );
}
