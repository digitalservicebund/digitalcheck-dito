import {
  dokumentation_beteiligungsformate,
  dokumentation_regelungsvorhabenTitel,
} from "@/config/routes";
import { z } from "zod";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import type { VersionedData } from "~/utils/localStorageVersioned";

export const DATA_SCHEMA_VERSION_V1 = "1";
export const DATA_SCHEMA_VERSION_V2 = "2";

export type V1 = typeof DATA_SCHEMA_VERSION_V1;
export type V2 = typeof DATA_SCHEMA_VERSION_V2;

export type DataSchemaVersion =
  | typeof DATA_SCHEMA_VERSION_V1
  | typeof DATA_SCHEMA_VERSION_V2;

const { principlePages, participation, info } = digitalDocumentation;

export const policyHeaderSchema = z.object({
  title: z.string().min(1, { message: info.inputTitle.error }),
  organization: z.string().optional(),
  publicationStatus: z.enum(["published", "planned"]).optional(),
  publicationDate: z.string().optional(),
  publicationLink: z.string().optional(),
});

export const participationSchema = z.object({
  formats: z
    .string()
    .min(1, { message: participation.formats.textField.errorMessage }),
  results: z
    .string()
    .min(1, { message: participation.results.textField.errorMessage }),
});

export const EU_INTEROPERABILITY_OUTCOME_IDS = [
  "REQUIRED",
  "NOT_REQUIRED_INDICATES_PRECHECK",
  "NOT_REQUIRED_NO_DECISION_PROCESS",
  "NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY",
  "NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS",
  "NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION",
  "NOT_REQUIRED_NOT_FIRST_ASSESSMENT",
] as const;

export const euInteroperabilityOutcomeSchema = z.object({
  outcomeId: z.enum(EU_INTEROPERABILITY_OUTCOME_IDS).optional(),
});

export const principleAnswerOnlySchema = z.object({
  answer: z.enum(
    [
      principlePages.radioOptions[0],
      principlePages.radioOptions[1],
      principlePages.radioOptions[2],
    ],
    { message: principlePages.errors.answerError },
  ),
});

const principlePositiveAnswerSchemaV2 = z.object({
  answer: z.literal(principlePages.radioOptions[0]),
  aspects: z
    .array(z.string(), {
      message: "Bitte geben Sie mindestens einen Schwerpunkt an",
    })
    .min(1, {
      message: "Bitte geben Sie mindestens einen Schwerpunkt an",
    }),
});

const principleNegativeAnswerSchemaV2 = z.object({
  answer: z.literal(principlePages.radioOptions[1]),
  aspects: z.undefined().optional(),
});

const principleIrrelevantAnswerSchemaV2 = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  aspects: z.undefined().optional(),
});

const principleBaseSchemaV2 = z.object({
  reasoning: z
    .string()
    .min(1, { message: "Bitte geben Sie eine Erklärung an." }),
});

export const principleAnswerSchemaV2 = z
  .discriminatedUnion(
    "answer",
    [
      principlePositiveAnswerSchemaV2,
      principleNegativeAnswerSchemaV2,
      principleIrrelevantAnswerSchemaV2,
    ],
    { message: principlePages.errors.answerError },
  )
  .and(principleBaseSchemaV2);

export const principleSchemaV2 = principleAnswerSchemaV2.and(
  z.object({
    id: z.string(),
  }),
);

export const defaultTitleValues: PolicyTitle = {
  title: "",
  organization: undefined,
  publicationStatus: "published",
  publicationDate: "",
  publicationLink: "",
};

export const defaultParticipationValues: Participation = {
  formats: "",
  results: "",
};

export const defaultValues: DocumentationSchemaV2 = {
  policyTitle: defaultTitleValues,
  participation: defaultParticipationValues,
  principles: [],
};

export const documentationSchemaV2 = z.object({
  policyTitle: policyHeaderSchema.optional(),
  participation: participationSchema.optional(),
  euInteroperabilityOutcome: euInteroperabilityOutcomeSchema.optional(),
  principles: z.array(principleSchemaV2).optional(),
});

export const getDocumentationSchemaFormUrl = (url: string) => {
  if (url === dokumentation_regelungsvorhabenTitel.path)
    return policyHeaderSchema;
  else if (url === dokumentation_beteiligungsformate.path)
    return participationSchema;
  else return principleSchemaV2;
};

// V1 types are kept solely so migrateV1ToV2 (in DocumentationDataProvider) can
// type its input. V1 data may still exist in users' localStorage from before
// the simplifiedPrincipleFlow rollout.
export type PrincipleReasoningV1 = {
  aspect?: string;
  checkbox?: "on" | true;
  paragraphs?: string;
  reason?: string;
};

type PrincipleV1 = {
  id: string;
  answer: (typeof principlePages.radioOptions)[number];
  reasoning?: PrincipleReasoningV1[] | string;
};

type PrincipleV2 = z.infer<typeof principleSchemaV2>;

export type Principle<V extends DataSchemaVersion = V2> = V extends V1
  ? PrincipleV1
  : PrincipleV2;

export type PolicyTitle = z.infer<typeof policyHeaderSchema>;
export type Participation = z.infer<typeof participationSchema>;
export type EuInteroperabilityOutcome = z.infer<
  typeof euInteroperabilityOutcomeSchema
>;

type DocumentationSchemaV2 = z.infer<typeof documentationSchemaV2>;

export const bindingRequirementsSchema = z.object({
  functions: z.array(z.string()),
  requirements: z.array(
    z.object({
      legalReference: z.string().optional(),
      description: z.string().optional(),
      services: z.string().optional(),
      serviceAreas: z.array(z.string()).default([]),
      stakeholderGroups: z.array(z.string()).default([]),
    }),
  ),
});

const interoperabilityRatingSchema = z.enum([
  "positive",
  "neutral",
  "risky",
  "not-applicable",
]);

export const interoperabilityAssessmentLevelSchema = z.object({
  detail: z.string().optional(),
  rating: z.union([interoperabilityRatingSchema, z.literal("")]).optional(),
});

export const interoperabilityAssessmentSchema = z.object({
  legal: interoperabilityAssessmentLevelSchema,
  organizational: interoperabilityAssessmentLevelSchema,
  semantic: interoperabilityAssessmentLevelSchema,
  technical: interoperabilityAssessmentLevelSchema,
});

export type BindingRequirementsData = z.infer<typeof bindingRequirementsSchema>;
export type InteroperabilityAssessmentData = z.infer<
  typeof interoperabilityAssessmentSchema
>;

export type DocumentationData<V extends DataSchemaVersion = V2> = {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  euInteroperabilityOutcome?: EuInteroperabilityOutcome;
  bindingRequirements?: BindingRequirementsData;
  interoperabilityAssessment?: InteroperabilityAssessmentData;
  principles?: Principle<V>[];
  initialized?: boolean;
} & VersionedData;
