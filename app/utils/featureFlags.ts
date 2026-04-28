export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  showInterviewLeitfaden: "showInterviewLeitfaden",
  showCoreVocabularies: "showCoreVocabularies",
  showIOEuRechtContent: "showIOEuRechtContent",
  showStrapiDrafts: "showStrapiDrafts",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
