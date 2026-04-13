import type { Config } from "@react-router/dev/config";

const isPreview = process.env.PREVIEW_BUILD === "true";

const previewPaths = [
  "/",
  "/impressum",
  "/datenschutz",
  "/barrierefreiheit",
  "/sitemap",
  "/das-ist-neu",
  "/unterstuetzung",
  "/gesetzgebungsprozess",
  // Precheck
  "/vorpruefung",
  "/vorpruefung/hinweise",
  "/vorpruefung/ergebnis",
  "/vorpruefung/it-system",
  "/vorpruefung/verpflichtungen-fuer-beteiligte",
  "/vorpruefung/datenaustausch",
  "/vorpruefung/kommunikation",
  "/vorpruefung/automatisierung",
  "/vorpruefung/eu-bezug",
  // Methods
  "/methoden",
  "/methoden/fuenf-prinzipien",
  "/methoden/visualisieren",
  "/methoden/visualisieren/flussdiagramm",
  "/methoden/zustaendige-akteurinnen-auflisten",
  "/methoden/it-systeme-erfassen",
  "/methoden/technische-umsetzbarkeit",
  "/methoden/interview-leitfaden",
  "/methoden/interview-leitfaden-schritte",
  // Documentation
  "/dokumentation",
  "/dokumentation/hinweise",
  "/dokumentation/regelungsvorhaben-titel",
  "/dokumentation/beteiligungsformate",
  "/dokumentation/zusammenfassung",
  "/dokumentation/absenden",
  // Fundamentals (skip /grundlagen — redirects to /methoden/fuenf-prinzipien)
  "/grundlagen/digitaltauglichkeit",
  "/grundlagen/normenkontrollrat",
  // Interoperability (skip /interoperabel/loesungen — redirects)
  "/interoperabel",
  "/interoperabel/nationale-kontaktstelle",
  "/interoperabel/faq",
  // Examples (skip /beispiele/prinzipien — redirects to first principle)
  "/beispiele",
  "/beispiele/visualisierungen",
];

export default {
  ssr: true,
  ...(isPreview && { prerender: previewPaths }),
} satisfies Config;
