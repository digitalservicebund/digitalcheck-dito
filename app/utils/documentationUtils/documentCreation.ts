import {
  AlignmentType,
  convertInchesToTwip,
  Document,
  LevelFormat,
  Packer,
} from "docx";
import fileSaver from "file-saver";
import { dedent } from "../dedentMultilineStrings";
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
    heading("Dokumentation der Digitaltauglichkeit", "title"),
    ...markdown(`Export erstellt am ${date}`),
    heading("Titel des Regelungsvorhabens", 1),
    answer("Beispieltitel eines Regelungsvorhabens"),
    heading("Beteiligungsformate", 1),
    formLabel(
      "Entspricht die Umsetzung des Regelungsvorhabens den Bedürfnissen der Betroffenen? Wie haben Sie das überprüft?",
    ),
    answer("Beispiel für eine Beteiligung"),
    formLabel(
      "Wie spiegeln sich die Erkenntnisse, die durch die oben genannten Schritte gewonnen wurden, im Regelungsvorhaben wider?",
    ),
    answer("Beispiel für Erkenntnisse"),
  ],
  nextSteps: [
    heading("Das ist jetzt zu tun", 1, true),
    ...markdown(dedent`
    - **Speichern** Sie die Dokumentation als **PDF**
    - **Senden** Sie die von Ihnen erstellte Dokumentation als PDF per E-Mail an folgende Adresse: [nkr@bmj.bund.de](mailto:nkr@bmj.bund.de). Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen.
    - **Bei Interoperabilitätsbezug** senden Sie eine Kopie der E-Mail mit der PDF-Datei an [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de).
    - **Visuelle Darstellungen** und Skizzen sind vom NKR gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.
    - Damit ist der Digitalcheck für Sie beendet.
    `),
    heading("Gut zu wissen: Das prüft der Nationale Normenkontrollrat", 2),
    ...markdown(
      "Der NKR prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung. Die Basis ist der von Ihnen durchgeführte Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu. ",
    ),
    heading("Sie haben Fragen oder benötigen Unterstützung? ", 2),
    ...markdown(
      "Rufen Sie uns an: 0151 4076 7839 oder schreiben Sie uns unter: [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de).",
    ),
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

export default async function downloadWord(principles: PrinzipWithAspekte[]) {
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
