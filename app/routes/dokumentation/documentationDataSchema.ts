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

export const principleReasoningSchemaV2 = z.object({
  aspects: z
    .array(z.string())
    .min(1, { message: principlePages.errors.reasoningError }),
  explanation: z.string().optional(),
});

export const principleAnswerOnlySchema = z.object({
  id: z.string(),
  answer: z.enum(
    [
      principlePages.radioOptions[0],
      principlePages.radioOptions[1],
      principlePages.radioOptions[2],
    ],
    { error: principlePages.errors.answerError },
  ),
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
      if (!val || val.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: principlePages.errors.reasoningError,
          input: val,
        });
      }
    }),
});

const principlePositiveAnswerSchemaV2 = z.object({
  answer: z.literal(principlePages.radioOptions[0]),
  reasoning: principleReasoningSchemaV2,
});

export const principleNegativeAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[1]),
  reasoning: z.string().min(1, { message: principlePages.errors.reasonError }),
});

export const principleIrrelevantAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  reasoning: z.string().min(1, { message: principlePages.errors.reasonError }),
});

// TODO: delete when feature flag simplifiedPrincipleFlow is on
/**
 * @deprecated use new principleSchema below
 */
export const principleSchemaV1 = z
  .discriminatedUnion(
    "answer",
    [
      principlePositiveAnswerSchemaV1,
      principleNegativeAnswerSchema,
      principleIrrelevantAnswerSchema,
    ],
    { error: principlePages.errors.answerError },
  )
  .and(
    z.object({
      id: z.string(),
    }),
  );

export const principleSchemaV2 = z
  .discriminatedUnion(
    "answer",
    [
      principlePositiveAnswerSchemaV2,
      principleNegativeAnswerSchema,
      principleIrrelevantAnswerSchema,
    ],
    { error: principlePages.errors.answerError },
  )
  .and(
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
  else return simplified ? principleSchemaV2 : principleSchemaV1;
};

type PrincipleReasoningV1 = z.infer<typeof principleReasoningSchemaV1>;
type PrincipleReasoningV2 = z.infer<typeof principleReasoningSchemaV2>;

export type PrincipleReasoning<V extends DataSchemaVersion = V2> = V extends V1
  ? PrincipleReasoningV1
  : PrincipleReasoningV2;

export type NegativeAnswerReasoning = z.infer<
  typeof principleNegativeAnswerSchema
>["reasoning"];
export type IrrelevantAnswerReasoning = z.infer<
  typeof principleIrrelevantAnswerSchema
>["reasoning"];

type PrincipleV1 = z.infer<typeof principleSchemaV1>;
type PrincipleV2 = z.infer<typeof principleSchemaV2>;

export type Principle<V extends DataSchemaVersion = V2> = V extends V1
  ? PrincipleV1
  : PrincipleV2;

export type PolicyTitle = z.infer<typeof policyTitleSchema>;
export type Participation = z.infer<typeof participationSchema>;

type DocumentationSchemaV2 = z.infer<typeof documentationSchemaV2>;
type DocumentationSchemaV1 = z.infer<typeof documentationSchemaV1>;

export type DocumentationData<V extends DataSchemaVersion = V2> = {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  principles?: Principle<V>[];
} & VersionedData;
