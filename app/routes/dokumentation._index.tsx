import { SaveAltOutlined } from "@digitalservicebund/icons";
import { useNavigate } from "react-router";
import Button, { ButtonLinkProps } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Dialog from "~/components/Dialog.tsx";
import Heading from "~/components/Heading.tsx";
import Hero from "~/components/Hero";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
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
  ROUTE_DOCUMENTATION_TEMPLATE_WORD,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import { useDocumentationData } from "~/routes/dokumentation/documentationDataHook.ts";
import { deleteDocumentationData } from "~/routes/dokumentation/documentationDataService.ts";
import useFeatureFlag from "~/utils/featureFlags";
import { useNonce } from "~/utils/nonce";
import { renderButtonContainer } from "~/utils/resourceUtils";

const { start } = digitalDocumentation;

function StartOverDialog() {
  const navigate = useNavigate();
  return (
    <Dialog
      title={"Neue Dokumentation beginnen"}
      openCloseButton={({ toggleDialog }) => (
        <Button look="tertiary" className={"js-only"} onClick={toggleDialog}>
          {start.actions.startOver.buttonText}
        </Button>
      )}
      dialogButtons={({ closeDialog }) => (
        <div className="flex flex-row gap-12">
          <Button
            type="button"
            onClick={async () => {
              deleteDocumentationData();
              await navigate(ROUTE_DOCUMENTATION_TITLE.url);
            }}
          >
            {start.startOverDialog.actions.confirm}
          </Button>

          <Button type="button" look="tertiary" onClick={closeDialog}>
            {general.buttonCancel.text}
          </Button>
        </div>
      )}
    >
      <div className="space-y-16">
        <RichText markdown={start.startOverDialog.bodyMarkdown} />
      </div>
    </Dialog>
  );
}

function StartOrContinueButtons() {
  const { hasSavedDocumentation } = useDocumentationData();
  const nonce = useNonce();
  return (
    <ButtonContainer>
      {hasSavedDocumentation ? (
        <>
          <Button href={ROUTE_DOCUMENTATION_TITLE.url} className="js-only">
            {start.actions.resume.buttonText}
          </Button>
          <StartOverDialog />
        </>
      ) : (
        <Button href={ROUTE_DOCUMENTATION_TITLE.url} className="js-only">
          {start.actions.startInitial.buttonText}
        </Button>
      )}
      <noscript>
        {/* Hides the CTA when JavaScript is disabled */}
        <style nonce={nonce}>{".js-only {display: none;}"}</style>
        <Button href={ROUTE_DOCUMENTATION_TITLE.url} disabled={true}>
          {start.actions.startInitial.buttonText}
        </Button>
      </noscript>
    </ButtonContainer>
  );
}

function DigitalDocumentationIndex() {
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION.title} />
      <Hero title={start.title} subtitle={start.subtitle}>
        <div className="mt-40 space-y-40">
          <StartOrContinueButtons />
          <noscript>
            <InlineNotice
              look="warning"
              heading={
                <Heading tagName="h2">{start.noscript.headline}</Heading>
              }
              className="mb-40"
            >
              <RichText markdown={start.noscript.content} />
            </InlineNotice>
          </noscript>

          <div className="space-y-8">
            <RichText markdown={start.alternative.text} />

            <Button
              look="link"
              href={ROUTE_DOCUMENTATION_TEMPLATE_WORD.url}
              iconLeft={<SaveAltOutlined className="mr-2 fill-blue-800" />}
              text={start.alternative.buttonText}
            />
          </div>
        </div>
      </Hero>

      <div className="container my-80 space-y-80">
        <InlineNotice
          look="tips"
          heading={
            <Heading tagName="h2">{start.dataSavingHint.headline}</Heading>
          }
        >
          <RichText markdown={start.dataSavingHint.content} />
        </InlineNotice>
      </div>

      <SupportBanner {...supportBanner} />
    </>
  );
}

function DocumentationIndex() {
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION.title} />
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
