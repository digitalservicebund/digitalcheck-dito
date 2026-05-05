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
import { act, render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DocumentationNavigationContext } from "~/contexts/DocumentationNavigationContext";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import {
  createMemoryRouter,
  RouterProvider,
  useParams,
} from "~/utils/routerCompat";
import {
  type PrinzipAspekt,
  type PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.types";
import { type NavigationContext } from "../dokumentation._documentationNavigation";
import DocumentationPrinciple from "../dokumentation._documentationNavigation.$principleId";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import {
  DATA_SCHEMA_VERSION_V2,
  type DocumentationData,
  type V2,
} from "../dokumentation/documentationDataSchema";

vi.mock("~/contexts/FeatureFlagContext", () => ({
  useFeatureFlag: vi.fn().mockReturnValue(true),
}));

const routes: (Route[] | Route)[] = [
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_beteiligungsformate,
  [
    {
      title: "Prinzip: Digitale Angebote",
      path: "/dokumentation/prinzip-1-digitale-angebote",
      key: "prinzipA",
      parent: null,
      sitemap: false,
      isStagingOnly: false,
      navOrder: null,
      navLabel: null,
    },
  ],
];

const aspekte: PrinzipAspekt[] = [
  {
    Titel: "Aspekt 1",
    Beschreibung: "Aspekt 1 Beschreibung",
    Kurzbezeichnung: "A1",
    Text: [],
    Nummer: "",
    Anwendung: [],
  },
];

const prinzips: PrinzipWithAspekteAndExample[] = [
  {
    Name: "Prinzip 1: Digitale Angebote",
    Kurzbezeichnung: "Prinzip 1",
    URLBezeichnung: "prinzip-1-digitale-angebote",
    documentId: "1",
    Nummer: 1,
    order: 1,
    Beschreibung: [],
    Aspekte: aspekte,
    Beispiel: {
      documentId: "abc-2",
      Nummer: 2,
      Text: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Dies ist der Text des Beispiel-Absatzes.",
            },
          ],
        },
      ],
      PrinzipErfuellungen: [],
      Paragraph: {
        Nummer: 42,
        Gesetz: "TestG",
        Titel: "Titel des Test-Paragraphen",
        Beispielvorhaben: {
          URLBezeichnung: "test-regelung",
          Titel: "Titel des Test-Regelungsvorhabens",
        },
      },
    },
  },
];

const context: NavigationContext = {
  currentUrl: "/current-url",
  nextUrl: "/next-url",
  previousUrl: "/previous-url",
  routes: routes,
  prinzips,
};

const mockedUseParams = vi.mocked(useParams);

const renderWithRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/dokumentation/prinzip-1-digitale-angebote",
        element: (
          <HelpPanelProvider>
            <DocumentationDataProvider>
              <DocumentationNavigationContext.Provider value={context}>
                <DocumentationPrinciple />
              </DocumentationNavigationContext.Provider>
            </DocumentationDataProvider>
          </HelpPanelProvider>
        ),
      },
    ],
    { initialEntries: ["/dokumentation/prinzip-1-digitale-angebote"] },
  );

  return render(<RouterProvider router={router} />);
};

describe("DocumentationPrincipleV2", () => {
  beforeEach(() => {
    mockedUseParams.mockReturnValue({
      principleId: "prinzip-1-digitale-angebote",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the expected heading", () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", {
        name: /Prinzip 1: Digitale Angebote/,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows the question heading", () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Schafft das Regelungsvorhaben/,
      }),
    ).toBeInTheDocument();
  });

  it("shows the correct answer options", () => {
    renderWithRouter();

    ["Ja, gänzlich oder teilweise", "Nein", "Nicht relevant"].forEach(
      (labelText) => {
        const input = screen.getByLabelText(labelText);
        expect(input).toBeInTheDocument();
        expect(input.tagName).toBe("INPUT");
      },
    );
  });

  it("shows submit button", () => {
    renderWithRouter();

    const submitButton = screen.getByRole("button", {
      name: "Weiter",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("shows back button", () => {
    renderWithRouter();

    const backButton = screen.getByRole("link", { name: "Zurück" });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/previous-url");
  });

  describe("V2 simplicity - no aspects or reasoning on this page", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
      renderWithRouter();
    });

    it("does not show aspect checkboxes after selecting positive answer", async () => {
      await user.click(screen.getByLabelText("Ja, gänzlich oder teilweise"));

      expect(screen.queryByLabelText("A1")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Eigene Erklärung hinzufügen"),
      ).not.toBeInTheDocument();
    });

    it("does not show reasoning textarea after selecting negative answer", async () => {
      await user.click(screen.getByLabelText("Nein"));

      expect(screen.queryByLabelText("Begründung")).not.toBeInTheDocument();
    });

    it("does not show reasoning textarea after selecting irrelevant answer", async () => {
      await user.click(screen.getByLabelText("Nicht relevant"));

      expect(screen.queryByLabelText("Begründung")).not.toBeInTheDocument();
    });
  });

  describe("pre-filled data from localStorage", () => {
    it("pre-selects the saved answer", () => {
      vi.mocked(
        readDataFromLocalStorage<DocumentationData<V2>>,
      ).mockReturnValue({
        version: DATA_SCHEMA_VERSION_V2,
        principles: [
          {
            id: "1",
            answer: "Nein",
            reasoning: "some reasoning",
            aspects: [],
          },
        ],
      });

      act(() => {
        renderWithRouter();
      });

      const radio = screen.getByLabelText("Nein");
      expect(radio).toBeChecked();
    });
  });

  // Note: V2 principle page uses warningInsteadOfError and navigates via onBeforeSubmit,
  // so form-level validation is intentionally lenient here. Full validation is tested
  // on the erlaeuterung page where aspects and reasoning are collected.
});
