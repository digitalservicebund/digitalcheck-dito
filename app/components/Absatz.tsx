import { ArrowUpwardOutlined } from "@digitalservicebund/icons";
import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import PrincipleHighlightContext from "~/contexts/PrincipleHighlightContext";
import { PrincipleHighlightProvider } from "~/providers/PrincipleHighlightProvider";
import { PRINCIPLE_COLORS } from "~/resources/constants";
import { examples } from "~/resources/content/beispiele";
import { absatz } from "~/resources/content/shared/absatz";
import {
  absatzIdTag,
  AbsatzWithNumber,
  explanationID,
  prependNumberToAbsatz,
} from "~/utils/paragraphUtils";
import { BasePrinzip, PrinzipErfuellung } from "~/utils/strapiData.server";
import { BlocksRenderer } from "./BlocksRenderer";
import Heading from "./Heading";
import PrincipleHighlightModifier from "./PrincipleHighlightModifier";

type AbsatzProps = {
  absatz: AbsatzWithNumber;
  principlesToShow: BasePrinzip[];
  useAnchorLinks: boolean;
};

export default function Absatz({
  absatz,
  principlesToShow,
  useAnchorLinks,
}: Readonly<AbsatzProps>) {
  const content = prependNumberToAbsatz(absatz);

  return (
    <PrincipleHighlightProvider
      absatzId={absatz.id.toString()}
      principlesToShow={principlesToShow}
      useAnchorLinks={useAnchorLinks}
    >
      <div className="flex flex-col gap-16 md:grid md:grid-cols-[5fr_3fr] md:gap-32 [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha]">
        <BlocksRenderer
          id={absatzIdTag(absatz.id)}
          className="italic"
          content={content}
          modifiers={{
            underline: PrincipleHighlightModifier,
          }}
        />
        <PrincipleExplanationList absatz={absatz} />
      </div>
    </PrincipleHighlightProvider>
  );
}

type PrincipleExplanationListProps = {
  absatz: AbsatzWithNumber;
};

function PrincipleExplanationList({
  absatz,
}: Readonly<PrincipleExplanationListProps>) {
  if (!absatz.PrinzipErfuellungen) return undefined;

  return (
    <div className="space-y-8">
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
            <PrincipleExplanation key={erfuellung.id} erfuellung={erfuellung} />
          ),
      )}
    </div>
  );
}

type PrincipleExplanationProps = {
  erfuellung: PrinzipErfuellung;
};

function PrincipleExplanation({
  erfuellung,
}: Readonly<PrincipleExplanationProps>) {
  const location = useLocation();
  const { activeHighlight, setActiveHighlight, absatzId } = useContext(
    PrincipleHighlightContext,
  );
  if (!absatzId || !erfuellung.Prinzip) return null;
  const id = explanationID(absatzId, erfuellung.Prinzip.Nummer);

  // NOTE: The CSS target pseudo-class doesn't work here due to the client side navigation: https://github.com/remix-run/remix/issues/6432.
  // Using the hash also leads to a hydration mismatch due to the location hash only being available on the client.
  const shouldHighlight = location.hash === `#${id}`;
  const color = PRINCIPLE_COLORS[erfuellung.Prinzip.Nummer];
  const explanationClasses = twJoin(
    "w-fit max-w-[642px] px-8 space-y-4",
    color.border,
    shouldHighlight ? "border-4 p-4" : "border-l-4 p-8",
  );

  return (
    <div
      id={id}
      data-testid={id}
      className={explanationClasses}
      aria-description={absatz.ariaDescription}
    >
      <div className="flex content-center gap-8">
        <BlocksRenderer
          className="ds-label-02-reg"
          content={erfuellung.WarumGut}
        />
        {shouldHighlight && activeHighlight && (
          <Link
            to={`#${activeHighlight}`}
            className="ds-link-01-bold"
            aria-label={absatz.backLinkAriaLabel}
            onClick={() => setActiveHighlight(null)}
            replace
          >
            <ArrowUpwardOutlined className="fill-blue-800" />
          </Link>
        )}
      </div>
      <p className="ds-label-03-reg text-gray-900">
        {`(${examples.principleExplanation.principle}: ${erfuellung.Prinzip.Name})`}
      </p>
    </div>
  );
}
