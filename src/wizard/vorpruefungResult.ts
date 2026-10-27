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

const noDigitalReference = "Kein Digitalbezug aus dieser Frage.";
const unsure = "Noch offen – prüfen Sie diese Antwort.";

// Title and path come from the question page, the explanations per answer
// describe its effect on the result.
export const resultRows = {
  "it-system": {
    route: assistent_vorpruefung_itSystem,
    explanations: {
      yes: "Neues oder angepasstes IT-System – direkter Digitalbezug.",
      no: noDigitalReference,
      unsure,
    },
  },
  "verpflichtungen-fuer-beteiligte": {
    route: assistent_vorpruefung_verpflichtungenFuerBeteiligte,
    explanations: {
      yes: "Mitwirkungspflichten sollten digital erfüllbar sein.",
      no: noDigitalReference,
      unsure,
    },
  },
  datenaustausch: {
    route: assistent_vorpruefung_datenaustausch,
    explanations: {
      yes: "Datenwiederverwendung braucht digitale Schnittstellen.",
      no: noDigitalReference,
      unsure,
    },
  },
  kommunikation: {
    route: assistent_vorpruefung_kommunikation,
    explanations: {
      yes: "Interaktion mit Behörden sollte digital möglich sein.",
      no: noDigitalReference,
      unsure,
    },
  },
  automatisierung: {
    route: assistent_vorpruefung_automatisierung,
    explanations: {
      yes: "Schritte der Umsetzung lassen sich digital automatisieren.",
      no: noDigitalReference,
      unsure,
    },
  },
  "eu-bezug": {
    route: assistent_vorpruefung_euBezug,
    explanations: {
      yes: "Löst die Anforderungen der Verordnung (EU) 2024/903 aus.",
      no: "Keine Anforderungen aus der Verordnung (EU) 2024/903.",
      unsure,
    },
  },
} as const satisfies Record<
  VorpruefungQuestion,
  { route: Route; explanations: Record<Answer, string> }
>;

// Same order as the questions in the flow
export const questionNames = Object.keys(
  vorpruefungFields,
) as VorpruefungQuestion[];
