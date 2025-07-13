import { PrincipleNumber } from "~/components/Badge";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import LinkListBox from "~/components/LinkListBox";
import SupportBanner from "~/components/SupportBanner";
import {
  getDetailsSummary,
  methodsFivePrinciples,
} from "~/resources/content/methode-fuenf-prinzipien";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import { slugify } from "~/utils/utilFunctions";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_PRINCIPLES.title);
}

export default function FundamentalsFivePrinciples() {
  return (
    <>
      <Hero
        title={methodsFivePrinciples.title}
        subtitle={methodsFivePrinciples.subtitle}
      >
        <LinkListBox
          heading={methodsFivePrinciples.contentOverviewTitle}
          links={methodsFivePrinciples.principles.map((principle) => {
            return {
              id: slugify(principle.title),
              title: principle.title,
            };
          })}
        />
      </Hero>

      {methodsFivePrinciples.principles.map((principle) => (
        <Container className="pb-64" key={slugify(principle.title)}>
          <InfoBox
            identifier={slugify(principle.title)}
            key={slugify(principle.title)}
            icon={{ icon: <principle.icon />, size: "XSMALL" }}
            heading={{
              tagName: "h2",
              text: principle.title,
            }}
            badge={{
              children: principle.label,
              principleNumber: principle.principleNumber as PrincipleNumber,
            }}
            content={principle.content}
            detailsSummary={getDetailsSummary(principle.detailsSummary)}
          />
        </Container>
      ))}

      <SupportBanner {...supportBanner} />
    </>
  );
}
