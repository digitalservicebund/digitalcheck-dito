import { JSX } from "react";
import AccordionItem from "~/components/AccordionItem.tsx";
import { LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import TabGroup from "~/components/Tabs.tsx";
import { interoperability } from "~/resources/content/interoperabel";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";

export default function Interoperability() {
  const tabsData: { title: string; content: JSX.Element }[] = [
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
          <InfoBox
            className="mt-80"
            heading={{
              tagName: "h2",
              text: interoperability.kontaktstelle.title,
            }}
            content={interoperability.kontaktstelle.text}
            links={interoperability.kontaktstelle.links}
          />
        </>
      ),
    },
    {
      title: interoperability.info.heading,
      content: (
        <>
          <Container className="px-0 pt-0">
            <InfoBoxList
              heading={{ text: interoperability.info.heading }}
              items={interoperability.info.items}
            />

            <ImageZoomable image={interoperability.info.image} />
          </Container>

          <div className="relative left-1/2 w-screen -translate-x-1/2 bg-blue-100 py-48">
            <Container className="bg-white" overhangingBackground>
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
          </div>
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
          <div>
            {interoperability.faq.items.map((item) => (
              <AccordionItem key={item.headline} headline={item.headline}>
                <RichText markdown={item.content} />
              </AccordionItem>
            ))}
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <MetaTitle prefix={ROUTE_INTEROPERABILITY.title} />
      <Hero
        title={interoperability.headline}
        subtitle={interoperability.content}
      />

      <div className="bg-blue-300">
        <Container className="flex flex-col py-0 lg:h-[626px] lg:flex-row">
          <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center lg:pr-48">
            <Heading
              tagName="h2"
              text={interoperability.andDigitalReadiness.headline}
              className="mb-8"
            />
            <RichText markdown={interoperability.andDigitalReadiness.content} />
            <ButtonContainer className="mt-20">
              <LinkButton to={ROUTE_PRECHECK.url}>
                {interoperability.andDigitalReadiness.button}
              </LinkButton>
            </ButtonContainer>
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
      </div>
      <ContentWrapper>
        <TabGroup>
          <TabGroup.TabList>
            {tabsData.map(({ title }) => (
              <TabGroup.Tab key={title}>{title}</TabGroup.Tab>
            ))}
          </TabGroup.TabList>
          <TabGroup.TabPanels>
            {tabsData.map(({ content, title }) => (
              <TabGroup.TabPanel key={title}>{content}</TabGroup.TabPanel>
            ))}
          </TabGroup.TabPanels>
        </TabGroup>
      </ContentWrapper>
    </>
  );
}
