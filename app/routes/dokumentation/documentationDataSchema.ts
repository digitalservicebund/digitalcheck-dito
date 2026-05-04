import { z } from "zod";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import type { VersionedData } from "~/utils/localStorageVersioned";
import { EU_INTEROPERABILITY_OUTCOME_IDS } from "./euInteroperabilityFlow.tsx";

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

export const euInteroperabilityOutcomeSchema = z.object({
  outcomeId: z.enum(EU_INTEROPERABILITY_OUTCOME_IDS),
});

// TODO: delete when feature flag simplifiedPrincipleFlow is on
/**
 * @deprecated use new principleReasoningSchema below
 */
const principleReasoningSchemaV1 = z
  .object({
    aspect: z.string().optional(),
    checkbox: z.literal(["on", true]).optional(), // HTML checkboxes use "on" as value when checked whilst rvf converts in into boolean
    paragraphs: z.string().optional(),
    reason: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.checkbox === undefined) return;

    if (!val.paragraphs && !val.reason) {
      ctx.addIssue({
        code: "custom",
        message: principlePages.errors.paragraphsError,
        input: val,
        path: ["paragraphs"],
      });

      ctx.addIssue({
        code: "custom",
        message: principlePages.errors.reasonError,
        input: val,
        path: ["reason"],
      });
    }
  });

// TODO: delete when feature flag simplifiedPrincipleFlow is on
/**
 * @deprecated use new principlePositiveAnswerSchema below
 */
const principlePositiveAnswerSchemaV1 = z.object({
  answer: z.literal(principlePages.radioOptions[0]),
  reasoning: z
    .array(principleReasoningSchemaV1, {
      error: principlePages.errors.reasoningError,
    })
    .optional()
    .superRefine((val, ctx) => {
      const checkedItems = val?.filter((item) => item.checkbox !== undefined);
      if (!checkedItems || checkedItems.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: principlePages.errors.reasoningError,
          input: val,
        });
      }
    }),
});

/**
 * @deprecated use new principleNegativeAnswerSchemaV2
 */
export const principleNegativeAnswerSchemaV1 = z.object({
  answer: z.literal(principlePages.radioOptions[1]),
  reasoning: z.string().min(1, { message: principlePages.errors.reasonError }),
});

/**
 * @deprecated use new principleIrrelevantAnswerSchemaV2
 */
export const principleIrrelevantAnswerSchemaV1 = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  reasoning: z.string().min(1, { message: principlePages.errors.reasonError }),
});

/**
 * @deprecated use new principleSchemaV2
 */
export const principleSchemaV1 = z
  .discriminatedUnion(
    "answer",
    [
      principlePositiveAnswerSchemaV1,
      principleNegativeAnswerSchemaV1,
      principleIrrelevantAnswerSchemaV1,
    ],
    { message: principlePages.errors.answerError },
  )
  .and(
    z.object({
      id: z.string(),
    }),
  );

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

export const defaultValues: DocumentationSchemaV2 | DocumentationSchemaV1 = {
  policyTitle: defaultTitleValues,
  participation: defaultParticipationValues,
  principles: [],
};

// documentationSchemaV2 <- current
export const documentationSchemaV2 = z.object({
  policyTitle: policyTitleSchema.optional(),
  participation: participationSchema.optional(),
  euInteroperabilityOutcome: euInteroperabilityOutcomeSchema.optional(),
  principles: z.array(principleSchemaV2).optional(),
});

/**
 * @deprecated use documentationSchemaV2 above
 */
export const documentationSchemaV1 = z.object({
  ...documentationSchemaV2.shape,
  principles: z.array(principleSchemaV1).optional(),
});

export const getDocumentationSchemaFormUrl = (
  url: string,
  simplified = false,
) => {
  if (url === ROUTE_DOCUMENTATION_TITLE.url) return policyTitleSchema;
  else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
    return participationSchema;
  else if (url === ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.url)
    return euInteroperabilityOutcomeSchema;
  else return simplified ? principleSchemaV2 : principleSchemaV1;
};

export type PrincipleReasoningV1 = z.infer<typeof principleReasoningSchemaV1>;

// TODO: do I need them?
export type NegativeAnswerReasoning = z.infer<
  typeof principleNegativeAnswerSchemaV1
>["reasoning"];
export type IrrelevantAnswerReasoning = z.infer<
  typeof principleIrrelevantAnswerSchemaV1
>["reasoning"];

type PrincipleV1 = z.infer<typeof principleSchemaV1>;
type PrincipleV2 = z.infer<typeof principleSchemaV2>;

export type Principle<V extends DataSchemaVersion = V2> = V extends V1
  ? PrincipleV1
  : PrincipleV2;

export type PolicyTitle = z.infer<typeof policyTitleSchema>;
export type Participation = z.infer<typeof participationSchema>;
export type EuInteroperabilityOutcome = z.infer<
  typeof euInteroperabilityOutcomeSchema
>;

type DocumentationSchemaV2 = z.infer<typeof documentationSchemaV2>;
type DocumentationSchemaV1 = z.infer<typeof documentationSchemaV1>;

export type DocumentationData<V extends DataSchemaVersion = V2> = {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  euInteroperabilityOutcome?: EuInteroperabilityOutcome;
  principles?: Principle<V>[];
} & VersionedData;
