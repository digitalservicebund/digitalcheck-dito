import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router";

import { ArrowCircleRightOutlined } from "@digitalservicebund/icons";
import Box from "~/components/Box";
import Container from "~/components/Container";
import CustomLink from "~/components/CustomLink";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InlineInfoList from "~/components/InlineInfoList";
import ParagraphList from "~/components/ParagraphList";
import Separator from "~/components/Separator";
import Tabs, { TabItem } from "~/components/Tabs";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  paragraphFields,
  type Prinzip,
  prinzipCoreFields,
} from "~/utils/strapiData.server";
import { formatDate, gesetzStatusMap } from "~/utils/utilFunctions";
import type { Route } from "./+types/beispiele.prinzipien.$prinzip";

export function meta() {
  return constructMetaTitle(ROUTE_EXAMPLES_PRINCIPLES.title);
}

const GET_PRINZIPS_QUERY = `
${paragraphFields}
${prinzipCoreFields}
query GetPrinzips($slug: String!) {
  prinzips(filters: { URLBezeichnung: { eq: $slug } }) {
    ...PrinzipCoreFields
    GuteUmsetzungen {
      documentId
      Paragraphen {
        ...ParagraphFields
      }
      Regelungsvorhaben {
        documentId
        Ressort
        Rechtsgebiet
        Titel
        URLBezeichnung
        LinkRegelungstext
        VeroeffentlichungsDatum
        GesetzStatus
      }
    }
  }
}`;

export const loader = async ({ params }: Route.LoaderArgs) => {
  const prinzipData = await fetchStrapiData<{ prinzips: Prinzip[] }>(
    GET_PRINZIPS_QUERY,
    { slug: params.prinzip },
  );

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
  const prinzips = useOutletContext<Prinzip[]>();
  const navigate = useNavigate();

  const { GuteUmsetzungen } = prinzip;

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
      <Hero
        title={examplesRegelungen.principles.hero.title}
        subtitle={examplesRegelungen.principles.hero.subtitle}
      />

      <Container className="ds-stack ds-stack-40">
        <Tabs
          className="mb-0"
          tabs={tabsForNavigation}
          initialActiveIndex={initialActiveIndexForTabs}
          onNavigateRequest={handleNavigationRequest}
        />

        <InfoBox
          Icon={ArrowCircleRightOutlined}
          content={prinzip.Beschreibung}
          heading={{ text: prinzip.Name, tagName: "h2" }}
          badge={{
            children: examplesRegelungen.principles.prinzipBadge,
            principleNumber: prinzip.Nummer,
          }}
        />
        {GuteUmsetzungen.length > 0 && <Separator />}

        {GuteUmsetzungen.length > 0 && (
          <div className="ds-stack ds-stack-64 mt-40">
            {GuteUmsetzungen.map(
              (digitalcheck) =>
                digitalcheck.Regelungsvorhaben && (
                  <div
                    key={digitalcheck.documentId}
                    data-testid="regelung-on-prinzip"
                  >
                    <Link
                      target="_blank"
                      to={`${ROUTE_REGELUNGEN.url}/${digitalcheck.Regelungsvorhaben.URLBezeichnung}`}
                      rel="noreferrer"
                      prefetch="viewport"
                    >
                      <Heading
                        tagName="h3"
                        text={digitalcheck.Regelungsvorhaben.Titel}
                        look="ds-heading-03-bold"
                        className="text-link inline max-w-full"
                      />
                    </Link>
                    <InlineInfoList
                      className="my-32 pl-16"
                      items={[
                        {
                          label: examplesRegelungen.infoLabels[0],
                          value: digitalcheck.Regelungsvorhaben
                            .VeroeffentlichungsDatum
                            ? formatDate(
                                digitalcheck.Regelungsvorhaben
                                  .VeroeffentlichungsDatum,
                              )
                            : "",
                        },
                        {
                          key: examplesRegelungen.infoLabels[1],
                          value: digitalcheck.Regelungsvorhaben
                            .LinkRegelungstext ? (
                            <CustomLink
                              to={
                                digitalcheck.Regelungsvorhaben.LinkRegelungstext
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-800 underline"
                            >
                              {digitalcheck.Regelungsvorhaben?.GesetzStatus
                                ? gesetzStatusMap[
                                    digitalcheck.Regelungsvorhaben.GesetzStatus
                                  ]
                                : examplesRegelungen.infoLabels[1]}
                            </CustomLink>
                          ) : null,
                        },
                        {
                          label: examplesRegelungen.infoLabels[2],
                          value: digitalcheck.Regelungsvorhaben.Ressort,
                        },
                      ]}
                    />
                    <ParagraphList
                      paragraphs={digitalcheck.Paragraphen}
                      principlesToShow={[prinzip]}
                    />
                  </div>
                ),
            )}
          </div>
        )}
      </Container>
      <div className="my-40">
        <Container backgroundColor="blue" overhangingBackground>
          <Box
            heading={{
              text: examplesRegelungen.yourExample.title,
              tagName: "h2",
            }}
            content={{ markdown: examplesRegelungen.yourExample.text }}
          />
        </Container>
      </div>
    </>
  );
}
