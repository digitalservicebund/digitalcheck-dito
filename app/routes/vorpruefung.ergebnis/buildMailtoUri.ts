import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import type { ResultContent } from "~/routes/vorpruefung.ergebnis/getContentForResult";

const { emailTemplate } = preCheckResult.form;

export function buildEmailBody(
  resultContent: ResultContent,
  negativeReasoning?: string,
  vorhabenTitle?: string,
) {
  let resultText: string = vorhabenTitle
    ? `Betreff des Vorhabens: ${vorhabenTitle}\n\n---\n\n`
    : "";

  resultText += `${resultContent.title}\n\n\n`;

  resultContent.reasoningList
    .filter((reasoning) => reasoning.reasons.length !== 0)
    .forEach(({ intro, reasons }) => {
      resultText += `➤ ${intro} \n\n`;
      reasons
        .toSorted((a, b) => {
          if (a.answer === b.answer) {
            return 0; // Keep the original order fixes hydration mismatch
          }
          return a.answer === "yes" ? -1 : 1; // "yes" comes before "no"
        })
        .forEach((reason) => {
          resultText += reason.answer === "yes" ? "+" : "";
          resultText += reason.answer === "no" ? "-" : "";
          resultText += reason.answer === "unsure" ? "?" : "";
          resultText += ` ${reason.text}\n`;
          resultText += reason.hint ? `${reason.hint}\n` : "";
        });
      resultText += "\n\n";
    });

  resultText = resultText.replaceAll("**", "");
  resultText += negativeReasoning
    ? `${preCheckResult.form.reasonLabel}:\n\n${negativeReasoning}\n\n`
    : "";

  return `${emailTemplate.bodyBefore}\n${resultText}\n\n${emailTemplate.bodyAfter}`;
}

export function buildMailtoUri(
  recipients: string[],
  resultContent: ResultContent,
  vorhabenTitle: string,
  negativeReasoning?: string,
) {
  const subject = `${emailTemplate.subject}: „${vorhabenTitle}“`;
  const body = buildEmailBody(resultContent, negativeReasoning);

  return `mailto:${encodeURIComponent(recipients.join("; "))}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
