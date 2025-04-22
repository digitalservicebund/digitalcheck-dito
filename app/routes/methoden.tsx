import { type MetaArgs } from "react-router";

import Background from "~/components/Background";
import Container from "~/components/Container";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import { BulletList, NumberedList } from "~/components/List";
import MethodStepsItems from "~/components/MethodStepsItems.tsx";
import SupportBanner from "~/components/SupportBanner";
import { methods } from "~/resources/content/methoden";
import { ROUTE_METHODS } from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_METHODS.title, matches);
};

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
        <BulletList items={MethodStepsItems(true)} />
      </Container>
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
      <SupportBanner withFeedbackBanner={false} />
    </>
  );
}
