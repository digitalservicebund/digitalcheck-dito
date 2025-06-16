import Accordion from "~/components/Accordion";
import Background from "~/components/Background";
import Box from "~/components/Box";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox";
import SupportBanner from "~/components/SupportBanner";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { PRE_CHECK_START_BUTTON_ID } from "~/resources/constants";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";
import {
  ROUTE_LANDING,
  ROUTE_PRECHECK,
  ROUTE_PRECHECK_INFO,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PRECHECK.title);
}

export default function Index() {
  const tabsData: TabItem[] = [
    {
      title: preCheck.start.summary.tabName,
      content: (
        <InfoBox
          heading={{
            text: preCheck.start.summary.title,
            tagName: "h2",
          }}
          items={preCheck.start.summary.items}
        ></InfoBox>
      ),
    },
    {
      title: preCheck.start.info.tabName,
      content: (
        <Background backgroundColor="blue">
          <div className="flex flex-col-reverse items-center gap-48 px-16 py-40 md:flex-row md:gap-64 md:px-64">
            <Image
              url={preCheck.start.info.image.src}
              alternativeText={preCheck.start.info.image.alt}
              className="md:w-1/3 md:pl-32"
            />
            <Box
              heading={{
                tagName: "h3",
                look: "ds-heading-03-reg",
                text: preCheck.start.info.title,
              }}
              content={{
                markdown: preCheck.start.info.text,
              }}
              buttons={[
                {
                  text: preCheck.start.info.button.text,
                  href: preCheck.start.info.button.href,
                  look: "tertiary",
                  className: "mt-20",
                },
              ]}
            />
          </div>
        </Background>
      ),
    },
    {
      title: preCheck.faq.tabName,
      content: (
        <>
          <Heading
            tagName="h2"
            look="ds-heading-02-reg mb-64 max-sm:mb-56"
            text={preCheck.faq.title}
          />
          <Accordion items={preCheck.faq.items} />
        </>
      ),
    },
  ];

  return (
    <>
      <Hero title={preCheck.start.title} subtitle={preCheck.start.subtitle}>
        <div className="ds-stack ds-stack-16 mb-40">
          {preCheck.start.hints.map((hint) => (
            <DetailsSummary
              key={hint.title}
              title={hint.title}
              content={hint.text}
            />
          ))}
        </div>
        <ButtonContainer
          buttons={[
            {
              id: PRE_CHECK_START_BUTTON_ID,
              text: preCheck.start.buttonText,
              href: ROUTE_PRECHECK_INFO.url,
              type: "submit",
            },
            {
              id: "preCheck-back-button",
              text: general.buttonBack.text,
              href: ROUTE_LANDING.url,
              look: "tertiary",
            },
          ]}
        />
      </Hero>

      <Container>
        <Tabs tabs={tabsData} />
      </Container>
      <SupportBanner />
    </>
  );
}
