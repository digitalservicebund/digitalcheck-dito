import {
  EmojiObjectsOutlined,
  ShareOutlined,
  VisibilityTwoTone,
} from "@digitalservicebund/icons";
import { Link, useLoaderData } from "react-router";
import Badge from "~/components/Badge.tsx";
import { BlocksRenderer } from "~/components/BlocksRenderer.tsx";
import { LinkButton } from "~/components/Button.tsx";
import Container from "~/components/Container";
import { Feature, FeatureList } from "~/components/FeatureList.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
import { PrinciplePosterBox } from "~/components/PrinciplePosterBox";
import RichText from "~/components/RichText.tsx";
import Separator from "~/components/Separator.tsx";
import TableOfContents from "~/components/TableOfContents";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import {
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_VISUALIZE,
} from "~/resources/staticRoutes";
import getFeatureFlag from "~/utils/featureFlags.server.ts";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import Principle from "./Principle";

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekteAndExample[];
  }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  const useNewPrinciples = getFeatureFlag("principles26");

  return { prinzips: prinzipData.prinzips, useNewPrinciples };
};

export default function FivePrinciples() {
  const { prinzips, useNewPrinciples } = useLoaderData<typeof loader>();

  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS_PRINCIPLES.title} />
      <main>
        <Hero
          title={methodsFivePrinciples.title}
          subtitle={methodsFivePrinciples.subtitle}
        >
          {!useNewPrinciples && (
            <TableOfContents
              heading={methodsFivePrinciples.contentOverviewTitle}
              links={[
                {
                  id: "instruction",
                  title: methodsFivePrinciples.anchor.instruction,
                },
                ...prinzips.map((prinzip) => {
                  return {
                    id: slugify(prinzip.Name),
                    title: `${methodsFivePrinciples.anchor.principle} ${prinzip.Name}`,
                  };
                }),
              ]}
            />
          )}
        </Hero>

        <Container className="space-y-40 pb-0">
          <div id="instruction">
            <Heading tagName="h2">
              {methodsFivePrinciples.instruction.title}
            </Heading>
          </div>

          <FeatureList>
            <Feature>
              <ShareOutlined className="fill-ds-feature size-80" />
              <div>
                <p className="ds-body-01-bold">Den Gesamtprozess überprüfen</p>
                <p>
                  Wenden Sie die fünf Prinzipien direkt auf eine Skizze Ihres
                  Umsetzungsprozesses an. So lokalisieren Sie relevante
                  Schnittstellen Schritt für Schritt.
                </p>
                <Link to={ROUTE_METHODS_VISUALIZE.url} className="text-link">
                  Zur Methode Visualisieren
                </Link>
              </div>
            </Feature>
            <Feature>
              <EmojiObjectsOutlined className="fill-ds-feature size-80" />
              <div>
                <p className="ds-body-01-bold">
                  Starthilfe für den Regelungstext
                </p>
                <p>
                  Verwenden Sie erprobte Praxisbeispiele als Fundament für Ihre
                  eigenen Formulierungen und profitieren Sie von der Wirklogik
                  bereits bestehender Lösungen.
                </p>
              </div>
            </Feature>
            <Feature>
              <VisibilityTwoTone className="fill-ds-feature size-80" />
              <div>
                <p className="ds-body-01-bold">Impulse für die Umsetzung</p>
                <p>
                  Nutzen Sie konkrete Tipps, um die digitalen Potenziale Ihres
                  Regelungsvorhabens voll auszuschöpfen und Hürden frühzeitig zu
                  identifizieren.
                </p>
              </div>
            </Feature>
          </FeatureList>
        </Container>

        {!useNewPrinciples && (
          <div className="container my-40 space-y-96 lg:mt-80">
            <Separator />
            {prinzips.map((prinzip) => (
              <Principle prinzip={prinzip} key={prinzip.Name} />
            ))}
          </div>
        )}

        {useNewPrinciples && (
          <div className="my-40 bg-blue-100 lg:mt-80">
            <div className="container space-y-96 py-80 lg:mt-80">
              <div
                className="grid grid-cols-1 gap-40 md:grid-cols-2"
                data-testid="prinzipien"
              >
                {prinzips.map((prinzip) => (
                  <div
                    key={prinzip.order}
                    className="flex flex-col justify-between gap-16 bg-white px-32 pt-40 pb-48"
                  >
                    <div className="space-y-16">
                      <Badge className={`bg-principle-${prinzip.Nummer}`}>
                        Prinzip {prinzip.order}
                      </Badge>
                      <h2 className={"ds-heading-03-reg"}>{prinzip.Name}</h2>
                      <BlocksRenderer
                        content={
                          prinzip.Kurzbeschreibung ?? prinzip.Beschreibung
                        }
                      />
                    </div>
                    <LinkButton
                      to={
                        ROUTE_METHODS_PRINCIPLES.url +
                        "/" +
                        prinzip.URLBezeichnung
                      }
                      look={"tertiary"}
                      className={"self-start"}
                    >
                      Mehr zum Prinzip
                    </LinkButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <PrinciplePosterBox />
      </main>

      <section aria-labelledby="nextStepHeading">
        <Container>
          <InfoBox
            heading={{
              text: methodsFivePrinciples.nextStep.title,
              look: "ds-heading-03-reg",
              tagName: "h2",
              id: "nextStepHeading",
            }}
            badge={{
              children: methodsFivePrinciples.nextStep.label,
              Icon: methodsFivePrinciples.nextStep.icon,
            }}
          >
            <RichText markdown={methodsFivePrinciples.nextStep.text} />
            <InfoBox.LinkList links={methodsFivePrinciples.nextStep.links} />
          </InfoBox>
        </Container>
      </section>
    </>
  );
}
