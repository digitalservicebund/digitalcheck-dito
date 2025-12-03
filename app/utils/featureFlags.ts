export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  enableZfl: "enableZfl",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
