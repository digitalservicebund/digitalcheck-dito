import type { BindingRequirementsData } from "~/routes/dokumentation/documentationDataSchema";
import {
  serviceAreaOptions,
  stakeholderOptions,
} from "~/routes/dokumentation/interoperability/values.ts";
import { keyValueToMap } from "~/utils/keyValue.ts";

type Requirement = BindingRequirementsData["requirements"][number];

type Props = {
  requirement: Requirement;
};

const labels: Record<keyof Requirement, string> = {
  legalReference: "Rechtsgrundlage",
  description: "Beschreibung",
  services: "Leistungen",
  serviceAreas: "Leistungsbereiche",
  stakeholderGroups: "Betroffene Gruppen",
};

export default function RequirementDetail({ requirement }: Readonly<Props>) {
  const serviceAreaLabels = keyValueToMap(serviceAreaOptions);
  const stakeholderLabels = keyValueToMap(stakeholderOptions);

  const requirementCleaned = {
    ...requirement,
    serviceAreas: requirement.serviceAreas.map(
      (area) => serviceAreaLabels.get(area) ?? area,
    ),
    stakeholderGroups: requirement.stakeholderGroups.map((value) =>
      stakeholderLabels.get(value),
    ),
  };
  const entries = Object.entries(requirementCleaned) as [
    keyof Requirement,
    Requirement[keyof Requirement],
  ][];

  return (
    <dl className="space-y-16">
      {entries.map(([key, value]) => {
        return (
          <div className="space-y-8" key={key}>
            <Label keyName={key} />
            <Value value={value} />
          </div>
        );
      })}
    </dl>
  );
}

function Label({ keyName }: { keyName: keyof Requirement }) {
  return <dt className="ds-label-01-bold">{labels[keyName]}</dt>;
}

function Value({ value }: Readonly<{ value: string | string[] | undefined }>) {
  const valueMissing = !value || (Array.isArray(value) && value.length === 0);

  if (valueMissing)
    return <dd className="ds-label-01-reg text-gray-900">nicht angegeben</dd>;

  return (
    <dd className="ds-label-01-reg">
      {Array.isArray(value) ? (
        <ul>
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        value
      )}
    </dd>
  );
}
