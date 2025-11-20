import { ReactNode } from "react";
import FeatureFlagContext, {
  type FeatureFlags,
} from "~/contexts/FeatureFlagContext";

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
