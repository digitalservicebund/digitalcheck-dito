import Background from "~/components/Background";
import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox";
import {
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_PRINCIPLES,
} from "~/resources/staticRoutes.ts";
import type { Prinzip } from "~/utils/strapiData.server.ts";
import { slugify } from "~/utils/utilFunctions";

interface PrincipleData {
  label: string;
  title: string;
  content: string;
}

interface PrinciplesDisplayProps {
  principle: PrincipleData;
  index: number;
  showInfoBoxButtons: boolean;
  prinzip?: Prinzip;
  buttonText?: string;
}

export default function PrinciplesDisplay({
  principle,
  index,
  showInfoBoxButtons,
  prinzip,
  buttonText,
}: Readonly<PrinciplesDisplayProps>) {
  const label = slugify(principle.label);
  let buttonsArray = undefined;

  if (showInfoBoxButtons && prinzip) {
    const buttonLink = `${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}`;
    buttonsArray = [
      {
        text: buttonText,
        href: buttonLink,
        prefetch: "viewport" as const,
        look: "tertiary" as const,
        "aria-label": `Beispiele für "${principle.label}: ${principle.title}" betrachten`,
      },
    ];
  } else if (showInfoBoxButtons && !prinzip) {
    buttonsArray = [
      {
        text: buttonText,
        href: ROUTE_EXAMPLES.url,
        prefetch: "viewport" as const,
        look: "tertiary" as const,
        "aria-label": "Alle Beispiele betrachten",
      },
    ];
  }

  return (
    <Background backgroundColor={index % 2 === 0 ? "white" : "blue"}>
      <div id={label} />
      <Container>
        <InfoBox
          heading={{
            tagName: "h2",
            text: principle.title,
          }}
          label={{
            tagName: "div",
            text: principle.label,
            className: "ds-label-section text-gray-900",
          }}
          items={[
            {
              content: principle.content,
              buttons: buttonsArray,
            },
          ]}
        />
      </Container>
    </Background>
  );
}
