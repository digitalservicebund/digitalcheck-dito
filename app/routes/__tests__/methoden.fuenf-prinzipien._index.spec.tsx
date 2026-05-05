import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import FivePrinciples from "~/routes/methoden.fuenf-prinzipien._index/route";
import type { Node } from "~/utils/paragraphUtils";
import { MemoryRouter } from "~/utils/routerCompat";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

const mockPrinzipsData: PrinzipWithAspekteAndExample[] = [
  {
    documentId: "doc-1",
    Kurzbezeichnung: "Nutzerfreundlichkeit",
    URLBezeichnung: "nutzerfreundlichkeit",
    Name: "Prinzip Test 1: Nutzerfreundlichkeit",
    Beschreibung: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Beschreibung für Prinzip 1." }],
      },
    ] as Node[],
    order: 1,
    Nummer: 1 as const,
    Aspekte: [
      {
        Titel: "Anwendung 1.1",
        Kurzbezeichnung: "1.1",
        Beschreibung: "",
        Nummer: "1.1",
        Anwendung: [],
        Text: [
          {
            type: "paragraph",
            children: [{ type: "text", text: "Anwendung Text 1.1" }],
          },
        ] as Node[],
        Beispiel: {
          documentId: "abc-1",
          Nummer: 1,
          Text: [
            {
              type: "paragraph",
              children: [{ type: "text", text: "Anwendung Beispieltext." }],
            },
          ] as Node[],
          PrinzipErfuellungen: [],
          Paragraph: {
            Nummer: 99,
            Gesetz: "AnwG",
            Titel: "Titel des Anwendungs-Paragraphen",
            Beispielvorhaben: {
              URLBezeichnung: "anwendung-regelung",
              Titel: "Anwendung-Regelungsvorhaben",
            },
          },
        },
      },
    ],
    Beispiel: {
      documentId: "abc-2",
      Nummer: 2,
      Text: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Dies ist der Text des Beispiel-Absatzes.",
            },
          ],
        },
      ] as Node[],
      PrinzipErfuellungen: [],
      Paragraph: {
        Nummer: 42,
        Gesetz: "TestG",
        Titel: "Titel des Test-Paragraphen",
        Beispielvorhaben: {
          URLBezeichnung: "test-regelung",
          Titel: "Titel des Test-Regelungsvorhabens",
        },
      },
    },
  },
  {
    documentId: "doc-2",
    Kurzbezeichnung: "Datenminimierung",
    URLBezeichnung: "datenminimierung",
    Name: "Prinzip Test 2: Datenminimierung",
    Beschreibung: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Lange Beschreibung für Prinzip 2." }],
      },
    ] as Node[],
    Kurzbeschreibung: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Kurze Beschreibung für Prinzip 2." }],
      },
    ] as Node[],
    order: 2,
    Nummer: 2 as const,
    Aspekte: [],
    Beispiel: {
      documentId: "doc-2-beispiel",
      Nummer: 1,
      Text: [] as Node[],
      PrinzipErfuellungen: [],
      Paragraph: {
        Nummer: 1,
        Gesetz: "TestG",
        Titel: "Titel des Test-Paragraphen",
        Beispielvorhaben: {
          URLBezeichnung: "test-regelung-2",
          Titel: "Titel des Test-Regelungsvorhabens 2",
        },
      },
    },
  },
];

describe("FivePrinciples Route - Integration Tests", () => {
  beforeEach(() => {
    // Render the component within a router to handle <Link> components
    render(
      <MemoryRouter>
        <FivePrinciples prinzips={mockPrinzipsData} />
      </MemoryRouter>,
    );
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

  it("renders the description, superseded by the short description if available", () => {
    expect(screen.getByText("Beschreibung für Prinzip 1.")).toBeInTheDocument();
    expect(
      screen.getByText("Kurze Beschreibung für Prinzip 2."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Lange Beschreibung für Prinzip 2."),
    ).not.toBeInTheDocument();
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
