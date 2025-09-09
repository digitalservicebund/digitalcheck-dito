import { Link, useLoaderData } from "react-router";

import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import VisualisationItem from "~/components/VisualisationItem";
import { examplesVisualisations } from "~/resources/content/beispiele-visualisierungen";
import {
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  visualisationFields,
  Visualisierung,
} from "~/utils/strapiData.server";

export function meta() {
  return constructMetaTitle(ROUTE_EXAMPLES_VISUALISATIONS.title);
}

const GET_VISUALISATIONS_QUERY = `
${visualisationFields}
query GetVisualisierungen {
  visualisierungen {
    ...VisualisationFields
  }
}`;

export const loader = async () => {
  const visualisationsData = await fetchStrapiData<{
    visualisierungen: Visualisierung[];
  }>(GET_VISUALISATIONS_QUERY);

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

  // Group visualisations by Regelung
  const groupedVisualisations = visualisationsData.reduce(
    (acc, item) => {
      const title = item.Beispielvorhaben?.Titel;
      if (!title) return acc;
      acc[title] = acc[title] ?? [];
      acc[title].push(item);
      return acc;
    },
    {} as Record<string, Visualisierung[]>,
  );
  return (
    <>
      <Hero
        title={examplesVisualisations.title}
        subtitle={examplesVisualisations.subtitle}
      />

      <Container className="ds-stack ds-stack-48">
        {Object.entries(groupedVisualisations).map(
          ([regelungTitle, visualisations]) => (
            <div key={regelungTitle}>
              <div className="ds-stack ds-stack-32">
                <Link
                  to={`${ROUTE_REGELUNGEN.url}/${visualisations[0].Beispielvorhaben?.URLBezeichnung}`}
                  prefetch="viewport"
                >
                  <Heading
                    tagName="h2"
                    text={regelungTitle}
                    look="ds-heading-02-bold text-link break-words"
                  />
                </Link>

                {visualisations.map((visualisation) => (
                  <VisualisationItem
                    key={visualisation.Bild.documentId}
                    visualisierung={visualisation}
                  />
                ))}
              </div>
            </div>
          ),
        )}
      </Container>
    </>
  );
}
