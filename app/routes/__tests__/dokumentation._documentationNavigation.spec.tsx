// Import mocks first
import {
  dokumentation,
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  type Route,
} from "@/config/routes";
import "./utils/mockLocalStorageVersioned";
// End of mocks

import "@testing-library/jest-dom";
import { act, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createMemoryRouter,
  RouterProvider,
  useOutletContext,
  useRouteLoaderData,
} from "~/utils/routerCompat";

import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import LayoutWithDocumentationNavigation, {
  type NavigationContext,
} from "~/routes/dokumentation._documentationNavigation";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import {
  DATA_SCHEMA_VERSION_V1,
  DATA_SCHEMA_VERSION_V2,
  type DocumentationData,
  type V1,
  type V2,
} from "../dokumentation/documentationDataSchema";

vi.mock("~/contexts/FeatureFlagContext", () => ({
  useFeatureFlag: vi.fn(),
}));

vi.mock("~/utils/routerCompat", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("~/utils/routerCompat")>();
  return {
    ...original,
    useRouteLoaderData: vi.fn(),
    useOutletContext: () => {
      const originalValue = original.useOutletContext();
      return {
        ...(originalValue as Record<string, unknown>),
        featureFlags: {},
      };
    },
  };
});

const mockRoutes: (Route[] | Route)[] = [
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_beteiligungsformate,
  [
    {
      title: "Prinzip A",
      path: `${dokumentation.path}/prinzipA`,
      key: "prinzipA",
      parent: null,
      sitemap: false,
      isStagingOnly: false,
      navOrder: null,
      navLabel: null,
    },
  ],
];

/**
 * Routes that are relevant for forms interaction, excluding the notes page, and summary/send steps.
 */
const documentationFormRoutes = mockRoutes
  .flat()
  .filter((route) => route.path !== dokumentation_hinweise.path);

type ValidationScenario = {
  name: string;
  documentationData: DocumentationData<V1>;
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
          id: `${dokumentation.path}/prinzipA`,
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
          id: `${dokumentation.path}/prinzipA`,
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
      completedPrinciples: true,

      warningTitle: false,
      warningParticipation: false,
      warningPrinciples: false,
    },
  },
];

function renderPage({ path }: Route) {
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
      path: dokumentation.path,
      element: (
        <DocumentationDataProvider>
          <LayoutWithDocumentationNavigation />
        </DocumentationDataProvider>
      ),
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: path,
          element: <DummyElement />,
          HydrateFallback: () => <div></div>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [path],
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
    vi.mocked(useFeatureFlag).mockImplementation((_flagName) => false);
    vi.mocked(useRouteLoaderData).mockReturnValue({ routes: mockRoutes });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(mockRoutes.flat())(
    "$url has back and forth navigation to previous and next page",
    (route) => {
      renderPage(route);

      const index = mockRoutes
        .flat()
        .findIndex(({ path }) => path === route.path);
      const previous = mockRoutes.flat()[index - 1];
      const next = mockRoutes.flat()[index + 1];

      if (previous) {
        expect(screen.getByRole("link", { name: "Zurück" })).toHaveAttribute(
          "href",
          previous.path,
        );
      }
      if (next) {
        const linkNext = screen.getByRole("link", {
          name: "Weiter",
        });
        expect(linkNext).toHaveAttribute("href", next.path);
      }
    },
  );

  it("disables all routes and only shows top-level items on the notes page", () => {
    renderPage(dokumentation_hinweise);
    const navigation = screen.getByRole("navigation", {
      name: "Seitennavigation",
    });
    for (const title of [
      dokumentation_regelungsvorhabenTitel.title,
      dokumentation_beteiligungsformate.title,
      "Prinzipien",
    ]) {
      const item = within(navigation).getByText(title);
      expect(item).toHaveAttribute("aria-disabled");
      expect(item).not.toHaveAttribute("href");
    }
  });

  const currentRoute = dokumentation_regelungsvorhabenTitel;
  it("renders sidebar navigation with links to all pages (except current and notes)", () => {
    renderPage(currentRoute);

    const navigation = screen.getByRole("navigation", {
      name: "Seitennavigation",
    });
    for (const route of documentationFormRoutes) {
      if (route.path === currentRoute.path) continue;
      const navItem = within(navigation).getByRole("link", {
        name: route.title,
      });
      expect(navItem).toHaveAttribute("href", route.path);
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
    // HelpSidepanel is rendered when simplifiedPrincipleFlow is on
    // and uses browser APIs not available in jsdom
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
    });

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
              id: `${dokumentation.path}/prinzipA`,
              reasoning: "Some reasoning",
              aspects: ["aspect-1"],
            },
          ],
        } as DocumentationData<V2> as DocumentationData<V1>,
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
        } as DocumentationData<V2> as DocumentationData<V1>,
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
              id: `${dokumentation.path}/prinzipA`,
              reasoning: "Some reasoning",
              aspects: [], // empty aspects fails V2 validation
            },
          ],
        } as DocumentationData<V2> as DocumentationData<V1>,
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

    beforeEach(() => {
      vi.mocked(useFeatureFlag).mockImplementation((_flagName) => true);
    });

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
