import { createContext, useContext } from "react";

import { FeatureFlag } from "~/utils/featureFlags.ts";
import { isPreview } from "~/utils/preview.ts";

export type FeatureFlags = Record<string, boolean>;

const FeatureFlagContext = createContext<FeatureFlags>({});

export function useFeatureFlag(flag: FeatureFlag) {
  const flags = useContext(FeatureFlagContext);
  if (isPreview) return true; // in preview builds, all feature flags are enabled by default
  return flags[flag];
}

export default FeatureFlagContext;
