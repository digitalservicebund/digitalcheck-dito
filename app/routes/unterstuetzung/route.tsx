import React from "react";
import { useLocation } from "react-router";

import { ButtonProps } from "~/components/Button.tsx";
import Container from "~/components/Container";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { support } from "~/resources/content/unterstuetzung";
import { ROUTE_SUPPORT } from "~/resources/staticRoutes";
import { renderButtonContainer } from "~/utils/resourceUtils.tsx";

type Offering = {
  title: string;
  text: string;
  sellingPoints: string;
  button?: ButtonProps;
  details: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    text: string;
  }[];
  examples?: {
    image?: {
      src: string;
      alt: string;
    };
    text: string;
  }[];
};

const {
  socialProof,
  supportHow,
  supportWhat,
  supportOfferings,
  title,
  subtitle,
  kontaktstelle,
} = support;

function Testimonial() {
  return (
    <>
      <p className="-mb-20 text-6xl text-blue-600">&ldquo;</p>
      <RichText
        markdown={socialProof.testimonials[0].quote}
        className="text-base"
      />
      <RichText
        markdown={socialProof.testimonials[0].position}
        className="mt-8 text-base font-bold"
      />
      <RichText
        markdown={socialProof.testimonials[0].ministry}
        className="text-base font-bold text-gray-800"
      />
    </>
  );
}

function SocialProofImage() {
  const { image } = socialProof;
  return <Image url={image.src} alternativeText={image.alt} />;
}

export default function Index() {
  const location = useLocation();
  const initialTabIndex = location.hash === "#angebote" ? 2 : 0;

  const tabsData: TabItem[] = supportOfferings.tabs.map(
    (tab): TabItem => ({
      title: tab.title,
      content: (
        <>
          {tab.offerings.map((offering: Offering) => (
            <Container
              key={offering.title}
              className="mb-32 flex gap-32 rounded-xl bg-blue-100 px-40 max-md:flex-col"
            >
              <InfoBox
                heading={{
                  tagName: "h2",
                  text: offering.title,
                }}
                content={offering.text}
                buttons={offering.button ? [offering.button] : []}
              />
              <div className="flex-none space-y-20 md:w-[310px]">
                <div className="bg-white">
                  <div className="p-28">
                    <Header
                      heading={{
                        tagName: "h4",
                        text: offering.sellingPoints,
                      }}
                    />
                    <div className="divide-y divide-gray-700">
                      {offering.details.map((detail) => (
                        <div key={detail.title} className="py-16">
                          <div className="flex items-center gap-8 pb-8">
                            {detail.icon && (
                              <detail.icon className="size-24 fill-gray-800" />
                            )}
                            <Heading
                              tagName="p"
                              look="ds-label-01-bold"
                              text={detail.title}
                            />
                          </div>
                          <RichText
                            markdown={detail.text}
                            className="text-base"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {offering.examples && (
                  <div className="bg-white">
                    <div className="divide-y divide-gray-700">
                      {offering.examples.map((example, idx) => (
                        <div key={`${offering.title}-example-${idx}`}>
                          {example.image && (
                            <Image
                              url={example.image.src}
                              alternativeText={example.image.alt}
                            />
                          )}
                          <RichText
                            markdown={example.text}
                            className="p-20 text-base"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Container>
          ))}
        </>
      ),
    }),
  );

  return (
    <>
      <MetaTitle prefix={ROUTE_SUPPORT.title} />
      <Hero title={title} subtitle={subtitle} />

      <div className="bg-blue-300">
        <Container className="flex flex-col py-0 lg:h-[420px] lg:flex-row">
          <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center">
            <RichText
              markdown={socialProof.text}
              className="w-[370px] text-2xl leading-40 sm:text-3xl sm:max-lg:w-[480px]"
            />
          </div>
          <div className="relative max-lg:mb-48 max-sm:hidden lg:w-1/2">
            <div className="w-[630px] lg:w-[50vw] lg:[&>img]:h-[420px] lg:[&>img]:w-full lg:[&>img]:object-none lg:[&>img]:object-[10%_75%]">
              <SocialProofImage />
            </div>
            <div className="absolute bottom-40 left-40 max-w-[400px] rounded-lg bg-white/70 p-16 backdrop-blur-sm max-lg:hidden">
              <Testimonial />
            </div>
          </div>
        </Container>
      </div>
      <div className="sm:hidden">
        <SocialProofImage />
      </div>
      <Container className="lg:hidden">
        <Testimonial />
      </Container>
      <Container className="pt-48">
        <InfoBox
          heading={{
            tagName: "h2",
            text: supportWhat.title,
          }}
          content={supportWhat.subtitle}
        />
        <div className="mt-40 flex gap-32 max-sm:flex-col">
          {supportWhat.supportTypes.length > 0 &&
            supportWhat.supportTypes.map((supportType) => (
              <div
                key={supportType.title}
                className="flex gap-16 max-lg:flex-col"
              >
                <supportType.icon className="size-48 flex-none fill-blue-800" />
                <InfoBox
                  heading={{
                    tagName: "h3",
                    text: supportType.title,
                  }}
                  content={supportType.text}
                />
              </div>
            ))}
        </div>
      </Container>
      <div className="bg-blue-100">
        <Container>
          <Heading id="hilfe" tagName="h2" text={supportHow.title} />
          <div className="ds-stack ds-stack-16 pt-32 pb-40">
            <InfoBox>
              <RichText markdown={supportHow.text} />
            </InfoBox>
            {renderButtonContainer(supportHow.buttons)}
          </div>
        </Container>
      </div>
      <div id="angebote">
        <Container className="ds-stack ds-stack-40">
          <InfoBox
            heading={{
              tagName: "h2",
              text: supportOfferings.title,
            }}
          >
            <RichText markdown={supportOfferings.text} />
          </InfoBox>
          <Tabs tabs={tabsData} initialActiveIndex={initialTabIndex} />
        </Container>
      </div>

      <div className="bg-blue-300">
        <Container>
          <InfoBox
            heading={{
              tagName: "h2",
              text: kontaktstelle.title,
            }}
          >
            <RichText markdown={kontaktstelle.text} />
          </InfoBox>
        </Container>
      </div>
    </>
  );
}
