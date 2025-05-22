import { type MetaArgs } from "react-router";
import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import InfoBox from "~/components/InfoBox.tsx";
import { BulletList } from "~/components/List.tsx";
import SupportBanner from "~/components/SupportBanner";
import { fundamentalsMethods } from "~/resources/content/grundlage-methoden.ts";
import { ROUTE_FUNDAMENTALS_METHODS } from "~/resources/staticRoutes";
import { methodStepsItems } from "~/utils/listProcessing.ts";
import prependMetaTitle from "~/utils/metaTitle";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_FUNDAMENTALS_METHODS.title, matches);
};

export default function FundamentalsMethods() {
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: fundamentalsMethods.title,
            }}
            content={{
              markdown: fundamentalsMethods.subTitle,
            }}
          />
        </Container>
      </Background>
      <Container>
        <InfoBox
          heading={{
            tagName: "h2",
            text: fundamentalsMethods.roadmap.title,
          }}
          items={fundamentalsMethods.roadmap.items}
        />
      </Container>
      <Container>
        <BulletList className="mb-40" items={methodStepsItems(false)} />
      </Container>
      <SupportBanner />
    </>
  );
}
