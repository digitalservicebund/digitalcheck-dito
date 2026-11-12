import { keyValueToMap } from "@/utils/keyValue.ts";

// The data read by the Word export, in the shape of the old Dokumentation
// (see fromDokumentationWizard)

export const DATA_SCHEMA_VERSION = "2";

/** The answers to a Prinzip, the first one being the positive answer */
export const principleAnswerOptions = [
  "Ja, gänzlich oder teilweise",
  "Nein",
  "Nicht relevant",
] as const;

export type PolicyTitle = {
  title: string;
  organization: string;
};

export type Participation = {
  formats: string;
  results: string;
};

export const EU_INTEROPERABILITY_OUTCOME_IDS = [
  "REQUIRED",
  "NOT_REQUIRED",
] as const;

export type EuInteroperabilityOutcome = {
  outcomeId?: (typeof EU_INTEROPERABILITY_OUTCOME_IDS)[number];
};

export type InteroperabilityMeta = {
  publicationStatus: "published" | "planned" | "";
  publicationDate?: string;
  publicationLink?: string;
};

export type Principle = {
  id: string;
  answer: (typeof principleAnswerOptions)[number];
  reasoning: string;
  /** Only for a positive answer */
  aspects?: string[];
};

export type BindingRequirementsData = {
  functions: string[];
  requirements: {
    legalReference?: string;
    description?: string;
    services?: string;
    serviceAreas: string[];
    stakeholderGroups: string[];
  }[];
};

export type InteroperabilityAssessmentLevel = {
  detail?: string;
  rating?: "positive" | "neutral" | "risky" | "not-applicable" | "";
};

export type InteroperabilityAssessmentData = {
  legal: InteroperabilityAssessmentLevel;
  organizational: InteroperabilityAssessmentLevel;
  semantic: InteroperabilityAssessmentLevel;
  technical: InteroperabilityAssessmentLevel;
};

export type DocumentationData = {
  version: string;
  policyTitle?: PolicyTitle;
  participation?: Participation;
  euInteroperabilityOutcome?: EuInteroperabilityOutcome;
  bindingRequirements?: BindingRequirementsData;
  interoperabilityAssessment?: Partial<InteroperabilityAssessmentData>;
  interoperabilityMeta?: InteroperabilityMeta;
  principles?: Principle[];
};

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

const interoperabilityRatingOptions: Option[] = [
  {
    label: "Ja, gänzlich oder teilweise",
    value: "positive",
  },
  {
    label: "Nein",
    value: "risky",
  },
  {
    label: "Nicht relevant",
    value: "not-applicable",
  },
];
const ratingMap = keyValueToMap(interoperabilityRatingOptions);

export const interoperabilityRatingPlaceholder = interoperabilityRatingOptions
  .map((option) => option.label)
  .join(" | ");

export function formatRating(
  rating?: InteroperabilityAssessmentLevel["rating"],
) {
  if (!rating) {
    return undefined;
  }
  return ratingMap.get(rating);
}

export const euInteroperabilityQuestion = {
  label: "Ergab die Vorprüfung Bezug zur EU-Interoperabilität?",
  options: [
    {
      value: "REQUIRED",
      label: "Ja, Bezug zur EU-Interoperabilität ist vorhanden.",
    },
    {
      value: "NOT_REQUIRED",
      label: "Nein, es ist kein Bezug vorhanden.",
    },
  ] as const satisfies {
    label: string;
    value: (typeof EU_INTEROPERABILITY_OUTCOME_IDS)[number];
  }[],
};
