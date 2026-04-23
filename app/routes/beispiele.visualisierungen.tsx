import { useLoaderData } from "react-router";

import Container from "~/components/Container";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import VisualisationItem from "~/components/VisualisationItem";
import { examplesVisualisations } from "~/resources/content/beispiele-visualisierungen";
import { ROUTE_EXAMPLES_VISUALISATIONS } from "~/resources/staticRoutes";
import getFeatureFlag from "~/utils/featureFlags.server.ts";
import {
  fetchStrapiData,
  visualisationFields,
  type Visualisierung,
} from "~/utils/strapiData.server";

const GET_VISUALISATIONS_QUERY = `
${visualisationFields}
query GetVisualisierungen($status: PublicationStatus!) {
  visualisierungen(status: $status, sort: "createdAt:desc") {
    ...VisualisationFields
  }
}`;

export const loader = async () => {
  const status = getFeatureFlag("showStrapiDrafts") ? "DRAFT" : "PUBLISHED";
  const visualisationsData = await fetchStrapiData<{
    visualisierungen: Visualisierung[];
  }>(GET_VISUALISATIONS_QUERY, { status });

  if ("error" in visualisationsData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(visualisationsData.error, { status: 400 });
  }

  if (visualisationsData.visualisierungen.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Visualisation found", { status: 404 });
  }

  return visualisationsData.visualisierungen;
};

export default function BeispieleVisualisierungen() {
  const visualisationsData = useLoaderData<typeof loader>();

  return (
    <>
      <MetaTitle prefix={ROUTE_EXAMPLES_VISUALISATIONS.title} />
      <Hero
        title={examplesVisualisations.title}
        subtitle={examplesVisualisations.subtitle}
      />

      <Container className="space-y-64">
        {visualisationsData.map((visualisation) => (
          <VisualisationItem
            key={visualisation.documentId}
            visualisierung={visualisation}
            showContext
          />
        ))}
      </Container>
    </>
  );
}
