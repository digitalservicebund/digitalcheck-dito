import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import { PrinciplePosterBox } from "~/components/PrinciplePosterBox";
import SupportBanner from "~/components/SupportBanner";
import TableOfContents from "~/components/TableOfContents";
import { PrinzipNummer } from "~/resources/constants";
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
        <TableOfContents
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
        <Container key={slugify(principle.title)}>
          <InfoBox
            identifier={slugify(principle.title)}
            key={slugify(principle.title)}
            visual={{
              type: "icon",
              Icon: principle.icon,
            }}
            heading={{
              tagName: "h2",
              text: principle.title,
            }}
            badge={{
              children: principle.label,
              principleNumber: principle.principleNumber as PrinzipNummer,
            }}
            content={principle.content}
            detailsSummary={getDetailsSummary(principle.detailsSummary)}
          />
        </Container>
      ))}

      <PrinciplePosterBox />

      <SupportBanner {...supportBanner} />
    </>
  );
}
