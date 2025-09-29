import { SaveAltOutlined } from "@digitalservicebund/icons";
import Accordion from "~/components/Accordion";
import Button, { ButtonLinkProps } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading.tsx";
import Hero from "~/components/Hero";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import {
  digitalDocumentation,
  documentation,
} from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { features } from "~/resources/features";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_INFO,
  ROUTE_DOCUMENTATION_STATIC_WORD,
  ROUTE_LANDING,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

const { start } = digitalDocumentation;

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION.title);
}

function DigitalDocumentationIndex() {
  return (
    <>
      <Hero title={start.title} subtitle={start.subtitle}>
        <div className="mt-40 space-y-40">
          <ButtonContainer>
            <Button href={ROUTE_DOCUMENTATION_INFO.url}>
              {start.buttonText}
            </Button>
            <Button href={ROUTE_LANDING.url} look={"tertiary"}>
              {general.buttonBack.text}
            </Button>
          </ButtonContainer>

          <div className="space-y-8">
            <RichText markdown={start.alternative.text} />

            <Button
              look="link"
              href={ROUTE_DOCUMENTATION_STATIC_WORD.url}
              iconLeft={<SaveAltOutlined className="mr-2 fill-blue-800" />}
            >
              {start.alternative.buttonText}
            </Button>
          </div>
        </div>
      </Hero>

      <div className="container my-80 space-y-80">
        <section className="space-y-40">
          <Heading tagName="h2">{start.description.title}</Heading>

          <NumberedList>
            {start.description.items.map((item) => (
              <NumberedList.Item key={item.title}>
                <span>{item.title}</span>
                {item.content && <RichText markdown={item.content} />}
              </NumberedList.Item>
            ))}
          </NumberedList>
        </section>

        <InlineNotice
          look="tips"
          heading={
            <Heading tagName="h2">{start.dataSavingHint.headline}</Heading>
          }
        >
          <RichText markdown={start.dataSavingHint.content} />
        </InlineNotice>

        <InfoBoxList
          heading={{ text: start.tips.title }}
          items={start.tips.items}
        />
      </div>

      <section className="bg-blue-300 py-40">
        <div className="container space-y-40">
          <Button href={ROUTE_DOCUMENTATION_INFO.url}>
            {start.buttonText}
          </Button>

          <div className="space-y-8">
            <RichText markdown={start.alternative.text} />

            <Button
              look="link"
              href={ROUTE_DOCUMENTATION_STATIC_WORD.url}
              iconLeft={<SaveAltOutlined className="mr-2 fill-blue-800" />}
            >
              {start.alternative.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <div className="container my-80 space-y-40">
        <Heading tagName="h2">{start.faq.title}</Heading>

        <Accordion
          items={start.faq.questions.map(({ title, content }) => ({
            headline: title,
            content,
          }))}
        />
      </div>

      <SupportBanner {...supportBanner} />
    </>
  );
}

function DocumentationIndex() {
  return (
    <>
      <Hero title={documentation.title} subtitle={documentation.subtitle}>
        <ButtonContainer className="mt-48">
          {documentation.buttons.map((button) => (
            <Button key={button.text ?? button.href} {...button} />
          ))}
        </ButtonContainer>
      </Hero>

      <Container className="max-sm:p-0!">
        <InlineNotice
          look="warning"
          heading={
            <Heading tagName="h2">
              {documentation.multipleNotice.headline}
            </Heading>
          }
        >
          <RichText markdown={documentation.multipleNotice.content} />
        </InlineNotice>
      </Container>
      <Container>
        <InfoBoxList
          heading={{ text: documentation.summary.title }}
          items={documentation.summary.items}
          separator
        />
      </Container>
      <Container className="mb-80 space-y-32 pb-0">
        <h2>{documentation.nextSteps.title}</h2>
        <NumberedList>
          {documentation.nextSteps.items.map((item) => (
            <NumberedList.Item
              key={item.headline.text}
              className="space-y-16"
              disabled={item.isDisabled}
            >
              <p className={"ds-heading-03-reg"}>{item.headline.text}</p>
              {"content" in item && (
                <RichText markdown={item.content as string} />
              )}
              {"buttons" in item &&
                renderButtonContainer(item.buttons as ButtonLinkProps[])}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}

export default function Index() {
  const enableDigitalDocumentation = useFeatureFlag(
    features.enableDigitalDocumentation,
  );

  if (enableDigitalDocumentation) {
    return <DigitalDocumentationIndex />;
  }

  return <DocumentationIndex />;
}
