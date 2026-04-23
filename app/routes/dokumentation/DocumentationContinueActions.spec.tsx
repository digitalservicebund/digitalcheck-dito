// Import mocks first
import "~/routes/__tests__/utils/mockLocalStorageVersioned";
import { mockNavigate } from "~/routes/__tests__/utils/mockRouter";
// End of mocks
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import React from "react";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general.ts";
import { ROUTES_DOCUMENTATION_INTRO } from "~/resources/staticRoutes.ts";
import {
  readDataFromLocalStorage,
  removeFromLocalStorage,
} from "~/utils/localStorageVersioned";
import { MemoryRouter } from "~/utils/routerCompat";
import { DocumentationContinueActions } from "./DocumentationContinueActions";
import { DocumentationDataProvider } from "./DocumentationDataProvider";
import {
  DATA_SCHEMA_VERSION_V1,
  DocumentationData,
  V1,
} from "./documentationDataSchema";

const { mockDownloadDocumentation } = vi.hoisted(() => ({
  mockDownloadDocumentation: vi.fn(),
}));
vi.mock("~/service/wordDocumentationExport/wordDocumentation", () => ({
  default: mockDownloadDocumentation,
  useWordDocumentation: vi.fn(() => ({
    downloadDocumentation: mockDownloadDocumentation,
  })),
}));

async function triggerStartOverDialog() {
  const startOverButton = await screen.findByRole("button", {
    name: digitalDocumentation.start.actions.startOver.buttonText,
  });
  act(() => startOverButton.click());

  return screen.getByRole("dialog");
}

describe("DocumentationContinueActions", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        <DocumentationDataProvider>{component}</DocumentationDataProvider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when a saved documentation exists", () => {
    beforeEach(() => {
      vi.mocked(
        readDataFromLocalStorage<DocumentationData<V1>>,
      ).mockReturnValue({
        version: DATA_SCHEMA_VERSION_V1,
        policyTitle: { title: "Test" },
      });
      renderWithRouter(<DocumentationContinueActions />);
    });

    it("renders resume and start-over actions", () => {
      const resumeButton = screen.getByRole("link", {
        name: digitalDocumentation.start.actions.resume.buttonText,
      });
      expect(resumeButton).toBeInTheDocument();

      const startOverButton = screen.getByRole("button", {
        name: digitalDocumentation.start.actions.startOver.buttonText,
      });
      expect(startOverButton).toBeInTheDocument();

      const initialButton = screen.queryByRole("link", {
        name: digitalDocumentation.start.actions.startInitial.buttonText,
      });
      expect(initialButton).not.toBeInTheDocument();
    });

    it("triggers a dismissable modal when the start-over button is clicked", async () => {
      const dialog = await triggerStartOverDialog();
      expect(dialog).toBeVisible();

      await act(async () => {
        // use the async version here to silence warnings about missing act calls
        const dismissButton = await screen.findByRole("button", {
          name: general.buttonCancel.text,
        });
        dismissButton.click();
      });

      expect(dialog).not.toBeVisible();
    });

    it("allows downloading the draft documentation", async () => {
      await triggerStartOverDialog();

      const downloadButton = await screen.findByRole("button", {
        name: digitalDocumentation.actions.saveDraft.title,
      });
      downloadButton.click();

      expect(mockDownloadDocumentation).toHaveBeenCalled();
    });

    it("clears the documentation data and navigates to the first step when the start-over button is clicked", async () => {
      await triggerStartOverDialog();
      const confirmButton = await screen.findByRole("button", {
        name: digitalDocumentation.start.startOverDialog.actions.confirm,
      });
      confirmButton.click();

      expect(vi.mocked(removeFromLocalStorage)).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(
        ROUTES_DOCUMENTATION_INTRO[0].url,
      );
    });
  });

  describe("when no saved documentation exists", () => {
    it("renders just the initial start action", async () => {
      vi.mocked(readDataFromLocalStorage).mockReturnValue(null);
      renderWithRouter(<DocumentationContinueActions />);

      const startButton = await screen.findByRole("link", {
        name: digitalDocumentation.start.actions.startInitial.buttonText,
      });

      expect(startButton).toBeInTheDocument();

      const allLinkButtons = await screen.findAllByRole("link");
      expect(allLinkButtons).toHaveLength(1); // no other link-buttons should be rendered
    });
  });
});
