export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  showInterviewLeitfaden: "showInterviewLeitfaden",
  showDCATAP: "showDCATAP",
  showCoreVocabularies: "showCoreVocabularies",
  showIOEuRechtContent: "showIOEuRechtContent",
  simplifiedPrincipleFlow: "simplifiedPrincipleFlow",
  showStrapiDrafts: "showStrapiDrafts",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
