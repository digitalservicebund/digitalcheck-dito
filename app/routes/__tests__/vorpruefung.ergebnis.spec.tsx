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
import Result, { action, loader } from "~/routes/vorpruefung.ergebnis/route";
import getContentForResult from "../vorpruefung.ergebnis/getContentForResult";

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useActionData: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock("@rvf/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@rvf/react-router")>();
  const rvfReact = await import("@rvf/react");
  return {
    ...actual,
    ...rvfReact,
  };
});

const { questions } = preCheck;

type ExpectedResult = {
  formIsVisible: boolean;
  hasInputArbeitstitel: boolean;
  hasInputBegruendung: boolean;
  headline: string;
  showsInteropLink: boolean;
  showsNegativeReasoning: boolean;
  showsUnsureHeading: boolean;
  includesInterop: boolean;
  furtherStepsVisible: boolean;
  showsAnswerConflictWarning?: boolean;
  showsUnsureHint?: boolean;
  emailBodyContains?: string[];
  allPositive?: boolean;
  dcPositiveIOunsure?: boolean;
  inlineNoticeText?: string;
  infoTooltip?: string;
  includesNkrRecipient?: boolean;
  includesDigitalcheckTeam?: boolean;
};

type Answers = (question: TQuestion) => "Ja" | "Nein" | "Ich bin unsicher";

