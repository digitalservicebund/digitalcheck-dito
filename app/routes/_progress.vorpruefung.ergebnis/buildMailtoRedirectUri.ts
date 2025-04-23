import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import { type ResultContent } from "~/routes/_progress.vorpruefung.ergebnis/getContentForResult";
import { PreCheckResult, ResultType } from "./PreCheckResult";

const { emailTemplate } = preCheckResult.form;

function resolveRecipients(result: PreCheckResult) {
  const additionalRecipient =
    result.interoperability !== ResultType.NEGATIVE
      ? `; ${emailTemplate.toDC}`
      : "";
  return `${emailTemplate.toNkr}${additionalRecipient}`;
}

function buildEmailBody(
  resultContent: ResultContent,
  negativeReasoning?: string,
) {
  let resultText: string = `${resultContent.title}\n\n\n`;

  resultContent.reasoningList
    .filter((reasoning) => reasoning.reasons.length !== 0)
    .forEach(({ intro, reasons }) => {
      resultText += `➤ ${intro} \n\n`;
      reasons
        .toSorted((reason) => (reason.answer === "yes" ? -1 : 1))
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

export default function buildMailtoRedirectUri(
  result: PreCheckResult,
  resultContent: ResultContent,
  vorhabenTitle: string,
  userEmail?: string,
  negativeReasoning?: string,
) {
  const subject = `${emailTemplate.subject}: „${vorhabenTitle}“`;
  const cc = userEmail ? `&cc=${userEmail}` : "";
  const recipients = encodeURIComponent(resolveRecipients(result));
  const body = buildEmailBody(resultContent, negativeReasoning);
  return `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}${cc}`;
}
