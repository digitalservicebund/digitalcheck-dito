import {
  beispiele_prinzipien,
  beispiele_visualisierungen,
  methoden_fuenfPrinzipien,
  methoden_visualisieren,
} from "@/config/routes";
import ContentWrapper from "~/components/ContentWrapper";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import RichText from "~/components/RichText.tsx";
import TabGroup from "~/components/Tabs/Tabs";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

export default function Digitaltauglichkeit_index() {
  return (
    <>
      <Hero
        title="Beispiele für Digitaltauglichkeit"
        subtitle="Hier finden Sie Beispiele für digitaltaugliche Regelungen, sowie aus deren Erarbeitungsprozess. Lassen Sie sich inspirieren, wie in Regelungsvorhaben Digitaltauglichkeit beachtet wurde."
      />

      <ContentWrapper compactTopSpacing>
        <TabGroup>
          <TabGroup.Tab label="5 Prinzipien">
            <InfoBox
              heading={{
                tagName: "h2",
                text: "Die 5 Prinzipien im Regelungstext",
              }}
            >
              <RichText
                markdown={dedent`
                Die 5 Prinzipien für Digitaltaugliche Gesetzgebung dienen Ihnen als Inspiration und gemeinsame Sprache für die Erarbeitung und Begleitung der Regelungsarbeit. Sie geben Anhaltspunkte wie Ihnen Digitalisierung beim Design der Wirklogik Ihrer Regelung helfen kann.

                Hier finden Sie Formulierungen, wie Ihre Kolleginnen und Kollegen die Prinzipien für Digitaltaugliche Gesetzgebung genutzt haben um den Regelungstext digitaltauglich zu formulieren.
                `}
              />
              <InfoBox.LinkList
                links={[
                  {
                    text: "Zu den Beispielen",
                    to: beispiele_prinzipien.path,
                  },
                  {
                    text: "Prinzipien nutzen",
                    to: methoden_fuenfPrinzipien.path,
                    look: "tertiary",
                  },
                ]}
              />
            </InfoBox>
          </TabGroup.Tab>
          <TabGroup.Tab label="Visualisierungen">
            <InfoBox
              heading={{
                tagName: "h2",
                text: "Visualisierungen",
              }}
            >
              <RichText
                markdown={dedent`
                  Visualisierungen helfen, komplexe Sachverhalte zu strukturieren und dadurch schneller und intuitiver erfassbar zu machen – Zusammenhänge werden sichtbar und Möglichkeiten der Digitalisierung können einfach identifiziert werden.
                  
                  Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.`}
              />
              <InfoBox.LinkList
                links={[
                  {
                    text: "Zu den Beispielen",
                    to: beispiele_visualisierungen.path,
                  },
                  {
                    text: "Anleitung zur Visualisierung",
                    to: methoden_visualisieren.path,
                    look: "tertiary",
                  },
                ]}
              />
            </InfoBox>
          </TabGroup.Tab>
        </TabGroup>
      </ContentWrapper>
    </>
  );
}
