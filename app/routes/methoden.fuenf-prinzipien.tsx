import { type MetaArgs, useLoaderData } from "react-router";
import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";
import Header from "~/components/Header";
import LinkListBox from "~/components/LinkListBox";
import PrinciplesDisplay from "~/components/PrinciplesDisplay";
import SupportBanner from "~/components/SupportBanner";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import {
  ROUTE_METHODS,
  ROUTE_METHODS_PRINCIPLES,
} from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  GET_PRINZIPS_QUERY,
  Prinzip,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/methoden.fuenf-prinzipien";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_METHODS_PRINCIPLES.title, matches);
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

  const nextStep = referrer.startsWith(ROUTE_METHODS.url)
    ? methodsFivePrinciples.nextStepMethods
    : methodsFivePrinciples.nextStep;

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
                id: slugify(principle.label),
                title: `${principle.label}: ${principle.title}`,
              };
            })}
          />
        </Container>
      </Background>
      {methodsFivePrinciples.principles.map((principle, index) => {
        const correspondingPrinzip = prinzips.find((p) => p.Nummer === index);
        return (
          <PrinciplesDisplay
            key={slugify(principle.label)}
            principle={principle}
            index={index}
            showInfoBoxButtons={true}
            prinzip={correspondingPrinzip}
            buttonText={methodsFivePrinciples.buttonText}
          />
        );
      })}
      <Container>
        <Box
          heading={{ text: nextStep.title }}
          label={{ text: nextStep.label }}
          content={{ markdown: nextStep.text }}
          buttons={nextStep.buttons}
        />
      </Container>
      <SupportBanner />
    </>
  );
}
