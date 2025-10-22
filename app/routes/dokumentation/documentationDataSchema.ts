import { z } from "zod";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import type { VersionedData } from "~/utils/localStorageVersioned";

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

const principleReasoningSchema = z
  .object({
    aspect: z.string().optional(),
    checkbox: z.literal(["on", true]).optional(), // HTML checkboxes use "on" as value when checked whilst rvf converts in into boolean
    paragraphs: z.string().optional(),
    reason: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.checkbox === undefined) return;

    if (!val.paragraphs) {
      ctx.addIssue({
        code: "custom",
        message: principlePages.errors.paragraphsError,
        input: val,
        path: ["paragraphs"],
      });
    }

    if (!val.reason) {
      ctx.addIssue({
        code: "custom",
        message: principlePages.errors.reasonError,
        input: val,
        path: ["reason"],
      });
    }
  });

const principlePositiveAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[0]),
  reasoning: z.array(principleReasoningSchema, {
    error: principlePages.errors.reasoningError,
  }),
});

const principleNegativeAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[1]),
  reasoning: z.string().min(1, { message: principlePages.errors.reasonError }),
});

const principleIrrelevantAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  reasoning: z.string().min(1, { message: principlePages.errors.reasonError }),
});

export const principleSchema = z
  .discriminatedUnion(
    "answer",
    [
      principlePositiveAnswerSchema,
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

export const defaultPrincipleValues: Principle = {
  id: "",
  answer: "",
  reasoning: "",
};

export const defaultValues: Omit<DocumentationData, "version"> = {
  policyTitle: defaultTitleValues,
  participation: defaultParticipationValues,
  principles: [],
};

export const getDocumentationSchemaFormUrl = (url: string) => {
  if (url === ROUTE_DOCUMENTATION_TITLE.url) return policyTitleSchema;
  else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
    return participationSchema;
  else return principleSchema;
};

export const documentationSchema = z.object({
  policyTitle: policyTitleSchema.optional(),
  participation: participationSchema.optional(),
  principles: z.array(principleSchema).optional(),
});

export type PrincipleReasoning = z.infer<typeof principleReasoningSchema>;
export type NegativeAnswerReasoning = z.infer<
  typeof principleNegativeAnswerSchema
>["reasoning"];
export type IrrelevantAnswerReasoning = z.infer<
  typeof principleIrrelevantAnswerSchema
>["reasoning"];
export type Principle = z.infer<typeof principleSchema>;
export type PolicyTitle = z.infer<typeof policyTitleSchema>;
export type Participation = z.infer<typeof participationSchema>;
export type DocumentationData = z.infer<typeof documentationSchema> &
  VersionedData;
