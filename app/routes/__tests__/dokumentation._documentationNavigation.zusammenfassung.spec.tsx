import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { principles } from "~/resources/content/shared/prinzipien";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_ORDERED,
  ROUTES_DOCUMENTATION_PRINCIPLES,
} from "~/resources/staticRoutes";
import DocumentationSummary from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import type { DocumentationData } from "~/routes/dokumentation/documentationDataService";
import { getDocumentationData } from "~/routes/dokumentation/documentationDataService";

vi.mock("~/routes/dokumentation/documentationDataService", () => ({
  getDocumentationData: vi.fn(),
}));

const mockGetDocumentationData = vi.mocked(getDocumentationData);

const allRoutes = ROUTES_DOCUMENTATION_ORDERED.filter(
  (route) =>
    route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
    route.url !== ROUTE_DOCUMENTATION_SEND.url,
);

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
        id: ROUTE_DOCUMENTATION_TITLE.url,
        items: [{ key: "Titel", value: "Titel des Vorhabens" }],
      },
      {
        id: ROUTE_DOCUMENTATION_PARTICIPATION.url,
        items: [
          { key: "Format 1", value: "Online-Konsultation" },
          { key: "Format 2", value: "Workshop" },
        ],
      },
      {
        id: ROUTES_DOCUMENTATION_PRINCIPLES[0].url,
        items: [
          { key: "Prinzip A", value: "Erklärung A" },
          { key: "Prinzip B", value: "Erklärung B" },
        ],
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

  it("shows info boxes with correct headings for all documentation routes except summary and send", () => {
    renderWithRouter();

    allRoutes.forEach((route) => {
      expect(screen.getByTestId(route.url)).toBeInTheDocument();
    });
  });

  it("shows correct heading for each section", () => {
    renderWithRouter();

    allRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);

      // For principle routes, check for principle headlines instead of route titles
      const principle = principles.find((p) => route.url.endsWith(p.id));
      const expectedHeading = principle ? principle.headline : route.title;

      expect(
        within(stepContainer).getByRole("heading", {
          name: expectedHeading,
          level: 3,
        }),
      ).toBeInTheDocument();
    });
  });

  it("displays documentation data when available", () => {
    renderWithRouter();

    expect(screen.getByText("Titel")).toBeInTheDocument();
    expect(screen.getByText("Titel des Vorhabens")).toBeInTheDocument();

    // Check data for beteiligungsformate
    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Online-Konsultation")).toBeInTheDocument();
    expect(screen.getByText("Format 2")).toBeInTheDocument();
    expect(screen.getByText("Workshop")).toBeInTheDocument();

    // Check data for prinzip-digitale-angebote
    expect(screen.getByText("Prinzip A")).toBeInTheDocument();
    expect(screen.getByText("Erklärung A")).toBeInTheDocument();
    expect(screen.getByText("Prinzip B")).toBeInTheDocument();
    expect(screen.getByText("Erklärung B")).toBeInTheDocument();
  });

  it("shows principle badges only for principle steps", () => {
    renderWithRouter();

    allRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);
      const principle = principles.find((p) => route.url.endsWith(p.id));

      if (principle) {
        // Principle step should have badge
        const badge = within(stepContainer).getByText("Prinzip");
        expect(badge).toBeInTheDocument();
      } else {
        // Non-principle step should not have badge
        expect(
          within(stepContainer).queryByText("Prinzip"),
        ).not.toBeInTheDocument();
      }
    });
  });

  it("shows correct content and buttons for steps with data", () => {
    renderWithRouter();

    const stepsWithData = mockDocumentationData.steps;

    stepsWithData.forEach((step) => {
      const route = ROUTES_DOCUMENTATION_ORDERED.find((r) => r.url === step.id);
      if (!route) throw Error(`Cannot find route ${step.id}.`);

      const stepContainer = screen.getByTestId(route.url);

      const editLink = within(stepContainer).getByRole("link", {
        name: `${route.title} bearbeiten`,
      });
      expect(editLink).toHaveAttribute("href", route.url);
      expect(editLink).toHaveTextContent("Bearbeiten");

      expect(
        within(stepContainer).queryByText(
          "Sie haben diesen Punkt noch nicht bearbeitet.",
        ),
      ).not.toBeInTheDocument();
    });
  });

  it("shows InlineNotice for steps without data", () => {
    renderWithRouter();

    const stepsWithoutData = allRoutes.filter(
      (route) =>
        !mockDocumentationData.steps.some((step) => step.id === route.url),
    );

    stepsWithoutData.forEach((route) => {
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

      expect(
        within(stepContainer).queryByText("Bearbeiten"),
      ).not.toBeInTheDocument();
    });
  });

  it("shows InlineNotice for all steps when no documentation data is available", () => {
    mockGetDocumentationData.mockReturnValue(null);
    renderWithRouter();

    allRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);

      expect(
        within(stepContainer).getByText(
          "Sie haben diesen Punkt noch nicht bearbeitet.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("calls getDocumentationData on component mount", () => {
    renderWithRouter();

    expect(mockGetDocumentationData).toHaveBeenCalledTimes(1);
  });
});
