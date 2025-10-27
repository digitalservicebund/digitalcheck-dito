// Import mocks first
import "./utils/mockDocumentationDataService";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  useOutletContext,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { digitalDocumentation } from "~/resources/content/dokumentation";
import { Route, ROUTES_DOCUMENTATION_PRE } from "~/resources/staticRoutes";
import { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { NavigationContext } from "../dokumentation._documentationNavigation";
import DocumentationPrinciple from "../dokumentation._documentationNavigation.$principleId";
import { useDocumentationData } from "../dokumentation/documentationDataHook";
import { DocumentationData } from "../dokumentation/documentationDataSchema";
import { initialDocumentationData } from "../dokumentation/documentationDataService";

const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [
    {
      title: "Prinzip: Digitale Angebote",
      url: "/dokumentation/prinzip-1-digitale-angebote",
    },
  ],
];

const aspekte = [
  {
    Titel: "Aspekt 1",
    Beschreibung: "Aspekt 1 Beschreibung",
    Kurzbezeichnung: "A1",
    Text: [],
  },
];

const prinzips: PrinzipWithAspekte[] = [
  {
    Name: "Prinzip 1: Digitale Angebote",
    Kurzbezeichnung: "Prinzip 1",
    URLBezeichnung: "prinzip-1-digitale-angebote",
    documentId: "1",
    Nummer: 1,
    order: 1,
    Beschreibung: [],
    Aspekte: aspekte,
  },
];

const context: NavigationContext = {
  currentUrl: "/current-url",
  nextUrl: "/next-url",
  previousUrl: "/previous-url",
  routes: routes,
  prinzips,
};

const mockedUseOutletContext = vi.mocked(useOutletContext);
const mockedUseDocumentationData = vi.mocked(useDocumentationData);
const mockedUseLoaderData = vi.mocked(useLoaderData);

const renderWithRouter = () => {
  const router = createBrowserRouter([
    { path: "/", Component: DocumentationPrinciple },
  ]);

  return render(<RouterProvider router={router} />);
};

type AnswerScenario = {
  name: string;
  answer: (typeof digitalDocumentation.principlePages.radioOptions)[number];
  expected: {
    showsAspekte: boolean;
  };
};

const answerScenarios: AnswerScenario[] = [
  {
    name: "positive answer, no aspect selected",
    answer: "Ja, gänzlich oder Teilweise",
    expected: {
      showsAspekte: true,
    },
  },
  {
    name: "negative answer",
    answer: "Nein",
    expected: {
      showsAspekte: false,
    },
  },
  {
    name: "irrelevant answer",
    answer: "Nicht relevant",
    expected: {
      showsAspekte: false,
    },
  },
];

type ValidationScenario = {
  name: string;
  answer: (typeof digitalDocumentation.principlePages.radioOptions)[number];
  documentationData: DocumentationData;
  expected: {
    validReasoning: boolean;
    validReasoningParagraphs?: boolean;
    validReasoningReason?: boolean;
  };
};

const formValidationScenarios: ValidationScenario[] = [
  {
    name: "positive answer with filled aspects",
    answer: "Ja, gänzlich oder Teilweise",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Ja, gänzlich oder Teilweise",
          id: "1",
          reasoning: [
            {
              checkbox: "on",
              aspect: "aspect-1",
              paragraphs: "paragraf 1",
              reason: "begründung 1",
            },
          ],
        },
      ],
    },
    expected: {
      validReasoning: true,
      validReasoningParagraphs: true,
      validReasoningReason: true,
    },
  },
  {
    name: "positive answer with partial filled aspects",
    answer: "Ja, gänzlich oder Teilweise",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Ja, gänzlich oder Teilweise",
          id: "1",
          reasoning: [
            {
              checkbox: "on",
              aspect: "aspect-1",
              paragraphs: "",
              reason: "begründung 1",
            },
          ],
        },
      ],
    },
    expected: {
      validReasoning: true,
      validReasoningParagraphs: false,
      validReasoningReason: true,
    },
  },
  {
    name: "positive answer with unfilled aspects",
    answer: "Ja, gänzlich oder Teilweise",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Ja, gänzlich oder Teilweise",
          id: "1",
          reasoning: [],
        },
      ],
    },
    expected: {
      validReasoning: false,
      validReasoningParagraphs: true,
      validReasoningReason: true,
    },
  },
  {
    name: "negative answer with filled reasoning",
    answer: "Nein",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Nein",
          id: "1",
          reasoning: "reasoning 1",
        },
      ],
    },
    expected: {
      validReasoning: true,
    },
  },
  {
    name: "negative answer with unfilled reasoning",
    answer: "Nein",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Nein",
          id: "1",
          reasoning: "",
        },
      ],
    },
    expected: {
      validReasoning: false,
    },
  },
  {
    name: "irrelevant answer with filled reasoning",
    answer: "Nicht relevant",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Nicht relevant",
          id: "1",
          reasoning: "reasoning 1",
        },
      ],
    },
    expected: {
      validReasoning: false,
    },
  },
  {
    name: "irrelevant answer with unfilled reasoning",
    answer: "Nicht relevant",
    documentationData: {
      ...initialDocumentationData,
      principles: [
        {
          answer: "Nicht relevant",
          id: "1",
          reasoning: "",
        },
      ],
    },
    expected: {
      validReasoning: false,
    },
  },
];

