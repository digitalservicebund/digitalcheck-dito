import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import SkipNoticeWrapper from "~/routes/dokumentation/interoperability/SkipNoticeWrapper.tsx";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import BindingRequirementsForm from "./dokumentation/interoperability/BindingRequirementsForm";

export default function DocumentationInteroperabilityAssessment() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS.title}`}
      />
      <div className="space-y-40">
        <div className={"space-y-8"}>
          <p className={"ds-subhead"}>EU-Interoperabilität</p>
          <Heading
            text={
              ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS.title
            }
            tagName="h1"
            look="ds-heading-02-reg"
            className="mb-16"
          />
        </div>
        <SkipNoticeWrapper>
          <BindingRequirementsForm
            nextUrl={ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.url}
          />
        </SkipNoticeWrapper>

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
