import { LinkButton } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import { PreCheckFAQ } from "~/components/content/PreCheckFAQ.tsx";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import ImageBox from "~/components/ImageBox";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import TabGroup from "~/components/Tabs.tsx";
import { PRE_CHECK_START_BUTTON_ID } from "~/resources/constants";
import { general } from "~/resources/content/shared/general";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { preCheck } from "~/resources/content/vorpruefung";
import {
  ROUTE_LANDING,
  ROUTE_PRECHECK,
  ROUTE_PRECHECK_INFO,
} from "~/resources/staticRoutes";

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
        <ButtonContainer>
          <LinkButton
            id={PRE_CHECK_START_BUTTON_ID}
            to={ROUTE_PRECHECK_INFO.url}
          >
            {preCheck.start.buttonText}
          </LinkButton>
          <LinkButton
            id="preCheck-back-button"
            to={ROUTE_LANDING.url}
            look="tertiary"
          >
            {general.buttonBack.text}
          </LinkButton>
        </ButtonContainer>
      </Hero>

      <Container>
        <TabGroup>
          <TabGroup.TabList>
            <TabGroup.Tab>{preCheck.start.summary.tabName}</TabGroup.Tab>
            <TabGroup.Tab>{preCheck.start.info.tabName}</TabGroup.Tab>
            <TabGroup.Tab>{preCheck.faq.tabName}</TabGroup.Tab>
          </TabGroup.TabList>
          <TabGroup.TabPanels>
            <TabGroup.TabPanel>
              <div className="space-y-40">
                <InfoBoxList
                  heading={preCheck.start.summary.heading}
                  items={[preCheck.start.summary.start]}
                />
                <ImageBox
                  title={preCheck.start.summary.process.heading}
                  image={preCheck.start.summary.process.image}
                  border
                />
                <InfoBox
                  heading={preCheck.start.summary.relevance.heading}
                  content={preCheck.start.summary.relevance.content}
                />
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
                  content={preCheck.start.info.text}
                >
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
