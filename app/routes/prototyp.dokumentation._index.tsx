import Background from "~/components/Background";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Header from "~/components/Header";
import InfoBox from "~/components/InfoBox";
import { NumberedList } from "~/components/List";
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

export default function Index() {
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: prototypeDocumentation.start.title,
            }}
            content={{
              markdown: prototypeDocumentation.start.subtitle,
              className: "md:text-2xl",
            }}
          ></Header>
        </Container>
        <Container className="pt-0">
          <ButtonContainer
            buttons={[
              {
                id: "documentation-start-button",
                text: prototypeDocumentation.start.buttonText,
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
        </Container>
      </Background>
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
