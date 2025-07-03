import React from "react";
import Background from "~/components/Background";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import { BulletList, NumberedList } from "~/components/List";
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

      <Container>
        <BulletList items={methodStepsItems(true, renderStepContent)} />
      </Container>

      <Container className="ds-stack ds-stack-40">
        <InfoBox
          items={[
            {
              headline: { tagName: "h2", text: methods.furtherMethods.heading },
              content: methods.furtherMethods.content,
            },
          ]}
        />

        <div className="flex flex-col gap-24 sm:flex-row">
          <Background
            backgroundColor="blue"
            className="px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48"
          >
            <InfoBox
              items={[
                {
                  badge: { text: methods.itSystems.badge, look: "hint" },
                  headline: {
                    text: methods.itSystems.heading,
                    tagName: "h3",
                    className: "ds-heading-03-bold",
                  },
                  content: methods.itSystems.content,
                  buttons: methods.itSystems.buttons,
                },
              ]}
            />
          </Background>

          <Background
            backgroundColor="blue"
            className="px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48"
          >
            <InfoBox
              items={[
                {
                  badge: {
                    text: methods.technicalFeasibility.badge,
                    look: "hint",
                  },
                  headline: {
                    text: methods.technicalFeasibility.heading,
                    tagName: "h3",
                    className: "ds-heading-03-bold",
                  },
                  content: methods.technicalFeasibility.content,
                  buttons: methods.technicalFeasibility.buttons,
                },
              ]}
            />
          </Background>
        </div>
      </Container>

      <SupportBanner {...supportBanner} />
      <div id={"weiter"} />
      <Container>
        <NumberedList
          heading={{
            tagName: "h2",
            text: methods.nextSteps.title,
          }}
          items={methods.nextSteps.items}
        />
      </Container>
    </>
  );
}
