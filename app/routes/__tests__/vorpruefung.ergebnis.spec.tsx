import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router";

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { preCheck } from "~/resources/content/vorpruefung";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
} from "~/resources/staticRoutes";
import type {
  PreCheckAnswers,
  TQuestion,
} from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import { getResultForAnswers } from "~/routes/vorpruefung.ergebnis/getResultForAnswers";
import Result from "~/routes/vorpruefung.ergebnis/route";

const { questions } = preCheck;

type ExpectedResult = {
  // Form:
  formIsVisible: boolean;
  hasInputArbeitstitel: boolean;
  hasInputBegruendung: boolean;

  // old:
  headline: string;
  showsInteropLink: boolean;
  showsNegativeReasoning: boolean;
  showsUnsureHeading: boolean;
  includesInterop: boolean;
  furtherStepsVisible: boolean;
  interopIsPositive?: boolean;
  warningInteropWithoutDigital?: boolean;
  showsUnsureHint?: boolean;
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
  inlineNoticeText?: string;
  infoTooltip?: string;
  includesNkrRecipient?: boolean;
  includesDigitalcheckTeam?: boolean;
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
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,
      includesInterop: true,
      interopIsPositive: true,
      furtherStepsVisible: true,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
      allPositive: true,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
    },
  },
  {
    name: "positive result for digital and negative for interoperability",
    answers: (question) => (question.interoperability ? "Nein" : "Ja"),
    expected: {
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,
      includesInterop: false,
      interopIsPositive: false,
      furtherStepsVisible: true,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
    },
  },
  {
    name: "positive result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Ja",
    expected: {
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,
      includesInterop: true,
      interopIsPositive: false,
      showsUnsureHint: true,
      furtherStepsVisible: true, // TODO: not sure
      emailBodyContains: [
        "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
      ],
      dcPositiveIOunsure: true,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
    },
  },
  {
    name: "negative result for digital and interoperability",
    answers: () => "Nein",
    expected: {
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: true,

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: false,
      showsNegativeReasoning: true,
      showsUnsureHeading: false,
      includesInterop: false,
      interopIsPositive: false,
      furtherStepsVisible: false,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
      allNegative: true,
      negativeReasoningText:
        "Dieses Vorhaben hat keinen Digitalbezug, weil es nicht relevant ist.",
      includesNkrRecipient: true,
      includesDigitalcheckTeam: false,
    },
  },
  {
    name: "negative result for digital and positive for interoperability",
    answers: (question) => (question.interoperability ? "Ja" : "Nein"),
    expected: {
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: true,

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: true,
      showsUnsureHeading: false,
      includesInterop: false,
      interopIsPositive: true,
      warningInteropWithoutDigital: true,
      furtherStepsVisible: false, // TODO: unsure
      includesNkrRecipient: true,
      includesDigitalcheckTeam: false,
    },
  },
  {
    name: "negative result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Nein",
    expected: {
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: true,

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: true,
      showsUnsureHeading: false,
      showsUnsureHint: true,
      includesInterop: false,
      furtherStepsVisible: false,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: false,
    },
  },
  {
    name: "unsure result for digital and positive for interoperability",
    answers: (question) =>
      question.interoperability ? "Ja" : "Ich bin unsicher",
    expected: {
      formIsVisible: false,
      hasInputArbeitstitel: false,
      hasInputBegruendung: false,

      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      showsUnsureHeading: true,
      includesInterop: false,
      warningInteropWithoutDigital: true,
      furtherStepsVisible: false,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
    },
  },
  {
    name: "unsure result for digital and negative for interoperability",
    answers: (question) =>
      question.interoperability ? "Nein" : "Ich bin unsicher",
    expected: {
      formIsVisible: false,
      hasInputArbeitstitel: false,
      hasInputBegruendung: false,

      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: true,
      includesInterop: false,
      furtherStepsVisible: false,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
    },
  },
  {
    name: "unsure result for digital and unsure for interoperability",
    answers: () => "Ich bin unsicher",
    expected: {
      formIsVisible: false,
      hasInputArbeitstitel: false,
      hasInputBegruendung: false,

      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      showsUnsureHeading: true,
      includesInterop: false,
      furtherStepsVisible: false,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
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
      formIsVisible: true,
      hasInputArbeitstitel: true,
      hasInputBegruendung: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      furtherStepsVisible: true,
      showsUnsureHeading: false,
      includesInterop: true,
      resultPrefixes: {
        positivePrefix: "+",
        negativePrefix: "-",
        unsurePrefix: "?",
      },
      includesNkrRecipient: true,
      includesDigitalcheckTeam: true,
    },
  },
];

