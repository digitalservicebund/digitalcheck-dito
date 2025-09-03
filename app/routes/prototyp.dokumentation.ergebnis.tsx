import {
  CheckCircleOutlined,
  FileDownloadOutlined,
} from "@digitalservicebund/icons";

import fileSaver from "file-saver";
import { PDFDocument } from "pdf-lib";
import Box from "~/components/Box";
import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import { documentation } from "~/resources/content/dokumentation";
import { features } from "~/resources/features";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_PDF,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_WORD,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

const { saveAs } = fileSaver;
const { result } = prototypeDocumentation;
const { title } = result;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title);
}

export default function DocumentationResult() {
  const prototypeAlternativeEnabled = useFeatureFlag(
    features.enableDocumentationPrototypeAlternative,
  );

  const downloadPDF = async () => {
    // Replace with the correct relative path to your PDF in public/
    const response = await fetch(ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_PDF.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const basePdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(basePdfBytes);

    const dummyData = {
      formState: {},
      version: 1,
    };
    const jsonString = JSON.stringify(dummyData, null, 2);
    const jsonBytes = new TextEncoder().encode(jsonString);

    await pdfDoc.attach(jsonBytes, "data.json", {
      mimeType: "application/json",
      description: "Attached dummy JSON data",
      creationDate: new Date(),
      modificationDate: new Date(),
    });

    const resultPdfBytes = await pdfDoc.save();

    const blob = new Blob([new Uint8Array(resultPdfBytes)], {
      type: "application/pdf",
    });
    saveAs(
      blob,
      `digitalcheck-dokumentation-stand-${new Date().toISOString()}.pdf`,
    );
  };

  return (
    <>
      <div className="bg-blue-100 py-40 print:pb-0">
        <div className="px-16">
          <Container className="rounded-t-lg bg-blue-300 py-32">
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
          <Container className="rounded-b-lg bg-white">
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
            <Button
              className="mt-40"
              text={result.data.buttonBack}
              look="tertiary"
              href={ROUTE_PROTOTYPE_DOCUMENTATION_META.url}
            />
            <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />
            {prototypeAlternativeEnabled ? (
              <>
                <Box
                  heading={{
                    text: "Dokumentation speichern",
                    tagName: "h2",
                  }}
                  content={{
                    markdown: dedent`
                      Laden Sie die Dokumentation als PDF-Datei herunter, um sie intern abzustimmen oder direkt an den NKR zu senden.
                      `,
                  }}
                />
                <DetailsSummary
                  className="mt-20"
                  title="Wie kann ich später an der Dokumentation weiterarbeiten?"
                  content={
                    <>
                      Diese PDF-Datei beinhaltet die Informationen sowohl als
                      menschen- wie auch maschinenlesbares Textformat. So können
                      Sie Ihre Dokumentation jederzeit speichern, und später
                      wieder hochladen, um weiter daran zu arbeiten.
                      <br />
                      Zur einfacheren internen Abstimmung können Sie die
                      Dokumentation auch als Word herunterladen.
                    </>
                  }
                />
                <ButtonContainer
                  buttons={[
                    {
                      text: result.data.buttonDownload,
                      onClick: () => {
                        void downloadPDF();
                      },
                    },
                    {
                      text: "Word-Dokumentation herunterladen",
                      href: ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_WORD.url,
                      look: "tertiary",
                    },
                  ]}
                  className="mt-20"
                />
              </>
            ) : (
              <>
                <Box
                  heading={{
                    text: "Dokumentation speichern",
                    tagName: "h2",
                  }}
                  content={{
                    markdown: dedent`
                Laden Sie die Dokumentation als PDF herunter, um sie intern abzustimmen oder direkt an den NKR zu senden.
                
                Sie können alternativ einen Zwischenstand speichern, um später weiterzuarbeiten.`,
                  }}
                />
                <ButtonContainer
                  buttons={[
                    {
                      text: result.data.buttonDownload,
                      href: ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_PDF.url,
                    },
                    {
                      text: "Zwischenstand speichern",
                      href: ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE.url,
                      look: "ghost",
                      iconLeft: <FileDownloadOutlined />,
                    },
                  ]}
                  className="mt-40"
                />
              </>
            )}
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
            <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />
            <ButtonContainer
              buttons={[
                {
                  text: "Dokumentation starten oder fortsetzen",
                  href: ROUTE_PROTOTYPE_DOCUMENTATION.url,
                  look: "tertiary",
                },
              ]}
            />
          </Container>
        </div>
      </div>
      <Container className="my-80 space-y-32 py-0">
        <Heading tagName="h2">{documentation.nextSteps.title}</Heading>

        <NumberedList>
          {documentation.nextSteps.items.map((item) => (
            <NumberedList.Item
              className="space-y-16"
              key={item.headline.text}
              disabled={item.isDisabled}
            >
              <p className="ds-heading-03-reg">{item.headline.text}</p>
              {"content" in item && (
                <RichText markdown={item.content as string} />
              )}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </Container>
    </>
  );
}
