import Accordion from "~/components/Accordion";
import Background from "~/components/Background";
import Box from "~/components/Box.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import FeedbackForm from "~/components/FeedbackForm";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBoxList from "~/components/InfoBoxList";
import RichText from "~/components/RichText";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { interoperability } from "~/resources/content/interoperabel";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_INTEROPERABILITY.title);
}

export default function Interoperability() {
  const tabsData: TabItem[] = [
    {
      title: interoperability.andYourVorhaben.tabName,
      content: (
        <>
          <Heading
            tagName="h2"
            text={interoperability.andYourVorhaben.headline}
            className="mb-8"
          />
          <RichText
            markdown={interoperability.andYourVorhaben.content}
            className="mb-40"
          />
          <ImageZoomable image={interoperability.andYourVorhaben.image} />
          <Heading
            tagName="h3"
            text={interoperability.andYourVorhaben.law.headline}
            className="mt-40 mb-8"
          />
          <RichText markdown={interoperability.andYourVorhaben.law.content} />
          <Box
            className="pt-64 pb-48"
            heading={{
              tagName: "h2",
              text: interoperability.kontaktstelle.title,
            }}
            content={{ markdown: interoperability.kontaktstelle.text }}
            buttons={interoperability.kontaktstelle.buttons}
          />
          <FeedbackForm
            className="relative left-1/2 w-screen -translate-x-1/2"
            {...interoperability.feedbackForm}
          />
        </>
      ),
    },
    {
      title: interoperability.info.headline,
      content: (
        <>
          <Container className="px-0 pt-0">
            <InfoBoxList separator>
              <Heading tagName="h2">{interoperability.info.headline}</Heading>
              <InfoBoxList.List>
                {interoperability.info.items.map((item) => (
                  <InfoBoxList.Item key={item.heading.text} {...item} />
                ))}
              </InfoBoxList.List>
            </InfoBoxList>

            <ImageZoomable image={interoperability.info.image} />
          </Container>

          <Background
            backgroundColor="blue"
            className="relative left-1/2 w-screen -translate-x-1/2 py-48"
          >
            <Container backgroundColor="white" overhangingBackground>
              <Heading
                tagName="h2"
                text={interoperability.resources.headline}
                className="mb-8"
              />
              <p>{interoperability.resources.subtitle}</p>
              {interoperability.resources.groups.map((group) => (
                <div key={group.title} className="mt-10 p-24 pl-0">
                  <div className="mb-10 flex items-center">
                    <group.icon className="mr-10 size-32" />
                    <Heading
                      tagName="h3"
                      look="ds-label-01-bold"
                      text={group.title}
                    />
                  </div>
                  <p className="mb-20">{group.subtitle}</p>
                  <RichText markdown={group.content} />
                </div>
              ))}
            </Container>
          </Background>
        </>
      ),
    },
    {
      title: interoperability.faq.tabName,
      content: (
        <>
          <Heading
            tagName="h2"
            text={interoperability.faq.headline}
            className="mb-8"
          />
          <RichText markdown={interoperability.faq.content} className="mb-40" />
          <Accordion items={interoperability.faq.items} />
        </>
      ),
    },
  ];
  return (
    <>
      <Hero
        title={interoperability.headline}
        subtitle={interoperability.content}
      />

      <Background backgroundColor="midBlue">
        <Container className="flex flex-col py-0 lg:h-[626px] lg:flex-row">
          <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center lg:pr-48">
            <Heading
              tagName="h2"
              text={interoperability.andDigitalReadiness.headline}
              className="mb-8"
            />
            <RichText markdown={interoperability.andDigitalReadiness.content} />
            <ButtonContainer
              className="mt-20"
              buttons={[
                {
                  text: interoperability.andDigitalReadiness.button,
                  href: ROUTE_PRECHECK.url,
                },
              ]}
            />
          </div>
          <div className="relative max-lg:mb-48 max-sm:hidden lg:w-1/2">
            <div className="flex h-full w-[630px] flex-col justify-center bg-[#B3C9D6] align-middle lg:w-[50vw] [&>img]:object-contain lg:[&>img]:h-[550px]">
              <Image
                url={interoperability.andDigitalReadiness.image.url}
                alternativeText={
                  interoperability.andDigitalReadiness.image.alternativeText
                }
              />
            </div>
          </div>
        </Container>
        <div className="sm:hidden">
          <Image
            url={interoperability.andDigitalReadiness.image.url}
            alternativeText={
              interoperability.andDigitalReadiness.image.alternativeText
            }
          />
        </div>
      </Background>
      <Container>
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
