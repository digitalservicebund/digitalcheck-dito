import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
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
        </fieldset>
      </form>
      <ButtonContainer
        buttons={[
          {
            text: nextButton,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION.url,
          },
          {
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
