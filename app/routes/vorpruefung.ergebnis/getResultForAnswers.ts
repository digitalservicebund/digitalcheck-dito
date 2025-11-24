import { preCheck } from "~/resources/content/vorpruefung";
import { PreCheckAnswerSchema } from "../vorpruefung/preCheckDataSchema";
import { PreCheckResult, ResultType } from "./PreCheckResult";

const { questions } = preCheck;

export function getResultForAnswers(
  answers: PreCheckAnswerSchema[],
): PreCheckResult {
  const digital = getResultForRelevantAnswers(answers, false);
  const interoperability =
    digital === ResultType.POSITIVE
      ? getResultForRelevantAnswers(answers, true)
      : ResultType.NEGATIVE;
  const euBezug = getResultForRelevantAnswers(answers, true);
  return { digital, interoperability, euBezug };
}

export function getResultForRelevantAnswers(
  answers: PreCheckAnswerSchema[],
  interoperability: boolean,
) {
  const relevantAnswers = questions
    .filter((question) => !!question.interoperability === interoperability)
    .map(
      (question) =>
        answers.find(({ questionId }) => questionId === question.id)?.answer,
    );

  if (relevantAnswers.includes("yes")) {
    return ResultType.POSITIVE;
  }
  if (relevantAnswers.includes("unsure")) {
    return ResultType.UNSURE;
  }
  return ResultType.NEGATIVE;
}
