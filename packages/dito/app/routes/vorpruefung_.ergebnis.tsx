import Box from "@digitalcheck/shared/components/Box";
import Button from "@digitalcheck/shared/components/Button";
import Container from "@digitalcheck/shared/components/Container";
import Heading from "@digitalcheck/shared/components/Heading";
import InlineNotice from "@digitalcheck/shared/components/InlineNotice";
import List from "@digitalcheck/shared/components/List";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { getAnswersFromCookie } from "cookies.server";
import { preCheck, siteMeta } from "resources/content";
import { PATH_PRECHECK } from "resources/staticRoutes";
import type { Answers, Option } from "./vorpruefung.$questionId";

const { result, questions } = preCheck;

export const meta: MetaFunction = () => {
  return [{ title: `${result.title} — ${siteMeta.title}` }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { answers } = await getAnswersFromCookie(request);
  // redirect to precheck if not all answers are present
  if (Object.keys(answers).length !== questions.length) {
    return redirect(PATH_PRECHECK);
  }
  return json({ answers });
}

const getQuestionIDsOfOption = (answers: Answers, option: Option["value"]) =>
  Object.keys(answers).filter((key) => answers[key] === option);

export default function Result() {
  const { answers } = useLoaderData<typeof loader>();
  const positiveQuestions = getQuestionIDsOfOption(answers, "yes");
  const unsureQuestions = getQuestionIDsOfOption(answers, "unsure");
  const negativeQuestions = getQuestionIDsOfOption(answers, "no");

  const heading = (
    <Heading
      tagName="h1"
      text={result.title}
      look="ds-heading-02-reg"
      className="mb-32"
    />
  );
  const getReasoningNotice = (title: string, content: string) => (
    <InlineNotice
      look="info"
      title={title}
      tagName="h2"
      content={content}
      showIcon={false}
    />
  );
  const getReasoningText = (answer: string, questionIds: string[]) => {
    const reasons = questionIds
      .map((qId) => `- ${questions.find((q) => q.id === qId)?.result}`)
      .join("\n");
    return `**Folgende Fragen haben Sie mit "${answer}" beantwortet:**\n\n${result.reasonIntro}\n${reasons}`;
  };

  if (positiveQuestions.length > 0) {
    const reasonsText = getReasoningText("Ja", positiveQuestions);
    return (
      <>
        <Container>
          {heading}
          {getReasoningNotice(result.positive, reasonsText)}
          <div className="mt-32">
            <Button {...result.receivePdfButton} look="tertiary" />
          </div>
        </Container>
        <Container>
          <List
            heading={{
              text: result.nextStepsPositive.title,
              tagName: "h2",
            }}
            items={result.nextStepsPositive.steps}
            isNumeric
          />
        </Container>
      </>
    );
  }

  if (unsureQuestions.length > 0) {
    const reasonsTextUnsure = getReasoningText("Unsicher", unsureQuestions);
    const reasonsTextNegative = getReasoningText("Nein", negativeQuestions);
    const reasonsText = `${reasonsTextUnsure}\n\n${reasonsTextNegative}`;
    return (
      <>
        <Container>
          {heading}
          <div className="mb-32">
            <InlineNotice
              look="support"
              title={result.noticeUnsure.title}
              tagName="h2"
              content={result.noticeUnsure.text}
            />
          </div>
          {getReasoningNotice(result.unsure, reasonsText)}
        </Container>
        <Container>
          <Box
            heading={{
              text: result.boxUnsure.title,
            }}
            content={{
              markdown: result.boxUnsure.text,
            }}
            buttons={[
              {
                id: "result-method-button",
                text: result.boxUnsure.link.text,
                href: result.boxUnsure.link.url,
                look: "tertiary",
              },
            ]}
          />
        </Container>
      </>
    );
  }

  // all answers are negative
  const reasonsText = getReasoningText("Nein", negativeQuestions);
  return (
    <>
      <Container>
        {heading}
        {getReasoningNotice(result.negative, reasonsText)}
        <div className="mt-32">
          <Button {...result.receivePdfButton} look="primary" />
        </div>
      </Container>
      <Container>
        <Heading
          tagName="h2"
          text={result.nextStepsNegative.title}
          className="mb-32"
        />
        <Box
          heading={{
            ...result.nextStepsNegative.step.headline,
            tagName: "h3",
          }}
          content={{
            markdown: result.nextStepsNegative.step.content,
          }}
        />
      </Container>
    </>
  );
}
