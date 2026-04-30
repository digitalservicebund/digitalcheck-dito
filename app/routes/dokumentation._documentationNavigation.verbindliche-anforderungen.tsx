import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import { markdownCiteIEA } from "~/routes/dokumentation/euInteroperabilityFlow.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
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
        <Heading
          text={ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS.title}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-16"
        />
        <RichText
          markdown={dedent`
            Bitte dokumentieren Sie alle verbindlichen Anforderungen i. S. v. ${markdownCiteIEA(2, 15)}
        `}
        />
        <BindingRequirementsForm />
        <div>
          <DocumentationActions
            previousUrl={previousUrl}
            nextUrl={nextUrl ?? ROUTE_DOCUMENTATION_SUMMARY.url}
            showDownloadDraftButton
            showSavingTip
          />
        </div>
      </div>
    </>
  );
}
