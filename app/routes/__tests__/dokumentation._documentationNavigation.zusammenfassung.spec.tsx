// Import mocks first
import "./utils/mockDocumentationDataService";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useOutletContext } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Route,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_PRE,
} from "~/resources/staticRoutes";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import DocumentationSummary from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import { useDocumentationData } from "~/routes/dokumentation/documentationDataHook";
import type {
  DocumentationData,
  Participation,
  PolicyTitle,
  Principle,
} from "~/routes/dokumentation/documentationDataSchema";

const MOCK_ROUTE_PRINCIPLE = {
  title: "Digitale Angebote",
  url: "/dokumentation/prinzip-digitale-angebote",
};
const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [MOCK_ROUTE_PRINCIPLE],
];

const mockedUseOutletContext = vi.mocked(useOutletContext);
const mockedUseDocumentationData = vi.mocked(useDocumentationData);

function createDocumentationDataMock({
  policyTitle,
  participation,
  principles,
}: {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  principles?: Principle[];
} = {}) {
  return {
    documentationData: {
      version: "1",
      policyTitle: policyTitle,
      participation: participation,
      principles: principles,
    },
    findDocumentationDataForUrl: vi.fn(),
  };
}

describe("DocumentationSummary", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationSummary />
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
    mockedUseDocumentationData.mockReturnValue({
      documentationData: mockDocumentationData,
      findDocumentationDataForUrl: vi.fn(),
    });

    const context: NavigationContext = {
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
        },
      ],
    };
    mockedUseOutletContext.mockReturnValue(context);
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

  it("shows info boxes with correct headings for all documentation routes except summary and send", () => {
    renderWithRouter();

    routes.flat().forEach((route) => {
      expect(screen.getByTestId(route.url)).toBeInTheDocument();
    });
  });

  it("shows correct heading for each section", () => {
    renderWithRouter();

    routes.flat().forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);

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

    routes.flat().forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);
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

  it("displays documentation data when available", () => {
    renderWithRouter();

    expect(screen.getByText("Titel des Vorhabens")).toBeInTheDocument();

    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Auswirkung auf die Regelung")).toBeInTheDocument();
  });

  it("shows edit buttons for steps that have data", () => {
    renderWithRouter();

    const titleContainer = screen.getByTestId(ROUTE_DOCUMENTATION_TITLE.url);
    const titleEditLink = within(titleContainer).getByRole("link", {
      name: `${ROUTE_DOCUMENTATION_TITLE.title} bearbeiten`,
    });
    expect(titleEditLink).toHaveAttribute(
      "href",
      ROUTE_DOCUMENTATION_TITLE.url,
    );
    expect(titleEditLink).toHaveTextContent("Bearbeiten");

    expect(
      within(titleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("shows warning for all steps when no documentation data is available at all", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: { version: "1" },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    routes.flat().forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);

      expect(
        within(stepContainer).getByText(
          "Sie haben diesen Punkt noch nicht bearbeitet.",
        ),
      ).toBeInTheDocument();

      const editNowLink = within(stepContainer).getByRole("link", {
        name: `${route.title} jetzt bearbeiten`,
      });
      expect(editNowLink).toHaveAttribute("href", route.url);
      expect(editNowLink).toHaveTextContent("Jetzt bearbeiten");
    });
  });

  test.each([
    [ROUTE_DOCUMENTATION_TITLE.url, { policyTitle: undefined }],
    [ROUTE_DOCUMENTATION_TITLE.url, { policyTitle: { title: "" } }],
    [ROUTE_DOCUMENTATION_PARTICIPATION.url, { participation: undefined }],
    [
      ROUTE_DOCUMENTATION_PARTICIPATION.url,
      {
        participation: { formats: "", results: "" },
      },
    ],
    [MOCK_ROUTE_PRINCIPLE.url, { principles: undefined }],
    [MOCK_ROUTE_PRINCIPLE.url, { principles: [] }],
    [
      MOCK_ROUTE_PRINCIPLE.url,
      {
        principles: [
          {
            id: MOCK_ROUTE_PRINCIPLE.url,
            answer: "",
            reasoning: "",
          },
        ],
      },
    ],
  ])(
    "shows warning for step %s when data is undefined or empty",
    (stepId, mockData) => {
      mockedUseDocumentationData.mockReturnValue(
        createDocumentationDataMock(mockData),
      );
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
      ROUTE_DOCUMENTATION_PARTICIPATION.url,
      {
        participation: { formats: "some formats", results: "" },
      },
    ],
    [
      ROUTE_DOCUMENTATION_PARTICIPATION.url,
      {
        participation: { formats: "", results: "some results" },
      },
    ],
    [
      MOCK_ROUTE_PRINCIPLE.url,
      {
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder Teilweise",
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
      MOCK_ROUTE_PRINCIPLE.url,
      {
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder Teilweise",
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
  ])(
    "shows incomplete warning for step %s when part of the data for a step is missing",
    (stepId, mockData) => {
      mockedUseDocumentationData.mockReturnValue(
        createDocumentationDataMock(mockData),
      );
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
