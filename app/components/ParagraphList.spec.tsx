import { render, screen } from "@testing-library/react";
import { act } from "react";
import { createRoutesStub } from "react-router";
import { beforeAll, describe, test } from "vitest";
import type { Absatz, FullPrinzip, Paragraph } from "~/utils/strapiData.server";
import ParagraphList from "./ParagraphList";

const PRINZIPS: FullPrinzip[] = [
  {
    documentId: "abc",
    Name: "Digitale Kommunikation sicherstellen",
    Beschreibung: [],
    Nummer: 1,
    GuteUmsetzungen: [],
    URLBezeichnung: "url",
    Kurzbezeichnung: "Digitale Angebote",
    order: 1,
  },
  {
    documentId: "abc",
    Name: "Daten und Standards Wiederverwenden",
    Beschreibung: [],
    Nummer: 2,
    GuteUmsetzungen: [],
    URLBezeichnung: "url",
    Kurzbezeichnung: "Standards",
    order: 2,
  },
  {
    documentId: "abc",
    Name: "Datenschutz und Informationssicherheit",
    Beschreibung: [],
    Nummer: 3,
    GuteUmsetzungen: [],
    URLBezeichnung: "url",
    Kurzbezeichnung: "Datenschutz",
    order: 3,
  },
];

const ABSAETZE: Absatz[] = [
  {
    id: 1,
    Text: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Text" },
          { type: "text", text: "Text mit 1Markierung[1]", underline: true },
          { type: "text", text: "Textohne" },
          { type: "text", text: "Text mit 2Markierung[2]", underline: true },
        ],
      },
    ],
    PrinzipErfuellungen: [
      {
        id: 1,
        Prinzip: PRINZIPS[0],
        WarumGut: [
          {
            type: "paragraph",
            children: [{ type: "text", text: "Darum gut 1" }],
          },
        ],
      },
      {
        id: 2,
        Prinzip: PRINZIPS[1],
        WarumGut: [
          {
            type: "paragraph",
            children: [{ type: "text", text: "Darum gut 2" }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    Text: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Text ohne Markierung" }],
      },
    ],
    PrinzipErfuellungen: [],
  },
  {
    id: 3,
    Text: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Text mit 3Markierung[3]", underline: true },
        ],
      },
    ],
    PrinzipErfuellungen: [
      {
        id: 2,
        Prinzip: PRINZIPS[2],
        WarumGut: [
          {
            type: "paragraph",
            children: [{ type: "text", text: "Darum gut 3" }],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    Text: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Text" },
          { type: "text", text: "mitmit[2]", underline: true },
          { type: "text", text: "mehreren" },
          { type: "text", text: "2Markierungen[2]", underline: true },
        ],
      },
      {
        type: "list",
        format: "ordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "firstChildHighlight[2]",
                underline: true,
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "firstChildHighlight2[2]",
                underline: true,
              },
            ],
          },
        ],
      },
    ],
    PrinzipErfuellungen: [
      {
        id: 2,
        Prinzip: PRINZIPS[1],
        WarumGut: [
          {
            type: "paragraph",
            children: [{ type: "text", text: "Darum gut 2" }],
          },
        ],
      },
    ],
  },
];

const PARAGRAPHS: Paragraph[] = [
  {
    documentId: "abc",
    Nummer: "2",
    Gesetz: "GG",
    Titel: "Titel",
    Artikel: "Artikel",
    // Digitalcheck?: Digitalcheck,
    Absaetze: ABSAETZE,
  },
];

const RouterStubAllPrinciples = createRoutesStub([
  {
    path: "/",
    Component: () =>
      ParagraphList({
        paragraphs: PARAGRAPHS,
        principlesToShow: PRINZIPS,
      }),
  },
]);

const RouterStubFirstPrinciple = createRoutesStub([
  {
    path: "/",
    Component: () =>
      ParagraphList({
        paragraphs: PARAGRAPHS,
        principlesToShow: PRINZIPS.slice(0, 1),
      }),
  },
]);

