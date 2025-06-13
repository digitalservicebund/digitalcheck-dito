import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { metaInfo, nextButton } = prototypeDocumentation;
const { headline, text } = metaInfo;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_META.title);
}

export default function PrototypeDocumentationMeta() {
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
          <Input
            className="pb-4"
            name="title"
            label={metaInfo.inputTitle.label}
          />
          <Input
            className="pb-4"
            name="title"
            label={metaInfo.inputRessort.label}
          />
          <Input
            className="pb-4"
            name="title"
            label={metaInfo.inputContact.label}
          />
        </fieldset>
      </form>
      <ButtonContainer
        buttons={[
          {
            id: "generalInfo-next-button",
            text: nextButton,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.url,
          },
          {
            id: "generalInfo-back-button",
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
