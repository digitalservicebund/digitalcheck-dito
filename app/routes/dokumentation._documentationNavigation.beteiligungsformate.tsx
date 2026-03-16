import { useEffect } from "react";
import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import {
  defaultParticipationValues,
  participationSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

const { participation } = digitalDocumentation;

const help = [
  {
    id: "formats",
    title: "Beteiligungsformate",
    content:
      "Beschreiben Sie, wie Sie die Bedürfnisse der Betroffenen erhoben haben – z. B. durch Befragungen, Gespräche mit Vollzugsakteurinnen und -akteuren oder formelle Beteiligungsverfahren.",
  },
  {
    id: "results",
    title: "Erkenntnisse",
    content:
      "Erläutern Sie, welche Erkenntnisse aus der Beteiligung in das Regelungsvorhaben eingeflossen sind und verweisen Sie auf relevante Paragrafen.",
  },
];

export default function DocumentationParticipation() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { setParticipation, documentationData } = useDocumentationDataService();
  const { setHelpSections } = useHelpPanel();

  useEffect(() => {
    setHelpSections(help);
  }, [setHelpSections]);

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
      <Heading
        text={participation.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={participation.textIntro} className="gap-40" />

      <form className="space-y-40" {...form.getFormProps()}>
        <div className="space-y-16">
          <InfoBox
            heading={{
              tagName: "h2",
              look: "ds-heading-03-reg",
              text: participation.formats.heading,
            }}
          >
            <RichText markdown={participation.formats.content} />
          </InfoBox>

          <Textarea
            description={participation.formats.textField.description}
            placeholder={participation.formats.textField.placeholder}
            scope={form.scope("formats")}
            data-testid="schritte"
            warningInsteadOfError
          >
            {participation.formats.textField.label}{" "}
            <HelpButton sectionId="formats" />
          </Textarea>
        </div>

        <Heading
          tagName="h2"
          look="ds-heading-03-reg"
          text={participation.results.heading}
          className="mb-16"
        />
        <Textarea
          description={participation.results.textField.description}
          scope={form.scope("results")}
          data-testid="erkenntnisse"
          warningInsteadOfError
        >
          {participation.results.textField.label}{" "}
          <HelpButton sectionId="results" />
        </Textarea>

        <DocumentationActions
          previousUrl={previousUrl}
          submit
          showDownloadDraftButton
          showSavingTip
        />
      </form>
    </>
  );
}
