import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ROUTE_DOCUMENTATION_TEMPLATE_WORD,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTE_LANDING,
} from "~/resources/staticRoutes";
import DokumentationIndex from "~/routes/dokumentation._index";
import useFeatureFlag from "~/utils/featureFlags";

vi.mock("~/utils/featureFlags", () => {
  return {
    default: vi.fn(),
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
    expect(startButton).toHaveAttribute("href", ROUTE_DOCUMENTATION_TITLE.url);
  });

  it("renders the back button to landing page", () => {
    const backButton = screen.getByRole("link", {
      name: "Zurück",
    });
    expect(backButton).toHaveAttribute("href", ROUTE_LANDING.url);
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

  it("renders the inline notice for data saving hint", () => {
    expect(
      screen.getByRole("heading", {
        name: "Hinweise zur Zwischenspeicherung Ihrer Daten",
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Ihre Daten bleiben unbegrenzt in der Sitzung gespeichert/,
      ),
    ).toBeInTheDocument();
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
