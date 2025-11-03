// Import mocks first
import "./utils/mockDocumentationDataService";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DocumentationTitle from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import { useDocumentationData } from "../dokumentation/documentationDataHook";
import { initialDocumentationData } from "../dokumentation/documentationDataService";

const mockedUseDocumentationData = vi.mocked(useDocumentationData);

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <DocumentationTitle />
    </MemoryRouter>,
  );
};

describe("DocumentationTitle", () => {
  describe("no previous data", () => {
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

  describe("validation", () => {
    beforeEach(() => {
      mockedUseDocumentationData.mockReturnValue({
        documentationData: {
          ...initialDocumentationData,
          policyTitle: { title: "" },
        },
        findDocumentationDataForUrl: vi.fn(),
        hasSavedDocumentation: true,
      });

      act(() => {
        renderWithRouter();
      });
    });

    it("shows an error on invalid data", async () => {
      const input = screen.getByLabelText("Titel des Regelungsvorhabens");
      await waitFor(() => {
        expect(input).toBeInvalid();
      });
      expect(input).toHaveAccessibleErrorMessage(
        "Fehler: Bitte geben Sie einen Titel ein.",
      );
    });

    it("removes the error on change", async () => {
      const user = userEvent.setup();

      const input = screen.getByLabelText("Titel des Regelungsvorhabens");
      await waitFor(() => {
        expect(input).toBeInvalid();
      });

      await user.type(input, "valid reason");

      expect(input).toBeValid();
    });
  });
});
