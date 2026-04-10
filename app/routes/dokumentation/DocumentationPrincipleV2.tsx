import { Link } from "react-router";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import DocumentationActions from "./DocumentationActions";
import { useSyncedForm } from "./documentationDataHook";
import { useDocumentationDataService } from "./DocumentationDataProvider";
import { principleAnswerOnlySchema } from "./documentationDataSchema";

const { radioOptions } = digitalDocumentation.principlePages;

export default function DocumentationPrincipleV2({
  currentUrl,
  nextUrl,
  previousUrl,
  prinzip,
}: Readonly<{
  currentUrl: string;
  nextUrl: string;
  previousUrl: string;
  prinzip: PrinzipWithAspekteAndExample;
}>) {
  const { documentationData, addOrUpdatePrincipleAnswer } =
    useDocumentationDataService();

  const principleData = documentationData?.principles?.find(
    (p) => p.id === prinzip.documentId,
  );

  const storedData = principleData?.answer
    ? { answer: principleData.answer }
    : undefined;

  const form = useSyncedForm({
    schema: principleAnswerOnlySchema,
    defaultValues: { answer: "" },
    setDataCallback: (data) =>
      addOrUpdatePrincipleAnswer(prinzip.documentId, data?.answer ?? ""),
    storedData,
    currentUrl,
    nextUrl,
  });

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name}`} />
      <div className="max-w-a11y space-y-40">
        <div className="space-y-8">
          <Badge principleNumber={prinzip.Nummer}>
            Prinzip {prinzip.order}
          </Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            {prinzip.Name}
            <HelpButton
              sectionId="1-prinzip"
              title={`Hinweis zu "${prinzip.Name}"`}
              className="h-28 w-28"
            >
              <BlocksRenderer content={prinzip.Beschreibung} />
              <Link
                to={ROUTE_METHODS_PRINCIPLES.url + "/" + prinzip.URLBezeichnung}
                className="ds-link-01-reg"
              >
                Mehr zum Prinzip
              </Link>
            </HelpButton>
          </Heading>

          {prinzip.Kurzbeschreibung && (
            <BlocksRenderer content={prinzip.Kurzbeschreibung} />
          )}
        </div>

        <form {...form.getFormProps()} className="space-y-40">
          <Heading
            id="question-label"
            tagName="h2"
            look="ds-heading-03-reg"
            className="mb-16"
          >
            Schafft das Regelungsvorhaben die rechtlichen Vorraussetzungen für
            die Umsetzung des Prinzips?
            <HelpButton
              sectionId="2-answers"
              title={
                'Hinweis zu "Schafft das Regelungsvorhaben die rechtlichen Voraussetzungen für die Umsetzung des Prinzips?"'
              }
              className="h-28 w-28"
            >
              <p>
                Geben Sie hier an ob das Prinzip &ldquo;{prinzip.Name}&rdquo;
                auf Ihr Regelungsvorhaben zutrifft.
              </p>
            </HelpButton>
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
