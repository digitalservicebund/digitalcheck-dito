import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, vi } from "vitest";

import { MemoryRouter, useLoaderData } from "react-router";
import { preCheck } from "~/resources/content/vorpruefung";
import type {
  PreCheckAnswers,
  TQuestion,
} from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import { getResultForAnswers } from "~/routes/vorpruefung.ergebnis/getResultForAnswers";
import Result from "~/routes/vorpruefung.ergebnis/route";

const { questions } = preCheck;

type ExpectedResult = {
  headline: string;
  showsInteropLink: boolean;
  showsNegativeReasoning: boolean;
  includesInterop: boolean;
  interopIsPositive?: boolean;
  warningInteropWithoutDigital?: boolean;
  showsUnsureHint?: boolean;
  formIsVisible?: boolean;
  linksAreVisible?: boolean;
  resultPrefixes?: {
    positivePrefix: string;
    negativePrefix: string;
    unsurePrefix: string;
  };
  emailBodyContains?: string[];
  allPositive?: boolean;
  allNegative?: boolean;
  dcPositiveIOunsure?: boolean;
  negativeReasoningText?: string;
};

interface TestScenario {
  name: string;
  answers: (question: TQuestion) => "Ja" | "Nein" | "Ich bin unsicher";
  expected: ExpectedResult;
}

const scenarios: TestScenario[] = [
  {
    name: "positive result for digital and interoperability",
    answers: () => "Ja",
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: true,
      interopIsPositive: true,
      formIsVisible: true,
      linksAreVisible: true,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
      allPositive: true,
    },
  },
  {
    name: "positive result for digital and negative for interoperability",
    answers: (question) => (question.interoperability ? "Nein" : "Ja"),
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: false,
      showsNegativeReasoning: false,
      includesInterop: false,
      interopIsPositive: false,
      formIsVisible: true,
      linksAreVisible: true,
    },
  },
  {
    name: "positive result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Ja",
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: true,
      interopIsPositive: false,
      showsUnsureHint: true,
      formIsVisible: true,
      linksAreVisible: true,
      emailBodyContains: [
        "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
      ],
      dcPositiveIOunsure: true,
    },
  },
  {
    name: "negative result for digital and interoperability",
    answers: () => "Nein",
    expected: {
      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: false,
      showsNegativeReasoning: true,
      includesInterop: false,
      interopIsPositive: false,
      formIsVisible: true,
      linksAreVisible: false,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
      allNegative: true,
      negativeReasoningText:
        "Dieses Vorhaben hat keinen Digitalbezug, weil es nicht relevant ist.",
    },
  },
  {
    name: "negative result for digital and positive for interoperability",
    answers: (question) => (question.interoperability ? "Ja" : "Nein"),
    expected: {
      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: true,
      includesInterop: false,
      interopIsPositive: true,
      warningInteropWithoutDigital: true,
      formIsVisible: true,
      linksAreVisible: false,
    },
  },
  {
    name: "negative result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Nein",
    expected: {
      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: true,
      includesInterop: false,
      formIsVisible: true,
      linksAreVisible: false,
    },
  },
  {
    name: "unsure result for digital and positive for interoperability",
    answers: (question) =>
      question.interoperability ? "Ja" : "Ich bin unsicher",
    expected: {
      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: false,
      warningInteropWithoutDigital: true,
      formIsVisible: false,
      linksAreVisible: true,
    },
  },
  {
    name: "unsure result for digital and negative for interoperability",
    answers: (question) =>
      question.interoperability ? "Nein" : "Ich bin unsicher",
    expected: {
      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: false,
      showsNegativeReasoning: false,
      includesInterop: false,
      formIsVisible: false,
      linksAreVisible: true,
    },
  },
  {
    name: "unsure result for digital and unsure for interoperability",
    answers: () => "Ich bin unsicher",
    expected: {
      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: false,
      formIsVisible: false,
      linksAreVisible: true,
    },
  },
  {
    name: "mixed answers result",
    answers: (question) => {
      if (questions.indexOf(question) === 0) return "Nein";
      if (questions.indexOf(question) === 1) return "Ich bin unsicher";
      return "Ja";
    },
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: true,
      formIsVisible: true,
      resultPrefixes: {
        positivePrefix: "+",
        negativePrefix: "-",
        unsurePrefix: "?",
      },
    },
  },
];

function generateMockAnswers(scenario: TestScenario): PreCheckAnswers {
  const answers: PreCheckAnswers = {};
  questions.forEach((question) => {
    switch (scenario.answers(question)) {
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

for (const scenario of scenarios) {
  describe(`test ${scenario.name}`, () => {
    beforeEach(() => {
      vi.resetAllMocks();

      const answers = generateMockAnswers(scenario);
      const result = getResultForAnswers(answers);
      vi.mocked(useLoaderData).mockReturnValue({
        answers: answers,
        result: result,
      });

      render(
        <MemoryRouter>
          <Result />
        </MemoryRouter>,
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("shows expected heading", async () => {
      expect(
        await screen.findByText(scenario.expected.headline, {
          exact: false,
        }),
      ).toBeInTheDocument();
    });
  });
}
