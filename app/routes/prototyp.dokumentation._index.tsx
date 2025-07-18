import { FileUploadOutlined } from "@digitalservicebund/icons/index";
import {
  decodePDFRawStream,
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFRawStream,
  PDFStream,
  PDFString,
} from "pdf-lib";
import React from "react";
import { useNavigate } from "react-router";
import { twJoin } from "tailwind-merge";
import { BACKGROUND_COLORS } from "~/components";
import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { features } from "~/resources/features";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_DOCUMENTATION_STATIC_WORD,
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION.title);
}

const { intro } = prototypeDocumentation;

export default function Index() {
  const prototypeAlternativeEnabled = useFeatureFlag(
    features.enableDocumentationPrototypeAlternative,
  );

  const navigate = useNavigate();
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (prototypeAlternativeEnabled) {
        const file = files[0];
        const arrayBuffer = file.arrayBuffer();
        try {
          const jsonString = await extractJsonAttachment(await arrayBuffer);
          console.log("Extracted JSON:", jsonString);
        } catch (error) {
          console.error(error);
        }
      }
      await navigate(ROUTE_PROTOTYPE_DOCUMENTATION_META.url, {
        state: "fileUpload",
      });
    }
  };

  async function extractJsonAttachment(pdfBytes: ArrayBuffer) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const attachments = extractAttachments(pdfDoc);

    const json = attachments.find(
      (attachment) => attachment.name === "data.json",
    )!;
    return new TextDecoder().decode(json.data);
  }

  const extractAttachments = (pdfDoc: PDFDocument) => {
    const rawAttachments = extractRawAttachments(pdfDoc);
    return rawAttachments.map(({ fileName, fileSpec }) => {
      const stream = fileSpec
        .lookup(PDFName.of("EF"), PDFDict)
        .lookup(PDFName.of("F"), PDFStream) as PDFRawStream;
      return {
        name: fileName.decodeText(),
        data: decodePDFRawStream(stream).decode(),
      };
    });
  };

  const extractRawAttachments = (pdfDoc: PDFDocument) => {
    if (!pdfDoc.catalog.has(PDFName.of("Names"))) return [];
    const Names = pdfDoc.catalog.lookup(PDFName.of("Names"), PDFDict);

    if (!Names.has(PDFName.of("EmbeddedFiles"))) return [];
    const EmbeddedFiles = Names.lookup(PDFName.of("EmbeddedFiles"), PDFDict);

    if (!EmbeddedFiles.has(PDFName.of("Names"))) return [];
    const EFNames = EmbeddedFiles.lookup(PDFName.of("Names"), PDFArray);

    const rawAttachments = [];
    for (let idx = 0, len = EFNames.size(); idx < len; idx += 2) {
      const fileName = EFNames.lookup(idx) as PDFHexString | PDFString;
      const fileSpec = EFNames.lookup(idx + 1, PDFDict);
      rawAttachments.push({ fileName, fileSpec });
    }

    return rawAttachments;
  };

  const hintsForAlternative = [
    {
      title: "So funktioniert es",
      text: "Dieses Online Formular führt Sie durch die fünf Prinzipien der Digitaltauglichkeit. Daraus wird die Dokumentation für den Nationalen Normenkontrollrat (NKR) generiert. Diese können Sie dann als PDF-Datei herunterladen, ablegen und schlussendlich beim NKR einreichen.",
    },
    {
      title: "Vertraulich und nur für Sie zugänglich",
      text: "Was sie eintragen, bleibt vertraulich. Ihre Eingaben werden nur genutzt, um die PDF-Datei zu erstellen. Ihre Daten werden **nicht gespeichert** oder weitergegeben. Niemand sonst kann darauf zugreifen.",
    },
    {
      title: "Nur ein Vorgang zur selben Zeit",
      text:
        "Sie können nur an einer Dokumentation zur selben Zeit arbeiten und Ihre Daten werden nicht dauerhaft gespeichert. " +
        "Wenn Sie einen Zwischenstand speichern möchten, können Sie die Dokumentation jederzeit als auslesbare PDF-Datei herunterladen. Sie können diese somit zu einem späteren Zeitpunkt wieder hochladen, um an der Dokumentation weiterzuarbeiten.",
    },
  ];

  const hints = prototypeAlternativeEnabled ? hintsForAlternative : intro.hints;

  return (
    <>
      <Hero title={intro.title} subtitle={intro.subtitle}>
        <div className="ds-stack ds-stack-16 mt-40 mb-20">
          {hints.map((hint) => (
            <DetailsSummary
              key={hint.title}
              title={hint.title}
              content={hint.text}
            />
          ))}
        </div>

        <div className="flex flex-col gap-24 sm:flex-row">
          <div
            className={twJoin(
              "flex w-full flex-col p-16 sm:p-32",
              BACKGROUND_COLORS.white,
            )}
          >
            <InfoBox
              heading={{
                text: "Neue Dokumentation starten",
                tagName: "h3",
                className: "ds-heading-03-bold",
              }}
              content="Starten Sie mit einem leeren Formular."
            />
            <div className="flex grow flex-col items-start justify-end">
              <Button href={ROUTE_PROTOTYPE_DOCUMENTATION_META.url}>
                Dokumentation starten
              </Button>
            </div>
          </div>

          <div
            className={twJoin("w-full p-16 sm:p-32", BACKGROUND_COLORS.white)}
          >
            <section className="flex flex-row gap-16">
              <div className="ds-stack ds-stack-8 w-full scroll-my-40">
                <ul
                  className={twJoin(
                    "list-unstyled info-box ds-stack",
                    "ds-stack-48",
                  )}
                >
                  <li className={twJoin("scroll-my-40")}>
                    <div className={twJoin("ds-stack ds-stack-16 break-words")}>
                      <Heading
                        {...{
                          text: "Am Zwischenstand weiterarbeiten",
                          tagName: "h3",
                          className: "ds-heading-03-bold",
                        }}
                      />
                      <DetailsSummary
                        title="Welche Datei kann ich hochladen?"
                        content="Wenn Sie bereits zu einem früheren Zeitpunkt angefangen haben, die Dokumentation auszufüllen, hatten Sie die Möglichkeit einen Zwischenstand als **PDF-Datei** herunterzuladen. Diese Datei können Sie hier wieder hochladen, um daran weiterzuarbeiten."
                      />
                      <label className="ds-label-01-reg block w-full cursor-pointer justify-center border-2 border-dashed border-blue-800 bg-white p-40 text-center align-middle text-blue-800 focus-within:border-solid focus-within:outline-3 focus-within:outline-blue-800">
                        <input
                          type="file"
                          accept={
                            prototypeAlternativeEnabled
                              ? "application/pdf"
                              : "application/json"
                          }
                          className="w-0 opacity-0"
                          onChange={onFileChange}
                        />
                        <FileUploadOutlined
                          fill={"currentColor"}
                          height={20}
                          className="mr-6 inline"
                        />
                        Klicken Sie hier, um die Dokumentation als auslesbare
                        PDF-Datei hochzuladen.
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        <RichText
          markdown={
            "**Alternativ** können Sie die Dokumentation auch als Word-Datei herunterladen und ausfüllen. "
          }
          className="mt-40"
        />
        <ButtonContainer
          className="mt-20"
          buttons={[
            {
              text: "Word-Datei herunterladen",
              href: ROUTE_DOCUMENTATION_STATIC_WORD.url,
              look: "tertiary",
            },
          ]}
        />
      </Hero>

      <Container>
        <InlineNotice
          look="warning"
          title={intro.multipleNotice.headline}
          tagName="h2"
          content={intro.multipleNotice.content}
          className="mb-40"
        />
        <InfoBoxList
          heading={{ text: intro.summary.title }}
          items={intro.summary.items}
        />
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
