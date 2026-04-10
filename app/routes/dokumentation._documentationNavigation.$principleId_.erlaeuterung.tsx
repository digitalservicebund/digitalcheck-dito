import { ReactNode } from "react";
import { Link, redirect, useOutletContext, useParams } from "react-router";
import AspectPills from "~/components/AspectPills";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import {
  DocumentationData,
  principleAnswerSchemaV2,
} from "./dokumentation/documentationDataSchema";

const { radioOptions } = digitalDocumentation.principlePages;

type ExplanationLegendProps = {
  title: ReactNode;
  helpText: ReactNode;
};

function ExplanationLegend({ title, helpText }: ExplanationLegendProps) {
  return (
    <legend className="ds-heading-03-reg">
      {title}
      <HelpButton
        sectionId="aspects"
        title="Hinweis zur Erklärung"
        className="h-28 w-28"
      >
        {helpText}
      </HelpButton>
    </legend>
  );
}

export default function DocumentationPrincipleErlaeuterung() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationDataService();
  const { addOrUpdatePrincipleReasoning } = useDocumentationDataService();

  if (!principleId)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No principleId provided", { status: 404 });

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  const principleData = (
    documentationData as DocumentationData
  )?.principles?.find((p) => p.id === prinzip.documentId);

  const answer = principleData?.answer ?? "";
  const isPositive = answer === radioOptions[0];
  const isIrrelevant = answer === radioOptions[2];

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

  // If no answer saved yet, redirect to answer page
  if (!principleData?.answer) {
    redirect(previousUrl);
    return null;
  }

  const changeAnswerTitle = isPositive
    ? "Sie haben angegeben, dass das Prinzip auf ihr Vorhaben zutrifft."
    : isIrrelevant
      ? "Sie haben angegeben, dass das Prinzip nicht relevant für Ihr Vorhaben ist."
      : "Sie haben angegeben, dass das Prinzip nicht auf ihr Vorhaben zutrifft.";

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

  const helpText = isPositive ? (
    <>
      <p>Wählen Sie aus, welche Schwerpunkte für Ihr Vorhaben relevant sind.</p>
      <p>
        Diese dienen Ihnen als roter Faden für Ihre Erklärung. So formulieren
        Sie präzise und stellen sicher, dass Ihre Regelung das Prinzip erfüllt.
      </p>
      <p>Geben Sie die dazugehörigen Paragrafen an!</p>
      {prinzip.Aspekte.map((aspect) => (
        <DetailsSummary
          key={aspect.Kurzbezeichnung}
          title={aspect.Kurzbezeichnung}
        >
          {aspect.Text && <BlocksRenderer content={aspect.Text} />}
        </DetailsSummary>
      ))}
    </>
  ) : isIrrelevant ? (
    <>
      Bitte erläutern Sie, warum das Prinzip “{prinzip.Name}”{" "}
      <strong>nicht relevant</strong> für Ihr Vorhaben ist
    </>
  ) : (
    <>
      Bitte erläutern Sie, warum das Prinzip “{prinzip.Name}”{" "}
      <strong>nicht</strong> auf Ihr Vorhaben zutrifft
    </>
  );

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name} – Erläuterung`} />
      <div className="max-w-a11y space-y-40">
        <div className="space-y-8">
          <Badge principleNumber={prinzip.Nummer}>
            Prinzip {prinzip.order}
          </Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            {prinzip.Name}
            <HelpButton
              sectionId="prinzip"
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

        <div className="max-w-a11y rounded-lg bg-blue-300 p-24">
          <p>{changeAnswerTitle}</p>
          <Link
            to={currentUrl.replace("/erlaeuterung", "")}
            className="text-link"
          >
            Angaben ändern
          </Link>
        </div>

        <form {...form.getFormProps()} className="space-y-40">
          <input {...form.getHiddenInputProps("answer")} />

          <fieldset className="space-y-16">
            <ExplanationLegend title={explanationTitle} helpText={helpText} />

            {isPositive && (
              <AspectPills
                aspekte={prinzip.Aspekte}
                scope={form.scope("aspects")}
                error={form.error("aspects")}
                warningInsteadOfError
              >
                Schwerpunkte auswählen
              </AspectPills>
            )}

            <Textarea
              scope={form.scope("reasoning")}
              description={
                isPositive
                  ? "Tragen Sie Ihre Erklärung ein z.B.: Online-Beratung wird ermöglicht, siehe § 1a"
                  : undefined
              }
              rows={5}
              warningInsteadOfError
            >
              Erklärung
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
