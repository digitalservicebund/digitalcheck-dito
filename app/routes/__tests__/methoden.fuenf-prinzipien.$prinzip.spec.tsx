import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLoaderData } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getTextFromNodes } from "~/routes/__tests__/utils/strapiUtils.ts";
import Prinzip from "~/routes/methoden.fuenf-prinzipien.$prinzip/route";
import { Node } from "~/utils/paragraphUtils";
import { PrinzipWithAspekte } from "~/utils/strapiData.server.ts";
import { PrinzipListItem } from "../methoden.fuenf-prinzipien.$prinzip/query";

// Mock react-router's useLoaderData hook, which is used by the component
// to get data from its server-side loader.
vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useLoaderData: vi.fn(),
  };
});

const IntersectionObserverMock = vi.fn(
  class {
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn();
    unobserve = vi.fn();
  },
);

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Create mock data that simulates the data structure returned by the loader.
// This includes a principle with a full example and one without to test conditional rendering.
const mockAspectApplication1_1 = {
  Titel: "1.1a",
  Erklaerung: [],
  Formulierungsbeispiel: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Ein Formulierungsbeispiel für 1.1a" }],
    },
  ] as Node[],
  Beispiel: {
    documentId: "def-1",
    Nummer: 1,
    Text: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "1.1a Beispieltext." }],
      },
    ],
    PrinzipErfuellungen: [],

    Paragraph: {
      Nummer: 1,
      Gesetz: "AspAnwG",
      Titel: "Titel des Anwendungsparagraphen",
      Beispielvorhaben: {
        URLBezeichnung: "anwendung-beispielvorhaben",
        Titel: "Anwendung-Beispielvorhaben",
      },
    },
  },
};

const mockAspect1 = {
  Nummer: "1.1",
  Titel: "Aspekt1",
  Text: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Aspekt 1.1 Text" }],
    },
  ] as Node[],
  Beispiel: {
    documentId: "abc-1",
    Nummer: 1,
    Text: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Aspekt 1.1 Beispieltext." }],
      },
    ],
    PrinzipErfuellungen: [],

    Paragraph: {
      Nummer: 11,
      Gesetz: "AspG",
      Titel: "Titel des Aspekt-Paragraphen",
      Beispielvorhaben: {
        URLBezeichnung: "aspekt-beispielvorhaben",
        Titel: "Aspekt-Beispielvorhaben",
      },
    },
  },
  Anwendung: [mockAspectApplication1_1],
  Kurzbezeichnung: "A1",
  Beschreibung: "",
};
const mockPrinzipData: PrinzipWithAspekte = {
  documentId: "id",
  Kurzbezeichnung: "Nutzerfreundlichkeit",
  URLBezeichnung: "nutzerfreundlichkeit",
  Name: "Prinzip Test 1: Nutzerfreundlichkeit",
  Beschreibung: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Beschreibung für Prinzip 1." }],
    },
  ] as Node[],
  Kurzbeschreibung: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Kurzbeschreibung" }],
    },
  ] as Node[],
  order: 1,
  Nummer: 1 as const,
  Aspekte: [
    mockAspect1,
    {
      Nummer: "1.2",
      Titel: "Aspekt2",
      Text: [
        {
          type: "paragraph",
          children: [{ type: "text", text: "Anwendung Text 1.2" }],
        },
      ] as Node[],
      Beispiel: undefined,
      Anwendung: [],
      Kurzbezeichnung: "A2",
      Beschreibung: "",
    },
  ],
  Beispiel: undefined, // not supported at the moment
};

const mockPrinzipsList: PrinzipListItem[] = [];

describe("FivePrinciples Route - Integration Tests", () => {
  let container: HTMLElement;
  beforeEach(() => {
    // Provide the mock data to the component via the mocked hook
    vi.mocked(useLoaderData).mockReturnValue({
      prinzip: mockPrinzipData,
      prinzipList: mockPrinzipsList,
    });

    // Render the component within a router to handle <Link> components
    const result = render(
      <MemoryRouter>
        <Prinzip />
      </MemoryRouter>,
    );
    container = result.container;
  });

  it("renders the Hero section with the correct title and subtitle", () => {
    expect(
      screen.getByRole("heading", {
        name: mockPrinzipData.Name,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(getTextFromNodes(mockPrinzipData.Beschreibung)),
    ).toBeInTheDocument();
  });

  it("renders the Table of Contents with links to aspects", () => {
    const main = screen.getByRole("main");
    const toc = within(main).getByRole("navigation", { name: "Inhalt" });

    expect(
      within(toc).getByRole("link", { name: "1.1 A1" }),
    ).toBeInTheDocument();
    expect(
      within(toc).getByRole("link", { name: "1.2 A2" }),
    ).toBeInTheDocument();
  });

  it("renders the description, not the short description", () => {
    expect(screen.getByText("Beschreibung für Prinzip 1.")).toBeInTheDocument();

    expect(screen.queryByText("Kurzbeschreibung")).not.toBeInTheDocument();
  });

  it("renders the aspect example", () => {
    const sectionHeading = screen.getByRole("heading", {
      name: `${mockAspect1.Nummer} ${mockAspect1.Titel}`,
      level: 2,
    });
    const section = sectionHeading.closest("section") as HTMLElement;

    const aspectParagraphTitle = `§ ${mockAspect1.Beispiel.Paragraph.Nummer} ${mockAspect1.Beispiel.Paragraph.Gesetz}`;
    expect(within(section).getByText(aspectParagraphTitle)).toBeInTheDocument();
    expect(
      within(section).getByText(getTextFromNodes(mockAspect1.Beispiel.Text)),
    ).toBeInTheDocument();

    const link = within(section).getByRole("link", {
      name: /Ganzes Beispiel zeigen/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/beispiele/prinzipien/nutzerfreundlichkeit#absatz-${mockAspect1.Beispiel.documentId}`,
    );
  });

  it("renders the aspect > application example", async () => {
    const detailsHeading = screen.getByRole("button", {
      name: "1.1a",
    });

    // Click to expand the details section
    await userEvent.click(detailsHeading);

    const exampleSection = screen
      .getByText("1.1a Beispieltext.")
      .closest("div[data-open]") as HTMLElement;

    expect(
      within(exampleSection).getByRole("heading", {
        level: 4,
        name: "Ein Textbeispiel",
      }),
    ).toBeInTheDocument();
    expect(within(exampleSection).getByText("§ 1 AspAnwG")).toBeInTheDocument();

    const link = within(exampleSection).getByRole("link", {
      name: "Ganzes Beispiel zeigen",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/beispiele/prinzipien/nutzerfreundlichkeit#absatz-${mockAspectApplication1_1.Beispiel.documentId}`,
    );
  });

  it("renders the aspect > application Formulierungsbeispiel", async () => {
    const expectedText = getTextFromNodes(
      mockAspectApplication1_1.Formulierungsbeispiel,
    );
    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();

    const detailsHeading = screen.getByRole("button", {
      name: "1.1a",
    });

    // Click to expand the details section
    await userEvent.click(detailsHeading);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