function mapUserAnswersToMockAnswers(
  answers: (question: TQuestion) => "Ja" | "Nein" | "Ich bin unsicher",
): PreCheckAnswers {
  const mockAnswers: PreCheckAnswers = {};
  questions.forEach((question) => {
    switch (answers(question)) {
      case "Ja":
        mockAnswers[question.id] = "yes";
        break;
      case "Nein":
        mockAnswers[question.id] = "no";
        break;
      case "Ich bin unsicher":
        mockAnswers[question.id] = "unsure";
        break;
    }
  });
  return mockAnswers;
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
    useNavigate: vi.fn(),
  };
});

beforeAll(() => {
  // Mock window.location
  Object.defineProperty(window, "location", {
    value: {
      href: "http://localhost:3000",
      assign: vi.fn(),
    },
    writable: true,
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe("Vorprüfung Ergebnis Page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Scenarios", () => {
    describe.each(scenarios)(
      "Result page test: $name",
      ({ answers, expected }) => {
        beforeEach(() => {
          vi.resetAllMocks();

          const preCheckAnswers = mapUserAnswersToMockAnswers(answers);
          const result = getResultForAnswers(preCheckAnswers);

          vi.mocked(useLoaderData).mockReturnValue({
            answers: preCheckAnswers,
            result: result,
          });

          render(
            <MemoryRouter>
              <Result />
            </MemoryRouter>,
          );
        });

        it("shows expected heading", async () => {
          expect(
            await screen.findByText(expected.headline, { exact: false }),
          ).toBeInTheDocument();
        });

        it("shows/hides inline notice", () => {
          if (expected.inlineNoticeText) {
            expect(
              screen.getByText(expected.inlineNoticeText),
            ).toBeInTheDocument();
          }
        });

        it("shows/hides tooltip", () => {
          if (expected.infoTooltip) {
            expect(screen.getByText(expected.infoTooltip)).toBeInTheDocument();
          }
        });

        it("shows/hides link to interoperability", () => {
          if (expected.showsInteropLink) {
            const linkInteroperability = screen.getByRole("link", {
              name: "Übersichtsseite",
            });
            expect(linkInteroperability).toHaveAttribute(
              "href",
              ROUTE_INTEROPERABILITY.url,
            );

            expect(
              screen.getByText("Erfahren Sie mehr über Interoperabilität"),
            ).toBeInTheDocument();
          } else {
            expect(
              screen.queryByText("Erfahren Sie mehr über Interoperabilität"),
            ).not.toBeInTheDocument();
            expect(
              screen.queryByRole("link", { name: "Übersichtsseite" }),
            ).not.toBeInTheDocument();
          }
        });

        it("shows/hides the form", () => {
          if (expected.formIsVisible) {
            expect(
              screen.getByText("Ergebnis senden und NKR frühzeitig einbinden"),
            ).toBeInTheDocument();
            expect(
              screen.getByRole("textbox", {
                name: "Vorläufiger Arbeitstitel des Vorhabens",
              }),
            ).toBeInTheDocument();
            if (expected.showsNegativeReasoning) {
              expect(
                screen.getByRole("textbox", {
                  name: "Begründung",
                }),
              ).toBeInTheDocument();
            } else {
              expect(
                screen.queryByRole("textbox", {
                  name: "Begründung",
                }),
              ).not.toBeInTheDocument();
            }
          } else {
            expect(
              screen.queryByText(
                "Ergebnis senden und NKR frühzeitig einbinden",
              ),
            ).not.toBeInTheDocument();
            expect(
              screen.queryByRole("textbox", {
                name: "Vorläufiger Arbeitstitel des Vorhabens",
              }),
            ).not.toBeInTheDocument();
          }
        });

        it("shows/hides unsure interoperability hint", () => {
          if (expected.showsUnsureHint) {
            expect(
              screen.getByText(
                "Das können Sie tun: Kontaktieren Sie uns unter",
                { exact: false },
              ),
            ).toBeInTheDocument();
          } else {
            expect(
              screen.queryByText(
                "Das können Sie tun: Kontaktieren Sie uns unter",
                { exact: false },
              ),
            ).not.toBeInTheDocument();
          }
        });

        it("shows/hides unsure answers heading", () => {
          if (expected.showsUnsureHeading) {
            expect(
              screen.getByRole("heading", {
                level: 1,
                name: "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
              }),
            ).toBeInTheDocument();
          } else {
            expect(
              screen.queryByRole("heading", {
                level: 1,
                name: "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
              }),
            ).not.toBeInTheDocument();
          }
        });

        it("shows/hides furtherSteps", () => {
          if (expected.furtherStepsVisible) {
            expect(
              screen.getByRole("heading", {
                level: 2,
                name: "So machen Sie weiter",
              }),
            ).toBeInTheDocument();
            expect(
              screen.getByRole("link", { name: "Zu „Erarbeiten“" }),
            ).toHaveAttribute("href", ROUTE_METHODS.url);
            expect(
              screen.getByRole("link", { name: "Zu „Dokumentieren“" }),
            ).toHaveAttribute("href", ROUTE_DOCUMENTATION.url);
          }
        });
      },
    );
  });
});
