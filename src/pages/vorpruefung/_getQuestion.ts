import { preCheck } from "~/resources/content/vorpruefung";

const questions = preCheck.questions;

export function getQuestion(questionId: string) {
  const questionIdx = questions.findIndex(({ id }) => id === questionId);
  if (questionIdx === -1) {
    throw new Error(`Question with id ${questionId} not found`);
  }
  const question = questions[questionIdx];
  return { questionIdx, question };
}
