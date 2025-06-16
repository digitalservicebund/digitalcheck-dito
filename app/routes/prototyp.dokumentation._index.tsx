import TimerOutlined from "@digitalservicebund/icons/TimerOutlined";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import { NumberedList } from "~/components/List";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { documentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_LANDING,
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_OVERVIEW,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION.title);
}

const { start } = prototypeDocumentation;

export default function Index() {
  return (
    <>
      <Hero title={start.title} subtitle={start.subtitle}>
        <InlineNotice
          look="info"
          title={start.interopNotice.title}
          tagName="h2"
          content={start.interopNotice.text}
          className="mt-40"
        />

        <ButtonContainer
          className="mt-40"
          buttons={[
            {
              id: "documentation-start-button",
              text: start.buttonText,
              href: ROUTE_PROTOTYPE_DOCUMENTATION_OVERVIEW.url,
              type: "submit",
            },
            {
              id: "documentation-back-button",
              text: general.buttonBack.text,
              href: ROUTE_LANDING.url,
              look: "tertiary",
            },
          ]}
        />
        <div className="mt-12 flex items-center gap-8">
          <TimerOutlined className="size-24 fill-gray-800" />
          <RichText markdown={start.timeInvest} className="text-base" />
        </div>
      </Hero>

      <Container>
        <InfoBox
          heading={{
            tagName: "h2",
            text: documentation.summary.title,
          }}
          items={documentation.summary.items}
        />
      </Container>
      <Container>
        <NumberedList
          heading={{
            tagName: "h2",
            text: documentation.nextSteps.title,
          }}
          items={documentation.nextSteps.items}
        />
      </Container>
      <SupportBanner />
    </>
  );
}
