import { z } from "zod";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import type { VersionedData } from "~/utils/localStorageVersioned";

export const DATA_SCHEMA_VERSION_V1 = "1";
export const DATA_SCHEMA_VERSION_V2 = "2";

export type V1 = typeof DATA_SCHEMA_VERSION_V1;
export type V2 = typeof DATA_SCHEMA_VERSION_V2;

export type DataSchemaVersion =
  | typeof DATA_SCHEMA_VERSION_V1
  | typeof DATA_SCHEMA_VERSION_V2;

const { principlePages, participation, info } = digitalDocumentation;

export const policyTitleSchema = z.object({
  title: z.string().min(1, { message: info.inputTitle.error }),
});

export const participationSchema = z.object({
  formats: z
    .string()
    .min(1, { message: participation.formats.textField.errorMessage }),
  results: z
    .string()
    .min(1, { message: participation.results.textField.errorMessage }),
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
  aspects: z.literal(undefined),
});

const principleIrrelevantAnswerSchemaV2 = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  aspects: z.literal(undefined),
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
  policyTitle: policyTitleSchema.optional(),
  participation: participationSchema.optional(),
  principles: z.array(principleSchemaV2).optional(),
});

export const getDocumentationSchemaFormUrl = (url: string) => {
  if (url === ROUTE_DOCUMENTATION_TITLE.url) return policyTitleSchema;
  else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
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

export type PolicyTitle = z.infer<typeof policyTitleSchema>;
export type Participation = z.infer<typeof participationSchema>;

type DocumentationSchemaV2 = z.infer<typeof documentationSchemaV2>;

export type DocumentationData<V extends DataSchemaVersion = V2> = {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  principles?: Principle<V>[];
} & VersionedData;
