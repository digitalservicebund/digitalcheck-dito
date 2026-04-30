import { AddCircleOutlineOutlined } from "@digitalservicebund/icons";
import { useFieldArray, useForm } from "@rvf/react";
import React from "react";
import { z } from "zod";
import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import Input from "~/components/Input";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import { markdownCiteIEA } from "~/routes/dokumentation/euInteroperabilityFlow.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

const checkboxValueSchema = z
  .union([z.literal("on"), z.literal(true)])
  .optional();

const functionOptions = [
  { key: "defense", label: "Defense" },
  { key: "economicAffairs", label: "Economic affairs" },
  { key: "education", label: "Education" },
  { key: "environmentalProtection", label: "Environmental Protection" },
  { key: "generalPublicServices", label: "General public services" },
  { key: "health", label: "Health" },
  {
    key: "housingAndCommunityAmenities",
    label: "Housing and Community Amenities",
  },
  { key: "publicOrderAndSafety", label: "Public Order and Safety" },
  {
    key: "recreationCultureAndReligion",
    label: "Recreation, Culture, and Religion",
  },
  { key: "socialProtection", label: "Social Protection" },
] as const;

const stakeholderOptions = [
  { key: "localPublicSectorBody", label: "Local public sector body" },
  { key: "regionalPublicSectorBody", label: "Regional public sector body" },
  { key: "nationalPublicSectorBody", label: "National public sector body" },
  {
    key: "europeanUnionInstitution",
    label: "European Union institution",
  },
  { key: "europeanUnionAgency", label: "European Union agency" },
  { key: "europeanUnionBody", label: "European Union body" },
  { key: "privateBusinesses", label: "Private Businesses" },
] as const;

const requirementItemSchema = z.object({
  number: z.string().optional(),
  legalReference: z.string().optional(),
  description: z.string().optional(),
  affectsData: checkboxValueSchema,
  affectsSystems: checkboxValueSchema,
  affectsOther: checkboxValueSchema,
  affectsOtherText: z.string().optional(),
});

const bindingRequirementsFormSchema = z.object({
  concernType: z.enum(["LIMITED", "MANY"]).default("LIMITED"),
  tedpServices: z.array(z.object({ value: z.string().optional() })),
  functions: z.object({
    defense: checkboxValueSchema,
    economicAffairs: checkboxValueSchema,
    education: checkboxValueSchema,
    environmentalProtection: checkboxValueSchema,
    generalPublicServices: checkboxValueSchema,
    health: checkboxValueSchema,
    housingAndCommunityAmenities: checkboxValueSchema,
    publicOrderAndSafety: checkboxValueSchema,
    recreationCultureAndReligion: checkboxValueSchema,
    socialProtection: checkboxValueSchema,
  }),
  requirements: z.array(requirementItemSchema),
  stakeholders: z.object({
    localPublicSectorBody: checkboxValueSchema,
    regionalPublicSectorBody: checkboxValueSchema,
    nationalPublicSectorBody: checkboxValueSchema,
    europeanUnionInstitution: checkboxValueSchema,
    europeanUnionAgency: checkboxValueSchema,
    europeanUnionBody: checkboxValueSchema,
    privateBusinesses: checkboxValueSchema,
  }),
});

type CheckboxScope = React.ComponentProps<typeof Checkbox>["scope"];

type SectionNode = {
  id: string;
  label: string;
  isEnabled: () => boolean;
  render: () => React.ReactNode;
};

