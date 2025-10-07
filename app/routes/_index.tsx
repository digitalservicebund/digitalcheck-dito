import ContactPhoneOutlinedIcon from "@digitalservicebund/icons/ContactPhoneOutlined";
import FactCheckOutlinedIcon from "@digitalservicebund/icons/FactCheckOutlined";
import WidgetsOutlinedIcon from "@digitalservicebund/icons/WidgetsOutlined";
import Button from "~/components/Button";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { startseite } from "~/resources/content/startseite";

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
  return (
    <>
      <MetaTitle />
      <Hero
        title={title}
        subtitle={subtitle}
        className="bg-blue-800 text-white"
      />

      <Container className="py-40 lg:py-80">
        <Heading tagName="h2" text={stepByStep.title} className="mb-40" />

        <div className="relative">
          <div className="absolute h-16 w-16 rounded-full bg-blue-300 max-lg:-bottom-8 max-lg:left-10 lg:-top-6 lg:-right-1" />
          <ol className="list-unstyled max-w-none max-lg:mx-16 lg:grid lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-[repeat(6,auto)]">
            {stepByStep.steps.map((step) => (
              <li
                key={step.number}
                className="relative border-blue-300 max-lg:border-l-3 max-lg:pb-40 max-lg:pl-40 lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:border-t-3 lg:pr-40"
              >
                <div className="absolute flex h-40 w-40 items-center justify-center rounded-full bg-blue-800 font-bold text-white max-lg:-left-[22px] lg:-top-20">
                  {step.number}
                </div>

                <Heading
                  tagName="h3"
                  text={step.title}
                  className="ds-heading-03-bold lg:mt-40"
                />

                <div className="mt-40 self-center">
                  <Button
                    href={step.link.href}
                    look={step.link.look}
                    plausibleEventName={step.link.plausibleEventName}
                  >
                    {step.link.text}
                  </Button>
                </div>

                <div className="mt-40">
                  <p className="font-bold">{stepByStep.procedureLabel}:</p>
                  <RichText markdown={step.description} />
                </div>

                <div className="mt-24 border-t-2 border-gray-400 pt-16">
                  <p className="font-bold">{stepByStep.durationLabel}:</p>
                  <RichText markdown={step.duration} />
                </div>

                <div className="mt-24">
                  <p className="font-bold">{stepByStep.resultLabel}:</p>
                  <RichText markdown={step.result} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <div className="bg-blue-100">
        <Container className="ds-stack ds-stack-40 py-40 lg:py-80">
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
        <Container className="py-40 lg:py-80">
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

      <Container className="space-y-48 py-40 lg:py-80">
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
