import { useState } from "react";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { general } from "~/resources/content/shared/general";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_3,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { principles, nextButton } = prototypeDocumentation;
const { principle3, radioOptions } = principles;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_3.title);
}

export default function PrototypeDocumentationPrinciple3() {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [examples, setExamples] = useState([{ id: Date.now() }]);

  const showExtraFields =
    selectedOption === "Ja" || selectedOption === "Teilweise";

  const addExample = () => {
    setExamples((prev) => [...prev, { id: Date.now() }]);
  };

  const removeExample = (id: number) => {
    setExamples((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <Container className="pt-0">
      <Heading
        text={principle3.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <DetailsSummary
        title={principle3.details.title}
        content={principle3.details.text}
        className="mb-40"
      />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <legend className="ds-stack ds-stack-16">
            <Heading
              text={principle3.question}
              tagName="h2"
              look="ds-heading-03-reg"
            />
          </legend>

          <RadioGroup
            name="principle-1-radio"
            options={radioOptions.map((option) => ({
              value: option,
              text: option,
            }))}
            selectedValue={selectedOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedOption(e.target.value)
            }
          />

          {showExtraFields && (
            <>
              <RichText markdown={principle3.hint} className="mt-40" />
              <DetailsSummary
                title={principle3.example.title}
                content={principle3.example.text}
              />

              <div id="principle-explanation">
                {examples.map((example, index) => (
                  <div key={example.id} className="mb-8">
                    <Input
                      className="mb-10"
                      name={`paragraph-${example.id}`}
                      label={principles.inputs.paragraph.label}
                    />
                    <Textarea
                      className="mb-10"
                      name={`text-${example.id}`}
                      label={principles.inputs.text.label}
                    />
                    <Textarea
                      className="mb-10"
                      name={`explanation-${example.id}`}
                      label={principles.inputs.explanation.label}
                    />
                    {index < examples.length - 1 && examples.length > 1 && (
                      <ButtonContainer
                        buttons={[
                          {
                            text: "Beispiel entfernen",
                            look: "tertiary",
                            onClick: () => removeExample(example.id),
                          },
                        ]}
                      />
                    )}
                    {index === examples.length - 1 && (
                      <ButtonContainer
                        buttons={[
                          {
                            text: "Weiteres Beispiel",
                            look: "tertiary",
                            onClick: addExample,
                            type: "button",
                          },
                        ]}
                      />
                    )}
                    <hr className="mt-20 mb-20 border-t-[2px] border-gray-400" />
                  </div>
                ))}
              </div>
            </>
          )}
        </fieldset>
      </form>
      <ButtonContainer
        buttons={[
          {
            text: nextButton,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4.url,
          },
          {
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
