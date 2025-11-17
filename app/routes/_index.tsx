import CloseIcon from "@digitalservicebund/icons/Close";
import ContactPhoneOutlinedIcon from "@digitalservicebund/icons/ContactPhoneOutlined";
import DvrIcon from "@digitalservicebund/icons/Dvr";
import FactCheckOutlinedIcon from "@digitalservicebund/icons/FactCheckOutlined";
import WidgetsOutlinedIcon from "@digitalservicebund/icons/WidgetsOutlined";
import { useState } from "react";
import Badge from "~/components/Badge";
import Button, { LinkButton } from "~/components/Button";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { startseite } from "~/resources/content/startseite";
import { features } from "~/resources/features";
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
  const [showBanner, setShowBanner] = useState(true);
  const enableDigitalDocumentation = useFeatureFlag(
    features.enableDigitalDocumentation,
  );

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
                  <LinkButton
                    to={step.link.to}
                    look={step.link.look}
                    plausibleEventName={step.link.plausibleEventName}
                  >
                    {step.link.text}
                  </LinkButton>
                </div>

                <div className="mt-40">
                  <p className="font-bold">{stepByStep.procedureLabel}:</p>
                  <RichText markdown={step.description.text} />
                  {enableDigitalDocumentation &&
                    step.description
                      .FEATURE_enableDigitalDocumentationHighlight && (
                      <div className="ds-label-02-reg mt-16">
                        <Badge look="hint" className="mr-8">
                          {
                            step.description
                              .FEATURE_enableDigitalDocumentationHighlight.badge
                          }
                        </Badge>
                        {
                          step.description
                            .FEATURE_enableDigitalDocumentationHighlight.text
                        }
                      </div>
                    )}
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
          >
            <RichText markdown={grundlagen.wasIstDigitaltauglichkeit.content} />
            <InfoBox.LinkList
              links={[grundlagen.wasIstDigitaltauglichkeit.link]}
            />
          </InfoBox>

          <InfoBox
            visual={{ type: "icon", Icon: FactCheckOutlinedIcon }}
            look="highlight"
            className="bg-white"
            heading={{
              tagName: "h3",
              text: grundlagen.nationaleNormenkontrolle.title,
            }}
          >
            <RichText markdown={grundlagen.nationaleNormenkontrolle.content} />
            <InfoBox.LinkList
              links={[grundlagen.nationaleNormenkontrolle.link]}
            />
          </InfoBox>
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
            >
              <RichText markdown={visualisierungen.content} />
              <InfoBox.LinkList links={visualisierungen.links} />
            </InfoBox>

            <InfoBox
              look="method"
              className="bg-white"
              heading={{
                tagName: "h3",
                text: prinzipien.title,
              }}
            >
              <RichText markdown={prinzipien.content} />
              <InfoBox.LinkList links={prinzipien.links} />
            </InfoBox>
          </InfoBoxSideBySide>
        </Container>
      </div>

      <Container className="space-y-48 py-40 lg:py-80">
        <InfoBox
          heading={{
            tagName: "h2",
            text: individuelleExpertise.title,
          }}
        >
          <RichText markdown={individuelleExpertise.content} />
          <InfoBox.LinkList links={[individuelleExpertise.link]} />
        </InfoBox>

        <InfoBox
          look="highlight"
          className="bg-blue-100"
          visual={{ type: "icon", Icon: ContactPhoneOutlinedIcon }}
          heading={{
            tagName: "h3",
            text: quote.text,
            className: "ds-heading-03-reg mb-16",
          }}
        >
          <RichText markdown={quote.reference} />
        </InfoBox>
      </Container>

      {showBanner && enableDigitalDocumentation && (
        <div className="relative flex items-center justify-center gap-40 bg-yellow-200 p-24">
          <DvrIcon className="size-96 fill-yellow-300 max-md:hidden" />
          <div className="space-y-8">
            <Heading
              tagName="h2"
              look="ds-label-01-bold"
              className="flex gap-8 max-md:flex-col-reverse md:items-end"
            >
              Digitalcheck-Dokumentation: Jetzt online ausfüllen
              <Badge text="NEU" look="hint" />
            </Heading>

            <RichText
              markdown={
                "Dokumentieren wird einfacher für Sie - jetzt Schritt für Schritt mit Hilfestellungen ausfüllen: [Online-Dokumentation öffnen](/dokumentation)"
              }
            />
          </div>
          <Button
            look="ghost"
            onClick={() => setShowBanner(false)}
            className="absolute top-0 right-0 w-auto p-24"
            aria-label="Schließen"
            type="button"
          >
            <CloseIcon className="fill-blue-800" />
          </Button>
        </div>
      )}
    </>
  );
}
