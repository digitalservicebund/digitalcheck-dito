import ContactPhoneOutlinedIcon from "@digitalservicebund/icons/ContactPhoneOutlined";
import FactCheckOutlinedIcon from "@digitalservicebund/icons/FactCheckOutlined";
import WidgetsOutlinedIcon from "@digitalservicebund/icons/WidgetsOutlined";
import { Link } from "react-router";
import Box from "~/components/Box";
import Button from "~/components/Button";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox.tsx";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import { NumberedList } from "~/components/List";
import RichText from "~/components/RichText";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { index } from "~/resources/content/startseite";
import { startseite } from "~/resources/content/startseite-neu";
import useFeatureFlag from "~/utils/featureFlags";

const {
  title,
  subtitle,
  stepByStep,
  grundlagen,
  visualisierungen,
  prinzipien,
  individuelleExpertise,
  quote,
} = startseite;

export default function Index() {
  const newLandingPage = useFeatureFlag("digitalcheck.enable-new-landing-page");

  if (newLandingPage) {
    return (
      <>
        <Hero
          title={title}
          subtitle={subtitle}
          className="bg-blue-800 text-white"
        />

        <Container className="py-80">
          <Heading tagName="h2" text={stepByStep.title} className="mb-40" />

          <ol className="list-unstyled relative max-w-none md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-[repeat(6,auto)]">
            <div className="absolute h-16 w-16 rounded-full bg-blue-300 max-md:-bottom-8 max-md:left-6 md:-top-6 md:-right-1" />
            {stepByStep.steps.map((step) => (
              <li
                key={step.number}
                className="relative border-blue-300 max-md:ml-12 max-md:border-l-3 max-md:pb-40 max-md:pl-28 md:row-span-6 md:grid md:grid-rows-subgrid md:border-t-3 md:pr-40"
              >
                <div className="absolute flex h-40 w-40 items-center justify-center rounded-full bg-blue-800 font-bold text-white max-md:-left-20 md:-top-20">
                  {step.number}
                </div>

                <Heading
                  tagName="h3"
                  text={step.title}
                  className="ds-heading-03-bold md:mt-40"
                />

                <Button
                  href={step.link.href}
                  look={step.link.look}
                  className="mt-40 self-center"
                >
                  {step.link.text}
                </Button>

                <div className="mt-40">
                  <p className="font-bold">{stepByStep.procedureLabel}:</p>
                  <RichText markdown={step.description} />
                </div>

                <div className="mt-24 border-t-2 border-gray-400 pt-16">
                  <p className="font-bold">{stepByStep.durationLabel}:</p>
                  {step.duration}
                </div>
                <div className="mt-24">
                  <p className="font-bold">{stepByStep.resultLabel}:</p>
                  {step.result}
                </div>
              </li>
            ))}
          </ol>
        </Container>

        <div className="bg-blue-100">
          <Container className="ds-stack ds-stack-40 py-80">
            <Heading tagName="h2" text={grundlagen.title} />

            <InfoBox
              visual={{ type: "icon", Icon: WidgetsOutlinedIcon }}
              look="highlight"
              className="bg-white"
              heading={{
                tagName: "h3",
                text: grundlagen.wasIstDigitaltauglichkeit.title,
              }}
              content={grundlagen.wasIstDigitaltauglichkeit.content}
              linkList={{ links: [grundlagen.wasIstDigitaltauglichkeit.link] }}
            />

            <InfoBox
              visual={{ type: "icon", Icon: FactCheckOutlinedIcon }}
              look="highlight"
              className="bg-white"
              heading={{
                tagName: "h3",
                text: grundlagen.nationaleNormenkontrolle.title,
              }}
              content={grundlagen.nationaleNormenkontrolle.content}
              linkList={{ links: [grundlagen.nationaleNormenkontrolle.link] }}
            />
          </Container>
        </div>

        <div className="bg-[url('/images/trainings.jpg')] bg-cover bg-center">
          <Container className="py-80">
            <InfoBoxSideBySide>
              <InfoBox
                look="method"
                className="bg-white"
                heading={{
                  tagName: "h3",
                  text: visualisierungen.title,
                }}
                content={visualisierungen.content}
                buttons={visualisierungen.buttons}
              />
              <InfoBox
                look="method"
                className="bg-white"
                heading={{
                  tagName: "h3",
                  text: prinzipien.title,
                }}
                content={prinzipien.content}
                buttons={prinzipien.buttons}
              />
            </InfoBoxSideBySide>
          </Container>
        </div>

        <Container className="space-y-48 py-80">
          <InfoBox
            heading={{
              tagName: "h2",
              text: individuelleExpertise.title,
            }}
            content={individuelleExpertise.content}
            buttons={[individuelleExpertise.button]}
          />

          <InfoBox
            look="highlight"
            className="bg-blue-100"
            visual={{ type: "icon", Icon: ContactPhoneOutlinedIcon }}
            heading={{
              tagName: "h3",
              text: quote.text,
              className: "ds-heading-03-reg mb-16",
            }}
            content={quote.reference}
          />
        </Container>
      </>
    );
  }

  const tabsData: TabItem[] = [
    {
      title: index.stepByStep.tabName,
      plausibleEventName: index.stepByStep.plausibleEventName,
      content: (
        <>
          <NumberedList
            className="pb-40"
            heading={{
              tagName: "h2",
              text: index.stepByStep.title,
            }}
            items={index.stepByStep.items}
          />
          <ImageBox
            className="pb-40"
            image={index.stepByStep.processImage.img}
            plausibleEventName={
              index.stepByStep.processImage.plausibleEventName
            }
            border
          />
          {/* currently not used and hidden */}
          <div className="relative left-1/2 hidden w-screen -translate-x-1/2 bg-[url('/images/trainings.jpeg')] bg-cover bg-[0%_35%]">
            <Container>
              <div className="max-w-[630px] rounded-lg bg-white px-16 py-28 md:px-80 md:py-40">
                <Box
                  heading={{ text: index.interoperability.title }}
                  content={{ markdown: index.interoperability.text }}
                  buttons={[index.interoperability.link]}
                />
              </div>
            </Container>
          </div>

          {/* currently not used and hidden */}
          <div className="relative left-1/2 hidden w-screen -translate-x-1/2 bg-blue-800 py-24">
            <Container>
              <div className="ds-stack ds-stack-32 scroll-my-40">
                <Heading tagName="h2" text={index.principles.title} />
                <ol className="list-unstyled space-y-8">
                  {index.principles.content.map((principle) => (
                    <li
                      key={principle}
                      className="before:mb-8 before:block before:w-1/2 before:border-t before:border-blue-700 before:content-[''] first:before:content-none"
                    >
                      {principle}
                    </li>
                  ))}
                </ol>
                <Link
                  to={index.principles.link.href}
                  className="text-link font-bold"
                >
                  {index.principles.link.text}
                </Link>
              </div>
            </Container>
          </div>
        </>
      ),
    },
    {
      title: index.summary.tabName,
      plausibleEventName: index.summary.plausibleEventName,
      content: (
        <InfoBoxList
          heading={{ text: index.summary.title }}
          items={index.summary.items}
          separator
        />
      ),
    },
  ];

  return (
    <>
      <Hero
        title={index.title}
        subtitle={index.subtitle}
        className="bg-blue-800 text-white"
      />

      <Container>
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
