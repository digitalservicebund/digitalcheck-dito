import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BrowserRouter, useLoaderData } from "react-router";
import { preCheck } from "~/resources/content/vorpruefung";
import type { TQuestion } from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import Index from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import { usePreCheckData } from "~/routes/vorpruefung/preCheckDataHook";
import { ResultType } from "../vorpruefung.ergebnis/PreCheckResult";
import { PreCheckAnswerSchema } from "../vorpruefung/preCheckDataSchema";

const { questions } = preCheck;

type ExpectedResult = {
  nextButtonEnabled: boolean;
  showsAnswerConflictWarning: boolean;
};

type UserAnswers = (
  question: TQuestion,
) => "Ja" | "Nein" | "Ich bin unsicher" | undefined;

interface TestScenario {
  name: string;
  answers: UserAnswers;
  expected: ExpectedResult;
}

const questionIdx = 5;

const scenarios: TestScenario[] = [
  {
    name: "all answers negative but EU Bezug positive",
    answers: (question) => {
      if (questions.indexOf(question) !== questionIdx) return "Nein";
      return "Ja";
    },
    expected: {
      showsAnswerConflictWarning: true,
      nextButtonEnabled: true,
    },
  },
  {
    name: "mixed answers and EU Bezug positive",
    answers: (question) => {
      if (questions.indexOf(question) === 0) return "Ja";
      else if (questions.indexOf(question) !== questionIdx) return "Nein";
      return "Ja";
    },
    expected: {
      showsAnswerConflictWarning: false,
      nextButtonEnabled: true,
    },
  },
  {
    name: "EU Bezug unfilled",
    answers: (question) => {
      if (questions.indexOf(question) === 0) return "Ja";
      else if (questions.indexOf(question) !== questionIdx) return "Nein";
      return undefined;
    },
    expected: {
      showsAnswerConflictWarning: false,
      nextButtonEnabled: false,
    },
  },
];

function mapUserAnswersToMockAnswers(
  userAnswers: UserAnswers,
): PreCheckAnswerSchema[] {
  const answers: PreCheckAnswerSchema[] = [];
  questions.forEach((question) => {
    switch (userAnswers(question)) {
      case "Ja":
        answers.push({
          questionId: question.id,
          answer: "yes",
        });
        break;
      case "Nein":
        answers.push({
          questionId: question.id,
          answer: "no",
        });
        break;
      case "Ich bin unsicher":
        answers.push({
          questionId: question.id,
          answer: "unsure",
        });
        break;
    }
  });
  return answers;
}

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useActionData: vi.fn(),
  };
});

vi.mock("~/routes/vorpruefung/preCheckDataHook", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("~/routes/vorpruefung/preCheckDataHook")
    >();

  return {
    ...actual,
    usePreCheckData: vi.fn(),
  };
});

vi.mock("@rvf/react-router", async () => {
  const rvfReact = await import("@rvf/react");
  return rvfReact;
});

describe.each(scenarios)("test $name", ({ answers, expected }) => {
  beforeEach(() => {
    vi.resetAllMocks();

    const preCheckAnswers = mapUserAnswersToMockAnswers(answers);
    vi.mocked(useLoaderData).mockReturnValue({
      questionIdx,
      question: questions[questionIdx],
    });

    vi.mocked(usePreCheckData).mockReturnValue({
      answerForQuestionId: vi.fn().mockReturnValue({
        questionId: questions[questionIdx].id,
        answer: preCheckAnswers[questionIdx]?.answer,
      }),
      firstUnansweredQuestionIndex: questionIdx,
      answers: preCheckAnswers,
      resultData: {
        result: ResultType.POSITIVE,
        title: "",
        negativeReasoning: "",
      },
      result: {
        digital: ResultType.POSITIVE,
        euBezug: ResultType.POSITIVE,
        interoperability: ResultType.POSITIVE,
      },
      hasData: true,
    });

    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.runIf(expected.showsAnswerConflictWarning)(
    "shows warning when there is a conflict in answers",
    async () => {
      expect(
        await screen.findByText("Widerspruch in Ihren Angaben"),
      ).toBeInTheDocument();
    },
  );

  it.runIf(!expected.showsAnswerConflictWarning)(
    "does not show warning when there is a conflict in answers",
    () => {
      expect(
        screen.queryByText("Widerspruch in Ihren Angaben"),
      ).not.toBeInTheDocument();
    },
  );
});
