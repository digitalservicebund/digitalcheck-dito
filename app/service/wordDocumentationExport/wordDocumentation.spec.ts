import { HeadingLevel, PatchType, TextRun } from "docx";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { DocumentationData } from "~/routes/dokumentation/documentationDataSchema";
import type { Node } from "~/utils/paragraphUtils";
import { PrinzipWithAspekte } from "~/utils/strapiData.server";
import {
  buildAspectParagraphs,
  buildPrinciplePatches,
  indentOptions,
  stringToTextRuns,
  toParagraphPatch,
} from "./wordDocumentation";

const { placeholderOptional } = documentationDocument;
const { principlePages } = digitalDocumentation;
const [POSITIVE_ANSWER, NEGATIVE_ANSWER, IRRELEVANT_ANSWER] =
  principlePages.radioOptions;

type TextRunOptions = { text: string; break?: number };
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

type BookmarkOptions = {
  id: string;
  children: unknown[];
};
type BookmarkLike = {
  type: "Bookmark";
} & BookmarkOptions;

// Helper function to access the paragraph mock objects without TS errors
const asTextRunLike = (textRun: unknown): TextRunLike => textRun as TextRunLike;
const asParagraphLike = (paragraph: unknown): ParagraphLike =>
  paragraph as ParagraphLike;
const asBookmarkLike = (bookmark: unknown): BookmarkLike =>
  bookmark as BookmarkLike;

const getTextFromTextRun = (textRun: unknown): string =>
  asTextRunLike(textRun).text;
const getTextFromParagraph = (paragraph: unknown): string =>
  getTextFromTextRun(asParagraphLike(paragraph).children[0]);
const getTextFromBookmark = (bookmark: unknown): string =>
  getTextFromTextRun(
    asBookmarkLike(asParagraphLike(bookmark).children[0]).children[0],
  );

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

  class ParagraphMock {
    type = "Paragraph";
    constructor(options: ParagraphOptions = { children: [] }) {
      Object.assign(this, options);
    }
  }

  class BookmarkMock {
    type = "Bookmark";
    constructor(options: BookmarkOptions) {
      Object.assign(this, options);
    }
  }

  return {
    ...module,
    TextRun: vi.fn(TextRunMock),
    Paragraph: vi.fn(ParagraphMock),
    Bookmark: vi.fn(BookmarkMock),
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
      },
      {
        Titel: "Aspect P1A2",
        Kurzbezeichnung: "P1A2",
        Beschreibung: "",
        Text: [makeNode("P1A2 TEXT")],
      },
    ],
  },
  {
    documentId: "p2",
    Name: "Principle Two",
    Beschreibung: [makeNode("DESC2")],
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
      },
      {
        Titel: "Aspect P2A2",
        Kurzbezeichnung: "P2A2",
        Beschreibung: "",
        Text: [makeNode("P2A2 TEXT")],
      },
    ],
  },
];

