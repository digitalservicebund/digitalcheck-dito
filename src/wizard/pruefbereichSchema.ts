import { showLaender } from "@/config/features";
import { z } from "zod";

// The Prüfbereich (Bund or a Bundesland), shared by both wizards and chosen on
// their start pages. Only depends on zod and the feature flags, so it can be
// imported anywhere.

// Bund comes first, so it's preselected. The Länder are only offered (and
// accepted) with the feature flag, otherwise stored ones fall back to the Bund.
const allOptions = [
  { value: "Bund", label: "Bund" },
  { value: "Brandenburg", label: "Brandenburg" },
  { value: "Hessen", label: "Hessen" },
  { value: "Nordrhein-Westfalen", label: "Nordrhein-Westfalen" },
] as const;

export const pruefbereichOptions = allOptions.filter(
  (option) => showLaender || option.value === "Bund",
);

export type Pruefbereich = (typeof pruefbereichOptions)[number]["value"];

export const pruefbereich = z.enum(
  pruefbereichOptions.map((option) => option.value),
  "Bitte wählen Sie den Bund oder Ihr Bundesland aus.",
);
