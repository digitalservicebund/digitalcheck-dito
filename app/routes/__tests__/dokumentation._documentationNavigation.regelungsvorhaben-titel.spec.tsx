// Import mocks first
import "./utils/mockLocalStorageVersioned";
import "./utils/mockRouter";
// End of mocks
import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import DocumentationTitle from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import type { DocumentationData } from "../dokumentation/documentationDataSchema";
import { DATA_SCHEMA_VERSION_V1 } from "../dokumentation/documentationDataSchema";

const mockedReadDataFromLocalStorage = vi.mocked(
  readDataFromLocalStorage<DocumentationData>,
);

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <HelpPanelProvider>
        <DocumentationDataProvider>
          <DocumentationTitle />
        </DocumentationDataProvider>
      </HelpPanelProvider>
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

    it("shows an input element with the expected label", () => {
      expect(
        screen.getByRole("textbox", {
          name: "Titel des Regelungsvorhabens",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("validation", () => {
    beforeEach(() => {
      mockedReadDataFromLocalStorage.mockReturnValue({
        ...{ version: DATA_SCHEMA_VERSION_V1 },
        policyTitle: {
          title: "",
          organization: "",
          publicationStatus: "",
          publicationDate: "",
          publicationLink: "",
        },
      });

      act(() => {
        renderWithRouter();
      });
    });

    it("shows an error on invalid data", async () => {
      const input = screen.getByRole("textbox", {
        name: "Titel des Regelungsvorhabens",
      });
      await waitFor(() => {
        expect(input).toBeInvalid();
      });
      expect(input).toHaveAccessibleErrorMessage(
        "Fehler: Bitte geben Sie einen Titel ein.",
      );
    });

    it("removes the error on change", async () => {
      const user = userEvent.setup();

      const input = screen.getByRole("textbox", {
        name: "Titel des Regelungsvorhabens",
      });
      await waitFor(() => {
        expect(input).toBeInvalid();
      });

      await user.type(input, "valid reason");

      expect(input).toBeValid();
    });
  });
});
