import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { preCheck, siteMeta } from "resources/content";
import { PATH_PRECHECK } from "resources/staticRoutes";
import type { Answers, Option } from "routes/vorpruefung.$questionId/route";
import { getAnswersFromCookie } from "utils/cookies.server";
import ResultNegative from "./ResultNegative";
import ResultPositive from "./ResultPositive";
import ResultUnsure from "./ResultUnsure";

const { result, questions } = preCheck;

export const meta: MetaFunction = () => {
  return [{ title: `${result.title} — ${siteMeta.title}` }];
};

const getQuestionIDsOfOption = (answers: Answers, option: Option["value"]) =>
  Object.keys(answers).filter((key) => answers[key] === option);

export async function loader({ request }: LoaderFunctionArgs) {
  const { answers } = await getAnswersFromCookie(request);
  // redirect to precheck if not all answers are present
  if (Object.keys(answers).length !== questions.length) {
    return redirect(PATH_PRECHECK);
  }
  const positiveQuestions = getQuestionIDsOfOption(answers, "yes");
  const unsureQuestions = getQuestionIDsOfOption(answers, "unsure");
  const negativeQuestions = getQuestionIDsOfOption(answers, "no");
  return json({ positiveQuestions, unsureQuestions, negativeQuestions });
}

export default function Result() {
  const { positiveQuestions, unsureQuestions, negativeQuestions } =
    useLoaderData<typeof loader>();

  useEffect(() => {
    let result = "Negativ";
    if (positiveQuestions.length > 0) {
      result = "Positiv";
    } else if (unsureQuestions.length > 0) {
      result = "Unsicher";
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    (window as any).plausible("Vorprüfung Resultat", { props: { result } });
  }, [positiveQuestions.length, unsureQuestions.length]);

  // We have at least one positive answer
  if (positiveQuestions.length > 0) {
    return <ResultPositive positiveQuestions={positiveQuestions} />;
  }

  // Some answers are unsure
  if (unsureQuestions.length > 0) {
    return (
      <ResultUnsure
        unsureQuestions={unsureQuestions}
        negativeQuestions={negativeQuestions}
      />
    );
  }

  // All answers are negative
  return <ResultNegative negativeQuestions={negativeQuestions} />;
}
