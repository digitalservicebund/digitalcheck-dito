import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { general } from "~/resources/content/shared/general";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_DOCUMENTATION_STATIC_PDF,
  ROUTE_LANDING,
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION.title);
}

const { intro } = prototypeDocumentation;

export default function Index() {
  return (
    <>
      <Hero title={intro.title} subtitle={intro.subtitle}>
        <div className="ds-stack ds-stack-16 mt-40">
          {intro.hints.map((hint) => (
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
              text: intro.buttonText,
              href: ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME.url,
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
          title={intro.multipleNotice.headline}
          tagName="h2"
          content={intro.multipleNotice.content}
          className="mb-40"
        />
        <InfoBox
          heading={{
            tagName: "h2",
            text: intro.summary.title,
          }}
          items={intro.summary.items}
        />
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
