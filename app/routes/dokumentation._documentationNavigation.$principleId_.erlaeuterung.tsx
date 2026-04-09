import { Link, redirect, useOutletContext, useParams } from "react-router";
import AspectPills from "~/components/AspectPills";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import {
  DocumentationData,
  principleAnswerSchemaV2,
} from "./dokumentation/documentationDataSchema";

const { radioOptions } = digitalDocumentation.principlePages;

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
    ? "Sie angegeben, dass das Prinzip auf ihr Vorhaben zutrifft."
    : isIrrelevant
      ? "Sie angegeben, dass das Prinzip nicht relevant für Ihr Vorhaben ist."
      : "Sie angegeben, dass das Prinzip nicht auf ihr Vorhaben zutrifft.";

  const notPositiveExplanation = (
    <RichText
      markdown={dedent`
        ${isIrrelevant ? `Bitte erläutern Sie, warum das Prinzip “${prinzip.Name}” **nicht relevant** für Ihr Vorhaben ist.` : `Bitte erläutern Sie, warum das Prinzip “${prinzip.Name}” **nicht** auf Ihr Vorhaben zutrifft.`}
        
        Sie können Ihre Angaben als Word-Dokument exportieren und später in der Word Datei Ihre Dokumentation fortführen.
        `}
      className="space-y-24"
    />
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

          {isPositive ? (
            <>
              <div className="space-y-8">
                <Heading tagName="h2" look="ds-heading-03-reg">
                  Erklären Sie, in wiefern Sie auf dieses Prinzip eingegangen
                  sind.
                  <HelpButton
                    sectionId="aspects"
                    title="Hinweis zur Erklärung"
                    className="h-28 w-28"
                  >
                    <>
                      <p>
                        Wählen Sie aus, welche Schwerpunkte für Ihr Vorhaben
                        relevant sind.
                      </p>
                      <p>
                        Diese dienen Ihnen als roter Faden für Ihre Erklärung.
                        So formulieren Sie präzise und stellen sicher, dass Ihre
                        Regelung das Prinzip erfüllt.
                      </p>
                      {prinzip.Aspekte.map((aspect) => (
                        <DetailsSummary
                          key={aspect.Kurzbezeichnung}
                          title={aspect.Kurzbezeichnung}
                        >
                          {aspect.Text && (
                            <BlocksRenderer content={aspect.Text} />
                          )}
                        </DetailsSummary>
                      ))}
                    </>
                  </HelpButton>
                </Heading>
                <p>
                  Wählen Sie Schwerpunkte aus, auf die Sie in der Regelung
                  geachtet haben und geben Sie ihre eigene Erklärung an. Geben
                  Sie die dazugehörigen Paragrafen dazu an! Wenn keines der
                  Schwerpunkte auf Ihre Regelung zutrifft, geben Sie eine eigen
                  Erläuterung an.
                </p>
              </div>

              <AspectPills
                aspekte={prinzip.Aspekte}
                scope={form.scope("aspects")}
                error={form.error("aspects")}
                warningInsteadOfError
              >
                Schwerpunkte auswählen
              </AspectPills>
            </>
          ) : (
            <div className="space-y-8">
              <Heading tagName="h2" look="ds-heading-03-reg">
                Erläuterung angeben
                <HelpButton
                  sectionId="aspects"
                  title="Hinweis zur Erklärung"
                  className="h-28 w-28"
                >
                  {notPositiveExplanation}
                </HelpButton>
              </Heading>
              {notPositiveExplanation}
            </div>
          )}

          <Textarea
            scope={form.scope("reasoning")}
            description={
              isPositive
                ? "Tragen Sie Ihre Erläuterung ein z.B.: Online-Beratung wird ermöglicht, siehe § 1a"
                : isIrrelevant
                  ? "Begründung warum das Prinzip nicht relevant für Ihr Regelungsvorhaben ist."
                  : "Begründung warum das Prinzip nicht auf Ihr Regelungsvorhaben zutrifft."
            }
            rows={5}
            warningInsteadOfError
          >
            {isPositive ? "Erläuterung zu dem Prinzip" : "Begründung"}
          </Textarea>

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
