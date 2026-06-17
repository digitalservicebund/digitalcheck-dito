import { interoperabilityTemplateWord } from "@/config/downloads";
import { convertInchesToTwip, patchDocument } from "docx";
import fileSaver from "file-saver";
import { documentationDocument } from "~/resources/content/documentation-document";
import { contact } from "~/resources/content/shared/contact";
import type { DocumentationData } from "~/routes/dokumentation/documentationDataSchema";
import {
  toMailtoHyperlinkPatch,
  toParagraphPatch,
} from "~/service/wordDocumentationExport/docxUtils.ts";
import { buildAppendixPatch } from "~/service/wordDocumentationExport/interoperabilityExport.ts";

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

// function formatPublicationStatus(header?: DocumentationData["policyTitle"]) {
//   switch (header?.publicationStatus) {
//     case "planned":
//       return "geplant";
//     case "published":
//       return "bereits veröffentlicht";
//     default:
//       return "geplant / bereits veröffentlicht (nicht zutreffendes bitte löschen)";
//   }
// }

export const createDoc = async (
  templateData: ArrayBuffer | Uint8Array,
  {
    policyTitle,
    bindingRequirements,
    interoperabilityAssessment,
    euInteroperabilityOutcome,
  }: DocumentationData,
) => {
  const date = new Date().toLocaleDateString("de-DE");

  const patches = {
    TIMESTAMP: toParagraphPatch(date),
    INTEROPS_EMAIL: toMailtoHyperlinkPatch(contact.interoperabilityEmail),
    DS_PHONE: toParagraphPatch(contact.phoneDisplay),
    POLICY_TITLE: toParagraphPatch(answerOrPlaceholder(policyTitle?.title)),
    // PUBLICATION_DATE: toParagraphPatch(policyTitle?.publicationDate ?? ""),
    // PUBLICATION_LINK: toParagraphPatch(policyTitle?.publicationLink ?? ""),

    CONTENT: buildAppendixPatch({
      policyTitle,
      interoperabilityAssessment,
      bindingRequirements,
      euInteroperabilityOutcome,
    }),
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
