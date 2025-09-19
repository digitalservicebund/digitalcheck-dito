import ContentWrapper from "~/components/ContentWrapper";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { examples } from "~/resources/content/beispiele";
import { ROUTE_EXAMPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_EXAMPLES.title);
}

export default function Digitaltauglichkeit_index() {
  const tabsData: TabItem[] = examples.boxItems.map((item) => ({
    title: item.tabName,
    content: (
      <InfoBox
        key={item.title}
        heading={{
          tagName: "h2",
          text: item.title,
        }}
        content={item.content}
        buttons={item.buttons}
      />
    ),
  }));

  return (
    <>
      <Hero title={examples.title} subtitle={examples.subtitle} />

      <ContentWrapper>
        <Tabs tabs={tabsData} />
      </ContentWrapper>
    </>
  );
}
