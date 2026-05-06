import { type FormApi } from "@rvf/react";
import { ReactNode } from "react";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import HelpButton from "~/components/HelpButton.tsx";
import NewTabLink from "~/components/NewTabLink.tsx";
import RichText from "~/components/RichText.tsx";
import Textarea from "~/components/Textarea.tsx";
import { ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS } from "~/resources/staticRoutes.ts";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import {
  interoperabilityAssessmentSchema,
  type InteroperabilityAssessmentData,
} from "~/routes/dokumentation/documentationDataSchema.ts";
import { interoperabilityExplanationParagraphs } from "~/routes/dokumentation/interoperability/explanationMarkdown.ts";
import { InteroperabilityRatingSelect } from "~/routes/dokumentation/interoperability/InteroperabilityRatingSelect.tsx";
import {
  Section,
  sections,
} from "~/routes/dokumentation/interoperability/Sections.tsx";

const defaultAssessmentValues: InteroperabilityAssessmentData = {
  legal: { detail: "", rating: "" },
  organizational: { detail: "", rating: "" },
  semantic: { detail: "", rating: "" },
  technical: { detail: "", rating: "" },
};

type InteroperabilityLevelSectionProps = Readonly<{
  form: FormApi<InteroperabilityAssessmentData>;
  level: Section["id"];
  levelDe: string;
  description?: ReactNode;
}>;

function LevelAssessmentForm({
  form,
  level,
  levelDe,
  description,
}: InteroperabilityLevelSectionProps) {
  const scope = form.scope(`${level}.rating`);

  return (
    <div className="space-y-32">
      <p>
        Erklären Sie, inwiefern Sie die <strong>{levelDe}n</strong>{" "}
        Voraussetzungen für eine europaweit grenzüberschreitende Nutzung
        geschaffen haben.
      </p>
      <Textarea description={description} scope={form.scope(`${level}.detail`)}>
        Erklärung
      </Textarea>
      <InteroperabilityRatingSelect levelDe={levelDe} scope={scope} />
    </div>
  );
}

export function ExplanationParagraph({
  markdown,
  contextLabel,
  level,
}: Readonly<{ markdown: string; contextLabel: string; level: Section["id"] }>) {
  return (
    <HelpButton
      sectionId={contextLabel}
      title={`Was soll ${contextLabel} geprüft werden?`}
    >
      <RichText markdown={markdown} />

      <ExamplesList level={level} />
    </HelpButton>
  );
}

function ExamplesList({ level }: Readonly<{ level: Section["id"] }>) {
  const section = sections.find((section) => section.id === level);
  if (!section) return null;
  return (
    <DetailsSummary title={"Beispiele"}>
      <div className="mt-16 space-y-32">
        {section?.groups.map((group) => (
          <ul key={group.title}>
            <p className="ds-label-01-bold">{group.title}</p>
            {group.questions
              .filter((q) => !q.isOwnStatement)
              .map((q) => (
                <li key={q.id}>{q.label}</li>
              ))}
          </ul>
        ))}
      </div>
    </DetailsSummary>
  );
}

export default function FormVariant1() {
  const { documentationData, setInteroperabilityAssessmentData } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: interoperabilityAssessmentSchema,
    defaultValues: defaultAssessmentValues,
    storedData: documentationData.interoperabilityAssessment,
    setDataCallback: (data) =>
      setInteroperabilityAssessmentData(data ?? undefined),
  });

  return (
    <div className={"space-y-8"}>
      <p>
        Ihre Angaben im Schritt{" "}
        <a
          href={ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.url}
          className={"text-link"}
        >
          &quot;{ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.title}
          &quot;
        </a>{" "}
        haben ergeben, dass Sie für Ihr Vorhaben eine verpflichtende
        Interoperabilitätsbewertung einreichen müssen. Wählen Sie aus, welche{" "}
        <NewTabLink
          to={
            "https://interoperable-europe.ec.europa.eu/collection/assessments/guidelines-chapter-3-how-carry-out-interoperability-assessment#paragraph-49343"
          }
        >
          Ebenen der Interoperabilität
        </NewTabLink>{" "}
        hierdurch beeinflusst werden, und begründen Sie Ihre Auswahl. Sie können
        die Texte vor der Übermittlung noch einmal bearbeiten.
      </p>
      <form
        {...form.getFormProps()}
        className={"space-y-32 *:border-b *:border-b-gray-500 *:pb-32"}
      >
        <div className="mt-64 space-y-16">
          <h2>
            Rechtliche Auswirkungen
            <ExplanationParagraph
              contextLabel={"bei rechtlichen Auswirkungen"}
              markdown={interoperabilityExplanationParagraphs.legal}
              level={"legal"}
            />
          </h2>

          <LevelAssessmentForm
            form={form}
            level={"legal"}
            levelDe={"rechtliche"}
          />
        </div>
        <div className="space-y-16">
          <h2>
            Organisatorische Auswirkungen{" "}
            <ExplanationParagraph
              contextLabel={"bei organisatorischen Auswirkungen"}
              markdown={interoperabilityExplanationParagraphs.organizational}
              level={"organizational"}
            />
          </h2>

          <LevelAssessmentForm
            form={form}
            level={"organizational"}
            levelDe={"organisatorische"}
          />
        </div>
        <div className="space-y-16">
          <h2>
            Semantische Auswirkungen
            <ExplanationParagraph
              contextLabel={"bei semantischen Auswirkungen"}
              markdown={interoperabilityExplanationParagraphs.semantic}
              level={"semantic"}
            />
          </h2>

          <LevelAssessmentForm
            form={form}
            level={"semantic"}
            levelDe={"semantische"}
          />
        </div>
        <div className="space-y-16">
          <h2>
            Technische Auswirkungen
            <ExplanationParagraph
              level={"technical"}
              contextLabel={"bei technischen Auswirkungen"}
              markdown={interoperabilityExplanationParagraphs.technical}
            />
          </h2>

          <LevelAssessmentForm
            form={form}
            level={"technical"}
            levelDe={"technische"}
          />
        </div>
      </form>
    </div>
  );
}
