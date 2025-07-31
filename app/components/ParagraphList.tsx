import { ArrowUpwardOutlined } from "@digitalservicebund/icons";
import { createContext, useContext, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import { HIGHLIGHT_COLORS } from "~/resources/constants";
import { examples } from "~/resources/content/beispiele";
import {
  AbsatzWithNumber,
  groupAbsaetzeWithoutRelevantPrinciples,
  type Node,
  prependNumberToAbsatz,
} from "~/utils/paragraphUtils";
import type {
  Paragraph,
  Prinzip,
  PrinzipErfuellung,
} from "~/utils/strapiData.server";
import { BlocksRenderer } from "./BlocksRenderer";

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

type Highlight = {
  id: string;
  principleNumber: number;
};

const PrinciplesContext = createContext<Prinzip[]>([]);
const HighlightContext = createContext<{
  activeHighlight: Highlight | null;
  setActiveHighlight: React.Dispatch<React.SetStateAction<Highlight | null>>;
}>({
  activeHighlight: null,
  setActiveHighlight: () => {},
});

export default function ParagraphList({
  paragraphs,
  principlesToShow,
}: Readonly<{
  paragraphs: Paragraph[];
  principlesToShow: Prinzip[];
}>) {
  // This ID is used to track which highlight was clicked on to provide a back link
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(
    null,
  );

  // Memoize the context value to prevent unnecessary re-renders of children
  const highlightContextValue = useMemo(
    () => ({ activeHighlight, setActiveHighlight }),
    [activeHighlight, setActiveHighlight],
  );

  return (
    <PrinciplesContext.Provider value={principlesToShow}>
      <HighlightContext.Provider value={highlightContextValue}>
        <div className="ds-stack ds-stack-32">
          {paragraphs
            .toSorted((a, b) =>
              a.Nummer.localeCompare(b.Nummer, "de-DE", { numeric: true }),
            )
            .map((paragraph) => (
              <Paragraph key={paragraph.documentId} paragraph={paragraph} />
            ))}
        </div>
      </HighlightContext.Provider>
    </PrinciplesContext.Provider>
  );
}

function Paragraph({ paragraph }: Readonly<{ paragraph: Paragraph }>) {
  const principlesToShow = useContext(PrinciplesContext);

  const groupedAbsaetze = groupAbsaetzeWithoutRelevantPrinciples(
    paragraph.Absaetze,
    principlesToShow,
  );

  // If there are no Absätze with relevant principles, don't show the paragraph
  if (groupedAbsaetze.every((absatzGroup) => absatzGroup instanceof Array))
    return null;

  const getAbsatzGroupTitle = (absatzGroup: AbsatzWithNumber[]) =>
    absatzGroup.length > 1
      ? `(${absatzGroup[0].number}) – (${absatzGroup[absatzGroup.length - 1].number})`
      : `(${absatzGroup[0].number})`;

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
          {groupedAbsaetze.map((absatzGroup) =>
            Array.isArray(absatzGroup) ? (
              // TODO: also italic and width like Absatz
              <DetailsSummary
                key={absatzGroup[0].number}
                title={getAbsatzGroupTitle(absatzGroup)}
                bold={false}
                content={
                  <div className="ds-stack ds-stack-8">
                    {absatzGroup.map((absatz) => (
                      <BlocksRenderer
                        key={absatz.id}
                        content={prependNumberToAbsatz(absatz)}
                        modifiers={{
                          underline: PrincipleHighlight,
                        }}
                      />
                    ))}
                  </div>
                }
              />
            ) : (
              <Absatz key={absatzGroup.id} absatz={absatzGroup} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

const explanationIdPrefixContext = createContext<string | null>(null);

const Absatz = ({ absatz }: { absatz: AbsatzWithNumber }) => {
  const explanationIdPrefix = `erklaerung-${absatz.id}`;
  const content = prependNumberToAbsatz(absatz);

  return (
    <explanationIdPrefixContext.Provider value={explanationIdPrefix}>
      <div className="flex flex-col gap-16 md:grid md:grid-cols-[5fr_3fr] md:gap-32 [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha]">
        <div className="italic">
          <BlocksRenderer
            content={content}
            modifiers={{
              underline: PrincipleHighlight,
            }}
          />
        </div>
        <div className="flex flex-col gap-8">
          <Heading
            tagName="h4"
            className="ds-label-01-bold"
            ariaLabel={`${examples.paragraphs.ariaLabelPrefix} ${absatz.number}: ${examples.paragraphs.explanation}`}
          >
            {examples.paragraphs.explanation}
          </Heading>
          {absatz.PrinzipErfuellungen.toSorted(
            (a, b) => (a.Prinzip?.Nummer ?? 0) - (b.Prinzip?.Nummer ?? 0),
          ).map(
            (erfuellung) =>
              erfuellung.Prinzip && (
                <PrincipleExplanation
                  key={erfuellung.id}
                  erfuellung={erfuellung}
                />
              ),
          )}
        </div>
      </div>
    </explanationIdPrefixContext.Provider>
  );
};

const explanationID = (baseLabelID: string, number: number) =>
  `${baseLabelID}-${number}`;

const PrincipleHighlight = ({ node }: { node: Node }) => {
  const principlesToShow = useContext(PrinciplesContext);
  const { setActiveHighlight } = useContext(HighlightContext);
  const explanationIdPrefix = useContext(explanationIdPrefixContext);

  const [text, numberGroup] = node.text ? node.text.split(/(\[\d])/g) : [];
  if (!numberGroup || !explanationIdPrefix) return text;

  const number = Number(numberGroup[1]) as keyof typeof HIGHLIGHT_COLORS;
  if (!principlesToShow.some(({ Nummer }) => Nummer === number)) return text;
  const principleName = principlesToShow.find(
    ({ Nummer }) => Nummer === number,
  )?.Name;

  // Generate a deterministic ID based on the text content and position
  const textHash = text.split("").reduce((hash, char) => {
    return hash + char.charCodeAt(0);
  }, 0);
  const highlightID = `markierung-${textHash}`;

  return (
    <Link
      replace
      to={`#${explanationID(explanationIdPrefix, number)}`}
      onClick={() => {
        setActiveHighlight({ id: highlightID, principleNumber: number });
      }}
      aria-label={`Erfüllt Prinzip ${principleName}: ${text}`}
      title={`Erfüllt Prinzip ${principleName}`}
      className="cursor-help no-underline hover:underline"
    >
      <mark
        id={highlightID}
        className={twJoin(
          "ds-body-01-reg",
          HIGHLIGHT_COLORS[number].background,
        )}
      >
        {text}
      </mark>
    </Link>
  );
};

const PrincipleExplanation = ({
  erfuellung,
}: {
  erfuellung: PrinzipErfuellung;
}) => {
  const location = useLocation();
  const { activeHighlight, setActiveHighlight } = useContext(HighlightContext);
  const explanationIdPrefix = useContext(explanationIdPrefixContext);

  if (!explanationIdPrefix || !erfuellung.Prinzip) return null;

  const id = explanationID(explanationIdPrefix, erfuellung.Prinzip.Nummer);

  // NOTE: The CSS target pseudo-class doesn't work here due to the client side navigation: https://github.com/remix-run/remix/issues/6432.
  // Using the hash also leads to a hydration mismatch due to the location hash only being available on the client.
  const shouldHighlight = location.hash === `#${id}`;
  const color = HIGHLIGHT_COLORS[erfuellung.Prinzip.Nummer];
  const explanationClasses = twJoin(
    "w-fit max-w-[642px] px-8",
    color.border,
    shouldHighlight ? "border-4 p-4" : "border-l-4 p-8",
  );

  return (
    <div className={explanationClasses} id={id} data-testid={id}>
      <div className="flex content-center gap-8">
        <div>
          <BlocksRenderer content={erfuellung.WarumGut} />
        </div>
        {shouldHighlight && activeHighlight && (
          <Link
            replace
            to={`#${activeHighlight.id}`}
            className="ds-link-01-bold"
            aria-label="Zurück zum Text"
            onClick={() => setActiveHighlight(null)}
          >
            <ArrowUpwardOutlined className="fill-blue-800" />
          </Link>
        )}
      </div>
      <p className="text-gray-900">
        (
        {`${examples.principleExplanation.principle}: ${erfuellung.Prinzip.Name}`}
        )
      </p>
    </div>
  );
};
