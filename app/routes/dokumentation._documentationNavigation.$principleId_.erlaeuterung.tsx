import { CheckCircle } from "@digitalservicebund/icons";
import { type FormScope, useForm } from "@rvf/react";
import { useEffect } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router";
import { z } from "zod";
import AspectPills from "~/components/AspectPills";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { dedent } from "~/utils/dedentMultilineStrings";
import type { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import { principleReasoningSchemaV2 } from "./dokumentation/documentationDataSchema";

const { radioOptions } = digitalDocumentation.principlePages;

const help = [
  {
    id: "aspects",
    title: "Schwerpunkte und Erläuterung",
    content:
      "Wählen Sie die Schwerpunkte, die auf Ihr Vorhaben zutreffen, und erläutern Sie konkret, wie das Prinzip im Regelungsvorhaben umgesetzt wurde.",
  },
];

type StoredPrincipleData = {
  id: string;
  answer: string;
  reasoning?: { aspects?: string[]; explanation?: string } | string;
};

export default function DocumentationPrincipleErlaeuterung() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const navigate = useNavigate();
  const { documentationData } = useDocumentationDataService();
  const { setHelpSections } = useHelpPanel();

  // TODO: does this need to be in a useEffect?
  useEffect(() => {
    setHelpSections(help);
  }, [setHelpSections]);

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  const principleData = documentationData?.principles?.find(
    (p) => p.id === prinzip.documentId,
  ) as StoredPrincipleData | undefined;

  // If no answer saved yet, redirect to answer page
  if (!principleData?.answer) {
    void navigate(previousUrl, { replace: true });
    return null;
  }

  const answer = principleData.answer;
  const isPositive = answer === radioOptions[0];
  const isIrrelevant = answer === radioOptions[2];
  const storedReasoning = principleData.reasoning;

  const changeAnswerTitle = isPositive
    ? "Sie angegeben, dass das Prinzip auf ihr Vorhaben zutrifft."
    : isIrrelevant
      ? "Sie angegeben, dass das Prinzip nicht relevant für Ihr Vorhaben ist."
      : "Sie angegeben, dass das Prinzip nicht auf ihr Vorhaben zutrifft.";

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name} – Erläuterung`} />
      <div className="max-w-a11y space-y-40">
        <div className="space-y-8">
          <Badge principleNumber={prinzip.Nummer}>
            Prinzip {prinzip.Nummer}
          </Badge>
          <Heading
            text={prinzip.Name}
            tagName="h1"
            look="ds-heading-02-reg"
            className="mb-16"
          />

          {prinzip.Kurzbeschreibung && (
            <BlocksRenderer content={prinzip.Kurzbeschreibung} />
          )}
        </div>

        <div className="max-w-a11y flex flex-row items-center gap-16 rounded-lg bg-blue-300 p-24">
          <CheckCircle className="fill-ds-green-700 size-36" />
          <div>
            <p>{changeAnswerTitle}</p>
            <Link to={previousUrl} className="text-link">
              Angaben ändern
            </Link>
          </div>
        </div>

        {isPositive ? (
          <PositiveErlaeuterungForm
            currentUrl={currentUrl}
            nextUrl={nextUrl}
            prinzip={prinzip}
            principleId={prinzip.documentId}
            answer={answer}
            storedReasoning={
              storedReasoning &&
              typeof storedReasoning === "object" &&
              !Array.isArray(storedReasoning)
                ? (storedReasoning as {
                    aspects?: string[];
                    explanation?: string;
                  })
                : undefined
            }
          />
        ) : (
          <NegativeErlaeuterungForm
            currentUrl={currentUrl}
            nextUrl={nextUrl}
            principleId={prinzip.documentId}
            answer={answer}
            storedReasoning={
              typeof storedReasoning === "string" ? storedReasoning : ""
            }
            isIrrelevant={isIrrelevant}
          />
        )}
      </div>
    </>
  );
}

function PositiveErlaeuterungForm({
  currentUrl,
  nextUrl,
  prinzip,
  principleId,
  answer,
  storedReasoning,
}: Readonly<{
  currentUrl: string;
  nextUrl: string | null;
  prinzip: PrinzipWithAspekte;
  principleId: string;
  answer: string;
  storedReasoning?: { aspects?: string[]; explanation?: string };
}>) {
  const navigate = useNavigate();
  const { addOrUpdatePrinciple } = useDocumentationDataService();

  const form = useForm({
    schema: principleReasoningSchemaV2,
    submitSource: "state",
    defaultValues: {
      aspects: storedReasoning?.aspects ?? [],
      explanation: storedReasoning?.explanation ?? "",
    },
    validationBehaviorConfig: {
      whenSubmitted: "onSubmit",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: async (data) => {
      addOrUpdatePrinciple({
        id: principleId,
        answer: answer,
        reasoning: data,
      });
      if (nextUrl) await navigate(nextUrl);
    },
  });

  const aspectsError = form.error("aspects");

  return (
    <form {...form.getFormProps()} className="space-y-40">
      <div className="space-y-8">
        <Heading tagName="h2" look="ds-heading-03-reg">
          Erklären Sie, in wiefern Sie auf dieses Prinzip eingegangen sind.{" "}
          <HelpButton sectionId="aspects" />
        </Heading>
        <p>
          Wählen Sie Schwerpunkte aus, auf die Sie in der Regelung geachtet
          haben und geben Sie ihre eigene Erklärung an. Geben Sie die
          dazugehörigen Paragrafen dazu an! Wenn keines der Schwerpunkte auf
          Ihre Regelung zutrifft, geben Sie eine eigen Erläuterung an.
        </p>
      </div>

      <AspectPills
        aspekte={prinzip.Aspekte}
        scope={form.scope("aspects") as FormScope<string[]>}
        error={aspectsError}
      >
        Schwerpunkte auswählen
      </AspectPills>

      <Textarea
        description="Tragen Sie Ihre Erläuterung ein z.B.: Online-Beratung wird ermöglicht, siehe § 1a"
        scope={form.scope("explanation")}
        rows={5}
        warningInsteadOfError
      >
        Erläuterung zu dem Prinzip
      </Textarea>

      <DocumentationActions
        previousUrl={currentUrl.replace("/erlaeuterung", "")}
        submit
        showDownloadDraftButton
        showSavingTip
      />
    </form>
  );
}

function NegativeErlaeuterungForm({
  currentUrl,
  nextUrl,
  principleId,
  answer,
  storedReasoning,
  isIrrelevant,
}: Readonly<{
  currentUrl: string;
  nextUrl: string | null;
  principleId: string;
  answer: string;
  storedReasoning: string;
  isIrrelevant: boolean;
}>) {
  const navigate = useNavigate();
  const { addOrUpdatePrinciple } = useDocumentationDataService();

  const form = useForm({
    schema: z.object({
      reasoning: z
        .string()
        .min(1, { message: "Bitte geben Sie eine Begründung an." }),
    }),
    defaultValues: { reasoning: storedReasoning },
    validationBehaviorConfig: {
      whenSubmitted: "onSubmit",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: async (data) => {
      addOrUpdatePrinciple({
        id: principleId,
        answer: answer,
        reasoning: data.reasoning,
      });
      if (nextUrl) await navigate(nextUrl);
    },
  });

  return (
    <form {...form.getFormProps()} className="space-y-40">
      <div className="space-y-8">
        <Heading tagName="h2" look="ds-heading-03-reg">
          Erläuterung angeben
        </Heading>
        <RichText
          markdown={dedent`
            ${isIrrelevant ? "Bitte erläutern Sie, warum das Prinzip “Digitale Angebote für alle nutzbar gestalten” **nicht relevant** für Ihr Vorhaben ist." : "Bitte erläutern Sie, warum das Prinzip “Digitale Angebote für alle nutzbar gestalten” **nicht** auf Ihr Vorhaben zutrifft."}
            
            Sie können Ihre Angaben als Word-Dokument exportieren und später in der Word Datei Ihre Dokumentation fortführen.
            `}
          className="space-y-24"
        />
      </div>

      <Textarea
        scope={form.scope("reasoning")}
        placeholder={
          isIrrelevant
            ? "Begründung warum das Prinzip nicht relevant für Ihr Regelungsvorhaben ist."
            : "Begründung warum das Prinzip nicht auf Ihr Regelungsvorhaben zutrifft."
        }
        rows={5}
        warningInsteadOfError
      >
        Begründung
      </Textarea>

      <DocumentationActions
        previousUrl={currentUrl.replace("/erlaeuterung", "")}
        submit
        showDownloadDraftButton
        showSavingTip
      />
    </form>
  );
}
