import explanationMarkdownRaw from "~/markdown/interoperability/formVariant1-explanations.md?raw";

const interoperabilityLevels = [
  "legal",
  "organizational",
  "semantic",
  "technical",
] as const;

type InteroperabilityLevel = (typeof interoperabilityLevels)[number];

export type InteroperabilityExplanationParagraphs = Record<
  InteroperabilityLevel,
  string
>;

const headingPrefix = "## ";

function isInteroperabilityLevel(
  value: string,
): value is InteroperabilityLevel {
  return interoperabilityLevels.includes(value as InteroperabilityLevel);
}

export function extractExplanationParagraphTexts(
  markdown: string,
): InteroperabilityExplanationParagraphs {
  const parsed = Object.fromEntries(
    interoperabilityLevels.map((level) => [level, ""]),
  ) as InteroperabilityExplanationParagraphs;
  const lines = markdown.split(/\r?\n/);
  let activeLevel: InteroperabilityLevel | undefined;
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (!activeLevel) {
      return;
    }

    const content = buffer.join("\n").trim();
    if (content) {
      parsed[activeLevel] = content;
    }
  };

  for (const line of lines) {
    if (!line.startsWith(headingPrefix)) {
      if (activeLevel) {
        buffer.push(line);
      }
      continue;
    }

    const sectionId = line.slice(headingPrefix.length).trim();
    if (!isInteroperabilityLevel(sectionId)) {
      if (activeLevel) {
        buffer.push(line);
      }
      continue;
    }

    flushBuffer();
    activeLevel = sectionId;
    buffer = [];
  }

  flushBuffer();

  const missingLevels = interoperabilityLevels.filter(
    (level) => !parsed[level],
  );
  if (missingLevels.length > 0) {
    throw new Error(
      `Missing explanation markdown sections: ${missingLevels.join(", ")}`,
    );
  }

  return parsed;
}

export const interoperabilityExplanationParagraphs =
  extractExplanationParagraphTexts(explanationMarkdownRaw);
