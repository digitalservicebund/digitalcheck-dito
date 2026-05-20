import { FileChild, IPatch, Paragraph, PatchType } from "docx";
import {
  DocumentationData,
  InteroperabilityAssessmentData,
  PolicyTitle,
} from "~/routes/dokumentation/documentationDataSchema.ts";
import {
  interoperabilityRatingOptions,
  serviceAreaOptions,
  stakeholderOptions,
} from "~/routes/dokumentation/interoperability/values.ts";
import { metadataTable } from "~/service/wordDocumentationExport/docxUtils.ts";
import { keyValueToMap } from "~/utils/keyValue.ts";

export function buildAppendixPatch({
  policyTitle,
  interoperabilityAssessment,
  bindingRequirements,
}: Pick<
  DocumentationData,
  "interoperabilityAssessment" | "bindingRequirements" | "policyTitle"
>): IPatch {
  const hasEuData =
    interoperabilityAssessment !== undefined ||
    Boolean(bindingRequirements?.requirements.length);

  if (!hasEuData)
    return {
      type: PatchType.PARAGRAPH,
      children: [],
    };
  const children: FileChild[] = [
    new Paragraph({
      text: "Anhang 1: EU-Interoperabilität",
      pageBreakBefore: true,
      style: "Heading1",
    }),
    ...formatInteroperabilityMeta(policyTitle),
    ...formatBindingRequirements(bindingRequirements),
    ...formatInteroperabilityAssessment(interoperabilityAssessment),
  ];
  return {
    type: PatchType.DOCUMENT,
    children: children.filter((child) => child !== null),
  };
}

export function formatInteroperabilityMeta(
  policyTitle?: PolicyTitle,
): FileChild[] {
  const table = metadataTable([
    ["Titel des Vorhabens", policyTitle?.title ?? ""],
    ["Ministerium oder Organisation", policyTitle?.organization ?? ""],
  ]);
  return [table];
}

export function formatInteroperabilityAssessment(
  assessment?: InteroperabilityAssessmentData,
): FileChild[] {
  if (!assessment) return [];
  const levelMap: Record<keyof typeof assessment, string> = {
    legal: "Rechtliche",
    semantic: "Semantische",
    technical: "Technische",
    organizational: "Organisatorische",
  };
  const ratingMap = keyValueToMap(interoperabilityRatingOptions);

  return Object.entries(assessment).flatMap(([level, data]) => {
    const levelLabel = levelMap[level as keyof typeof assessment];

    return [
      new Paragraph({
        style: "Heading2",
        text: `${levelLabel} Interoperabilität`,
      }),
      metadataTable([
        ["Erklärung", data.detail ?? ""],
        ["Bewertung", (data.rating ? ratingMap.get(data.rating) : "") ?? ""],
      ]),
    ];
  });
}

export function formatBindingRequirements(
  bindingRequirements: DocumentationData["bindingRequirements"],
): FileChild[] {
  if (!bindingRequirements?.requirements?.length)
    return [new Paragraph("Keine Angaben")];

  const serviceAreaMap = keyValueToMap(serviceAreaOptions);
  const stakeholderMap = keyValueToMap(stakeholderOptions);

  return bindingRequirements.requirements.flatMap((requirement, index) => {
    const headerParagraph = new Paragraph({
      style: "Heading2",
      text:
        index === 0
          ? "Verbindliche Anforderung"
          : `Verbindliche Anforderung ${index + 1}`,
    });

    const tableData = [
      ["Beschreibung", requirement.description ?? ""],
      ["Rechtsgrundlage", requirement.legalReference ?? ""],
      [
        "Transeuropäische Dienste",
        requirement.services?.split("\n").join(", ") ?? "",
      ],
      [
        "Bereiche",
        requirement.serviceAreas
          .map((area) => serviceAreaMap.get(area) ?? area)
          .join(", "),
      ],
      [
        "Gruppen",
        (requirement.stakeholderGroups ?? [])
          .map((group) => stakeholderMap.get(group) ?? group)
          .join(", "),
      ],
    ];

    return [headerParagraph, metadataTable(tableData)];
  });
}
