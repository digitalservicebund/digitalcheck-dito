import fs from "node:fs";
import path from "node:path";

const FEATURE_FLAGS_PATH = path.join(
  process.cwd(),
  process.env.FEATURE_FLAGS_PATH ?? "feature-flags.json",
);

export const FEATURE_FLAGS = [
  "show-gesetzgebungsprozess-overview",
  "digital-documentation-alternative-explanation",
] as const;
type FeatureFlags = Record<(typeof FEATURE_FLAGS)[number], boolean>;

const CACHE_TTL = 60 * 1000; // 1 minute

// Sets all feature flags to false by default
const defaultFeatureFlags: FeatureFlags = FEATURE_FLAGS.reduce((acc, flag) => {
  acc[flag] = false;
  return acc;
}, {} as FeatureFlags);

// A simple cache to avoid reading the feature flags file on every request
let featureFlagCache = {
  data: defaultFeatureFlags,
  timestamp: 0,
};

export function getFeatureFlags(): FeatureFlags {
  console.log("cwd", process.cwd());
  console.log("feature flags path", FEATURE_FLAGS_PATH);
  const now = Date.now();
  if (now - featureFlagCache.timestamp < CACHE_TTL) {
    return featureFlagCache.data;
  }

  try {
    const fileContent = fs.readFileSync(FEATURE_FLAGS_PATH, "utf-8");
    const flags = JSON.parse(fileContent) as FeatureFlags;
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

export default function getFeatureFlag(
  name: (typeof FEATURE_FLAGS)[number],
): boolean {
  const flags = getFeatureFlags();
  return flags[name] === true;
}
