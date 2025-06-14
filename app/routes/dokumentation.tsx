import Background from "~/components/Background";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Header from "~/components/Header";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import { NumberedList } from "~/components/List";
import SupportBanner from "~/components/SupportBanner";
import { documentation } from "~/resources/content/dokumentation";
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
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: documentation.title,
            }}
            content={{
              markdown: documentation.subtitle,
              className: "md:text-2xl",
            }}
          />
          <ButtonContainer className="mt-48" buttons={documentation.buttons} />
        </Container>
      </Background>
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
      <SupportBanner />
    </>
  );
}