describe("wordDocumentation", () => {
  beforeEach(() => {
    // Clear all mocks before each test to reset call counts
    vi.clearAllMocks();
  });

  describe("builds complete patches for principles and aspects in order", () => {
    // test a few parts, not exhaustive
    const answers: DocumentationData["principles"] = [
      {
        id: "p1",
        answer: IRRELEVANT_ANSWER,
        reasoning: "r1",
      },
      {
        id: "p2",
        answer: POSITIVE_ANSWER,
        reasoning: [
          { aspect: "p2a1", paragraphs: "p1", reason: "r1" },
          { aspect: "p2a2", paragraphs: "p2", reason: "r2" },
        ],
      },
    ];
    const patches = buildPrinciplePatches(prinzips, answers);

    it("creates the correct number of patches", () => {
      expect(Object.keys(patches)).toHaveLength(2 * 5);
    });

    it("creates the correct patches for principle 1", () => {
      const p1title = patches["PRINCIPLE_1_TITLE"].children[0];
      expect(asParagraphLike(p1title).heading).toBe(HeadingLevel.HEADING_1);
      expect(getTextFromBookmark(p1title)).toBe("Principle One");
      const p1description = patches["PRINCIPLE_1_DESCRIPTION"].children[0];
      expect(getTextFromParagraph(p1description)).toBe("DESC1");
      const p1answer = patches["PRINCIPLE_1_ANSWER"].children[0];
      expect(getTextFromTextRun(p1answer)).toBe("Nicht relevant");
      const p1reasoning = patches["PRINCIPLE_1_REASONING"].children[0];
      expect(getTextFromTextRun(p1reasoning)).toBe("r1");
    });

    it("creates the correct patches for principle 1 aspect1", () => {
      const p1aspects = patches["PRINCIPLE_1_ASPECTS"].children;
      const p1aspect1title = p1aspects[0];
      expect(asParagraphLike(p1aspect1title).heading).toBe(
        HeadingLevel.HEADING_2,
      );
      expect(getTextFromBookmark(p1aspect1title)).toBe("Aspect P1A1");
      expect(getTextFromParagraph(p1aspects[1])).toBe("P1A1 TEXT");
      expect(getTextFromTextRun(p1aspects[2])).toBe("Paragrafen");
      expect(getTextFromTextRun(p1aspects[3])).toBe(placeholderOptional);
      expect(getTextFromTextRun(p1aspects[4])).toBe("Erläuterung");
      expect(getTextFromParagraph(p1aspects[5])).toBe(placeholderOptional);
    });

    it("creates the correct patches for principle 2", () => {
      const p2title = patches["PRINCIPLE_2_TITLE"].children[0];
      expect(asParagraphLike(p2title).heading).toBe(HeadingLevel.HEADING_1);
      expect(getTextFromBookmark(p2title)).toBe("Principle Two");
      const p2description = patches["PRINCIPLE_2_DESCRIPTION"].children[0];
      expect(getTextFromParagraph(p2description)).toBe("DESC2");
      const p2answer = patches["PRINCIPLE_2_ANSWER"].children[0];
      expect(getTextFromTextRun(p2answer)).toBe("Ja, gänzlich oder teilweise");
      const p2reasoning = patches["PRINCIPLE_2_REASONING"].children[0];
      expect(getTextFromTextRun(p2reasoning)).toBe(placeholderOptional);
    });

    it("creates the correct patches for principle 2 aspect 2", () => {
      const p2aspects = patches["PRINCIPLE_2_ASPECTS"].children;
      const p2aspect2title = p2aspects[6];
      expect(asParagraphLike(p2aspect2title).heading).toBe(
        HeadingLevel.HEADING_2,
      );
      expect(getTextFromBookmark(p2aspect2title)).toBe("Aspect P2A2");
      expect(getTextFromParagraph(p2aspects[7])).toBe("P2A2 TEXT");
      expect(getTextFromTextRun(p2aspects[8])).toBe("Paragrafen");
      expect(getTextFromTextRun(p2aspects[9])).toBe("p2");
      expect(getTextFromTextRun(p2aspects[10])).toBe("Erläuterung");
      expect(getTextFromParagraph(p2aspects[11])).toBe("r2");
    });

    it("creates the correct patches for principle 2 own explanation", () => {
      const p2aspects = patches["PRINCIPLE_2_ASPECTS"].children;
      const p2ownexplanation = p2aspects[12];
      expect(asParagraphLike(p2ownexplanation).heading).toBe(
        HeadingLevel.HEADING_2,
      );
      expect(getTextFromParagraph(p2ownexplanation)).toBe("Eigener Punkt");
      expect(getTextFromTextRun(p2aspects[13])).toBe("Paragrafen");
      expect(getTextFromTextRun(p2aspects[14])).toBe(placeholderOptional);
      expect(getTextFromTextRun(p2aspects[15])).toBe("Erläuterung");
      expect(getTextFromParagraph(p2aspects[16])).toBe(placeholderOptional);
    });
  });

  describe("placeholder logic", () => {
    it("correctly replaces patches with placeholders where needed", () => {
      const answers: DocumentationData["principles"] = [
        {
          id: "p2",
          answer: NEGATIVE_ANSWER,
          reasoning: "r2",
        },
      ];
      const patches = buildPrinciplePatches(prinzips, answers);

      const p1answer = patches["PRINCIPLE_1_ANSWER"].children[0];
      // leaves all answer options for principle 1
      expect(getTextFromTextRun(p1answer)).toBe(
        "Ja, gänzlich oder teilweise | Nein | Nicht relevant",
      );
      const p1reasoning = patches["PRINCIPLE_1_REASONING"].children[0];
      expect(getTextFromTextRun(p1reasoning)).toBe(placeholderOptional);

      const p2answer = patches["PRINCIPLE_2_ANSWER"].children[0];
      expect(getTextFromTextRun(p2answer)).toBe("Nein");
      const p2reasoning = patches["PRINCIPLE_2_REASONING"].children[0];
      expect(getTextFromTextRun(p2reasoning)).toBe("r2");
      // puts the placeholder for the aspects as the answer was negative
      const p2aspects = patches["PRINCIPLE_2_ASPECTS"].children[3];
      expect(getTextFromTextRun(p2aspects)).toBe(placeholderOptional);
    });

    it("fills principle reasoning with placeholder when answer is positive", () => {
      const answers: DocumentationData["principles"] = [
        {
          id: "p1",
          answer: POSITIVE_ANSWER,
          reasoning: "negative reasoning",
        },
      ];
      const patches = buildPrinciplePatches(prinzips, answers);
      const p1answer = patches["PRINCIPLE_1_ANSWER"].children[0];
      expect(getTextFromTextRun(p1answer)).toBe("Ja, gänzlich oder teilweise");
      const p1reasoning = patches["PRINCIPLE_1_REASONING"].children[0];
      expect(getTextFromTextRun(p1reasoning)).toBe(placeholderOptional);
    });

    it("fills aspects with placeholders when answer is negative or not given", () => {
      const answers: DocumentationData["principles"] = [
        {
          id: "p1",
          answer: NEGATIVE_ANSWER,
          reasoning: "negative reasoning",
        },
      ];
      const patches = buildPrinciplePatches(prinzips, answers);

      // principle 1: answer negative
      const p1a1paragraph = patches["PRINCIPLE_1_ASPECTS"].children[3];
      expect(getTextFromTextRun(p1a1paragraph)).toBe(placeholderOptional);
      const p1a1reasoning = patches["PRINCIPLE_1_ASPECTS"].children[5];
      expect(getTextFromParagraph(p1a1reasoning)).toBe(placeholderOptional);
      const p1a2paragraph = patches["PRINCIPLE_1_ASPECTS"].children[9];
      expect(getTextFromTextRun(p1a2paragraph)).toBe(placeholderOptional);
      const p1a2reasoning = patches["PRINCIPLE_1_ASPECTS"].children[11];
      expect(getTextFromParagraph(p1a2reasoning)).toBe(placeholderOptional);

      // principle 2: answer not given
      const p2a1paragraph = patches["PRINCIPLE_2_ASPECTS"].children[3];
      expect(getTextFromTextRun(p2a1paragraph)).toBe(placeholderOptional);
      const p2a1reasoning = patches["PRINCIPLE_2_ASPECTS"].children[5];
      expect(getTextFromParagraph(p2a1reasoning)).toBe(placeholderOptional);
      const p2a2paragraph = patches["PRINCIPLE_2_ASPECTS"].children[9];
      expect(getTextFromTextRun(p2a2paragraph)).toBe(placeholderOptional);
      const p2a2reasoning = patches["PRINCIPLE_2_ASPECTS"].children[11];
      expect(getTextFromParagraph(p2a2reasoning)).toBe(placeholderOptional);
    });
  });

  describe("bookmarks", () => {
    const answers: DocumentationData["principles"] = [
      { id: "p1", answer: NEGATIVE_ANSWER, reasoning: "Darum" },
    ];
    const patches = buildPrinciplePatches(prinzips, answers);

    it("creates principle title as a bookmark", () => {
      const titleParagraph = asParagraphLike(
        patches["PRINCIPLE_1_TITLE"].children[0],
      );
      expect(titleParagraph.heading).toBe(HeadingLevel.HEADING_1);
      const titleChild = asBookmarkLike(titleParagraph.children[0]);
      expect(titleChild.type).toBe("Bookmark");
      expect(titleChild.id).toBe("principle-one");
      const titleChildText = asTextRunLike(titleChild.children[0]);
      expect(titleChildText.type).toBe("TextRun");
      expect(titleChildText.text).toBe("Principle One");
    });

    it("creates aspect title as a bookmark", () => {
      const aspectParagraph = asParagraphLike(
        patches["PRINCIPLE_1_ASPECTS"].children[0],
      );
      expect(aspectParagraph.heading).toBe(HeadingLevel.HEADING_2);
      const aspectChild = asBookmarkLike(aspectParagraph.children[0]);
      expect(aspectChild.type).toBe("Bookmark");
      expect(aspectChild.id).toBe("aspect-p1a1");
      expect(aspectChild.children).toHaveLength(1);
      const aspectChildText = asTextRunLike(aspectChild.children[0]);
      expect(aspectChildText.type).toBe("TextRun");
      expect(aspectChildText.text).toBe("Aspect P1A1");
    });

    it("does not create own explanation title as a bookmark", () => {
      const ownExplanationParagraph = asParagraphLike(
        patches["PRINCIPLE_1_ASPECTS"].children[12],
      );
      expect(ownExplanationParagraph.heading).toBe(HeadingLevel.HEADING_2);
      const ownExplanationChildText = asTextRunLike(
        ownExplanationParagraph.children[0],
      );
      expect(ownExplanationChildText.type).toBe("TextRun");
      expect(ownExplanationChildText.text).toBe("Eigener Punkt");
    });
  });

  describe("own reasonings", () => {
    const { ownExplanationTitle } = principlePages.explanationFields;

    it("adds a placeholder when none provided", () => {
      const answersNoOwn: DocumentationData["principles"] = [
        {
          id: "p1",
          answer: POSITIVE_ANSWER,
          reasoning: [{ aspect: "p1a1", paragraphs: "p1", reason: "r1" }],
        },
      ];
      const patchesNoOwn = buildPrinciplePatches(prinzips, answersNoOwn);
      const aspectsChildrenNoOwn = patchesNoOwn["PRINCIPLE_1_ASPECTS"].children;
      const ownHeading = aspectsChildrenNoOwn[12];
      expect(getTextFromParagraph(ownHeading)).toBe(ownExplanationTitle);
      const ownExplanationText = aspectsChildrenNoOwn[16];
      expect(getTextFromParagraph(ownExplanationText)).toBe(
        placeholderOptional,
      );
    });

    it("adds multiple when provided", () => {
      const answersWithOwn: DocumentationData["principles"] = [
        {
          id: "p1",
          answer: POSITIVE_ANSWER,
          reasoning: [
            { aspect: "p1a1", paragraphs: "p", reason: "r" },
            { paragraphs: "1", reason: "Own r1" },
            { paragraphs: "2", reason: "Own r2" },
          ],
        },
      ];
      const patchesWithOwn = buildPrinciplePatches(prinzips, answersWithOwn);

      const aspectsChildrenWithOwn =
        patchesWithOwn["PRINCIPLE_1_ASPECTS"].children;
      // own explanation 1
      const ownHeading1 = aspectsChildrenWithOwn[12];
      expect(getTextFromParagraph(ownHeading1)).toBe(ownExplanationTitle);
      const ownParagraphs1 = aspectsChildrenWithOwn[14];
      expect(getTextFromTextRun(ownParagraphs1)).toBe("1");
      const ownReasoning1 = aspectsChildrenWithOwn[16];
      expect(getTextFromParagraph(ownReasoning1)).toBe("Own r1");
      // own explanation 2
      const ownHeading2 = aspectsChildrenWithOwn[17];
      expect(getTextFromParagraph(ownHeading2)).toBe(ownExplanationTitle);
      const ownParagraphs2 = aspectsChildrenWithOwn[19];
      expect(getTextFromTextRun(ownParagraphs2)).toBe("2");
      const ownReasoning2 = aspectsChildrenWithOwn[21];
      expect(getTextFromParagraph(ownReasoning2)).toBe("Own r2");
    });
  });

  describe("formatting", () => {
    it("stringToTextRuns splits answers with newlines into TextRuns with breaks", () => {
      const runs = stringToTextRuns("line1\nline2\nline3");
      expect(runs).toHaveLength(3);
      expect(TextRun).toHaveBeenCalledTimes(3);
      expect(TextRun).toHaveBeenCalledWith({ text: "line1", break: 0 });
      expect(TextRun).toHaveBeenCalledWith({ text: "line2", break: 1 });
      expect(TextRun).toHaveBeenCalledWith({ text: "line3", break: 1 });
    });

    it("toParagraphPatch converts a multiline string into TextRuns with breaks", () => {
      const paraPatch = toParagraphPatch("a\nb");
      expect(paraPatch.type).toBe(PatchType.PARAGRAPH);
      expect(TextRun).toHaveBeenCalledTimes(2);
      expect(TextRun).toHaveBeenCalledWith({ text: "a", break: 0 });
      expect(TextRun).toHaveBeenCalledWith({ text: "b", break: 1 });
    });

    it("indents aspect and reasoning paragraphs", () => {
      const reasoningParagraphs = buildAspectParagraphs(
        {
          paragraphs: "P",
          reason: "R",
        },
        {
          Titel: "T",
          Kurzbezeichnung: "",
          Beschreibung: "",
          Text: [makeNode("TXT")],
        },
      );

      reasoningParagraphs.forEach((reasoningParagraph) => {
        expect(asParagraphLike(reasoningParagraph).indent).toBe(
          indentOptions.indent,
        );
      });
    });
  });
});
