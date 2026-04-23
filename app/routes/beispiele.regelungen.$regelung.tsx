import React from "react";
// removed react-router imports
import { BlocksRenderer } from "~/components/BlocksRenderer";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import NewTabLink from "~/components/NewTabLink.tsx";
import ParagraphList from "~/components/ParagraphList";
import RegulationMetadata from "~/components/RegulationMetadata";
import RichText from "~/components/RichText.tsx";
import TabGroup from "~/components/Tabs/Tabs";
import VisualisationItem from "~/components/VisualisationItem";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";
import getFeatureFlag from "~/utils/featureFlags.server.ts";
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
query GetBeispielvorhabens($slug: String!, $status: PublicationStatus!) {
  beispielvorhabens(filters: { URLBezeichnung: { eq: $slug } }, status: $status) {
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
  const status = getFeatureFlag("showStrapiDrafts") ? "DRAFT" : "PUBLISHED";

  const regelungData = await fetchStrapiData<{
    beispielvorhabens: Beispielvorhaben[];
  }>(GET_REGELUNGSVORHABENS_BY_SLUG_QUERY, { slug: params.regelung, status });

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

export default function Gesetz({
  regelung,
  principles = [],
}: {
  regelung?: Beispielvorhaben;
  principles?: PrinzipWithBeispielvorhaben[];
} = {}) {
  if (!regelung) return null;

  const tabsData: {
    label: string;
    content: React.ReactNode;
  }[] = [];

  // ----- Formulierungen / Prinziperfüllungen -----
  if (regelung.Paragraphen.length > 0) {
    tabsData.push({
      label: examplesRegelungen.principles.tabName,
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
      label: "Visualisierung",
      content: (
        <div className="ds-stack ds-stack-32">
          <div className="mb-40 space-y-16">
            <Heading
              id={slugify("Visualisierungen")}
              tagName="h2"
              look="ds-heading-02-bold"
            >
              Visualisierungen
            </Heading>
            <RichText
              markdown="Diese Visualisierungen haben dem Referat geholfen, Digitaltauglichkeit zu prüfen und den Sachverhalt zu kommunizieren."
              className="ds-subhead"
            />
          </div>

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
      label: examplesRegelungen.nkr.tabName,
      content: (
        <>
          <div className="mb-16 space-y-16">
            <Heading
              id={slugify(examplesRegelungen.nkr.title)}
              tagName="h2"
              look="ds-heading-02-bold"
            >
              {examplesRegelungen.nkr.title}
            </Heading>
            <RichText
              markdown={examplesRegelungen.nkr.subtitle}
              className="ds-subhead"
            />
          </div>
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
              <NewTabLink to={regelung.NKRStellungnahmeLink}>
                NKR-Stellungnahme
              </NewTabLink>
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

      <ContentWrapper compactTopSpacing>
        <TabGroup>
          {tabsData.map(({ content, label }) => (
            <TabGroup.Tab key={slugify(label)} label={label}>
              {content}
            </TabGroup.Tab>
          ))}
        </TabGroup>
      </ContentWrapper>
    </>
  );
}
