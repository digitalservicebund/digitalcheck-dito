import { type IRunOptions, PatchType, TextRun } from "docx";
import { describe, expect, it, vi } from "vitest";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { type DocumentationData } from "~/routes/dokumentation/documentationDataSchema";
import type { Node } from "~/utils/paragraphUtils";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types";
import {
  buildPrinciplePatches,
  stringToTextRuns,
  toHyperlinkPatch,
  toParagraphPatch,
} from "./wordDocumentationV2";

const { placeholderOptional } = documentationDocument;
const { principlePages } = digitalDocumentation;
const [POSITIVE_ANSWER, NEGATIVE_ANSWER, IRRELEVANT_ANSWER] =
  principlePages.radioOptions;

type TextRunOptions = { text: string; break?: number; options?: IRunOptions };
type TextRunLike = {
  type: "TextRun";
} & TextRunOptions;

type ParagraphOptions = {
  text?: string;
  heading?: unknown;
  indent?: { left?: number };
  style?: string;
  children: unknown[];
};
type ParagraphLike = {
  type: "Paragraph";
} & ParagraphOptions;

type ExternalHyperlinkOptions = {
  children: TextRunLike[];
  link: string;
};
type ExternalHyperlinkLike = {
  type: "ExternalHyperlink";
} & ExternalHyperlinkOptions;

const asTextRunLike = (textRun: unknown): TextRunLike => textRun as TextRunLike;
const asParagraphLike = (paragraph: unknown): ParagraphLike =>
  paragraph as ParagraphLike;
const asExternalHyperlinkLike = (hyperlink: unknown): ExternalHyperlinkLike =>
  hyperlink as ExternalHyperlinkLike;

const getTextFromTextRun = (textRun: unknown): string =>
  asTextRunLike(textRun).text;
const getTextFromHyperlink = (hyperlink: unknown): string => {
  return getTextFromTextRun(
    asExternalHyperlinkLike(asParagraphLike(hyperlink).children[0]),
  );
};

// Mock docx with lightweight test doubles exposing constructor options
vi.mock("docx", async (importOriginal) => {
  const module = await importOriginal<typeof import("docx")>();

  class TextRunMock {
    type = "TextRun";
    text: string;
    break: number;
    constructor(options: TextRunOptions | string) {
      if (typeof options === "string") {
        this.text = options;
        this.break = 0;
      } else {
        this.text = options.text;
        this.break = options.break ?? 0;
      }
    }
  }

  const defaultParagraphOptions: ParagraphOptions = { children: [] };

  class ParagraphMock {
    type = "Paragraph";
    constructor(options: ParagraphOptions = defaultParagraphOptions) {
      Object.assign(this, options);
    }
  }

  class ExternalHyperlinkMock {
    type = "ExternalHyperlink";
    constructor(options: ExternalHyperlinkOptions) {
      Object.assign(this, options);
    }
  }

  return {
    ...module,
    TextRun: vi.fn(TextRunMock),
    Paragraph: vi.fn(ParagraphMock),
    ExternalHyperlink: vi.fn(ExternalHyperlinkMock),
  };
});

const makeNode = (text: string): Node => ({
  type: "paragraph",
  children: [{ type: "text", text }],
});

