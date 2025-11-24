import { createCookie } from "react-router";
import { PreCheckAnswerOption } from "~/routes/vorpruefung._preCheckNavigation.$questionId";

export type PreCheckAnswers = {
  [x: string]: PreCheckAnswerOption["value"];
};

export const userAnswers = createCookie("user-answers", {
  maxAge: 604_800, // one week
});

/**
 * @deprecated will be replaced with local storage
 */
export const getAnswersFromCookie = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userAnswers.parse(cookieHeader)) as {
    answers: PreCheckAnswers;
    hasViewedResult: boolean;
  } | null;
  return cookie ?? { answers: {}, hasViewedResult: false };
};
