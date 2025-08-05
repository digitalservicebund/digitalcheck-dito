import { ArrowUpwardOutlined } from "@digitalservicebund/icons";
import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import {
  PrincipleHighlightContext,
  PrincipleHighlightProvider,
} from "~/providers/PrincipleHighlightProvider";
import { HIGHLIGHT_COLORS } from "~/resources/constants";
import { examples } from "~/resources/content/beispiele";
import {
  AbsatzWithNumber,
  explanationID,
  prependNumberToAbsatz,
} from "~/utils/paragraphUtils";
import { Prinzip, PrinzipErfuellung } from "~/utils/strapiData.server";
import { BlocksRenderer } from "./BlocksRenderer";
import DetailsSummary from "./DetailsSummary";
import Heading from "./Heading";
import PrincipleHighlightModifier from "./PrincipleHighlightModifier";

type AbsatzOrAbsatzGroupProps = {
  absatz: AbsatzWithNumber | AbsatzWithNumber[];
  principlesToShow: Prinzip[];
  useAnchorLinks: boolean;
};

export default function AbsatzOrAbsatzGroup({
  absatz,
  principlesToShow,
  useAnchorLinks,
}: Readonly<AbsatzOrAbsatzGroupProps>) {
  const isAbsatzGroupWithoutErfuellungen = Array.isArray(absatz);

  if (isAbsatzGroupWithoutErfuellungen)
    return <AbsatzGroupWithoutErfüllungen absatzGroup={absatz} />;

  const content = prependNumberToAbsatz(absatz);

  return (
    <PrincipleHighlightProvider
      absatzId={absatz.id}
      principlesToShow={principlesToShow}
      useAnchorLinks={useAnchorLinks}
    >
      <div className="flex flex-col gap-16 md:grid md:grid-cols-[5fr_3fr] md:gap-32 [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha]">
        <div className="italic">
          <BlocksRenderer
            content={content}
            modifiers={{
              underline: PrincipleHighlightModifier,
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
          {absatz.PrinzipErfuellungen.map(
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
    </PrincipleHighlightProvider>
  );
}

type PrincipleExplanationProps = {
  erfuellung: PrinzipErfuellung;
};

function PrincipleExplanation({
  erfuellung,
}: Readonly<PrincipleExplanationProps>) {
  const location = useLocation();

  const { activeHighlight, setActiveHighlight, explanationIdPrefix } =
    useContext(PrincipleHighlightContext);

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
        {shouldHighlight && activeHighlight && setActiveHighlight && (
          <Link
            to={`#${activeHighlight.id}`}
            className="ds-link-01-bold"
            aria-label="Zurück zum Text"
            onClick={() => setActiveHighlight(null)}
            replace
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
}

type AbsatzGroupWithoutErfüllungenProps = {
  absatzGroup: AbsatzWithNumber[];
};

function AbsatzGroupWithoutErfüllungen({
  absatzGroup,
}: Readonly<AbsatzGroupWithoutErfüllungenProps>) {
  const getAbsatzGroupTitle = (absatzGroup: AbsatzWithNumber[]) =>
    absatzGroup.length > 1
      ? `(${absatzGroup[0].number}) – (${absatzGroup[absatzGroup.length - 1].number})`
      : `(${absatzGroup[0].number})`;

  return (
    <DetailsSummary
      key={absatzGroup[0].number}
      title={getAbsatzGroupTitle(absatzGroup)}
      bold={false}
      className="italic"
      content={
        <div className="ds-stack ds-stack-8">
          {absatzGroup.map((absatz) => (
            <BlocksRenderer
              key={absatz.id}
              content={prependNumberToAbsatz(absatz)}
              modifiers={{
                underline: PrincipleHighlightModifier,
              }}
            />
          ))}
        </div>
      }
    />
  );
}
