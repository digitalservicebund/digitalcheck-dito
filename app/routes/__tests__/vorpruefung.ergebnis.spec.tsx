import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { dokumentation, interoperabel, methoden } from "@/config/routes";
import { preCheck } from "~/resources/content/vorpruefung";
import type { TQuestion } from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import Result from "~/routes/vorpruefung.ergebnis/route";
import { readVersionedDataFromLocalStorage } from "~/utils/localStorageVersioned";
import type { PreCheckData } from "../vorpruefung/preCheckDataService";
import {
  DATA_SCHEMA_VERSION,
  getPreCheckData,
} from "../vorpruefung/preCheckDataService";

// mock pruefstelleMails since the real data is not stable yet and would break tests
const mockPruefstelleMails = vi.hoisted(
  () =>
    new Map<string, string>([
      ["Bund", "poststelle@nkr.bund.de"],
      ["Brandenburg", "pruefstelle-brandenburg@example.com"],
    ]),
);

vi.mock("~/resources/content/shared/bundeslaender", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("~/resources/content/shared/bundeslaender")
    >();
  return { ...actual, pruefstelleMails: mockPruefstelleMails };
});

vi.mock("~/utils/localStorageVersioned", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("~/utils/localStorageVersioned")>();
  return {
    ...actual,
    readVersionedDataFromLocalStorage: vi.fn(),
  };
});

const mockAssign = vi.fn();
vi.stubGlobal("location", {
  href: "/",
  assign: mockAssign,
});

const DC_MAIL = "interoperabel@digitalservice.bund.de";
const NKR_MAIL = mockPruefstelleMails.get("Bund")!;
const BB_MAIL = mockPruefstelleMails.get("Brandenburg")!;

const UNSURE_HEADLINE =
  "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.";
const UNSURE_HINT_BUND = "Wir helfen Ihnen, die Vorprüfung auszufüllen.";
const UNSURE_HINT_NO_PRUEFSTELLE = "Vorprüfung zu wiederholen";

const { questions } = preCheck;

// all true
const DEFAULT_EXPECTATIONS = {
  formIsVisible: true,
  hasInputArbeitstitel: true,
  showsNegativeReasoning: true,
  showsUnsureHeading: true,
  includesInterop: true,
  furtherStepsVisible: true,
  showsAnswerConflictWarning: true,
  unsureHintSubstring: null as string | null,
  allPositive: true,
  dcPositiveIOunsure: true,
  emailRecipients: [NKR_MAIL, DC_MAIL],
  emailBodyContains: [] as string[],
  inlineNoticeText: undefined as string | undefined,
  infoTooltip: undefined as string | undefined,
  hasDownloadButton: false, // Bundesland without Prüfstelle only
  expectedPruefstelleStep: "Prüfen durch den NKR" as string | null,
};

type ExpectedResult = typeof DEFAULT_EXPECTATIONS & { headline: string };
type Answers = (question: TQuestion) => "Ja" | "Nein" | "Ich bin unsicher";

interface TestScenario {
  name: string;
  answers: Answers;
  expected: ExpectedResult;
  bundesland?: string;
}

function setup(answers: Answers, bundesland = "Bund") {
  const user = userEvent.setup();

  const preCheckAnswers = questions.map((q) => {
    const ans = answers(q);
    const answerMap = { Ja: "yes", Nein: "no", "Ich bin unsicher": "unsure" };
    const answer = answerMap[ans];
    return { questionId: q.id, answer };
  });

  vi.mocked(readVersionedDataFromLocalStorage).mockReturnValue({
    version: DATA_SCHEMA_VERSION,
    answers: preCheckAnswers,
    title: "",
    negativeReasoning: "",
    bundesland,
    ssr: false,
  } as PreCheckData);

  // Clear cache
  getPreCheckData();

  const result = render(<Result />);

  return { user, ...result };
}

