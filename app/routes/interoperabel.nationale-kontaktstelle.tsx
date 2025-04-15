import { type MetaArgs } from "react-router";
import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBox from "~/components/InfoBox.tsx";
import LinkListBox from "~/components/LinkListBox";
import { BulletList } from "~/components/List";
import { ListItemProps } from "~/components/ListItem";
import RichText from "~/components/RichText";
import { spoc } from "~/resources/content/interoperabel-nationale-kontaktstelle";
import { ROUTE_INTEROPERABILITY_SPOC } from "~/resources/routeDefinitions";
import prependMetaTitle from "~/utils/metaTitle";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_INTEROPERABILITY_SPOC.title, matches);
};

export const handle = {
  breadcrumb: () => ROUTE_INTEROPERABILITY_SPOC,
};

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

  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: spoc.headline,
            }}
            content={{
              markdown: spoc.content,
              className: "md:text-2xl",
            }}
          ></Header>
          <LinkListBox
            links={[
              {
                id: spoc.landscape.id,
                title: spoc.landscape.headline,
              },
              {
                id: spoc.responsibilities.id,
                title: spoc.responsibilities.headline,
              },
              {
                id: spoc.timeline.id,
                title: spoc.timeline.headline,
              },
              {
                id: spoc.states.id,
                title: spoc.states.headline,
              },
              {
                id: spoc.contact.id,
                title: spoc.contact.headline,
              },
            ]}
          />
        </Container>
      </Background>
      <div id={spoc.landscape.id}>
        <Container>
          <Heading
            tagName="h2"
            text={spoc.landscape.headline}
            className="mb-8"
          />
          <RichText markdown={spoc.landscape.content} className="mb-40" />
          <ImageZoomable
            url={spoc.landscape.image.url}
            alternativeText={spoc.landscape.image.alternativeText}
          />
          <RichText
            className="mt-16 mb-32"
            markdown={spoc.landscape.contentAfter.content}
          />
          <InfoBox items={spoc.landscape.contentAfter.infobox} />
          <RichText
            className="mb-48"
            markdown={spoc.landscape.contentAfter.outro}
          />
        </Container>
      </div>
      <div id={spoc.responsibilities.id}>
        <Background backgroundColor="blue">
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
        </Background>
      </div>
      <div id={spoc.timeline.id}>
        <Container>
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
      </div>
      <div id={spoc.states.id}>
        <Background backgroundColor="blue">
          <Container>
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
          </Container>
        </Background>
      </div>
      <div id={spoc.contact.id}>
        <Container>
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
        </Container>
      </div>
    </>
  );
}
