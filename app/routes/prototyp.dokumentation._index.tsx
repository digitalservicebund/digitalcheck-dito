import TimerOutlined from "@digitalservicebund/icons/TimerOutlined";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_DOCUMENTATION_STATIC_PDF,
  ROUTE_LANDING,
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
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
        <div className="ds-stack ds-stack-16 mt-40">
          {start.hints.map((hint) => (
            <DetailsSummary
              key={hint.title}
              title={hint.title}
              content={hint.text}
            />
          ))}
        </div>

        <ButtonContainer
          className="mt-40"
          buttons={[
            {
              id: "documentation-start-button",
              text: start.buttonText,
              href: ROUTE_PROTOTYPE_DOCUMENTATION_META.url,
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
        <RichText
          markdown={
            "**Alternativ** können Sie die Dokumentation auch als Word-Datei herunterladen und ausfüllen. "
          }
          className="mt-40"
        />
        <ButtonContainer
          className="mt-20"
          buttons={[
            {
              text: "Word-Datei herunterladen",
              href: ROUTE_DOCUMENTATION_STATIC_PDF.url,
              look: "tertiary",
            },
          ]}
        />
      </Hero>

      <Container>
        <InlineNotice
          look="warning"
          title={start.multipleNotice.headline}
          tagName="h2"
          content={start.multipleNotice.content}
          className="mb-40"
        />
        <InfoBox
          heading={{
            tagName: "h2",
            text: start.summary.title,
          }}
          items={start.summary.items}
        />
      </Container>
      <SupportBanner />
    </>
  );
}
