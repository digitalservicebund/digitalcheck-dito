// @vitest-environment node
import FivePrinciples from "@/pages/methoden/fuenf-prinzipien/index.astro";
import { methodsFivePrinciples } from "@/resources/content/methode-fuenf-prinzipien";
import { renderToDOM } from "@/utils/testUtils";
import type { BoundFunctions, queries } from "@testing-library/dom";
import { within } from "@testing-library/dom";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { beforeEach, describe, expect, it } from "vitest";

// Create mock data that simulates the entries returned by getCollection("prinzipien").
// vi.hoisted ensures this is initialized before the hoisted vi.mock() factory runs.
const mockPrinzipsData = vi.hoisted(() => [
  {
    id: "1",
    data: {
      documentId: "1",
      Name: "Prinzip Test 1: Nutzerfreundlichkeit",
      Kurzbeschreibung: "Beschreibung für Prinzip 1.",
      Hilfetext: "",
      Erklaerungshilfe: "",
      order: 1,
      Nummer: 1,
      URLBezeichnung: "prinzip-test-1",
      Aspekte: [
        {
          Titel: "Anwendung 1.1",
          Kurzbezeichnung: "Anwendung 1.1",
          Text: "Anwendung Text 1.1",
          Anwendung: [],
        },
      ],
    },
  },
  {
    id: "2",
    data: {
      documentId: "2",
      Name: "Prinzip Test 2: Datenminimierung",
      Kurzbeschreibung: "Kurze Beschreibung für Prinzip 2.",
      Hilfetext: "",
      Erklaerungshilfe: "",
      order: 2,
      Nummer: 2,
      URLBezeichnung: "prinzip-test-2",
      Aspekte: [], // No application examples
    },
  },
]);

vi.mock("astro:content", () => ({
  getCollection: vi.fn().mockResolvedValue(mockPrinzipsData),
}));

describe("FivePrinciples Route - Integration Tests", () => {
  let screen: BoundFunctions<typeof queries>;
  beforeEach(async () => {
    const { dom } = await renderToDOM(FivePrinciples as AstroComponentFactory);
    screen = within(dom.body);
  });

  it("renders the Hero section with the correct title and subtitle", () => {
    expect(
      screen.getByRole("heading", {
        name: methodsFivePrinciples.title,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Die folgenden Prinzipien helfen Ihnen dabei/),
    ).toBeInTheDocument();
  });

  it("renders the list of principles", () => {
    const list = screen.getByTestId("prinzipien");
    expect(list).toBeInTheDocument();
    expect(
      within(list).getAllByRole("link", { name: "Mehr zum Prinzip" }),
    ).toHaveLength(mockPrinzipsData.length);
  });

  it("renders the instruction section", () => {
    expect(
      screen.getByRole("heading", {
        name: methodsFivePrinciples.instruction.title,
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it("renders each principle from the loader data", () => {
    expect(
      screen.getByRole("heading", {
        name: "Prinzip Test 1: Nutzerfreundlichkeit",
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Prinzip Test 2: Datenminimierung",
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it("renders each principle's short description", () => {
    expect(screen.getByText("Beschreibung für Prinzip 1.")).toBeInTheDocument();
    expect(
      screen.getByText("Kurze Beschreibung für Prinzip 2."),
    ).toBeInTheDocument();
  });

  it("renders the PrinciplePosterBox component", () => {
    expect(
      screen.getByRole("heading", {
        name: methodsFivePrinciples.principlePosterBox.heading,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: methodsFivePrinciples.principlePosterBox.downloadTitle,
      }),
    ).toBeInTheDocument();
  });

  it("renders the 'Next Step' box", () => {
    expect(
      screen.getByRole("heading", {
        name: methodsFivePrinciples.nextStep.title,
        level: 2,
      }),
    ).toBeInTheDocument();
  });
});
