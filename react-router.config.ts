import type { Config } from "@react-router/dev/config";

import {
  fetchStrapiData,
  GET_PRINZIPS_QUERY,
} from "./app/utils/strapiData.server";

const isPreview = process.env.PREVIEW_BUILD === "true";

const GET_ALL_REGELUNGEN_SLUGS = `
query GetAllBeispielvorhabens {
  beispielvorhabens {
    URLBezeichnung
  }
}`;

async function getPreviewPrerenderPaths(): Promise<string[]> {
  const [prinzipsResult, regelungenResult] = await Promise.all([
    fetchStrapiData<{ prinzips: { URLBezeichnung: string }[] }>(
      GET_PRINZIPS_QUERY,
    ),
    fetchStrapiData<{ beispielvorhabens: { URLBezeichnung: string }[] }>(
      GET_ALL_REGELUNGEN_SLUGS,
    ),
  ]);

  const prinzipSlugs =
    "error" in prinzipsResult
      ? []
      : prinzipsResult.prinzips.map((p) => p.URLBezeichnung).filter(Boolean);
  const regelungSlugs =
    "error" in regelungenResult
      ? []
      : regelungenResult.beispielvorhabens
          .map((r) => r.URLBezeichnung)
          .filter(Boolean);

  const dynamicPaths = [
    ...prinzipSlugs.flatMap((slug) => [
      `/beispiele/prinzipien/${slug}`,
      `/methoden/fuenf-prinzipien/${slug}`,
      `/dokumentation/${slug}`,
      `/dokumentation/${slug}/erlaeuterung`,
    ]),
    ...regelungSlugs.map((slug) => `/beispiele/regelungen/${slug}`),
  ];

  return [...previewPaths, ...dynamicPaths];
}

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
  // Interoperability (skip /interoperabel/loesungen — redirects to /interoperabel)
  "/interoperabel",
  "/interoperabel/loesungen/dcat-ap",
  "/interoperabel/nationale-kontaktstelle",
  "/interoperabel/faq",
  // Examples (skip /beispiele/prinzipien — redirects to first principle)
  "/beispiele",
  "/beispiele/visualisierungen",
];

export default {
  ssr: true,
  ...(isPreview && {
    basename: process.env.PREVIEW_BASE_PATH?.replace(/\/?$/, "/"),
    prerender: getPreviewPrerenderPaths,
    routeDiscovery: { mode: "initial" },
  }),
} satisfies Config;
