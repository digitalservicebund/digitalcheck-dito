import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BrowserRouter, useLoaderData } from "react-router";
import { preCheck } from "~/resources/content/vorpruefung";
import type {
  PreCheckAnswers,
  TQuestion,
} from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import Index from "~/routes/vorpruefung._preCheckNavigation.$questionId";

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
): PreCheckAnswers {
  const answers: PreCheckAnswers = {};
  questions.forEach((question) => {
    switch (userAnswers(question)) {
      case "Ja":
        answers[question.id] = "yes";
        break;
      case "Nein":
        answers[question.id] = "no";
        break;
      case "Ich bin unsicher":
        answers[question.id] = "unsure";
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

vi.mock("@rvf/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@rvf/react-router")>();
  return {
    ...actual,
    useForm: () => ({
      getFormProps: vi.fn(),
      value: vi.fn(),
      formState: {
        submitStatus: "",
      },
    }),
  };
});

// the name parameter is used for the test name
// eslint-disable-next-line @typescript-eslint/no-unused-vars
describe.each(scenarios)("test $name", ({ name, answers, expected }) => {
  beforeEach(() => {
    vi.resetAllMocks();

    const preCheckAnswers = mapUserAnswersToMockAnswers(answers);
    vi.mocked(useLoaderData).mockReturnValue({
      questionIdx,
      answers: preCheckAnswers,
      question: questions[questionIdx],
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

  it("shows warning when there is a conflict in answers", async () => {
    if (expected.showsAnswerConflictWarning) {
      expect(
        await screen.findByText("Widerspruch in Ihren Angaben"),
      ).toBeInTheDocument();
    } else {
      expect(
        screen.queryByText("Widerspruch in Ihren Angaben"),
      ).not.toBeInTheDocument();
    }
  });
});
