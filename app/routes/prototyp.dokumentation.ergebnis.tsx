import { CheckCircleOutlined } from "@digitalservicebund/icons";

import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  TextRun,
} from "docx";
import fileSaver from "file-saver";
import { redirect } from "react-router";
import Background from "~/components/Background";
import Box from "~/components/Box";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import { NumberedList } from "~/components/List";
import RichText from "~/components/RichText";
import { documentation } from "~/resources/content/dokumentation";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
const { saveAs } = fileSaver;

const { result } = prototypeDocumentation;
const { title } = result;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title);
}

export function action() {
  return redirect(
    `mailto:${encodeURIComponent(result.form.emailTemplate.toNkr)}?subject=${encodeURIComponent(result.form.emailTemplate.subject)}&body=${encodeURIComponent(result.form.emailTemplate.body)}`,
  );
}

// Utility to make bold text before ':'
function boldBeforeColon(line: string): (TextRun | string)[] {
  const index = line.indexOf(":");
  if (index !== -1) {
    return [
      new TextRun({ text: line.substring(0, index + 1), bold: true }),
      new TextRun({ text: " " + line.substring(index + 1) }),
    ];
  }
  return [new TextRun(line)];
}

// Utility to bold lines starting with §
function paragraphWithFormatting(line: string): Paragraph {
  const trimmed = line.trim();
  if (trimmed.startsWith("§")) {
    return new Paragraph({
      children: [new TextRun({ text: trimmed, bold: true })],
      spacing: { line: 360 }, // 1.5 line spacing
    });
  } else {
    return new Paragraph({
      children: boldBeforeColon(trimmed),
      spacing: { line: 360 },
    });
  }
}

const createDoc = () => {
  const lines = [
    {
      type: "title",
      text: "Schritt 3 des Digitalcheck: Dokumentieren des Regelungsvorhabens",
    },
    { type: "subtitle", text: "Version 1.6 - 15.06.2025" },
    {
      type: "heading1",
      text: "Elektronischer Rechtsverkehr mit dem Bundesverfassungsgericht – BVerfGG",
    },
    { type: "normal", text: "Erstellt am 18. Juni 2025, 14:32 Uhr" },
    { type: "heading2", text: "Dokumentation an den NKR senden:" },
    {
      type: "normal",
      text: "● Senden Sie die PDF-Datei per E-Mail an folgende Adresse: nkr@bmj.bund.de. Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine digital- und praxistaugliche Umsetzung.",
    },
    {
      type: "normal",
      text: "● Bei Interoperabilitätsbezug senden Sie eine Kopie der E-Mail mit der PDF-Datei an interoperabel@digitalservice.bund.de",
    },
    {
      type: "normal",
      text: "● Visuelle Darstellungen und Skizzen sind vom NKR gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.",
    },
    { type: "normal", text: "● Damit ist der Digitalcheck für Sie beendet." },
    {
      type: "heading2",
      text: "Sie haben Fragen oder benötigen Unterstützung?",
    },
    {
      type: "normal",
      text: "Rufen Sie uns an: 0151 4076 7839 oder schreiben Sie uns unter: digitalcheck@digitalservice.bund.de",
    },
    { type: "heading1", text: "Praxistaugliche Umsetzung" },
    {
      type: "normal",
      text: "Austauschformate: Umfragen und Einzelgespräche mit Akteurinnen und Akteuren, formelles Beteiligungsverfahren",
    },
    {
      type: "normal",
      text: "Eingearbeitete Erkenntnisse: Durch die Gespräche wurde herausgefunden, dass eine ausschließlich digitale Übertragung vorgeschrieben werden kann.",
    },
    {
      type: "heading2",
      text: "Prinzip: Digitale Angebote für alle nutzbar gestalten",
    },
    { type: "normal", text: "Erfüllt: Ja" },
    {
      type: "normal",
      text: "§ 23a BVerfGG (1) Schriftlich einzureichende Anträge und Erklärungen sowie sonstige Schriftsätze und deren Anlagen können nach Maßgabe der folgenden Absätze als elektronische Dokumente beim Bundesverfassungsgericht eingereicht werden.",
    },
    {
      type: "normal",
      text: "Erklärung: Ermöglicht elektronisches Einreichen der Dokumente.",
    },
    { type: "heading2", text: "§ 23b BVerfGG (1)" },
    {
      type: "normal",
      text: "Soweit die handschriftliche Unterzeichnung ... in welches das handschriftlich unterzeichnete Schriftstück gemäß § 23e Absatz 2 Satz 4 übertragen worden ist.",
    },
    {
      type: "normal",
      text: "Erklärung: Verhindert einen Medienbruch und erhöht die Nutzerfreundlichkeit durch das Ermöglichen von Alternativen zur handschriftlichen Unterzeichnung.",
    },
    {
      type: "heading2",
      text: "Prinzip: Datenwiederverwendung benötigt einheitliches Recht",
    },
    { type: "normal", text: "Erfüllt: Ja" },
    {
      type: "normal",
      text: "§ 23a BVerfGG (2) Das elektronische Dokument muss für die Bearbeitung durch das Bundesverfassungsgericht geeignet sein.",
    },
    {
      type: "normal",
      text: "Erklärung: Begünstigt eine effiziente technische Umsetzung, indem es die Nutzung oder Wiederverwendung eines geeigneten Datenstandards vorschreibt.",
    },
    {
      type: "heading2",
      text: "Prinzip: Etablierte Technologien ermöglichen effiziente Umsetzung",
    },
    { type: "normal", text: "Erfüllt: Nicht relevant" },
    {
      type: "heading2",
      text: "Prinzip: Automatisierung basiert auf eindeutigen Regelungen",
    },
    { type: "normal", text: "Erfüllt: Ja" },
    {
      type: "normal",
      text: "§ 23a BVerfGG (5) Ein elektronisches Dokument ist eingegangen, sobald es auf der für den Empfang bestimmten Einrichtung des Bundesverfassungsgerichts gespeichert ist.",
    },
    {
      type: "normal",
      text: "Erklärung: Entlastet die Verwaltung durch automatische Bestätigungen; eine Funktionalität, die von Nutzenden erwartet wird.",
    },
    {
      type: "heading2",
      text: "Prinzip: Datenschutz und Informationssicherheit schaffen Vertrauen",
    },
    { type: "normal", text: "Erfüllt: Ja" },
    {
      type: "normal",
      text: "§ 23a BVerfGG(3) Das elektronische Dokument muss mit einer qualifizierten elektronischen Signatur der verantwortenden Person versehen sein oder von der verantwortenden Person signiert und auf einem sicheren Übermittlungsweg eingereicht werden.",
    },
    {
      type: "normal",
      text: "Erklärung: Steigert den Schutz vor Fälschungen durch Verwendung eines geeigneten kryptografischen Verfahrens (qualifizierte elektronische Signatur).",
    },
    {
      type: "normal",
      text: "Führt zu erhöhter Informationssicherheit durch die Nutzung eines sicheren Übermittlungsweges.",
    },
    {
      type: "normal",
      text: "Alle Informationen zum Digitalcheck auf erarbeiten.digitalcheck.bund.de",
    },
  ];

  const children: Paragraph[] = [];

  for (const line of lines) {
    if (line.type === "title") {
      children.push(
        new Paragraph({
          text: line.text,
          heading: HeadingLevel.TITLE,
          spacing: { line: 360 },
        }),
      );
    } else if (line.type === "subtitle") {
      children.push(
        new Paragraph({
          text: line.text,
          alignment: AlignmentType.CENTER,
          spacing: { line: 360 },
        }),
      );
    } else if (line.type.startsWith("heading")) {
      children.push(new Paragraph({ text: "" })); // newline before heading
      children.push(
        new Paragraph({
          text: line.text,
          heading:
            line.type === "heading1"
              ? HeadingLevel.HEADING_1
              : HeadingLevel.HEADING_2,
          spacing: { line: 360 },
        }),
      );
    } else {
      children.push(paragraphWithFormatting(line.text));
    }
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
          },
          paragraph: {
            spacing: { line: 360 },
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: children,
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Seite ", PageNumber.CURRENT],
                  }),
                ],
              }),
            ],
          }),
        },
      },
    ],
  });

  return doc;
};

