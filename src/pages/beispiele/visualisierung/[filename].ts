import type { APIRoute, GetStaticPaths } from "astro";
import {
  fetchStrapiData,
  visualisationFields,
} from "~/utils/strapiData.server";
import type { Visualisierung } from "~/utils/strapiData.types";

const GET_VISUALISATIONS_QUERY = `
${visualisationFields}
query GetVisualisierungen($status: PublicationStatus!) {
  visualisierungen(status: $status, sort: "createdAt:desc") {
    ...VisualisationFields
  }
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetchStrapiData<{
    visualisierungen: Visualisierung[];
  }>(GET_VISUALISATIONS_QUERY, { status: "PUBLISHED" });

  if ("error" in result) return [];

  return result.visualisierungen.map((v) => ({
    params: { filename: new URL(v.Bild.url).pathname.split("/").pop() },
    props: { url: v.Bild.url },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const response = await fetch(props.url as string);
  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";
  return new Response(await response.arrayBuffer(), {
    headers: { "Content-Type": contentType },
  });
};
