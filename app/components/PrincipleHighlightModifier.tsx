import { useContext } from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import PrincipleHighlightContext from "~/contexts/PrincipleHighlightContext";
import { useIsMobileSize } from "~/hooks/deviceHook";
import { PRINCIPLE_COLORS } from "~/resources/constants";
import { explanationID, Node } from "~/utils/paragraphUtils";
import { BasePrinzip } from "~/utils/strapiData.server";
import { idFromText } from "~/utils/utilFunctions";

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
  const highlightID = idFromText(text, "highlight");
  const renderAsLink = useAnchorLinks && isMobileSize && !!absatzId;

  function getPrincipleHighlight(
    principle: BasePrinzip,
    isHidden: boolean = false,
  ) {
    return (
      <PrincipleHighlight
        id={highlightID}
        principle={principle}
        absatzId={absatzId}
        className={isHidden ? "hidden" : ""}
      >
        {text}
      </PrincipleHighlight>
    );
  }

  return (
    <>
      <Link
        replace
        to={`#${explanationID(absatzId, principle.Nummer)}`}
        onClick={() => {
          setActiveHighlight(highlightID);
        }}
        className={
          renderAsLink ? "cursor-help no-underline hover:underline" : "hidden"
        }
      >
        {getPrincipleHighlight(principle)}
      </Link>
      {getPrincipleHighlight(principle, renderAsLink)}
    </>
  );
}

type PrincipleHighlightProps = {
  id: string;
  children: string;
  principle: BasePrinzip;
  absatzId: string;
  className?: string;
};

function PrincipleHighlight({
  id,
  children,
  principle,
  absatzId,
  className,
}: Readonly<PrincipleHighlightProps>) {
  return (
    <mark
      id={id}
      className={twJoin(
        "ds-body-01-reg",
        PRINCIPLE_COLORS[principle.Nummer].background,
        className,
      )}
      aria-label={`Textbeispiel erfüllt Prinzip: ${principle.Name}`}
      aria-describedby={explanationID(absatzId, principle.Nummer)}
    >
      {children}
    </mark>
  );
}