interface TestScenario {
  name: string;
  answers: Answers;
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
      showsUnsureHint: true,
      furtherStepsVisible: true,
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
      furtherStepsVisible: false,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
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
      furtherStepsVisible: false,
      includesNkrRecipient: true,
      includesDigitalcheckTeam: false,
      showsAnswerConflictWarning: true,
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

function renderResultPage(answers: Answers) {
  const preCheckAnswers = mapUserAnswersToMockAnswers(answers);
  const result = getResultForAnswers(preCheckAnswers);
  const resultContent = getContentForResult(preCheckAnswers, result);

  vi.mocked(useLoaderData).mockReturnValue({
    answers: preCheckAnswers,
    result: result,
    resultContent,
  });

  render(
    <MemoryRouter>
      <Result />
    </MemoryRouter>,
  );
}

/** Helper: Request-like object. action only calls request.formData(). */
function createRequest(
  answers: Answers,
  title?: string,
  negativeReasoning?: string,
) {
  const form: { [key: string]: string } = mapUserAnswersToMockAnswers(answers);

  const formData = new FormData();

  if (title) formData.append("title", title);
  if (negativeReasoning)
    formData.append("negativeReasoning", negativeReasoning);

  for (const [i, [key, value]] of Object.entries(form).entries()) {
    formData.append(`answers[${i}].questionId`, key);
    formData.append(`answers[${i}].answer`, value);
  }
  return { formData: () => formData } as unknown as Request;
}

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
        });

        describe("page", () => {
          beforeEach(() => {
            renderResultPage(answers);
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
              expect(
                screen.getByText(expected.infoTooltip),
              ).toBeInTheDocument();
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

          it("shows/hides warning for answer conflict", () => {
            if (expected.showsAnswerConflictWarning) {
              expect(
                screen.getByText(
                  "Es liegt ein Widerspruch in Ihren Angaben vor.",
                ),
              ).toBeInTheDocument();
            } else {
              expect(
                screen.queryByText(
                  "Es liegt ein Widerspruch in Ihren Angaben vor.",
                ),
              ).not.toBeInTheDocument();
            }
          });

          it("shows the correct results in the details summary", () => {
            for (const question of questions) {
              if (answers(question) === "Nein") {
                expect(
                  screen.getByText(question.negativeResult),
                ).toBeInTheDocument();
              } else {
                expect(
                  screen.getByText(question.positiveResult),
                ).toBeInTheDocument();
              }
            }
          });

          it("shows/hides the form", () => {
            if (expected.formIsVisible) {
              expect(
                screen.getByText(
                  "Ergebnis senden und NKR frühzeitig einbinden",
                ),
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
        });

        describe("form validation", () => {
          if (expected.hasInputArbeitstitel && expected.hasInputBegruendung) {
            it("throws an error when no Arbeitstitel and Begründung is given", async () => {
              const req = createRequest(answers);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = await action({ request: req } as any);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.init.status).toBe(422);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.data.fieldErrors).toStrictEqual({
                title: "Invalid input: expected string, received undefined",
              }); // validation for Begründung is no longer on the field itself (it is added via a superRefine call)
            });

            it("throws an error when only Arbeitstitel is given", async () => {
              const req = createRequest(answers, "Example Arbeitstitel");
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = await action({ request: req } as any);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.init.status).toBe(422);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.data.fieldErrors).toStrictEqual({
                "": "Bitte geben Sie eine Begründung für den fehlenden Digitalbezug an.", // validation is for Begründung, added via a superRefine call
              });
            });

            it("throws an error when only Begründung is given", async () => {
              const req = createRequest(
                answers,
                undefined,
                "Example Begründung",
              );
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = await action({ request: req } as any);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.init.status).toBe(422);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.data.fieldErrors).toStrictEqual({
                title: "Invalid input: expected string, received undefined",
              });
            });

            it("redirects to the write an email when valid Title and Begründung", async () => {
              const req = createRequest(
                answers,
                "Example Title",
                "Example Begründung",
              );
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = (await action({ request: req } as any)) as Response;
              expect(res.status).toBe(302);
            });
          } else if (
            expected.hasInputArbeitstitel &&
            !expected.hasInputBegruendung
          ) {
            it("throws an error when no Arbeitstitel is given", async () => {
              const req = createRequest(answers);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = await action({ request: req } as any);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.init.status).toBe(422);
              // @ts-expect-error init does exist here
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(res.data.fieldErrors).toStrictEqual({
                title: "Invalid input: expected string, received undefined",
              });
            });

            it("redirects to the write an email when valid Title", async () => {
              const req = createRequest(answers, "Example Title");
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = (await action({ request: req } as any)) as Response;
              expect(res.status).toBe(302);
            });
          } else {
            it("does not show the form", () => {
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
            });
          }
        });

        describe("Email", () => {
          if (expected.hasInputArbeitstitel || expected.hasInputBegruendung) {
            it("sends the correct email", async () => {
              const req = createRequest(
                answers,
                expected.hasInputArbeitstitel ? "Example Title" : undefined,
                expected.hasInputBegruendung ? "Example Begründung" : undefined,
              );

              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              const res = (await action({ request: req } as any)) as Response;
              const locationHeader = decodeURIComponent(
                res.headers.get("location")!,
              );

              expect(res.status).toBe(302);
              if (expected.includesNkrRecipient) {
                expect(res.headers.get("location")).toMatch(
                  "mailto:nkr%40bmj.bund.de",
                );
              }

              if (expected.includesInterop) {
                expect(res.headers.get("location")).toMatch(
                  "interoperabel%40digitalservice.bund.de",
                );
              }

              if (
                expected.emailBodyContains !== undefined &&
                expected.emailBodyContains.length > 0
              ) {
                for (const bodyText of expected.emailBodyContains) {
                  expect(locationHeader).toMatch(bodyText);
                }
              }

              for (const question of questions) {
                if (answers(question) === "Nein") {
                  expect(locationHeader).toMatch(question.negativeResult);
                } else {
                  expect(locationHeader).toMatch(question.positiveResult);
                }
              }

              if (expected.hasInputArbeitstitel) {
                expect(locationHeader).toMatch("Example Title");
              }

              if (expected.hasInputBegruendung) {
                expect(locationHeader).toMatch("Example Begründung");
              }

              if (expected.allPositive) {
                questions.forEach((question) => {
                  expect(locationHeader).toMatch(question.positiveResult);
                });
              }

              if (expected.dcPositiveIOunsure) {
                expect(locationHeader).toMatch(
                  "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
                );
              }
            });
          } else {
            it("does not show the form to send an email", () => {
              renderResultPage(answers);

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
            });
          }
        });
      },
    );
  });

  describe("loader", () => {
    it("loads answers from the cookie", async () => {
      const requestHeaders = new Headers();
      requestHeaders.set(
        "cookie",
        // all positive answers
        "user-answers=eyJhbnN3ZXJzIjp7Iml0LXN5c3RlbSI6InllcyIsInZlcnBmbGljaHR1bmdlbi1mdWVyLWJldGVpbGlndGUiOiJ5ZXMiLCJkYXRlbmF1c3RhdXNjaCI6InllcyIsImtvbW11bmlrYXRpb24iOiJ5ZXMiLCJhdXRvbWF0aXNpZXJ1bmciOiJ5ZXMiLCJldS1iZXp1ZyI6InllcyJ9LCJoYXNWaWV3ZWRSZXN1bHQiOnRydWV9; jwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU3NTk4ODIwLCJleHAiOjE3NjAxOTA4MjB9.76KjFh84C0Ll9DCg5Xj0KHJokF6m66A8-2G07sd6nZs",
      );

      const request = new Request(
        "http://localhost:5173/vorpruefung/ergebnis",
        { headers: requestHeaders },
      );

      // @ts-expect-error expects typed loader args
      const res = await loader({ request });

      // @ts-expect-error data does exist
      expect(res.data).toMatchObject({
        result: {
          digital: "Positiv",
          interoperability: "Positiv",
          euBezug: "Positiv",
        },
        answers: {
          "it-system": "yes",
          "verpflichtungen-fuer-beteiligte": "yes",
          datenaustausch: "yes",
          kommunikation: "yes",
          automatisierung: "yes",
          "eu-bezug": "yes",
        },
      });
    });
  });
});
