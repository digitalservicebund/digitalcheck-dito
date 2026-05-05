// Import mocks first
import "./utils/mockLocalStorageVersioned";
import "./utils/mockRouter";
// End of mocks

import {
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  type Route,
} from "@/config/routes";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DocumentationNavigationContext } from "~/contexts/DocumentationNavigationContext";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type {
  DocumentationData,
  Participation,
  PolicyTitle,
  Principle,
  V1,
} from "~/routes/dokumentation/documentationDataSchema";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { MemoryRouter } from "~/utils/routerCompat";
import { type AbsatzWithParagraph } from "~/utils/strapiData.types.ts";
import DocumentationSummaryV1 from "../dokumentation/DocumentationSummaryV1";

const MOCK_ROUTE_PRINCIPLE: Route = {
  title: "Digitale Angebote",
  path: "/dokumentation/prinzip-digitale-angebote",
  key: "prinzipA",
  parent: null,
  sitemap: false,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
};
const routes: (Route[] | Route)[] = [
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_beteiligungsformate,
  [MOCK_ROUTE_PRINCIPLE],
];

/**
 * Routes that are relevant for forms interaction, excluding the notes page, and summary/send steps.
 */
const documentationFormRoutes = routes
  .flat()
  .filter((route) => route.path !== dokumentation_hinweise.path);

function createDocumentationDataMock({
  policyTitle,
  participation,
  principles,
}: {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  principles?: Principle<V1>[];
} = {}) {
  vi.mocked(readDataFromLocalStorage<DocumentationData<V1>>).mockReturnValue({
    version: "1",
    policyTitle: policyTitle,
    participation: participation,
    principles: principles,
  });
}

const mockNavigationContext: NavigationContext = {
  currentUrl: "/current-url",
  nextUrl: "/next-url",
  previousUrl: "/previous-url",
  routes: routes,
  prinzips: [
    {
      Name: "Digitale Angebote für alle nutzbar gestalten",
      Kurzbezeichnung: "Digitale Angebote",
      URLBezeichnung: "prinzip-digitale-angebote",
      documentId: "1",
      Nummer: 1,
      order: 1,
      Beschreibung: [],
      Aspekte: [],
      Beispiel: {} as AbsatzWithParagraph,
    },
  ],
};

