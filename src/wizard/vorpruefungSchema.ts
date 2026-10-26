import { z } from "zod";
import { pruefbereich } from "./pruefbereichSchema";

// Single source of truth for the fields of the Vorprüfung: used by the flow
// (page schemas, guards) and by the form components (validation).
// Only depends on zod, so it can be imported anywhere, e.g. in islands.

// Labels live next to the values, so the rendered options can't drift from the schema.
export const answerOptions = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nein" },
  { value: "unsure", label: "Ich bin unsicher" },
] as const;

export type Answer = (typeof answerOptions)[number]["value"];

export const answerValues = answerOptions.map((option) => option.value);

const answer = z.enum(answerValues, "Bitte wählen Sie eine Option aus.");

// Field names are the question ids: user data is one flat object across all pages.
export const questionFields = {
  "it-system": answer,
  "verpflichtungen-fuer-beteiligte": answer,
  datenaustausch: answer,
  kommunikation: answer,
  automatisierung: answer,
  "eu-bezug": answer,
} as const;

export type VorpruefungQuestion = keyof typeof questionFields;

// The Prüfbereich is chosen on the start page, outside the flow's pages
export const vorpruefungFields = { pruefbereich, ...questionFields } as const;

// All questions answered. Without a Prüfbereich, the Bund is assumed.
export const vorpruefungSchema = z.object(questionFields);
