import { render, screen, within } from "@testing-library/react";
import Index from "app/routes/_index";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";

vi.mock("~/contexts/FeatureFlagContext", () => {
  return {
    useFeatureFlag: vi.fn(),
  };
});

describe("Index Route - Integration Tests", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  beforeEach(() => {
    vi.mocked(useFeatureFlag).mockReturnValue(true);
    renderWithRouter(<Index />);
  });

  it("renders the Hero section with the correct title", () => {
    expect(
      screen.getByRole("heading", {
        name: "Digitaltaugliche Regelungen erarbeiten",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the step-by-step section with all three steps", () => {
    expect(
      screen.getByRole("heading", {
        name: "Schritt für Schritt",
        level: 2,
      }),
    ).toBeInTheDocument();

    // Step 1
    expect(
      screen.getByRole("heading", {
        name: /Digitalbezug/,
        level: 3,
      }),
    ).toBeInTheDocument();

    const step1Button = screen.getByRole("link", {
      name: /Digitalbezug/,
    });
    expect(step1Button).toHaveAttribute("href", "/vorpruefung");

    // Step 2
    expect(
      screen.getByRole("heading", {
        name: /Digitaltauglichkeit der Regelung/,
        level: 3,
      }),
    ).toBeInTheDocument();

    const step2Button = screen.getByRole("link", {
      name: "Regelung erarbeiten",
    });
    expect(step2Button).toHaveAttribute("href", "/methoden");

    // Step 3
    expect(
      screen.getByRole("heading", {
        name: /Dokumentieren/,
        level: 3,
      }),
    ).toBeInTheDocument();

    const step3Button = screen.getByRole("link", {
      name: /Dokumentation erstellen/,
    });
    expect(step3Button).toHaveAttribute("href", "/dokumentation");
  });

  it("renders the Grundlagen section with correct InfoBoxes", () => {
    expect(
      screen.getByRole("heading", {
        name: "Grundlagen zum Digitalcheck",
        level: 2,
      }),
    ).toBeInTheDocument();

    // First InfoBox
    const digitalTauglichkeitBox = screen.getByRole("heading", {
      name: /Was ist Digitaltauglichkeit?/,
      level: 3,
    }).parentElement!;

    expect(
      within(digitalTauglichkeitBox).getByRole("link", {
        name: /Digitaltauglichkeit/,
      }),
    ).toHaveAttribute("href", "/grundlagen/digitaltauglichkeit");

    // Second InfoBox
    const nkrBox = screen.getByRole("heading", {
      name: /Nationale Normenkontrollrat/,
      level: 3,
    }).parentElement!;

    expect(
      within(nkrBox).getByRole("link", {
        name: /NKR/,
      }),
    ).toHaveAttribute("href", "/grundlagen/normenkontrollrat");
  });

  it("renders the visualizations and principles InfoBoxes with correct links", () => {
    // Visualizations InfoBox
    const visualizationsBox = screen.getByRole("heading", {
      name: /Visualisierungen/,
      level: 3,
    }).parentElement!;

    expect(
      within(visualizationsBox).getByRole("link", {
        name: /Visualisierungen/,
      }),
    ).toHaveAttribute("href", "/methoden/visualisieren");

    expect(
      within(visualizationsBox).getByRole("link", {
        name: "Beispiele",
      }),
    ).toHaveAttribute("href", "/beispiele/visualisierungen");

    // Principles InfoBox
    const principlesBox = screen.getByRole("heading", {
      name: /Prinzipien/,
      level: 3,
    }).parentElement!;

    expect(
      within(principlesBox).getByRole("link", {
        name: /Prinzipien/,
      }),
    ).toHaveAttribute("href", "/methoden/fuenf-prinzipien");

    expect(
      within(principlesBox).getByRole("link", {
        name: "Beispiele",
      }),
    ).toHaveAttribute("href", "/beispiele/prinzipien");
  });

  it("renders the individual support section", () => {
    expect(
      screen.getByRole("heading", {
        name: /Unterstützung/,
        level: 2,
      }),
    ).toBeInTheDocument();

    const supportButton = screen.getByRole("link", {
      name: /Angebote/,
    });
    expect(supportButton).toHaveAttribute("href", "/unterstuetzung");
  });

  it("renders the quote section", () => {
    expect(screen.getByText(/Digitalcheck erscheint/)).toBeInTheDocument();

    expect(screen.getByText("Referentin")).toBeInTheDocument();
  });

  it("renders the documentation banner", () => {
    expect(
      screen.getByRole("heading", {
        name: "Digitalcheck-Dokumentation: Jetzt online ausfüllenNEU",
        level: 2,
      }),
    ).toBeInTheDocument();
  });
});
