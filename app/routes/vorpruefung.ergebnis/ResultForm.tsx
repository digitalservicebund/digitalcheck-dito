import { useForm } from "@rvf/react-router";
import React, { Dispatch, SetStateAction, useState } from "react";
import Alert from "~/components/Alert";
import ButtonContainer from "~/components/ButtonContainer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import { features } from "~/resources/features";
import type { PreCheckAnswers } from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import getResultValidatorForAnswers from "~/routes/vorpruefung.ergebnis/resultValidation";
import { useFeatureFlag } from "~/utils/featureFlags";
import { PreCheckResult, ResultType } from "./PreCheckResult";

export default function ResultForm({
  result,
  answers,
  setVorhabenTitle,
}: Readonly<{
  result: PreCheckResult;
  answers: PreCheckAnswers;
  setVorhabenTitle: Dispatch<SetStateAction<string>>;
}>) {
  const showSaveToPdf = useFeatureFlag(features.showSaveToPdfOption);

  const [showEmailAlert, setShowEmailAlert] = useState<boolean>(false);
  const form = useForm({
    validator: getResultValidatorForAnswers(answers),
    method: "post",
    onBeforeSubmit: async ({ getValidatedData }) => {
      if (await getValidatedData()) setShowEmailAlert(true);
    },
  });

  const handleVorhabenTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVorhabenTitle(event.target.value);
  };

  const [warning, setWarning] = useState<string | null>(null);
  const handleNegativeReasoningChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    if (value.length > 2000) {
      setWarning(preCheckResult.form.reasonLong);
    } else {
      setWarning(null);
    }
  };

  return (
    <>
      <form {...form.getFormProps()} data-testid="result-form">
        <fieldset className="ds-stack ds-stack-32">
          <legend>
            <Heading tagName="h2" text={preCheckResult.form.formLegend} />
          </legend>
          <RichText markdown={preCheckResult.form.instructions} />
          {Object.keys(answers).map((answer) => (
            <input
              key={answer}
              name={answer}
              value={answers[answer]}
              type="hidden"
            />
          ))}
          <Input
            name="email"
            type={"email"}
            label={preCheckResult.form.emailLabel}
            error={form.error("email")}
          />
          <Input
            name="title"
            label={preCheckResult.form.vorhabenTitleLabel}
            error={form.error("title")}
            onChange={handleVorhabenTitleChange}
          />
          {result.digital === ResultType.NEGATIVE && (
            <Textarea
              name="negativeReasoning"
              label={preCheckResult.form.reasonLabel}
              error={form.error("negativeReasoning")}
              warning={warning}
              onChange={handleNegativeReasoningChange}
            />
          )}
          <ButtonContainer
            buttons={
              showSaveToPdf
                ? [
                    {
                      id: "result-email-button",
                      text: preCheckResult.form.sendEmailButton.text,
                      look: "primary",
                      className: "plausible-event-name=Quicksend+Click",
                    },
                    {
                      id: "result-print-button",
                      text: preCheckResult.form.downloadPdfButton.text,
                      look: "ghost",
                      type: "button",
                      className: "plausible-event-name=Quicksend+Click",
                      onClick: () => {
                        if (window) window.print();
                      },
                    },
                  ]
                : [
                    {
                      id: "result-email-button",
                      text: preCheckResult.form.sendEmailButton.text,
                      look: "primary",
                      className: "plausible-event-name=Quicksend+Click",
                    },
                  ]
            }
          />
        </fieldset>
      </form>
      {showEmailAlert && (
        <div className="mt-16">
          <Alert
            title={preCheckResult.form.emailClientHint.title}
            content={preCheckResult.form.emailClientHint.text}
            tagName="h3"
            look="info"
            setShowAlert={setShowEmailAlert}
          />
        </div>
      )}
      <div className="ds-stack ds-stack-16 mt-40">
        <Heading
          tagName="h3"
          className="ds-label-section"
          text={preCheckResult.form.faqs.title}
        />
        {preCheckResult.form.faqs.details.map((detail) => (
          <DetailsSummary
            key={detail.label}
            title={detail.label}
            content={detail.text}
          />
        ))}
      </div>
    </>
  );
}
