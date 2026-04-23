import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { features } from "~/utils/featureFlags";
import getFeatureFlag from "~/utils/featureFlags.server";
import DocumentationSummaryV1 from "./dokumentation/DocumentationSummaryV1";
import DocumentationSummaryV2 from "./dokumentation/DocumentationSummaryV2";

export const loader = () => {
  const simplifiedFlow = getFeatureFlag(features.simplifiedPrincipleFlow);
  return { simplifiedFlow };
};

export default function DocumentationSummary() {
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  return simplifiedFlow ? (
    <DocumentationSummaryV2 />
  ) : (
    <DocumentationSummaryV1 />
  );
}
