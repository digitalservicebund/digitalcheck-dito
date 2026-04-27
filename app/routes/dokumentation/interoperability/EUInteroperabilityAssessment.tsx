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

type Question = {
  id: string;
  label: string;
  requiresDetailsText?: string;
  isOwnStatement?: boolean;
};

type QuestionGroup = {
  title: string;
  questions: Question[];
};

type Section = {
  title: string;
  intro?: string;
  groups: QuestionGroup[];
};

type Answer = {
  checked: boolean;
  details: string;
  ownStatement: string;
};

type AnswersById = Record<string, Answer>;

const STORAGE_KEY = "eu-interoperability-assessment-v1";

const sections: Section[] = [
  {
    title: "Rechtliche Interoperabilität",
    groups: [
      {
        title: "Positive Auswirkungen",
        questions: [
          {
            id: "rechtlich-pos-1",
            label:
              "Das Vorhaben ist explizit auf bestehende sektorale oder querschnittliche EU-Rechtsvorschriften abgestimmt (z. B. DSGVO, Open-Data-Richtlinie, europäische Statistikverordnung).",
            requiresDetailsText:
              "Bitte spezifizieren Sie, worauf das Vorhaben abgestimmt ist:",
          },
          {
            id: "rechtlich-pos-2",
            label:
              "Die Regelung benennt und bevollmächtigt klar die Behörden, die für den grenzüberschreitenden Datenaustausch und die Beseitigung von Hindernissen zuständig sind.",
          },
          {
            id: "rechtlich-pos-3",
            label:
              "Das Vorhaben legt einen gemeinsamen Mindestrahmen oder ein „Einsichtsrecht“ fest, das in allen Mitgliedstaaten einheitlich gilt.",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "rechtlich-pos-4",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
      {
        title: "Neutrale oder negative Auswirkungen",
        questions: [
          {
            id: "rechtlich-neg-1",
            label:
              "Die Rechtsgrundlage für Interoperabilität wird auf eine separate, künftige oder unverbindliche Initiative verschoben.",
          },
          {
            id: "rechtlich-neg-2",
            label:
              "Es wurden grenzüberschreitende Rechtshindernisse identifiziert, die im Rahmen dieses Vorhabens nicht angegangen werden (z. B. Notwendigkeit einer Überarbeitung des neuen Rechtsrahmens).",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "rechtlich-neg-3",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
    ],
  },
  {
    title: "Organisatorische Interoperabilität",
    intro: "Bitte kreuzen Sie Zutreffendes an.",
    groups: [
      {
        title: "Positive Auswirkungen",
        questions: [
          {
            id: "orga-pos-1",
            label:
              "Das Vorhaben definiert klare Governance-Strukturen und Informationsflüsse zwischen nationalen Stellen und EU-Einrichtungen.",
          },
          {
            id: "orga-pos-2",
            label:
              "Es werden im Zuge der geplanten Umsetzung des Vorhabens Verwaltungsprozesse angepasst, um die Nutzung grenzüberschreitender Zertifikate oder Dienste zu erleichtern (z. B. „Once-Only“-Prinzip).",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "orga-pos-3",
            label:
              "Es werden Bestimmungen für andere Normen (z.B. Verwaltungsvorschriften) zur Festlegung praktischer Modalitäten, Fristen und Sicherheitsmaßnahmen für die Datenübermittlung festgelegt.",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "orga-pos-4",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
      {
        title: "Neutrale oder negative Auswirkungen",
        questions: [
          {
            id: "orga-neg-1",
            label:
              "Es werden keine bestehenden Prozesse angepasst, da davon ausgegangen wird, dass bestehende Organisationsstrukturen ausreichen.",
          },
          {
            id: "orga-neg-2",
            label:
              "Rollen und Verantwortlichkeiten der Akteure bleiben undefiniert oder offen für stark voneinander abweichende Auslegungen der Länder oder Kommunen.",
          },
          {
            id: "orga-neg-3",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
    ],
  },
  {
    title: "Semantische Interoperabilität",
    intro: "Bitte kreuzen Sie Zutreffendes an.",
    groups: [
      {
        title: "Positive Auswirkungen",
        questions: [
          {
            id: "semantik-pos-1",
            label:
              "Das Vorhaben schreibt die Verwendung etablierter internationaler oder EU-weiter Metadatenstandards vor (z. B. SDMX, DCAT-AP, SIMS).",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "semantik-pos-2",
            label:
              "Die Informationsanforderungen und Datenvariablen sind im Regelungstext oder in dessen Anhängen präzise definiert oder werden von anderen Normen präzisiert.",
          },
          {
            id: "semantik-pos-3",
            label:
              "Es werden standardisierter Formate für spezifische Datenpunkte referenziert (z. B. Datum/Uhrzeit, gemeinsame Identifikatoren oder harmonisierte Formeln).",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
        ],
      },
      {
        title: "Neutrale oder negative Auswirkungen",
        questions: [
          {
            id: "semantik-neg-1",
            label:
              "Nennt das Vorhaben weit gefasste oder nicht präskriptive Definitionen (z. B. „elektronische Form“), die nicht interoperable Formate wie unstrukturierte PDFs oder Videos zulassen?",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "semantik-neg-2",
            label:
              "Die Bedeutung der ausgetauschten Daten wird ohne gemeinsamen semantischen Rahmen dem Ermessen einzelner Umsetzungsakteure überlassen.",
          },
        ],
      },
    ],
  },
  {
    title: "Technische Interoperabilität",
    intro:
      "Fokus: Infrastruktur, Schnittstellenspezifikationen und Maschinenlesbarkeit.",
    groups: [
      {
        title: "Bestimmung eines positiven Effekts",
        questions: [
          {
            id: "technik-pos-1",
            label:
              "Der Vorschlag fördert die Wiederverwendung bestehender technischer EU-Lösungen oder gemeinsamer Infrastrukturen (z. B. MOVE-HUB, eIDAS, SDG oder OOTS).",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "technik-pos-2",
            label:
              "Der Vorschlag sieht ein zentrales Register oder eine zentrale Anlaufstelle vor, um die Notwendigkeit komplexer Multi-Point-Integrationen zu verringern.",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "technik-pos-3",
            label:
              "Es werden technische Dokumentationen und APIs zur Verfügung gestellt, um sicherzustellen, dass lokale Systeme nahtlos angebunden werden können.",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "technik-pos-4",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
      {
        title: "Erkennung eines neutralen/negativen Effekts",
        questions: [
          {
            id: "technik-neg-1",
            label:
              "Erlaubt der Vorschlag „papieräquivalente“ digitale Formate (z. B. unstrukturierte Word-Dokumente) anstelle von maschinenlesbaren Daten?",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "technik-neg-2",
            label:
              "Stellt die Komplexität der vorgeschlagenen technischen Lösung ein erhebliches Risiko oder ein Hindernis für die Umsetzung in bestimmten Mitgliedstaaten dar?",
            requiresDetailsText: "Bitte spezifizieren Sie:",
          },
          {
            id: "technik-neg-3",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
    ],
  },
];

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
