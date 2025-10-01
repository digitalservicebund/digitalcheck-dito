import { useLocation } from "react-router";
import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import IntermediateSaveLink from "~/components/prototyp/IntermediateSaveLink.tsx";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { features } from "~/resources/features.ts";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags.ts";

const { metaInfo, nextButton } = prototypeDocumentation;
const { headline, text } = metaInfo;

export default function PrototypeDocumentationMeta() {
  const prototypeAlternativeEnabled = useFeatureFlag(
    features.enableDocumentationPrototypeAlternative,
  );
  const location = useLocation();
  const defaultValue =
    location.state === "fileUpload"
      ? "Elektronischer Rechtsverkehr mit dem " +
        "Bundesverfassungsgericht – BVerfGG"
      : "";

  return (
    <Container className="pt-0">
      <MetaTitle prefix={ROUTE_PROTOTYPE_DOCUMENTATION_META.title} />
      <IntermediateSaveLink />
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
            defaultValue={defaultValue}
          />
        </fieldset>
      </form>
      <ButtonContainer className="pt-40">
        <Button href={ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION.url}>
          {nextButton}
        </Button>
        <Button
          href={
            prototypeAlternativeEnabled
              ? ROUTE_PROTOTYPE_DOCUMENTATION.url
              : ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME.url
          }
          look="tertiary"
        >
          {general.buttonBack.text}
        </Button>
      </ButtonContainer>
    </Container>
  );
}
