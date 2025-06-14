import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";
import Header from "~/components/Header";
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
      <Background backgroundColor="blue" className="py-24">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: examples.title,
            }}
            content={{
              markdown: examples.subtitle,
              className: "md:text-2xl",
            }}
          ></Header>
        </Container>
      </Background>
      <Container className="pb-0">
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
