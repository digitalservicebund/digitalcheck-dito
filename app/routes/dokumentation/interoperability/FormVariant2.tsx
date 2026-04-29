import { useForm } from "@rvf/react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import Checkbox from "~/components/Checkbox";
import Input from "~/components/Input";
import NewTabLink from "~/components/NewTabLink.tsx";
import Textarea from "~/components/Textarea";
import {
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes.ts";
import { InteroperabilityRatingSelect } from "~/routes/dokumentation/interoperability/InteroperabilityRatingSelect.tsx";
import {
  AnswersById,
  Question,
  sections,
} from "~/routes/dokumentation/interoperability/Sections.tsx";

const STORAGE_KEY = "eu-interoperability-assessment-v1";
const assessmentFormSchema = z.record(z.string(), z.any());

type AssessmentFormValues = Record<
  string,
  {
    checked?: "on" | true;
    details?: string;
    ownStatement?: string;
  }
>;

function createInitialAnswers(questions: Question[]): AnswersById {
  return questions.reduce<AnswersById>((acc, question) => {
    acc[question.id] = {
      checked: false,
      details: "",
      ownStatement: "",
    };
    return acc;
  }, {});
}

function toFormValues(answers: AnswersById): AssessmentFormValues {
  return Object.entries(answers).reduce<AssessmentFormValues>(
    (acc, [questionId, answer]) => {
      acc[questionId] = {
        checked: answer.checked ? "on" : undefined,
        details: answer.details,
        ownStatement: answer.ownStatement,
      };
      return acc;
    },
    {},
  );
}

function toAnswersById(
  values: Partial<AssessmentFormValues>,
  questions: Question[],
): AnswersById {
  const defaults = createInitialAnswers(questions);

  for (const question of questions) {
    const answer = values[question.id];

    defaults[question.id] = {
      checked: !!answer?.checked,
      details: answer?.details ?? "",
      ownStatement: answer?.ownStatement ?? "",
    };
  }

  return defaults;
}

export default function FormVariant2() {
  const allQuestions = useMemo(
    () =>
      sections.flatMap((section) =>
        section.groups.flatMap((group) => group.questions),
      ),
    [],
  );
  const defaultAnswers = useMemo(
    () => createInitialAnswers(allQuestions),
    [allQuestions],
  );
  const form = useForm({
    schema: assessmentFormSchema,
    defaultValues: toFormValues(defaultAnswers),
    handleSubmit: async () => {},
  });

  const [answersById, setAnswersById] = useState<AnswersById>(defaultAnswers);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<AnswersById>;
      const hydrated = toAnswersById(
        parsed as Partial<AssessmentFormValues>,
        allQuestions,
      );

      setAnswersById(hydrated);
      form.resetForm(toFormValues(hydrated));
    } catch {
      setAnswersById(defaultAnswers);
      form.resetForm(toFormValues(defaultAnswers));
    }
  }, [allQuestions, defaultAnswers, form]);

  useEffect(() => {
    const unsubscribe = form.subscribe.value((values) => {
      const normalizedAnswers = toAnswersById(
        values as Partial<AssessmentFormValues>,
        allQuestions,
      );

      setAnswersById(normalizedAnswers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedAnswers));
    });

    return () => unsubscribe();
  }, [allQuestions, form]);

  return (
    <>
      <div className={"space-y-8"}>
        <p>
          Ihre Angaben im Schritt{" "}
          <a
            href={ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.url}
            className={"text-link"}
          >
            "{ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.title}"
          </a>{" "}
          haben ergeben, dass Sie für Ihr Vorhaben eine verpflichtende
          Interoperabilitätsbewertung einreichen müssen.
        </p>
        <p>
          Sie können das Formular auf dieser Seite nutzen, um eine
          vorausgefüllte Interoperabilitätsbewertung zu erstellen. Diese wird
          als Anhang an die Digitalcheck-Dokumentation gespeichert. Sie erhalten
          im letzten Schritt die Möglichkeit, diese direkt an die deutsche
          nationale Kontaktstelle (2024/903 Art. 17) zu übermitteln, welche sie
          prüfen und anschließend an die EU-Kommission weiterleiten wird.
        </p>
        <p>
          Alternativ können Sie die Interoperabilitätsbewertung auch direkt an
          die EU-Kommission übermitteln. Nutzen Sie hierfür das{" "}
          <NewTabLink
            to={
              "https://interoperable-europe.ec.europa.eu/collection/assessments/online-tool-assessments"
            }
            className={"text-link"}
          >
            Online-Tool
          </NewTabLink>
          .
        </p>
        <a className="text-link" href={ROUTE_DOCUMENTATION_SUMMARY.url}>
          Überspringen
        </a>
      </div>
      <form {...form.getFormProps()}>
        {sections.map((section) => (
          <section
            key={section.title}
            className={"mt-32 mb-64 space-y-32 border-t border-gray-600 pt-32"}
          >
            <h3 className={"mb-16"}>{section.title}</h3>
            {section.intro ? <p>{section.intro}</p> : null}

            {section.groups.map((group) => (
              <div key={group.title}>
                <h4 className={"ds-label-01-bold mt-32 mb-16"}>
                  {group.title}
                </h4>

                {group.questions.map((question) => {
                  const answer = answersById[question.id];

                  return (
                    <div key={question.id} style={{ marginBottom: "0.75rem" }}>
                      <Checkbox
                        scope={form.scope(`${question.id}.checked`)}
                        look="regular"
                      >
                        {question.label}
                      </Checkbox>

                      {question.requiresDetailsText && answer?.checked ? (
                        <div className={"mt-8 ml-56"}>
                          <Input
                            type="text"
                            scope={form.scope(`${question.id}.details`)}
                          >
                            {question.requiresDetailsText}
                          </Input>
                        </div>
                      ) : null}

                      {question.isOwnStatement && answer?.checked ? (
                        <div className={"mt-8 ml-56"}>
                          <Textarea
                            scope={form.scope(`${question.id}.ownStatement`)}
                            rows={4}
                          ></Textarea>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
            <InteroperabilityRatingSelect
              scope={form.scope(`level-${section.title}.rating`)}
              levelDe={section.levelDe}
            />
          </section>
        ))}
      </form>
    </>
  );
}