export default function BindingRequirementsForm() {
  const form = useForm({
    schema: bindingRequirementsFormSchema,
    defaultValues: {
      concernType: "LIMITED",
      tedpServices: [{ value: "" }],
      functions: {},
      requirements: [{}],
      stakeholders: {},
    },
    handleSubmit: async () => {},
  });

  const requirements = useFieldArray(form.scope("requirements"));
  const tedpServices = useFieldArray(form.scope("tedpServices"));
  const values = form.value();

  const toCheckboxScope = (scope: unknown) => scope as CheckboxScope;

  const tree: SectionNode[] = [
    {
      id: "intro",
      label: "Introduction",
      isEnabled: () => true,
      render: () => (
        <RichText
          markdown={dedent`
            Bitte dokumentieren Sie alle verbindlichen Anforderungen i. S. v. ${markdownCiteIEA(2, 15)}
        `}
        />
      ),
    },
    {
      id: "serviceScope",
      label: "Trans-European digital public service(s) concerned",
      isEnabled: () => true,
      render: () => (
        <div className="space-y-24">
          <h2 className="ds-heading-03-reg">
            Betroffene transeuropäische Dienste
          </h2>

          <fieldset className="space-y-12">
            <legend>Die verbindlichen Anforderungen betreffen</legend>
            <RadioGroup
              scope={form.scope("concernType")}
              options={[
                {
                  value: "LIMITED",
                  label: "1-5 einzelne transeurop. öff. Dienste",
                },
                {
                  value: "MANY",
                  label: "Potenziell 6 oder mehr transeurop. öff. Diensts)",
                },
              ]}
            />
          </fieldset>

          {values.concernType === "LIMITED" && (
            <div className="space-y-12">
              <p>
                Specify the trans-European digital public service(s) concerned:
              </p>
              <div className="space-y-12">
                {tedpServices.map((key, item, index) => (
                  <Input
                    key={key}
                    scope={item.scope("value")}
                    placeholder="Dienst"
                  >
                    {`transeurop. öff. Dienst ${index + 1}`}
                  </Input>
                ))}
              </div>
              <Button
                type="button"
                look="ghost"
                iconLeft={<AddCircleOutlineOutlined />}
                onClick={async () => {
                  await tedpServices.push({ value: "" });
                }}
              >
                Add service
              </Button>
            </div>
          )}

          <fieldset className="space-y-8">
            <legend>
              Specify the concerned function of trans-European digital public
              service(s):
            </legend>
            {functionOptions.map((option) => (
              <Checkbox
                key={option.key}
                scope={toCheckboxScope(form.scope(`functions.${option.key}`))}
              >
                {option.label}
              </Checkbox>
            ))}
          </fieldset>
        </div>
      ),
    },
    {
      id: "bindingRequirements",
      label: "Identification of binding requirements assessed",
      isEnabled: () => true,
      render: () => (
        <div className="space-y-24">
          <h2 className="ds-heading-03-reg">
            Identification of binding requirements assessed
          </h2>

          <div
            className="space-y-32"
            aria-live="polite"
            aria-relevant="additions"
          >
            {requirements.map((key, requirement, index) => {
              const affectsOther = Boolean(
                form.value(`requirements[${index}].affectsOther`),
              );

              return (
                <div className="space-y-16 rounded border p-16" key={key}>
                  <Input
                    scope={requirement.scope("number")}
                    type="number"
                    description="Number each requirement"
                  >
                    Nr.
                  </Input>
                  <Input scope={requirement.scope("legalReference")}>
                    Provide a legal reference for the binding requirement, if
                    available
                  </Input>
                  <Input scope={requirement.scope("description")}>
                    Provide a short description or a title
                  </Input>

                  <fieldset className="space-y-8">
                    <legend>
                      Binding requirement affects (select all relevant)
                    </legend>
                    <Checkbox scope={requirement.scope("affectsData")}>
                      Data
                    </Checkbox>
                    <Checkbox scope={requirement.scope("affectsSystems")}>
                      Systems
                    </Checkbox>
                    <Checkbox scope={requirement.scope("affectsOther")}>
                      Other
                    </Checkbox>
                    {affectsOther && (
                      <Input scope={requirement.scope("affectsOtherText")}>
                        Enter other
                      </Input>
                    )}
                  </fieldset>
                </div>
              );
            })}
          </div>

          <Button
            type="button"
            look="ghost"
            iconLeft={<AddCircleOutlineOutlined />}
            onClick={async () => {
              await requirements.push({});
            }}
          >
            Add binding requirement
          </Button>
        </div>
      ),
    },
    {
      id: "stakeholders",
      label: "Public and/or private stakeholders affected",
      isEnabled: () => true,
      render: () => (
        <fieldset className="space-y-8">
          <legend>
            Select the groups of stakeholders to which binding requirement(s)
            are relevant:
          </legend>
          {stakeholderOptions.map((option) => (
            <Checkbox
              key={option.key}
              scope={toCheckboxScope(form.scope(`stakeholders.${option.key}`))}
            >
              {option.label}
            </Checkbox>
          ))}
        </fieldset>
      ),
    },
  ];

  return (
    <form className="space-y-32" {...form.getFormProps()}>
      {tree
        .filter((section) => section.isEnabled())
        .map((section) => (
          <section key={section.id} className="space-y-12">
            {section.render()}
          </section>
        ))}
    </form>
  );
}
