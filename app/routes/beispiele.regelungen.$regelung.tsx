import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useLoaderData, useOutletContext, type UIMatch } from "react-router";

import Background from "~/components/Background";
import Container from "~/components/Container";
import CustomLink from "~/components/CustomLink";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import InlineInfoList from "~/components/InlineInfoList";
import InlineNotice from "~/components/InlineNotice";
import ParagraphList from "~/components/ParagraphList";
import Tabs, { TabItem } from "~/components/Tabs";
import VisualisationItem from "~/components/VisualisationItem";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import {
  fetchStrapiData,
  paragraphFields,
  Prinzip,
  prinzipCoreFields,
  Regelungsvorhaben,
  visualisationFields,
} from "~/utils/strapiData.server";
import { formatDate, gesetzStatusMap, slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/beispiele.regelungen.$regelung";

export function meta() {
  return constructMetaTitle(ROUTE_REGELUNGEN.title);
}

export const handle = {
  breadcrumb: (match: UIMatch) => ({
    title: examplesRegelungen.breadcrumb,
    url: match.pathname,
  }),
};

// prinzipCoreFields are being used in paragraphFields and so need to be included
const GET_REGELUNGSVORHABENS_BY_SLUG_QUERY = `
${prinzipCoreFields}
${paragraphFields}
${visualisationFields}
query GetRegelungsvorhabens($slug: String!) {
  regelungsvorhabens(filters: { URLBezeichnung: { eq: $slug } }) {
    documentId
    Titel
    NKRNummer
    Rechtsgebiet
    Ressort
    URLBezeichnung
    VeroeffentlichungsDatum
    LinkRegelungstext
    NKRStellungnahmeLink
    GesetzStatus
    Digitalchecks {
      documentId
      Titel
      EinschaetzungAutomatisierung
      EinschaetzungDatenschutz
      EinschaetzungKlareRegelungen
      EinschaetzungKommunikation
      EinschaetzungWiederverwendung
      NKRStellungnahmeDCText
      Paragraphen {
        ...ParagraphFields
      }
      Visualisierungen {
        ...VisualisationFields
      }
    }
  }
}`;

export const loader = async ({ params }: Route.LoaderArgs) => {
  const regelungData = await fetchStrapiData<{
    regelungsvorhabens: Regelungsvorhaben[];
  }>(GET_REGELUNGSVORHABENS_BY_SLUG_QUERY, { slug: params.regelung });

  if ("error" in regelungData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(regelungData.error, { status: 400 });
  }

  if (regelungData.regelungsvorhabens.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Regelung for slug found", { status: 404 });
  }

  return regelungData.regelungsvorhabens[0];
};

export default function Gesetz() {
  const regelung = useLoaderData<typeof loader>();
  const principles = useOutletContext<Prinzip[]>();
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              text: regelung.Titel,
              tagName: "h1",
              className: "max-w-full",
            }}
            content={{
              markdown: examplesRegelungen.subtitle[0],
            }}
          />
        </Container>
      </Background>
      <Background backgroundColor="midLightBlue">
        <Container className="py-0">
          <InlineInfoList
            items={[
              {
                label: examplesRegelungen.infoLabels[0],
                value: regelung.VeroeffentlichungsDatum
                  ? formatDate(regelung.VeroeffentlichungsDatum)
                  : "",
              },
              {
                key: examplesRegelungen.infoLabels[1],
                value: regelung.LinkRegelungstext ? (
                  <CustomLink
                    to={regelung.LinkRegelungstext}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-800 underline"
                  >
                    {regelung?.GesetzStatus
                      ? gesetzStatusMap[regelung.GesetzStatus]
                      : examplesRegelungen.infoLabels[1]}
                  </CustomLink>
                ) : null,
              },
              {
                label: examplesRegelungen.infoLabels[2],
                value: regelung.Ressort,
              },
            ]}
          />
        </Container>
      </Background>
      {regelung.Digitalchecks.map((digitalcheck, index) => {
        const tabsData: TabItem[] = [];

        // ----- Formulierungen / Prinziperfüllungen -----
        if (digitalcheck.Paragraphen.length > 0) {
          tabsData.push({
            title: examplesRegelungen.principles.tabName,
            content: (
              <>
                {regelung.GesetzStatus !==
                  "Verkuendetes_Gesetz_aktuelle_Fassung" && (
                  <InlineNotice
                    className="mb-40"
                    title={examplesRegelungen.infoTitle}
                    look="tips"
                    tagName="h2"
                    content={examplesRegelungen.infoText}
                  />
                )}
                <Heading
                  id={`${slugify(examplesRegelungen.principles.title)}-${index}`}
                  tagName="h2"
                  look="ds-heading-02-bold"
                  className="pb-40"
                >
                  {examplesRegelungen.principles.title}
                </Heading>
                <ParagraphList
                  paragraphs={digitalcheck.Paragraphen}
                  principlesToShow={principles}
                />
              </>
            ),
          });
        }

        // ----- Visualisierungen -----
        if (digitalcheck.Visualisierungen.length > 0) {
          tabsData.push({
            title: examplesRegelungen.visualisations.tabName,
            content: (
              <div className="ds-stack ds-stack-32">
                <Header
                  heading={{
                    id: `${slugify(examplesRegelungen.visualisations.title)}-${index}`,
                    text: examplesRegelungen.visualisations.title,
                    tagName: "h2",
                    look: "ds-heading-02-bold",
                    className: "pb-40",
                  }}
                  content={{
                    markdown: examplesRegelungen.visualisations.subtitle,
                  }}
                />
                {digitalcheck.Visualisierungen.map((visualisierung) => (
                  <VisualisationItem
                    key={visualisierung.Bild.documentId}
                    visualisierung={visualisierung}
                  />
                ))}
              </div>
            ),
          });
        }

        // ----- NKR Stellungnahme -----
        if (digitalcheck.NKRStellungnahmeDCText) {
          tabsData.push({
            title: examplesRegelungen.nkr.tabName,
            content: (
              <>
                <Header
                  heading={{
                    id: `${slugify(examplesRegelungen.nkr.title)}-${index}`,
                    text: examplesRegelungen.nkr.title,
                    tagName: "h2",
                    look: "ds-heading-02-bold",
                    className: "pb-40",
                  }}
                  content={{
                    markdown: examplesRegelungen.nkr.subtitle,
                  }}
                />
                <div className="my-32 border-l-4 border-gray-400 pl-8">
                  <BlocksRenderer
                    content={digitalcheck.NKRStellungnahmeDCText}
                  />
                </div>
                {regelung.NKRStellungnahmeLink && (
                  <div>
                    {examplesRegelungen.nkr.linkText}
                    <CustomLink
                      target="_blank"
                      to={regelung.NKRStellungnahmeLink}
                      rel="noreferrer"
                    >
                      NKR Stellungnahme
                    </CustomLink>
                  </div>
                )}
              </>
            ),
          });
        }
        return (
          <Container key={digitalcheck.documentId} className="pb-80">
            {regelung.Digitalchecks.length > 1 && digitalcheck.Titel && (
              <Heading tagName="h2" look="ds-heading-03-bold" className="mb-24">
                {digitalcheck.Titel}
              </Heading>
            )}
            <Tabs tabs={tabsData} />
          </Container>
        );
      })}
    </>
  );
}
