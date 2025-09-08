import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import IntermediateSaveLink from "~/components/prototyp/IntermediateSaveLink.tsx";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { participation, nextButton } = prototypeDocumentation;
const {
  headline,
  textIntro,
  textResults,
  textfieldParticipationLabel,
  textfieldResultsLabel,
} = participation;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION.title);
}

export default function PrototypeDocumentationParticipation1() {
  return (
    <Container className="pt-0">
      <IntermediateSaveLink />
      <Heading
        text={headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={textIntro} className="mb-20" />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <Textarea name="explanation" label={textfieldParticipationLabel} />
        </fieldset>
      </form>
      <RichText markdown={textResults} className="mt-40 mb-20" />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <Textarea name="explanation" label={textfieldResultsLabel} />
        </fieldset>
      </form>
      <ButtonContainer className="pt-40">
        <Button href={ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1.url}>
          {nextButton}
        </Button>
        <Button href={ROUTE_PROTOTYPE_DOCUMENTATION_META.url} look="tertiary">
          {general.buttonBack.text}
        </Button>
      </ButtonContainer>
    </Container>
  );
}
