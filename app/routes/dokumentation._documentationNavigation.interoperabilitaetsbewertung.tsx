import { Navigate, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import EUInteroperabilityAssessment from "~/routes/dokumentation/interoperability/EUInteroperabilityAssessment.tsx";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

export default function DocumentationInteroperabilityAssessment() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationDataService();

  const isAccessible =
    documentationData.euInteroperabilityOutcome?.outcomeId === "REQUIRED";

  if (!isAccessible) {
    return <Navigate replace to={ROUTE_DOCUMENTATION_SUMMARY.url} />;
  }

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.title}`}
      />
      <div className="space-y-40">
        <Heading
          text={ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.title}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-16"
        />
        <EUInteroperabilityAssessment />
        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl ?? ROUTE_DOCUMENTATION_SUMMARY.url}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
