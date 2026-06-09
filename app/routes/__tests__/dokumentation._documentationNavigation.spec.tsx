// Import mocks first
import "./utils/mockLocalStorageVersioned";
// End of mocks
import {
  dokumentation,
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
} from "@/config/routes";
import "@testing-library/jest-dom";
import { act, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { stubResizingFunctionality } from "~/routes/__tests__/utils/stubResizingFunctionality.ts";
import { LayoutWithDocumentationNavigation } from "~/routes/dokumentation._documentationNavigation";
import {
  type Route,
  type RouteGroup,
  useDocumentationNavigation,
} from "~/routes/dokumentation/DocumentationNavigationContext";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import type {
  DocumentationData,
  V1,
  V2,
} from "../dokumentation/documentationDataSchema";
import {
  DATA_SCHEMA_VERSION_V1,
  DATA_SCHEMA_VERSION_V2,
} from "../dokumentation/documentationDataSchema";

const mockRoutes: (RouteGroup | Route)[] = [
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_beteiligungsformate,
  {
    title: "Prinzipien",
    routes: [
      {
        title: "Prinzip A",
        path: `${dokumentation.path}/prinzipA`,
      },
    ],
  },
  {
    title: "EU-Interoperabilität",
    routes: [
      {
        title: "Interoperabilität A",
        path: `${dokumentation.path}/interoperabilitaet`,
      },
    ],
  },
];

/**
 * Routes that are relevant for forms interaction, excluding the notes page, and summary/send steps.
 */
const flattenedMockRoutes = mockRoutes.flatMap((route) =>
  "routes" in route ? route.routes : route,
);

const documentationFormRoutes = flattenedMockRoutes.filter(
  (route) => route.path !== dokumentation_hinweise.path,
);

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
        publicationStatus: "published",
        organization: "",
        publicationDate: "",
        publicationLink: "",
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
        publicationStatus: "planned",
        organization: "",
        publicationDate: "",
        publicationLink: "",
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
      completedPrinciples: false,

      warningTitle: false,
      warningParticipation: false,
      warningPrinciples: true,
    },
  },
];

function renderPage({ path }: Route) {
  function DummyElement() {
    const { nextUrl, previousUrl } = useDocumentationNavigation();
    return (
      <>
        <h1>Foobar</h1>
        <a href={previousUrl}>Zurück</a>
        <a href={nextUrl}>Weiter</a>
      </>
    );
  }

  render(
    <MemoryRouter initialEntries={[path]}>
      <DocumentationDataProvider>
        <LayoutWithDocumentationNavigation
          routes={mockRoutes}
          prinzips={[]}
          currentUrl={path}
        >
          <DummyElement />
        </LayoutWithDocumentationNavigation>
      </DocumentationDataProvider>
    </MemoryRouter>,
  );
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
    stubResizingFunctionality();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(flattenedMockRoutes)(
    "$path has back and forth navigation to previous and next page",
    (route) => {
      renderPage(route);

      const index = flattenedMockRoutes.findIndex(
        ({ path }) => path === route.path,
      );
      const previous = flattenedMockRoutes[index - 1];
      const next = flattenedMockRoutes[index + 1];

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
      "EU-Interoperabilität",
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
    const validationScenariosV2: ValidationScenario[] = [
      {
        name: "all valid completed (V2)",
        documentationData: {
          version: DATA_SCHEMA_VERSION_V2,
          policyTitle: {
            title: "Valid Title",
            organization: "",
            publicationStatus: "",
            publicationDate: "",
            publicationLink: "",
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
            publicationStatus: "published",
            organization: "",
            publicationDate: "",
            publicationLink: "",
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
