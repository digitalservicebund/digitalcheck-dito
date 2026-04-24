import { methoden_fuenfPrinzipien, methoden_visualisieren } from "@/config/routes";
import {
  EmojiObjectsOutlined,
  ShareOutlined,
  VisibilityTwoTone,
} from "@digitalservicebund/icons";
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
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { Link } from "~/utils/routerCompat";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
} from "~/utils/strapiData.server";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekteAndExample[];
  }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  return { prinzips: prinzipData.prinzips };
};

export default function FivePrinciples({
  prinzips = [],
}: {
  prinzips?: PrinzipWithAspekteAndExample[];
} = {}) {
  return (
    <>
      <MetaTitle prefix={methoden_fuenfPrinzipien.title} />
      <main>
        <Hero
          title={methodsFivePrinciples.title}
          subtitle={methodsFivePrinciples.subtitle}
        />

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
                <Link to={methoden_visualisieren.path} className="text-link">
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
                      content={prinzip.Kurzbeschreibung ?? prinzip.Beschreibung}
                    />
                  </div>
                  <LinkButton
                    to={
                      methoden_fuenfPrinzipien.path +
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
