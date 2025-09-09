import {
  CopyAll,
  DriveFileRenameOutline,
  EmailOutlined,
} from "@digitalservicebund/icons";
import { useForm } from "@rvf/react-router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Alert from "~/components/Alert";
import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import Input from "~/components/Input";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import type { PreCheckAnswers } from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import { buildEmailBody } from "~/routes/vorpruefung.ergebnis/buildMailtoRedirectUri.ts";
import getResultValidatorForAnswers from "~/routes/vorpruefung.ergebnis/resultValidation";
import { PreCheckResult, ResultType } from "./PreCheckResult";
import getContentForResult, { ResultContent } from "./getContentForResult";

export default function ResultForm({
  result,
  answers,
  setVorhabenTitle,
}: Readonly<{
  result: PreCheckResult;
  answers: PreCheckAnswers;
  setVorhabenTitle: Dispatch<SetStateAction<string>>;
}>) {
  const [showEmailAlert, setShowEmailAlert] = useState<boolean>(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [emailPreviewBody, setEmailPreviewBody] = useState<string>("");
  const [isMailBodyCopied, setIsMailBodyCopied] = useState<boolean>(false);
  const [isMailAddressCopied, setIsMailAddressCopied] = useState(false);

  const form = useForm({
    schema: getResultValidatorForAnswers(answers),
    method: "post",
    onBeforeSubmit: async ({ getValidatedData }) => {
      if (await getValidatedData()) setShowEmailAlert(true);
    },
    defaultValues: {
      title: "",
      negativeReasoning: undefined,
    },
  });

  const handleVorhabenTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVorhabenTitle(event.target.value);
  };

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

  useEffect(() => {
    const resultContent: ResultContent = getContentForResult(answers, result);
    const currentVorhabenTitle = form.value("title") || "";
    const currentNegativeReasoning = form.value("negativeReasoning") || "";

    const body = buildEmailBody(
      resultContent,
      currentNegativeReasoning,
      currentVorhabenTitle,
    );
    setEmailPreviewBody(body);
  }, [answers, result, form]);

  const handleCopyEmailBody = async () => {
    if (navigator.clipboard && emailPreviewBody) {
      await navigator.clipboard.writeText(emailPreviewBody);
      setIsMailBodyCopied(true);
      setTimeout(() => {
        setIsMailBodyCopied(false);
      }, 2000); // Hide Kopiert message after 2 seconds
    }
  };

  const handleCopyMailAddress = async () => {
    let addressesToCopy = preCheckResult.form.emailTemplate.toNkr;
    if (result.interoperability === ResultType.POSITIVE) {
      addressesToCopy += `, ${preCheckResult.form.emailTemplate.toDC}`;
    }
    await navigator.clipboard.writeText(addressesToCopy);
    setIsMailAddressCopied(true);
    setTimeout(() => setIsMailAddressCopied(false), 2000); // Hide Kopiert message after 2 seconds
  };

  return (
    <>
      <form {...form.getFormProps()} data-testid="result-form">
        <fieldset className="ds-stack ds-stack-24">
          <legend>
            <Heading tagName="h3" text={preCheckResult.form.formLegend} />
          </legend>
          <div className="flex items-start pb-[40px]">
            <div className="mr-[16px] flex-shrink-0">
              <EmailOutlined className="h-40 w-40 fill-blue-800" />
            </div>
            <div className="ds-stack ds-stack-16 flex-grow">
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
                className="pb-4"
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
              <ButtonContainer>
                <Button
                  id={"result-email-button"}
                  look={"primary"}
                  className={
                    "plausible-event-name=Content.Send+Result.Button+Create+Email"
                  }
                >
                  {preCheckResult.form.sendEmailButton.text}
                </Button>
              </ButtonContainer>
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
            </div>
          </div>
        </fieldset>
      </form>

      <div className="flex items-start">
        <div className="mr-[16px] flex-shrink-0">
          <DriveFileRenameOutline className="h-40 w-40 fill-blue-800" />
        </div>
        <div className="ds-stack ds-stack-24 flex-grow">
          <RichText markdown={preCheckResult.form.copyIntroText}></RichText>
          <DetailsSummary
            showVerticalLine
            title={preCheckResult.form.previewLabel}
            className="plausible-event-name=Content.Send+Result.Accordion+Preview+Email+Text"
            content={
              <div data-testid="emailPreview" className="whitespace-pre-wrap">
                {emailPreviewBody}
              </div>
            }
          />
          <ButtonContainer
            buttons={[
              {
                look: "tertiary",
                className:
                  "plausible-event-name=Content.Send+Result.Button+Copy+Email",
                text: isMailBodyCopied
                  ? preCheckResult.form.copyMailButton.textCopied
                  : preCheckResult.form.copyMailButton.text,
                onClick: () => {
                  void handleCopyEmailBody();
                },
              },
              {
                look: "ghost",
                className:
                  "plausible-event-name=Content.Send+Result.Button+Copy+Email+Addresses",
                text: isMailAddressCopied
                  ? preCheckResult.form.copyAddressButton.textCopied
                  : preCheckResult.form.copyAddressButton.text,
                iconRight: <CopyAll className="h-40 w-40 text-blue-800" />,
                onClick: () => {
                  void handleCopyMailAddress();
                },
              },
            ]}
          />
        </div>
      </div>
      <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />

      <InfoBox
        heading={{
          text: preCheckResult.form.outro.title,
          tagName: "h3",
        }}
        content={preCheckResult.form.outro.text}
      />
      <div className="ds-stack ds-stack-16 mt-40">
        <Heading
          tagName="h3"
          className="ds-label-section"
          text={preCheckResult.form.faqs.title}
        />
        {preCheckResult.form.faqs.details.map((detail, index) => (
          <DetailsSummary
            className={`plausible-event-name=Content.Content+Info.Accordion+FAQ${index + 1}`}
            key={detail.label}
            title={detail.label}
            content={detail.text}
          />
        ))}
      </div>
    </>
  );
}
