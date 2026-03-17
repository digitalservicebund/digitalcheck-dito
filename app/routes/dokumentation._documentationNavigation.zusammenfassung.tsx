import { useLoaderData } from "react-router";
import { features } from "~/utils/featureFlags";
import getFeatureFlag from "~/utils/featureFlags.server";
import DocumentationSummaryV1 from "./dokumentation/DocumentationSummaryV1";
import DocumentationSummaryV2 from "./dokumentation/DocumentationSummaryV2";

export const loader = () => {
  const simplifiedFlow = getFeatureFlag(features.simplifiedPrincipleFlow);
  return { simplifiedFlow };
};

export default function DocumentationSummary() {
  const { simplifiedFlow } = useLoaderData<typeof loader>();

  return simplifiedFlow ? (
    <DocumentationSummaryV2 />
  ) : (
    <DocumentationSummaryV1 />
  );
}
