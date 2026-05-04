import { Navigate, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import TabGroup from "~/components/Tabs/Tabs.tsx";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import FormVariant2 from "~/routes/dokumentation/interoperability/FormVariant2.tsx";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import FormVariant1 from "./dokumentation/interoperability/FormVariant1.tsx";

export default function DocumentationInteroperabilityAssessment() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationDataService();

  const isAccessible =
    !documentationData.euInteroperabilityOutcome ||
    documentationData.euInteroperabilityOutcome.outcomeId === "REQUIRED";

  if (!isAccessible) {
    return <Navigate replace to={ROUTE_DOCUMENTATION_SUMMARY.url} />;
  }

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.title}`}
      />
      <div className="space-y-40">
        <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
          Auswirkungen auf Interoperabilität
        </Heading>
        <p className={"ds-subhead"}>
          Bewerten Sie: Ermöglicht Ihre Regelung, dass die Verwaltungen
          verschiedener Mitgliedstaaten gut zusammenarbeiten können, wenn dies
          bei digitalen Angeboten erforderlich ist?
        </p>
        <div
          className={
            "**:[[role=tablist]]:rounded-b-md **:[[role=tablist]]:border **:[[role=tablist]]:border-t-0 **:[[role=tablist]]:border-yellow-900 **:[[role=tablist]]:bg-yellow-200 **:[[role=tablist]]:p-8"
          }
        >
          <p
            className={
              "rounded-t-md border border-b-0 border-yellow-900 bg-yellow-200 p-8"
            }
          >
            Wählen Sie ein Testszenario:
          </p>

          <TabGroup>
            <TabGroup.Tab label="Variante 1: Formular">
              <FormVariant1 />
            </TabGroup.Tab>
            <TabGroup.Tab label="Variante 2: Ausfüllhilfe">
              <FormVariant2 />
            </TabGroup.Tab>
          </TabGroup>
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
