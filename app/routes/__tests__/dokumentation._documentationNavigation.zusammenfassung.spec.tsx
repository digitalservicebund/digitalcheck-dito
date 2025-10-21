import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
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

const { mockUseOutletContext } = vi.hoisted(() => ({
  mockUseOutletContext: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useOutletContext: mockUseOutletContext,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

vi.mock(
  "~/routes/dokumentation/documentationDataHook",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("~/routes/dokumentation/documentationDataHook")
      >();
    return {
      ...actual,
      useDocumentationData: vi.fn(() => ({
        getDocumentationData: null,
        findDocumentationDataForUrl: vi.fn(),
      })),
    };
  },
);

const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [
    {
      title: "Prinzip: Digitale Angebote",
      url: "/dokumentation/prinzip-digitale-angebote",
    },
  ],
];

const mockUseDocumentationData = vi.mocked(useDocumentationData);

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
      results: "Online-Konsultation",
    },
  };

  beforeEach(() => {
    mockUseDocumentationData.mockReturnValue({
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
    mockUseOutletContext.mockReturnValue(context);
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
          level: 3,
        }),
      ).toBeInTheDocument();
    });
  });

  it("displays documentation data when available", () => {
    renderWithRouter();

    expect(screen.getByText("Titel des Vorhabens")).toBeInTheDocument();

    // Check data for beteiligungsformate
    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Online-Konsultation")).toBeInTheDocument();
  });

  it("shows principle badges only for principle steps", () => {
    renderWithRouter();

    routes.flat().forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);
      const isPrincipleRoute = route.url.includes("prinzip");

      if (isPrincipleRoute) {
        // Principle step should have "Prinzip" in heading
        const heading = within(stepContainer).getByRole("heading", {
          level: 3,
        });
        expect(heading.textContent).toContain("Prinzip");
      } else {
        // Non-principle step should not have "Prinzip" in heading
        const heading = within(stepContainer).getByRole("heading", {
          level: 3,
        });
        expect(heading.textContent).not.toContain("Prinzip");
      }
    });
  });

  it("shows correct content and buttons for steps with data", () => {
    renderWithRouter();

    // Check routes that have data
    const routesWithData = routes.flat().filter((route) => {
      if (route.url === ROUTE_DOCUMENTATION_TITLE.url) {
        return mockDocumentationData.policyTitle !== undefined;
      }
      if (route.url === ROUTE_DOCUMENTATION_PARTICIPATION.url) {
        return mockDocumentationData.participation !== undefined;
      }
      // Check if principle exists (principle id is the last part of the route URL)
      const principleId = route.url.split("/").pop();
      return mockDocumentationData.principles?.some(
        (p) => p.id === principleId,
      );
    });

    routesWithData.forEach((route) => {
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

    const stepsWithoutData = routes.flat().filter((route) => {
      if (route.url === ROUTE_DOCUMENTATION_TITLE.url) {
        return mockDocumentationData.policyTitle === undefined;
      }
      if (route.url === ROUTE_DOCUMENTATION_PARTICIPATION.url) {
        return mockDocumentationData.participation === undefined;
      }
      // Check if principle does not exist (principle id is the last part of the route URL)
      const principleId = route.url.split("/").pop();
      return !mockDocumentationData.principles?.some(
        (p) => p.id === principleId,
      );
    });

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
    mockUseDocumentationData.mockReturnValue({
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
    });
  });
});
