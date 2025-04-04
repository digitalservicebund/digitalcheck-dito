import { type MetaArgs } from "react-router";
import Accordion from "~/components/Accordion";
import Background from "~/components/Background";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBox from "~/components/InfoBox";
import LinkListBox from "~/components/LinkListBox";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { interoperability } from "~/resources/content/interoperabel";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_INTEROPERABILITY.title, matches);
};

export default function Interoperability() {
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: interoperability.headline,
            }}
            content={{
              markdown: interoperability.content,
              className: "md:text-2xl",
            }}
          ></Header>
          <LinkListBox
            links={[
              {
                id: interoperability.andDigitalReadiness.id,
                title: interoperability.andDigitalReadiness.headline,
              },
              {
                id: interoperability.andYourVorhaben.id,
                title: interoperability.andYourVorhaben.headline,
              },
              {
                id: interoperability.info.id,
                title: interoperability.info.headline,
              },
              {
                id: interoperability.resources.id,
                title: interoperability.resources.headline,
              },
              {
                id: interoperability.faq.id,
                title: interoperability.faq.headline,
              },
            ]}
          />
        </Container>
      </Background>
      <div id={interoperability.andDigitalReadiness.id}>
        <Background backgroundColor="midBlue">
          <Container className="flex flex-col py-0 lg:h-[626px] lg:flex-row">
            <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center lg:pr-48">
              <Heading
                tagName="h2"
                text={interoperability.andDigitalReadiness.headline}
                className="mb-8"
              />
              <RichText
                markdown={interoperability.andDigitalReadiness.content}
              />
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
              <div className="w-[630px] bg-[#cce5ef] lg:w-[50vw] [&>img]:object-contain lg:[&>img]:h-[626px]">
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
      </div>
      <div id={interoperability.andYourVorhaben.id}>
        <Container>
          <Heading
            tagName="h2"
            text={interoperability.andYourVorhaben.headline}
            className="mb-8"
          />
          <RichText
            markdown={interoperability.andYourVorhaben.content}
            className="mb-40"
          />
          <ImageZoomable
            url={interoperability.andYourVorhaben.image.url}
            alternativeText={
              interoperability.andYourVorhaben.image.alternativeText
            }
          />
          <Heading
            tagName="h3"
            text={interoperability.andYourVorhaben.law.headline}
            className="mt-40 mb-8"
          />
          <RichText markdown={interoperability.andYourVorhaben.law.content} />
        </Container>
      </div>
      <div id={interoperability.info.id}>
        <Container>
          <InfoBox
            heading={{
              tagName: "h2",
              text: interoperability.info.headline,
            }}
            items={interoperability.info.items}
          />
          <ImageZoomable
            url={interoperability.info.image.url}
            alternativeText={interoperability.info.image.alternativeText}
          />
        </Container>
      </div>
      <div id={interoperability.resources.id}>
        <Background backgroundColor="blue" className="py-48">
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
      </div>
      <div id={interoperability.faq.id}>
        <Container>
          <Heading
            tagName="h2"
            text={interoperability.faq.headline}
            className="mb-8"
          />
          <RichText markdown={interoperability.faq.content} className="mb-40" />
          <Accordion items={interoperability.faq.items} />
        </Container>
      </div>
      <FeedbackForm {...interoperability.feedbackForm} />
      <SupportBanner withFeedbackBanner={false} />
    </>
  );
}
