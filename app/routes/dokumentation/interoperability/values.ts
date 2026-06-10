import {
  InteroperabilityAssessmentData,
  InteroperabilityAssessmentLevel,
} from "~/routes/dokumentation/documentationDataSchema.ts";
import { keyValueToMap } from "~/utils/keyValue.ts";

export type Option = {
  value: string;
  label: string;
};
export const serviceAreaOptions: readonly Option[] = [
  { value: "defense", label: "Verteidigung" },
  { value: "economicAffairs", label: "Wirtschaftliche Angelegenheiten" },
  { value: "education", label: "Bildung" },
  { value: "environmentalProtection", label: "Umweltschutz" },
  { value: "generalPublicServices", label: "Allgemeine öffentliche Dienste" },
  { value: "health", label: "Gesundheit" },
  {
    value: "housingAndCommunityAmenities",
    label: "Wohnungswesen und kommunale Einrichtungen",
  },
  {
    value: "publicOrderAndSafety",
    label: "Öffentliche Ordnung und Sicherheit",
  },
  {
    value: "recreationCultureAndReligion",
    label: "Freizeit, Kultur und Religion",
  },
  { value: "socialProtection", label: "Sozialschutz" },
] as const;
export const stakeholderOptions: readonly Option[] = [
  {
    value: "localPublicSectorBody",
    label: "Öffentliche Stelle (Kommunen / lokal)",
  },
  {
    value: "regionalPublicSectorBody",
    label: "Öffentliche Stelle (Länder / regional)",
  },
  {
    value: "nationalPublicSectorBody",
    label: "Öffentliche Stelle (Bund / national)",
  },
  {
    value: "europeanUnionInstitution",
    label: "EU-Institution",
  },
  { value: "europeanUnionAgency", label: "EU-Agentur" },
  { value: "europeanUnionBody", label: "EU-Einrichtung" },
  { value: "privateBusinesses", label: "Private Unternehmen" },
] as const;

export const interoperabilityRatingOptions: Option[] = [
  {
    label: "förderlich",
    value: "positive",
  },
  {
    label: "neutral",
    value: "neutral",
  },
  {
    label: "negativ oder nicht förderlich",
    value: "risky",
  },
  {
    label: "nicht anwendbar",
    value: "not-applicable",
  },
];
export const interoperabilityRatingOptions2: Option[] = [
  {
    label: "Ja, gänzlich oder teilweise",
    value: "positive",
  },
  {
    label: "Nein",
    value: "risky",
  },
  {
    label: "nicht relevant",
    value: "not-applicable",
  },
];
const ratingMap = keyValueToMap(interoperabilityRatingOptions2);

export function formatRating(
  rating?: InteroperabilityAssessmentLevel["rating"],
) {
  if (!rating) {
    return undefined;
  }
  return ratingMap.get(rating);
}
export const defaultAssessmentValues: InteroperabilityAssessmentData = {
  legal: { detail: "", rating: "" },
  organizational: { detail: "", rating: "" },
  semantic: { detail: "", rating: "" },
  technical: { detail: "", rating: "" },
};
