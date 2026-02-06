import {
  ROUTE_REGELUNGEN,
  ROUTES as staticRoutes,
} from "~/resources/staticRoutes";
import { fetchStrapiData } from "~/utils/strapiData.server";
import type { Route } from "./+types/sitemap[.xml]";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const protocol = process.env.NODE_ENV === "production" ? "https:" : "http:";
  const host = new URL(request.url).host;
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  const allUrls = allRoutes.map((r) => `${protocol}//${host}${r.url}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${allUrls.map((url) => `<url><loc>${url}</loc></url>`).join("\n")}
  </urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

// TODO: Maybe there are more dynamic routes to include in the sitemap?
const GET_ALL_REGELUNGEN_SLUGS = `
query GetAllBeispielvorhabens {
  beispielvorhabens {
    URLBezeichnung
  }
}`;

async function getDynamicRoutes(): Promise<{ url: string }[]> {
  const regelungenData = await fetchStrapiData<{
    beispielvorhabens: Array<{ URLBezeichnung: string }>;
  }>(GET_ALL_REGELUNGEN_SLUGS, {});

  if ("error" in regelungenData) return [];

  return regelungenData.beispielvorhabens.map((regelung) => ({
    url: `${ROUTE_REGELUNGEN.url}/${regelung.URLBezeichnung}`,
  }));
}
