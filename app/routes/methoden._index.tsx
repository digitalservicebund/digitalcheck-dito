import React from "react";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
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
      <SupportBanner sections={[supportBanner.support]} />
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
