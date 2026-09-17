// TODO: this could be auto-generated (similar to routes.ts)

export type DownloadRoute = {
  readonly path: string;
};

const rawBase = (import.meta.env?.BASE_URL as string | undefined) ?? "/";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

export const prinzipienPoster: DownloadRoute = {
  path: `${basePath}/documents/Prinzipien-Poster.pdf`,
};

export const anleitungFlussdiagramm: DownloadRoute = {
  path: `${basePath}/documents/Anleitung_Flussdiagramm_erstellen.pptx`,
};

export const itSystemeErfassenXlsx: DownloadRoute = {
  path: `${basePath}/documents/Vorlage - IT-Systeme erfassen.xlsx`,
};

export const zustaendigeAkteureXlsx: DownloadRoute = {
  path: `${basePath}/documents/Vorlage - Zuständige Akteurinnen und Akteure.xlsx`,
};

export const dokumentationTemplateWordInterops: DownloadRoute = {
  path: `${basePath}/documents/TEMPLATE_Dokumentation_der_Digitaltauglichkeit_Interoperabilitaet.docx`,
};

export const interoperabilityTemplateWord: DownloadRoute = {
  path: `${basePath}/documents/TEMPLATE_Interoperabilitaetsbewertung.docx`,
};

export const bundeslaenderLeitfadenPdf: DownloadRoute = {
  path: `${basePath}/documents/Leitfaden_DigitalcheckAlsBundeslandEinfuehren_Aug2026.pdf`,
};
