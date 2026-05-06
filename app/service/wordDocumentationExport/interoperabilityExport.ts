import {
  FileChild,
  IPatch,
  Paragraph,
  PatchType,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { Option } from "~/components/ComboBox.tsx";
import {
  DocumentationData,
  InteroperabilityAssessmentData,
} from "~/routes/dokumentation/documentationDataSchema.ts";
import {
  serviceAreaOptions,
  stakeholderOptions,
} from "~/routes/dokumentation/interoperability/BindingRequirementsForm.tsx";
import { interoperabilityRatingOptions } from "~/routes/dokumentation/interoperability/InteroperabilityRatingSelect.tsx";

import {
  stringToTextRuns,
  toParagraphPatch,
} from "~/service/wordDocumentationExport/wordDocumentationV2.ts";

export function formatInteroperabilityAssessment(
  assessment: InteroperabilityAssessmentData,
): IPatch {
  const levelMap: Record<keyof typeof assessment, string> = {
    legal: "Rechtliche",
    semantic: "Semantische",
    technical: "Technische",
    organizational: "Organisatorische",
  };
  const ratingMap = keyValueToMap(interoperabilityRatingOptions);

  const levelParagraphs: Paragraph[] = Object.entries(assessment).flatMap(
    ([level, data]) => {
      const levelLabel = levelMap[level as keyof typeof assessment];

      return [
        new Paragraph({
          style: "Heading 2",
          text: `${levelLabel} Interoperabilität`,
        }),
        data.detail
          ? new Paragraph({
              children: stringToTextRuns(data.detail),
              style: "Normal0",
            })
          : null,
        new Paragraph({
          children: [
            new TextRun("Bewertung: "),
            new TextRun({
              text: data.rating ? ratingMap.get(data.rating) : "",
              bold: true,
            }),
          ],
        }),
      ].filter((item) => item !== null);
    },
  );

  return { type: PatchType.DOCUMENT, children: levelParagraphs };
}

function keyValueToMap(options: readonly Option[]): Map<string, string> {
  return new Map(options.map(({ value, label }) => [value, label]));
}

function makeTable(rows: string[][]) {
  return new Table({
    columnWidths: [3505, 5505],
    rows: rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph(cell)],
              }),
          ),
        }),
    ),
  });
}

export function formatBindingRequirements(
  bindingRequirements: DocumentationData["bindingRequirements"],
): IPatch {
  if (!bindingRequirements?.requirements?.length)
    return toParagraphPatch("Keine Angaben");

  const serviceAreaMap = keyValueToMap(serviceAreaOptions);
  const stakeholderMap = keyValueToMap(stakeholderOptions);

  const requirementParagraphs: FileChild[] =
    bindingRequirements.requirements.flatMap((requirement, index) => {
      const headerParagraph = new Paragraph({
        style: "Heading 2",
        children: [
          new TextRun({
            text: `Verbindliche Anforderung ${index + 1}`,
          }),
        ],
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

      return [headerParagraph, makeTable(tableData)];
    });

  return {
    type: PatchType.DOCUMENT,
    children: requirementParagraphs,
  };
}
