import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_2,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { principles, nextButton } = prototypeDocumentation;
const { principle1, textfieldExplanationLabel, radioOptions } = principles;
const { headline, text, question, hint } = principle1;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1.title);
}

export default function PrototypeDocumentationPrinciple1() {
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
          <legend className="ds-stack ds-stack-16">
            <Heading text={question} tagName="h2" />
          </legend>
          <RadioGroup
            name="principle-1-radio"
            options={radioOptions.map((option) => {
              return { value: option, text: option };
            })}
          />
          <RichText markdown={hint} className="mt-40" />
          <Textarea name="explanation" label={textfieldExplanationLabel} />
        </fieldset>
      </form>
      <ButtonContainer
        buttons={[
          {
            id: "generalInfo-next-button",
            text: nextButton,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2.url,
          },
          {
            id: "generalInfo-back-button",
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION_2.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
