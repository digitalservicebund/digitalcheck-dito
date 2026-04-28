// Import mocks first
import "./utils/mockLocalStorageVersioned";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useOutletContext } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Route,
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type {
  DocumentationData,
  Participation,
  PolicyTitle,
  Principle,
  V2,
} from "~/routes/dokumentation/documentationDataSchema";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { AbsatzWithParagraph } from "~/utils/strapiData.server.ts";
import DocumentationSummaryV2 from "../dokumentation/DocumentationSummaryV2";

const MOCK_ROUTE_PRINCIPLE = {
  title: "Digitale Angebote",
  url: "/dokumentation/prinzip-digitale-angebote",
};
const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_INTRO,
  [MOCK_ROUTE_PRINCIPLE],
];

const documentationFormRoutes = routes
  .flat()
  .filter((route) => route.url !== ROUTE_DOCUMENTATION_NOTES.url);

const mockedUseOutletContext = vi.mocked(useOutletContext);

function createDocumentationDataMock({
  policyTitle,
  participation,
  principles,
}: {
  policyTitle?: PolicyTitle;
  participation?: Participation;
  principles?: Principle<V2>[];
} = {}) {
  vi.mocked(readDataFromLocalStorage<DocumentationData<V2>>).mockReturnValue({
    version: "2",
    policyTitle: policyTitle,
    participation: participation,
    principles: principles,
  });
}

describe("DocumentationSummaryV2", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationDataProvider>
          <DocumentationSummaryV2 />
        </DocumentationDataProvider>
      </MemoryRouter>,
    );
  };

  const mockDocumentationData: DocumentationData<V2> = {
    version: "2",
    policyTitle: { title: "Titel des Vorhabens" },
    participation: {
      formats: "Format 1",
      results: "Auswirkung auf die Regelung",
    },
  };

  beforeEach(() => {
    vi.mocked(readDataFromLocalStorage).mockReturnValue(mockDocumentationData);

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
          Aspekte: [
            {
              Titel: "Aspekt 1",
              Kurzbezeichnung: "A1",
              Beschreibung: "",
              Text: [],
              Nummer: "",
              Anwendung: [],
            },
            {
              Titel: "Aspekt 2",
              Kurzbezeichnung: "A2",
              Beschreibung: "",
              Text: [],
              Nummer: "",
              Anwendung: [],
            },
          ],
          Beispiel: {} as AbsatzWithParagraph,
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

  it("shows info boxes with correct headings for all form routes", () => {
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      expect(screen.getByTestId(route.url)).toBeInTheDocument();
    });
  });

  it("shows correct heading for each section", () => {
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);

      expect(
        within(stepContainer).getByRole("heading", {
          level: 2,
        }),
      ).toBeInTheDocument();
    });
  });

  it("shows principle badges only for principle steps with correct color", () => {
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
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

  it("displays policy title when available", () => {
    renderWithRouter();

    expect(screen.getByText("Titel des Vorhabens")).toBeInTheDocument();
  });

  it("displays participation data when available", () => {
    renderWithRouter();

    expect(screen.getByText("Format 1")).toBeInTheDocument();
    expect(screen.getByText("Auswirkung auf die Regelung")).toBeInTheDocument();
  });

  it("displays principle with positive answer and aspects as pills", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Ja, gänzlich oder teilweise",
          reasoning: "Explanation text",
          aspects: ["a1", "a2"],
        },
      ],
    });
    renderWithRouter();

    // When answer exists, testId includes /erlaeuterung
    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    expect(
      within(principleContainer).getByText("Ja, gänzlich oder teilweise"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Schwerpunkte"),
    ).toBeInTheDocument();
    expect(within(principleContainer).getByText("A1")).toBeInTheDocument();
    expect(within(principleContainer).getByText("A2")).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Explanation text"),
    ).toBeInTheDocument();
  });

  it("displays principle with negative answer", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Nein",
          reasoning: "Reason why not applicable",
          aspects: undefined,
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    expect(within(principleContainer).getByText("Nein")).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Reason why not applicable"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).queryByText("Schwerpunkte"),
    ).not.toBeInTheDocument();
    expect(
      within(principleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("displays principle with irrelevant answer", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Nicht relevant",
          reasoning: "Reason why not relevant",
          aspects: undefined,
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    expect(
      within(principleContainer).getByText("Nicht relevant"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).getByText("Reason why not relevant"),
    ).toBeInTheDocument();
    expect(
      within(principleContainer).queryByText("Schwerpunkte"),
    ).not.toBeInTheDocument();
    expect(
      within(principleContainer).queryByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).not.toBeInTheDocument();
  });

  it("shows incomplete warning for negative answer with missing reasoning", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Nein",
          reasoning: "",
          aspects: undefined,
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    expect(
      within(principleContainer).getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("shows incomplete warning for positive answer with aspects but missing reasoning", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Ja, gänzlich oder teilweise",
          reasoning: "",
          aspects: ["a1"],
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    expect(
      within(principleContainer).getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
  });

  it("links to erlaeuterung page when principle has an answer", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Ja, gänzlich oder teilweise",
          reasoning: "text",
          aspects: ["a1"],
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    const editLink = within(principleContainer).getByRole("link", {
      name: /bearbeiten/i,
    });
    expect(editLink).toHaveAttribute(
      "href",
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );
  });

  it("links to base principle page when principle has no answer", () => {
    createDocumentationDataMock({
      principles: [],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote",
    );

    const editLink = within(principleContainer).getByRole("link", {
      name: /bearbeiten/i,
    });
    expect(editLink).toHaveAttribute(
      "href",
      "/dokumentation/prinzip-digitale-angebote",
    );
  });

  it("shows edit buttons for steps that have data", () => {
    renderWithRouter();

    const titleContainer = screen.getByTestId(ROUTE_DOCUMENTATION_TITLE.url);
    const titleEditLink = within(titleContainer).getByRole("link", {
      name: /bearbeiten/i,
    });
    expect(titleEditLink).toHaveAttribute(
      "href",
      ROUTE_DOCUMENTATION_TITLE.url,
    );
    expect(titleEditLink).toHaveTextContent("Bearbeiten");
  });

  it("shows warning for all steps when no documentation data is available", () => {
    createDocumentationDataMock();
    renderWithRouter();

    documentationFormRoutes.forEach((route) => {
      const stepContainer = screen.getByTestId(route.url);

      expect(
        within(stepContainer).getByText(
          "Sie haben diesen Punkt noch nicht bearbeitet.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("shows incomplete warning for positive answer with empty aspects", () => {
    createDocumentationDataMock({
      principles: [
        {
          id: "1",
          answer: "Ja, gänzlich oder teilweise",
          reasoning: "text",
          aspects: [],
        },
      ],
    });
    renderWithRouter();

    const principleContainer = screen.getByTestId(
      "/dokumentation/prinzip-digitale-angebote/erlaeuterung",
    );

    expect(
      within(principleContainer).getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeInTheDocument();
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
    [MOCK_ROUTE_PRINCIPLE.url, { principles: [] as Principle<V2>[] }],
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
  ])(
    "shows incomplete warning for step %s when part of the data is missing",
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
