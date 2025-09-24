import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTES_DOCUMENTATION_ORDERED,
} from "~/resources/staticRoutes";
import DocumentationSummary from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import type { DocumentationData } from "~/routes/dokumentation/documentationDataService";
import { getDocumentationData } from "~/routes/dokumentation/documentationDataService";

vi.mock("~/routes/dokumentation/documentationDataService", () => ({
  getDocumentationData: vi.fn(),
}));

const mockGetDocumentationData = vi.mocked(getDocumentationData);

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
    steps: [
      {
        id: "/dokumentation/informationen-zum-regelungsvorhaben",
        items: [
          { key: "Titel des Regelungsvorhabens", value: "Test Regelung" },
          { key: "Beschreibung", value: "Eine Testbeschreibung" },
        ],
      },
      {
        id: "/dokumentation/beteiligungsformate",
        items: [
          { key: "Format 1", value: "Online-Konsultation" },
          { key: "Format 2", value: "Workshop" },
        ],
      },
      {
        id: "/dokumentation/prinzip-digitale-angebote",
        items: [{ key: "Digitale Lösung", value: "Online-Portal" }],
      },
    ],
  };

  beforeEach(() => {
    mockGetDocumentationData.mockReturnValue(mockDocumentationData);
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

  it("shows info boxes for all documentation routes except summary and send", () => {
    renderWithRouter();

    const expectedRoutes = ROUTES_DOCUMENTATION_ORDERED.filter(
      (route) =>
        route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
        route.url !== ROUTE_DOCUMENTATION_SEND.url,
    );

    expectedRoutes.forEach((route) => {
      expect(
        screen.getByRole("heading", {
          name: route.title,
          level: 3,
        }),
      ).toBeInTheDocument();
    });
  });

  it("displays documentation data when available", () => {
    renderWithRouter();

    expect(
      screen.getByText("Titel des Regelungsvorhabens"),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Regelung")).toBeInTheDocument();
    expect(screen.getByText("Beschreibung")).toBeInTheDocument();
    expect(screen.getByText("Eine Testbeschreibung")).toBeInTheDocument();

    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Online-Konsultation")).toBeInTheDocument();
    expect(screen.getByText("Format 2")).toBeInTheDocument();
    expect(screen.getByText("Workshop")).toBeInTheDocument();

    expect(screen.getByText("Digitale Lösung")).toBeInTheDocument();
    expect(screen.getByText("Online-Portal")).toBeInTheDocument();
  });

  it("renders edit links for each documentation section", () => {
    renderWithRouter();

    const expectedRoutes = ROUTES_DOCUMENTATION_ORDERED.filter(
      (route) =>
        route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
        route.url !== ROUTE_DOCUMENTATION_SEND.url,
    );

    expectedRoutes.forEach((route) => {
      const editLink = screen.getByRole("link", {
        name: `Änderungen vornehmen an ${route.title}`,
      });
      expect(editLink).toHaveAttribute("href", route.url);
      expect(editLink).toHaveTextContent("Änderungen vornehmen");
    });
  });

  it("handles case when no documentation data is available", () => {
    mockGetDocumentationData.mockReturnValue(null);
    renderWithRouter();

    // Should still render the page structure
    expect(
      screen.getByRole("heading", {
        name: "Prüfen Sie Ihre Angaben",
        level: 1,
      }),
    ).toBeInTheDocument();

    // Should still render all section headings
    const expectedRoutes = ROUTES_DOCUMENTATION_ORDERED.filter(
      (route) =>
        route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
        route.url !== ROUTE_DOCUMENTATION_SEND.url,
    );

    expectedRoutes.forEach((route) => {
      expect(
        screen.getByRole("heading", {
          name: route.title,
          level: 3,
        }),
      ).toBeInTheDocument();
    });

    // Should not render any documentation data
    expect(screen.queryByText("Test Regelung")).not.toBeInTheDocument();
    expect(screen.queryByText("Online-Konsultation")).not.toBeInTheDocument();
  });

  it("handles case when documentation step is not found in data", () => {
    const partialData: DocumentationData = {
      version: "1",
      steps: [
        {
          id: "/dokumentation/informationen-zum-regelungsvorhaben",
          items: [{ key: "Titel", value: "Test" }],
        },
        // Missing other steps
      ],
    };

    mockGetDocumentationData.mockReturnValue(partialData);
    renderWithRouter();

    // Should render data for available step
    expect(screen.getByText("Titel")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();

    // Should still render headings for missing steps but without data
    expect(
      screen.getByRole("heading", {
        name: "Beteiligungsformate",
        level: 3,
      }),
    ).toBeInTheDocument();

    // Should not render data for missing steps
    expect(screen.queryByText("Online-Konsultation")).not.toBeInTheDocument();
  });

  it("renders empty documentation step without crashing", () => {
    const dataWithEmptyStep: DocumentationData = {
      version: "1",
      steps: [
        {
          id: "/dokumentation/informationen-zum-regelungsvorhaben",
          items: [], // Empty items array
        },
      ],
    };

    mockGetDocumentationData.mockReturnValue(dataWithEmptyStep);
    renderWithRouter();

    // Should still render the section heading
    expect(
      screen.getByRole("heading", {
        name: "Informationen zum Regelungsvorhaben",
        level: 3,
      }),
    ).toBeInTheDocument();

    // Should render the edit link
    expect(
      screen.getByRole("link", {
        name: "Änderungen vornehmen an Informationen zum Regelungsvorhaben",
      }),
    ).toBeInTheDocument();
  });

  it("calls getDocumentationData on component mount", () => {
    renderWithRouter();

    expect(mockGetDocumentationData).toHaveBeenCalledTimes(1);
  });
});
