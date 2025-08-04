import Heading from "~/components/Heading";
import { groupAbsaetzeWithoutRelevantPrinciples } from "~/utils/paragraphUtils";
import type { Paragraph, Prinzip } from "~/utils/strapiData.server";
import Absatz from "./Absatz";

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
 │ Renders a list of Paragraphs and manages which highlight was clicked.
 ├─ State: activeHighlight
 ├─ Context provided: principlesToShow, activeHighlight, setActiveHighlight
 ├─ Processing: Sorts Paragraphs into correct order.
 |
 ├── Paragraph
 │    │ Renders all Absaetze of a Paragraph. Only displays if it contains Absaetze with relevant principles.
 │    ├─ Context consumed: principlesToShow
 │    ├─ Processing: Creates an array of Absaetze with relevant principles and groups of Absaetze without.
 │    │
 │    ├── Absatz
 │    │    │ Renders an Absatz with relevant principles, highlights and matching explanations.
 │    │    ├─ Context provided: explanationIdPrefix
 │    │    ├─ Processing: Adds the number of the Absatz to the text.
 │    │    │
 │    │    ├── BlocksRenderer (with modifiers: { underline: PrincipleHighlight })
 │    │    │    │ Recursively renders the nested nodes of a Strapi text block.
 │    │    │    │ Based on the modifier, renders underlined text as PrincipleHighlights.
 │    │    │    │
 │    │    │    ├─── PrincipleHighlight
 │    │    │    │     │ Highlights a passage of text and provides a link to the explanation if the highlight is of a relevant principle.
 │    │    │    │     │ Otherwise, just return plain text.
 │    │    │    │     ├─ Context consumed: principlesToShow, setActiveHighlight, explanationIdPrefix
 │    │    │    │     └─ onClick: setActiveHighlight to this PrincipleHighlight
 │    │    │    │
 │    │    │    └─── PrincipleHighlight ...
 │    │    │
 │    │    ├── PrincipleExplanation
 │    │    │    │ Renders an explanation for a PrinzipErfuellung.
 │    │    │    │ Creates a link that refers to the clicked highlight.
 │    │    │    ├─ Context consumed: principlesToShow, activeHighlight, setActiveHighlight, explanationIdPrefix
 │    │    │    └─ onClick: setActiveHighlight to null
 │    │    │
 │    │    └── PrincipleExplanation ...
 │    │
 │    ├── DetailsSummary
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
 │    ├── Absatz ...
 │    └── DetailsSummary ...
 │
 ├── Paragraph ...
 └── Paragraph ...

 HIGHLIGHT INTERACTION FLOW
 ==========================
 ┌─────────────────────────────────────────────────────────────────┐
 │  1. User clicks highlighted link (PrincipleHighlight)           │
 │  2. setActiveHighlight() in ParagraphList                       │
 │  3. Navigate to #explanationID (soft scroll)                    │
 │  4. PrincipleExplanation detects shouldHighlight = true         │
 │  5. Gets border and shows arrow back button                     │
 │  6. User clicks back button                                     │
 │  7. setActiveHighlight(null) + navigate to #activeHighlight.id  │
 │  8. Soft scroll back to original highlighted text               │
 └─────────────────────────────────────────────────────────────────┘
 */

export default function ParagraphList({
  paragraphs,
  principlesToShow,
}: Readonly<{
  paragraphs: Paragraph[];
  principlesToShow: Prinzip[];
}>) {
  return (
    <div className="ds-stack ds-stack-32">
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
  principlesToShow: Prinzip[];
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
    <div key={paragraph.Nummer}>
      <div className="flex flex-col gap-24 md:gap-32">
        <Heading
          tagName="h3"
          text={`§ ${paragraph.Nummer} ${paragraph.Gesetz}`}
          look="ds-subhead"
          className="font-bold"
        />
        {paragraph.Titel && (
          <p className="ds-subhead font-bold">{paragraph.Titel}</p>
        )}
        <div className="flex flex-col gap-24 md:gap-32">
          {groupedAbsaetze.map((absatzGroup) => (
            <Absatz
              key={
                Array.isArray(absatzGroup) ? absatzGroup[0].id : absatzGroup.id
              }
              absatz={absatzGroup}
              principlesToShow={principlesToShow}
              useAnchorLinks
            />
          ))}
        </div>
      </div>
    </div>
  );
}
