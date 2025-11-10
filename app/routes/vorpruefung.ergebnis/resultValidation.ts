import { z } from "zod";
import { preCheck } from "~/resources/content/vorpruefung";
import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";

const ignoredQuestionIds = ["eu-bezug"];

export const answerSchema = z.object({
  questionId: z.string(),
  answer: z.enum(
    Object.keys(preCheck.answerOptions),
    "Bitte wählen Sie eine Option aus.",
  ),
});

export const schema = z
  .object({
    answers: z.array(answerSchema),
    title: z
      .string()
      .min(1, { message: preCheckResult.form.vorhabenTitleRequired })
      .max(100, { message: preCheckResult.form.vorhabenTitleTooLong }),
    negativeReasoning: z
      .string()
      .min(1, { message: preCheckResult.form.reasonRequired })
      .max(500, { message: preCheckResult.form.reasonTooLong })
      .optional(),
  })
  .superRefine((val, ctx) => {
    const isPositive = val.answers.some(
      ({ questionId, answer }) =>
        answer === "yes" && !ignoredQuestionIds.includes(questionId),
    );

    if (!isPositive && !val.negativeReasoning) {
      ctx.addIssue({
        code: "custom",
        message: preCheckResult.form.reasonRequired,
        input: val,
      });
    }
  });

export type PreCheckAnswer = z.infer<typeof answerSchema>;
