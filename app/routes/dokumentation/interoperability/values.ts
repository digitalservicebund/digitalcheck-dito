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
  { value: "localPublicSectorBody", label: "Lokale öffentliche Einrichtung" },
  {
    value: "regionalPublicSectorBody",
    label: "Regionale öffentliche Einrichtung",
  },
  {
    value: "nationalPublicSectorBody",
    label: "Nationale öffentliche Einrichtung",
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
