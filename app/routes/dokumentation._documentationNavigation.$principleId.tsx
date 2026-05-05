import { useNavigationContext } from "~/contexts/DocumentationNavigationContext";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { features } from "~/utils/featureFlags";
import { useLocation } from "~/utils/routerCompat";
import DocumentationPrincipleV1 from "./dokumentation/DocumentationPrincipleV1";
import DocumentationPrincipleV2 from "./dokumentation/DocumentationPrincipleV2";

function usePrincipleId(): string | undefined {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const dokIdx = parts.indexOf("dokumentation");
  return dokIdx >= 0 ? parts[dokIdx + 1] : undefined;
}

export default function DocumentationPrinciple() {
  const principleId = usePrincipleId();
  const { currentUrl, nextUrl, previousUrl, prinzips } = useNavigationContext();
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip) return null;

  if (simplifiedFlow) {
    return (
      <DocumentationPrincipleV2
        currentUrl={currentUrl}
        nextUrl={nextUrl}
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
