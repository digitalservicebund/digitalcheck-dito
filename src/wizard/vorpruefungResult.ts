import {
  assistent_vorpruefung_automatisierung,
  assistent_vorpruefung_datenaustausch,
  assistent_vorpruefung_euBezug,
  assistent_vorpruefung_itSystem,
  assistent_vorpruefung_kommunikation,
  assistent_vorpruefung_verpflichtungenFuerBeteiligte,
  type Route,
} from "@/config/routes";
import {
  answerOptions,
  vorpruefungFields,
  type Answer,
  type VorpruefungQuestion,
} from "./vorpruefungSchema";

export type VorpruefungResult =
  /** Datenaustausch with the EU, but none at all */
  | "contradiction"
  /** Not a single "yes", but at least one "unsure" */
  | "unsure"
  | "negative"
  | "digital"
  | "digitalAndInteroperability";

// All questions but the EU-Bezug, which only decides on the Interoperabilität
const digitalQuestions = [
  "it-system",
  "verpflichtungen-fuer-beteiligte",
  "datenaustausch",
  "kommunikation",
  "automatisierung",
] as const satisfies VorpruefungQuestion[];

/** The result for the answers, as defined in the design ("Logik") */
export function getVorpruefungResult(
  data: Partial<Record<VorpruefungQuestion, Answer>>,
): VorpruefungResult {
  const euBezug = data["eu-bezug"];
  if (data.datenaustausch === "no" && euBezug === "yes") return "contradiction";

  const answers = digitalQuestions.map((question) => data[question]);
  if (answers.includes("yes")) {
    // An unsure EU-Bezug counts as no clear Interoperabilität
    return euBezug === "yes" ? "digitalAndInteroperability" : "digital";
  }
  return [...answers, euBezug].includes("unsure") ? "unsure" : "negative";
}

export const answerLabels = Object.fromEntries(
  answerOptions.map(({ value, label }) => [value, label]),
) as Record<Answer, string>;

// Title and path come from the question page, the explanation summarizes the
// question and is the same for every answer.
export const resultRows = {
  "it-system": {
    route: assistent_vorpruefung_itSystem,
    explanation: "Muss ein IT-System angepasst oder neu entwickelt werden?",
  },
  "verpflichtungen-fuer-beteiligte": {
    route: assistent_vorpruefung_verpflichtungenFuerBeteiligte,
    explanation: "Entstehen durch die Regelung Mitwirkungspflichten?",
  },
  datenaustausch: {
    route: assistent_vorpruefung_datenaustausch,
    explanation: "Soll ein Datenaustausch stattfinden?",
  },
  kommunikation: {
    route: assistent_vorpruefung_kommunikation,
    explanation:
      "Kommt es zu einer Interaktion zwischen Adressatinnen und Adressaten?",
  },
  automatisierung: {
    route: assistent_vorpruefung_automatisierung,
    explanation: "Können Schritte automatisiert werden?",
  },
  "eu-bezug": {
    route: assistent_vorpruefung_euBezug,
    explanation:
      "Sollen Daten zwischen EU-Mitgliedstaaten ausgetauscht werden?",
  },
} as const satisfies Record<
  VorpruefungQuestion,
  { route: Route; explanation: string }
>;

// Same order as the questions in the flow
export const questionNames = Object.keys(
  vorpruefungFields,
) as VorpruefungQuestion[];
