/**
 * Feature flags for controlling personalization experiments.
 * Configure via environment variables or feature flag service.
 */

export interface FeatureFlags {
  personalization: {
    enabled: boolean;
    avatarExperiment: boolean;
    greetingExperiment: boolean;
    contextualMessageExperiment: boolean;
    contentProminenceExperiment: boolean;
  };
  transparency: {
    showNotice: boolean;
    allowOptOut: boolean;
  };
  experiments: {
    enabled: boolean;
    trackMetrics: boolean;
  };
}

/**
 * Get feature flags from environment or defaults
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    personalization: {
      enabled: process.env.NEXT_PUBLIC_PERSONALIZATION_ENABLED !== "false",
      // Avatar personalization disabled by default (can be enabled for specific experiments)
      avatarExperiment: process.env.NEXT_PUBLIC_AVATAR_EXPERIMENT === "true",
      // Content-based personalization enabled by default
      contentProminenceExperiment:
        process.env.NEXT_PUBLIC_CONTENT_PROMINENCE_EXPERIMENT !== "false",
      greetingExperiment:
        process.env.NEXT_PUBLIC_GREETING_EXPERIMENT !== "false",
      contextualMessageExperiment:
        process.env.NEXT_PUBLIC_CONTEXTUAL_MESSAGE_EXPERIMENT !== "false",
    },
    transparency: {
      showNotice: process.env.NEXT_PUBLIC_SHOW_TRANSPARENCY_NOTICE !== "false",
      allowOptOut: process.env.NEXT_PUBLIC_ALLOW_OPT_OUT !== "false",
    },
    experiments: {
      enabled: process.env.NEXT_PUBLIC_EXPERIMENTS_ENABLED === "true",
      trackMetrics: process.env.NEXT_PUBLIC_TRACK_METRICS === "true",
    },
  };
}
