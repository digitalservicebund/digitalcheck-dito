import Background from "~/components/Background";
import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox";
import { ROUTE_EXAMPLES, ROUTE_PRINCIPLES } from "~/resources/staticRoutes.ts";
import type { Prinzip } from "~/utils/strapiData.server.ts";
import { slugify } from "~/utils/utilFunctions";

interface PrincipleData {
  label: string;
  title: string;
  content: string;
}

interface PrinciplesDisplayProps {
  principles: PrincipleData[];
  showInfoBoxButtons: boolean;
  prinzips?: Prinzip[];
  buttonText?: string;
}

export default function PrinciplesDisplay({
  principles,
  showInfoBoxButtons,
  prinzips,
  buttonText,
}: PrinciplesDisplayProps) {
  return (
    <>
      {principles.map((principle, index) => {
        const label = slugify(principle.label);
        console.log(buttonText);
        let buttonsArray = undefined;

        if (showInfoBoxButtons && prinzips) {
          const prinzip = prinzips.find((p) => p.Nummer === index);
          const buttonLink = prinzip
            ? `${ROUTE_PRINCIPLES.url}/${prinzip.URLBezeichnung}`
            : ROUTE_EXAMPLES.url;

          buttonsArray = [
            {
              text: buttonText,
              href: buttonLink,
              prefetch: "viewport" as const,
              look: "tertiary" as const,
              "aria-label":
                index > 0
                  ? `Beispiele für "${principle.label}: ${principle.title}" betrachten`
                  : "Alle Beispiele betrachten",
            },
          ];
        }

        console.log(buttonsArray);

        return (
          <Background
            key={label}
            backgroundColor={index % 2 === 0 ? "white" : "blue"}
          >
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
      })}
    </>
  );
}
