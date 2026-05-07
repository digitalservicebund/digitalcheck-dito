import { useState } from "react";
import { useOutletContext } from "react-router";
import Button from "~/components/Button.tsx";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_TITLE,
  ROUTE_INTEROPERABILITY,
} from "~/resources/staticRoutes";
import {
  defaultTitleValues,
  policyHeaderSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import EuInteroperabilityOutcomeForm from "~/routes/dokumentation/interoperability/EuInteroperabilityOutcomeForm.tsx";
import { dedent } from "~/utils/dedentMultilineStrings";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import EuInteroperabilityQuestions from "./dokumentation/interoperability/EuInteroperabilityQuestions.tsx";

const { info } = digitalDocumentation;

export default function DocumentationTitle() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData, setPolicyTitle } = useDocumentationDataService();

  const form = useSyncedForm({
    schema: policyHeaderSchema,
    defaultValues: defaultTitleValues,
    currentUrl,
    setDataCallback: setPolicyTitle,
    storedData: documentationData.policyTitle,
    nextUrl,
  });

  const [showExtendedForm, setShowExtendedForm] = useState(false);

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_TITLE.title}`} />
      <div className="space-y-40">
        <Heading
          text={"Ihr Regelungsvorhaben"}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-40"
        />
        <form {...form.getFormProps()} className="space-y-32">
          <Input scope={form.scope("title")} warningInsteadOfError>
            {info.inputTitle.label}
            <HelpButton
              sectionId="title"
              title="Hinweis zu Titel des Regelungsvorhabens"
            >
              Geben Sie hier den offiziellen Titel Ihres Regelungsvorhabens ein.
              Dieser Titel wird in der fertigen Dokumentation verwendet.
            </HelpButton>
          </Input>
          <Input scope={form.scope("organization")} warningInsteadOfError>
            Ministerium / Organisation
          </Input>
          <h2 className={"ds-heading-03-reg"}>Bezug zu EU-Interoperabilität</h2>
          <RichText
            markdown={dedent`
          Ergab die Vorprüfung Bezug zu EU-Interoperabilität?
          
          `}
          />
          <EuInteroperabilityOutcomeForm />
          <Button
            type={"button"}
            look={"link"}
            onClick={() => setShowExtendedForm(!showExtendedForm)}
          >
            Fragebogen zu Interoperabilitätsbewertung{" "}
            {showExtendedForm ? "schließen" : "öffnen"}
          </Button>
          {showExtendedForm && (
            <>
              <RichText
                markdown={dedent`
          In den folgenden Fragen geht es darum, festzustellen, ob für Ihr Regelungsvorhaben nach [Artikel 3 der Verordnung für ein interoperables Europa (EU) 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903(https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903#art_3) eine Interoperabilitätsbewertung durchgeführt werden muss.
                    
          [Mehr zu EU-Interoperabilität](${ROUTE_INTEROPERABILITY.url})
        `}
              />
              <EuInteroperabilityQuestions />
            </>
          )}
          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton
            showSavingTip
          />
        </form>
      </div>
    </>
  );
}
