import Box from "~/components/Box";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
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
      <Box
        className="pb-64"
        key={item.title}
        heading={{
          tagName: "h2",
          text: item.title,
        }}
        content={{ markdown: item.content }}
        buttons={item.buttons}
      />
    ),
  }));

  return (
    <>
      <Hero title={examples.title} subtitle={examples.subtitle} />

      <Container className="pb-0">
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
