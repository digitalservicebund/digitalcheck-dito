import {
  AlignmentType,
  convertInchesToTwip,
  Document,
  LevelFormat,
  Packer,
} from "docx";
import fileSaver from "file-saver";
import { documentationExport } from "~/resources/content/documentation-document";
import { type PrinzipWithAspekte } from "../strapiData.server";
import {
  answer,
  formLabel,
  header,
  heading,
  principleElement,
} from "./elements";
import markdown from "./markdownToDocx";
const { saveAs } = fileSaver;

const content = {
  introduction: (date: string) => [
    heading(documentationExport.introduction.title, "title"),
    ...markdown(`${documentationExport.introduction.exportDate} ${date}`),
    heading(documentationExport.introduction.projectTitle.heading, 1),
    answer("Beispieltitel eines Regelungsvorhabens"),
    heading(documentationExport.introduction.participationFormats.heading, 1),
    formLabel(documentationExport.introduction.participationFormats.question1),
    answer("Beispiel für eine Beteiligung"),
    formLabel(documentationExport.introduction.participationFormats.question2),
    answer("Beispiel für Erkenntnisse"),
  ],
  nextSteps: [
    heading(documentationExport.nextSteps.heading, 1, true),
    ...markdown(documentationExport.nextSteps.instructions),
    heading(documentationExport.nextSteps.nkrInfo.heading, 2),
    ...markdown(documentationExport.nextSteps.nkrInfo.content),
    heading(documentationExport.nextSteps.support.heading, 2),
    ...markdown(documentationExport.nextSteps.support.content),
  ],
};

const styles = {
  default: {
    title: {
      run: { size: 40 },
    },
    heading1: {
      run: { size: 32 },
      paragraph: {
        spacing: { before: 480 },
      },
    },
    heading2: {
      run: { size: 26 },
      paragraph: {
        spacing: { before: 360 },
      },
    },
    heading3: {
      run: { size: 24 },
    },
    document: {
      run: {
        font: "Arial",
        size: 20,
        color: "000000",
      },
      paragraph: {
        spacing: {
          line: 300,
          before: 180,
          after: 120,
        },
      },
    },
  },
};

const numbering = {
  config: [
    {
      reference: "bullet-points",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: {
                left: convertInchesToTwip(0.25),
                hanging: convertInchesToTwip(0.1),
              },
            },
          },
        },
      ],
    },
  ],
};

export const createDoc = (
  logoData: ArrayBuffer,
  principles: PrinzipWithAspekte[],
) => {
  const date = new Date().toLocaleDateString("de-DE");

  const doc = new Document({
    styles,
    numbering,
    sections: [
      {
        headers: header(date, logoData),
        children: [
          ...content.introduction(date),
          ...principles.flatMap((principle) => principleElement(principle)),
          ...content.nextSteps,
        ],
      },
    ],
  });

  return doc;
};

export default async function downloadDocumentation(
  principles: PrinzipWithAspekte[],
) {
  try {
    // Fetch the logo from the public directory
    const logoResponse = await fetch("/logo/bmds-logo.png");
    const logoData = await logoResponse.arrayBuffer();

    const doc = createDoc(logoData, principles);

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "example.docx");
  } catch (e) {
    console.error(e);
  }
}
