import {
  AddCircleOutlineOutlined,
  DeleteOutlineTwoTone,
} from "@digitalservicebund/icons";
import { useFieldArray } from "@rvf/react";
import React from "react";
import Badge from "~/components/Badge.tsx";
import Button from "~/components/Button";
import Combobox from "~/components/ComboBox.tsx";
import HelpButton from "~/components/HelpButton.tsx";
import Input from "~/components/Input";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea.tsx";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import { bindingRequirementsSchema } from "~/routes/dokumentation/documentationDataSchema.ts";
import { markdownLinkIEA } from "~/routes/dokumentation/interoperability/euInteroperabilityFlow.tsx";
import {
  serviceAreaOptions,
  stakeholderOptions,
} from "~/routes/dokumentation/interoperability/values.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

type SectionNode = {
  id: string;
  isEnabled: () => boolean;
  render: () => React.ReactNode;
};

const defaultRequirementValue = {
  description: "",
  legalReference: "",
  services: undefined,
  stakeholderGroups: [],
  serviceAreas: [],
};

export default function BindingRequirementsForm({
  nextUrl,
}: Readonly<{ nextUrl?: string }>) {
  const { setBindingRequirementsData, documentationData } =
    useDocumentationDataService();

  const storedData = documentationData?.bindingRequirements;

  const form = useSyncedForm({
    schema: bindingRequirementsSchema,
    defaultValues: {
      functions: [],
      requirements: [defaultRequirementValue],
    },
    setDataCallback: (data) => setBindingRequirementsData(data ?? undefined),
    storedData,
    nextUrl,
  });

  const requirements = useFieldArray(form.scope("requirements"));
  const requirementCount = form.value("requirements")?.length ?? 0;

  const tree: SectionNode[] = [
    {
      id: "intro",
      isEnabled: () => true,
      render: () => (
        <RichText
          markdown={dedent`
            Eine digitales Angebot gilt als interoperabel, wenn es ermöglicht, dass es grenzüberschreitend nutzbar ist. Also, dass z. B. Daten von Bürgerinnen und Bürgern aus anderen EU-Ländern verarbeitet werden können.

            Für Sie bedeutet das, dass Sie grenzüberschreitende Auswirkungen eines Regelungsvorhaben einschätzen müssen, bevor die Regelung geschrieben wird. Denn Sie legen verbindliche Anforderungen fest, die geltendes Recht werden.

            Bitte dokumentieren Sie in diesem Schritt alle Teile Ihrer Regelung, die verbindliche Anforderungen i. S. v. ${markdownLinkIEA(
              {
                article: 2,
                paragraph: 15,
                format: "long",
              },
            )} definieren sowie digitale transeuropäische Dienste, die von diesen Anforderungen betroffen sind.
        `}
        />
      ),
    },
    {
      id: "bindingRequirements",
      isEnabled: () => true,
      render: () => (
        <div className="space-y-24">
          <h2 className="ds-heading-03-reg">
            In der Regelung enthaltene verbindliche Anforderungen
            <HelpButton
              sectionId={"verbindliche-anforderungen"}
              title={"Was ist eine verbindliche Anforderung?"}
            >
              <RichText
                markdown={dedent`
                  Eine Definition von verbindlichen Anforderungen finden Sie <a href="/interoperabel?tab=hintergrund" target="_blank">hier</a>.
                  Diese bezieht sich auf ${markdownLinkIEA({ article: 2, paragraph: 15, format: "long" })}.
            `}
              />
            </HelpButton>
          </h2>

          <div
            className="space-y-32"
            aria-live="polite"
            aria-relevant="additions removals"
          >
            {requirements.map((key, requirement, index) => {
              return (
                <div className="space-y-16 rounded border p-16" key={key}>
                  <div className={"flex w-full justify-between"}>
                    <Badge look={"hint"}>Anforderung {index + 1}</Badge>

                    {requirementCount > 1 && (
                      <Button
                        look="link"
                        aria-label={`Anforderung ${index + 1} entfernen`}
                        onClick={async () => {
                          await requirements.remove(index);
                        }}
                        type={"button"}
                      >
                        <DeleteOutlineTwoTone />
                      </Button>
                    )}
                  </div>
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
                    Rechtsgrundlage für die verbindliche Anforderung
                  </Input>
                  <div className="space-y-24">
                    <Textarea
                      scope={requirement.scope("services")}
                      description="Einen Eintrag pro Zeile"
                    >
                      Betroffene transeuropäische Dienste
                      <HelpButton
                        sectionId={"transeuropean_services"}
                        title={"Betroffene transeuropäische Dienste"}
                      >
                        <RichText
                          markdown={dedent`
                          Geben Sie hier an, welche Dienste im Sinne von
                          ${markdownLinkIEA({ article: 2, paragraph: 2 })} durch die verbindliche Anforderung betroffen sind.
                          
                          Beispiele: 
                          - Austausch von Dokumenten zu internationalen Warenlieferungen
                          - Meldung von Statistikdaten
                          - Kommunikation zwischen involvierten Behörden
                          - EU Building Stock Observatory: monitoring and assessing the progress of Member States towards the national objectives and targets set out in their integrated national energy and climate plans
                        `}
                        />
                      </HelpButton>
                    </Textarea>

                    <fieldset className="space-y-8">
                      <legend>
                        Für welche Bereiche sind diese Dienste relevant?
                      </legend>
                      <Combobox
                        scope={requirement.scope("serviceAreas")}
                        options={serviceAreaOptions}
                      />
                    </fieldset>
                    <Combobox
                      options={stakeholderOptions}
                      scope={requirement.scope("stakeholderGroups")}
                    >
                      Für wen gilt diese verbindliche Anforderung?
                    </Combobox>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            type="button"
            look="ghost"
            iconLeft={<AddCircleOutlineOutlined />}
            onClick={async () => {
              await requirements.push(defaultRequirementValue);
            }}
          >
            Verbindliche Anforderung hinzufügen
          </Button>
        </div>
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
