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
import type { DocumentationData } from "~/routes/dokumentation/documentationDataSchema";

const MOCK_ROUTE_PRINCIPLE = {
  title: "Prinzip: Digitale Angebote",
  url: "/dokumentation/prinzip-digitale-angebote",
};
const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [MOCK_ROUTE_PRINCIPLE],
];

const mockedUseOutletContext = vi.mocked(useOutletContext);
const mockedUseDocumentationData = vi.mocked(useDocumentationData);

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

  it("shows warning for step when data is undefined", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: {
        version: "1",
        policyTitle: undefined,
        participation: { formats: "Test", results: "Test" },
      },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    const titleContainer = screen.getByTestId(ROUTE_DOCUMENTATION_TITLE.url);
    expect(
      within(titleContainer).getByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("shows warning for principle when not in principles array", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: {
        version: "1",
        policyTitle: { title: "Test" },
        principles: [], // not included
      },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );
    expect(
      within(principleContainer).getByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("shows warning for step when all fields are empty strings", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: {
        version: "1",
        policyTitle: { title: "" },
        participation: { formats: "", results: "" },
      },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    const titleContainer = screen.getByTestId(ROUTE_DOCUMENTATION_TITLE.url);
    expect(
      within(titleContainer).getByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).toBeInTheDocument();

    const participationContainer = screen.getByTestId(
      ROUTE_DOCUMENTATION_PARTICIPATION.url,
    );
    expect(
      within(participationContainer).getByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("shows incomplete warning when part of the data for a step is missing", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: {
        version: "1",
        policyTitle: { title: "Test Title" },
        participation: {
          formats: "",
          results: "Some results",
        },
      },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    const participationContainer = screen.getByTestId(
      ROUTE_DOCUMENTATION_PARTICIPATION.url,
    );
    expect(
      within(participationContainer).getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("shows incomplete warning when principle positive answer has reasoning with missing paragraphs", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: {
        version: "1",
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder Teilweise",
            reasoning: [
              {
                aspect: "test-aspect",
                checkbox: true,
                paragraphs: "",
                reason: "Some reason",
              },
            ],
          },
        ],
      },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );
    expect(
      within(principleContainer).getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("shows incomplete warning when principle positive answer has reasoning with missing reason", () => {
    mockedUseDocumentationData.mockReturnValue({
      documentationData: {
        version: "1",
        principles: [
          {
            id: "1",
            answer: "Ja, gänzlich oder Teilweise",
            reasoning: [
              {
                aspect: "test-aspect",
                checkbox: true,
                paragraphs: "Some paragraphs",
                reason: "",
              },
            ],
          },
        ],
      },
      findDocumentationDataForUrl: vi.fn(),
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );
    expect(
      within(principleContainer).getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
  });
});
