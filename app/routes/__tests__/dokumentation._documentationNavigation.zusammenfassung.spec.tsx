import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { principles } from "~/resources/content/shared/prinzipien";
import {
  Route,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_PRE,
} from "~/resources/staticRoutes";
import { mockRouter } from "~/routes/__tests__/utils/mockRouter";
import DocumentationSummary from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import type { DocumentationData } from "~/routes/dokumentation/documentationDataService";
import { getDocumentationStep } from "~/routes/dokumentation/documentationDataService";

vi.mock(
  "~/routes/dokumentation/documentationDataService",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("~/routes/dokumentation/documentationDataService")
      >();
    return {
      ...actual,
      getDocumentationStep: vi.fn(),
    };
  },
);

const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [
    {
      title: "Prinzip A",
      url: "/prinzipA",
    },
  ],
];

const { mockNavigationContext } = mockRouter(routes);

const mockGetDocumentationStep = vi.mocked(getDocumentationStep);

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
        items: { Titel: "Titel des Vorhabens" },
      },
      {
        id: ROUTE_DOCUMENTATION_PARTICIPATION.url,
        items: {
          formats: "Format 1",
          outcomes: "Online-Konsultation",
        },
      },
      {
        id: "/prinzipA",
        items: {
          prinzipId: "/prinzipA",
          answer: "Ja, gänzlich oder Teilweise",
          reasoning: [
            {
              checkbox: "true",
              paragraphs: "Paragraf 1",
              reason: "Begründung 1",
            },
            {
              checkbox: "true",
              paragraphs: "Paragraf 2",
              reason: "Begründung 2",
            },
          ],
        },
      },
    ],
  };

  beforeEach(() => {
    mockGetDocumentationStep.mockImplementation(
      (stepId: string) =>
        mockDocumentationData.steps.find(({ id }) => id === stepId) ?? null,
    );
    mockNavigationContext();
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

    // Check data for prinzip-digitale-angebote
    expect(screen.getByText("Prinzip A")).toBeInTheDocument();
    expect(screen.getByText("Ja, gänzlich oder Teilweise")).toBeInTheDocument();
    expect(screen.getByText("Paragraf 1")).toBeInTheDocument();
    expect(screen.getByText("Begründung 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraf 2")).toBeInTheDocument();
    expect(screen.getByText("Begründung 2")).toBeInTheDocument();
  });

  it("shows principle badges only for principle steps", () => {
    renderWithRouter();

    routes.flat().forEach((route) => {
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
      const route = routes.flat().find((r) => r.url === step.id);
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

    const stepsWithoutData = routes
      .flat()
      .filter(
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
    mockGetDocumentationStep.mockReturnValue(null);
    renderWithRouter();

    routes.flat().forEach((route) => {
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

    expect(mockGetDocumentationStep).toHaveBeenCalledTimes(3);
  });
});
