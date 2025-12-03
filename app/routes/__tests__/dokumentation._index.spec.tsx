import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import {
  ROUTE_DOCUMENTATION_TEMPLATE_WORD,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes";
import DokumentationIndex from "~/routes/dokumentation._index";

vi.mock("~/contexts/FeatureFlagContext", () => {
  return {
    useFeatureFlag: vi.fn(),
  };
});

describe("Dokumentation Index Route - Integration Tests", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
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
    expect(startButton).toHaveAttribute(
      "href",
      ROUTES_DOCUMENTATION_INTRO[0].url,
    );
  });

  it("renders the Word file download button", () => {
    const downloadButton = screen.getByRole("link", {
      name: "Word-Vorlage herunterladen (.docx)",
    });
    expect(downloadButton).toHaveAttribute(
      "href",
      ROUTE_DOCUMENTATION_TEMPLATE_WORD.url,
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
