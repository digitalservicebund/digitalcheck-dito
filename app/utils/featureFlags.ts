export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  principles26: "principles26",
  showInterviewLeitfaden: "showInterviewLeitfaden",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
