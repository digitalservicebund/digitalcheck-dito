import { useForm, validationError } from "@rvf/react-router";
import { withZod } from "@rvf/zod";
import { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router";

import { z } from "zod";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK } from "~/resources/staticRoutes";
import {
  getAnswersFromCookie,
  getHeaderFromCookie,
} from "~/utils/cookies.server";
import constructMetaTitle from "~/utils/metaTitle";
import trackCustomEvent from "~/utils/trackCustomEvent.server";
import type { Route } from "./+types/vorpruefung._preCheckNavigation.$questionId";

const { questions, answerOptions, nextButton } = preCheck;

export function meta() {
  return constructMetaTitle(ROUTE_PRECHECK.title);
}

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

const validator = withZod(
  z.object({
    answer: z
      .string({ required_error: "Bitte wählen Sie eine Option aus." })
      .refine(
        (answer) => Object.keys(answerOptions).includes(answer),
        "Bitte wählen Sie eine existierende Option aus.",
      ),
    questionId: z
      .string({ required_error: "Bitte geben Sie eine Frage an." })
      .refine(
        (questionId) => questions.map((q) => q.id).includes(questionId),
        "Bitte wählen Sie eine existierende Frage aus.",
      ),
  }),
);

export async function action({ request }: Route.ActionArgs) {
  const result = await validator.validate(await request.formData());

  if (result.error) {
    return validationError(result.error);
  }
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
  const [selectedOption, setSelectedOption] =
    useState<PreCheckAnswerOption["value"]>(existingAnswer);
  const form = useForm({
    validator,
    method: "post",
  });

  useEffect(() => {
    setSelectedOption(existingAnswer);
  }, [existingAnswer, setSelectedOption, question.id]);

  const options: PreCheckAnswerOption[] = Object.entries(answerOptions).map(
    ([value, text]) => ({
      value: value as PreCheckAnswerOption["value"],
      text,
    }),
  );

  return (
    <form {...form.getFormProps()}>
      <input type="hidden" name="questionId" value={question.id} />
      <fieldset className="ds-stack ds-stack-32 container pt-0 pb-40">
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
          selectedValue={selectedOption}
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
      <Container className="pt-0 pb-40">
        <ButtonContainer
          buttons={[
            {
              id: "preCheck-next-button",
              text: nextButton,
              type: "submit",
              disabled: form.formState.isSubmitting,
            },
            {
              id: "preCheck-back-button",
              text: general.buttonBack.text,
              href: question.prevLink,
              look: "tertiary",
            },
          ]}
        />
      </Container>
    </form>
  );
}
