import { type FormApi, useForm } from "@rvf/react";
import { ReactNode } from "react";
import { z } from "zod";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import NewTabLink from "~/components/NewTabLink.tsx";
import RichText from "~/components/RichText.tsx";
import Textarea from "~/components/Textarea.tsx";
import { ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS } from "~/resources/staticRoutes.ts";
import { interoperabilityExplanationParagraphs } from "~/routes/dokumentation/interoperability/explanationMarkdown.ts";
import { InteroperabilityRatingSelect } from "~/routes/dokumentation/interoperability/InteroperabilityRatingSelect.tsx";
import {
  Section,
  sections,
} from "~/routes/dokumentation/interoperability/Sections.tsx";

const assessmentFormSchema = z.record(z.string(), z.any());

type InteroperabilityLevelSectionProps = Readonly<{
  form: FormApi<z.infer<typeof assessmentFormSchema>>;
  level: string;
  levelDe: string;
  description?: ReactNode;
}>;

function LevelAssessmentForm({
  form,
  level,
  levelDe,
  description,
}: InteroperabilityLevelSectionProps) {
  const scope = form.scope(`level-${level}.rating`);

  return (
    <div className="space-y-32">
      <InteroperabilityRatingSelect levelDe={levelDe} scope={scope} />
      <Textarea
        description={description}
        scope={form.scope(`level-${level}.detail`)}
      >
        Bitte begründen Sie Ihre Bewertung
      </Textarea>
    </div>
  );
}

export function ExplanationParagraph({
  markdown,
}: Readonly<{ markdown: string }>) {
  return (
    <DetailsSummary title={"Was soll hier geprüft werden?"}>
      <div className={"ds-body-01-reg max-w-prose"}>
        <RichText markdown={markdown} />
      </div>
    </DetailsSummary>
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
  const form = useForm({
    schema: assessmentFormSchema,
    defaultValues: {},
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
          <h2>1. Rechtliche Auswirkungen</h2>

          <ExplanationParagraph
            markdown={interoperabilityExplanationParagraphs.legal}
          />

          <ExamplesList level="legal" />

          <LevelAssessmentForm
            form={form}
            level={"legal"}
            levelDe={"rechtliche"}
          />
        </div>
        <div className="space-y-16">
          <h2>2. Organisatorische Auswirkungen</h2>
          <ExplanationParagraph
            markdown={interoperabilityExplanationParagraphs.organizational}
          />
          <ExamplesList level="organizational" />
          <LevelAssessmentForm
            form={form}
            level={"organizational"}
            levelDe={"organisatorische"}
          />
        </div>
        <div className="space-y-16">
          <h2>3. Semantische Auswirkungen</h2>
          <ExplanationParagraph
            markdown={interoperabilityExplanationParagraphs.semantic}
          />
          <ExamplesList level="semantic" />

          <LevelAssessmentForm
            form={form}
            level={"semantic"}
            levelDe={"semantische"}
          />
        </div>
        <div className="space-y-16">
          <h2>4. Technische Auswirkungen</h2>
          <ExplanationParagraph
            markdown={interoperabilityExplanationParagraphs.technical}
          />
          <ExamplesList level="technical" />

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
