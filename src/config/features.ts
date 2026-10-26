// central registry for feature flags
// example: export const myFeatureFlag = !isProduction // true

import { isProduction } from "./stage";

export const showLaender = !isProduction;
