import { type MetaArgs } from "react-router";
import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import LinkListBox from "~/components/LinkListBox";
import PrinciplesDisplay from "~/components/PrinciplesDisplay.tsx";
import SupportBanner from "~/components/SupportBanner";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";
import { slugify } from "~/utils/utilFunctions";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_FUNDAMENTALS_PRINCIPLES.title, matches);
};

export default function FundamentalsFivePrinciples() {
  const principlesToDisplay = methodsFivePrinciples.principles.slice(1);

  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: methodsFivePrinciples.title,
            }}
            content={{
              markdown: methodsFivePrinciples.subTitle,
            }}
          />
          <LinkListBox
            links={principlesToDisplay.map((principle) => {
              return {
                id: slugify(principle.label),
                title: `${principle.label}: ${principle.title}`,
              };
            })}
          />
        </Container>
      </Background>
      {principlesToDisplay.map((principle, index) => (
        <PrinciplesDisplay
          key={slugify(principle.label)}
          principle={principle}
          index={index}
          showInfoBoxButtons={false}
        />
      ))}
      <SupportBanner />
    </>
  );
}
