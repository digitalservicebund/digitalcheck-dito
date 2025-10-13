import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router";

import ContentWrapper from "~/components/ContentWrapper.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import ParagraphList from "~/components/ParagraphList";
import RegulationMetadata from "~/components/RegulationMetadata";
import Separator from "~/components/Separator";
import Tabs, { TabItem } from "~/components/Tabs";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";
import {
  fetchStrapiData,
  paragraphFields,
  prinzipCoreFields,
  PrinzipWithBeispielvorhaben,
} from "~/utils/strapiData.server";
import type { Route } from "./+types/beispiele.prinzipien.$prinzip";

const GET_PRINZIPS_QUERY = `
${paragraphFields}
${prinzipCoreFields}
query GetPrinzips($slug: String!) {
  prinzips(filters: { URLBezeichnung: { eq: $slug } }) {
    ...PrinzipCoreFields
    Beispielvorhaben {
      documentId
      Ressort
      Rechtsgebiet
      Titel
      URLBezeichnung
      LinkRegelungstext
      VeroeffentlichungsDatum
      GesetzStatus
      Paragraphen {
        ...ParagraphFields
      }
    }
  }
}`;

export const loader = async ({ params }: Route.LoaderArgs) => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithBeispielvorhaben[];
  }>(GET_PRINZIPS_QUERY, { slug: params.prinzip });

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  if (prinzipData.prinzips.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });
  }

  return { prinzip: prinzipData.prinzips[0] };
};

export default function DigitaltauglichkeitPrinzipienDetail() {
  const { prinzip } = useLoaderData<typeof loader>();
  const prinzips = useOutletContext<PrinzipWithBeispielvorhaben[]>();
  const navigate = useNavigate();

  const { Beispielvorhaben } = prinzip;

  const activeTabIndex = prinzips.findIndex(
    (p) => p.URLBezeichnung === prinzip.URLBezeichnung,
  );

  const initialActiveIndexForTabs = activeTabIndex !== -1 ? activeTabIndex : 0;

  const tabsForNavigation: TabItem[] = prinzips.map((p) => ({
    title: p.Kurzbezeichnung,
    plausibleEventName: `Tab+Bar+${p.Kurzbezeichnung.replaceAll(" ", "+")}`,
    path: `${ROUTE_EXAMPLES_PRINCIPLES.url}/${p.URLBezeichnung}`,
    content: null, // Content is handled by the page reload, not by Tabs component
  }));

  const handleNavigationRequest = async (tab: TabItem) => {
    if (tab.path) {
      await navigate(tab.path);
    }
  };

  return (
    <>
      <MetaTitle prefix={ROUTE_EXAMPLES_PRINCIPLES.title} />
      <Hero
        title={examplesRegelungen.principles.hero.title}
        subtitle={examplesRegelungen.principles.hero.subtitle}
      />

      <ContentWrapper className="space-y-80">
        <Tabs
          className=""
          tabs={tabsForNavigation}
          initialActiveIndex={initialActiveIndexForTabs}
          onNavigateRequest={handleNavigationRequest}
        />

        <InfoBox
          content={prinzip.Beschreibung}
          heading={{ text: prinzip.Name, tagName: "h2" }}
          badge={{
            children: examplesRegelungen.principles.prinzipBadge,
            principleNumber: prinzip.Nummer,
          }}
        />

        {Beispielvorhaben.length > 0 && (
          <>
            <Separator />
            <div className="space-y-80">
              {Beispielvorhaben.map((exampleProject) => (
                <div
                  key={exampleProject.documentId}
                  data-testid="regelung-on-prinzip"
                  className="space-y-80"
                >
                  <div className="space-y-16">
                    <Heading
                      tagName="h3"
                      text={exampleProject.Titel}
                      look="ds-heading-03-bold"
                      className="max-w-full"
                    />

                    <Link
                      target="_blank"
                      to={`${ROUTE_REGELUNGEN.url}/${exampleProject.URLBezeichnung}`}
                      rel="noreferrer"
                      prefetch="viewport"
                      className="text-link"
                    >
                      {examplesRegelungen.exampleLinkText}
                    </Link>
                  </div>

                  <ParagraphList
                    paragraphs={exampleProject.Paragraphen}
                    principlesToShow={[prinzip]}
                  />

                  <RegulationMetadata exampleProject={exampleProject} />
                </div>
              ))}
            </div>
          </>
        )}
      </ContentWrapper>
    </>
  );
}
