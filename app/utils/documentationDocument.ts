import {
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  Document,
  ExternalHyperlink,
  Header,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import fileSaver from "file-saver";
import { type PrinzipWithAspekte } from "./strapiData.server";
const { saveAs } = fileSaver;

const NO_BORDER = {
  style: BorderStyle.NONE,
  color: "ffffff",
};
const NO_BORDERS = {
  top: NO_BORDER,
  bottom: NO_BORDER,
  left: NO_BORDER,
  right: NO_BORDER,
};
const BLACK_BORDER = {
  size: 1,
  color: "000000",
  style: BorderStyle.SINGLE,
};
const BLACK_BORDERS = {
  top: BLACK_BORDER,
  bottom: BLACK_BORDER,
  left: BLACK_BORDER,
  right: BLACK_BORDER,
};

const EXAMPLE_PRINCIPLE_DESCRIPTION =
  "Viele Bürgerinnen, Bürger und Unternehmen sind an digitale Angebote gewöhnt und bevorzugen diese – sofern die digitale Kommunikation gut umgesetzt ist und ihren Bedürfnissen entspricht. Die Verwaltung kann digitale Daten schneller prüfen, bearbeiten und dokumentieren. Das Angebot sollte dabei immer inklusiv sein und es benötigt gegebenenfalls analoge Alternativen.";
const EXAMPLE_ASPECT_DESCRIPTION =
  "Ermöglichen Sie digitale Kommunikation: Beseitigen Sie Hürden wie Schriftform oder persönliches Erscheinen und bieten Sie alternative Kommunikationswege an.";

const renderPrinciple = (principle: PrinzipWithAspekte) => {
  const elements: Paragraph[] = [];

  // Principle heading
  elements.push(
    new Paragraph({
      text: principle.Name,
      heading: HeadingLevel.HEADING_1,
      pageBreakBefore: true,
    }),
  );

  // Principle description (convert Node[] to plain text)
  elements.push(
    new Paragraph({
      text: EXAMPLE_PRINCIPLE_DESCRIPTION,
    }),
  );

  // Question about implementation
  elements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Lässt sich das Vorhaben im Sinne des Prinzips umsetzen?",
          bold: true,
        }),
      ],
    }),
  );

  // Placeholder for answer
  elements.push(
    new Paragraph({
      text: "Ja, gänzlich oder teilweise",
      border: BLACK_BORDERS,
    }),
  );

  // Render aspects
  if (principle.Aspekte && principle.Aspekte.length > 0) {
    principle.Aspekte.forEach((aspekt) => {
      // Aspect title as heading
      elements.push(
        new Paragraph({
          text: aspekt.Titel,
          heading: HeadingLevel.HEADING_2,
        }),
      );

      // Aspect description text
      elements.push(
        new Paragraph({
          text: EXAMPLE_ASPECT_DESCRIPTION,
        }),
      );

      // Paragraphs label
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Paragrafen ",
              bold: true,
            }),
          ],
        }),
      );

      // Placeholder for paragraphs
      elements.push(
        new Paragraph({
          text: "§",
          border: BLACK_BORDERS,
        }),
      );

      // Explanation label
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Erläuterung",
              bold: true,
            }),
          ],
        }),
      );

      // Placeholder for explanation
      elements.push(
        new Paragraph({
          text: "",
          border: BLACK_BORDERS,
        }),
      );
    });
  }

  return elements;
};

