import { AddCircleOutlineOutlined } from "@digitalservicebund/icons";
import { useFieldArray, useForm } from "@rvf/react";
import React from "react";
import { z } from "zod";
import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import InlineNotice from "~/components/InlineNotice.tsx";
import Input from "~/components/Input";
import RichText from "~/components/RichText";
import { markdownCiteIEA } from "~/routes/dokumentation/euInteroperabilityFlow.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

const checkboxValueSchema = z
  .union([z.literal("on"), z.literal(true)])
  .optional();

const functionOptions = [
  { key: "defense", label: "Verteidigung" },
  { key: "economicAffairs", label: "Wirtschaftliche Angelegenheiten" },
  { key: "education", label: "Bildung" },
  { key: "environmentalProtection", label: "Umweltschutz" },
  { key: "generalPublicServices", label: "Allgemeine öffentliche Dienste" },
  { key: "health", label: "Gesundheit" },
  {
    key: "housingAndCommunityAmenities",
    label: "Wohnungswesen und kommunale Einrichtungen",
  },
  { key: "publicOrderAndSafety", label: "Öffentliche Ordnung und Sicherheit" },
  {
    key: "recreationCultureAndReligion",
    label: "Freizeit, Kultur und Religion",
  },
  { key: "socialProtection", label: "Sozialschutz" },
] as const;

const stakeholderOptions = [
  { key: "localPublicSectorBody", label: "Lokale öffentliche Einrichtung" },
  {
    key: "regionalPublicSectorBody",
    label: "Regionale öffentliche Einrichtung",
  },
  {
    key: "nationalPublicSectorBody",
    label: "Nationale öffentliche Einrichtung",
  },
  {
    key: "europeanUnionInstitution",
    label: "EU-Institution",
  },
  { key: "europeanUnionAgency", label: "EU-Agentur" },
  { key: "europeanUnionBody", label: "EU-Einrichtung" },
  { key: "privateBusinesses", label: "Private Unternehmen" },
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

  const toCheckboxScope = (scope: unknown) => scope as CheckboxScope;

  const tree: SectionNode[] = [
    {
      id: "intro",
      label: "Einleitung",
      isEnabled: () => true,
      render: () => (
        <RichText
          markdown={dedent`
            Bitte dokumentieren Sie alle verbindlichen Anforderungen i. S. v. ${markdownCiteIEA(2, 15)} und Dienste, die davon betroffen sind.
        `}
        />
      ),
    },
    {
      id: "serviceScope",
      label: "Betroffene transeuropäische digitale öffentliche Dienste",
      isEnabled: () => true,
      render: () => (
        <div className="space-y-24">
          <h2 className="ds-heading-03-reg">
            Betroffene transeuropäische Dienste
          </h2>

          <div className="space-y-12">
            <p>
              Geben Sie die betroffenen transeuropäischen digitalen öffentlichen
              Dienste an:
            </p>
            <div className="space-y-12">
              {tedpServices.map((key, item, index) => (
                <Input
                  key={key}
                  scope={item.scope("value")}
                  placeholder="z. B. Anmeldung eines Kraftfahrzeugs"
                >
                  {`Dienst ${index + 1}`}
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
              Dienst hinzufügen
            </Button>
          </div>
          <InlineNotice look={"info"}>
            Sie können die Auflistung der einzelnen Dienste auslassen, sofern
            mehr als 5 Dienste betroffen sind.
          </InlineNotice>

          <fieldset className="space-y-8">
            <legend>
              Geben Sie die betroffene Funktion der transeuropäischen digitalen
              öffentlichen Dienste an:
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
      label: "Ermittlung der geprüften verbindlichen Anforderungen",
      isEnabled: () => true,
      render: () => (
        <div className="space-y-24">
          <h2 className="ds-heading-03-reg">
            Ermittlung der geprüften verbindlichen Anforderungen
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
                    scope={requirement.scope("description")}
                    placeholder={
                      "z. B. Übermittlung von Berichten an EU-Behörde"
                    }
                  >
                    Kurzbeschreibung oder Titel
                  </Input>
                  <Input
                    placeholder={"z. B. § 6"}
                    scope={requirement.scope("legalReference")}
                  >
                    Rechtsgrundlage für die verbindliche Anforderung, sofern
                    vorhanden
                  </Input>

                  <fieldset className="space-y-8">
                    <legend>
                      Verbindliche Anforderung betrifft (alle zutreffenden
                      auswählen)
                    </legend>
                    <Checkbox scope={requirement.scope("affectsData")}>
                      Daten
                    </Checkbox>
                    <Checkbox scope={requirement.scope("affectsSystems")}>
                      Systeme
                    </Checkbox>
                    <Checkbox scope={requirement.scope("affectsOther")}>
                      Sonstiges
                    </Checkbox>
                    {affectsOther && (
                      <Input scope={requirement.scope("affectsOtherText")}>
                        Sonstiges angeben
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
            Verbindliche Anforderung hinzufügen
          </Button>
        </div>
      ),
    },
    {
      id: "stakeholders",
      label: "Betroffene öffentliche und/oder private Interessengruppen",
      isEnabled: () => true,
      render: () => (
        <fieldset className="space-y-8">
          <legend>
            Welche Gruppen sind von den verbindlichen Anforderungen betroffen?
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
