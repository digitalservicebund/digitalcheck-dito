import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_1,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_2,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { participation2, nextButton } = prototypeDocumentation;
const { headline, text, textfieldExplanationLabel } = participation2;

export function meta() {
  return constructMetaTitle(
    ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_2.title,
  );
}

export default function PrototypeDocumentationParticipation2() {
  return (
    <Container className="pt-0">
      <Heading
        text={headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={text} className="mb-40" />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <Textarea name="explanation" label={textfieldExplanationLabel} />
        </fieldset>
      </form>
      <ButtonContainer
        buttons={[
          {
            id: "generalInfo-next-button",
            text: nextButton,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1.url,
          },
          {
            id: "generalInfo-back-button",
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_1.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
