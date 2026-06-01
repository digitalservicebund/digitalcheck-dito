import { methoden_fuenfPrinzipien } from "@/config/routes";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import AspectPills from "~/components/AspectPills";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import type { Principle } from "./dokumentation/documentationDataSchema";
import { principleAnswerSchemaV2 } from "./dokumentation/documentationDataSchema";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const { radioOptions } = digitalDocumentation.principlePages;

type DocumentationPrincipleErlaeuterungFormProps = Readonly<{
  answer: string;
  prinzip: PrinzipWithAspekteAndExample;
  principleData: Principle;
  isPositive: boolean;
  isIrrelevant: boolean;
}>;

function DocumentationPrincipleErlaeuterungForm({
  answer,
  prinzip,
  principleData,
  isPositive,
  isIrrelevant,
}: DocumentationPrincipleErlaeuterungFormProps) {
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useDocumentationNavigation();
  const { addOrUpdatePrincipleReasoning } = useDocumentationDataService();

  const form = useSyncedForm({
    schema: principleAnswerSchemaV2,
    defaultValues: { answer, reasoning: "", aspects: [] },
    setDataCallback: (data) =>
      addOrUpdatePrincipleReasoning(
        prinzip.documentId,
        data?.reasoning ?? "",
        isPositive ? data?.aspects : undefined,
      ),
    storedData: {
      answer,
      reasoning: principleData?.reasoning ?? "",
      aspects: principleData?.aspects,
    },
    currentUrl,
    nextUrl,
  });

  const explanationTitle = isPositive ? (
    "Erklären Sie, inwiefern Sie auf dieses Prinzip eingegangen sind"
  ) : isIrrelevant ? (
    <>
      Erklären Sie, warum das Prinzip <strong>nicht relevant</strong> für Ihr
      Vorhaben ist
    </>
  ) : (
    <>
      Erklären Sie, warum das Prinzip <strong>nicht</strong> auf Ihr Vorhaben
      zutrifft
    </>
  );

  return (
    <form {...form.getFormProps()} className="space-y-80">
      <input {...form.getHiddenInputProps("answer")} />

      <fieldset className="space-y-24">
        <legend className="ds-heading-03-reg">{explanationTitle}</legend>

        <div className="space-y-48">
          {isPositive && (
            <AspectPills
              aspekte={prinzip.Aspekte}
              scope={form.scope("aspects")}
              error={form.error("aspects")}
              warningInsteadOfError
            >
              Schwerpunkte auswählen
              <HelpButton
                sectionId="aspects"
                title="Hinweis zu Schwerpunkten"
                className="h-24 w-24"
              >
                <p>
                  Wählen Sie aus, welche Schwerpunkte für Ihr Vorhaben relevant
                  sind.
                </p>
                <p>
                  Diese dienen Ihnen als roter Faden für Ihre Erklärung. So
                  formulieren Sie präzise und stellen sicher, dass Ihre Regelung
                  das Prinzip erfüllt.
                </p>
                {prinzip.Aspekte.map((aspect) => (
                  <DetailsSummary
                    key={aspect.Kurzbezeichnung}
                    title={aspect.Kurzbezeichnung}
                  >
                    {aspect.Text && <BlocksRenderer content={aspect.Text} />}
                  </DetailsSummary>
                ))}
              </HelpButton>
            </AspectPills>
          )}

          <Textarea
            scope={form.scope("reasoning")}
            rows={5}
            description={
              isPositive &&
              prinzip.Erklaerungshilfe && (
                <BlocksRenderer content={prinzip.Erklaerungshilfe} />
              )
            }
            warningInsteadOfError
          >
            Erklärung
          </Textarea>
        </div>
      </fieldset>

      <DocumentationActions
        previousUrl={previousUrl}
        submit
        showDownloadDraftButton
        showSavingTip
        prinzips={prinzips}
      />
    </form>
  );
}

export function DocumentationPrincipleErlaeuterung({
  principleId,
}: Readonly<{
  principleId: string;
}>) {
  const { currentUrl, navigationBaseUrl, prinzips } =
    useDocumentationNavigation();
  const { documentationData } = useDocumentationDataService();

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  const navigate = useNavigate();

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  const principleData = documentationData?.principles?.find(
    (p) => p.id === prinzip.documentId,
  );

  const answer = principleData?.answer ?? "";
  const isPositive = answer === radioOptions[0];
  const isIrrelevant = answer === radioOptions[2];

  // If no answer saved yet, redirect to answer page
  useEffect(() => {
    if (documentationData.initialized && !principleData?.answer)
      void navigate(navigationBaseUrl);
  }, [documentationData, principleData, navigate, navigationBaseUrl]);

  if (!principleData?.answer) return null;

  const changeAnswerTitle = isPositive
    ? "Sie haben angegeben, dass das Prinzip auf ihr Vorhaben zutrifft."
    : isIrrelevant
      ? "Sie haben angegeben, dass das Prinzip nicht relevant für Ihr Vorhaben ist."
      : "Sie haben angegeben, dass das Prinzip nicht auf ihr Vorhaben zutrifft.";

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name} – Erläuterung`} />
      <div className="space-y-48">
        <div className="space-y-24">
          <Badge principleNumber={prinzip.Nummer} className="mb-8">
            Prinzip {prinzip.order}
          </Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            {prinzip.Name}
            <HelpButton
              sectionId="prinzip"
              title={`Hinweis zu „${prinzip.Name}“`}
              className="h-24 w-24"
            >
              <BlocksRenderer content={prinzip.Hilfetext!} />
              <Link
                to={
                  methoden_fuenfPrinzipien.path + "/" + prinzip.URLBezeichnung
                }
                className="ds-link-01-reg"
              >
                Mehr zum Prinzip
              </Link>
            </HelpButton>
          </Heading>

          {prinzip.Kurzbeschreibung && (
            <BlocksRenderer content={prinzip.Kurzbeschreibung} />
          )}

          <div className="rounded-lg bg-blue-300 p-24">
            <p>{changeAnswerTitle}</p>
            <Link
              to={currentUrl.replace("/erlaeuterung", "")}
              className="text-link"
            >
              Angaben ändern
            </Link>
          </div>
        </div>

        <DocumentationPrincipleErlaeuterungForm
          answer={answer}
          prinzip={prinzip}
          principleData={principleData}
          isPositive={isPositive}
          isIrrelevant={isIrrelevant}
        />
      </div>
    </>
  );
}

// Astro page export
import { DocumentationPageShell } from "@/components/DocumentationPageShell";

export function ErlaeuterungPage({
  prinzips,
  currentUrl,
  principleId,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
  principleId: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationPrincipleErlaeuterung principleId={principleId} />
    </DocumentationPageShell>
  );
}
