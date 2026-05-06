const stage =
  import.meta.env?.PUBLIC_STAGE || process.env.PUBLIC_STAGE || "production";

export const isProduction = stage === "production";
export const isStaging = stage === "staging";
export const isPreview = stage === "preview";
export const isDevelopment = stage === "development";
