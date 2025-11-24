import { createContext, useContext } from "react";

import { FeatureFlag } from "~/utils/featureFlags.ts";

export type FeatureFlags = Record<string, boolean>;

const FeatureFlagContext = createContext<FeatureFlags>({});

export function useFeatureFlag(flag: FeatureFlag) {
  const flags = useContext(FeatureFlagContext);
  return flags[flag];
}

export default FeatureFlagContext;
