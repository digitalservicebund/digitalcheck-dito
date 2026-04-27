import { vorpruefung } from "@/config/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "~/utils/routerCompat";

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
import { ROUTES_PRECHECK_QUESTIONS } from "~/resources/staticRoutes";
import { usePreCheckData, useSyncedForm } from "./vorpruefung/preCheckDataHook";
import {
  answerSchema,
  type PreCheckAnswerSchema,
} from "./vorpruefung/preCheckDataSchema";
import { addOrUpdateAnswer } from "./vorpruefung/preCheckDataService";

const { questions, answerOptions, nextButton } = preCheck;

export function loader({ params }: { params: { questionId?: string } }) {
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
  path: string;
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

export default function Index({
  questionId: questionIdProp,
}: {
  questionId?: string;
}) {
  const questionId =
    questionIdProp ??
    (typeof window !== "undefined"
      ? window.location.pathname.split("/").filter(Boolean).pop()
      : undefined);
  const questionIdx = questions.findIndex((q) => q.id === questionId);
  const question = questions[questionIdx];

  const [hasAnswerConflict, setHasAnswerConflict] = useState(false);

  const { answerForQuestionId, answers, firstUnansweredQuestionIndex } =
    usePreCheckData();
  const navigate = useNavigate();
  const storedAnswer = answerForQuestionId(question.id);
  const nextLink =
    questions.find((q) => q.id === question.id)?.nextLink ?? vorpruefung.path;

  const form = useSyncedForm({
    schema: answerSchema,
    defaultValues: {
      questionId: question.id,
      answer: "",
    },
    storedData: storedAnswer,
    initialValidate: true,
    handleSubmit: (data: PreCheckAnswerSchema) => {
      addOrUpdateAnswer(data);
      navigate(nextLink);
    },
  });

  // if the user accesses a question where they haven't answered the previous questions, redirect them to the first unanswered question
  useEffect(() => {
    if (
      firstUnansweredQuestionIndex !== null &&
      questionIdx > firstUnansweredQuestionIndex
    ) {
      navigate(questions[firstUnansweredQuestionIndex].path);
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

  const questionLabelId = `question${questionIdx}-label`;

  if (!question) return null;
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
      <section className="space-y-32">
        <div className="space-y-16">
          <Heading
            text={question.question}
            tagName="h1"
            look="ds-heading-02-reg"
            id={questionLabelId}
          />
          <div className="sr-only">
            Frage {questionIdx + 1} von {questions.length}
          </div>
          <div>
            <RichText markdown={question.text} />
          </div>
          {question.hint && (
            <DetailsSummary title={question.hint.title}>
              <RichText markdown={question.hint.text} />
            </DetailsSummary>
          )}
        </div>
        <RadioGroup
          scope={form.scope("answer")}
          options={options}
          aria-labelledby={questionLabelId}
        />
      </section>
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
