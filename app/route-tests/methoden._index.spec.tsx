import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Methoden from "../routes/methoden._index"; // The component to test

describe("Methoden Route - Integration Tests", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  beforeEach(() => {
    renderWithRouter(<Methoden />);
  });

  it("renders the Hero section with the correct title", () => {
    expect(
      screen.getByRole("heading", {
        name: "Erarbeiten eines digitaltauglichen Regelungsvorhabens",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the BulletList with all methods", () => {
    expect(
      screen.getByRole("heading", {
        name: "Erfassen des Status Quo",
        level: 2,
      }),
    ).toBeInTheDocument();

    const visualisationItem = screen.getByRole("heading", {
      name: "Visualisieren Sie die aktuellen Abläufe",
      level: 3,
    }).parentElement!;

    expect(within(visualisationItem).getByRole("link")).toHaveAttribute(
      "href",
      "/methoden/ablaeufe-aufgaben-erfassen",
    );

    expect(
      screen.getByRole("heading", {
        name: "Entwickeln von Digitaltauglichkeit",
        level: 2,
      }),
    ).toBeInTheDocument();

    const principleItem = screen.getByRole("heading", {
      name: "Finden Sie konkrete Möglichkeiten der Digitalisierung",
      level: 3,
    }).parentElement!;

    expect(within(principleItem).getByRole("link")).toHaveAttribute(
      "href",
      "/methoden/fuenf-prinzipien",
    );

    expect(
      screen.getByRole("heading", {
        name: "Verfassen des Regelungsentwurfes",
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Schreiben Sie die Regelung",
        level: 3,
      }),
    ).toBeInTheDocument();
  });

  it('renders the "Further Methods" content', () => {
    expect(
      screen.getByRole("heading", {
        name: "Weitere Methoden, die Sie nutzen können",
        level: 2,
      }),
    ).toBeInTheDocument();

    const itSystemsBox = screen.getByRole("heading", {
      name: "IT-Systeme gemeinsam erfassen",
      level: 3,
    }).parentElement!;
    expect(within(itSystemsBox).getByRole("link")).toHaveAttribute(
      "href",
      "/methoden/it-systeme-erfassen",
    );

    const technicalFeasibilityBox = screen.getByRole("heading", {
      name: "Technische Umsetzbarkeit sicherstellen",
      level: 3,
    }).parentElement!;
    expect(within(technicalFeasibilityBox).getByRole("link")).toHaveAttribute(
      "href",
      "/methoden/technische-umsetzbarkeit",
    );
  });

  it("renders the SupportBanner with correct content", () => {
    expect(
      screen.getByRole("heading", {
        name: "Sie haben Gesprächsbedarf zu Ihrem Vorhaben?",
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it('renders the NumberedList for "Next Steps" with correct items', () => {
    expect(
      screen.getByRole("heading", { name: "So machen Sie weiter", level: 2 }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Abgeschlossene Vorprüfung: Der Digitalbezug wurde eingeschätzt.",
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Abgeschlossene Erarbeitung eines digitaltauglichen Regelungsvorhabens.",
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Dokumentieren des Regelungsvorhabens",
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Prüfen durch den NKR",
        level: 3,
      }),
    ).toBeInTheDocument();
  });
});
