import { useContext } from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import { useIsMobileSize } from "~/hooks/deviceHook";
import {
  PartialPrinzip,
  PrincipleHighlightContext,
} from "~/providers/PrincipleHighlightProvider";
import { PRINCIPLE_COLORS } from "~/resources/constants";
import { explanationID, Node } from "~/utils/paragraphUtils";

export default function PrincipleHighlightModifier({ node }: { node: Node }) {
  const { principlesToShow, setActiveHighlight, absatzId, useAnchorLinks } =
    useContext(PrincipleHighlightContext);

  const isMobileSize = useIsMobileSize();

  const [text, numberGroup] = node.text ? node.text.split(/(\[\d])/g) : [];
  if (!numberGroup) return text;

  const principle = principlesToShow.find(
    ({ Nummer }) => Nummer === Number(numberGroup[1]),
  );

  if (!principle) return text;

  // Generate a deterministic ID based on the text content and position
  const highlightID = `highlight-${text.split("").reduce((hash, char) => {
    return hash + char.charCodeAt(0);
  }, 0)}`;

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
    <Link
      replace
      to={`#${explanationID(absatzId, principle.Nummer)}`}
      onClick={() => {
        setActiveHighlight(highlightID);
      }}
      className="cursor-help no-underline hover:underline"
    >
      <PrincipleHighlight
        id={highlightID}
        principle={principle}
        absatzId={absatzId}
      >
        {text}
      </PrincipleHighlight>
    </Link>
  );
}

type PrincipleHighlightProps = {
  id: string;
  children: string;
  principle: PartialPrinzip;
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
      aria-label={`Textbeispiel erfüllt Prinzip: ${principle.Name}`}
      aria-details={absatzId && explanationID(absatzId, principle.Nummer)}
    >
      {children}
    </mark>
  );
}
