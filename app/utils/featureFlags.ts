export const features = {
  showGesetzgebungsprozessOverview: "showGesetzgebungsprozessOverview",
  enableZfl: "enableZfl",
  principles26: "principles26",
  enableZflDaranArbeitenWir: "enableZflDaranArbeitenWir",
} as const;
export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
