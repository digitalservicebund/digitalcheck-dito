import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLoaderData } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import FivePrinciples from "~/routes/methoden.fuenf-prinzipien/route";
import { Node } from "~/utils/paragraphUtils";

// Mock react-router's useLoaderData hook, which is used by the component
// to get data from its server-side loader.
vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useLoaderData: vi.fn(),
  };
});

// Create mock data that simulates the data structure returned by the loader.
// This includes a principle with a full example and one without to test conditional rendering.
const mockPrinzipsData = [
  {
    Name: "Prinzip Test 1: Nutzerfreundlichkeit",
    Beschreibung: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Beschreibung für Prinzip 1." }],
      },
    ] as Node[],
    order: 1,
    Nummer: 1 as const,
    PrinzipienAnwendung: [
      {
        Title: "Anwendung 1.1",
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
          ],
          PrinzipErfuellungen: [],

          Paragraph: {
            Nummer: "99",
            Gesetz: "AnwG",
            Titel: "Titel des Anwendungs-Paragraphen",
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
      ],
      PrinzipErfuellungen: [],

      Paragraph: {
        Nummer: "42",
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
    Name: "Prinzip Test 2: Datenminimierung",
    Beschreibung: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Beschreibung für Prinzip 2." }],
      },
    ] as Node[],
    order: 2,
    Nummer: 2 as const,
    PrinzipienAnwendung: [], // No application examples
    // No Example paragraph
  },
];

describe("FivePrinciples Route - Integration Tests", () => {
  beforeEach(() => {
    // Provide the mock data to the component via the mocked hook
    vi.mocked(useLoaderData).mockReturnValue({ prinzips: mockPrinzipsData });

    // Render the component within a router to handle <Link> components
    render(
      <MemoryRouter>
        <FivePrinciples />
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

  it("renders the Table of Contents with links to principles", () => {
    const toc = screen.getByText(
      methodsFivePrinciples.contentOverviewTitle,
    ).parentElement;
    expect(toc).toBeInTheDocument();
    expect(
      within(toc!).getByRole("link", { name: /Prinzip: Prinzip Test 1/i }),
    ).toBeInTheDocument();
    expect(
      within(toc!).getByRole("link", { name: /Prinzip: Prinzip Test 2/i }),
    ).toBeInTheDocument();
  });

  it("renders the instruction section", () => {
    expect(
      screen.getByRole("heading", {
        name: methodsFivePrinciples.instruction.title,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Als konkrete Umsetzungstipps",
        level: 3,
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
    expect(screen.getByText("Beschreibung für Prinzip 1.")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Prinzip Test 2: Datenminimierung",
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beschreibung für Prinzip 2.")).toBeInTheDocument();
  });

  it("renders the principle example for principles that have one", () => {
    const exampleSection = screen.getByRole("heading", {
      name: /Ein Textbeispiel/,
      level: 3,
    }).parentElement;
    expect(exampleSection).toBeInTheDocument();

    expect(within(exampleSection!).getByText(/§ 42 TestG/)).toBeInTheDocument();
    expect(
      within(exampleSection!).getByText("Titel des Test-Paragraphen"),
    ).toBeInTheDocument();
    expect(
      within(exampleSection!).getByText(
        "(2) Dies ist der Text des Beispiel-Absatzes.",
      ),
    ).toBeInTheDocument();
    const link = within(exampleSection!).getByRole("link", {
      name: "Titel des Test-Regelungsvorhabens",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/beispiele/regelungen/test-regelung");
  });

  it("does not render a principle example for principles without one", () => {
    const exampleHeadings = screen.getAllByRole("heading", {
      name: /Ein Textbeispiel/,
      level: 3,
    });
    expect(exampleHeadings).toHaveLength(1);
  });

  it("renders the 'how to apply' details section for principles", () => {
    const detailsHeading = screen.getAllByRole("heading", {
      name: /So wenden Sie das Prinzip an/i,
      level: 3,
    });
    expect(detailsHeading.length).toBeGreaterThan(0);
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

  it("renders the example inside 'how to apply' when expanded", async () => {
    // The details/summary element is not a button but a heading that controls the expansion
    const detailsHeading = screen.getByRole("heading", {
      name: /So wenden Sie das Prinzip an/i,
      level: 3,
    });

    // Click to expand the details section
    await userEvent.click(detailsHeading);

    // After expanding, the example content should be visible
    expect(screen.getByText(/Beispiel aus § 99 AnwG/i)).toBeInTheDocument();
    expect(screen.getByText("Anwendung Beispieltext.")).toBeInTheDocument();
  });
});
