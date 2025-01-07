import Background from "@digitalcheck/shared/components/Background.tsx";
import Box from "@digitalcheck/shared/components/Box.tsx";
import Container from "@digitalcheck/shared/components/Container";
import Header from "@digitalcheck/shared/components/Header.tsx";
import Heading from "@digitalcheck/shared/components/Heading.tsx";
import { NumberedList } from "@digitalcheck/shared/components/List";
import RichText from "@digitalcheck/shared/components/RichText.tsx";
import {
  ControlPointOutlined,
  HelpOutline,
  RemoveCircleOutline,
} from "@digitalservicebund/icons";
import CancelOutlined from "@digitalservicebund/icons/CancelOutlined";
import CheckCircleOutlined from "@digitalservicebund/icons/CheckCircleOutlined";
import WarningAmberOutlined from "@digitalservicebund/icons/WarningAmberOutlined";
import classNames from "classnames";
import { preCheck } from "resources/content";
import { PreCheckAnswers } from "routes/vorpruefung.$questionId/route";
import Accordion from "../../components/Accordion.tsx";
import ResultForm from "./ResultForm.tsx";
import { ResultType, TResult } from "./TResult.tsx";
import resolveResultContent, { Reason } from "./resolveResultContent.ts";

const nextSteps = {
  [ResultType.POSITIVE]: preCheck.result.positive.nextSteps,
  [ResultType.NEGATIVE]: preCheck.result.negative.nextSteps,
};

function getIconForReason(reason: Reason) {
  const defaultClasses = "w-28 h-auto shrink-0";
  switch (reason.answer) {
    case "yes":
      return (
        <ControlPointOutlined
          className={classNames(defaultClasses, "fill-[#005E34]")}
        ></ControlPointOutlined>
      );
    case "no":
      return (
        <RemoveCircleOutline
          className={classNames(defaultClasses, "fill-[#8E001B]")}
        ></RemoveCircleOutline>
      );
    case "unsure":
      return <HelpOutline className={defaultClasses}></HelpOutline>;
  }
}

function getReasonListItem(reason: Reason) {
  return (
    <li key={reason.text} className="flex items-start gap-12">
      {getIconForReason(reason)}
      <span>
        {reason.text}
        {reason.hint && <RichText markdown={reason.hint} />}
      </span>
    </li>
  );
}

export default function ResultPage({
  answers,
  result,
}: Readonly<{
  answers: PreCheckAnswers;
  result: TResult;
}>) {
  const resultContent = resolveResultContent(answers, result);

  function getHeaderIcon() {
    const iconClassName = "w-full h-full";
    switch (result.digital) {
      case ResultType.POSITIVE:
        return <CheckCircleOutlined className={iconClassName} />;
      case ResultType.NEGATIVE:
        return <CancelOutlined className={iconClassName} />;
      case ResultType.UNSURE:
        return <WarningAmberOutlined className={iconClassName} />;
    }
  }

  const resultHint =
    result.digital === ResultType.UNSURE ? preCheck.result.unsure.hint : "";
  return (
    <>
      <Background backgroundColor="blue" paddingTop="40" paddingBottom="40">
        <div className="px-16">
          <Container
            backgroundColor={
              result.digital === ResultType.UNSURE ? "lightYellow" : "midBlue"
            }
            paddingTop="32"
            paddingBottom="32"
            additionalClassNames="rounded-t-lg"
          >
            <div className="flex sm:flex-row flex-col gap-16">
              <div className="flex-none w-36 h-36 flex items-center justify-center">
                {getHeaderIcon()}
              </div>
              <Header
                heading={{
                  tagName: "h1",
                  look: "ds-heading-02-reg",
                  text: resultContent.title,
                  className: "mb-0",
                }}
                {...(resultHint && { content: { markdown: resultHint } })}
              />
            </div>
          </Container>
          <Container
            backgroundColor="white"
            additionalClassNames="rounded-b-lg"
          >
            <div className="pb-40 border-solid border-b-2 border-gray-400 last:border-0 last:pb-0">
              {resultContent.reasoningList
                .filter(({ reasons }) => reasons.length > 0)
                .map(({ intro, reasons }) => (
                  <>
                    <RichText className="mt-40 first:mt-0" markdown={intro} />
                    <ul className="ds-stack-16 mt-16">
                      {reasons
                        .toSorted((reason) =>
                          reason.answer === "yes" ? -1 : 1,
                        )
                        .map((reason) => getReasonListItem(reason))}
                    </ul>
                  </>
                ))}
            </div>
            {result.digital !== ResultType.UNSURE && (
              <div className="mt-32">
                <ResultForm result={result} answers={answers} />
              </div>
            )}
          </Container>
        </div>
      </Background>
      <Container paddingBottom="40">
        {result.digital === ResultType.UNSURE && (
          <Box
            heading={{
              text: preCheck.result.unsure.nextStep.title,
            }}
            content={{
              markdown: preCheck.result.unsure.nextStep.text,
            }}
            buttons={[
              {
                id: "result-method-button",
                text: preCheck.result.unsure.nextStep.link.text,
                href: preCheck.result.unsure.nextStep.link.href,
                look: "ghost",
              },
            ]}
          />
        )}
        {result.digital !== ResultType.UNSURE && nextSteps && (
          <NumberedList
            heading={{
              text: nextSteps[result.digital].title,
              tagName: "h2",
            }}
            items={nextSteps[result.digital].steps}
          />
        )}
      </Container>
      <Container>
        <Heading
          tagName="h2"
          look="ds-heading-02-reg text-center mb-64 max-sm:mb-56"
          text={preCheck.faq.title}
        />
        <Accordion items={preCheck.faq.items} />
      </Container>
    </>
  );
}
