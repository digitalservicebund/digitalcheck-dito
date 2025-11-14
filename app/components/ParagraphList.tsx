import Heading from "~/components/Heading";
import {
  groupAbsaetzeWithoutRelevantPrinciples,
  prependNumberToAbsatz,
} from "~/utils/paragraphUtils";
import type {
  BaseAbsatz,
  Paragraph,
  PrinzipWithBeispielvorhaben,
} from "~/utils/strapiData.server";
import Absatz from "./Absatz";
import { BlocksRenderer } from "./BlocksRenderer";
import DetailsSummary from "./DetailsSummary";
import PrincipleHighlightModifier from "./PrincipleHighlightModifier";

/*
 Notes
 =====
 - In general, the architecture is deeply nested mirroring the way a law is structured and: law > Paragraphs > Absaetze (> Saetze)
   - The text content of the Absaetze comes from Strapi in a proprietary blocks content format with recursively nested nodes
   - These nodes represent text elements (paragraphs, lists, list items, text, ...)
   - We render these nodes using our own recursive BlocksRenderer instead of relying on the "official" one,
     because we use a hacky convention for highlighting good principles in the text (underlines followed by a number in brackets [1])
     and need to replace these nodes and their text with Highlights
   - The architecture below sketches repeated components exemplary through multiple occurrences.
 - principlesToShow (relevant principles) are the ones that should be highlighted on a page.
   - This could be all of them for a single law page or just one of them for a principle page.
   - The architecture is designed to also support subsets for future filtering.
 - It probably helps to look at the example pages while reading the code.

 Architecture
 ============
 ParagraphList
 │ Renders a list of Paragraphs.
 ├─ Props: list of Paragraphs, list of Principles to show
 ├─ Processing: Sorts Paragraphs into correct order.
 |
 ├── Paragraph
 │    │ Renders all Absaetze of a Paragraph. Only displays if it contains Absaetze with relevant principles.
 │    ├─ Props: Paragraph, list of Principles to show
 │    ├─ Processing: Creates an array of Absaetze (<Absatz />) with relevant Principles and groups of Absaetze without (<AbsatzGroupWithoutErfuellungen />).
 │    │
 │    ├── Absatz
 │    │    │ Renders an Absatz with relevant Principles, highlights and matching explanations.
 │    │    ├─ Props: Absatz to be shown, Principles to show, useAnchorLinks (boolean)
 │    │    ├─ Context provided: absatzId, principlesToShow, useAnchorLinks
 │    │    ├─ Processing: Adds the number of the Absatz to the text.
 │    │    │
 │    │    ├── BlocksRenderer (with modifiers: { underline: PrincipleHighlightModifier })
 │    │    │    │ Recursively renders the nested nodes of a Strapi text block.
 │    │    │    │ Based on the modifier, renders underlined text as PrincipleHighlights.
 │    │    │    │
 │    │    │    ├─── PrincipleHighlight
 │    │    │    │     │ Highlights a passage of text and provides a link to the explanation if the highlight is of a relevant principle.
 │    │    │    │     │ Otherwise, just return plain text.
 │    │    │    │     ├─ Context consumed: principlesToShow, setActiveHighlight, absatzId, useAnchorLinks
 │    │    │    │     └─ onClick: setActiveHighlight to this PrincipleHighlight
 │    │    │    │
 │    │    │    └─── PrincipleHighlight ...
 │    │    │
 │    │    └── PrincipleExplanationList
 │    │         │ Renders a list of PrincipleExplanation
 │    │         │
 │    │         ├── PrincipleExplanation
 │    │         │    │ Renders an explanation for a PrinzipErfuellung.
 │    │         │    │ Creates a link that refers to the clicked highlight.
 │    │         │    ├─ Context consumed: absatzId, activeHighlight, setActiveHighlight
 │    │         │    └─ onClick: setActiveHighlight to null
 │    │         │
 │    │         └── PrincipleExplanation ...
 │    │
 │    ├── AbsatzGroupWithoutErfuellungen
 │    │    │ Renders a group of Absaetze without relevant principles as a collapsible section.
 │    │    ├─ Processing: prependNumberToAbsatz()
 │    │    │
 │    │    ├── BlocksRenderer (with modifiers: { underline: PrincipleHighlight })
 │    │    │    │
 │    │    │    └─ PrincipleHighlight 
 │    │    │       │ Only used to remove the bracketed numbers (e.g. [1]) from the text in this case.
 │    │    │
 │    │    └── BlocksRenderer ...
 │    │
 │    ├── Absatz ...
 │    ├── AbsatzGroupWithoutErfuellungen ...
 │    └── Absatz ...
 │
 ├── Paragraph ...
 └── Paragraph ...

 HIGHLIGHT INTERACTION FLOW
 ==========================
 ┌─────────────────────────────────────────────────────────────────┐
 │  1. User clicks highlighted link (PrincipleHighlight)           │
 │  2. setActiveHighlight() in PrincipleHighlightModifier          │
 │  3. Navigate to #explanationID (soft scroll)                    │
 │  4. PrincipleExplanation detects shouldHighlight = true         │
 │  5. Gets border and shows arrow back button                     │
 │  6. User clicks back button                                     │
 │  7. setActiveHighlight(null) + navigate to #activeHighlight     │
 │  8. Soft scroll back to original highlighted text               │
 └─────────────────────────────────────────────────────────────────┘
 */

