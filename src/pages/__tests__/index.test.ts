// @vitest-environment node
import Index from "@/pages/index.astro";
import { renderToDOM } from "@/utils/testUtils";
import type { BoundFunctions, queries } from "@testing-library/dom";
import { within } from "@testing-library/dom";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { beforeAll, describe, expect, it } from "vitest";

describe("Index Route - Integration Tests", () => {
  let main: BoundFunctions<typeof queries>;
  let aside: BoundFunctions<typeof queries>;

  beforeAll(async () => {
    const { dom } = await renderToDOM(Index as AstroComponentFactory);
    main = within(dom.querySelector("main")!);
    aside = within(dom.querySelector("aside")!);
  });

  it("renders the Hero section with the correct title", () => {
    expect(
      main.getByRole("heading", {
        name: "Digitaltaugliche Regelungen erarbeiten",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the step-by-step section with all three steps", () => {
    expect(
      main.getByRole("heading", {
        name: "Schritt für Schritt",
        level: 2,
      }),
    ).toBeInTheDocument();

    // Step 1
    expect(
      main.getByRole("heading", {
        name: /Digitalbezug/,
        level: 3,
      }),
    ).toBeInTheDocument();

    const step1Button = main.getByRole("link", {
      name: /Digitalbezug/,
    });
    expect(step1Button).toHaveAttribute("href", "/vorpruefung");

    // Step 2
    expect(
      main.getByRole("heading", {
        name: /Digitaltauglichkeit der Regelung/,
        level: 3,
      }),
    ).toBeInTheDocument();

    const step2Button = main.getByRole("link", {
      name: "Regelung erarbeiten",
    });
    expect(step2Button).toHaveAttribute("href", "/methoden");

    // Step 3
    expect(
      main.getByRole("heading", {
        name: /Dokumentieren/,
        level: 3,
      }),
    ).toBeInTheDocument();

    const step3Button = main.getByRole("link", {
      name: /Dokumentation erstellen/,
    });
    expect(step3Button).toHaveAttribute("href", "/dokumentation");
  });

  it("renders the Grundlagen section with correct InfoBoxes", () => {
    expect(
      main.getByRole("heading", {
        name: "Einführung zum Digitalcheck",
        level: 2,
      }),
    ).toBeInTheDocument();

    // First InfoBox
    const digitalTauglichkeitBox = main.getByRole("heading", {
      name: /Was ist Digitaltauglichkeit?/,
      level: 3,
    }).parentElement!;

    expect(
      within(digitalTauglichkeitBox).getByRole("link", {
        name: /Digitaltauglichkeit/,
      }),
    ).toHaveAttribute("href", "/grundlagen/digitaltauglichkeit");

    // Second InfoBox
    const nkrBox = main.getByRole("heading", {
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
    const visualizationsBox = main.getByRole("heading", {
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
    const principlesBox = main.getByRole("heading", {
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
      main.getByRole("heading", {
        name: /Unterstützung/,
        level: 2,
      }),
    ).toBeInTheDocument();

    const supportButton = main.getByRole("link", {
      name: /Angebote/,
    });
    expect(supportButton).toHaveAttribute("href", "/unterstuetzung");
  });

  it("renders the quote section", () => {
    expect(main.getByText(/Digitalcheck erscheint/)).toBeInTheDocument();

    expect(main.getByText("Referentin")).toBeInTheDocument();
  });

  it("renders the documentation banner", () => {
    expect(
      aside.getByRole("heading", {
        name: /Digitalcheck-Dokumentation: Jetzt online ausfüllen/,
        level: 2,
      }),
    ).toBeInTheDocument();
  });
});
