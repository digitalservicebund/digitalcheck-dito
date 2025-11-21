import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

import Button, { LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";
import {
  ROUTE_PRECHECK,
  ROUTES_PRECHECK_QUESTIONS,
} from "~/resources/staticRoutes";
import type { Route } from "./+types/vorpruefung._preCheckNavigation.$questionId";
import { usePreCheckData, useSyncedForm } from "./vorpruefung/preCheckDataHook";
import {
  answerSchema,
  PreCheckAnswerSchema,
} from "./vorpruefung/preCheckDataSchema";
import { addOrUpdateAnswer } from "./vorpruefung/preCheckDataService";

const { questions, answerOptions, nextButton } = preCheck;

export function loader({ params }: Route.LoaderArgs) {
  const questionIdx = questions.findIndex((q) => q.id === params.questionId);
  // return 404 if the question is not found
  if (questionIdx === -1) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Question not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return {
    questionIdx,
    question: questions[questionIdx],
  };
}

export type TQuestion = {
  id: string;
  title: string;
  question: string;
  positiveResult: string;
  negativeResult: string;
  resultHint?: {
    positiveResult?: string;
    negativeResult?: string;
    unsureResult?: string;
  };
  resultTooltip?: {
    positiveResult?: string;
    negativeResult?: string;
    unsureResult?: string;
  };
  text: string;
  url: string;
  prevLink: string;
  nextLink: string;
  hint?: {
    title: string;
    text: string;
  };
  accordion?: {
    title: string;
    text: string;
  };
  interoperability?: boolean;
};

export type PreCheckAnswerOption = {
  value: "yes" | "no" | "unsure";
  label: string;
};

export default function Index() {
  const { questionIdx, question } = useLoaderData<typeof loader>();
  const [hasAnswerConflict, setHasAnswerConflict] = useState(false);

  const { answerForQuestionId, answers, firstUnansweredQuestionIndex } =
    usePreCheckData();
  const navigate = useNavigate();
  const storedAnswer = answerForQuestionId(question.id);
  const nextLink =
    questions.find((q) => q.id === question.id)?.nextLink ?? ROUTE_PRECHECK.url;

  const form = useSyncedForm({
    schema: answerSchema,
    defaultValues: {
      questionId: question.id,
      answer: "",
    },
    storedData: storedAnswer,
    initialValidate: true,
    handleSubmit: async (data: PreCheckAnswerSchema) => {
      addOrUpdateAnswer(data);
      await navigate(nextLink);
    },
  });

  // if the user accesses a question where they haven't answered the previous questions, redirect them to the first unanswered question
  useEffect(() => {
    if (
      firstUnansweredQuestionIndex !== null &&
      questionIdx > firstUnansweredQuestionIndex
    ) {
      void navigate(questions[firstUnansweredQuestionIndex].url);
    }
  }, [firstUnansweredQuestionIndex, navigate, questionIdx]);

  useEffect(() => {
    if (question.id !== "eu-bezug") return;

    const checkHasAnswerConflict = (currentAnswer?: string) => {
      const allAnswersNo = answers
        .filter(({ questionId }) => questionId !== "eu-bezug")
        .every(({ answer }) => answer === "no");

      setHasAnswerConflict(
        allAnswersNo && (currentAnswer ?? storedAnswer?.answer) === "yes",
      );
    };

    const unsubscribe = form.subscribe.value("answer", checkHasAnswerConflict);
    checkHasAnswerConflict();

    return () => unsubscribe();
  }, [question.id, answers, storedAnswer, form]);

  const options: PreCheckAnswerOption[] = Object.entries(answerOptions).map(
    ([value, label]) => ({
      value: value as PreCheckAnswerOption["value"],
      label,
    }),
  );

  return (
    <form {...form.getFormProps()} className="space-y-40">
      <MetaTitle
        prefix={
          ROUTES_PRECHECK_QUESTIONS.find((route) =>
            route.url.endsWith(question.id),
          )?.title
        }
      />
      <input {...form.getHiddenInputProps("questionId")} />
      <fieldset className="space-y-32">
        <legend className="ds-stack ds-stack-16">
          <span className="sr-only">{`${preCheck.srHint.before}${questionIdx + 1}${preCheck.srHint.between}${questions.length}`}</span>
          <Heading
            text={question.question}
            tagName="h1"
            look="ds-heading-02-reg"
          />
          <div>
            <RichText markdown={question.text} />
          </div>
          {question.hint && (
            <DetailsSummary title={question.hint.title}>
              <RichText markdown={question.hint.text} />
            </DetailsSummary>
          )}
        </legend>
        <RadioGroup scope={form.scope("answer")} options={options} />
      </fieldset>
      <div className="space-y-40">
        {hasAnswerConflict && (
          <InlineNotice
            className="[&_p]:mt-24"
            look="warning"
            heading={preCheck.answerConflictHint.euBezugHint.title}
          >
            <RichText
              markdown={preCheck.answerConflictHint.euBezugHint.content}
            />
          </InlineNotice>
        )}
        <ButtonContainer>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            id={"preCheck-next-button"}
          >
            {nextButton}
          </Button>
          <LinkButton
            id={"preCheck-back-button"}
            to={question.prevLink}
            look={"tertiary"}
          >
            {general.buttonBack.text}
          </LinkButton>
        </ButtonContainer>
      </div>
    </form>
  );
}