export default function ParagraphList({
  paragraphs,
  principlesToShow,
}: Readonly<{
  paragraphs: Paragraph[];
  principlesToShow: PrinzipWithBeispielvorhaben[];
}>) {
  return (
    <div className="space-y-32">
      {paragraphs
        .toSorted((a, b) =>
          a.Nummer.localeCompare(b.Nummer, "de-DE", { numeric: true }),
        )
        .map((paragraph) => (
          <Paragraph
            key={paragraph.documentId}
            paragraph={paragraph}
            principlesToShow={principlesToShow}
          />
        ))}
    </div>
  );
}

function Paragraph({
  paragraph,
  principlesToShow,
}: Readonly<{
  paragraph: Paragraph;
  principlesToShow: PrinzipWithBeispielvorhaben[];
}>) {
  const groupedAbsaetze = groupAbsaetzeWithoutRelevantPrinciples(
    paragraph.Absaetze,
    principlesToShow,
  );

  // If there are no Absätze with relevant principles, don't show the paragraph
  if (groupedAbsaetze.every((absatzGroup) => absatzGroup instanceof Array))
    return null;

  // renders the interlaced Absaetze with relevant PrinzipErfuellungen and grouped Absaetze without relevant PrinzipErfuellungen
  return (
    <div key={paragraph.Nummer} className="space-y-24 md:space-y-32">
      <Heading tagName="h3" className="ds-label-01-bold flex flex-col gap-8">
        <span>{`§ ${paragraph.Nummer} ${paragraph.Gesetz}`}</span>{" "}
        <span>{paragraph.Titel}</span>
      </Heading>

      <div className="space-y-24 md:space-y-32">
        {groupedAbsaetze.map((absatzOrAbsatzGroup) => {
          const isAbsatzGroupWithoutErfuellungen =
            Array.isArray(absatzOrAbsatzGroup);

          if (isAbsatzGroupWithoutErfuellungen)
            return (
              <AbsatzGroupWithoutErfuellungen
                key={absatzOrAbsatzGroup[0].documentId}
                absatzGroup={absatzOrAbsatzGroup}
              />
            );

          return (
            <Absatz
              key={absatzOrAbsatzGroup.documentId}
              absatz={absatzOrAbsatzGroup}
              principlesToShow={principlesToShow}
              useAnchorLinks
            />
          );
        })}
      </div>
    </div>
  );
}

type AbsatzGroupWithoutErfuellungenProps = {
  absatzGroup: BaseAbsatz[];
};

function AbsatzGroupWithoutErfuellungen({
  absatzGroup,
}: Readonly<AbsatzGroupWithoutErfuellungenProps>) {
  const getAbsatzGroupTitle = (absatzGroup: BaseAbsatz[]) =>
    absatzGroup.length > 1
      ? `(${absatzGroup[0].Nummer}) – (${absatzGroup[absatzGroup.length - 1].Nummer})`
      : `(${absatzGroup[0].Nummer})`;

  return (
    <DetailsSummary
      key={absatzGroup[0].Nummer}
      title={getAbsatzGroupTitle(absatzGroup)}
      bold={false}
      className="italic"
    >
      <div className="ds-stack ds-stack-8">
        {absatzGroup.map((absatz) => (
          <BlocksRenderer
            key={absatz.documentId}
            content={prependNumberToAbsatz(absatz)}
            modifiers={{
              underline: PrincipleHighlightModifier,
            }}
          />
        ))}
      </div>
    </DetailsSummary>
  );
}
