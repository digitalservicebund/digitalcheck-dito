import { useEffect, useMemo, useState } from "react";
import RichText from "~/components/RichText.tsx";
import { useDocumentationDataService } from "./DocumentationDataProvider";
import {
  EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY,
  EU_INTEROPERABILITY_OUTCOMES,
  EU_INTEROPERABILITY_QUESTION_IDS,
  EU_INTEROPERABILITY_QUESTIONS,
  getEuInteroperabilityFlowState,
  sanitizeEuInteroperabilityAnswers,
  YES_NO_OPTIONS,
  type EuInteroperabilityQuestionId,
  type YesNoAnswer,
} from "./euInteroperabilityFlow.ts";

function readStoredAnswers() {
  if (typeof window === "undefined") return {};

  try {
    const storedAnswers = localStorage.getItem(
      EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY,
    );
    if (!storedAnswers) return {};

    const parsed = JSON.parse(storedAnswers) as unknown;
    return sanitizeEuInteroperabilityAnswers(parsed);
  } catch {
    return {};
  }
}

export default function EuInteroperabilityQuestions() {
  const { documentationData, setEuInteroperabilityOutcome } =
    useDocumentationDataService();
  const [answers, setAnswers] = useState(readStoredAnswers);

  const flowState = useMemo(
    () => getEuInteroperabilityFlowState(answers),
    [answers],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY,
      JSON.stringify(answers),
    );
  }, [answers]);

  useEffect(() => {
    const currentOutcomeId =
      documentationData.euInteroperabilityOutcome?.outcomeId;

    if (flowState.outcomeId) {
      if (currentOutcomeId !== flowState.outcomeId) {
        setEuInteroperabilityOutcome({ outcomeId: flowState.outcomeId });
      }
      return;
    }

    if (currentOutcomeId) setEuInteroperabilityOutcome(undefined);
  }, [
    documentationData.euInteroperabilityOutcome?.outcomeId,
    flowState.outcomeId,
    setEuInteroperabilityOutcome,
  ]);

  const onAnswerChange = (
    questionId: EuInteroperabilityQuestionId,
    answer: YesNoAnswer,
  ) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = {
        ...currentAnswers,
        [questionId]: answer,
      };

      const questionIds = EU_INTEROPERABILITY_QUESTION_IDS;
      const changedQuestionIndex = questionIds.indexOf(questionId);

      // Remove answers for questions after the changed answer to avoid stale branches.
      for (const id of questionIds.slice(changedQuestionIndex + 1)) {
        delete updatedAnswers[id];
      }

      return updatedAnswers;
    });
  };

  return (
    <div className="space-y-40">
      {flowState.questionIds.map((questionId) => {
        const question = EU_INTEROPERABILITY_QUESTIONS[questionId];

        return (
          <fieldset key={question.id} className="space-y-16">
            <legend className="ds-heading-03-reg mb-16">{question.text}</legend>
            {question.details && <RichText markdown={question.details} />}
            <div role="radiogroup" className="space-y-16">
              {YES_NO_OPTIONS.map((option) => {
                const inputId = `${question.id}-${option.toLowerCase()}`;

                return (
                  <p key={inputId}>
                    <input
                      id={inputId}
                      className="ds-radio"
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => onAnswerChange(question.id, option)}
                    />
                    <label htmlFor={inputId}>{option}</label>
                  </p>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {flowState.outcomeId && (
        <div className="space-y-8 border border-gray-400 bg-blue-100 p-24">
          <p className="ds-heading-03-reg">
            {EU_INTEROPERABILITY_OUTCOMES[flowState.outcomeId].title}
          </p>
          <p>{EU_INTEROPERABILITY_OUTCOMES[flowState.outcomeId].description}</p>
        </div>
      )}
    </div>
  );
}
