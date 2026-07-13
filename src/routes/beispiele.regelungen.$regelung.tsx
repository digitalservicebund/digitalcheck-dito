import { BlocksRenderer } from "@/components/BlocksRenderer";
import ContentWrapper from "@/components/ContentWrapper.tsx";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import InlineNotice from "@/components/InlineNotice";
import ParagraphList from "@/components/ParagraphList";
import RegulationMetadata from "@/components/RegulationMetadata";
import RichText from "@/components/RichText.tsx";
import TabGroup from "@/components/tabs/Tabs";
import VisualisationItem from "@/components/VisualisationItem";
import type {
  Beispielvorhaben,
  PrinzipWithBeispielvorhaben,
} from "@/utils/strapiData.types";
import { slugify } from "@/utils/utilFunctions";
import type React from "react";

// data fetching moved to @/src/pages/beispiele/regelungen/[regelung].astro

export function Gesetz({
  regelung,
  principles,
}: Readonly<{
  regelung: Beispielvorhaben;
  principles: PrinzipWithBeispielvorhaben[];
}>) {
  const hasFormulierungen = regelung.Paragraphen.length > 0;
  const hasVisualierungen = regelung.Visualisierungen.length > 0;
  const hasNKRStellungnahme = regelung.Digitalchecks.some(
    (d) => !!d.NKRStellungnahmeDCText,
  );
  const tabsData: {
    label: string;
    content: React.ReactNode;
  }[] = [];

  // ----- Formulierungen / Prinziperfüllungen -----
  if (hasFormulierungen) {
    tabsData.push({
      label: "Formulierungen",
      content: (
        <>
          {regelung.GesetzStatus !== "Verkuendetes_Gesetz_aktuelle_Fassung" && (
            <InlineNotice className="mb-40" look="tips" heading="Hinweis">
              <p>
                Markierte Formulierungen sind gute Beispiele für die
                Ermöglichung digitaler Umsetzung, trotz ausstehender
                Verabschiedung.
              </p>
            </InlineNotice>
          )}
          <Heading
            id={slugify("Formulierungen aus der Regelung")}
            tagName="h2"
            look="ds-heading-02-bold"
            className="pb-40"
          >
            Formulierungen aus der Regelung
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
  if (hasVisualierungen) {
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
  if (hasNKRStellungnahme) {
    tabsData.push({
      label: "NKR-Stellungnahme",
      content: (
        <>
          <div className="mb-16 space-y-16">
            <Heading
              id={slugify("NKR-Stellungnahme")}
              tagName="h2"
              look="ds-heading-02-bold"
            >
              NKR-Stellungnahme
            </Heading>
            <RichText
              markdown="Diese Ausführungen sind der Stellungnahme des NKR entnommen."
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
              Die ganze Stellungnahme können Sie hier finden:{" "}
              <a href={regelung.NKRStellungnahmeLink}>NKR-Stellungnahme</a>
            </div>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <Hero
        className="bg-gray-100"
        title={regelung.Titel}
        subtitle="Hier finden Sie alles zur Digitaltauglichkeit dieser Regelung."
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
