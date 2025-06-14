import Background from "~/components/Background";
import { PrincipleNumber } from "~/components/Badge";
import Container from "~/components/Container";
import Header from "~/components/Header";
import InfoBox from "~/components/InfoBox";
import LinkListBox from "~/components/LinkListBox";
import SupportBanner from "~/components/SupportBanner";
import {
  getDetailsSummary,
  methodsFivePrinciples,
} from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import { slugify } from "~/utils/utilFunctions";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_PRINCIPLES.title);
}

export default function FundamentalsFivePrinciples() {
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
            heading={methodsFivePrinciples.contentOverviewTitle}
            links={methodsFivePrinciples.principles.map((principle) => {
              return {
                id: slugify(principle.title),
                title: principle.title,
              };
            })}
          />
        </Container>
      </Background>

      {methodsFivePrinciples.principles.map((principle) => (
        <Container className="pb-64" key={slugify(principle.title)}>
          <InfoBox
            identifier={slugify(principle.title)}
            separator={false}
            key={slugify(principle.title)}
            Icon={principle.icon}
            heading={{
              tagName: "h2",
              text: principle.title,
            }}
            badge={{
              children: principle.label,
              principleNumber: principle.principleNumber as PrincipleNumber,
            }}
            items={[
              {
                content: principle.content,
                detailsSummary: getDetailsSummary(principle.detailsSummary),
              },
            ]}
          />
        </Container>
      ))}

      <SupportBanner />
    </>
  );
}
