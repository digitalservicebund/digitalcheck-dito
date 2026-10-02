// @vitest-environment node
import type { Prinzip as PrinzipData } from "@/content.config";
import Prinzip from "@/pages/methoden/fuenf-prinzipien/[principleId].astro";
import { renderToDOM } from "@/utils/testUtils";
import type { BoundFunctions, queries } from "@testing-library/dom";
import { within } from "@testing-library/dom";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

const IntersectionObserverMock = vi.fn(
  class {
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn();
    unobserve = vi.fn();
  },
);

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Create mock data that simulates the data structure returned by the collection.
const mockAspectApplication1_1 = {
  Titel: "1.1a",
  Erklaerung: "",
  Formulierungsbeispiel: "Ein Formulierungsbeispiel für 1.1a",
};

const mockAspect1 = {
  Titel: "Aspekt1",
  Text: "Aspekt 1.1 Text",
  Anwendung: [mockAspectApplication1_1],
  Kurzbezeichnung: "A1",
};

const mockPrinzipData: PrinzipData & { Beschreibung: string } = {
  documentId: "id",
  URLBezeichnung: "nutzerfreundlichkeit",
  Name: "Prinzip Test 1: Nutzerfreundlichkeit",
  Beschreibung: "Beschreibung für Prinzip 1.",
  Kurzbeschreibung: "Kurzbeschreibung",
  Hilfetext: "",
  Erklaerungshilfe: "",
  order: 1,
  Nummer: 1,
  Aspekte: [
    mockAspect1,
    {
      Titel: "Aspekt2",
      Text: "Anwendung Text 1.2",
      Anwendung: [],
      Kurzbezeichnung: "A2",
    },
  ],
};

const mockPrinzipsList: Pick<
  PrinzipData,
  "Name" | "URLBezeichnung" | "order"
>[] = [];

describe("FivePrinciples Route - Integration Tests", () => {
  let screen: BoundFunctions<typeof queries>;

  beforeEach(async () => {
    const { dom } = await renderToDOM(Prinzip as AstroComponentFactory, {
      props: { prinzip: mockPrinzipData, prinzipList: mockPrinzipsList },
    });
    screen = within(dom.body);
  });

  it("renders the Hero section with the correct title and subtitle", () => {
    expect(
      screen.getByRole("heading", {
        name: mockPrinzipData.Name,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockPrinzipData.Beschreibung)).toBeInTheDocument();
  });

  it("marks aspect headings as ToC entries with their short label", () => {
    for (const { Titel, Kurzbezeichnung } of mockPrinzipData.Aspekte) {
      const heading = screen.getByRole("heading", { name: Titel, level: 2 });
      expect(heading).toHaveAttribute("id", Kurzbezeichnung.toLowerCase());
      expect(heading).toHaveAttribute("data-toc-label", Kurzbezeichnung);
    }
  });

  it("renders the description, not the short description", () => {
    expect(screen.getByText("Beschreibung für Prinzip 1.")).toBeInTheDocument();

    expect(screen.queryByText("Kurzbeschreibung")).not.toBeInTheDocument();
  });

  it("renders a principle-colored badge in the Hero", () => {
    const badge = screen
      .getByText(`Prinzip ${mockPrinzipData.order}`)
      .closest(".kern-badge");
    expect(badge).toHaveClass(`kern-badge--prinzip-${mockPrinzipData.order}`);
  });

  it("renders a principle-colored 'Schwerpunkt' badge per aspect", () => {
    const badges = screen
      .getAllByText("Schwerpunkt")
      .map((label) => label.closest(".kern-badge"));
    expect(badges).toHaveLength(mockPrinzipData.Aspekte.length);
    for (const badge of badges) {
      expect(badge).toHaveClass(`kern-badge--prinzip-${mockPrinzipData.order}`);
    }
  });

  it("highlights every second aspect section", () => {
    const sections = mockPrinzipData.Aspekte.map(({ Titel }) =>
      screen.getByRole("heading", { name: Titel, level: 2 }).closest("section"),
    );
    expect(sections[0]).not.toHaveClass("bg-kern-darkblue-025");
    expect(sections[1]).toHaveClass("bg-kern-darkblue-025");
  });

  // Note: userEvent doesn't work with the current Astro test setup

  // it("renders the aspect > application Formulierungsbeispiel", async () => {
  //   const expectedText = mockAspectApplication1_1.Formulierungsbeispiel;
  //   expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
  //
  //   const detailsHeading = screen.getByRole("button", {
  //     name: "1.1a",
  //   });
  //
  //   // Click to expand the details section
  //   await userEvent.click(detailsHeading);
  //
  //   expect(screen.getByText(expectedText)).toBeInTheDocument();
  // });
});
