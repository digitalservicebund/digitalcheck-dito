import { parseFormData, useForm, validationError } from "@rvf/react-router";
import { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router";

import { z } from "zod";
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

const schema = z.object({
  answer: z
    .string("Bitte wählen Sie eine Option aus.")
    .refine(
      (answer) => Object.keys(answerOptions).includes(answer),
      "Bitte wählen Sie eine existierende Option aus.",
    ),
  questionId: z
    .string("Bitte geben Sie eine Frage an.")
    .refine(
      (questionId) => questions.map((q) => q.id).includes(questionId),
      "Bitte wählen Sie eine existierende Frage aus.",
    ),
});

export async function action({ request }: Route.ActionArgs) {
  const result = await parseFormData(await request.formData(), schema);

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
  text: string;
};

export type PreCheckAnswers = {
  [x: string]: PreCheckAnswerOption["value"];
};

export default function Index() {
  const { questionIdx, question, answers } = useLoaderData<typeof loader>();
  const existingAnswer = answers?.[question.id];

  const [selectedOption, setSelectedOption] = useState<
    PreCheckAnswerOption["value"] | null
  >(null);

  const checkForAnswerConflict = () => {
    if (question.id !== "eu-bezug") return false;
    const allAnswersNo = Object.entries(answers)
      .filter((answer) => answer[0] !== "eu-bezug")
      .every((answer) => answer[1] === "no");

    return allAnswersNo && (selectedOption ?? existingAnswer) === "yes";
  };

  const hasAnswerConflict = checkForAnswerConflict();

  const form = useForm({
    schema,
    method: "post",
    defaultValues: {
      answer: "",
      questionId: "",
    },
  });

  useEffect(() => {
    // Clear the selection state when the question changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOption(null);
  }, [question.id]);

  const options: PreCheckAnswerOption[] = Object.entries(answerOptions).map(
    ([value, text]) => ({
      value: value as PreCheckAnswerOption["value"],
      text,
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
      <input type="hidden" name="questionId" value={question.id} />
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
        <RadioGroup
          name="answer"
          options={options}
          selectedValue={selectedOption ?? existingAnswer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedOption(e.target.value as PreCheckAnswerOption["value"])
          }
          error={
            form.formState.submitStatus == "error"
              ? form.error("answer")
              : undefined
          }
        />
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
