import {
  ArrowCircleRightOutlined,
  DrawOutlined,
} from "@digitalservicebund/icons";
import Badge, { PrincipleNumber } from "~/components/Badge";
import Box from "~/components/Box";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import DetailsSummaryList from "~/components/DetailsSummaryList";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import LinkList from "~/components/LinkList";
import LinkListBox from "~/components/LinkListBox";
import RichText from "~/components/RichText";
import Separator from "~/components/Separator";
import {
  getDetailsSummary,
  methodsFivePrinciples,
} from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

import { slugify } from "~/utils/utilFunctions";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS_PRINCIPLES.title);
}

export default function FivePrinciples() {
  return (
    <>
      <Hero
        title={methodsFivePrinciples.title}
        subtitle={methodsFivePrinciples.subtitle}
      >
        <LinkListBox
          heading={methodsFivePrinciples.contentOverviewTitle}
          links={[
            {
              id: "instruction",
              title: methodsFivePrinciples.anchor.instruction,
            },
            ...methodsFivePrinciples.principles.map((principle) => {
              return {
                id: slugify(principle.title),
                title: `${methodsFivePrinciples.anchor.principle} ${principle.title}`,
              };
            }),
          ]}
        />
      </Hero>

      <Container className="ds-stack ds-stack-40">
        <InfoBoxList
          heading={
            <div id="instruction">
              <Badge Icon={DrawOutlined}>
                {methodsFivePrinciples.instruction.badge}
              </Badge>
              <Heading tagName="h2">
                {methodsFivePrinciples.instruction.title}
              </Heading>
            </div>
          }
        >
          {methodsFivePrinciples.instruction.items.map((item) => (
            <InfoBox key={item.headline}>
              <Heading tagName="h2">{item.headline}</Heading>
              <RichText>{item.content}</RichText>
              {item.link && (
                <LinkList
                  links={[{ title: item.link.text, url: item.link.url }]}
                ></LinkList>
              )}
            </InfoBox>
          ))}
        </InfoBoxList>
        <Separator />
      </Container>

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

      {methodsFivePrinciples.nextStep && (
        <Container>
          <Box
            heading={{
              text: methodsFivePrinciples.nextStep.title,
              look: "ds-heading-03-reg",
            }}
            badge={{
              text: methodsFivePrinciples.nextStep.label,
              Icon: ArrowCircleRightOutlined,
            }}
            content={{ markdown: methodsFivePrinciples.nextStep.text }}
            buttons={methodsFivePrinciples.nextStep.buttons}
          />
        </Container>
      )}
    </>
  );
}
