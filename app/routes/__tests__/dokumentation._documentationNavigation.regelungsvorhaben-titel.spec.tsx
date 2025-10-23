// Import mocks first
import "./utils/mockDocumentationDataService";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockForm } from "~/routes/__tests__/utils/mockForm";
import DocumentationTitle from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";

mockForm();

describe("DocumentationTitle", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationTitle />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
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
      name: "Weiter",
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
