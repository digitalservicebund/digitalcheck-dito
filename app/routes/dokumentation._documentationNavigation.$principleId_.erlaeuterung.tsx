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
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import {
  DocumentationData,
  Principle,
  principleAnswerSchemaV2,
} from "./dokumentation/documentationDataSchema";

const { radioOptions } = digitalDocumentation.principlePages;

type DocumentationPrincipleErlaeuterungFormProps = {
  answer: string;
  prinzip: PrinzipWithAspekteAndExample;
  principleData: Principle;
  isPositive: boolean;
  isIrrelevant: boolean;
  currentUrl: string;
  nextUrl: string;
  previousUrl: string;
};

function DocumentationPrincipleErlaeuterungForm({
  answer,
  prinzip,
  principleData,
  isPositive,
  isIrrelevant,
  currentUrl,
  nextUrl,
  previousUrl,
}: DocumentationPrincipleErlaeuterungFormProps) {
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
    <form {...form.getFormProps()} className="space-y-40">
      <input {...form.getHiddenInputProps("answer")} />

      <fieldset className="space-y-16">
        <legend className="ds-heading-03-reg">{explanationTitle}</legend>

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
              title="Schwerpunkte"
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
          placeholder={
            isPositive
              ? "Tragen Sie Ihre Erklärung ein, z. B.: Online-Beratung wird ermöglicht, siehe § 1a. Geben Sie auch die dazugehörigen Paragrafen an."
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
  );
}

export default function DocumentationPrincipleErlaeuterung() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationDataService();

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

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name} – Erläuterung`} />
      <div className="space-y-40">
        <div className="space-y-8">
          <Badge principleNumber={prinzip.Nummer}>
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

        <div className="rounded-lg bg-blue-300 p-24">
          <p>{changeAnswerTitle}</p>
          <Link
            to={currentUrl.replace("/erlaeuterung", "")}
            className="text-link"
          >
            Angaben ändern
          </Link>
        </div>

        <DocumentationPrincipleErlaeuterungForm
          answer={answer}
          prinzip={prinzip}
          principleData={principleData}
          isPositive={isPositive}
          isIrrelevant={isIrrelevant}
          currentUrl={currentUrl}
          nextUrl={nextUrl}
          previousUrl={previousUrl}
        />
      </div>
    </>
  );
}
