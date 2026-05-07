// TODO: this could be auto-generated (similar to routes.ts)

export type DownloadRoute = {
  readonly path: string;
  readonly filename: string;
};

const rawBase = (import.meta.env?.BASE_URL as string | undefined) ?? "/";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

export const prinzipienPoster: DownloadRoute = {
  path: `${basePath}/documents/Prinzipien-Poster.pdf`,
  filename: "Prinzipien-Poster.pdf",
};

export const anleitungFlussdiagramm: DownloadRoute = {
  path: `${basePath}/documents/Anleitung_Flussdiagramm_erstellen.pptx`,
  filename: "Anleitung_Flussdiagramm_erstellen.pptx",
};

export const dokumentationStaticWordV1: DownloadRoute = {
  path: `${basePath}/documents/Dokumentieren-der-Digitaltauglichkeit_V1-5-1.docx`,
  filename: "Dokumentieren-der-Digitaltauglichkeit.docx",
};

export const dokumentationStaticWordV2: DownloadRoute = {
  path: `${basePath}/documents/Dokumentation_der_Digitaltauglichkeit_V2.docx`, // TODO: use dynamic generation
  filename: "Dokumentation_der_Digitaltauglichkeit.docx",
};

export const dokumentationTemplateWordV1: DownloadRoute = {
  path: `${basePath}/documents/VORLAGE_Dokumentation_der_Digitaltauglichkeit_V1.docx`,
  filename: "Dokumentieren-der-Digitaltauglichkeit.docx",
};

export const dokumentationTemplateWordV2: DownloadRoute = {
  path: `${basePath}/documents/VORLAGE_Dokumentation_der_Digitaltauglichkeit_V2.docx`,
  filename: "Dokumentation_der_Digitaltauglichkeit.docx",
};
