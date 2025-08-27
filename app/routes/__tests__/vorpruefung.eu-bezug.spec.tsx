import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MemoryRouter, useLoaderData } from "react-router";
import { preCheck } from "~/resources/content/vorpruefung";
import type {
  PreCheckAnswers,
  TQuestion,
} from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import Index from "~/routes/vorpruefung._preCheckNavigation.$questionId";

const { questions } = preCheck;

type ExpectedResult = {
  showsAnswerConflictWarning: boolean;
};

type UserAnswers = (question: TQuestion) => "Ja" | "Nein" | "Ich bin unsicher";

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

vi.mock("@rvf/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@rvf/react-router")>();
  return {
    ...actual,
    useForm: () => ({
      getFormProps: vi.fn(),
      value: vi.fn(),
      error: vi.fn(),
      formState: {
        submitStatus: "",
      },
    }),
  };
});

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useLoaderData: vi.fn(),
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
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
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