const scenarios: TestScenario[] = [
  {
    name: "positive result for digital and interoperability",
    answers: () => "Ja",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
    },
  },
  {
    name: "positive result for digital and negative for interoperability",
    answers: (question) => (question.interoperability ? "Nein" : "Ja"),
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,
      includesInterop: false,
      emailRecipients: [NKR_MAIL], // no DC_MAIL

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine Anforderungen der Interoperabilität.",
    },
  },
  {
    name: "positive result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Ja",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      emailBodyContains: [
        "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
      ],
    },
  },
  {
    name: "negative result for digital and interoperability",
    answers: () => "Nein",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsUnsureHeading: false,
      includesInterop: false,
      emailRecipients: [NKR_MAIL], // no DC_MAIL

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
    },
  },
  {
    name: "negative result for digital and positive for interoperability",
    answers: (question) => (question.interoperability ? "Ja" : "Nein"),
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsUnsureHeading: false,
      emailRecipients: [NKR_MAIL], // no DC_MAIL

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
    },
  },
  {
    name: "negative result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Nein",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsUnsureHeading: false,
      emailRecipients: [NKR_MAIL], // no DC_MAIL

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
    },
  },
  {
    name: "unsure result for digital and positive for interoperability",
    answers: (question) =>
      question.interoperability ? "Ja" : "Ich bin unsicher",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      formIsVisible: false,
      hasInputArbeitstitel: false,
      showsNegativeReasoning: false,
      furtherStepsVisible: false,
      unsureHintSubstring: UNSURE_HINT_BUND,

      headline: UNSURE_HEADLINE,
    },
  },
  {
    name: "unsure result for digital and negative for interoperability",
    answers: (question) =>
      question.interoperability ? "Nein" : "Ich bin unsicher",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      formIsVisible: false,
      hasInputArbeitstitel: false,
      showsNegativeReasoning: false,
      includesInterop: false,
      furtherStepsVisible: false,
      unsureHintSubstring: UNSURE_HINT_BUND,

      headline: UNSURE_HEADLINE,
    },
  },
  {
    name: "unsure result for digital and unsure for interoperability",
    answers: () => "Ich bin unsicher",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      formIsVisible: false,
      hasInputArbeitstitel: false,
      showsNegativeReasoning: false,
      furtherStepsVisible: false,
      unsureHintSubstring: UNSURE_HINT_BUND,

      headline: UNSURE_HEADLINE,
    },
  },
  {
    name: "unsure result for Bundesland with Pruefstelle",
    answers: () => "Ich bin unsicher",
    bundesland: "Brandenburg",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      formIsVisible: false,
      hasInputArbeitstitel: false,
      showsNegativeReasoning: false,
      furtherStepsVisible: false,
      emailRecipients: [BB_MAIL],
      unsureHintSubstring: BB_MAIL,

      headline: UNSURE_HEADLINE,
    },
  },
  {
    name: "unsure result for Bundesland without Pruefstelle",
    answers: () => "Ich bin unsicher",
    bundesland: "Hessen",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      formIsVisible: false,
      hasInputArbeitstitel: false,
      showsNegativeReasoning: false,
      furtherStepsVisible: false,
      emailRecipients: [],
      hasDownloadButton: true,
      expectedPruefstelleStep: null,
      unsureHintSubstring: UNSURE_HINT_NO_PRUEFSTELLE,

      headline: UNSURE_HEADLINE,
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
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
    },
  },
  // Bundesländer
  {
    name: "Bundesland without Prüfstelle",
    answers: () => "Ja",
    bundesland: "Hessen",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],

      emailRecipients: [],
      hasDownloadButton: true,
      expectedPruefstelleStep: null,
    },
  },
  {
    name: "Bundesland with Prüfstelle",
    answers: () => "Ja",
    bundesland: "Brandenburg",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsNegativeReasoning: false,
      showsUnsureHeading: false,

      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],

      emailRecipients: [BB_MAIL],
      expectedPruefstelleStep: "Prüfen durch zuständige Prüfstelle",
    },
  },
  {
    name: "negative result for Bundesland with Prüfstelle",
    answers: () => "Nein",
    bundesland: "Brandenburg",
    expected: {
      ...DEFAULT_EXPECTATIONS,
      showsAnswerConflictWarning: false,
      showsUnsureHeading: false,
      includesInterop: false,

      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      emailRecipients: [BB_MAIL],
      expectedPruefstelleStep: "Prüfen durch zuständige Prüfstelle",
    },
  },
];

