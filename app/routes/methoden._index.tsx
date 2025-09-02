import React from "react";
import { ButtonLinkProps } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import { BulletList } from "~/components/List";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { methods } from "~/resources/content/methoden";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_METHODS } from "~/resources/staticRoutes";
import { methodStepsItems } from "~/utils/listProcessing.ts";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS.title);
}

interface InfoItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export type ContentRenderer = (
  info: InfoItem[] | undefined,
  text: string | undefined,
) => React.JSX.Element;

const renderInfoItem = (info: InfoItem) => (
  <span key={info.text} className="mb-8 flex gap-4 last-of-type:mb-8">
    <info.icon className="mt-6 size-16" />
    <span>{info.text}</span>
  </span>
);

const renderStepContent = (
  info: InfoItem[] | undefined,
  text: string | undefined,
): React.JSX.Element => (
  <>
    {info?.map((infoItem) => renderInfoItem(infoItem))}
    {text && <p>{text}</p>}
  </>
);

export default function Methoden() {
  return (
    <>
      <Hero subtitle={methods.subtitle} title={methods.title} />

      <Container className="my-80 py-0">
        <BulletList items={methodStepsItems(true, renderStepContent)} />
      </Container>

      <Container className="my-80 space-y-40 py-0">
        <InfoBox
          heading={{ tagName: "h2", text: methods.furtherMethods.heading }}
          content={methods.furtherMethods.content}
        />

        <InfoBoxSideBySide>
          <InfoBox
            look="method"
            badge={{ text: methods.itSystems.badge, look: "hint" }}
            heading={{
              text: methods.itSystems.heading,
              tagName: "h3",
              className: "ds-heading-03-bold",
            }}
            content={methods.itSystems.content}
            buttons={methods.itSystems.buttons}
          />

          <InfoBox
            look="method"
            badge={{
              text: methods.technicalFeasibility.badge,
              look: "hint",
            }}
            heading={{
              text: methods.technicalFeasibility.heading,
              tagName: "h3",
              className: "ds-heading-03-bold",
            }}
            content={methods.technicalFeasibility.content}
            buttons={methods.technicalFeasibility.buttons}
          />
        </InfoBoxSideBySide>
      </Container>

      <SupportBanner {...supportBanner} />
      <div id={"weiter"} />
      <Container className="my-80 space-y-32 py-0">
        <Heading tagName="h2">{methods.nextSteps.title}</Heading>
        <NumberedList>
          {methods.nextSteps.items.map((item) => (
            <NumberedList.Item
              key={item.headline.text}
              className="space-y-16"
              disabled={item.isDisabled}
            >
              <p className="ds-heading-03-reg">{item.headline.text}</p>
              {"content" in item && (
                <RichText markdown={item.content as string} />
              )}
              {"buttons" in item && (
                <ButtonContainer buttons={item.buttons as ButtonLinkProps[]} />
              )}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </Container>
    </>
  );
}
