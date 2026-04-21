import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import {
  defaultParticipationValues,
  participationSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { features } from "~/utils/featureFlags";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

const { participation } = digitalDocumentation;

export default function DocumentationParticipation() {
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { setParticipation, documentationData } = useDocumentationDataService();

  const form = useSyncedForm({
    schema: participationSchema,
    defaultValues: defaultParticipationValues,
    currentUrl,
    setDataCallback: setParticipation,
    storedData: documentationData.participation,
    nextUrl,
  });

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_PARTICIPATION.title}`}
      />
      <div className="space-y-40">
        <Heading
          text={participation.headline}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-16"
        />
        <RichText markdown={participation.textIntro} className="gap-40" />

        <form className="space-y-40" {...form.getFormProps()}>
          <fieldset>
            <legend className="ds-heading-03-reg mb-16">
              {participation.formats.heading}
            </legend>

            <Textarea
              description={
                simplifiedFlow
                  ? undefined
                  : participation.formats.textField.description
              }
              placeholder={participation.formats.textField.placeholder}
              scope={form.scope("formats")}
              data-testid="schritte"
              warningInsteadOfError
            >
              {simplifiedFlow
                ? "Erklärung"
                : participation.formats.textField.label}
              <HelpButton sectionId="formats" title="Hinweis zur Erklärung">
                Beschreiben Sie stichpunktartig, wie Sie die Bedürfnisse der
                Betroffenen erhoben haben – z. B. durch Befragungen, Gesprächen
                mit Vollzugsakteurinnen und -akteuren oder formelle
                Beteiligungsverfahren.
              </HelpButton>
            </Textarea>
          </fieldset>

          <fieldset>
            <legend className="ds-heading-03-reg mb-16">
              {participation.results.heading}
            </legend>
            <Textarea
              description={
                simplifiedFlow
                  ? undefined
                  : participation.results.textField.description
              }
              scope={form.scope("results")}
              data-testid="erkenntnisse"
              warningInsteadOfError
            >
              {simplifiedFlow
                ? "Erkenntnisse"
                : participation.results.textField.label}
              <HelpButton sectionId="results" title="Hinweis zu Erkenntnissen">
                Bitte listen Sie stichpunktartig auf, welche Erkenntnisse
                eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die
                besonders umsetzungsrelevant sind.
              </HelpButton>
            </Textarea>
          </fieldset>

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
