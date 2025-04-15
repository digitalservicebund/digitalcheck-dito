import { type MetaArgs, useLoaderData } from "react-router";
import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import LinkListBox from "~/components/LinkListBox";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import {
  ROUTE_EXAMPLES,
  ROUTE_METHODS,
  ROUTE_METHODS_FIVE_PRINCIPLES,
  ROUTE_PRINCIPLES,
} from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  GET_PRINZIPS_QUERY,
  Prinzip,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/methoden_.fuenf-prinzipien";
export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_METHODS_FIVE_PRINCIPLES.title, matches);
};

export async function loader({ request }: Route.LoaderArgs) {
  const referer = request.headers.get("referer");
  let pathname = "/";

  if (referer) {
    pathname = new URL(referer).pathname;
  }

  const prinzipData = await fetchStrapiData<{ prinzips: Prinzip[] }>(
    GET_PRINZIPS_QUERY,
  );

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  return {
    referrer: pathname,
    prinzips: prinzipData.prinzips,
  };
}

export default function FivePrinciples() {
  const { referrer, prinzips } = useLoaderData<typeof loader>();

  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: referrer.startsWith(ROUTE_METHODS.url)
                ? `2.4. ${methodsFivePrinciples.title}`
                : methodsFivePrinciples.title,
            }}
          />
          <LinkListBox
            links={methodsFivePrinciples.principles.map((principle) => {
              return {
                id: slugify(principle.title),
                title: `${principle.label}: ${principle.title}`,
              };
            })}
          />
        </Container>
      </Background>
      {methodsFivePrinciples.principles.map((principle, index) => {
        const prinzip = prinzips.find(
          (principle) => principle.Nummer === index,
        );
        const buttonLink = prinzip
          ? `${ROUTE_PRINCIPLES.url}/${prinzip?.URLBezeichnung}`
          : ROUTE_EXAMPLES.url;
        return (
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
                <Heading tagName="h3" text="So setzen Sie das Prinzip um" />
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
        );
      })}
    </>
  );
}
