import { ExternalHyperlink, Paragraph, TextRun } from "docx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { dedent } from "../dedentMultilineStrings";
import markdown from "./markdownToDocx";

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
    Paragraph: vi.fn((options) => new OriginalParagraph(options)),
    TextRun: vi.fn((options) => new OriginalTestRun(options)),
    ExternalHyperlink: vi.fn(
      (options) => new OriginalExternalHyperlink(options),
    ),
  };
});

describe("markdownToDocx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("plain text", () => {
    it("should convert plain text to a paragraph", () => {
      markdown("Hello world");

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [new TextRun("Hello world")],
      });
    });

    it("should handle multiple plain text lines", () => {
      markdown("Line 1\nLine 2\nLine 3");

      expect(Paragraph).toHaveBeenCalledTimes(3);
      expect(TextRun).toHaveBeenCalledTimes(3);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("Line 1")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Line 2")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(3, {
        children: [new TextRun("Line 3")],
      });
    });

    it("should handle empty string", () => {
      markdown("");

      expect(Paragraph).toHaveBeenCalledTimes(0);
    });
  });

  describe("bold text", () => {
    it("should convert **text** to bold", () => {
      markdown("This is **bold** text");

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledTimes(3);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [
          new TextRun("This is "),
          new TextRun({ text: "bold", bold: true }),
          new TextRun(" text"),
        ],
      });
    });

    it("should handle only bold text", () => {
      markdown("**bold only**");

      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [new TextRun({ text: "bold only", bold: true })],
      });
    });

    it("should handle multiple bold sections", () => {
      markdown("**First** and **Second** bold");

      expect(TextRun).toHaveBeenCalledTimes(4);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [
          new TextRun({ text: "First", bold: true }),
          new TextRun(" and "),
          new TextRun({ text: "Second", bold: true }),
          new TextRun(" bold"),
        ],
      });
    });

    it("should handle consecutive bold sections", () => {
      markdown("**First****Second**");

      expect(TextRun).toHaveBeenCalledTimes(2);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [
          new TextRun({ text: "First", bold: true }),
          new TextRun({ text: "Second", bold: true }),
        ],
      });
    });

    it("should treat unclosed bold markers as plain text", () => {
      markdown("This is **unclosed bold");

      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [new TextRun("This is **unclosed bold")],
      });
    });
  });

  describe("links", () => {
    it("should convert [text](url) to hyperlink", () => {
      markdown("Visit [Google](https://google.com) now");

      expect(TextRun).toHaveBeenCalledTimes(3);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(1);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [
          new TextRun("Visit "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "Google", style: "Hyperlink" })],
            link: "https://google.com",
          }),
          new TextRun(" now"),
        ],
      });
    });

    it("should handle only a link", () => {
      markdown("[Google](https://google.com)");

      // One TextRun inside the hyperlink
      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new ExternalHyperlink({
            children: [new TextRun({ text: "Google", style: "Hyperlink" })],
            link: "https://google.com",
          }),
        ],
      });
    });

    it("should handle multiple links", () => {
      markdown("[Google](https://google.com) and [GitHub](https://github.com)");

      expect(ExternalHyperlink).toHaveBeenCalledTimes(2);

      expect(ExternalHyperlink).toHaveBeenNthCalledWith(1, {
        children: [new TextRun({ text: "Google", style: "Hyperlink" })],
        link: "https://google.com",
      });

      expect(ExternalHyperlink).toHaveBeenNthCalledWith(2, {
        children: [new TextRun({ text: "GitHub", style: "Hyperlink" })],
        link: "https://github.com",
      });
    });

    it("should treat unclosed link syntax as plain text", () => {
      markdown("Visit [Google](incomplete");

      expect(ExternalHyperlink).toHaveBeenCalledTimes(0);
      expect(TextRun).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [new TextRun("Visit [Google](incomplete")],
      });
    });
  });

  describe("combining bold and links", () => {
    it("should handle bold around links", () => {
      markdown("**Bold** then [link](url) then **bold** again");

      expect(ExternalHyperlink).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new TextRun({ text: "Bold", bold: true }),
          new TextRun(" then "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "link", style: "Hyperlink" })],
            link: "url",
          }),
          new TextRun(" then "),
          new TextRun({ text: "bold", bold: true }),
          new TextRun(" again"),
        ],
      });
    });

    it("should handle links around bold", () => {
      markdown("[one](url) then **bold** then [two](url)");

      expect(ExternalHyperlink).toHaveBeenCalledTimes(2);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new ExternalHyperlink({
            children: [new TextRun({ text: "one", style: "Hyperlink" })],
            link: "url",
          }),
          new TextRun(" then "),
          new TextRun({ text: "bold", bold: true }),
          new TextRun(" then "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "two", style: "Hyperlink" })],
            link: "url",
          }),
        ],
      });
    });
  });

  describe("bullet lists", () => {
    it("should handle dash bullet points", () => {
      markdown("- First item\n- Second item");

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

    it("should handle asterisk bullet points", () => {
      markdown("* First item\n* Second item");

      expect(Paragraph).toHaveBeenCalledTimes(2);
      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("First item")],
        numbering: { reference: "bullet-points", level: 0 },
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Second item")],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });

    it("should handle bold text in bullets", () => {
      markdown("- This is **bold** in bullet");

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledTimes(3);

      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new TextRun("This is "),
          new TextRun({ text: "bold", bold: true }),
          new TextRun(" in bullet"),
        ],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });

    it("should handle links in bullets", () => {
      markdown("- Visit [Google](https://google.com)");

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

      expect(ExternalHyperlink).toHaveBeenCalledWith({
        children: [new TextRun({ text: "Google", style: "Hyperlink" })],
        link: "https://google.com",
      });
    });

    it("should handle both bold and links in bullets", () => {
      markdown("- **Bold** text and [link](https://example.com)");

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledTimes(3);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(1);
      expect(Paragraph).toHaveBeenCalledWith({
        children: [
          new TextRun({ text: "Bold", bold: true }),
          new TextRun(" text and "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "link", style: "Hyperlink" })],
            link: "https://example.com",
          }),
        ],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });

    it("should trim whitespace before checking for bullets", () => {
      markdown("   - Indented bullet");

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(TextRun).toHaveBeenCalledWith("Indented bullet");
      expect(Paragraph).toHaveBeenCalledWith({
        children: [new TextRun("Indented bullet")],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });
  });

  describe("empty lines and paragraph breaks", () => {
    it("should skip empty lines", () => {
      markdown("Line 1\n\nLine 2");

      expect(Paragraph).toHaveBeenCalledTimes(2);
      expect(TextRun).toHaveBeenCalledTimes(2);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("Line 1")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Line 2")],
      });
    });

    it("should skip lines with only whitespace", () => {
      markdown("Line 1\n   \n\t\nLine 2");

      expect(Paragraph).toHaveBeenCalledTimes(2);
      expect(TextRun).toHaveBeenCalledTimes(2);

      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [new TextRun("Line 1")],
      });
      expect(Paragraph).toHaveBeenNthCalledWith(2, {
        children: [new TextRun("Line 2")],
      });
    });
  });

  describe("complex scenarios", () => {
    it("should handle all features in one bullet", () => {
      markdown(
        "- **Start** with bold, add [link](https://example.com), and **end** bold",
      );

      expect(Paragraph).toHaveBeenCalledTimes(1);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(1);

      expect(TextRun).toHaveBeenCalledWith({ text: "Start", bold: true });
      expect(TextRun).toHaveBeenCalledWith({ text: "end", bold: true });
      expect(Paragraph).toHaveBeenNthCalledWith(1, {
        children: [
          new TextRun({ text: "Start", bold: true }),
          new TextRun(" with bold, add "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "link", style: "Hyperlink" })],
            link: "https://example.com",
          }),
          new TextRun(", and "),
          new TextRun({ text: "end", bold: true }),
          new TextRun(" bold"),
        ],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });

    it("should handle mixed content with bullets and paragraphs", () => {
      markdown("Introduction\n- Bullet 1\n- Bullet 2\nConclusion");

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

    it("should handle a realistic documentation example", () => {
      const markdownText = dedent`Dokumentation der Digitaltauglichkeit

        Dies ist ein Beispiel mit **wichtigen** Informationen.

        - Erste **Aufgabe**: Lesen Sie die [Dokumentation](https://example.com)
        - Zweite Aufgabe: Kontaktieren Sie [support@example.com](mailto:support@example.com)
        - **Wichtig**: Beachten Sie alle **Hinweise**

        Weitere Informationen finden Sie auf [unserer Website](https://example.com).`;

      markdown(markdownText);

      expect(Paragraph).toHaveBeenCalledTimes(6);
      expect(ExternalHyperlink).toHaveBeenCalledTimes(3);
      expect(Paragraph).toHaveBeenNthCalledWith(3, {
        children: [
          new TextRun("Erste "),
          new TextRun({ text: "Aufgabe", bold: true }),
          new TextRun(": Lesen Sie die "),
          new ExternalHyperlink({
            children: [
              new TextRun({ text: "Dokumentation", style: "Hyperlink" }),
            ],
            link: "https://example.com",
          }),
        ],
        numbering: { reference: "bullet-points", level: 0 },
      });
    });
  });
});
