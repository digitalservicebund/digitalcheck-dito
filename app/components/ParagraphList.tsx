import ArrowUpwardOutlined from "@digitalservicebund/icons/ArrowUpwardOutlined";
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
  isStandaloneAbsatz,
  type Node,
  prependNumberToAbsatz,
} from "~/utils/paragraphUtils";
import type {
  Paragraph,
  Prinzip,
  PrinzipErfuellung,
} from "~/utils/strapiData.server";
import { BlocksRenderer } from "./BlocksRenderer";

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
      <div className="ds-stack ds-stack-8">
        <Heading
          tagName="h3"
          text={`§ ${paragraph.Nummer} ${paragraph.Gesetz}`}
          look="ds-subhead"
          className="font-bold"
        />
        <p className="ds-subhead font-bold">{paragraph.Titel}</p>
        <div className="ds-stack ds-stack-16 border-l-4 border-gray-400 pl-8">
          {groupedAbsaetze.map((absatzGroup) =>
            isStandaloneAbsatz(absatzGroup) ? (
              <Absatz key={absatzGroup.id} absatz={absatzGroup} />
            ) : (
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
      <div className="[&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha]">
        <BlocksRenderer
          content={content}
          modifiers={{
            underline: PrincipleHighlight,
          }}
        />
        <div className="ds-stack ds-stack-8 mt-8">
          <span className="ds-subhead font-bold">
            {examples.paragraphs.explanation}
          </span>
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
      <div className="flex content-center gap-4">
        <Heading
          tagName="h4"
          text={`Prinzip: ${erfuellung.Prinzip.Name}`}
          look="ds-label-01-bold pb-8"
        />
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
      <BlocksRenderer content={erfuellung.WarumGut} />
    </div>
  );
};