describe("Vorprüfung Ergebnis Page", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Scenario-based Rendering", () => {
    describe.each(scenarios)("$name", ({ answers, bundesland, expected }) => {
      it("displays the correct headline", () => {
        setup(answers, bundesland);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          expected.headline,
        );
      });

      it(`should ${expected.includesInterop ? "show" : "hide"} the interoperability link`, () => {
        setup(answers, bundesland);
        const link = screen.queryByRole("link", { name: "Übersichtsseite" });
        // Scope to result-details to avoid matching the aria-hidden print copy
        const resultDetails = screen.getByTestId("result-details");
        const text = within(resultDetails).queryByText(
          "Erfahren Sie mehr über Interoperabilität",
        );

        if (expected.includesInterop) {
          expect(link).toHaveAttribute("href", interoperabel.path);
          expect(text).toBeInTheDocument();
        } else {
          expect(link).not.toBeInTheDocument();
          expect(text).not.toBeInTheDocument();
        }
      });

      it(`should ${expected.showsAnswerConflictWarning ? "show" : "hide"} answer conflict warning`, () => {
        setup(answers, bundesland);
        const warning = screen.queryByText(
          "Es liegt ein Widerspruch in Ihren Angaben vor.",
        );
        if (expected.showsAnswerConflictWarning) {
          expect(warning).toBeInTheDocument();
        } else {
          expect(warning).not.toBeInTheDocument();
        }
      });

      it("renders correct details summary based on answers", () => {
        setup(answers, bundesland);
        const detailsSummary = screen.getByTestId("result-details");
        questions.forEach((question) => {
          const expectedText =
            answers(question) === "Nein"
              ? question.negativeResult
              : question.positiveResult;
          expect(
            within(detailsSummary).getByText(expectedText),
          ).toBeInTheDocument();
        });
      });

      it.runIf(expected.hasDownloadButton)(
        "should show download button",
        () => {
          setup(answers, bundesland);
          const downloadBtn = screen.queryByRole("button", {
            name: "Ergebnis herunterladen",
          });
          expect(downloadBtn).toBeInTheDocument();
        },
      );

      it.runIf(expected.unsureHintSubstring)(
        "shows the correct unsure hint",
        () => {
          setup(answers, bundesland);
          expect(
            screen.getByText(expected.unsureHintSubstring!, { exact: false }),
          ).toBeInTheDocument();
        },
      );

      it(`should ${expected.formIsVisible ? "show" : "hide"} the contact form`, () => {
        setup(answers, bundesland);
        const formElement = screen.queryByTestId("result-form");
        const titleInput = screen.queryByRole("textbox", {
          name: "Vorläufiger Arbeitstitel des Vorhabens",
        });

        if (expected.formIsVisible) {
          expect(formElement).toBeInTheDocument();
          expect(titleInput).toBeInTheDocument();
        } else {
          expect(formElement).not.toBeInTheDocument();
          expect(titleInput).not.toBeInTheDocument();
        }
      });

      it.runIf(expected.formIsVisible)(
        `should ${expected.showsNegativeReasoning ? "show" : "hide"} the reasoning input`,
        () => {
          setup(answers, bundesland);
          const reasoningInput = screen.queryByRole("textbox", {
            name: "Begründung",
          });
          if (expected.showsNegativeReasoning) {
            expect(reasoningInput).toBeInTheDocument();
          } else {
            expect(reasoningInput).not.toBeInTheDocument();
          }
        },
      );

      it("handles further steps visibility", () => {
        setup(answers, bundesland);
        const heading = screen.queryByRole("heading", {
          level: 2,
          name: "So machen Sie weiter",
        });

        if (expected.furtherStepsVisible) {
          expect(heading).toBeInTheDocument();

          if (!expected.showsNegativeReasoning) {
            expect(
              screen.getByRole("link", { name: "Zu „Erarbeiten“" }),
            ).toHaveAttribute("href", methoden.path);
            expect(
              screen.getByRole("link", { name: "Zu „Dokumentieren“" }),
            ).toHaveAttribute("href", dokumentation.path);
          }

          if (expected.expectedPruefstelleStep) {
            expect(
              screen.getByText(expected.expectedPruefstelleStep),
            ).toBeInTheDocument();
          } else {
            expect(
              screen.queryByText("Prüfen durch den NKR"),
            ).not.toBeInTheDocument();
            expect(
              screen.queryByText("Prüfen durch zuständige Prüfstelle"),
            ).not.toBeInTheDocument();
          }
        } else {
          expect(heading).not.toBeInTheDocument();
        }
      });

      describe.runIf(expected.formIsVisible)("Email Generation", () => {
        it("generates the correct mailto link", async () => {
          const { user } = setup(answers, bundesland);

          await user.type(
            screen.getByLabelText("Vorläufiger Arbeitstitel des Vorhabens"),
            "Test Projekt",
          );

          if (expected.showsNegativeReasoning) {
            await user.type(screen.getByLabelText("Begründung"), "Test Grund");
          }

          const link = screen.getByRole("link", { name: "E-Mail erstellen" });
          const href = link.getAttribute("href") || "";
          expect(href).toMatch(/^mailto:/);

          const [recipientsStr, queryString] = href
            .replace("mailto:", "")
            .split("?")
            .map((part) => decodeURIComponent(part));
          const recipients = recipientsStr
            .split(";")
            .map((s) => s.trim())
            .filter(Boolean);
          const params = new URLSearchParams(queryString);
          const body = params.get("body") || "";
          const subject = params.get("subject") || "";

          if (expected.emailRecipients) {
            expect(recipients).toHaveLength(expected.emailRecipients.length);
            expect(recipients).toEqual(
              expect.arrayContaining(expected.emailRecipients),
            );
          }

          expect(subject).toContain("Test Projekt");

          if (expected.showsNegativeReasoning)
            expect(body).toContain("Test Grund");

          expected.emailBodyContains.forEach((snippet) => {
            expect(body).toContain(snippet);
          });

          questions.forEach((q) => {
            const text =
              answers(q) === "Nein" ? q.negativeResult : q.positiveResult;
            expect(body).toContain(text);
          });
        });
      });

      describe.runIf(expected.formIsVisible)("Form Validation", () => {
        it("validates required fields", async () => {
          const { user } = setup(answers, bundesland);
          const submitBtn = screen.getByRole("button", {
            name: "E-Mail erstellen",
          });

          await user.click(submitBtn);

          expect(
            screen.getByLabelText("Vorläufiger Arbeitstitel des Vorhabens"),
          ).toHaveAccessibleErrorMessage(
            "Fehler: Bitte geben Sie einen Titel für Ihr Vorhaben an.",
          );

          const reasonInput = screen.queryByLabelText("Begründung");
          if (expected.showsNegativeReasoning && reasonInput) {
            expect(reasonInput).toHaveAccessibleErrorMessage(
              "Fehler: Bitte geben Sie eine Begründung für den fehlenden Digitalbezug an.",
            );
          }
        });

        it("clears error when field is filled", async () => {
          const { user } = setup(answers, bundesland);
          await user.click(
            screen.getByRole("button", { name: "E-Mail erstellen" }),
          );

          const titleInput = screen.getByLabelText(
            "Vorläufiger Arbeitstitel des Vorhabens",
          );
          await user.type(titleInput, "Fixed Title");

          expect(titleInput).not.toHaveAccessibleErrorMessage();
        });
      });
    });
  });

  describe("Redirect Guard", () => {
    it("redirects to start if questions are unanswered", async () => {
      globalThis.location.href = "/vorpruefung/ergebnis";
      vi.mocked(readVersionedDataFromLocalStorage).mockReturnValue({
        version: DATA_SCHEMA_VERSION,
        answers: [{ questionId: questions[0].id, answer: "yes" }], // Only 1 answered
        ssr: false,
      } as PreCheckData);

      render(<Result />);

      await waitFor(() => {
        expect(globalThis.location.href).toBe("/vorpruefung");
      });
    });

    it("does not redirect when all questions are answered", () => {
      globalThis.location.href = "/vorpruefung/ergebnis";
      setup(() => "Ja");
      expect(globalThis.location.href).toBe("/vorpruefung/ergebnis");
    });
  });
});
