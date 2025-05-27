import { type MetaArgs } from "react-router";

import React from "react";
import Background from "~/components/Background";
import Container from "~/components/Container";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import { BulletList, NumberedList } from "~/components/List";
import SupportBanner from "~/components/SupportBanner";
import { methods } from "~/resources/content/methoden";
import { ROUTE_METHODS } from "~/resources/staticRoutes";
import { methodStepsItems } from "~/utils/listProcessing.ts";
import prependMetaTitle from "~/utils/metaTitle";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_METHODS.title, matches);
};

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
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: methods.title,
            }}
            content={{
              markdown: methods.subtitle,
              className: "md:text-2xl",
            }}
          ></Header>
        </Container>
      </Background>
      <Container>
        <BulletList items={methodStepsItems(true, renderStepContent)} />
      </Container>
      <SupportBanner withFeedbackBanner={false} />
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
      <FeedbackForm {...methods.feedbackForm} />
    </>
  );
}
