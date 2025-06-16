import { useState } from "react";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { principles, nextButton } = prototypeDocumentation;
const { principle5, textfieldExplanationLabel, radioOptions } = principles;
const { headline, details, question, hint } = principle5;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5.title);
}

export default function PrototypeDocumentationPrinciple5() {
  const [selectedOption, setSelectedOption] = useState<string>();

  return (
    <Container className="pt-0">
      <Heading
        text={headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <DetailsSummary
        title={details.title}
        content={details.text}
        className="mb-40"
      />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <legend className="ds-stack ds-stack-16">
            <Heading text={question} tagName="h2" look="ds-heading-03-reg" />
          </legend>
          <RadioGroup
            name="principle-5-radio"
            options={radioOptions.map((option) => {
              return { value: option, text: option };
            })}
            selectedValue={selectedOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedOption(e.target.value)
            }
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
            href: ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.url,
          },
          {
            id: "generalInfo-back-button",
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
