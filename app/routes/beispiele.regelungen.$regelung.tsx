import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";
import {
  Link,
  useLoaderData,
  useOutletContext,
  type MetaArgs,
} from "react-router";

import Background from "~/components/Background";
import Container from "~/components/Container";
import CustomLink from "~/components/CustomLink";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import InlineInfoList from "~/components/InlineInfoList";
import InlineNotice from "~/components/InlineNotice";
import ParagraphList from "~/components/ParagraphList";
import VisualisationItem from "~/components/VisualisationItem";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";
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

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_REGELUNGEN.title, matches);
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
          <p className="ds-subhead mt-24 font-bold">
            <b>{examplesRegelungen.subtitle[1]}</b>
          </p>
          <ol className="list-unstyled mt-16">
            {regelung.Digitalchecks.map((digitalcheck, index) => (
              <React.Fragment key={digitalcheck.documentId}>
                {digitalcheck.Paragraphen.length > 0 && (
                  <li>
                    ↓
                    <Link
                      to={`#${slugify(examplesRegelungen.principles.title)}-${index}`}
                      className="ml-4 underline decoration-1 underline-offset-4"
                    >
                      {examplesRegelungen.principles.title}
                    </Link>
                  </li>
                )}
                {digitalcheck.Visualisierungen.length > 0 && (
                  <li>
                    ↓
                    <Link
                      to={`#${slugify(examplesRegelungen.visualisations.title)}-${index}`}
                      className="ml-4 underline decoration-1 underline-offset-4"
                    >
                      {examplesRegelungen.visualisations.title}
                    </Link>
                  </li>
                )}
                {digitalcheck.NKRStellungnahmeDCText && (
                  <li>
                    ↓
                    <Link
                      to={`#${slugify(examplesRegelungen.nkr.title)}-${index}`}
                      className="ml-4 underline decoration-1 underline-offset-4"
                    >
                      {examplesRegelungen.nkr.title}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
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
      {regelung.Digitalchecks.some(
        (digitalcheck) => digitalcheck.Paragraphen.length > 0,
      ) &&
        regelung.GesetzStatus !== "Verkuendetes_Gesetz_aktuelle_Fassung" && (
          <Container className="pb-0">
            <InlineNotice
              title={examplesRegelungen.infoTitle}
              look="tips"
              tagName="h2"
              content={examplesRegelungen.infoText}
            />
          </Container>
        )}
      {regelung.Digitalchecks.map((digitalcheck, index) => (
        <Container
          key={digitalcheck.documentId}
          className="ds-stack ds-stack-64 pb-80"
        >
          {/* ----- Formulierungen / Prinziperfüllungen ----- */}
          {digitalcheck.Paragraphen.length > 0 && (
            <>
              <Heading
                id={`${slugify(examplesRegelungen.principles.title)}-${index}`}
                tagName="h2"
                look="ds-heading-02-bold"
              >
                {examplesRegelungen.principles.title}
              </Heading>

              <ParagraphList
                paragraphs={digitalcheck.Paragraphen}
                principlesToShow={principles}
              />
            </>
          )}

          {/* ----- Visualisierungen ----- */}
          {digitalcheck.Visualisierungen.length > 0 && (
            <div className="ds-stack ds-stack-32">
              <Header
                heading={{
                  id: `${slugify(examplesRegelungen.visualisations.title)}-${index}`,
                  text: examplesRegelungen.visualisations.title,
                  tagName: "h2",
                  look: "ds-heading-02-bold",
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
          )}

          {/* ----- NKR Stellungnahme ----- */}
          {digitalcheck.NKRStellungnahmeDCText && (
            <div>
              <Header
                heading={{
                  id: `${slugify(examplesRegelungen.nkr.title)}-${index}`,
                  text: examplesRegelungen.nkr.title,
                  tagName: "h2",
                  look: "ds-heading-02-bold",
                }}
                content={{
                  markdown: examplesRegelungen.nkr.subtitle,
                }}
              />
              <div className="my-32 border-l-4 border-gray-400 pl-8">
                <BlocksRenderer content={digitalcheck.NKRStellungnahmeDCText} />
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
            </div>
          )}
        </Container>
      ))}
    </>
  );
}
