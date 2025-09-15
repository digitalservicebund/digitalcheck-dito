import { useLoaderData } from "react-router";
import Hero from "~/components/Hero";
import { PrinciplePosterBox } from "~/components/PrinciplePosterBox";
import TableOfContents from "~/components/TableOfContents";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import Principle from "./methoden.fuenf-prinzipien/Principle";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_PRINCIPLES.title);
}

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekte[];
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
        title={methodsFivePrinciples.grundlagenTitle}
        subtitle={methodsFivePrinciples.grundlagenSubtitle}
      >
        <TableOfContents
          heading={methodsFivePrinciples.contentOverviewTitle}
          links={prinzips.map((prinzip) => ({
            id: slugify(prinzip.Name),
            title: `${methodsFivePrinciples.anchor.principle} ${prinzip.Name}`,
          }))}
        />
      </Hero>

      {prinzips.map((prinzip) => (
        <Principle prinzip={prinzip} key={prinzip.Name} />
      ))}

      <PrinciplePosterBox hasBlueBackground={true} />
    </>
  );
}
