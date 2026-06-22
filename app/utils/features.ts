import { isProduction } from "@/config/stage.ts";

// central definition to ensure the feature is enabled / disabled cleanly
export const isIeaAssessmentEnabled = !isProduction;