describe("DocumentationSummary", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationDataProvider>
          <DocumentationNavigationContext.Provider value={mockNavigationContext}>
            <DocumentationSummaryV1 />
          </DocumentationNavigationContext.Provider>
        </DocumentationDataProvider>
      </MemoryRouter>,
    );
  };

  const mockDocumentationData: DocumentationData = {
    version: "1",
    policyTitle: { title: "Titel des Vorhabens" },
    participation: {
      formats: "Format 1",
      results: "Auswirkung auf die Regelung",
    },
  };

  beforeEach(() => {
    vi.mocked(readDataFromLocalStorage).mockReturnValue(mockDocumentationData);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows heading", () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", {
        name: "Prüfen Sie Ihre Angaben",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows the introductory text", () => {
    renderWithRouter();

    expect(
      screen.getByText(
        /Bevor Sie die Dokumentation abschließen und zum NKR senden/,
      ),
    ).toBeInTheDocument();
  });

  it("shows info boxes with correct headings for all form routes", () => {
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      expect(screen.getByTestId(route.path)).toBeInTheDocument();
    });
  });

  it("shows correct heading for each section", () => {
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.path);

      expect(
        within(stepContainer).getByRole("heading", {
          name: route.title,
          level: 2,
        }),
      ).toBeInTheDocument();
    });
  });

  it("shows principle badges only for principle steps with correct color", () => {
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.path);
      const isPrincipleRoute = route === MOCK_ROUTE_PRINCIPLE;

      if (isPrincipleRoute) {
        const badge = within(stepContainer).getByRole("mark");
        expect(badge.textContent).toContain("Prinzip");
        expect(badge.className).toContain("bg-principle-1");
      } else {
        const badge = within(stepContainer).queryByRole("mark");
        expect(badge).toBeNull();
      }
    });
  });

  it("displays policy title when available", () => {
    renderWithRouter();

    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Auswirkung auf die Regelung")).toBeInTheDocument();
  });

  it("displays participation data when available", () => {
    renderWithRouter();

    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Auswirkung auf die Regelung")).toBeInTheDocument();
  });

  it("displays principle with positive answer and multiple aspects", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Ja, gänzlich oder teilweise",
          reasoning: [
            {
              aspect: "aspect-1",
              checkbox: true,
              paragraphs: "§1, §2",
              reason: "Reason for aspect 1",
            },
            {
              aspect: "aspect-2",
              checkbox: true,
              paragraphs: "§3, §4",
              reason: "Reason for aspect 2",
            },
          ],
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );

    expect(
      within(principleContainer).getByText("Ja, gänzlich oder teilweise"),
    ).toBeInTheDocument();
    expect(within(principleContainer).getByText("§1, §2")).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Reason for aspect 1"),
    ).toBeInTheDocument();
    expect(within(principleContainer).getByText("§3, §4")).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Reason for aspect 2"),
    ).toBeInTheDocument();

    expect(
      within(principleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("displays incomplete principle data and show warning", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Ja, gänzlich oder teilweise",
          reasoning: [
            {
              aspect: "aspect-1",
              checkbox: true,
              paragraphs: "",
              reason: "Reason for aspect 1",
            },
          ],
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );

    expect(
      within(principleContainer).getByText("Ja, gänzlich oder teilweise"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Reason for aspect 1"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("displays principle with negative answer and string reasoning", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Nein",
          reasoning: "Reason why principle is not applicable",
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );

    expect(within(principleContainer).getByText("Nein")).toBeInTheDocument();
    expect(
      within(principleContainer).getByText(
        "Reason why principle is not applicable",
      ),
    ).toBeInTheDocument();

    expect(
      within(principleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("displays principle with irrelevant answer and string reasoning", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Nicht relevant",
          reasoning: "Reason why principle is not relevant",
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );

    expect(
      within(principleContainer).getByText("Nicht relevant"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).getByText(
        "Reason why principle is not relevant",
      ),
    ).toBeInTheDocument();

    expect(
      within(principleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("shows edit buttons for steps that have data", () => {
    renderWithRouter();

    const titleContainer = screen.getByTestId(
      dokumentation_regelungsvorhabenTitel.path,
    );
    const titleEditLink = within(titleContainer).getByRole("link", {
      name: `${dokumentation_regelungsvorhabenTitel.title} bearbeiten`,
    });
    expect(titleEditLink).toHaveAttribute(
      "href",
      dokumentation_regelungsvorhabenTitel.path,
    );
    expect(titleEditLink).toHaveTextContent("Bearbeiten");

    expect(
      within(titleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("shows warning for all steps when no documentation data is available at all", () => {
    createDocumentationDataMock();
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.path);

      expect(
        within(stepContainer).getByText(
          "Sie haben diesen Punkt noch nicht bearbeitet.",
        ),
      ).toBeInTheDocument();
    });
  });

  test.each([
    [dokumentation_regelungsvorhabenTitel.path, { policyTitle: undefined }],
    [dokumentation_regelungsvorhabenTitel.path, { policyTitle: { title: "" } }],
    [dokumentation_beteiligungsformate.path, { participation: undefined }],
    [
      dokumentation_beteiligungsformate.path,
      {
        participation: { formats: "", results: "" },
      },
    ],
    [MOCK_ROUTE_PRINCIPLE.path, { principles: undefined }],
    [MOCK_ROUTE_PRINCIPLE.path, { principles: [] }],
    [
      MOCK_ROUTE_PRINCIPLE.path,
      {
        principles: [
          {
            id: MOCK_ROUTE_PRINCIPLE.path,
            answer: "",
            reasoning: "",
          },
        ],
      },
    ],
  ])(
    "shows warning for step %s when data is undefined or empty",
    (stepId, mockData) => {
      createDocumentationDataMock(mockData);
      renderWithRouter();

      const stepContainer = screen.getByTestId(stepId);
      expect(
        within(stepContainer).getByText(
          "Sie haben diesen Punkt noch nicht bearbeitet.",
        ),
      ).toBeInTheDocument();
    },
  );

  test.each([
    [
      dokumentation_beteiligungsformate.path,
      {
        participation: { formats: "some formats", results: "" },
      },
    ],
    [
      dokumentation_beteiligungsformate.path,
      {
        participation: { formats: "", results: "some results" },
      },
    ],
    [
      MOCK_ROUTE_PRINCIPLE.path,
      {
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder teilweise",
            reasoning: [
              {
                aspect: "test-aspect",
                checkbox: true as const,
                paragraphs: "",
                reason: "Some reason",
              },
            ],
          },
        ],
      },
    ],
    [
      MOCK_ROUTE_PRINCIPLE.path,
      {
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder teilweise",
            reasoning: [
              {
                aspect: "test-aspect",
                checkbox: true as const,
                paragraphs: "Some paragraphs",
                reason: "",
              },
            ],
          },
        ],
      },
    ],
    [
      MOCK_ROUTE_PRINCIPLE.path,
      {
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder teilweise",
            reasoning: [
              {
                aspect: "test-aspect",
              },
              {
                aspect: "test-aspect-2",
              },
            ],
          },
        ],
      },
    ],
  ])(
    "shows incomplete warning for step %s when part of the data for a step is missing",
    (stepId, mockData) => {
      createDocumentationDataMock(mockData);
      renderWithRouter();

      const stepContainer = screen.getByTestId(stepId);
      expect(
        within(stepContainer).getByText(
          "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
        ),
      ).toBeInTheDocument();
    },
  );
});
