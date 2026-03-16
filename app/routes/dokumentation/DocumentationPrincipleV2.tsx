import { useForm } from "@rvf/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import DocumentationActions from "./DocumentationActions";
import { useDocumentationDataService } from "./DocumentationDataProvider";
import { principleAnswerOnlySchema } from "./documentationDataSchema";
import { PrincipleWithExample } from "./DocumentationPrincipleV1";

const { radioOptions } = digitalDocumentation.principlePages;

// TODO: first draft, will change
const help = [
  {
    id: "question",
    title: "Die Frage zum Prinzip",
    content:
      'Beurteilen Sie, ob Ihr Regelungsvorhaben die rechtlichen Voraussetzungen für das jeweilige Prinzip schafft. Wählen Sie "Ja", wenn das Vorhaben das Prinzip ganz oder teilweise unterstützt.',
  },
];

export default function DocumentationPrincipleV2({
  currentUrl,
  previousUrl,
  prinzip,
}: Readonly<{
  currentUrl: string;
  previousUrl: string;
  prinzip: PrinzipWithAspekteAndExample;
}>) {
  const navigate = useNavigate();
  const { documentationData, addOrUpdatePrinciple } =
    useDocumentationDataService();
  const { setHelpSections } = useHelpPanel();

  // TODO: useEffect needed?
  useEffect(() => {
    setHelpSections(help);
  }, [setHelpSections]);

  const principleData = documentationData?.principles?.find(
    (p) => p.id === prinzip.documentId,
  );

  const form = useForm({
    schema: principleAnswerOnlySchema,
    defaultValues: {
      id: prinzip.documentId,
      answer: principleData?.answer ?? "",
    },
    validationBehaviorConfig: {
      whenSubmitted: "onSubmit",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: async (data) => {
      const existing = documentationData?.principles?.find(
        (p) => p.id === prinzip.documentId,
      );
      // Preserve existing reasoning if answer matches
      if (existing?.answer === data.answer && "reasoning" in existing) {
        addOrUpdatePrinciple(existing);
      } else if (data.answer === radioOptions[0]) {
        addOrUpdatePrinciple({
          id: data.id,
          answer: data.answer,
          reasoning: { aspects: [] },
        });
      } else {
        addOrUpdatePrinciple({
          id: data.id,
          answer: data.answer,
          reasoning: "",
        });
      }
      await navigate(`${currentUrl}/erlaeuterung`);
    },
  });

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name}`} />
      <div className="space-y-40">
        <PrincipleWithExample prinzip={prinzip} />

        <form {...form.getFormProps()} className="space-y-40">
          <input {...form.getHiddenInputProps("id")} />
          <Heading
            id="question-label"
            tagName="h2"
            look="ds-heading-03-reg"
            className="mb-16"
          >
            Schafft das Regelungsvorhaben die rechtlichen Vorraussetzungen für
            die Umsetzung des Prinzips? <HelpButton sectionId="question" />
          </Heading>
          <RadioGroup
            aria-labelledby="question-label"
            scope={form.scope("answer")}
            options={radioOptions.map((option) => ({
              value: option,
              label: option,
            }))}
            warningInsteadOfError
          />

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
