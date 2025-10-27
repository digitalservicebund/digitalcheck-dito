// Import mocks first
import "./utils/mockDocumentationDataService";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DocumentationParticipation from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import { useDocumentationData } from "../dokumentation/documentationDataHook";
import { initialDocumentationData } from "../dokumentation/documentationDataService";

const mockedUseDocumentationData = vi.mocked(useDocumentationData);

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <DocumentationParticipation />
    </MemoryRouter>,
  );
};

describe("DocumentationParticipation", () => {
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
          name: "Auswirkungen auf Betroffene und an der Umsetzung Beteiligte",
          level: 1,
        }),
      ).toBeInTheDocument();
    });

    it("shows first textarea with expected label and description", () => {
      const textareas = screen.getAllByLabelText(/Antwort/);
      expect(textareas[0]).toBeInTheDocument();
      expect(textareas[0].tagName).toBe("TEXTAREA");

      expect(
        screen.getByText(
          "Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.",
        ),
      ).toBeInTheDocument();
    });

    it("shows second textarea with expected label and description", () => {
      const textareas = screen.getAllByLabelText(/Antwort/);
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
          participation: {
            formats: "",
            results: "",
          },
        },
        findDocumentationDataForUrl: vi.fn(),
      });

      act(() => {
        renderWithRouter();
      });
    });

    it("shows an error on invalid data", async () => {
      const input1 = screen.getByLabelText(
        "AntwortBitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.",
      );
      const input2 = screen.getByLabelText(
        "AntwortBitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die besonders umsetzungsrelevant sind.",
      );

      await waitFor(() => {
        expect(input1).toBeInvalid();
        expect(input2).toBeInvalid();
      });
      expect(input1).toHaveAccessibleErrorMessage(
        "Fehler: Bitte geben Sie eine Antwort.",
      );
      expect(input2).toHaveAccessibleErrorMessage(
        "Fehler: Bitte geben Sie eine Antwort.",
      );
    });

    it("removes the error on change", async () => {
      const user = userEvent.setup();

      const input1 = screen.getByLabelText(
        "AntwortBitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.",
      );
      const input2 = screen.getByLabelText(
        "AntwortBitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die besonders umsetzungsrelevant sind.",
      );

      await waitFor(() => {
        expect(input1).toBeInvalid();
        expect(input2).toBeInvalid();
      });

      await user.type(input1, "valid");
      await user.type(input2, "valid");

      expect(input1).toBeValid();
      expect(input2).toBeValid();
    });
  });
});
