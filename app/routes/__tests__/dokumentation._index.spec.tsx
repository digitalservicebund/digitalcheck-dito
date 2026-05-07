// Import mocks first
import "./utils/mockLocalStorageVersioned";
// End of mocks

import { dokumentationStaticWordV2 } from "@/config/downloads";
import { dokumentation_hinweise } from "@/config/routes";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import DokumentationIndex from "~/routes/dokumentation._index";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";

vi.mock("~/contexts/FeatureFlagContext", () => {
  return {
    useFeatureFlag: vi.fn(),
  };
});

describe("Dokumentation Index Route - Integration Tests", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        <DocumentationDataProvider>{component}</DocumentationDataProvider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.mocked(useFeatureFlag).mockReturnValue(true);
    renderWithRouter(<DokumentationIndex />);
  });

  it("renders the Hero section with the correct title", () => {
    expect(
      screen.getByRole("heading", {
        name: "Dokumentation der Digitaltauglichkeit",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the main CTA button to start documentation", () => {
    const startButton = screen.getByRole("link", {
      name: "Dokumentation starten",
    });
    expect(startButton).toHaveAttribute("href", dokumentation_hinweise.path);
  });

  it("renders the Word file download button", () => {
    const downloadButton = screen.getByRole("link", {
      name: "Word-Vorlage herunterladen (.docx)",
    });
    expect(downloadButton).toHaveAttribute(
      "href",
      dokumentationStaticWordV2.path,
    );
  });

  it("renders the support banner", () => {
    expect(
      screen.getByRole("heading", {
        name: "Sie haben Gesprächsbedarf zu Ihrem Vorhaben?",
        level: 2,
      }),
    ).toBeInTheDocument();
  });
});
