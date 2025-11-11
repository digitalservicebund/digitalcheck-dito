import { parseFormData, useForm, validationError } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router";

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
import {
  getAnswersFromCookie,
  getHeaderFromCookie,
} from "~/utils/cookies.server";
import trackCustomEvent from "~/utils/trackCustomEvent.server";
import type { Route } from "./+types/vorpruefung._preCheckNavigation.$questionId";
import { answerSchema } from "./vorpruefung.ergebnis/resultValidation";

const { questions, answerOptions, nextButton } = preCheck;

export async function loader({ request, params }: Route.LoaderArgs) {
  const { answers } = await getAnswersFromCookie(request);
  const questionIdx = questions.findIndex((q) => q.id === params.questionId);
  // return 404 if the question is not found
  if (questionIdx === -1) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Question not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  // if the user accesses a question where they haven't answered the previous questions, redirect them to the first unanswered question
  const firstUnansweredQuestionIdx = Object.keys(answers).length;
  if (questionIdx > firstUnansweredQuestionIdx) {
    return redirect(questions[firstUnansweredQuestionIdx].url, {
      status: 302,
    });
  }

  return { questionIdx, question: questions[questionIdx], answers };
}

export async function action({ request }: Route.ActionArgs) {
  const result = await parseFormData(await request.formData(), answerSchema);

  if (result.error) return validationError(result.error);

  const { questionId, answer } = result.data;

  const cookie = await getAnswersFromCookie(request);

  if (
    cookie.hasViewedResult &&
    cookie.answers[questionId] &&
    answer !== cookie.answers[questionId]
  ) {
    void trackCustomEvent(request, {
      name: "Vorprüfung Antwort geändert",
      props: {
        changeDetails: `Antwort Frage ${questionId}: ${cookie.answers[questionId]} → ${answer}`,
      },
    });
  }

  cookie.answers[questionId] = answer as PreCheckAnswerOption["value"];
  const nextLink =
    questions.find((q) => q.id === questionId)?.nextLink ?? ROUTE_PRECHECK.url;

  return redirect(nextLink, await getHeaderFromCookie(cookie));
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

export type PreCheckAnswers = {
  [x: string]: PreCheckAnswerOption["value"];
};

export default function Index() {
  const { questionIdx, question, answers } = useLoaderData<typeof loader>();
  const existingAnswer = answers?.[question.id];
  const [hasAnswerConflict, setHasAnswerConflict] = useState(false);

  const form = useForm({
    schema: answerSchema,
    method: "post",
    defaultValues: {
      questionId: question.id,
      answer: existingAnswer,
    },
  });

  useEffect(() => {
    if (question.id !== "eu-bezug") return;

    const checkHasAnswerConflict = (currentAnswer?: string) => {
      const allAnswersNo = Object.entries(answers)
        .filter((answer) => answer[0] !== "eu-bezug")
        .every((answer) => answer[1] === "no");

      setHasAnswerConflict(
        allAnswersNo && (currentAnswer ?? existingAnswer) === "yes",
      );
    };

    const unsubscribe = form.subscribe.value("answer", checkHasAnswerConflict);
    checkHasAnswerConflict();

    return () => unsubscribe();
  }, [question.id, answers, existingAnswer, form]);

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
        <span className="sr-only">{`${preCheck.srHint.before}${questionIdx + 1}${preCheck.srHint.between}${questions.length}`}</span>
        <legend className="ds-stack ds-stack-16">
          <Heading
            text={question.question}
            tagName="h1"
            look="ds-heading-02-reg"
          />
          <div>
            <RichText markdown={question.text} />
          </div>
          {question.hint && (
            <DetailsSummary
              title={question.hint.title}
              content={question.hint.text}
            />
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
