import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import { type ResultContent } from "~/routes/vorpruefung.ergebnis/getContentForResult";
import { PreCheckResult, ResultType } from "./PreCheckResult";

const { emailTemplate } = preCheckResult.form;

function resolveRecipients(result: PreCheckResult) {
  const additionalRecipient =
    result.interoperability !== ResultType.NEGATIVE
      ? `; ${emailTemplate.toDC}`
      : "";
  return `${emailTemplate.toNkr}${additionalRecipient}`;
}

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

/*
 * Optionally prefix mailto: links so that they appear to be a local page. This is so that end-to-end tests, run
 * locally, don't cause the OS's email client to open while running tests.
 */
const mockMailtoLinks = (function () {
  // running in browser
  // TODO: make import.meta.env available in Playwright E2E tests as well
  if (import.meta.env) {
    return (
      import.meta.env.VITE_MOCK_MAILTO_LINKS === "true" && !import.meta.env.PROD
    );
  } else {
    // running SSR
    return (
      process.env.MOCK_MAILTO_LINKS === "true" &&
      process.env.NODE_ENV !== "production"
    );
  }
})();

if (mockMailtoLinks) {
  console.warn("Prefixing mailto: links");
}
export const mailtoPrefix = mockMailtoLinks ? "/mock-mailto/" : "";

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
  return `${mailtoPrefix}mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}${cc}`;
}
