import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import { PrincipleHighlightContext } from "~/providers/PrincipleHighlightProvider";
import { HIGHLIGHT_COLORS } from "~/resources/constants";
import { explanationID, Node } from "~/utils/paragraphUtils";

export default function PrincipleHighlightModifier({ node }: { node: Node }) {
  const {
    principlesToShow,
    setActiveHighlight,
    explanationIdPrefix,
    useAnchorLinks,
  } = useContext(PrincipleHighlightContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Breakpoint md

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => removeEventListener("resize", handleResize);
  }, []);

  const [text, numberGroup] = node.text ? node.text.split(/(\[\d])/g) : [];
  if (!numberGroup || !explanationIdPrefix) return text;

  const principleNumber = Number(
    numberGroup[1],
  ) as keyof typeof HIGHLIGHT_COLORS;
  if (!principlesToShow.some(({ Nummer }) => Nummer === principleNumber))
    return text;
  const principleName = principlesToShow.find(
    ({ Nummer }) => Nummer === principleNumber,
  )?.Name;

  // Generate a deterministic ID based on the text content and position
  const textHash = text.split("").reduce((hash, char) => {
    return hash + char.charCodeAt(0);
  }, 0);
  const highlightID = `markierung-${textHash}`;

  if (!useAnchorLinks || !isMobile)
    return (
      <mark
        className={twJoin(
          "ds-body-01-reg",
          HIGHLIGHT_COLORS[principleNumber].background,
        )}
      >
        {text}
      </mark>
    );

  return (
    <Link
      replace
      to={`#${explanationID(explanationIdPrefix, principleNumber)}`}
      onClick={() => {
        setActiveHighlight({ id: highlightID, principleNumber });
      }}
      aria-label={`Erfüllt Prinzip ${principleName}: ${text}`}
      title={`Erfüllt Prinzip ${principleName}`}
      className="cursor-help no-underline hover:underline"
    >
      <mark
        id={highlightID}
        className={twJoin(
          "ds-body-01-reg",
          HIGHLIGHT_COLORS[principleNumber].background,
        )}
      >
        {text}
      </mark>
    </Link>
  );
}
