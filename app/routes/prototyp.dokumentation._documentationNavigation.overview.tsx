import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_OVERVIEW,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_1,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { overview } = prototypeDocumentation;
const { headline, text, warning, nextButton } = overview;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_OVERVIEW.title);
}

export default function PrototypeDocumentationIntro() {
  return (
    <Container className="pt-0">
      <Heading
        text={headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={text} className="mt-20" />
      <InlineNotice
        look="info"
        title={warning.title}
        tagName="h2"
        content={warning.text}
        className="mt-40"
      />
      <ButtonContainer
        buttons={[
          {
            id: "generalInfo-next-button",
            text: nextButton,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_1.url,
          },
          {
            id: "generalInfo-back-button",
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
