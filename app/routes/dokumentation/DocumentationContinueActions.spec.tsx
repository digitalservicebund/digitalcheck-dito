// Import mocks first
import "~/routes/__tests__/utils/mockDocumentationDataService";
import { mockNavigate } from "~/routes/__tests__/utils/mockRouter";
// End of mocks
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import React from "react";
import { MemoryRouter } from "react-router";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general.ts";
import { ROUTES_DOCUMENTATION_INTRO } from "~/resources/staticRoutes.ts";
import { DocumentationContinueActions } from "./DocumentationContinueActions";
import { useDocumentationData } from "./documentationDataHook";
import { initialDocumentationData } from "./documentationDataService";

const { mockDeleteDocumentationData, mockDownloadDocumentation } = vi.hoisted(
  () => ({
    mockDownloadDocumentation: vi.fn(),
    mockDeleteDocumentationData: vi.fn(),
  }),
);
vi.mock("~/service/wordDocumentationExport/wordDocumentation", () => ({
  default: mockDownloadDocumentation,
}));

vi.mock(
  "~/routes/dokumentation/documentationDataService",
  async (importOriginal) => ({
    ...(await importOriginal()),
    deleteDocumentationData: mockDeleteDocumentationData,
  }),
);

// Helper to set the mocked return for useDocumentationData
const setHasSavedDocumentation = (value: boolean) => {
  vi.mocked(useDocumentationData).mockReturnValue({
    documentationData: initialDocumentationData,
    findDocumentationDataForUrl: vi.fn(),
    hasSavedDocumentation: value,
  } as ReturnType<typeof useDocumentationData>);
};

describe("DocumentationContinueActions", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when a saved documentation exists", () => {
    setHasSavedDocumentation(true);

    beforeEach(() => {
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

    async function triggerStartOverDialog() {
      const startOverButton = await screen.findByRole("button", {
        name: digitalDocumentation.start.actions.startOver.buttonText,
      });
      act(() => startOverButton.click());

      return screen.getByRole("dialog");
    }

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

      expect(mockDeleteDocumentationData).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(
        ROUTES_DOCUMENTATION_INTRO[0].url,
      );
    });
  });

  describe("when no saved documentation exists", () => {
    it("renders just the initial start action", async () => {
      setHasSavedDocumentation(false);

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
