import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockDocumentationDataService } from "~/routes/__tests__/utils/mockDocumentationDataService";
import { mockForm } from "~/routes/__tests__/utils/mockForm";
import { mockRouter } from "~/routes/__tests__/utils/mockRouter";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import DocumentationTitle from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import { getDocumentationStep } from "~/routes/dokumentation/documentationDataService";

const { mockUseOutletContext } = mockRouter();
mockDocumentationDataService();
mockForm();

const mockGetDocumentationStep = vi.mocked(getDocumentationStep);

describe("DocumentationTitle", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationTitle />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockGetDocumentationStep.mockReturnValue(null);
    const context: NavigationContext = {
      currentUrl: "/dokumentation/regelungsvorhaben-titel",
      nextUrl: "/next-route",
      previousUrl: "/previous-route",
      routes: [],
    };
    mockUseOutletContext.mockReturnValue(context);

    renderWithRouter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the expected heading", () => {
    expect(
      screen.getByRole("heading", {
        name: "Tragen Sie den Titel Ihres Regelungsvorhaben ein",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows an input element with the expected label", () => {
    const input = screen.getByLabelText("Titel des Regelungsvorhabens");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
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
    expect(backButton).toHaveAttribute("href", "/previous-route");
  });
});