describe("ParagraphList", () => {
  beforeAll(() => {
    global.innerWidth = 500; // set isMobile to true
  });

  describe("Highlighting", () => {
    test("Has heading with paragraph number and law", () => {
      render(<RouterStubAllPrinciples />);
      expect(screen.getByText("§ 2 GG")).toBeVisible();
    });

    test("Highlight of Prinzip is shown", () => {
      render(<RouterStubAllPrinciples />);
      expect(
        screen.queryByText("Text mit 1Markierung[1]"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Text mit 2Markierung[2]"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Text mit 3Markierung[3]"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("(3) Text mit 3Markierung[3]"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/mitmit\[2\]/)).not.toBeInTheDocument();
      expect(screen.queryByText(/2Markierungen\[2\]/)).not.toBeInTheDocument();
      expect(screen.getByText("Text mit 1Markierung")).toBeVisible();
      expect(screen.getByText("Text mit 2Markierung")).toBeVisible();
      expect(screen.getByText("(3) Text mit 3Markierung")).toBeVisible();
      expect(screen.getByText("mitmit")).toBeVisible();
      expect(screen.getByText("2Markierungen")).toBeVisible();
      expect(screen.getByText("Text mit 1Markierung")).toHaveRole("mark");
      expect(screen.getByText("Text mit 2Markierung")).toHaveRole("mark");
      expect(screen.getByText("(3) Text mit 3Markierung")).toHaveRole("mark");
      expect(screen.getByText("mitmit")).toHaveRole("mark");
      expect(screen.getByText("2Markierungen")).toHaveRole("mark");
    });

    test("Text without underline is not highlighted", () => {
      render(<RouterStubAllPrinciples />);
      expect(screen.getByText(/Textohne/)).not.toHaveRole("mark");
    });

    test("Highlights not shown when no relevant Prinzip", () => {
      render(<RouterStubFirstPrinciple />);
      // custom mark still removed
      expect(screen.queryByText(/\[2\]/)).not.toBeInTheDocument();
      expect(screen.queryByText(/\[3\]/)).not.toBeInTheDocument();
      // underlined elements aren't marks
      expect(screen.getByText(/mit 2Markierung/)).not.toHaveRole("mark");
      expect(screen.getByText("(3) Text mit 3Markierung")).not.toHaveRole(
        "mark",
      );
      expect(screen.getByText(/mitmit/)).not.toHaveRole("mark");
      expect(screen.getByText(/2Markierungen/)).not.toHaveRole("mark");
      // only relevant mark is shown
      expect(screen.getByRole("mark")).toHaveTextContent(
        "Text mit 1Markierung",
      );
    });

    test("Multiple highlights in one Absatz", () => {
      render(<RouterStubAllPrinciples />);
      expect(screen.getByText(/mitmit/)).toBeVisible();
      expect(screen.getByText(/2Markierungen/)).toBeVisible();
      expect(screen.getByText(/mitmit/)).toHaveRole("mark");
      expect(screen.getByText(/2Markierungen/)).toHaveRole("mark");
    });

    test("Highlights have unique IDs", () => {
      render(<RouterStubAllPrinciples />);
      const highlights = screen.getAllByRole("mark");
      const ids = highlights.map((highlight) => highlight.id);
      expect(ids).toHaveLength(new Set(ids).size);
    });
  });

  describe("Collapsed Absaetze", () => {
    test("Absatz 2 without highlights is collapsed", () => {
      render(<RouterStubAllPrinciples />);
      expect(screen.getByText("(2)")).toBeVisible();
      expect(screen.getByText("(2) Text ohne Markierung")).toBeInTheDocument();
      expect(screen.getByText("(2) Text ohne Markierung")).not.toBeVisible();
    });

    test("Absatz 2 through 4 without relevant Prinzip are collapsed", () => {
      render(<RouterStubFirstPrinciple />);
      expect(screen.getByText("(2) – (4)")).toBeVisible();
      expect(screen.getByText("(2) Text ohne Markierung")).toBeInTheDocument();
      expect(screen.getByText("(3) Text mit 3Markierung")).toBeInTheDocument();
      expect(screen.getByText(/mehreren/)).toBeInTheDocument();
      expect(screen.getByText("(2) Text ohne Markierung")).not.toBeVisible();
      expect(screen.getByText("(3) Text mit 3Markierung")).not.toBeVisible();
      expect(screen.getByText(/mehreren/)).not.toBeVisible();
    });
  });

  describe("Reasoning", () => {
    test("Reasoning is shown for Absaetze with PrinzipErfuellungen", () => {
      render(<RouterStubAllPrinciples />);
      expect(
        screen.getAllByText("Warum ist dieses Beispiel gut?"),
      ).toHaveLength(3);
      expect(screen.getByText(`(Prinzip: ${PRINZIPS[0].Name})`)).toBeVisible();

      expect(screen.getByText("Darum gut 1")).toBeVisible();
      expect(
        screen.getAllByText(`(Prinzip: ${PRINZIPS[1].Name})`),
      ).toHaveLength(2);
      expect(screen.getAllByText("Darum gut 2")).toHaveLength(2);
      expect(screen.getByText(`(Prinzip: ${PRINZIPS[2].Name})`)).toBeVisible();

      expect(screen.getByText("Darum gut 3")).toBeVisible();
    });

    test("Reasoning is only shown for relevant Prinzip", () => {
      render(<RouterStubFirstPrinciple />);
      expect(
        screen.getAllByText("Warum ist dieses Beispiel gut?"),
      ).toHaveLength(1);
      expect(screen.getByText(`(Prinzip: ${PRINZIPS[0].Name})`)).toBeVisible();
      expect(
        screen.queryByText(`(Prinzip: ${PRINZIPS[1].Name})`),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`(Prinzip: ${PRINZIPS[2].Name})`),
      ).not.toBeInTheDocument();
    });
  });

  describe("Links between highlights and reasoning", () => {
    test("Clicking on highlight shows explanation and adds backlink", () => {
      render(<RouterStubAllPrinciples />);
      const id = "explanation-1-1";
      const firstHighlight = screen.getByText("Text mit 1Markierung");
      expect(firstHighlight.closest("a")).toHaveAttribute("href", `/#${id}`);

      // clicking on highlight removes highlighting and backlink
      act(() => {
        firstHighlight?.click();
      });
      expect(screen.getByTestId(id)).toHaveClass("border-4");
      const backlink = screen.getByLabelText("Zurück zum Text");
      expect(backlink).toHaveAttribute("href", `/#${firstHighlight?.id}`);
      expect(backlink).toBeVisible();

      // clicking on backlink removes highlighting and backlink
      act(() => {
        screen.getByLabelText("Zurück zum Text").click();
      });
      expect(screen.getByTestId("explanation-1-1")).toHaveClass("border-l-4");
      expect(screen.getByTestId("explanation-1-1")).not.toHaveClass("border-4");
      expect(
        screen.queryByLabelText("Zurück zum Text"),
      ).not.toBeInTheDocument();
    });

    test("Clicking on multiple highlights only highlights one explanation", () => {
      render(<RouterStubAllPrinciples />);
      act(() => {
        screen.getByText("Text mit 1Markierung").click();
        screen.getByText("Text mit 2Markierung").click();
      });
      expect(screen.getByTestId("explanation-1-1")).not.toHaveClass("border-4");
      expect(screen.getByTestId("explanation-1-2")).toHaveClass("border-4");
      expect(screen.getAllByLabelText("Zurück zum Text")).toHaveLength(1);
      act(() => {
        screen.getByLabelText("Zurück zum Text").click();
      });
      // clicking on backlink removes highlighting and backlink
      expect(screen.getByTestId("explanation-1-2")).toHaveClass("border-l-4");
      expect(screen.getByTestId("explanation-1-2")).not.toHaveClass("border-4");
      expect(
        screen.queryByLabelText("Zurück zum Text"),
      ).not.toBeInTheDocument();
    });
  });
});
