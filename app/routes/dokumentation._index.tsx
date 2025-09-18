import Button, { ButtonLinkProps } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
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
import { supportBanner } from "~/resources/content/shared/support-banner";
import { features } from "~/resources/features";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_INFO,
  ROUTE_DOCUMENTATION_STATIC_WORD,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";
import { renderButtonContainer } from "~/utils/resourceUtils.tsx";

const { start } = digitalDocumentation;

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION.title);
}

function DigitalDocumentationIndex() {
  return (
    <>
      <Hero title={start.title} subtitle={start.subtitle}>
        <div className="mt-40 mb-20 space-y-16">
          {start.hints.map((hint) => (
            <DetailsSummary
              key={hint.title}
              title={hint.title}
              content={hint.text}
            />
          ))}
        </div>

        <ButtonContainer className="mt-20">
          <Button href={ROUTE_DOCUMENTATION_INFO.url}>
            {start.buttonText}
          </Button>
        </ButtonContainer>

        <RichText markdown={start.alternative.text} className="mt-40" />
        <ButtonContainer className="mt-20">
          <Button href={ROUTE_DOCUMENTATION_STATIC_WORD.url} look={"tertiary"}>
            {start.alternative.buttonText}
          </Button>
        </ButtonContainer>
      </Hero>

      <Container>
        <InlineNotice
          look="warning"
          className="mb-40"
          heading={
            <Heading tagName="h2">{start.multipleNotice.headline}</Heading>
          }
        >
          <RichText markdown={start.multipleNotice.content} />
        </InlineNotice>
        <InfoBoxList
          heading={{ text: start.summary.title }}
          items={start.summary.items}
        />
      </Container>
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
