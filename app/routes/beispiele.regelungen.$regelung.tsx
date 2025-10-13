import { useLoaderData, useOutletContext } from "react-router";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import CustomLink from "~/components/CustomLink";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import ParagraphList from "~/components/ParagraphList";
import RegulationMetadata from "~/components/RegulationMetadata";
import RichText from "~/components/RichText.tsx";
import Tabs, { TabItem } from "~/components/Tabs";
import VisualisationItem from "~/components/VisualisationItem";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";
import {
  Beispielvorhaben,
  fetchStrapiData,
  paragraphFields,
  prinzipCoreFields,
  PrinzipWithBeispielvorhaben,
  visualisationFields,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/beispiele.regelungen.$regelung";

// prinzipCoreFields are being used in paragraphFields and so need to be included
const GET_REGELUNGSVORHABENS_BY_SLUG_QUERY = `
${prinzipCoreFields}
${paragraphFields}
${visualisationFields}
query GetBeispielvorhabens($slug: String!) {
  beispielvorhabens(filters: { URLBezeichnung: { eq: $slug } }) {
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
    Paragraphen {
      ...ParagraphFields
    }
    Visualisierungen {
      ...VisualisationFields
    }
    Digitalchecks {
      documentId
      Titel
      EinschaetzungAutomatisierung
      EinschaetzungDatenschutz
      EinschaetzungKlareRegelungen
      EinschaetzungKommunikation
      EinschaetzungWiederverwendung
      NKRStellungnahmeDCText
    }
  }
}`;

export const loader = async ({ params }: Route.LoaderArgs) => {
  const regelungData = await fetchStrapiData<{
    beispielvorhabens: Beispielvorhaben[];
  }>(GET_REGELUNGSVORHABENS_BY_SLUG_QUERY, { slug: params.regelung });

  if ("error" in regelungData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(regelungData.error, { status: 400 });
  }

  if (regelungData.beispielvorhabens.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Regelung for slug found", { status: 404 });
  }

  return regelungData.beispielvorhabens[0];
};

export default function Gesetz() {
  const regelung = useLoaderData<typeof loader>();
  const principles = useOutletContext<PrinzipWithBeispielvorhaben[]>();

  const tabsData: TabItem[] = [];

  // ----- Formulierungen / Prinziperfüllungen -----
  if (regelung.Paragraphen.length > 0) {
    tabsData.push({
      title: examplesRegelungen.principles.tabName,
      content: (
        <>
          {regelung.GesetzStatus !== "Verkuendetes_Gesetz_aktuelle_Fassung" && (
            <InlineNotice
              className="mb-40"
              look="tips"
              heading={
                <Heading tagName="h2">{examplesRegelungen.infoTitle}</Heading>
              }
            >
              <RichText markdown={examplesRegelungen.infoText} />
            </InlineNotice>
          )}
          <Heading
            id={slugify(examplesRegelungen.principles.title)}
            tagName="h2"
            look="ds-heading-02-bold"
            className="pb-40"
          >
            {examplesRegelungen.principles.title}
          </Heading>
          <ParagraphList
            paragraphs={regelung.Paragraphen}
            principlesToShow={principles}
          />
        </>
      ),
    });
  }

  // ----- Visualisierungen -----
  if (regelung.Visualisierungen.length > 0) {
    tabsData.push({
      title: examplesRegelungen.visualisations.tabName,
      content: (
        <div className="ds-stack ds-stack-32">
          <Header
            heading={{
              id: slugify(examplesRegelungen.visualisations.title),
              text: examplesRegelungen.visualisations.title,
              tagName: "h2",
              look: "ds-heading-02-bold",
              className: "pb-40",
            }}
            content={{
              markdown: examplesRegelungen.visualisations.subtitle,
            }}
          />
          {regelung.Visualisierungen.map((visualisierung) => (
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
  if (
    regelung.Digitalchecks.some(
      ({ NKRStellungnahmeDCText }) => !!NKRStellungnahmeDCText,
    )
  ) {
    tabsData.push({
      title: examplesRegelungen.nkr.tabName,
      content: (
        <>
          <Header
            heading={{
              id: slugify(examplesRegelungen.nkr.title),
              text: examplesRegelungen.nkr.title,
              tagName: "h2",
              look: "ds-heading-02-bold",
              className: "pb-40",
            }}
            content={{
              markdown: examplesRegelungen.nkr.subtitle,
            }}
          />
          {regelung.Digitalchecks.filter(
            ({ NKRStellungnahmeDCText }) => !!NKRStellungnahmeDCText,
          ).map((digitalcheck) => (
            <div
              className="my-32 border-l-4 border-gray-400 pl-8 italic"
              key={digitalcheck.documentId}
            >
              <BlocksRenderer content={digitalcheck.NKRStellungnahmeDCText!} />
            </div>
          ))}
          {regelung.NKRStellungnahmeLink && (
            <div>
              {examplesRegelungen.nkr.linkText}
              <CustomLink
                target="_blank"
                to={regelung.NKRStellungnahmeLink}
                rel="noreferrer"
              >
                NKR-Stellungnahme
              </CustomLink>
            </div>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <MetaTitle prefix={ROUTE_REGELUNGEN.title} />
      <Hero
        className="bg-gray-100"
        title={regelung.Titel}
        subtitle={examplesRegelungen.subtitle[0]}
      />

      <div className="bg-gray-100">
        <div className="container">
          <RegulationMetadata exampleProject={regelung} />
        </div>
      </div>

      <ContentWrapper>
        {/* TODO: how to handle multiple digitalchecks? */}
        {/* <Heading tagName="h2" look="ds-heading-03-bold" className="mb-24">
          {regelung.Titel}
        </Heading> */}

        {tabsData.length > 0 && <Tabs tabs={tabsData} />}
      </ContentWrapper>
    </>
  );
}
