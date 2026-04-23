import { Link } from "~/utils/routerCompat";

import { BlocksRenderer } from "~/components/BlocksRenderer.tsx";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import ParagraphList from "~/components/ParagraphList";
import RegulationMetadata from "~/components/RegulationMetadata";
import Separator from "~/components/Separator";
import RouteTabs from "~/components/Tabs/RouteTabs";
import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";
import { type PrinzipWithBeispielvorhaben } from "~/utils/strapiData.server";

export default function DigitaltauglichkeitPrinzipienDetail({
  prinzip,
  prinzips = [],
}: {
  prinzip?: PrinzipWithBeispielvorhaben;
  prinzips?: PrinzipWithBeispielvorhaben[];
} = {}) {
  if (!prinzip) return null;

  const { Beispielvorhaben } = prinzip;
  const tabs = prinzips.map((principle) => ({
    key: principle.URLBezeichnung,
    label: principle.Kurzbezeichnung,
    to: `${ROUTE_EXAMPLES_PRINCIPLES.url}/${principle.URLBezeichnung}`,
  }));

  return (
    <>
      <MetaTitle prefix={ROUTE_EXAMPLES_PRINCIPLES.title} />
      <Hero
        title={examplesRegelungen.principles.hero.title}
        subtitle={examplesRegelungen.principles.hero.subtitle}
      />

      <ContentWrapper compactTopSpacing className="space-y-80">
        <RouteTabs activeKey={prinzip.URLBezeichnung} tabs={tabs} />

        <InfoBox
          heading={{ text: prinzip.Name, tagName: "h2" }}
          badge={{
            children: examplesRegelungen.principles.prinzipBadge,
            principleNumber: prinzip.Nummer,
          }}
        >
          <div>
            <BlocksRenderer content={prinzip.Beschreibung} />
          </div>
        </InfoBox>

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
                      to={`${ROUTE_REGELUNGEN.url}/${exampleProject.URLBezeichnung}`}
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
