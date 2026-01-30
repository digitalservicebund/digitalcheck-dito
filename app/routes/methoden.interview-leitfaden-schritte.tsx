import {
  DriveFileRenameOutline,
  FeedOutlined,
} from "@digitalservicebund/icons";
import { data } from "react-router";
import AccordionItem from "~/components/AccordionItem";
import Badge from "~/components/Badge";
import { DownloadLinkButton } from "~/components/Button";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import { ROUTE_METHODS_INTERVIEW_METHODS_STEPS } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";
import getFeatureFlag from "~/utils/featureFlags.server";

export function loader() {
  if (!getFeatureFlag("showInterviewLeitfaden")) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }
}

export default function InterviewMethods() {
  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS_INTERVIEW_METHODS_STEPS.title} />
      <main className="mb-80 space-y-80">
        <Hero title="Schritte">
          <p>TBA</p>
        </Hero>

        <section className="container space-y-40">
          <div>
            <Heading tagName="h2" className="flex gap-32">
              <DriveFileRenameOutline className="size-40" />
              Anleitung
            </Heading>
          </div>

          <NumberedList className="space-y-80">
            <NumberedList.Item
              after={
                <InfoBox
                  look="highlight"
                  badge={{ Icon: FeedOutlined, text: "Vorlage", look: "hint" }}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageBox
                        image={{
                          url: "/images/interview-leitfaden-vorlage.png",
                          alternativeText:
                            "Eine Grafik, die eine beispielhafte Stakeholder-Map darstellt. Bestehend aus drei Kreisen die ineinander liegen. Im innersten Kreis: Normadressaten, im mittleren Kreis: Vollzugsebene und im äußersten Kreis: Rechts-Akterinnen und Akteure",
                        }}
                      />
                    ),
                  }}
                >
                  <RichText
                    markdown={dedent`
                      **Stakeholder-Map:**
                      
                      Mit diesem Template ordnen Sie Akteurinnen und Akteure präzise nach ihrer Betroffenheit zu. So schaffen Sie ein  Fundament für die Interviewplanung.
                    `}
                  />
                  <DownloadLinkButton
                    look="link"
                    to="/documents/Anleitung_Flussdiagramm_erstellen.pptx"
                  >
                    Powerpoint-Vorlage
                  </DownloadLinkButton>
                </InfoBox>
              }
            >
              <Badge>Schritt 1</Badge>
              <Heading tagName="h3" className="mb-8">
                Relevante Akteurinnen und Akteure identifizieren
              </Heading>
              <RichText
                markdown={dedent`
                  Skizzieren Sie die Akteurslandschaft Ihres Vorhabens. Ziel ist es, die verschiedenen Ebenen der Betroffenheit – von den Normadressaten bis zu den Rechtsakteuren – vollständig zu erfassen.
                  
                  Ein Kreisdiagramm hilft Ihnen dabei, die Akteure systematisch nach ihrer Nähe zum Regelungskern zu ordnen:
                  - Zentrum (Normadressaten): Wer ist direkt von der Regelung betroffen? (z. B. Bürgerinnen, Bürger und Unternehmen)
                  - Mittlerer Kreis (Vollzugsebene): Wer ist für die praktische Umsetzung verantwortlich? (z. B. föderaler, kommunaler oder privatwirtschaftlicher Vollzug)
                  - Äußerer Kreis (Rechtsrahmen): Welche Akteure setzen den rechtlichen Rahmen oder beeinflussen ihn? (z. B. Rechtsakteure, ggf. EU-Ebene)
                `}
              />
            </NumberedList.Item>
            <NumberedList.Item
              after={
                <InfoBox
                  look="highlight"
                  badge={{ Icon: FeedOutlined, text: "Vorlage", look: "hint" }}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageBox
                        image={{
                          url: "/images/interview-leitfaden-vorlage-schritt-2.png",
                          alternativeText:
                            "Eine Grafik, die eine beispielhafte Tabelle darstellt.",
                        }}
                      />
                    ),
                  }}
                >
                  <RichText
                    markdown={dedent`
                      Nutzen Sie diese Tabelle zur systematischen Erfassung und Gewichtung Ihrer Gesprächs-partnerinnen und -partner. Dokumentieren Sie hier die Relevanz und den angestrebten Erkenntnisgewinn auf Basis der Leitfragen
                    `}
                  />
                  <DownloadLinkButton
                    look="link"
                    to="/documents/Anleitung_Flussdiagramm_erstellen.pptx"
                  >
                    Word-Vorlage
                  </DownloadLinkButton>
                </InfoBox>
              }
            >
              <Badge>Schritt 2</Badge>
              <Heading tagName="h3" className="mb-8">
                Halten Sie die Akteurinnen und Akteure in einer Übersicht fest
              </Heading>
              <RichText
                markdown={dedent`
                Nutzen Sie die folgende Tabelle, um die Ebenen von Betroffenheit und Vollzug präzise abzubilden und relevante Interview-Partnerinnen und Partner zu identifizieren.

                Leitfragen zur Auswahl:
                - **Betroffenheit:** Wer ist unmittelbar oder mittelbar von der Regelung betroffen?
                - **Entscheidungskraft:** Wer entscheidet im operativen Vollzug?
                - **Relevanz:** Welcher fachliche Mehrwert wird vom Akteur erwartet?
                - **Zielsetzung:** Welches Wissen soll konkret erschlossen werden?
                - **Praxisbezug:** Welche realen Auswirkungen sind beobachtbar?

                **Tipp:** Kooperationen mit Verbänden oder Gewerkschaften erleichtern den Zugang zu spezifischen Zielgruppen – insbesondere bei schwer erreichbaren Akteuren wie Leistungsempfängern.
              `}
              />
            </NumberedList.Item>
            <NumberedList.Item className="*:max-w-a11y">
              <Badge>Schritt 3</Badge>
              <Heading tagName="h3" className="mb-8">
                Gespräche durchführen
              </Heading>
              <RichText
                markdown={dedent`
                In der Erhebungsphase werden die Leitfragen des Interviews gestellt und auf die Antworten eingegangen sowie Rückfragen gestellt. Diese Phase bildet das “Herzstück” des Interviews und sollte den Großteil der Gesprächszeit einnehmen.

                Die Vertiefungsphase bietet Raum, um auf ein bis zwei Schwerpunktthemen (je nach Dauer des Gesprächs) tiefer einzugehen. Schauen Sie, wo die Interessen oder Expertisen Ihres Gegenübers liegen und haken Sie dort weiter nach.

                In der Abschlussphase wird das Interview abgerundet und ein Ausblick über das weitere Vorgehen gegeben (z.B. Auswertung und ggf. Rückmeldung).
              `}
              />

              <Heading tagName="h4" className="ds-body-01-bold my-40">
                Arten der Aufzeichnung
              </Heading>

              <AccordionItem headline="Wortgetreues Transkript">
                <RichText
                  markdown={dedent`
                  Beim Transkript wird das Interview vollständig und möglichst wortgetreu verschriftlicht.
                  
                  **Vorteile:**
                  - hohe Genauigkeit und Nachvollziehbarkeit
                  - detaillierte Auswertung auch zu einem späteren Zeitpunkt möglich
                  - besonders geeignet bei komplexen oder sensiblen Themen

                  **Nachteile:**
                  - sehr zeit- und ressourcenintensiv
                  - hoher Aufwand bei Datenschutz und Anonymisierung
                `}
                />
              </AccordionItem>

              <AccordionItem headline="Inhaltsnahe Mitschrift / Ergebnisprotokoll">
                <RichText
                  markdown={dedent`
                  Hierbei werden die zentralen Aussagen, Argumente und Beispiele während oder unmittelbar nach dem Interview schriftlich festgehalten.

                  **Vorteile:**
                  - deutlich geringerer Aufwand
                  - schnelle Weiterverarbeitung der Ergebnisse
                  - gut geeignet bei klarer Fragestellung und begrenzter Interviewanzahl
                  
                  **Nachteile:**
                  - geringere Detailtiefe
                  - stärkere Abhängigkeit von der Interpretation der interviewführenden Person
                `}
                />
              </AccordionItem>

              <AccordionItem headline="Audioaufzeichnung">
                <RichText
                  markdown={dedent`
                  Das Interview wird aufgezeichnet und bei Bedarf später ausgewertet oder teilweise transkribiert.
                  
                  Voraussetzungen dafür sind:
                  - vorherige ausdrückliche Einwilligung der befragten Person
                  - klare Regelung zur Speicherung, Nutzung und Löschung

                  **Vorteile:**
                  - Entlastung während des Gesprächs

                  **Nachteile:**
                  - Möglichkeit, Aussagen später zu überprüfen
                `}
                />
              </AccordionItem>

              <AccordionItem headline="Videoaufzeichnung">
                <RichText
                  markdown={dedent`
                  Videoaufzeichnungen in der Praxis Videoformate sind aufgrund des hohen Datenschutz-Aufwands selten. Prüfen Sie vorab, ob die Relevanz für die Regelungserarbeitung den Aufwand rechtfertigt.
                  
                  Voraussetzungen dafür sind:
                  - Vertraulichkeit zugesichert und eingehalten wird,
                  - personenbezogene Daten anonymisiert werden,
                  - die Befragten über Art und Zweck der Dokumentation informiert sind.

                  **Vorteile:**
                  - zusätzliche Informationen durch Mimik und Gestik

                  **Nachteile:**
                  - hohe Hemmschwelle für Befragte
                  - erhöhter Datenschutz- und Organisationsaufwand
                  - meist nicht erforderlich für die Regelungserarbeitung
                `}
                />
              </AccordionItem>
            </NumberedList.Item>

            <NumberedList.Item>
              <Badge>Schritt 4</Badge>
              <Heading tagName="h3" className="mb-8">
                Auswerten
              </Heading>
              <RichText
                markdown={dedent`
                In mehreren Gesprächen mit einer Dauer von 45 – 60 Minuten kommen eine Menge Informationen zusammen. Nutzen Sie ggf. die Methode Individuelle Gesprächsauswertung, um Schlüsselaspekte herauszuarbeiten.
              `}
              />
            </NumberedList.Item>
          </NumberedList>
        </section>

        <hr className="container" />

        <section className="container space-y-40">
          <div className="space-y-8">
            <Heading tagName="h2">
              Alles auf einem Blick: Kompakte Checkliste zur Interviewführung
            </Heading>
            <p>
              Nutzen Sie diese Zusammenfassung, um die methodische Qualität
              Ihrer Interviews abzusichern und eine lückenlose Vorbereitung
              sowie Nachbereitung sicherzustellen.
            </p>
          </div>

          <InfoBox
            look="highlight"
            badge={{ Icon: FeedOutlined, text: "Vorlage", look: "hint" }}
            visual={{
              type: "component",
              Component: (
                <ImageBox
                  image={{
                    url: "/images/interview-leitfaden-checkliste.png",
                    alternativeText:
                      "Eine Grafik, die einen Screenshot der Word-Checkliste darstellt.",
                  }}
                />
              ),
            }}
          >
            <RichText
              markdown={dedent`
                Die Checkliste bündelt die wichtigsten Handlungsempfehlungen für Vorbereitung, Durchführung und Nachbereitung.
              `}
            />
            <DownloadLinkButton
              look="link"
              to="/documents/Anleitung_Flussdiagramm_erstellen.pptx"
            >
              Word-Vorlage
            </DownloadLinkButton>
          </InfoBox>
        </section>

        <hr className="container" />

        <section className="container space-y-8">
          <Heading tagName="h2">Relevante Quellen</Heading>
          <RichText
            markdown={dedent`
            - Öffentliches Gestalten
            - Servicehandbuch
            - ....
          `}
          />
        </section>
      </main>
    </>
  );
}
