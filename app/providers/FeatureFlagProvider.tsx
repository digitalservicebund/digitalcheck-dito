import type { ReactNode } from "react";
import type { FeatureFlags } from "~/contexts/FeatureFlagContext";
import FeatureFlagContext from "~/contexts/FeatureFlagContext";

export default function FeatureFlagProvider({
  children,
  featureFlags,
}: Readonly<{
  children: ReactNode;
  featureFlags: FeatureFlags;
}>) {
  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
