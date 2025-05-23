import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox";
import {
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_PRINCIPLES,
} from "~/resources/staticRoutes.ts";
import type { Prinzip } from "~/utils/strapiData.server.ts";
import twMerge from "~/utils/tailwindMerge";
import { slugify } from "~/utils/utilFunctions";
import ButtonContainer from "./ButtonContainer";
import DetailsSummary from "./DetailsSummary";
import Heading from "./Heading";

interface PrincipleImplementation {
  action: string;
  content: string;
  questions: string[];
  wording?: string;
}

interface PrincipleData {
  label: string;
  title: string;
  content: string;
  implementation: PrincipleImplementation[];
  color: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
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
    <Container className="flex flex-row gap-32">
      {principle.icon && <principle.icon className="size-80 fill-blue-300" />}
      <div className="ds-stack ds-stack-32">
        <InfoBox
          heading={{
            tagName: "h2",
            text: principle.title,
          }}
          label={{
            tagName: "div",
            text: principle.label,
            className: twMerge(
              "ds-label-section bg-blue-800 self-start rounded",
              `bg-${principle.color}-300`,
            ),
          }}
          items={[
            {
              content: principle.content,
            },
          ]}
        />
        <div className="ds-stack ds-stack-32">
          <Heading tagName="h3" text="So wenden Sie das Prinzip an" />
          {principle.implementation.map((implementation) => {
            const questions = implementation.questions
              .map((question) => `- ${question}`)
              .join("\n");
            const wording = implementation.wording
              ? `\n\n**Formulierungsbeispiel:**\n${implementation.wording}`
              : "";
            const content = `${implementation.content}\n\n**Fragen Sie sich:**\n${questions}${wording}`;
            return (
              <DetailsSummary
                key={implementation.action}
                title={implementation.action}
                content={content}
              />
            );
          })}
        </div>
        {buttonsArray && buttonsArray.length > 0 && (
          <ButtonContainer buttons={buttonsArray} />
        )}
      </div>
    </Container>
  );
}

/*
const buttonLink = correspondingPrinzip
          ? `${ROUTE_METHODS_PRINCIPLES.url}/${correspondingPrinzip?.URLBezeichnung}`
          : ROUTE_EXAMPLES.url;


 <Background
            key={principle.title}
            backgroundColor={index % 2 === 0 ? "white" : "blue"}
            className="pb-48"
          >
            <div id={slugify(principle.title)} />
            <Container>
              <Box
                heading={{
                  tagName: "h2",
                  text: principle.title,
                }}
                label={{
                  tagName: "div",
                  text: principle.label,
                  className: "ds-label-section text-gray-900",
                }}
                content={{
                  markdown: principle.description,
                }}
                buttons={[
                  {
                    text: methodsFivePrinciples.buttonText,
                    href: buttonLink,
                    prefetch: "viewport",
                    look: "tertiary" as const,
                    "aria-label":
                      index > 0
                        ? `Beispiele für "${principle.label}: ${principle.title}" betrachten`
                        : "Alle Beispiele betrachten",
                  },
                ]}
              />
            </Container>
            <Container
              overhangingBackground
              backgroundColor={index % 2 === 0 ? "blue" : "white"}
            >
              <div className="ds-stack ds-stack-32">
                <Heading tagName="h3" text="So wenden Sie das Prinzip an" />
                {principle.implementation.map((implementation) => {
                  const questions = implementation.questions
                    .map((question) => `- ${question}`)
                    .join("\n");
                  const wording = implementation.wording
                    ? `\n\n**Formulierungsbeispiel:**\n${implementation.wording}`
                    : "";
                  const content = `${implementation.description}\n\n**Fragen Sie sich:**\n${questions}${wording}`;
                  return (
                    <DetailsSummary
                      key={implementation.action}
                      title={implementation.action}
                      content={content}
                    />
                  );
                })}
              </div>
            </Container>
          </Background>
 */
