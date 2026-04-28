import { useOutletContext, useParams } from "react-router";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationPrincipleV2 from "./dokumentation/DocumentationPrincipleV2";

export default function DocumentationPrinciple() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  return (
    <DocumentationPrincipleV2
      currentUrl={currentUrl}
      nextUrl={nextUrl}
      previousUrl={previousUrl}
      prinzip={prinzip}
    />
  );
}
