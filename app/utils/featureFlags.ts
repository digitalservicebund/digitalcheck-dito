export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  simplifiedPrincipleFlow: "simplifiedPrincipleFlow",
  showStrapiDrafts: "showStrapiDrafts",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
