import { isProduction } from "@/config/stage.ts";
const isE2ETest = Boolean(import.meta.env?.PUBLIC_E2E);

// central definition to ensure the feature is enabled / disabled cleanly
export const isIeaAssessmentEnabled = !isProduction || isE2ETest;
