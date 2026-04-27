import { useEffect, useMemo, useState } from "react";
import { LinkButton } from "~/components/Button.tsx";
import Checkbox from "~/components/Checkbox";
import Input from "~/components/Input";
import NewTabLink from "~/components/NewTabLink.tsx";
import Textarea from "~/components/Textarea";
import {
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes.ts";
import {
  Answer,
  AnswersById,
  Question,
  sections,
} from "~/routes/dokumentation/interoperability/Sections.tsx";

const STORAGE_KEY = "eu-interoperability-assessment-v1";

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

export default function EUInteroperabilityAssessment() {
  const allQuestions = useMemo(
    () =>
      sections.flatMap((section) =>
        section.groups.flatMap((group) => group.questions),
      ),
    [],
  );

  const [answersById, setAnswersById] = useState<AnswersById>(() =>
    createInitialAnswers(allQuestions),
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<AnswersById>;
      const defaults = createInitialAnswers(allQuestions);
      const hydrated: AnswersById = { ...defaults };

      for (const question of allQuestions) {
        const answer = parsed[question.id];
        if (!answer) {
          continue;
        }

        hydrated[question.id] = {
          checked: answer.checked ?? false,
          details: answer.details ?? "",
          ownStatement: answer.ownStatement ?? "",
        };
      }

      setAnswersById(hydrated);
    } catch {
      setAnswersById(createInitialAnswers(allQuestions));
    }
  }, [allQuestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answersById));
  }, [answersById]);

  const updateAnswer = (questionId: string, patch: Partial<Answer>) => {
    setAnswersById((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        ...patch,
      },
    }));
  };

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
        <LinkButton look="tertiary" to={ROUTE_DOCUMENTATION_SUMMARY.url}>
          Überspringen
        </LinkButton>
      </div>
      {sections.map((section) => (
        <section
          key={section.title}
          className={"mt-32 mb-64 border-t border-gray-600 pt-32"}
        >
          <h3 className={"mb-16"}>{section.title}</h3>
          {section.intro ? <p>{section.intro}</p> : null}

          {section.groups.map((group) => (
            <div key={group.title} style={{ marginBottom: "1rem" }}>
              <h4 className={"ds-label-01-bold mt-32 mb-16"}>{group.title}</h4>

              {group.questions.map((question) => {
                const answer = answersById[question.id];

                return (
                  <div key={question.id} style={{ marginBottom: "0.75rem" }}>
                    <Checkbox
                      checked={answer?.checked ?? false}
                      onChange={(event) =>
                        updateAnswer(question.id, {
                          checked: event.target.checked,
                        })
                      }
                    >
                      {question.label}
                    </Checkbox>

                    {question.requiresDetailsText && answer?.checked ? (
                      <div className={"mt-8 ml-56"}>
                        <Input
                          type="text"
                          value={answer.details}
                          onChange={(event) =>
                            updateAnswer(question.id, {
                              details: event.target.value,
                            })
                          }
                        >
                          {question.requiresDetailsText}
                        </Input>
                      </div>
                    ) : null}

                    {question.isOwnStatement && answer?.checked ? (
                      <div
                        style={{ marginTop: "0.4rem", marginLeft: "1.6rem" }}
                      >
                        <Textarea
                          value={answer.ownStatement}
                          onChange={(event) =>
                            updateAnswer(question.id, {
                              ownStatement: event.target.value,
                            })
                          }
                          rows={4}
                        >
                          Eigene Angaben:
                        </Textarea>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