const prinzips: PrinzipWithAspekte[] = [
  {
    documentId: "p1",
    Name: "Principle One",
    Beschreibung: [makeNode("DESC1")],
    Hilfetext: [makeNode("DESC1")],
    Nummer: 1,
    order: 1,
    URLBezeichnung: "principle-one",
    Kurzbezeichnung: "P1",
    Aspekte: [
      {
        Titel: "Aspect P1A1",
        Kurzbezeichnung: "P1A1",
        Beschreibung: "",
        Text: [makeNode("P1A1 TEXT")],
        Nummer: "",
        Anwendung: [],
      },
      {
        Titel: "Aspect P1A2",
        Kurzbezeichnung: "P1A2",
        Beschreibung: "",
        Text: [makeNode("P1A2 TEXT")],
        Nummer: "",
        Anwendung: [],
      },
    ],
  },
  {
    documentId: "p2",
    Name: "Principle Two",
    Beschreibung: [makeNode("DESC2")],
    Hilfetext: [makeNode("DESC2")],
    Nummer: 2,
    order: 2,
    URLBezeichnung: "principle-two",
    Kurzbezeichnung: "P2",
    Aspekte: [
      {
        Titel: "Aspect P2A1",
        Kurzbezeichnung: "P2A1",
        Beschreibung: "",
        Text: [makeNode("P2A1 TEXT")],
        Nummer: "",
        Anwendung: [],
      },
      {
        Titel: "Aspect P2A2",
        Kurzbezeichnung: "P2A2",
        Beschreibung: "",
        Text: [makeNode("P2A2 TEXT")],
        Nummer: "",
        Anwendung: [],
      },
    ],
  },
];

