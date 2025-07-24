import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBox from "~/components/InfoBox";
import { BulletList } from "~/components/List";
import { ListItemProps } from "~/components/ListItem";
import RichText from "~/components/RichText";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { spoc } from "~/resources/content/interoperabel-nationale-kontaktstelle";
import { ROUTE_INTEROPERABILITY_SPOC } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_INTEROPERABILITY_SPOC.title);
}

export default function SPOC() {
  const timelineItems: ListItemProps[] = spoc.timeline.items.map((item) => ({
    ...item,
    hasBullet: true,
    headline: {
      ...item.headline,
      tagName: "h3",
      look: "ds-subhead",
    },
  }));
  const tabsData: TabItem[] = [
    {
      title: spoc.landscape.tabName,
      content: (
        <>
          <Heading
            tagName="h2"
            text={spoc.landscape.headline}
            className="mb-8"
          />
          <RichText markdown={spoc.landscape.content} className="mb-40" />
          <ImageZoomable image={spoc.landscape.image} />
          <RichText
            className="mt-16 mb-32"
            markdown={spoc.landscape.contentAfter.content}
          />
          <InfoBox
            detailsSummary={spoc.landscape.contentAfter.infobox.detailsSummary}
          />
          <RichText
            className="mb-48"
            markdown={spoc.landscape.contentAfter.outro}
          />
          <div className="bg-ds-blue relative left-1/2 w-screen -translate-x-1/2">
            <Container>
              <Heading
                tagName="h2"
                text={spoc.responsibilities.headline}
                className="mb-8"
              />
              <RichText
                markdown={spoc.responsibilities.content}
                className="mb-48"
              />
            </Container>
          </div>
          <Container className="px-0">
            <Heading
              tagName="h2"
              text={spoc.timeline.headline}
              className="mb-8"
            />
            <BulletList
              items={timelineItems}
              className="rotate-arrow-bottom mb-48"
            />
          </Container>
        </>
      ),
    },
    {
      title: spoc.states.tabName,
      content: (
        <>
          <Heading tagName="h2" text={spoc.states.headline} />
          {spoc.states.sections.map((section) => (
            <div key={section.headline} className="last:mb-48">
              <Heading
                tagName="h3"
                text={section.headline}
                className="mt-32 mb-8"
              />
              <RichText markdown={section.content} />
            </div>
          ))}
        </>
      ),
    },
    {
      title: spoc.contact.tabName,
      content: (
        <>
          <Heading tagName="h2" text={spoc.contact.headline} />
          {spoc.contact.sections.map((section) => (
            <div key={section.headline} className="last:mb-48">
              <Heading
                tagName="h3"
                text={section.headline}
                className="mt-32 mb-8"
              />
              <RichText markdown={section.content} />
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      <Hero title={spoc.headline} subtitle={spoc.content} />

      <Container>
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
