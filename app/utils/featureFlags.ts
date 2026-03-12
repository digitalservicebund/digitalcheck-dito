export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  showInterviewLeitfaden: "showInterviewLeitfaden",
  showDCATAP: "showDCATAP",
  showIOEuRechtContent: "showIOEuRechtContent",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