describe("wordDocumentationV2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("buildPrinciplePatches", () => {
    const answers: DocumentationData["principles"] = [
      {
        id: "p1",
        answer: IRRELEVANT_ANSWER,
        reasoning: "r1",
        aspects: [],
      },
      {
        id: "p2",
        answer: POSITIVE_ANSWER,
        reasoning: "positive reasoning",
        aspects: ["p2a1", "p2a2"],
      },
    ];
    const patches = buildPrinciplePatches(prinzips, answers);

    it("creates 6 patch keys per principle", () => {
      expect(Object.keys(patches)).toHaveLength(2 * 6);
    });

    it("creates the correct patches for principle 1 (irrelevant)", () => {
      const p1title = patches["PRINCIPLE_1_TITLE"];
      expect(p1title.type).toBe(PatchType.PARAGRAPH);
      expect(getTextFromTextRun(p1title.children[0])).toBe("Principle One");

      const p1answer = patches["PRINCIPLE_1_ANSWER"];
      expect(getTextFromTextRun(p1answer.children[0])).toBe(IRRELEVANT_ANSWER);

      const p1reasoning = patches["PRINCIPLE_1_REASONING"];
      expect(getTextFromTextRun(p1reasoning.children[0])).toBe("r1");

      const p1aspects = patches["PRINCIPLE_1_ASPECTS"];
      expect(getTextFromTextRun(p1aspects.children[0])).toBe(
        placeholderOptional,
      );
    });

    it("creates the correct patches for principle 2 (positive with aspects)", () => {
      const p2answer = patches["PRINCIPLE_2_ANSWER"];
      expect(getTextFromTextRun(p2answer.children[0])).toBe(POSITIVE_ANSWER);

      const p2reasoning = patches["PRINCIPLE_2_REASONING"];
      expect(getTextFromTextRun(p2reasoning.children[0])).toBe(
        "positive reasoning",
      );

      const p2aspects = patches["PRINCIPLE_2_ASPECTS"];
      expect(getTextFromTextRun(p2aspects.children[0])).toBe("P2A1, P2A2");
    });

    it("creates ASPECTS_AVAILABLE with all aspect names", () => {
      const p1available = patches["PRINCIPLE_1_ASPECTS_AVAILABLE"];
      expect(getTextFromTextRun(p1available.children[0])).toBe("P1A1, P1A2");

      const p2available = patches["PRINCIPLE_2_ASPECTS_AVAILABLE"];
      expect(getTextFromTextRun(p2available.children[0])).toBe("P2A1, P2A2");
    });

    it("creates description patches as DOCUMENT type", () => {
      const p1desc = patches["PRINCIPLE_1_DESCRIPTION"];
      expect(p1desc.type).toBe(PatchType.DOCUMENT);

      const p2desc = patches["PRINCIPLE_2_DESCRIPTION"];
      expect(p2desc.type).toBe(PatchType.DOCUMENT);
    });
  });

  describe("placeholder logic", () => {
    it("uses placeholders when no answer is provided", () => {
      const patches = buildPrinciplePatches(prinzips, undefined);

      const p1answer = patches["PRINCIPLE_1_ANSWER"];
      expect(getTextFromTextRun(p1answer.children[0])).toBe(
        principlePages.radioOptions.join(" | "),
      );

      const p1reasoning = patches["PRINCIPLE_1_REASONING"];
      expect(getTextFromTextRun(p1reasoning.children[0])).toBe(
        placeholderOptional,
      );

      const p1aspects = patches["PRINCIPLE_1_ASPECTS"];
      expect(getTextFromTextRun(p1aspects.children[0])).toBe(
        placeholderOptional,
      );
    });

    it("uses placeholder for aspects when answer is negative", () => {
      const answers: DocumentationData["principles"] = [
        {
          id: "p1",
          answer: NEGATIVE_ANSWER,
          reasoning: "negative reasoning",
          aspects: [],
        },
      ];
      const patches = buildPrinciplePatches(prinzips, answers);

      const p1aspects = patches["PRINCIPLE_1_ASPECTS"];
      expect(getTextFromTextRun(p1aspects.children[0])).toBe(
        placeholderOptional,
      );

      const p1reasoning = patches["PRINCIPLE_1_REASONING"];
      expect(getTextFromTextRun(p1reasoning.children[0])).toBe(
        "negative reasoning",
      );
    });

    it("shows only matching aspects for positive answer", () => {
      const answers: DocumentationData["principles"] = [
        {
          id: "p1",
          answer: POSITIVE_ANSWER,
          reasoning: "r",
          aspects: ["p1a1"], // only first aspect selected
        },
      ];
      const patches = buildPrinciplePatches(prinzips, answers);

      const p1aspects = patches["PRINCIPLE_1_ASPECTS"];
      expect(getTextFromTextRun(p1aspects.children[0])).toBe("P1A1");
    });
  });

  describe("hyperlinks", () => {
    it("toHyperlinkPatch creates a paragraph with an email hyperlink", () => {
      const emailAddress = "test@example.com";
      const hyperlinkPatch = toHyperlinkPatch(emailAddress);

      expect(hyperlinkPatch.type).toBe(PatchType.PARAGRAPH);
      expect(hyperlinkPatch.children).toHaveLength(1);

      const hyperlink = asExternalHyperlinkLike(hyperlinkPatch.children[0]);
      expect(hyperlink.type).toBe("ExternalHyperlink");
      expect(hyperlink.link).toBe("mailto:" + emailAddress);
      expect(getTextFromHyperlink(hyperlinkPatch.children[0])).toBe(
        emailAddress,
      );
    });

    it("toHyperlinkPatch applies Hyperlink style to the text runs", () => {
      const emailAddress = "contact@domain.org";
      toHyperlinkPatch(emailAddress);

      expect(TextRun).toHaveBeenCalledWith(
        expect.objectContaining({
          text: emailAddress,
          style: "Hyperlink",
        }),
      );
    });
  });

  describe("formatting", () => {
    it("stringToTextRuns splits with newlines into TextRuns with breaks", () => {
      const runs = stringToTextRuns("line1\nline2\nline3");
      expect(runs).toHaveLength(3);
      expect(TextRun).toHaveBeenCalledWith({ text: "line1", break: 0 });
      expect(TextRun).toHaveBeenCalledWith({ text: "line2", break: 1 });
      expect(TextRun).toHaveBeenCalledWith({ text: "line3", break: 1 });
    });

    it("toParagraphPatch converts a multiline string into TextRuns with breaks", () => {
      const paraPatch = toParagraphPatch("a\nb");
      expect(paraPatch.type).toBe(PatchType.PARAGRAPH);
      expect(TextRun).toHaveBeenCalledWith({ text: "a", break: 0 });
      expect(TextRun).toHaveBeenCalledWith({ text: "b", break: 1 });
    });
  });
});
