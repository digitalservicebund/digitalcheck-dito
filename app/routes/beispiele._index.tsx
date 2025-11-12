import ContentWrapper from "~/components/ContentWrapper";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
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
                content={examples.boxItems[0].content}
                links={examples.boxItems[0].links}
              />
            </TabGroup.TabPanel>
            <TabGroup.TabPanel>
              <InfoBox
                heading={{
                  tagName: "h2",
                  text: examples.boxItems[1].title,
                }}
                content={examples.boxItems[1].content}
                links={examples.boxItems[1].links}
              />
            </TabGroup.TabPanel>
          </TabGroup.TabPanels>
        </TabGroup>
      </ContentWrapper>
    </>
  );
}
