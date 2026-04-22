import type { Config } from "@react-router/dev/config";

import { ROUTES } from "./app/resources/staticRoutes";
import {
  fetchStrapiData,
  GET_PRINZIPS_QUERY,
} from "./app/utils/strapiData.server";

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

  const staticPaths = ROUTES.map((r) => r.url);

  return [...staticPaths, ...dynamicPaths];
}

export const previewConfig = {
  ssr: true,
  basename: process.env.PREVIEW_BASE_PATH?.replace(/\/?$/, "/"),
  prerender: getPreviewPrerenderPaths,
  routeDiscovery: { mode: "initial" },
} satisfies Config;
