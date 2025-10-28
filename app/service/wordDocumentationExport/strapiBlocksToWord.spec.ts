import { ExternalHyperlink, Paragraph, TextRun } from "docx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Node } from "../../utils/paragraphUtils";
import strapiBlocksToDocx from "./strapiBlocksToWord";

// This is hoisted and executed before the imports
vi.mock("docx", async (importOriginal) => {
  const {
    Paragraph: OriginalParagraph,
    TextRun: OriginalTestRun,
    ExternalHyperlink: OriginalExternalHyperlink,
    ...originalModule
  } = await importOriginal<typeof import("docx")>();
  return {
    ...originalModule,
    Paragraph: vi.fn(OriginalParagraph),
    TextRun: vi.fn(OriginalTestRun),
    ExternalHyperlink: vi.fn(OriginalExternalHyperlink),
  };
});

const simpleParagraph = (text: string) => ({
  type: "paragraph",
  children: [{ type: "text", text }],
});

describe("strapiBlocksToDocx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("plain text paragraphs", () => {
    it("should convert a simple paragraph to docx", () => {
      const blocks: Node[] = [simpleParagraph("Hello world")];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [new TextRun("Hello world")],
      });
    });

    it("should handle multiple paragraphs", () => {
      const blocks: Node[] = [
        simpleParagraph("First paragraph"),
        simpleParagraph("Second paragraph"),
        simpleParagraph("Third paragraph"),
      ];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(3);
      expect(TextRun).toHaveBeenCalledTimes(3);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("First paragraph")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Second paragraph")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(3, {
        children: [new TextRun("Third paragraph")],
      });
    });

    it("should handle empty blocks array", () => {
      const blocks: Node[] = [];

      const result = strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(0);
      expect(result).toEqual([]);
    });

    it("should handle paragraphs with keepNext", () => {
      const blocks: Node[] = [
        simpleParagraph("Hello world"),
        simpleParagraph("Hello world 2"),
      ];

      strapiBlocksToDocx(blocks);
      expect(Paragraph).toHaveBeenCalledTimes(2);
      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("Hello world")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Hello world 2")],
      });
    });
  });

  describe("links", () => {
    it("should handle links in a paragraph", () => {
      const blocks: Node[] = [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://google.com",
              children: [{ type: "text", text: "Google" }],
            },
            { type: "text", text: " and " },
            {
              type: "link",
              url: "https://github.com",
              children: [{ type: "text", text: "GitHub" }],
            },
          ],
        },
      ];

      strapiBlocksToDocx(blocks);

      expect(ExternalHyperlink).toHaveBeenCalledTimes(2);
      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new ExternalHyperlink({
            children: [new TextRun({ text: "Google", style: "Hyperlink" })],
            link: "https://google.com",
          }),
          new TextRun(" and "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "GitHub", style: "Hyperlink" })],
            link: "https://github.com",
          }),
        ],
      });
    });
  });

  describe("unordered lists", () => {
    it("should handle a simple unordered list", () => {
      const blocks: Node[] = [
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [{ type: "text", text: "First item" }],
            },
            {
              type: "list-item",
              children: [{ type: "text", text: "Second item" }],
            },
          ],
        },
      ];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(2);
      expect(TextRun).toHaveBeenCalledTimes(2);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("First item")],
        numbering: { reference: "bullet-points", level: 0 },
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Second item")],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });
  });

  describe("mixed content", () => {
    it("should handle paragraphs and lists together", () => {
      const blocks: Node[] = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "Introduction" }],
        },
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [{ type: "text", text: "Bullet 1" }],
            },
            {
              type: "list-item",
              children: [{ type: "text", text: "Bullet 2" }],
            },
          ],
        },
        {
          type: "paragraph",
          children: [{ type: "text", text: "Conclusion" }],
        },
      ];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(4);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("Introduction")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Bullet 1")],
        numbering: { reference: "bullet-points", level: 0 },
      });
      expect(Paragraph).toHaveBeenNthCalledWith(3, {
        children: [new TextRun("Bullet 2")],
        numbering: { reference: "bullet-points", level: 0 },
      });
      expect(Paragraph).toHaveBeenNthCalledWith(4, {
        children: [new TextRun("Conclusion")],
      });
    });

    it("should handle links in list items", () => {
      const blocks: Node[] = [
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [
                { type: "text", text: "Visit " },
                {
                  type: "link",
                  url: "https://google.com",
                  children: [{ type: "text", text: "Google" }],
                },
              ],
            },
          ],
        },
      ];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(1);

      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new TextRun("Visit "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "Google", style: "Hyperlink" })],
            link: "https://google.com",
          }),
        ],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });
  });

  describe("complex scenarios", () => {
    it("should handle a realistic documentation example", () => {
      const blocks: Node[] = [
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Dokumentation der Digitaltauglichkeit" },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Dies ist ein Beispiel mit Informationen." },
          ],
        },
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [
                { type: "text", text: "Erste Aufgabe: Lesen Sie die " },
                {
                  type: "link",
                  url: "https://example.com",
                  children: [{ type: "text", text: "Dokumentation" }],
                },
              ],
            },
            {
              type: "list-item",
              children: [
                { type: "text", text: "Zweite Aufgabe: Kontaktieren Sie " },
                {
                  type: "link",
                  url: "mailto:support@example.com",
                  children: [{ type: "text", text: "support@example.com" }],
                },
              ],
            },
            {
              type: "list-item",
              children: [
                { type: "text", text: "Wichtig: Beachten Sie alle Hinweise" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Weitere Informationen finden Sie auf " },
            {
              type: "link",
              url: "https://example.com",
              children: [{ type: "text", text: "unserer Website" }],
            },
            { type: "text", text: "." },
          ],
        },
      ];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(6);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(3);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("Dokumentation der Digitaltauglichkeit")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Dies ist ein Beispiel mit Informationen.")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(3, {
        children: [
          new TextRun("Erste Aufgabe: Lesen Sie die "),
          new ExternalHyperlink({
            children: [
              new TextRun({ text: "Dokumentation", style: "Hyperlink" }),
            ],
            link: "https://example.com",
          }),
        ],
        numbering: { reference: "bullet-points", level: 0 },
      });
      expect(Paragraph).toHaveBeenNthCalledWith(6, {
        children: [
          new TextRun("Weitere Informationen finden Sie auf "),
          new ExternalHyperlink({
            children: [
              new TextRun({ text: "unserer Website", style: "Hyperlink" }),
            ],
            link: "https://example.com",
          }),
          new TextRun("."),
        ],
      });
    });

    it("should skip empty text nodes", () => {
      const blocks: Node[] = [
        {
          type: "paragraph",
          children: [
            { type: "text", text: "" },
            { type: "text", text: "Non-empty" },
          ],
        },
      ];

      strapiBlocksToDocx(blocks);

      expect(Paragraph).toHaveBeenCalledTimes(1);
      // Empty text nodes are skipped, so only one TextRun is created
      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledWith("Non-empty");
    });
  });
});
