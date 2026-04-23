// Import mocks first
import "./utils/mockLocalStorageVersioned";
import "./utils/mockRouter";
// End of mocks
import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import {
  createBrowserRouter,
  RouterProvider,
  useOutletContext,
  useParams,
} from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import type { digitalDocumentation } from "~/resources/content/dokumentation";
import { Route, ROUTES_DOCUMENTATION_INTRO } from "~/resources/staticRoutes";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import {
  PrinzipAspekt,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server";
import { NavigationContext } from "../dokumentation._documentationNavigation";
import DocumentationPrincipleErlaeuterung from "../dokumentation._documentationNavigation.$principleId_.erlaeuterung";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import {
  DATA_SCHEMA_VERSION_V2,
  DocumentationData,
  V2,
} from "../dokumentation/documentationDataSchema";

vi.mock("~/contexts/FeatureFlagContext", () => ({
  useFeatureFlag: vi.fn().mockReturnValue(true),
}));

const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_INTRO,
  [
    {
      title: "Prinzip: Digitale Angebote",
      url: "/dokumentation/prinzip-1-digitale-angebote",
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
  {
    Titel: "Aspekt 2",
    Beschreibung: "Aspekt 2 Beschreibung",
    Kurzbezeichnung: "A2",
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
      Text: [],
      PrinzipErfuellungen: [],
      Paragraph: {
        Nummer: 42,
        Gesetz: "TestG",
        Titel: "Titel",
        Beispielvorhaben: {
          URLBezeichnung: "test",
          Titel: "Test",
        },
      },
    },
  },
];

const context: NavigationContext = {
  currentUrl: "/dokumentation/prinzip-1-digitale-angebote/erlaeuterung",
  nextUrl: "/next-url",
  previousUrl: "/dokumentation/prinzip-1-digitale-angebote",
  routes: routes,
  prinzips,
};

const mockedUseOutletContext = vi.mocked(useOutletContext);
const mockedUseParams = vi.mocked(useParams);

const renderWithRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HelpPanelProvider>
          <DocumentationDataProvider>
            <DocumentationPrincipleErlaeuterung />
          </DocumentationDataProvider>
        </HelpPanelProvider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
};

const mockStoredData = (
  answer: (typeof digitalDocumentation.principlePages.radioOptions)[number],
  reasoning = "",
  aspects: string[] = [],
) => {
  vi.mocked(readDataFromLocalStorage<DocumentationData<V2>>).mockReturnValue({
    version: DATA_SCHEMA_VERSION_V2,
    principles: [
      {
        id: "1",
        answer,
        reasoning,
        aspects,
      },
    ],
  });
};

