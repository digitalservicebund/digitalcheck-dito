import PrincipleHighlightContext from "@/contexts/PrincipleHighlightContext";
import PrincipleHighlightProvider from "@/providers/PrincipleHighlightProvider";
import { PRINCIPLE_COLORS } from "@/resources/constants";
import { absatz } from "@/resources/content/shared/absatz";
import {
  absatzIdTag,
  explanationID,
  prependNumberToAbsatz,
} from "@/utils/paragraphUtils";
import type {
  BaseAbsatz,
  BasePrinzip,
  PrinzipErfuellung,
} from "@/utils/strapiData.types";
import { ArrowUpwardOutlined } from "@digitalservicebund/icons";
import { useContext } from "react";
import { twJoin } from "tailwind-merge";
import { BlocksRenderer } from "./BlocksRenderer";
import Heading from "./Heading";
import PrincipleHighlightModifier from "./PrincipleHighlightModifier";

type AbsatzProps = {
  absatz: BaseAbsatz;
  principlesToShow: BasePrinzip[];
  useAnchorLinks: boolean;
};

export default function Absatz({
  absatz,
  principlesToShow,
  useAnchorLinks,
}: Readonly<AbsatzProps>) {
  const content = prependNumberToAbsatz(absatz);

  // Only show explanations for principles that are in the principlesToShow array
  const principlesToShowNumbers = new Set(
    principlesToShow.map((principle) => principle.Nummer),
  );
  const erfuellungenToShow = absatz.PrinzipErfuellungen?.filter(
    (erfuellung) =>
      erfuellung.Prinzip?.Nummer &&
      principlesToShowNumbers.has(erfuellung.Prinzip.Nummer),
  );

  return (
    <PrincipleHighlightProvider
      absatzId={absatz.documentId}
      principlesToShow={principlesToShow}
      useAnchorLinks={useAnchorLinks}
    >
      <div className="flex flex-col gap-16 md:grid md:grid-cols-[5fr_3fr] md:gap-32 [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha]">
        <BlocksRenderer
          id={absatzIdTag(absatz.documentId)}
          className="italic"
          content={content}
          modifiers={{
            underline: PrincipleHighlightModifier,
          }}
        />
        {erfuellungenToShow && erfuellungenToShow.length > 0 && (
          <PrincipleExplanationList
            erfuellungen={erfuellungenToShow}
            absatzNumber={absatz.Nummer}
          />
        )}
      </div>
    </PrincipleHighlightProvider>
  );
}

type PrincipleExplanationListProps = {
  erfuellungen: PrinzipErfuellung[];
  absatzNumber: number;
};

function PrincipleExplanationList({
  erfuellungen,
  absatzNumber,
}: Readonly<PrincipleExplanationListProps>) {
  return (
    <div className="space-y-8">
      <Heading
        tagName="h4"
        className="ds-label-01-bold"
        ariaLabel={`Absatz ${absatzNumber}: Warum ist dieses Beispiel gut?`}
      >
        Warum ist dieses Beispiel gut?
      </Heading>
      {erfuellungen.map((erfuellung) => (
        <PrincipleExplanation
          showPrincipleTitle
          key={erfuellung.id}
          erfuellung={erfuellung}
        />
      ))}
    </div>
  );
}

type PrincipleExplanationProps = {
  erfuellung: PrinzipErfuellung;
  showPrincipleTitle?: boolean;
};

export function PrincipleExplanation({
  erfuellung,
  showPrincipleTitle,
}: Readonly<PrincipleExplanationProps>) {
  const { activeHighlight, setActiveHighlight, absatzId } = useContext(
    PrincipleHighlightContext,
  );
  if (!absatzId || !erfuellung.Prinzip) return null;
  const id = explanationID(absatzId, erfuellung.Prinzip.Nummer);

  const color = PRINCIPLE_COLORS[erfuellung.Prinzip.Nummer];
  const explanationClasses = twJoin(
    "w-fit max-w-[642px] p-12 pl-8 space-y-4 border-l-4 target:border-4 target:p-8 target:[&_button]:flex",
    color.border,
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
          content={erfuellung.Erklaerung}
        />
        {activeHighlight && (
          <button
            type="button"
            className="ds-link-01-bold hidden"
            aria-label={absatz.backLinkAriaLabel}
            onClick={() => {
              globalThis.location.hash = activeHighlight;
              setActiveHighlight(null);
            }}
          >
            <ArrowUpwardOutlined className="fill-ds-blue-800" />
          </button>
        )}
      </div>
      {showPrincipleTitle && (
        <p className="ds-label-03-reg text-ds-gray-900">
          {`(Prinzip: ${erfuellung.Prinzip.Name})`}
        </p>
      )}
    </div>
  );
}
