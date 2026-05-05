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
import { markdownCiteIEA } from "~/routes/dokumentation/euInteroperabilityFlow.tsx";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

const functionOptions = [
  { value: "defense", label: "Verteidigung" },
  { value: "economicAffairs", label: "Wirtschaftliche Angelegenheiten" },
  { value: "education", label: "Bildung" },
  { value: "environmentalProtection", label: "Umweltschutz" },
  { value: "generalPublicServices", label: "Allgemeine öffentliche Dienste" },
  { value: "health", label: "Gesundheit" },
  {
    value: "housingAndCommunityAmenities",
    label: "Wohnungswesen und kommunale Einrichtungen",
  },
  {
    value: "publicOrderAndSafety",
    label: "Öffentliche Ordnung und Sicherheit",
  },
  {
    value: "recreationCultureAndReligion",
    label: "Freizeit, Kultur und Religion",
  },
  { value: "socialProtection", label: "Sozialschutz" },
] as const;

const stakeholderOptions = [
  { value: "localPublicSectorBody", label: "Lokale öffentliche Einrichtung" },
  {
    value: "regionalPublicSectorBody",
    label: "Regionale öffentliche Einrichtung",
  },
  {
    value: "nationalPublicSectorBody",
    label: "Nationale öffentliche Einrichtung",
  },
  {
    value: "europeanUnionInstitution",
    label: "EU-Institution",
  },
  { value: "europeanUnionAgency", label: "EU-Agentur" },
  { value: "europeanUnionBody", label: "EU-Einrichtung" },
  { value: "privateBusinesses", label: "Private Unternehmen" },
] as const;

type SectionNode = {
  id: string;
  label: string;
  isEnabled: () => boolean;
  render: () => React.ReactNode;
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
      requirements: [{ serviceAreas: [] }],
      stakeholderGroups: [],
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
      label: "Einleitung",
      isEnabled: () => true,
      render: () => (
        <RichText
          markdown={dedent`
            Bitte dokumentieren Sie alle verbindlichen Anforderungen i. S. v. ${markdownCiteIEA(2, 15)} und Dienste, die von diesen Anforderungen betroffen sind.
        `}
        />
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
                    Rechtsgrundlage für die verbindliche Anforderung, sofern
                    vorhanden
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
                          ${markdownCiteIEA(2, 2)} durch die verbindliche Anforderung betroffen sind.
                          
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
                        options={functionOptions}
                      />
                    </fieldset>
                    <Combobox
                      options={stakeholderOptions}
                      scope={form.scope("stakeholderGroups")}
                    >
                      Welche Gruppen sind von den verbindlichen Anforderungen
                      betroffen?
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
              await requirements.push({ serviceAreas: [] });
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
