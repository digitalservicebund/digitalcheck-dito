import ContentWrapper from "~/components/ContentWrapper";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import TabGroup from "~/components/Tabs/Tabs";
import {
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_VISUALIZE,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

export default function Digitaltauglichkeit_index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_EXAMPLES.title} />
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
                    to: ROUTE_EXAMPLES_PRINCIPLES.url,
                  },
                  {
                    text: "Prinzipien nutzen",
                    to: ROUTE_METHODS_PRINCIPLES.url,
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
                    to: ROUTE_EXAMPLES_VISUALISATIONS.url,
                  },
                  {
                    text: "Anleitung zur Visualisierung",
                    to: ROUTE_METHODS_VISUALIZE.url,
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
