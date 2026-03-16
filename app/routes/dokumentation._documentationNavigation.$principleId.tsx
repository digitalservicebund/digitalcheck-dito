import { useOutletContext, useParams } from "react-router";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { features } from "~/utils/featureFlags";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationPrincipleV1 from "./dokumentation/DocumentationPrincipleV1";
import DocumentationPrincipleV2 from "./dokumentation/DocumentationPrincipleV2";

export default function DocumentationPrinciple() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  if (simplifiedFlow) {
    return (
      <DocumentationPrincipleV2
        currentUrl={currentUrl}
        previousUrl={previousUrl}
        prinzip={prinzip}
      />
    );
  }

  return (
    <DocumentationPrincipleV1
      currentUrl={currentUrl}
      nextUrl={nextUrl}
      previousUrl={previousUrl}
      prinzip={prinzip}
    />
  );
}