const createDoc = (logoData: ArrayBuffer, principles: PrinzipWithAspekte[]) => {
  const date = new Date().toLocaleDateString("de-DE");

  const doc = new Document({
    styles: {
      default: {
        title: {
          run: {
            size: 40,
          },
        },
        heading1: {
          run: {
            size: 32,
          },
          paragraph: {
            spacing: {
              before: 480,
            },
          },
        },
        heading2: {
          run: {
            size: 26,
          },
          paragraph: {
            spacing: {
              before: 360,
            },
          },
        },
        heading3: {
          run: {
            size: 24,
          },
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
    },
    numbering: {
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
    },
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Table({
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        borders: NO_BORDERS,
                        verticalAlign: VerticalAlign.TOP,
                        children: [
                          new Paragraph({
                            text: date,
                            spacing: {
                              line: 0,
                              before: 0,
                              after: 0,
                            },
                          }),
                        ],
                      }),
                      new TableCell({
                        borders: NO_BORDERS,
                        verticalAlign: VerticalAlign.TOP,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.END,
                            spacing: {
                              line: 0,
                              before: 0,
                              after: 0,
                            },
                            children: [
                              new ImageRun({
                                type: "png",
                                data: logoData,
                                transformation: {
                                  width: 62,
                                  height: 28,
                                },
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            text: "Dokumentation der Digitaltauglichkeit",
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            text: `Export erstellt am ${date}`,
          }),
          new Paragraph({
            text: "Titel des Regelungsvorhabens",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: "Beispieltitel eines Regelungsvorhabens",
            border: BLACK_BORDERS,
          }),
          new Paragraph({
            text: "Beteiligungsformate",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Entspricht die Umsetzung des Regelungsvorhabens den Bedürfnissen der Betroffenen? Wie haben Sie das überprüft?",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            text: "Beispiel für eine Beteiligung",
            border: BLACK_BORDERS,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Wie spiegeln sich die Erkenntnisse, die durch die oben genannten Schritte gewonnen wurden, im Regelungsvorhaben wider?",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            text: "Beispiel für Erkenntnisse",
            border: BLACK_BORDERS,
          }),
          ...principles.flatMap((principle) => {
            return renderPrinciple(principle);
          }),
          new Paragraph({
            text: "Das ist jetzt zu tun",
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Speichern ", bold: true }),
              new TextRun("Sie die Dokumentation als"),
              new TextRun({ text: " PDF ", bold: true }),
            ],
            numbering: {
              reference: "bullet-points",
              level: 0,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Senden ", bold: true }),
              new TextRun(
                "Sie die von Ihnen erstellte Dokumentation als PDF per E-Mail an folgende Adresse: ",
              ),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "nkr@bmj.bund.de",
                    style: "Hyperlink",
                  }),
                  new TextRun("."),
                ],
                link: "mailto:nkr@bmj.bund.de",
              }),
              new TextRun({
                text: "Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen.",
                break: 1,
              }),
            ],
            numbering: {
              reference: "bullet-points",
              level: 0,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Bei Interoperabilitätsbezug ", bold: true }),
              new TextRun("senden Sie eine Kopie der E-Mail mit dem PDF an "),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "interoperabel@digitalservice.bund.de",
                    style: "Hyperlink",
                  }),
                  new TextRun("."),
                ],
                link: "mailto:interoperabel@digitalservice.bund.de",
              }),
            ],
            numbering: {
              reference: "bullet-points",
              level: 0,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Visuelle Darstellungen ", bold: true }),
              new TextRun(
                "und Skizzen können Sie gerne formlos als PDF an die E-Mail an den NKR anhängen oder als Screenshot in dieses Dokument einfügen.",
              ),
            ],
            numbering: {
              reference: "bullet-points",
              level: 0,
            },
          }),
          new Paragraph({
            text: "Damit ist der Digitalcheck für Sie beendet. ",
            numbering: {
              reference: "bullet-points",
              level: 0,
            },
          }),
          new Paragraph({
            text: "Gut zu wissen: Das prüft der Nationale Normenkontrollrat",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: "Der NKR prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung. Die Basis ist der von Ihnen durchgeführte Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu. ",
          }),
          new Paragraph({
            text: "Sie haben Fragen oder benötigen Unterstützung? ",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Rufen Sie uns an: 0151 4076 7839 oder schreiben Sie uns unter: ",
              ),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "digitalcheck@digitalservice.bund.de",
                    style: "Hyperlink",
                  }),
                  new TextRun("."),
                ],
                link: "mailto:digitalcheck@digitalservice.bund.de",
              }),
            ],
          }),
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
