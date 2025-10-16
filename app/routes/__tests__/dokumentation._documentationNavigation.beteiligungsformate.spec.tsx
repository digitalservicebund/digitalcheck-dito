import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockForm } from "~/routes/__tests__/utils/mockForm";
import { mockRouter } from "~/routes/__tests__/utils/mockRouter";
import DocumentationParticipation from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import { getDocumentationData } from "~/routes/dokumentation/documentationDataService";

vi.mock(
  "~/routes/dokumentation/documentationDataService",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("~/routes/dokumentation/documentationDataService")
      >();
    return {
      ...actual,
      getDocumentationData: vi.fn(),
    };
  },
);

const { mockNavigationContext } = mockRouter();
mockForm();

const mockGetDocumentationData = vi.mocked(getDocumentationData);

describe.skip("DocumentationParticipation", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationParticipation />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockGetDocumentationData.mockReturnValue({ version: "1" });
    mockNavigationContext();

    renderWithRouter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the expected heading", () => {
    expect(
      screen.getByRole("heading", {
        name: "Auswirkungen auf Betroffene und an der Umsetzung Beteiligte",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows first textarea with expected label and description", () => {
    const textareas = screen.getAllByLabelText("Antwort");
    expect(textareas[0]).toBeInTheDocument();
    expect(textareas[0].tagName).toBe("TEXTAREA");

    expect(
      screen.getByText(
        "Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.",
      ),
    ).toBeInTheDocument();
  });

  it("shows second textarea with expected label and description", () => {
    const textareas = screen.getAllByLabelText("Antwort");
    expect(textareas[1]).toBeInTheDocument();
    expect(textareas[1].tagName).toBe("TEXTAREA");

    expect(
      screen.getByText(
        "Bitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die besonders umsetzungsrelevant sind.",
      ),
    ).toBeInTheDocument();
  });

  it("shows submit button", () => {
    const submitButton = screen.getByRole("button", {
      name: "Übernehmen & weiter",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("shows back button", () => {
    const backButton = screen.getByRole("link", { name: "Zurück" });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/previous-url");
  });
});
