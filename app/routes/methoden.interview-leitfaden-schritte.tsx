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
import NewTabLink from "~/components/NewTabLink";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import SidebarContainer from "~/layout/SidebarContainer";
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
  const infoBoxClass = "px-16 sm:px-56";

  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS_INTERVIEW_METHODS_STEPS.title} />
      <main className="space-y-80">
        <Hero
          className="mb-0 lg:mb-80"
          title="Akteurinnen und Akteure identifizieren und Interviews vorbereiten"
        >
          <p>
            Im folgenden Abschnitt finden Sie eine praxisnahe Anleitung zur
            strukturierten Vorbereitung und Durchführung von Interviews.
          </p>
          <p>
            Das Angebot wird derzeit weiterentwickelt, einschließlich der
            barrierefreien Optimierung der Vorlagen.
          </p>
          <p>
            Die Inhalte sind auf Basis von den unten aufgeführten Quellen
            entstanden.
          </p>
        </Hero>

        <SidebarContainer
          className="space-y-80"
          sidebar={
            <ToC title={"Inhalt"} selector="section[id], li[id]">
              <ToC.List className="list-unstyled list-none">
                <ToC.Item
                  href="#anleitung"
                  title="Anleitung"
                  after={
                    <ToC.List className="mt-0 list-none">
                      <ToC.Item
                        href="#step-1"
                        title="Relevante Akteurinnen und Akteure identifizieren"
                        numbered
                      ></ToC.Item>
                      <ToC.Item
                        href="#step-2"
                        title="Halten Sie die Akteurinnen und Akteure in einer Übersicht fest"
                        numbered
                      ></ToC.Item>
                      <ToC.Item
                        numbered
                        href="#step-3"
                        title="Gespräche durchführen"
                      ></ToC.Item>
                      <ToC.Item
                        numbered
                        href="#step-4"
                        title="Auswerten"
                      ></ToC.Item>
                    </ToC.List>
                  }
                ></ToC.Item>
                <ToC.Item href="#checklist" title="Checkliste" />
                <ToC.Item href="#references" title="Relevante Quellen" />
              </ToC.List>
            </ToC>
          }
        >
          <section
            className="container mt-80 space-y-40 lg:mt-0"
            id="anleitung"
          >
            <div>
              <Heading tagName="h2" className="flex gap-32">
                <DriveFileRenameOutline className="size-40" />
                Anleitung
              </Heading>
            </div>

            <NumberedList className="space-y-80">
              <NumberedList.Item
                id="step-1"
                after={
                  <InfoBox
                    className={infoBoxClass}
                    look="highlight"
                    badge={{
                      Icon: FeedOutlined,
                      text: "Vorlage",
                      look: "hint",
                    }}
                    visual={{
                      type: "component",
                      Component: (
                        <ImageBox
                          image={{
                            className: "min-w-208",
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
                      to="/documents/interview-leitfaden/Akteurlandschaft_Analyse.pptx"
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
                    Zu Beginn wird ein Überblick über alle relevanten Akteurinnen und Akteure geschaffen. Ziel ist es, Personen oder Gruppen zu identifizieren, die von der Regelung betroffen sind oder an ihrer Umsetzung beteiligt sind. Dazu gehören sowohl direkt betroffene Akteure als auch solche, die vorbereitende, unterstützende oder steuernde Aufgaben übernehmen.
                    
                    Eine Einteilung nach Rollen hilft Ihnen dabei, die Akteur:innen systematisch zu ordnen:
                    - **Wer setzt den Rechtsrahmen?**

                      Akteurinnen und Akteure, die Gesetze oder Regelungen gestalten oder beeinflussen (z.B. Gerichte, EU-Institutionen).
                    - **Wer setzt das Gesetz um?**
                    
                      Akteurinnen und Akteure, die die praktische Umsetzung übernehmen (z.B. Behörden, Vollzugsstellen, private Träger).
                    - **Wen betrifft das Gesetz?**
                    
                      Akteurinnen und Akteure, die direkt betroffen sind (z.B. Bürgerinnen und Bürger, Unternehmen).
                `}
                />
              </NumberedList.Item>
              <NumberedList.Item
                id="step-2"
                after={
                  <div className="space-y-40">
                    <InfoBox
                      className={infoBoxClass}
                      look="highlight"
                      badge={{
                        Icon: FeedOutlined,
                        text: "Vorlage",
                        look: "hint",
                      }}
                      visual={{
                        type: "component",
                        Component: (
                          <ImageBox
                            image={{
                              className: "min-w-208",
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
                        to="/documents/interview-leitfaden/Umsetzung_verstehen.docx"
                      >
                        Word-Vorlage
                      </DownloadLinkButton>
                    </InfoBox>

                    <InfoBox
                      className={infoBoxClass}
                      look="highlight"
                      badge={{
                        Icon: FeedOutlined,
                        text: "Vorlage",
                        look: "hint",
                      }}
                      visual={{
                        type: "component",
                        Component: (
                          <ImageBox
                            image={{
                              className: "min-w-208",
                              url: "/images/interview-leitfaden-vorlage-buergercheck.png",
                              alternativeText:
                                "Eine Grafik, die eine beispielhafte Tabelle darstellt.",
                            }}
                          />
                        ),
                      }}
                    >
                      <RichText
                        markdown={dedent`
                          Nutzen Sie die Vorlage zur Zielgruppen-Profil aus dem Bürgercheck, um die Bedürfnisse der betroffenen Akteurinnen und Akteure (Normadressaten) tiefgreifend zu verstehen und diese gezielt zu priorisieren.
                    `}
                      />
                      <DownloadLinkButton
                        look="link"
                        to="/documents/interview-leitfaden/Zielgruppenanaylse-Buergercheck.pptx"
                      >
                        Powerpoint-Vorlage
                      </DownloadLinkButton>
                    </InfoBox>
                  </div>
                }
              >
                <Badge>Schritt 2</Badge>
                <Heading tagName="h3" className="mb-8">
                  Halten Sie die Akteurinnen und Akteure in einer Übersicht fest
                </Heading>
                <RichText
                  markdown={dedent`
                    Im nächsten Schritt werden die identifizierten Akteurinnen und Akteure in einer Übersicht festgehalten. Diese dient als Arbeitsgrundlage für die weitere Interviewplanung und hilft, unterschiedliche Perspektiven gezielt abzudecken.

                    Nutzen Sie die folgende Tabelle, um die Ebenen von Betroffenheit und Vollzug präzise abzubilden und relevante Interview-Partnerinnen und Partner zu identifizieren.

                    Leitfragen zur Auswahl:
                    - **Betroffenheit:** Wer ist unmittelbar oder mittelbar von der Regelung betroffen? Und wer ist wie stark betroffen?
                    - **Entscheidungskompetenz:** Wer entscheidet oder beeinflusst Entscheidungen im Vollzug?
                    - **Relevanz:** Welche Akteure verfügen über besonderes Fachwissen oder praktische Erfahrung?
                    - **Zielsetzung:** Welches Wissen soll konkret erschlossen werden?
                    - **Praxisnähe** Wer kann konkrete Auswirkungen und Herausforderungen beschreiben?

                    **Tipp:** Kooperationen mit Verbänden oder Gewerkschaften erleichtern den Zugang zu spezifischen Zielgruppen - insbesondere bei schwer erreichbaren Akteurinnen und Akteuren wie Leistungsempfängern.
              `}
                />
              </NumberedList.Item>
              <NumberedList.Item className="*:max-w-a11y" id="step-3">
                <Badge>Schritt 3</Badge>
                <Heading tagName="h3" className="mb-8">
                  Gespräche durchführen
                </Heading>
                <RichText
                  markdown={dedent`
                    Nach der Vorbereitung laden Sie Ihre Gesprächspartnerinnen und Gesprächspartner zum Interview ein und treten in den direkten Dialog. Ziel ist es, durch gezieltes Nachfragen die tatsächliche Umsetzungspraxis zu verstehen und blinde Flecken im Vollzug aufzudecken. Das Interview gliedert sich in drei Phasen:

                    **Kontaktphase:** Schaffen Sie eine vertrauensvolle Gesprächsatmosphäre. Erläutern Sie nach der Begrüßung kurz Zweck, Ziele und Ablauf des Interviews. 

                    **Erhebungsphase:** Beginnen Sie mit offenen Fragen und vertiefen Sie diese gezielt entlang Ihres Leitfadens. Achten Sie auf eine ausgewogene Kombination aus offenen und geschlossenen Fragen.
                    Behandelt werden:
                    - **Kontext:** Aufgaben und Abläufe klären
                    - **Erfahrungen:** Probleme und Stärken identifizieren
                    - **Analyse:** Ursachen herausarbeiten
                    - **Lösungen:** Ansätze und Potenziale bewerten
                    
                    **Ausklang & Dokumentation**: Fassen Sie nach jedem Themenblock die zentralen Inhalte zusammen und dokumentieren Sie diese parallel zum Gespräch. Zum Abschluss danken Sie Ihrem Gegenüber und informieren über das weitere Vorgehen, um eine positive Grundlage für zukünftige Gespräche zu schaffen.
              `}
                />
                <br></br>
                <p>
                  Weiterführende Quelle:{" "}
                  <NewTabLink to="https://www.orghandbuch.de/SharedDocs/faqs/Webs/OHB/DE/Methoden_Befragung/13_Durchfuehrung_muendliches_Interview.html">
                    Orghandbuch des BMI 2026
                  </NewTabLink>
                </p>

                <Heading tagName="h4" className="ds-body-01-bold my-40">
                  Für die parallele Dokumentation bieten sich folgende Formen
                  an:
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
                      - Transkription und spätere Auswertung bedeuten einen großen zeitlichen Invest
                `}
                  />
                </AccordionItem>

                <AccordionItem headline="Videoaufzeichnung">
                  <RichText
                    markdown={dedent`
                      Videoaufzeichnungen in der Praxis Videoformate sind aufgrund des hohen Datenschutz-Aufwands selten. Prüfen Sie vorab, ob die Relevanz für die Regelungserarbeitung den Aufwand rechtfertigt.
                      
                      Voraussetzungen dafür sind, dass:
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

              <NumberedList.Item id="step-4">
                <Badge>Schritt 4</Badge>
                <Heading tagName="h3" className="mb-8">
                  Auswerten
                </Heading>
                <RichText
                  markdown={dedent`
                  In mehreren Gesprächen mit einer Dauer von 45 - 60 Minuten kommen eine Menge Informationen zusammen. Im Anschluss werden die gesammelten Informationen ausgewertet. In der Regel lassen sich aus mehreren Gesprächen zentrale Muster, Herausforderungen und Erfolgsfaktoren ableiten. Nutzen Sie ggf. die [Methode Individuelle Gesprächsauswertung](https://www.oeffentliches-gestalten.de/buch/erkennen/erkenntnisse-formulieren#individuelle-gespr%C3%A4chsauswertung), um Schlüsselaspekte herauszuarbeiten.
              `}
                />
              </NumberedList.Item>
            </NumberedList>
          </section>

          <hr className="container" />

          <section className="container space-y-40" id="checklist">
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
              className={infoBoxClass}
              look="highlight"
              badge={{ Icon: FeedOutlined, text: "Vorlage", look: "hint" }}
              visual={{
                type: "component",
                Component: (
                  <ImageBox
                    image={{
                      className: "min-w-208",
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
                to="/documents/interview-leitfaden/Ablaufplan_Interviewführung.docx"
              >
                Word-Vorlage
              </DownloadLinkButton>
            </InfoBox>
          </section>

          <hr className="container" />

          <section className="container space-y-8" id="references">
            <Heading tagName="h2">Relevante Quellen</Heading>
            <ul>
              <li>
                <NewTabLink to="https://www.oeffentliches-gestalten.de">
                  Öffentliches Gestalten
                </NewTabLink>
              </li>
              <li>
                <NewTabLink to="https://www.digitale-verwaltung.de/SharedDocs/downloads/Webs/DV/DE/servicehandbuch.pdf?__blob=publicationFile&v=5#page=18">
                  Servicehandbuch
                </NewTabLink>
              </li>
              <li>
                <NewTabLink to="https://servicestandard.gov.de/handbuch/#aus-der-praxis">
                  Servicestandard - Handbuch
                </NewTabLink>
              </li>
              <li>
                <DownloadLinkButton
                  look="link"
                  to="/documents/interview-leitfaden/Buergercheck.pdf"
                >
                  Bürgercheck
                </DownloadLinkButton>
              </li>
            </ul>
          </section>
        </SidebarContainer>
      </main>
    </>
  );
}
