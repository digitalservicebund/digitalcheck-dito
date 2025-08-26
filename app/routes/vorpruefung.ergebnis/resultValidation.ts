import { z } from "zod";
import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import type { PreCheckAnswers } from "~/routes/vorpruefung._preCheckNavigation.$questionId";

const positiveValidation = z.object({
  title: z
    .string()
    .min(1, { message: preCheckResult.form.vorhabenTitleRequired })
    .max(100, { message: preCheckResult.form.vorhabenTitleTooLong }),
});

const negativeValidation = positiveValidation.extend({
  negativeReasoning: z
    .string()
    .min(1, { message: preCheckResult.form.reasonRequired })
    .max(500, { message: preCheckResult.form.reasonTooLong }),
});

export default function getResultValidatorForAnswers(
  answers: PreCheckAnswers,
): z.ZodObject<
  {
    title: z.ZodString;
    negativeReasoning?: z.ZodString;
  },
  z.core.$strip
> {
  const ignoredQuestionIds = ["eu-bezug"];
  const isPositive = Object.entries(answers).some(
    ([key, value]) => value === "yes" && !ignoredQuestionIds.includes(key),
  );
  return isPositive ? positiveValidation : negativeValidation;
}
