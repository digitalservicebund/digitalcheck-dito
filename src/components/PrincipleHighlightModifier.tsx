import PrincipleHighlightContext from "@/contexts/PrincipleHighlightContext";
import { useIsMobileSize } from "@/hooks/deviceHook";
import { PRINCIPLE_COLORS } from "@/resources/constants";
import type { Node } from "@/utils/paragraphUtils";
import { explanationID } from "@/utils/paragraphUtils";
import type { BasePrinzip } from "@/utils/strapiData.types";
import { useContext, useId } from "react";
import { twJoin } from "tailwind-merge";

/**
 * Strips references (like [1]) from the text.
 */
export function PrincipleHightlightNullModifier({ node }: { node: Node }) {
  const [text] = node.text ? node.text.split(/(\[\d])/g) : [];
  return text;
}

export default function PrincipleHighlightModifier({
  node,
}: Readonly<{ node: Node }>) {
  const { principlesToShow, setActiveHighlight, absatzId, useAnchorLinks } =
    useContext(PrincipleHighlightContext);
  const highlightID = useId();

  const isMobileSize = useIsMobileSize();

  const [text, numberGroup] = node.text ? node.text.split(/(\[\d])/g) : [];
  if (!numberGroup) return text;

  const principle = principlesToShow.find(
    ({ Nummer }) => Nummer === Number(numberGroup[1]),
  );

  if (!principle) return text;

  if (!useAnchorLinks || !isMobileSize || !absatzId)
    return (
      <PrincipleHighlight
        id={highlightID}
        principle={principle}
        absatzId={absatzId}
      >
        {text}
      </PrincipleHighlight>
    );
  return (
    <button
      type="button"
      onClick={() => {
        setActiveHighlight(highlightID);
        globalThis.location.hash = explanationID(absatzId, principle.Nummer);
      }}
      className="cursor-help text-left no-underline hover:underline"
    >
      <PrincipleHighlight
        id={highlightID}
        principle={principle}
        absatzId={absatzId}
      >
        {text}
      </PrincipleHighlight>
    </button>
  );
}

type PrincipleHighlightProps = {
  id: string;
  children: string;
  principle: BasePrinzip;
  absatzId: string;
};

function PrincipleHighlight({
  id,
  children,
  principle,
  absatzId,
}: Readonly<PrincipleHighlightProps>) {
  return (
    <mark
      id={id}
      className={twJoin(
        "ds-body-01-reg",
        PRINCIPLE_COLORS[principle.Nummer].background,
      )}
      aria-describedby={explanationID(absatzId, principle.Nummer)}
    >
      {children}
    </mark>
  );
}
