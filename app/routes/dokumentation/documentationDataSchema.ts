import { z } from "zod";
import { digitalDocumentation } from "~/resources/content/dokumentation";
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
    checkbox: z.literal("on").optional(),
    paragraphs: z.string().optional(),
    reason: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.checkbox !== "on") return;

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
  reasoning: z.array(principleReasoningSchema.optional(), {
    error: principlePages.errors.reasoningError,
  }),
});

const principleNegativeAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[1]),
  reasoning: z.literal(undefined),
});

const principleIrrelevantAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  reasoning: z.literal(undefined),
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

export const documentationSchema = z.object({
  policyTitle: policyTitleSchema.optional(),
  participation: participationSchema.optional(),
  principles: z.array(principleSchema).optional(),
});

export type PrincipleReasoning = z.infer<typeof principleReasoningSchema>;
export type Principle = z.infer<typeof principleSchema>;
export type PolicyTitle = z.infer<typeof policyTitleSchema>;
export type Participation = z.infer<typeof participationSchema>;
export type DocumentationData = z.infer<typeof documentationSchema> &
  VersionedData;
