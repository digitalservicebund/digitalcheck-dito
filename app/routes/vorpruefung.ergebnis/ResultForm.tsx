import {
  CopyAll,
  DriveFileRenameOutline,
  EmailOutlined,
} from "@digitalservicebund/icons";
import { useField } from "@rvf/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import Alert from "~/components/Alert";
import Button, { LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import Input from "~/components/Input";
import InputError from "~/components/InputError";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis";
import {
  buildEmailBody,
  buildMailtoUri,
} from "~/routes/vorpruefung.ergebnis/buildMailtoUri";
import {
  usePreCheckData,
  useSyncedForm,
} from "../vorpruefung/preCheckDataHook";
import { resultSchema } from "../vorpruefung/preCheckDataSchema";
import { ResultType } from "./PreCheckResult";
import { ResultContent } from "./getContentForResult";

export default function ResultForm({
  resultContent,
  setVorhabenTitle,
}: Readonly<{
  resultContent: ResultContent;
  setVorhabenTitle: Dispatch<SetStateAction<string>>;
}>) {
  const [showEmailAlert, setShowEmailAlert] = useState<boolean>(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [isMailBodyCopied, setIsMailBodyCopied] = useState<boolean>(false);
  const [isMailAddressCopied, setIsMailAddressCopied] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { resultData, result } = usePreCheckData();

  const form = useSyncedForm({
    schema: resultSchema,
    onBeforeSubmit: async ({ getValidatedData }) => {
      if (await getValidatedData()) setShowEmailAlert(true);
    },
    defaultValues: {
      result: "" as unknown as ResultType,
      title: "",
      negativeReasoning: "",
    },
    storedData: resultData,
  });

  useEffect(() => {
    const unsubscribeForm = form.subscribe.value((formValues) => {
      const res = resultSchema.safeParse(formValues);
      setIsValid(res.success);
    });
    const unsubscribeTitle = form.subscribe.value("title", setVorhabenTitle);
    const unsubscribeNegativeResoning = form.subscribe.value(
      "negativeReasoning",
      (value) => {
        if (value && value.length > 2000)
          setWarning(preCheckResult.form.reasonLong);
        else setWarning(null);
      },
    );

    return () => {
      unsubscribeForm();
      unsubscribeTitle();
      unsubscribeNegativeResoning();
    };
  }, [form, setVorhabenTitle]);

  const emailPreviewBody = useMemo(() => {
    const currentVorhabenTitle = form.value("title") ?? "";
    const currentNegativeReasoning = form.value("negativeReasoning") ?? "";

    return buildEmailBody(
      resultContent,
      currentNegativeReasoning,
      currentVorhabenTitle,
    );
  }, [resultContent, form]);

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
    if (result?.interoperability === ResultType.POSITIVE) {
      addressesToCopy += `, ${preCheckResult.form.emailTemplate.toDC}`;
    }
    await navigator.clipboard.writeText(addressesToCopy);
    setIsMailAddressCopied(true);
    setTimeout(() => setIsMailAddressCopied(false), 2000); // Hide Kopiert message after 2 seconds
  };

  const resultField = useField(form.scope("result"));

  return (
    <>
      <form {...form.getFormProps()} data-testid="result-form">
        <input {...resultField.getHiddenInputProps()} />
        <fieldset className="ds-stack ds-stack-24">
          <legend>
            <Heading
              tagName="h2"
              className="ds-heading-03-reg"
              text={preCheckResult.form.formLegend}
            />
          </legend>
          <div className="flex items-start pb-[40px]">
            <div className="mr-[16px] shrink-0">
              <EmailOutlined className="h-40 w-40 fill-blue-800" />
            </div>
            <div className="ds-stack ds-stack-16 grow">
              <RichText markdown={preCheckResult.form.instructions} />
              <Input scope={form.scope("title")}>
                {preCheckResult.form.vorhabenTitleLabel}
              </Input>

              {result?.digital === ResultType.NEGATIVE && (
                <>
                  <Textarea scope={form.scope("negativeReasoning")}>
                    {preCheckResult.form.reasonLabel}
                  </Textarea>
                  {warning && (
                    <InputError look={"warning"}>{warning}</InputError>
                  )}
                </>
              )}
              <ButtonContainer>
                {isValid ? (
                  <LinkButton
                    to={buildMailtoUri(
                      result,
                      resultContent,
                      form.value("title"),
                      form.value("negativeReasoning"),
                    )}
                  >
                    {preCheckResult.form.sendEmailButton.text}
                  </LinkButton>
                ) : (
                  <Button
                    id={"result-email-button"}
                    look={"primary"}
                    className={
                      "plausible-event-name=Content.Send+Result.Button+Create+Email"
                    }
                    type={"submit"}
                  >
                    {preCheckResult.form.sendEmailButton.text}
                  </Button>
                )}
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
        <div className="mr-[16px] shrink-0">
          <DriveFileRenameOutline className="h-40 w-40 fill-blue-800" />
        </div>
        <div className="ds-stack ds-stack-24 grow">
          <RichText markdown={preCheckResult.form.copyIntroText}></RichText>
          <DetailsSummary
            showVerticalLine
            title={preCheckResult.form.previewLabel}
            className="plausible-event-name=Content.Send+Result.Accordion+Preview+Email+Text"
          >
            <div data-testid="emailPreview" className="whitespace-pre-wrap">
              {emailPreviewBody}
            </div>
          </DetailsSummary>
          <ButtonContainer>
            <Button
              type="button"
              look="tertiary"
              className="plausible-event-name=Content.Send+Result.Button+Copy+Email"
              onClick={() => {
                void handleCopyEmailBody();
              }}
            >
              {isMailBodyCopied
                ? preCheckResult.form.copyMailButton.textCopied
                : preCheckResult.form.copyMailButton.text}
            </Button>
            <Button
              type="button"
              look="ghost"
              className="plausible-event-name=Content.Send+Result.Button+Copy+Email+Addresses"
              iconRight={<CopyAll className="h-40 w-40 text-blue-800" />}
              onClick={() => {
                void handleCopyMailAddress();
              }}
            >
              {isMailAddressCopied
                ? preCheckResult.form.copyAddressButton.textCopied
                : preCheckResult.form.copyAddressButton.text}
            </Button>
          </ButtonContainer>
        </div>
      </div>
      <hr className="mt-40 mb-32 border-t-2 border-gray-400" />

      <InfoBox
        heading={{
          text: preCheckResult.form.outro.title,
          tagName: "h3",
        }}
      >
        <RichText markdown={preCheckResult.form.outro.text} />
      </InfoBox>

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
          >
            <RichText markdown={detail.text} />
          </DetailsSummary>
        ))}
      </div>
    </>
  );
}
