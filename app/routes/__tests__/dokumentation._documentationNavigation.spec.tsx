// Import mocks first
import "./utils/mockDocumentationDataService";
// End of mocks

import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  useLoaderData,
  useOutletContext,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_PRE,
} from "~/resources/staticRoutes";

import LayoutWithDocumentationNavigation, {
  NavigationContext,
} from "~/routes/dokumentation._documentationNavigation";
import useFeatureFlag from "~/utils/featureFlags";
import { useDocumentationData } from "../dokumentation/documentationDataHook";
import { DocumentationData } from "../dokumentation/documentationDataSchema";
import { initialDocumentationData } from "../dokumentation/documentationDataService";

vi.mock("~/utils/featureFlags", () => ({
  default: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useLoaderData: vi.fn(),
  };
});

const mockRoutes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [
    {
      title: "Prinzip A",
      url: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
    },
  ],
];

type ValidationScenario = {
  name: string;
  documentationData: DocumentationData;
  expected: {
    completedTitle: boolean;
    completedParticipation: boolean;
    completedPrinciples: boolean;

    warningTitle: boolean;
    warningParticipation: boolean;
    warningPrinciples: boolean;
  };
};

const validationScenarios: ValidationScenario[] = [
  {
    name: "all valid completed",
    documentationData: {
      ...initialDocumentationData,
      policyTitle: {
        title: "Valid Title",
      },
      participation: {
        formats: "Valid Formats",
        results: "Valid Results",
      },
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
      completedTitle: false, // is current route so no states are shown
      completedParticipation: true,
      completedPrinciples: true,

      warningTitle: false,
      warningParticipation: false,
      warningPrinciples: false,
    },
  },
  {
    name: "unfilled form",
    documentationData: {
      ...initialDocumentationData,
    },
    expected: {
      completedTitle: false, // is current route so no states are shown
      completedParticipation: false,
      completedPrinciples: false,

      warningTitle: false,
      warningParticipation: false,
      warningPrinciples: false,
    },
  },
  {
    name: "partial filled form with warnings",
    documentationData: {
      ...initialDocumentationData,
      policyTitle: {
        title: "",
      },
      participation: {
        formats: "Valid Formats",
        results: "Valid Results",
      },
      principles: [
        {
          answer: "Ja, gänzlich oder Teilweise",
          id: "1",
          reasoning: [
            {
              checkbox: "on",
              aspect: "aspect-1",
              paragraphs: "paragraf 1",
              reason: "",
            },
          ],
        },
      ],
    },
    expected: {
      completedTitle: false, // is current route so no states are shown
      completedParticipation: true,
      completedPrinciples: false,

      warningTitle: false,
      warningParticipation: false,
      warningPrinciples: true,
    },
  },
];

const mockedUseDocumentationData = vi.mocked(useDocumentationData);

function renderPage({ url }: Route) {
  function ErrorBoundary() {
    return <h1>Something went wrong</h1>;
  }
  function DummyElement() {
    const { nextUrl, previousUrl } = useOutletContext<NavigationContext>();
    return (
      <>
        <h1>Foobar</h1>
        <a href={previousUrl}>Zurück</a>
        <a href={nextUrl}>Weiter</a>
      </>
    );
  }
  const routes = [
    {
      path: ROUTE_DOCUMENTATION.url,
      element: <LayoutWithDocumentationNavigation />,
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: url,
          element: <DummyElement />,
          HydrateFallback: () => <div></div>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });

  render(<RouterProvider router={router} />);
}

const getNav = () =>
  screen.getByRole("navigation", { name: "Seitennavigation" });

const getTitel = () =>
  within(getNav()).getByRole("link", { name: "Regelungsvorhaben Titel" });

const getBeteiligungsformate = () =>
  within(getNav()).getByRole("link", { name: "Beteiligungsformate" });

const getPrinzipA = () =>
  within(getNav()).getByRole("link", { name: "Prinzip A" });

const expectCompleted = (element: HTMLElement, completed: boolean = true) => {
  if (completed) {
    expect(element).toHaveAccessibleDescription(
      `${element.textContent} - Fertig`,
    );
    expect(within(element).getByTestId("CheckIcon")).toBeInTheDocument();
  } else {
    expect(element).not.toHaveAccessibleDescription(
      `${element.textContent} - Fertig`,
    );
    expect(within(element).queryByTestId("CheckIcon")).not.toBeInTheDocument();
  }
};

const expectWarning = (element: HTMLElement, warning: boolean = true) => {
  if (warning) {
    expect(element).toHaveAccessibleDescription(
      `${element.textContent} - Fehler`,
    );
    expect(
      within(element).getByTestId("WarningAmberOutlinedIcon"),
    ).toBeInTheDocument();
  } else {
    expect(element).not.toHaveAccessibleDescription(
      `${element.textContent} - Fehler`,
    );
    expect(
      within(element).queryByTestId("WarningAmberOutlinedIcon"),
    ).not.toBeInTheDocument();
  }
};

describe("navigation on pages of documentation", () => {
  beforeEach(() => {
    vi.mocked(useFeatureFlag).mockReturnValue(true);
    vi.mocked(useLoaderData).mockReturnValue({ routes: mockRoutes });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(mockRoutes.flat())(
    "$url has back and forth navigation to previous and next page",
    (route) => {
      renderPage(route);

      const index = mockRoutes.flat().findIndex(({ url }) => url === route.url);
      const previous = mockRoutes.flat()[index - 1];
      const next = mockRoutes.flat()[index + 1];

      if (previous) {
        expect(screen.getByRole("link", { name: "Zurück" })).toHaveAttribute(
          "href",
          previous.url,
        );
      }
      if (next) {
        const linkNext = screen.getByRole("link", {
          name: "Weiter",
        });
        expect(linkNext).toHaveAttribute("href", next.url);
      }
    },
  );

  it("renders sidebar navigation with links to all pages", () => {
    renderPage(mockRoutes.flat()[0]);

    const navigation = screen.getByRole("navigation", {
      name: "Seitennavigation",
    });
    for (const route of mockRoutes.flat()) {
      const navItem = within(navigation).getByRole("link", {
        name: route.title,
      });
      expect(navItem).toHaveAttribute("href", route.url);
    }
  });

  it("shows error page in case feature flag is disabled", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // suppress expected error logs to keep test output clean
    vi.mocked(useFeatureFlag).mockReturnValue(false);

    renderPage(mockRoutes.flat()[0]);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  describe("States", () => {
    describe.each(validationScenarios)(
      "Scenario: $name",
      ({ documentationData, expected }) => {
        beforeEach(() => {
          mockedUseDocumentationData.mockReturnValue({
            documentationData,
            findDocumentationDataForUrl: vi.fn((url: string) => {
              if (url === ROUTE_DOCUMENTATION_TITLE.url)
                return documentationData.policyTitle;
              else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
                return documentationData.participation;
              else return (documentationData.principles || [])[0];
            }),
          });
        });

        it("shows correct completed states", () => {
          renderPage(mockRoutes.flat()[0]);

          expectCompleted(getTitel(), expected.completedTitle);
          expectCompleted(
            getBeteiligungsformate(),
            expected.completedParticipation,
          );
          expectCompleted(getPrinzipA(), expected.completedPrinciples);
        });

        it("shows correct warning states", () => {
          renderPage(mockRoutes.flat()[0]);

          expectWarning(getTitel(), expected.warningTitle);
          expectWarning(
            getBeteiligungsformate(),
            expected.warningParticipation,
          );
          expectWarning(getPrinzipA(), expected.warningPrinciples);
        });
      },
    );
  });
});
