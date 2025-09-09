import { useLoaderData } from "react-router";
import Badge from "~/components/Badge";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import { PrinciplePosterBox } from "~/components/PrinciplePosterBox";
import Separator from "~/components/Separator";
import TableOfContents from "~/components/TableOfContents";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  PrinzipWithAnwendungen,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import Principle from "./Principle";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS_PRINCIPLES.title);
}

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAnwendungen[];
  }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  return { prinzips: prinzipData.prinzips };
};

export default function FivePrinciples() {
  const { prinzips } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero
        title={methodsFivePrinciples.title}
        subtitle={methodsFivePrinciples.subtitle}
      >
        <TableOfContents
          heading={methodsFivePrinciples.contentOverviewTitle}
          links={[
            {
              id: "instruction",
              title: methodsFivePrinciples.anchor.instruction,
            },
            ...prinzips.map((prinzip) => {
              return {
                id: slugify(prinzip.Name),
                title: `${methodsFivePrinciples.anchor.principle} ${prinzip.Name}`,
              };
            }),
          ]}
        />
      </Hero>

      <Container className="ds-stack ds-stack-40">
        <div id="instruction">
          <Badge Icon={methodsFivePrinciples.instruction.badge.Icon}>
            {methodsFivePrinciples.instruction.badge.text}
          </Badge>
          <Heading tagName="h2">
            {methodsFivePrinciples.instruction.title}
          </Heading>
        </div>

        <InfoBoxList
          className="list-unstyled ds-stack ds-stack-40"
          items={methodsFivePrinciples.instruction.items}
        />

        <Separator />
      </Container>

      {prinzips.map((prinzip) => (
        <Principle prinzip={prinzip} key={prinzip.Name} />
      ))}

      <PrinciplePosterBox />

      <Container>
        <InfoBox
          heading={{
            text: methodsFivePrinciples.nextStep.title,
            look: "ds-heading-03-reg",
            tagName: "h2",
          }}
          badge={{
            children: methodsFivePrinciples.nextStep.label,
            Icon: methodsFivePrinciples.nextStep.icon,
          }}
          content={methodsFivePrinciples.nextStep.text}
          buttons={methodsFivePrinciples.nextStep.buttons}
        />
      </Container>
    </>
  );
}
