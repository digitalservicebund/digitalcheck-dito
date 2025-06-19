import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import { NumberedList } from "~/components/List";
import SupportBanner from "~/components/SupportBanner";
import { documentation } from "~/resources/content/dokumentation";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_DOCUMENTATION } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION.title);
}

export const handle = {
  hasProgressBar: true,
};

export default function Index() {
  return (
    <>
      <Hero title={documentation.title} subtitle={documentation.subtitle}>
        <ButtonContainer className="mt-48" buttons={documentation.buttons} />
      </Hero>

      <Container className="max-sm:p-0!">
        <InlineNotice
          look="warning"
          title={documentation.multipleNotice.headline}
          tagName="h2"
          content={documentation.multipleNotice.content}
        />
      </Container>
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
      <SupportBanner
        sections={[supportBanner.feedback, supportBanner.support]}
      />
    </>
  );
}