describe("DocumentationPrincipleErlaeuterung", () => {
  beforeEach(() => {
    mockedUseOutletContext.mockReturnValue(context);
    mockedUseParams.mockReturnValue({
      principleId: "prinzip-1-digitale-angebote",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("positive answer", () => {
    beforeEach(() => {
      mockStoredData("Ja, gänzlich oder teilweise", "existing reasoning", [
        "a1",
      ]);
      act(() => {
        renderWithRouter();
      });
    });

    it("shows the principle heading", () => {
      expect(
        screen.getByRole("heading", {
          name: /Prinzip 1: Digitale Angebote/,
          level: 1,
        }),
      ).toBeInTheDocument();
    });

    it("shows the positive answer confirmation message", () => {
      expect(
        screen.getByText(
          "Sie haben angegeben, dass das Prinzip auf ihr Vorhaben zutrifft.",
        ),
      ).toBeInTheDocument();
    });

    it("shows the change answer link", () => {
      const link = screen.getByRole("link", { name: "Angaben ändern" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        "/dokumentation/prinzip-1-digitale-angebote",
      );
    });

    it("shows the explanation heading for positive answer", () => {
      expect(
        screen.getByText(
          /Erklären Sie, inwiefern Sie auf dieses Prinzip eingegangen sind/,
        ),
      ).toBeInTheDocument();
    });

    it("shows aspect pills", () => {
      expect(screen.getByText("Schwerpunkte auswählen")).toBeInTheDocument();
      expect(screen.getByText("A1")).toBeInTheDocument();
      expect(screen.getByText("A2")).toBeInTheDocument();
    });

    it("shows reasoning textarea", () => {
      expect(
        screen.getByLabelText("Erklärung", { selector: "textarea" }),
      ).toBeInTheDocument();
    });

    it("shows submit and back buttons", () => {
      expect(
        screen.getByRole("button", { name: "Weiter" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Zurück" })).toBeInTheDocument();
    });
  });

  describe("negative answer", () => {
    beforeEach(() => {
      mockStoredData("Nein", "negative reasoning");
      act(() => {
        renderWithRouter();
      });
    });

    it("shows the negative answer confirmation message", () => {
      expect(
        screen.getByText(
          "Sie haben angegeben, dass das Prinzip nicht auf ihr Vorhaben zutrifft.",
        ),
      ).toBeInTheDocument();
    });

    it("shows the explanation heading for negative answer", () => {
      expect(
        screen.getByText("Erklären Sie, warum das Prinzip", { exact: false }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("nicht", { selector: "strong" }),
      ).toBeInTheDocument();
    });

    it("does not show aspect pills", () => {
      expect(
        screen.queryByText("Schwerpunkte auswählen"),
      ).not.toBeInTheDocument();
    });

    it("shows reasoning textarea", () => {
      expect(
        screen.getByLabelText("Erklärung", { selector: "textarea" }),
      ).toBeInTheDocument();
    });
  });

  describe("irrelevant answer", () => {
    beforeEach(() => {
      mockStoredData("Nicht relevant", "irrelevant reasoning");
      act(() => {
        renderWithRouter();
      });
    });

    it("shows the irrelevant answer confirmation message", () => {
      expect(
        screen.getByText(/nicht relevant für Ihr Vorhaben ist/),
      ).toBeInTheDocument();
    });

    it("does not show aspect pills", () => {
      expect(
        screen.queryByText("Schwerpunkte auswählen"),
      ).not.toBeInTheDocument();
    });

    it("shows reasoning textarea", () => {
      expect(
        screen.getByLabelText("Erklärung", { selector: "textarea" }),
      ).toBeInTheDocument();
    });
  });

  describe("no answer saved - redirect", () => {
    it("does not render content when no answer is saved", () => {
      mockStoredData("" as "Nein");
      act(() => {
        renderWithRouter();
      });

      // The component returns null when no answer is saved
      expect(screen.queryByText("Angaben ändern")).not.toBeInTheDocument();
    });
  });

  describe("form validation", () => {
    it("shows reasoning error for negative answer without reasoning", async () => {
      mockStoredData("Nein", "");
      act(() => {
        renderWithRouter();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Bitte geben Sie eine Erklärung an."),
        ).toBeInTheDocument();
      });
    });

    it("shows reasoning error for irrelevant answer without reasoning", async () => {
      mockStoredData("Nicht relevant", "");
      act(() => {
        renderWithRouter();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Bitte geben Sie eine Erklärung an."),
        ).toBeInTheDocument();
      });
    });

    it("shows reasoning error for positive answer without reasoning", async () => {
      mockStoredData("Ja, gänzlich oder teilweise", "", ["a1"]);
      act(() => {
        renderWithRouter();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Bitte geben Sie eine Erklärung an."),
        ).toBeInTheDocument();
      });
    });

    it("shows no aspects error when aspects are selected", () => {
      mockStoredData("Ja, gänzlich oder teilweise", "", ["a1"]);
      act(() => {
        renderWithRouter();
      });

      // Aspects are selected, so no aspects error should show
      expect(
        screen.queryByText("Bitte geben Sie mindestens einen Schwerpunkt an"),
      ).not.toBeInTheDocument();
    });
  });

  describe("validation behavior", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("removes reasoning error on valid input", async () => {
      mockStoredData("Nein", "");
      act(() => {
        renderWithRouter();
      });

      const reasoningInput = screen.getByLabelText("Erklärung");
      await waitFor(() => {
        expect(
          screen.getByText("Bitte geben Sie eine Erklärung an."),
        ).toBeInTheDocument();
      });

      await user.type(reasoningInput, "Valid reasoning");
      expect(
        screen.queryByText("Bitte geben Sie eine Erklärung an."),
      ).not.toBeInTheDocument();
    });
  });
});
