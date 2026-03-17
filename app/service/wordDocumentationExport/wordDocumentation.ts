import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { features } from "~/utils/featureFlags";
import { useWordDocumentationV1 } from "./wordDocumentationV1";
import { useWordDocumentationV2 } from "./wordDocumentationV2";

export function useWordDocumentation() {
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  const wordDocumentationV1 = useWordDocumentationV1();
  const wordDocumentationV2 = useWordDocumentationV2();

  return simplifiedFlow ? wordDocumentationV2 : wordDocumentationV1;
}
