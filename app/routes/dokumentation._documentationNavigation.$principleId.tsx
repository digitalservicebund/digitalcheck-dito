import React, { useState } from "react";
import { useLoaderData } from "react-router";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { principles } from "~/resources/content/shared/prinzipien";
import type { Route } from "./+types/dokumentation._documentationNavigation.$principleId";

const { principlePages } = digitalDocumentation;

export function loader({ params }: Route.LoaderArgs) {
  const principleIdx = principles.findIndex(
    (principle) => principle.id === params.principleId,
  );
  // return 404 if the principle is not found
  if (principleIdx === -1) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Principle not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { principle: principles[principleIdx] };
}

export default function DocumentationPrinciple() {
  const { principle } = useLoaderData<typeof loader>();

  const [selectedOption, setSelectedOption] = useState<string>();

  return (
    <>
      <MetaTitle prefix={principle.title} />
      <Heading
        text={principle.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <DetailsSummary
        title={principle.details.title}
        content={principle.details.text}
        className="mb-40"
      />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <legend className="ds-stack ds-stack-16">
            <Heading
              text={principle.question}
              tagName="h2"
              look="ds-heading-03-reg"
            />
          </legend>

          <RadioGroup
            name={`${principle.id}-radio`}
            options={principlePages.radioOptions.map((option) => ({
              value: option,
              text: option,
            }))}
            selectedValue={selectedOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedOption(e.target.value)
            }
          />
        </fieldset>
      </form>
    </>
  );
}
