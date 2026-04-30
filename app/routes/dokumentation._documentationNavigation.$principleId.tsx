import { Link, useOutletContext, useParams } from "react-router";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import { principleAnswerOnlySchema } from "./dokumentation/documentationDataSchema";

const { radioOptions } = digitalDocumentation.principlePages;

export default function DocumentationPrinciple() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

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
              title={`Hinweis zu „${prinzip.Name}“`}
              className="h-28 w-28"
            >
              <BlocksRenderer content={prinzip.Hilfetext!} />
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
            Schafft das Regelungsvorhaben die rechtlichen Voraussetzungen für
            die Umsetzung des Prinzips?
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