export default function DocumentationResult() {
  const downloadWord = () => {
    const doc = createDoc();

    Packer.toBlob(doc)
      .then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <Background backgroundColor="blue" className="py-40 print:pb-0">
        <div className="px-16">
          <Container className="rounded-t-lg py-32" backgroundColor="midBlue">
            <div className="flex flex-col gap-16 sm:flex-row">
              <div className="flex size-36 flex-none items-center justify-center">
                <CheckCircleOutlined className="h-full w-full" />
              </div>
              <Header
                heading={{
                  tagName: "h1",
                  look: "ds-heading-02-reg",
                  markdown: title,
                  className: "mb-0",
                }}
              />
            </div>
          </Container>
          <Container className="rounded-b-lg" backgroundColor="white">
            <Box
              heading={{
                text: result.data.title,
                tagName: "h2",
              }}
              content={{ markdown: result.data.text }}
            />
            <DetailsSummary
              title="Alle Eingaben"
              content={result.data.dummyOverview}
              className="mt-12"
            />
            <ButtonContainer
              buttons={[
                {
                  text: result.data.buttonDownload,
                  onClick: () => {
                    void downloadWord();
                  },
                },
                {
                  text: result.data.buttonBack,
                  href: ROUTE_PROTOTYPE_DOCUMENTATION_META.url,
                  look: "tertiary",
                },
              ]}
              className="mt-40"
            />
            <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />
            <form method="post">
              <fieldset className="ds-stack ds-stack-24">
                <legend>
                  <Heading tagName="h2" text={result.form.formLegend} />
                </legend>
                <div className="flex items-start pb-[40px]">
                  <div className="ds-stack ds-stack-16 flex-grow">
                    <RichText markdown={result.form.instructions} />
                  </div>
                </div>
              </fieldset>
            </form>
            <hr className="mb-32 border-t-[2px] border-gray-400" />
            <div className="ds-stack ds-stack-16 mt-40">
              <Heading tagName="h2" text={result.form.faqs.title} />
              {result.form.faqs.details.map((detail, index) => (
                <DetailsSummary
                  className={`plausible-event-name=Content.Content+Info.Accordion+FAQ${index + 1}`}
                  key={detail.label}
                  title={detail.label}
                  content={detail.text}
                />
              ))}
            </div>
          </Container>
        </div>
      </Background>
      <Container>
        <NumberedList
          heading={{
            tagName: "h2",
            text: documentation.nextSteps.title,
          }}
          items={documentation.nextSteps.items}
        />
      </Container>
      <FeedbackForm
        className="relative left-1/2 w-screen -translate-x-1/2"
        {...result.feedbackForm}
      />
    </>
  );
}
