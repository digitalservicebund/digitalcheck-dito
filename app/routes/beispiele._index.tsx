import ContentWrapper from "~/components/ContentWrapper";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import TabGroup from "~/components/Tabs.tsx";
import { examples } from "~/resources/content/beispiele";
import { ROUTE_EXAMPLES } from "~/resources/staticRoutes";

export default function Digitaltauglichkeit_index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_EXAMPLES.title} />
      <Hero title={examples.title} subtitle={examples.subtitle} />

      <ContentWrapper>
        <TabGroup>
          <TabGroup.TabList>
            <TabGroup.Tab>{examples.boxItems[0].tabName}</TabGroup.Tab>
            <TabGroup.Tab>{examples.boxItems[1].tabName}</TabGroup.Tab>
          </TabGroup.TabList>
          <TabGroup.TabPanels>
            <TabGroup.TabPanel>
              <InfoBox
                heading={{
                  tagName: "h2",
                  text: examples.boxItems[0].title,
                }}
              >
                <RichText markdown={examples.boxItems[0].content} />
                <InfoBox.LinkList links={examples.boxItems[0].links} />
              </InfoBox>
            </TabGroup.TabPanel>
            <TabGroup.TabPanel>
              <InfoBox
                heading={{
                  tagName: "h2",
                  text: examples.boxItems[1].title,
                }}
              >
                <RichText markdown={examples.boxItems[1].content} />
                <InfoBox.LinkList links={examples.boxItems[1].links} />
              </InfoBox>
            </TabGroup.TabPanel>
          </TabGroup.TabPanels>
        </TabGroup>
      </ContentWrapper>
    </>
  );
}
