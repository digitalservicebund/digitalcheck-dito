import { ReactNode } from "react";
import Badge from "~/components/Badge.tsx";
import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageZoomable from "~/components/ImageZoomable";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import Timeline from "~/components/Timeline";
import { spoc } from "~/resources/content/interoperabel-nationale-kontaktstelle";
import { ROUTE_INTEROPERABILITY_SPOC } from "~/resources/staticRoutes";

function SPoCTimelineItem({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <Timeline.Item bullet className="mt-4 flex flex-col gap-16">
      {children}
    </Timeline.Item>
  );
}

const timelineItems = spoc.timeline.items.map((item, index) => ({
  ...item,
  key: index,
}));

export default function SinglePointOfContact() {
  const tabsData: TabItem[] = [
    {
      title: spoc.landscape.tabName,
      content: (
        <>
          <div className="container">
            <Heading
              tagName="h2"
              text={spoc.landscape.headline}
              className="mb-8"
            />
            <RichText
              markdown={spoc.landscape.content}
              className="ds-stack-24 mb-40"
            />
            <ImageZoomable image={spoc.landscape.image} />
            <RichText
              className="mt-16 mb-32"
              markdown={spoc.landscape.contentAfter.content}
            />
            <DetailsSummary
              className="mt-16 mb-32"
              title={spoc.landscape.contentAfter.infobox.detailsSummary.title}
            >
              <RichText
                markdown={
                  spoc.landscape.contentAfter.infobox.detailsSummary.content
                }
              />
            </DetailsSummary>
            <RichText
              className="mb-48"
              markdown={spoc.landscape.contentAfter.outro}
            />
          </div>
          <div className="bg-blue-100">
            <Container>
              <Heading
                tagName="h2"
                text={spoc.responsibilities.headline}
                className="mb-8"
              />
              <RichText markdown={spoc.responsibilities.content} />
            </Container>
          </div>
          <ContentWrapper className="lg:mt-40">
            <Heading
              tagName="h2"
              text="Aktueller Stand der Integration in den Digitalcheck"
              className="mb-8"
            />
            <Timeline>
              {timelineItems.map((timelineItem) => (
                <SPoCTimelineItem key={timelineItem.key}>
                  <Badge look="gray">{timelineItem.badge.text}</Badge>
                  <h3 className="ds-subhead hyphens-none">
                    {timelineItem.headline.text}
                  </h3>
                  {timelineItem.content && (
                    <RichText markdown={timelineItem.content} />
                  )}
                  {timelineItem.image && (
                    <ImageZoomable
                      image={{
                        url: timelineItem.image.url,
                        alternativeText: timelineItem.image.alternativeText,
                        className: "max-w-a11y",
                      }}
                    />
                  )}
                </SPoCTimelineItem>
              ))}
            </Timeline>
          </ContentWrapper>
        </>
      ),
    },
    {
      title: spoc.states.tabName,
      content: (
        <div className="container">
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
        </div>
      ),
    },
    {
      title: spoc.contact.tabName,
      content: (
        <div className="container">
          <Heading tagName="h2" text={spoc.contact.headline} />
          {spoc.contact.sections.map((section) => (
            <div key={section.headline} className="last:mb-48">
              <Heading
                tagName="h3"
                text={section.headline}
                className="mt-32 mb-8"
              />
              <RichText markdown={section.content} className="ds-stack-24" />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <MetaTitle prefix={ROUTE_INTEROPERABILITY_SPOC.title} />
      <Hero title={spoc.headline}>
        <RichText markdown={spoc.content} className="ds-subhead ds-stack-24" />
      </Hero>

      <Tabs wrapperClassName="container mt-40" tabs={tabsData} />
    </>
  );
}
