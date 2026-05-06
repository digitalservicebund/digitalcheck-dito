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
import {
  AssessmentFormValues,
  STORAGE_KEY,
} from "~/routes/dokumentation/interoperability/FormVariant2.tsx";
import { interoperabilityRatingOptions } from "~/routes/dokumentation/interoperability/InteroperabilityRatingSelect.tsx";
import {
  Question,
  sections,
} from "~/routes/dokumentation/interoperability/Sections.tsx";
import {
  stringToTextRuns,
  toParagraphPatch,
} from "~/service/wordDocumentationExport/wordDocumentationV2.ts";

export function getInteroperabilitylegaltext(): IPatch {
  const stringValue = localStorage.getItem(STORAGE_KEY);
  if (!stringValue) return toParagraphPatch("");
  const value = JSON.parse(stringValue) as AssessmentFormValues;

  const questions = sections.flatMap((section) =>
    section.groups.flatMap((group) => group.questions),
  );
  const questionMap = new Map<string, Question>();
  for (const question of questions) {
    questionMap.set(question.id, question);
  }

  const resultText = Object.entries(value).map(([questionKey, answer]) => {
    if (!answer.checked) return null;
    const question = questionMap.get(questionKey);
    if (!question) {
      console.error("Could not find question", questionKey);
      return null;
    }
    if (answer.ownStatement) return answer.ownStatement;
    if (answer.details)
      return String(question.label).replace(/\.$/, ": ") + answer.details; // TODO this might be a ReactNode
    return question.label;
  });

  const filtered = resultText.filter(Boolean);
  if (filtered.length === 1) return toParagraphPatch(filtered[0] as string);
  const list = filtered.map((item) => `- ${item}`).join("\n");
  return toParagraphPatch(list);
}

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
        new Paragraph({
          children: stringToTextRuns(data.detail ?? ""),
          style: "Normal0",
        }),
        new Paragraph({
          children: [
            new TextRun("Bewertung: "),
            new TextRun({
              text: data.rating ? ratingMap.get(data.rating) : "",
              bold: true,
            }),
          ],
        }),
      ];
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
