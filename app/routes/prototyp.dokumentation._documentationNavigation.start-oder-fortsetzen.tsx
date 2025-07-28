import { FileUploadOutlined } from "@digitalservicebund/icons";
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
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { features } from "~/resources/features";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

const { title, subtitle, startNewButtonText } =
  prototypeDocumentation.startOrResume;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME.title);
}

export default function PrototypeDocumentationMeta() {
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

  return (
    <Container className="pt-0">
      <Heading
        text={title}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={subtitle} className="mb-40" />
      <DetailsSummary
        className="mb-40"
        title="Welche Datei kann ich hochladen?"
        content={
          prototypeAlternativeEnabled
            ? "Wenn Sie bereits zu einem früheren Zeitpunkt angefangen haben die Dokumentation auszufüllen, hatten Sie die Möglichkeit einen Zwischenstand als **PDF-Datei** herunterzuladen. Diese Datei können Sie hier wieder hochladen, um daran weiter zu arbeiten."
            : "Wenn Sie bereits zu einem früheren Zeitpunkt angefangen haben die Dokumentation auszufüllen, hatten Sie die Möglichkeit einen Zwischenstand als JSON-Datei herunterzuladen. Diese Datei können Sie hier wieder hochladen, um daran weiter zu arbeiten."
        }
      />

      <label className="ds-label-01-reg border-ds-dark-blue text-ds-dark-blue focus-within:outline-ds-dark-blue mb-40 flex w-full cursor-pointer justify-center border-2 border-dashed bg-white p-40 text-center align-middle focus-within:border-solid focus-within:outline-3">
        <input
          type="file"
          accept={
            prototypeAlternativeEnabled ? "application/pdf" : "application/json"
          }
          className="w-0 opacity-0"
          onChange={onFileChange}
        />
        <FileUploadOutlined
          fill={"currentColor"}
          height={20}
          className="mr-6 inline"
        />
        Klicken Sie oder ziehen Sie eine Datei hierhin, um fortzufahren.
      </label>

      <ButtonContainer
        buttons={[
          {
            text: startNewButtonText,
            href: ROUTE_PROTOTYPE_DOCUMENTATION_META.url,
          },
          {
            text: general.buttonBack.text,
            href: ROUTE_PROTOTYPE_DOCUMENTATION.url,
            look: "tertiary",
          },
        ]}
      />
    </Container>
  );
}
