import Container from "~/components/Container";
import { PreCheckFAQ } from "~/components/content/PreCheckFAQ.tsx";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import ImageBox from "~/components/ImageBox";
import InfoBox from "~/components/InfoBox.tsx";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import TabGroup from "~/components/Tabs.tsx";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK } from "~/resources/staticRoutes";
import { PreCheckContinueActions } from "./vorpruefung/PreCheckContinueActions";

export default function Index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_PRECHECK.title} />
      <Hero title={preCheck.start.title} subtitle={preCheck.start.subtitle}>
        <div className="ds-stack ds-stack-16 mb-40">
          {preCheck.start.hints.map((hint) => (
            <DetailsSummary key={hint.title} title={hint.title}>
              <RichText markdown={hint.text} />
            </DetailsSummary>
          ))}
        </div>

        <PreCheckContinueActions />
        <noscript>
          <InlineNotice
            look="warning"
            heading={
              <Heading tagName="h2">{preCheck.start.noscript.headline}</Heading>
            }
            className="mb-40"
          >
            <RichText markdown={preCheck.start.noscript.content} />
          </InlineNotice>
        </noscript>
      </Hero>

      <Container className="lg:pb-80">
        <TabGroup>
          <TabGroup.TabList>
            <TabGroup.Tab>{preCheck.start.summary.tabName}</TabGroup.Tab>
            <TabGroup.Tab>{preCheck.start.info.tabName}</TabGroup.Tab>
            <TabGroup.Tab>{preCheck.faq.tabName}</TabGroup.Tab>
          </TabGroup.TabList>
          <TabGroup.TabPanels>
            <TabGroup.TabPanel>
              <div className="space-y-40">
                <Heading tagName="h2">
                  {preCheck.start.summary.heading.text}
                </Heading>
                <InfoBox heading={preCheck.start.summary.start.heading}>
                  <RichText markdown={preCheck.start.summary.start.content} />
                </InfoBox>
                <ImageBox
                  title={preCheck.start.summary.process.heading}
                  image={preCheck.start.summary.process.image}
                  border
                />

                <InfoBox heading={preCheck.start.summary.relevance.heading}>
                  <RichText
                    markdown={preCheck.start.summary.relevance.content}
                  />
                </InfoBox>
              </div>
            </TabGroup.TabPanel>
            <TabGroup.TabPanel>
              <div className="flex flex-col-reverse items-center gap-48 bg-blue-100 px-16 py-40 md:flex-row md:gap-64 md:px-64">
                <Image
                  url={preCheck.start.info.image.src}
                  alternativeText={preCheck.start.info.image.alt}
                  className="md:w-1/3 md:pl-32"
                />

                <InfoBox
                  heading={{
                    tagName: "h3",
                    look: "ds-heading-03-reg",
                    text: preCheck.start.info.title,
                  }}
                >
                  <RichText markdown={preCheck.start.info.text} />
                  <InfoBox.LinkList
                    links={[
                      {
                        text: preCheck.start.info.action.text,
                        to: preCheck.start.info.action.to,
                        look: "tertiary",
                        className: "mt-20",
                      },
                    ]}
                  />
                </InfoBox>
              </div>
            </TabGroup.TabPanel>
            <TabGroup.TabPanel>
              <Heading
                tagName="h2"
                look="ds-heading-02-reg mb-64 max-sm:mb-56"
                text={preCheck.faq.title}
              />
              <PreCheckFAQ />
            </TabGroup.TabPanel>
          </TabGroup.TabPanels>
        </TabGroup>
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
