// Import mocks first
import "./utils/mockLocalStorageVersioned";
// End of mocks

import "@testing-library/jest-dom";
import { act, render, screen, within } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  useOutletContext,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes";

import LayoutWithDocumentationNavigation, {
  NavigationContext,
} from "~/routes/dokumentation._documentationNavigation";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import {
  DATA_SCHEMA_VERSION_V1,
  DATA_SCHEMA_VERSION_V2,
  DocumentationData,
  V1,
  V2,
} from "../dokumentation/documentationDataSchema";

vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useRouteLoaderData: vi.fn(),
  };
});

const mockRoutes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_INTRO,
  [
    {
      title: "Prinzip A",
      url: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
    },
  ],
];

/**
 * Routes that are relevant for forms interaction, excluding the notes page, and summary/send steps.
 */
const documentationFormRoutes = mockRoutes
  .flat()
  .filter((route) => route.url !== ROUTE_DOCUMENTATION_NOTES.url);

type ValidationScenario = {
  name: string;
  documentationData: DocumentationData<V1> | DocumentationData<V2>;
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
      version: DATA_SCHEMA_VERSION_V1,
      policyTitle: {
        title: "Valid Title",
      },
      participation: {
        formats: "Valid Formats",
        results: "Valid Results",
      },
      principles: [
        {
          answer: "Ja, gänzlich oder teilweise",
          id: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
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
      version: DATA_SCHEMA_VERSION_V1,
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
      version: DATA_SCHEMA_VERSION_V1,
      policyTitle: {
        title: "",
      },
      participation: {
        formats: "Valid Formats",
        results: "Valid Results",
      },
      principles: [
        {
          answer: "Ja, gänzlich oder teilweise",
          id: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
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

function renderPage({ url }: Route) {
  function ErrorBoundary() {
    useRouteError();
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
      element: (
        <DocumentationDataProvider>
          <LayoutWithDocumentationNavigation />
        </DocumentationDataProvider>
      ),
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: "*",
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

const getTitel = () => within(getNav()).getByText("Regelungsvorhaben Titel");

const getBeteiligungsformate = () =>
  within(getNav()).getByRole("link", { name: "Beteiligungsformate" });

const getPrinzipA = () =>
  within(getNav()).getByRole("link", { name: "Prinzip A" });

const expectCompleted = (element: HTMLElement) => {
  expect(element).toHaveAccessibleDescription(
    `${element.textContent} - Fertig`,
  );
  expect(within(element).getByTestId("CheckIcon")).toBeInTheDocument();
};

const expectNotCompleted = (element: HTMLElement) => {
  expect(element).not.toHaveAccessibleDescription(
    `${element.textContent} - Fertig`,
  );
  expect(within(element).queryByTestId("CheckIcon")).not.toBeInTheDocument();
};

const expectWarning = (element: HTMLElement) => {
  expect(element).toHaveAccessibleDescription(
    `${element.textContent} - Fehler`,
  );
  expect(
    within(element).getByTestId("WarningAmberOutlinedIcon"),
  ).toBeInTheDocument();
};

const expectNotWarning = (element: HTMLElement) => {
  expect(element).not.toHaveAccessibleDescription(
    `${element.textContent} - Fehler`,
  );
  expect(
    within(element).queryByTestId("WarningAmberOutlinedIcon"),
  ).not.toBeInTheDocument();
};

describe("navigation on pages of documentation", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );

    vi.mocked(useRouteLoaderData).mockReturnValue({ routes: mockRoutes });
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

  it("disables all routes and only shows top-level items on the notes page", () => {
    renderPage(ROUTE_DOCUMENTATION_NOTES);
    const navigation = screen.getByRole("navigation", {
      name: "Seitennavigation",
    });
    for (const title of [
      ROUTE_DOCUMENTATION_TITLE.title,
      ROUTE_DOCUMENTATION_PARTICIPATION.title,
      "Prinzipien",
    ]) {
      const item = within(navigation).getByText(title);
      expect(item).toHaveAttribute("aria-disabled");
      expect(item).not.toHaveAttribute("href");
    }
  });

  const currentRoute = ROUTE_DOCUMENTATION_TITLE;
  it("renders sidebar navigation with links to all pages (except current and notes)", () => {
    renderPage(currentRoute);

    const navigation = screen.getByRole("navigation", {
      name: "Seitennavigation",
    });
    for (const route of documentationFormRoutes) {
      if (route.url === currentRoute.url) continue;
      const navItem = within(navigation).getByRole("link", {
        name: route.title,
      });
      expect(navItem).toHaveAttribute("href", route.url);
    }
  });

  describe("States", () => {
    describe.each(validationScenarios)(
      "Scenario: $name",
      ({ documentationData, expected }) => {
        beforeEach(async () => {
          vi.mocked(
            readDataFromLocalStorage<DocumentationData<V1>>,
          ).mockReturnValue(documentationData);
          // eslint-disable-next-line @typescript-eslint/require-await
          await act(async () => {
            renderPage(currentRoute);
          });
        });

        it("shows correct completed states", () => {
          if (expected.completedTitle) expectCompleted(getTitel());
          else expectNotCompleted(getTitel());
          if (expected.completedParticipation)
            expectCompleted(getBeteiligungsformate());
          else expectNotCompleted(getBeteiligungsformate());
          if (expected.completedPrinciples) expectCompleted(getPrinzipA());
          else expectNotCompleted(getPrinzipA());
        });

        it("shows correct warning states", () => {
          if (expected.warningTitle) expectWarning(getTitel());
          else expectNotWarning(getTitel());
          if (expected.warningParticipation)
            expectWarning(getBeteiligungsformate());
          else expectNotWarning(getBeteiligungsformate());
          if (expected.warningPrinciples) expectWarning(getPrinzipA());
          else expectNotWarning(getPrinzipA());
        });
      },
    );
  });

  describe("V2 States", () => {
    const validationScenariosV2: ValidationScenario[] = [
      {
        name: "all valid completed (V2)",
        documentationData: {
          version: DATA_SCHEMA_VERSION_V2,
          policyTitle: {
            title: "Valid Title",
          },
          participation: {
            formats: "Valid Formats",
            results: "Valid Results",
          },
          principles: [
            {
              answer: "Ja, gänzlich oder teilweise",
              id: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
              reasoning: "Some reasoning",
              aspects: ["aspect-1"],
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
        name: "unfilled form (V2)",
        documentationData: {
          version: DATA_SCHEMA_VERSION_V2,
        },
        expected: {
          completedTitle: false,
          completedParticipation: false,
          completedPrinciples: false,

          warningTitle: false,
          warningParticipation: false,
          warningPrinciples: false,
        },
      },
      {
        name: "partial filled form (V2)",
        documentationData: {
          version: DATA_SCHEMA_VERSION_V2,
          policyTitle: {
            title: "",
          },
          participation: {
            formats: "Valid Formats",
            results: "Valid Results",
          },
          principles: [
            {
              answer: "Ja, gänzlich oder teilweise",
              id: `${ROUTE_DOCUMENTATION.url}/prinzipA`,
              reasoning: "Some reasoning",
              aspects: [], // empty aspects fails V2 validation
            },
          ],
        },
        expected: {
          completedTitle: false, // is current route so no states are shown
          completedParticipation: true,
          completedPrinciples: false, // aspects empty -> invalid in V2

          warningTitle: false,
          warningParticipation: false,
          warningPrinciples: true, // data exists but invalid
        },
      },
    ];

    describe.each(validationScenariosV2)(
      "Scenario: $name",
      ({ documentationData, expected }) => {
        beforeEach(async () => {
          vi.mocked(
            readDataFromLocalStorage<DocumentationData<V1>>,
          ).mockReturnValue(documentationData);
          // eslint-disable-next-line @typescript-eslint/require-await
          await act(async () => {
            renderPage(currentRoute);
          });
        });

        it("shows correct completed states", () => {
          if (expected.completedTitle) expectCompleted(getTitel());
          else expectNotCompleted(getTitel());
          if (expected.completedParticipation)
            expectCompleted(getBeteiligungsformate());
          else expectNotCompleted(getBeteiligungsformate());
          if (expected.completedPrinciples) expectCompleted(getPrinzipA());
          else expectNotCompleted(getPrinzipA());
        });

        it("shows correct warning states", () => {
          if (expected.warningTitle) expectWarning(getTitel());
          else expectNotWarning(getTitel());
          if (expected.warningParticipation)
            expectWarning(getBeteiligungsformate());
          else expectNotWarning(getBeteiligungsformate());
          if (expected.warningPrinciples) expectWarning(getPrinzipA());
          else expectNotWarning(getPrinzipA());
        });
      },
    );
  });
});
