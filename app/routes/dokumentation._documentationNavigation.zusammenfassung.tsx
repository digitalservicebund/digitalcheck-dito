import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { features } from "~/utils/featureFlags";
import DocumentationSummaryV1 from "./dokumentation/DocumentationSummaryV1";
import DocumentationSummaryV2 from "./dokumentation/DocumentationSummaryV2";

export default function DocumentationSummary() {
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  return simplifiedFlow ? (
    <DocumentationSummaryV2 />
  ) : (
    <DocumentationSummaryV1 />
  );
}
