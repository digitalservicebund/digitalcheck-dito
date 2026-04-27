import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import { ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS } from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import EuInteroperabilityQuestions from "./dokumentation/EuInteroperabilityQuestions";

export default function DocumentationEuInteroperabilityRequirements() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.title}`}
      />
      <div className="space-y-40">
        <Heading
          text={ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.title}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-16"
        />
        <EuInteroperabilityQuestions />
        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
