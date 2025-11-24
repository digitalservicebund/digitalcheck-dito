import fs from "node:fs";
import { FeatureFlag, FeatureFlags, features } from "~/utils/featureFlags.ts";

const FEATURE_FLAGS_PATH =
  process.env.FEATURE_FLAGS_PATH ?? "/etc/feature-flags/feature-flags.json";

const CACHE_TTL = 60 * 1000; // 1 minute

// Sets all feature flags to false by default
const defaultFeatureFlags: FeatureFlags = <FeatureFlags>(
  Object.fromEntries(Object.keys(features).map((flagName) => [flagName, false]))
);

// A simple cache to avoid reading the feature flags file on every request
let featureFlagCache = {
  data: defaultFeatureFlags,
  timestamp: 0,
};

export function getFeatureFlags(): FeatureFlags {
  const now = Date.now();
  if (now - featureFlagCache.timestamp < CACHE_TTL) {
    return featureFlagCache.data;
  }

  try {
    const fileContent = fs.readFileSync(FEATURE_FLAGS_PATH, "utf-8");
    const flags = JSON.parse(fileContent) as FeatureFlags;

    const unexpected = Object.keys(flags).filter(
      (flagName) => !(flagName in features),
    );
    if (unexpected.length > 0) {
      console.warn(
        `Unexpected keys in feature flags file: ${unexpected.join(", ")}`,
        { path: FEATURE_FLAGS_PATH },
      );
    }

    featureFlagCache = {
      data: flags,
      timestamp: now,
    };
    return flags;
  } catch (error) {
    console.warn("Failed to read feature flags file:", error);
    return defaultFeatureFlags;
  }
}

export default function getFeatureFlag(name: FeatureFlag): boolean {
  const flags = getFeatureFlags();
  return flags[name];
}
