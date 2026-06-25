import { interoperabilityTemplateWord } from "@/config/downloads";
import type { FileChild } from "docx";
import { convertInchesToTwip, Paragraph, patchDocument, PatchType } from "docx";
import fileSaver from "file-saver";
import { documentationDocument } from "~/resources/content/documentation-document";
import { contact } from "~/resources/content/shared/contact";
import type {
  BindingRequirementsData,
  DocumentationData,
  InteroperabilityAssessmentData,
  InteroperabilityMeta,
  PolicyTitle,
} from "~/routes/dokumentation/documentationDataSchema";
import {
  formatRating,
  publicationDateQuestion,
  publicationLinkQuestion,
  publicationStatusQuestion,
  serviceAreaOptions,
  stakeholderOptions,
} from "~/routes/dokumentation/interoperability/values.ts";
import {
  metadataTable,
  toMailtoHyperlinkPatch,
  toParagraphPatch,
} from "~/service/wordDocumentationExport/docxUtils.ts";
import { keyValueToMap } from "~/utils/keyValue.ts";

const { saveAs } = fileSaver;

export async function downloadAssessment(documentationData: DocumentationData) {
  try {
    const template = await fetch(interoperabilityTemplateWord.path);
    const templateData = await template.arrayBuffer();
    const doc = await createDoc(templateData, documentationData);
    saveAs(doc, "Interoperabilitaetsbewertung.docx");
  } catch (e) {
    console.error(e);
  }
}

export function formatInteroperabilityMeta(
  policyTitle?: PolicyTitle,
  meta?: InteroperabilityMeta,
): FileChild[] {
  const publicationOptions = keyValueToMap(publicationStatusQuestion.options);
  const publicationPlan =
    publicationOptions.get(meta?.publicationStatus ?? "") ??
    "geplant / bereits veröffentlicht (nicht zutreffendes bitte löschen)";
  const table = metadataTable([
    ["Titel des Vorhabens", policyTitle?.title ?? ""],
    ["Ministerium oder Organisation", policyTitle?.organization ?? ""],
    [publicationStatusQuestion.questionLabelShort, publicationPlan],
    [publicationDateQuestion.questionLabel, meta?.publicationDate ?? ""],
    [publicationLinkQuestion.questionLabel, meta?.publicationLink ?? ""],
  ]);
  return [table];
}

export function formatInteroperabilityAssessment(
  assessment?: Partial<InteroperabilityAssessmentData>,
): FileChild[] {
  if (!assessment) return [];
  const levelMap: Record<keyof typeof assessment, string> = {
    legal: "Rechtliche",
    semantic: "Semantische",
    technical: "Technische",
    organizational: "Organisatorische",
  };

  const levels = ["legal", "organizational", "semantic", "technical"] as const;

  return levels.flatMap((level) => {
    const levelLabel = levelMap[level];
    const data = assessment[level];

    return [
      new Paragraph({
        style: "Heading2",
        text: `${levelLabel} Interoperabilität`,
      }),
      metadataTable([
        ["Voraussetzungen geschaffen", formatRating(data?.rating) ?? ""],
        ["Erklärung", data?.detail ?? ""],
      ]),
    ];
  });
}

export function formatBindingRequirements(
  bindingRequirements: DocumentationData["bindingRequirements"],
): FileChild[] {
  const serviceAreaMap = keyValueToMap(serviceAreaOptions);
  const stakeholderMap = keyValueToMap(stakeholderOptions);

  const requirements: BindingRequirementsData["requirements"] =
    bindingRequirements?.requirements ?? [
      {
        serviceAreas: [],
        stakeholderGroups: [],
      },
    ];
  return requirements.flatMap((requirement, index) => {
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

export const createDoc = async (
  templateData: ArrayBuffer | Uint8Array,
  documentationData: DocumentationData,
) => {
  const date = new Date().toLocaleDateString("de-DE");

  const children: FileChild[] = [
    new Paragraph(`Erstellt am ${new Date().toLocaleDateString("de-DE")}`),
    ...formatInteroperabilityMeta(
      documentationData.policyTitle,
      documentationData.interoperabilityMeta,
    ),
    ...formatBindingRequirements(documentationData.bindingRequirements),
    ...formatInteroperabilityAssessment(
      documentationData.interoperabilityAssessment,
    ),
  ];
  const patches = {
    TIMESTAMP: toParagraphPatch(date),
    INTEROPS_EMAIL: toMailtoHyperlinkPatch(contact.interoperabilityEmail),
    DS_PHONE: toParagraphPatch(contact.phoneDisplay),
    POLICY_TITLE: toParagraphPatch(
      answerOrPlaceholder(documentationData.policyTitle?.title),
    ),
    CONTENT: {
      type: PatchType.DOCUMENT,
      children: children.filter((child) => child !== null),
    },
  };

  return patchDocument({
    data: templateData,
    outputType: "blob",
    patches,
    keepOriginalStyles: true,
  });
};

const answerOrPlaceholder = (answer?: string) =>
  answer || documentationDocument.placeholder;

export const indentOptions = {
  indent: {
    left: convertInchesToTwip(0.5),
  },
};
