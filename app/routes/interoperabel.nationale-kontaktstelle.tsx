import { ReactNode } from "react";
import Badge from "~/components/Badge.tsx";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBox from "~/components/InfoBox";
import RichText from "~/components/RichText";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import Timeline from "~/components/Timeline";
import { spoc } from "~/resources/content/interoperabel-nationale-kontaktstelle";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_INTEROPERABILITY_SPOC,
  ROUTE_METHODS_PRINCIPLES,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_INTEROPERABILITY_SPOC.title);
}

function SPoCTimelineItem({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <Timeline.Item bullet className="mt-4 flex flex-col gap-16">
      {children}
    </Timeline.Item>
  );
}

export default function SinglePointOfContact() {
  const tabsData: TabItem[] = [
    {
      title: spoc.landscape.tabName,
      content: (
        <>
          <Heading
            tagName="h2"
            text={spoc.landscape.headline}
            className="mb-8"
          />
          <RichText
            markdown={spoc.landscape.content}
            className="ds-stack-24 mb-40"
          />
          <ImageZoomable image={spoc.landscape.image} />
          <RichText
            className="mt-16 mb-32"
            markdown={spoc.landscape.contentAfter.content}
          />
          <InfoBox
            detailsSummary={spoc.landscape.contentAfter.infobox.detailsSummary}
          />
          <RichText
            className="mb-48"
            markdown={spoc.landscape.contentAfter.outro}
          />
          <div className="relative left-1/2 w-screen -translate-x-1/2 bg-blue-100">
            <Container>
              <Heading
                tagName="h2"
                text={spoc.responsibilities.headline}
                className="mb-8"
              />
              <RichText
                markdown={spoc.responsibilities.content}
                className="mb-48"
              />
            </Container>
          </div>
          <Container className="px-0">
            <Heading
              tagName="h2"
              text="Aktueller Stand der Integration in den Digitalcheck"
              className="mb-8"
            />
            <Timeline>
              <SPoCTimelineItem>
                <Badge look="gray">Aktuell</Badge>
                <h3 className="ds-subhead hyphens-none">
                  Methoden für Digitaltauglichkeit und Interoperabilität
                </h3>
                <p>
                  Die inhaltlichen Schnittmengen zwischen dem
                  Erarbeitungsprozess für digitaltaugliche Regelungen und dem
                  Interoperabilitäts-Assessment sind identifiziert und
                  analysiert. Der daraus entstandene Prozess wird in den
                  Digitalcheck-Kontaktpunkten umgesetzt. Darauf aufbauend passen
                  wir die Erarbeitungsmethoden an. Ziel ist es, den gesamten
                  Entwicklungsprozess effizienter und zielgerichteter zu
                  gestalten.
                </p>
                <ImageZoomable
                  image={{
                    url: "/images/synthese-prozess-digitalcheck-und-interoperabilitaet.png",
                    alternativeText:
                      "Die Abbildung zeigt ein strukturiertes Vorgehensmodell für den Digitalcheck und die Interoperabilitätsbewertung. Das Vorgehen des Digitalchecks und der Interoperabilitätsbewertung wird in einem neuen Prozess zusammengefasst. Er umfasst drei Hauptbereiche: Zunächst werden Akteure identifiziert, bestehende Prozesse visualisiert und neue Prozesse entwickelt. Danach werden rechtliche Rahmenbedingungen untersucht, digitale Chancen analysiert und Anforderungen definiert. Schließlich erfolgt die Umsetzung, die Nutzung bestehender oder die Entwicklung neuer Lösungen, bevor alles dokumentiert wird. Durch die visuelle Darstellung wird der neue, gebündelte Ansatz im Prozess verdeutlicht.",
                    className: "max-w-a11y",
                  }}
                />
              </SPoCTimelineItem>
              <SPoCTimelineItem>
                <Badge look="gray">03.07.2025</Badge>
                <Heading tagName="h3" look="hyphens-none ds-subhead">
                  Über 100 Teilnehmende in acht Online-Workshops
                </Heading>
                <p>
                  In den Schulungen „Visualisieren – komplexes einfach
                  darstellen“ und “Regelungen digitaltauglich und interoperabel
                  gestalten“ haben die Teilnehmenden erfahren, wie sie den
                  Digitalcheck als frühzeitig Denkwerkzeug nutzen können, um
                  Gesetze besser und umsetzbarer zu gestalten.
                </p>
              </SPoCTimelineItem>
              <SPoCTimelineItem>
                <Badge look="gray">25.06.2025</Badge>
                <div className="mt-4 flex flex-col gap-16">
                  <h3 className="ds-subhead hyphens-none">
                    Integration in die Abläufe des IT-Planungsrats
                  </h3>
                  <p>
                    Die Bedeutung des IEA für das föderale IT-Architekturboard
                    sowie Unterstützungsmöglichkeiten durch die Nationale
                    Kontaktstelle wurden vorgestellt.
                  </p>
                  <ImageZoomable
                    image={{
                      alternativeText:
                        "Die Abbildung zeigt ein strukturiertes Vorgehensmodell für die Interoperabilitätsbewertung. Alle Steckbriefe werden von der FITKO überprüft, die letztendliche Entscheidung trifft der IT-Planungsrat. Die Dokumentation bei Interoperabilitätsbezug muss bei der EU-Kommission eingereicht werden. Die Nationale Kontaktstelle steht während des gesamten Prozesses unterstützend zur Verfügung.",
                      url: "/images/interoperabilitaet-it-planungsrat.png",
                    }}
                    className="max-w-a11y"
                  />
                </div>
              </SPoCTimelineItem>
              <SPoCTimelineItem>
                <Badge look="gray">15.05.2025</Badge>

                <h3 className="ds-subhead hyphens-none">
                  Die 5 Prinzipien für digitaltaugliche Regelungen sind
                  überarbeitet
                </h3>
                <RichText
                  markdown={dedent`
                      Die [5 Prinzipien für digitaltaugliche Gesetzgebung](${ROUTE_METHODS_PRINCIPLES.url}) sind überarbeitet und entsprechen sowohl den Anforderungen der Digitaltauglichkeit als auch der Interoperabilität. 
                      `}
                />
              </SPoCTimelineItem>
              <SPoCTimelineItem>
                <Badge look="gray">10.01.2025</Badge>
                <h3 className="ds-subhead hyphens-none">
                  Verordnung tritt in Kraft und erste Änderungen sind im
                  Digitalcheck umgesetzt:
                </h3>
                <RichText
                  markdown={dedent`
                      - **Vorprüfung:** Berücksichtigt nun neben dem Digitalbezug auch die europäische Interoperabilität.
                      - Das Ergebnis der Vorprüfung wird automatisch per E-Mail versendet:
                        - Bei Digitalbezug an den NKR.
                        - Bei zusätzlichem Interoperabilitäts-Bezug auch an die nationale Kontaktstelle beim Digitalcheck-Team.
                      - Bereitstellung einer [Informationsseite](${ROUTE_INTEROPERABILITY.url}) zum Thema Interoperabilität für Legistinnen und Legisten.
        `}
                />
              </SPoCTimelineItem>
              <SPoCTimelineItem>
                <Badge look="gray">13.03.2024</Badge>
                <h3 className="ds-subhead">
                  Verordnung für ein interoperables Europa wird vom europäischen
                  Parlament verabschiedet
                </h3>
              </SPoCTimelineItem>
            </Timeline>
          </Container>
        </>
      ),
    },
    {
      title: spoc.states.tabName,
      content: (
        <>
          <Heading tagName="h2" text={spoc.states.headline} />
          {spoc.states.sections.map((section) => (
            <div key={section.headline} className="last:mb-48">
              <Heading
                tagName="h3"
                text={section.headline}
                className="mt-32 mb-8"
              />
              <RichText markdown={section.content} />
            </div>
          ))}
        </>
      ),
    },
    {
      title: spoc.contact.tabName,
      content: (
        <>
          <Heading tagName="h2" text={spoc.contact.headline} />
          {spoc.contact.sections.map((section) => (
            <div key={section.headline} className="last:mb-48">
              <Heading
                tagName="h3"
                text={section.headline}
                className="mt-32 mb-8"
              />
              <RichText markdown={section.content} className="ds-stack-24" />
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      <Hero title={spoc.headline}>
        <RichText markdown={spoc.content} className="ds-subhead ds-stack-24" />
      </Hero>
      <Container>
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