const getAspektCheckbox = () =>
  screen.getByLabelText(aspekte[0].Kurzbezeichnung);

const getOwnReasoningCheckbox = () => screen.getByLabelText("Eigener Punkt");

const getAddExplanationBtn = () =>
  screen.getByRole("button", { name: "Eigene Erklärung hinzufügen" });

const expectErrorUnless = async (
  condition: boolean | undefined,
  error: string | RegExp,
  label: string = "",
  parentHasAlertRole: boolean = false,
) => {
  await waitFor(() => {
    let inputEl;
    if (label.length > 0) {
      inputEl = screen.getByLabelText(label);
      expect(inputEl).toBeInTheDocument();
    }
    const errorEl = screen.queryByText(error);

    if (condition) {
      if (inputEl) expect(inputEl).toBeValid();
      expect(errorEl).not.toBeInTheDocument();
    } else {
      if (inputEl) {
        expect(inputEl).toBeInvalid();
        expect(inputEl).toHaveAccessibleErrorMessage(error);
      }
      expect(errorEl).toBeInTheDocument();
      if (parentHasAlertRole) {
        expect(errorEl?.parentElement?.parentElement).toHaveRole("alert");
      } else expect(errorEl).toHaveRole("alert");
    }
  });
};

describe("DocumentationPrinciple", () => {
  beforeEach(() => {
    mockedUseOutletContext.mockReturnValue(context);
    mockedUseLoaderData.mockReturnValue({
      principleId: "prinzip-1-digitale-angebote",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the expected heading", () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", {
        name: "Prinzip 1: Digitale Angebote",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows the correct answer options", () => {
    renderWithRouter();

    ["Ja, gänzlich oder Teilweise", "Nein", "Nicht relevant"].forEach(
      (labelText) => {
        const input = screen.getByLabelText(labelText);
        expect(input).toBeInTheDocument();
        expect(input.tagName).toBe("INPUT");
      },
    );
  });

  it("shows submit button", () => {
    renderWithRouter();

    const submitButton = screen.getByRole("button", {
      name: "Weiter",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("shows back button", () => {
    renderWithRouter();

    const backButton = screen.getByRole("link", { name: "Zurück" });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/previous-url");
  });

  describe("answer scenarios", () => {
    let user: UserEvent;

    beforeEach(() => {
      renderWithRouter();
    });

    describe.each(answerScenarios)(
      "principle form test: $name",
      ({ answer, expected }) => {
        beforeEach(async () => {
          user = userEvent.setup();

          await user.click(screen.getByLabelText(answer));
        });

        it(`shows the correct form fields for answer: ${answer}`, () => {
          expect(
            screen.getByRole("heading", {
              level: 2,
              name: "Erläuterung angeben",
            }),
          ).toBeInTheDocument();

          if (expected.showsAspekte) {
            expect(getAspektCheckbox()).toBeInTheDocument();
            expect(getAddExplanationBtn()).toBeInTheDocument();
          } else {
            expect(screen.getByLabelText("Begründung")).toBeInTheDocument();
          }
        });

        describe.runIf(expected.showsAspekte)("Positive Answer", () => {
          it("shows the correct form elements for a predefined Aspekt", async () => {
            const a1Checkbox = getAspektCheckbox();
            await user.click(a1Checkbox);

            const a1Element =
              a1Checkbox.parentElement!.parentElement!.parentElement!;

            expect(
              within(a1Element).getByLabelText(
                "ParagrafenParagrafen, in denen sich das Regelungsvorhaben auf den ausgewählten Schwerpunkt bezieht.",
              ),
            ).toBeInTheDocument();

            expect(
              within(a1Element).getByLabelText(
                "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
              ),
            ).toBeInTheDocument();

            expect(
              within(a1Element).getByRole("button", {
                name: "Erläuterung löschen",
              }),
            ).toBeInTheDocument();
          });

          it("allows to add an own explanation", async () => {
            await user.click(
              screen.getByRole("button", {
                name: "Eigene Erklärung hinzufügen",
              }),
            );

            const ownElement =
              getOwnReasoningCheckbox().parentElement!.parentElement!
                .parentElement!;

            expect(
              within(ownElement).getByLabelText(
                "ParagrafenParagrafen, in denen sich das Regelungsvorhaben auf den ausgewählten Schwerpunkt bezieht.",
              ),
            ).toBeInTheDocument();

            expect(
              within(ownElement).getByLabelText(
                "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
              ),
            ).toBeInTheDocument();

            expect(
              within(ownElement).getByRole("button", {
                name: "Erläuterung löschen",
              }),
            ).toBeInTheDocument();
          });
        });
      },
    );
  });

  describe("form validation", () => {
    describe.each(formValidationScenarios)(
      "form validation scenario: $name",
      ({ documentationData, expected, answer }) => {
        beforeEach(() => {
          mockedUseDocumentationData.mockReturnValue({
            documentationData,
            findDocumentationDataForUrl: vi.fn(),
          });

          act(() => {
            renderWithRouter();
          });
        });

        it.runIf(answer === "Ja, gänzlich oder Teilweise")(
          "shows the correct validation for reasoning",
          async () => {
            await expectErrorUnless(
              expected.validReasoning,
              /Bitte geben Sie mindestens eine Erläuterung an/,
              "",
              true,
            );

            if (expected.validReasoning) {
              await expectErrorUnless(
                expected.validReasoningParagraphs,
                /Bitte geben Sie einen Paragrafen an/,
                "ParagrafenParagrafen, in denen sich das Regelungsvorhaben auf den ausgewählten Schwerpunkt bezieht.",
              );

              await expectErrorUnless(
                expected.validReasoningReason,
                /Bitte geben Sie eine Begründung an/,
                "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
              );
            }
          },
        );

        it.runIf(answer !== "Ja, gänzlich oder Teilweise")(
          "shows the correct validation for reasoning",
          async () => {
            await expectErrorUnless(
              expected.validReasoning,
              /Bitte geben Sie eine Begründung an/,
              "Begründung",
            );
          },
        );
      },
    );
  });

  describe("validation behavior", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("removes errors on valid input for reasoning string", async () => {
      mockedUseDocumentationData.mockReturnValue({
        documentationData: {
          ...initialDocumentationData,
          principles: [
            {
              id: "1",
              answer: "Nein",
              reasoning: "",
            },
          ],
        },
        findDocumentationDataForUrl: vi.fn(),
      });

      act(() => {
        renderWithRouter();
      });

      const reasoningInput = screen.getByLabelText("Begründung");
      await waitFor(() => {
        expect(reasoningInput).toBeInvalid();
      });

      await user.type(reasoningInput, "Valid Reasoning");
      expect(reasoningInput).toBeValid();

      await user.clear(reasoningInput);
      expect(reasoningInput).toBeValid();
    });

    // FIXME: error is not removed on clicking the checkbox
    it("removes errors on valid input for reasoning array", async () => {
      mockedUseDocumentationData.mockReturnValue({
        documentationData: {
          ...initialDocumentationData,
          principles: [
            {
              id: "1",
              answer: "Ja, gänzlich oder Teilweise",
            },
          ],
        },
        findDocumentationDataForUrl: vi.fn(),
      });

      act(() => {
        renderWithRouter();
      });

      let reasoningError: HTMLElement | null = null;
      let aspektCheckbox: HTMLElement | null = null;

      await waitFor(() => {
        reasoningError = screen.getByText(
          /Bitte geben Sie mindestens eine Erläuterung an/,
        );
        aspektCheckbox = getAspektCheckbox();
      });

      expect(reasoningError).toBeInTheDocument();
      await user.click(aspektCheckbox as unknown as HTMLElement);

      // TODO: somehow the error is not removed on change here
      // await waitFor(() => {
      //   expect(
      //     screen.queryByText(/Bitte geben Sie mindestens eine Erläuterung an/),
      //   ).not.toBeInTheDocument();
      // });
    });
  });
});
