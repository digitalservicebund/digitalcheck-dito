import { createContext, useContext } from "react";
import { FEATURE_FLAGS } from "~/utils/featureFlags.server";

export type FeatureFlags = Record<string, boolean>;

const FeatureFlagContext = createContext<FeatureFlags>({});

export function useFeatureFlag(flag: (typeof FEATURE_FLAGS)[number]) {
  const flags = useContext(FeatureFlagContext);
  return flags[flag];
}

export default FeatureFlagContext;
