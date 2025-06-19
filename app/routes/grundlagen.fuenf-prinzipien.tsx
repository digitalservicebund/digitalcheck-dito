import { ArrowCircleRightOutlined } from "@digitalservicebund/icons";
import Badge, { PrincipleNumber } from "~/components/Badge";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import DetailsSummaryList from "~/components/DetailsSummaryList";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import LinkListBox from "~/components/LinkListBox";
import RichText from "~/components/RichText";
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
            icon={{ content: <ArrowCircleRightOutlined />, size: "XSMALL" }}
          >
            <Badge
              principleNumber={principle.principleNumber as PrincipleNumber}
            >
              {principle.label}
            </Badge>
            <Heading tagName="h2">{principle.title}</Heading>
            <RichText>{principle.content}</RichText>

            <Heading tagName="h3">{principle.detailsSummary.title}</Heading>
            <DetailsSummaryList>
              {getDetailsSummary(principle.detailsSummary).items.map(
                (detail) => (
                  <DetailsSummary key={detail.title} {...detail} />
                ),
              )}
            </DetailsSummaryList>
          </InfoBox>
        </Container>
      ))}

      <SupportBanner {...supportBanner} />
    </>
  );
}
