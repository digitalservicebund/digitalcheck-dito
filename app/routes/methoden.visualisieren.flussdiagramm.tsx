import {
  ArrowDownwardOutlined,
  DriveFileRenameOutline,
  LayersOutlined,
} from "@digitalservicebund/icons";
import React, { useRef } from "react";
import Badge, { BadgeProps } from "~/components/Badge.tsx";
import Button from "~/components/Button.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";
import InfoBox from "~/components/InfoBox.tsx";
import NumberedList from "~/components/NumberedList.tsx";
import RichText from "~/components/RichText.tsx";

import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import Container from "~/components/Container.tsx";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import SidebarContainer from "~/layout/SidebarContainer.tsx";
import {
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX,
  ROUTE_METHODS_VISUALIZE_FLOWCHARTS,
} from "~/resources/staticRoutes.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import constructMetaTitle from "~/utils/metaTitle.ts";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS_VISUALIZE_FLOWCHARTS.title);
}

const diagramElements = [
  {
    iconUrl: "/icons/DiagramStartNode.svg",
    title: "Start-/Endsymbol",
    description: dedent`
        **Start-/Endsymbol**
        
        Der Kreis stellt den Beginn oder das Ende eines Prozesses dar (z.B. Antrag wird gestellt).`,
  },
  {
    iconUrl: "/icons/DiagramDecision.svg",
    title: "Entscheidungssymbol",
    description: dedent`
        **Entscheidungssymbol**
        
        Eine Raute steht für eine Abfrage mit mindestens zwei möglichen Ausgängen (z.B. Antrag vollständig? – ja/nein).`,
  },
  {
    iconUrl: "/icons/DiagramActor.svg",
    title: "Akteurin/Akteur",
    description: dedent`
      **Akteurin/Akteur**
      
      Ein Rechteck mit Symbol steht für eine beteiligte Person oder Institution im Prozess (z.B. Meldebehörde oder Fahrschülerin).`,
  },
  {
    iconUrl: "/icons/DiagramData.svg",
    title: "Datensymbol (Eingabe/Ausgabe)",
    description: dedent`
    **Datensymbol (Eingabe/Ausgabe)**
    
    Dieses Symbol zeigt genutzte oder erzeugte Daten oder Ressourcen (z.B. Melderegister).`,
  },
  {
    iconUrl: "/icons/DiagramActivity.svg",
    title: "Prozess-/Aktivitätssymbol",
    description: dedent`
    **Prozess-/Aktivitätssymbol**
    
    Das Rechteck stellt eine Aktivität oder einen Arbeitsschritt dar (z.B. Antrag prüfen).`,
  },
  {
    iconUrl: "/icons/DiagramConnector.svg",
    title: "Verbindungspfeil",
    description: dedent`
    **Verbindungspfeil**
    
    Pfeile verbinden die Symbole und machen die zeitliche Reihenfolge der Prozessschritte sichtbar.`,
  },
];

function NextStepButton() {
  const ref = useRef<HTMLDivElement>(null);
  function onClick() {
    const nextLi = ref.current?.closest("li")?.nextElementSibling;
    nextLi?.scrollIntoView();
  }
  return (
    <div ref={ref} className={"flex justify-center"}>
      <Button
        onClick={onClick}
        size={"small"}
        iconLeft={<ArrowDownwardOutlined />}
      >
        Nächster Schritt
      </Button>
    </div>
  );
}

type StepProps = {
  mainContent: React.ReactNode;
  fullwidthContent: React.ReactNode;
  hideNextButton?: boolean;
  id?: string;
};

function Step({
  mainContent,
  fullwidthContent,
  hideNextButton,
  id,
}: Readonly<StepProps>) {
  return (
    <NumberedList.Item
      className="mt-4 flex scroll-my-40 flex-col gap-16"
      after={
        <>
          {fullwidthContent}
          {!hideNextButton && <NextStepButton />}
        </>
      }
      id={id}
    >
      {mainContent}
    </NumberedList.Item>
  );
}

export default function Visualization() {
  const infoBoxClass = "px-16 sm:px-56";
  const badgeForExampleContent: BadgeProps = {
    text: "Beispiel: Fahrerlaubnis",
    look: "hint",
  };
  return (
    <>
      <Hero
        title="Erstellung von Flussdiagrammen"
        subtitle="Ein Flussdiagramm visualisiert, wie ein Prozess Schritt für Schritt abläuft. Es hilft, die Reihenfolge von z.B. Handlungen, Datenflüssen oder Entscheidungen übersichtlich darzustellen."
      />

      <SidebarContainer
        sidebar={
          <ToC title={"Inhalt"} selector="section[id], li[id]">
            <ToC.List className="list-unstyled list-none">
              <ToC.Item href="#aufbau">Aufbau</ToC.Item>
              {/* special case: list item with list inside, we don't want to underline all children if the parent is active */}
              <li className={"group"}>
                <a
                  href="#anleitung"
                  className="ds-link-02-reg group-data-active:ds-link-02-bold no-underline"
                >
                  Anleitung
                </a>
                <ToC.List className="mt-16">
                  <ToC.Item href="#schritt-1">Format</ToC.Item>
                  <ToC.Item href="#schritt-2">Akteure</ToC.Item>
                  <ToC.Item href="#schritt-3">
                    Ziel & Perspektive der Visualisierung
                  </ToC.Item>
                  <ToC.Item href="#schritt-4">
                    Start und Ende definieren
                  </ToC.Item>
                  <ToC.Item href="#schritt-5">Prozess abbilden</ToC.Item>
                  <ToC.Item href="#schritt-6">Informationen ergänzen</ToC.Item>
                </ToC.List>
              </li>
            </ToC.List>
          </ToC>
        }
      >
        <section className="scroll-my-40 space-y-32 md:space-y-40" id="aufbau">
          <Heading tagName="h2" className="ds-heading-02-reg">
            Typischer Aufbau eines Flussdiagramms
          </Heading>
          <div className="grid grid-cols-1 gap-y-32 md:grid-cols-2 md:gap-x-48 md:gap-y-40">
            {diagramElements.map((item) => (
              <div key={item.title} className="flex gap-8">
                <img src={item.iconUrl} alt={item.title} className="size-80" />
                <RichText
                  className="ds-label-02-reg"
                  markdown={item.description}
                />
              </div>
            ))}
          </div>

          <ImageBox
            title="Beispiel eines Flussdiagramms"
            image={{
              url: "/images/methoden/flussdiagramme/flussdiagramm-beispiel.png",
              caption:
                "In diesem Beispiel ist der Antragsprozess für einen Führerschein aus Sicht der Fahrschülerin / des Fahrschülers visualisiert.",
              alternativeText:
                "Das Bild zeigt am Beispiel des Führerscheinantrags, wie ein Flussdiagramm funktioniert. Es stellt alle Schritte von der Anmeldung bis zur Meldebestätigung in chronologischer Reihenfolge übersichtlich dar. Die grünen Boxen erklären die jeweiligen Vorteile. Ein Flussdiagramm veranschaulicht Prozesse, verdeutlicht Verantwortlichkeiten und hilft, die Orientierung über den gesamten Ablauf zu bewahren.",
            }}
            zoomable
            border
          />
        </section>

        <section
          className="scroll-my-40 space-y-32 md:space-y-40"
          id="anleitung"
        >
          <Heading tagName="h2" className="flex gap-32">
            <DriveFileRenameOutline className="size-40" />
            Anleitung
          </Heading>
          <NumberedList>
            <Step
              id={"schritt-1"}
              mainContent={
                <>
                  <Badge>Schritt 1</Badge>
                  <RichText
                    markdown={dedent`
                    ### Entscheiden Sie, in welchem Medium Sie arbeiten möchten
                    
                    Wir empfehlen, den ersten Entwurf auf Papier oder einem Whiteboard zu erstellen.
                    So können Sie einfach Fehler korrigieren und sind frei in der Darstellung.
                    Sie können auch in einem einfachen Whiteboard-Programm oder Powerpoint arbeiten.
                    
                    **Darauf sollten Sie achten:**
                    
                    - Visualisierung ist klar strukturiert und gut lesbar
                    - Beschränkt sich auf die wesentlichen Elemente des Prozesses
                    `}
                  />
                </>
              }
              fullwidthContent={
                <InfoBox
                  look={"highlight"}
                  className={infoBoxClass}
                  badge={{
                    Icon: LayersOutlined,
                    text: "Vorlage für Flussdiagramm",
                  }}
                  content={dedent`
                    Hier können Sie eine **Powerpoint-Vorlage (PPT)** für das Flussdiagramm herunterladen.
                    In der Vorlage ist eine Schritt-für-Schritt-Anleitung enthalten.
                    Sie können diese ausdrucken oder an Ihrem Computer bearbeiten.
                    Sofern in Ihrem Ressort **Conceptboard** genutzt werden kann, können Sie sich auch eine Kopie dieser Conceptboard-Vorlage erstellen.
                    Für letzteres können Sie einen **Gast-Zugang** anlegen.
                    
                    [Conceptboard-Vorlage](https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy)
                    
                    [Powerpoint-Vorlage](${ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX.url})
                    
                    Sie wünschen sich ein anderes Medium?
                    Schicken Sie uns eine E-Mail an digitalcheck@digitalservice.bund.de.
                  `}
                />
              }
            />
            <Step
              id={"schritt-2"}
              mainContent={
                <>
                  <Badge>Schritt 2</Badge>
                  <RichText
                    markdown={dedent`
                      ### Identifizieren Sie relevante Akteure
                      
                      Sie starten mit einer unsortierten Liste der relevanten Akteure.
                      Schreiben Sie alle Akteure auf, die für den Vollzug der Regelung zuständig sind. Vergessen Sie dabei nicht die Normadressaten.
                      Es ist nicht schlimm, wenn Sie dabei einen Akteur vergessen. Dieser kann später hinzugefügt werden.`}
                  />
                </>
              }
              fullwidthContent={
                <InfoBox
                  look={"highlight"}
                  className={infoBoxClass}
                  badge={badgeForExampleContent}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageZoomable
                        image={{
                          url: "/images/methoden/flussdiagramme/2/relevante-akteure.png",
                          alternativeText:
                            "Eine Grafik, welches die Institutionen Meldebehörde, Anerkannte Prüfstelle (Fahrschule), Bundesdruckerei, Bundesamt für Justiz sowie die Rolle Fahrschüler:in ungeordnet darstellt.",
                        }}
                      />
                    ),
                  }}
                  content={dedent`
                    Am Beispiel der Fahrerlaubnis sind die wichtigsten Akteure und Berührungspunkte
                      - Fahrschülerin,
                      - Anerkannte Prüfstelle (Fahrschule)
                      - Meldebehörde
                      - Fahrerlaubnisbehörde
                      - Bundesamt für Justiz
                  `}
                />
              }
            />
            <Step
              id={"schritt-3"}
              mainContent={
                <>
                  <Badge>Schritt 3</Badge>
                  <RichText
                    markdown={dedent`
                      ### Legen Sie fest, was Ziel und Perspektive der Visualisierung sind
                      
                      Das Ziel der Visualisierung dient Ihnen als Orientierungspunkt, auf den Sie während des
                      Visualisierens immer wieder schauen können.
                      Die Perspektive legt fest, welcher Akteur im Fokus steht.
                      Häufig sind das die Normadressaten, es kann aber auch eine bestimmte Behörde sein, deren interne
                      Abläufe verbessert werden sollen.
                      
                      Schreiben Sie beides auf.
              `}
                  />
                </>
              }
              fullwidthContent={
                <InfoBox
                  look={"highlight"}
                  className={infoBoxClass}
                  badge={badgeForExampleContent}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageZoomable
                        image={{
                          url: "/images/methoden/flussdiagramme/3/ziel-perspektive-visualisierung.png",
                          alternativeText:
                            "Schaubild, welches Ziel der Visualisierung und Perspektive abstrakt darstellt. Das Ziel ist: Ich möchte den Prozess für Normenadressaten verbessern. Die Perspektive ist: Normenadressaten.",
                        }}
                      />
                    ),
                  }}
                  content={dedent`
                    Am Beispiel der Fahrerlaubnis:
                      - **Ziel** der Visualisierung: „Ich möchte den Prozess für die Erlangung der Fahrerlaubnis verändern und digital ermöglichen.“
                      - Die **Perspektive**  der Visualisierung ist die der Normadressaten und -adressatinnen. In diesem Fall die einer Fahrschülerin.
                  `}
                />
              }
            />
            <Step
              id={"schritt-4"}
              mainContent={
                <>
                  <Badge>Schritt 4</Badge>
                  <RichText
                    markdown={dedent`
                  ### Legen Sie fest, was Start- und Endpunkt sind
                  
                  Jetzt definieren Sie, womit der Prozess beginnt und womit er endet.
                  Nutzen Sie dafür die Perspektive des in Schritt 2 identifizierten Akteurs.

                  Schreiben Sie beides unter die entsprechenden Symbole auf der Vorlage.<br>
                  Es gibt zwei Symbole, die in Flussdiagrammen Standard sind:
                  - einen Kreis mit dünner Linie für Start
                  - einen Kreis mit dicker Linie für Ende
                  
                  Es kann für verschiedene Akteure unterschiedliche Start- und Endpunkte geben. Konzentrieren Sie sich auf den wichtigsten.
              `}
                  />
                  <ImageBox
                    image={{
                      url: "/images/methoden/flussdiagramme/4/start-ende.png",
                      caption:
                        "Der Start markiert die erste Aktion eines Akteurs, das Ende die letzte.",
                      alternativeText: "Darstellung von Start- und Endknoten",
                    }}
                    zoomable={false}
                    border
                  />
                </>
              }
              fullwidthContent={
                <InfoBox
                  look={"highlight"}
                  className={infoBoxClass}
                  badge={badgeForExampleContent}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageZoomable
                        image={{
                          url: "/images/methoden/flussdiagramme/4/beispiel-fahrschule-start-ende.png",
                          alternativeText:
                            "Ausschnitt eines Flussdiagramms: Start des Prozesses durch einen Kreis mit dünner Linie für den Akteur Fahrschüler:in. Zwei dick umrandete Kreise zeigen verschiedene mögliche Endergebnisse.",
                        }}
                      />
                    ),
                  }}
                  content={dedent`
                    Am Beispiel der Fahrerlaubnis:
                      - Der **Startpunkt** für die Fahrschülerin ist der Wunsch, einen Führerschein der Klasse B zu erlangen.
                      - Der **Endpunkt** ist erst erreicht, wenn sie den Führerschein als Plastikkarte erhalten hat.
                  `}
                />
              }
            />
            <Step
              id={"schritt-5"}
              mainContent={
                <>
                  <Badge>Schritt 5</Badge>
                  <RichText
                    markdown={dedent`
                      ### Visualisieren Sie den Prozess
                      Jetzt **übertragen Sie auf das Template** die Akteure sowie Start- und Endpunkt:
                      
                      Jeder Akteur erhält eine sogenannte Schwimmbahn. Alle Aktivitäten des Akteurs finden auf dieser Schwimmbahn statt.
              `}
                  />
                  <ImageBox
                    image={{
                      url: "/images/methoden/flussdiagramme/5/schwimmbahnen.png",
                      alternativeText:
                        "Fragment eines Flussdiagramms mit drei horizontalen, länglichen Kästen, die am Anfang mit einer Platzhalter-Box “Akteurin/Akteur” markiert sind.",
                      caption:
                        "Akteure können alle Normenadressaten oder Institutionen sein.",
                      className: "border border-blue-800",
                    }}
                    className="md:max-w-2/3 lg:max-w-1/2"
                    zoomable={false}
                    border
                  />
                  <p>
                    Ziehen Sie den Startpunkt an den Anfang des zugehörigen
                    Akteurs, den Endpunkt schieben Sie nach hinten. Der genaue
                    Punkt findet sich später. Tragen Sie nun die Aktivitäten,
                    Entscheidungen und Informationsflüsse der Akteure
                    schrittweise in den jeweiligen Bahnen ein.
                  </p>
                  <ImageBox
                    image={{
                      url: "/images/methoden/flussdiagramme/5/aktivitäten-mit-pfeilen.png",
                      alternativeText:
                        "Fragment eines Flussdiagramms, in denen Kästen für Aktivitäten mit Pfeilen verbunden sind.",
                      caption:
                        "Jede Aktivität der Akteure wird mit einem Pfeil verbunden.",
                    }}
                    className="md:max-w-2/3 lg:max-w-1/2"
                    zoomable={false}
                    border
                  />
                  <RichText
                    markdown={dedent`
                    **Darauf sollten Sie achten:**
                    - Akteure, Hierarchien, Abläufe und Entscheidungen sind klar und konsistent 
                    - Eine eindeutige visuelle Kodierung, zum Beispiel Farben oder Symbole, um Informationen zu unterscheiden
                    - Verweis auf wesentliche Paragraphen, relevante Akteure und EU-Vorgaben
                    
                    Das Ergebnis muss an dieser Stelle noch nicht perfekt aussehen.
                    `}
                  />
                </>
              }
              fullwidthContent={
                <InfoBox
                  look={"highlight"}
                  className={infoBoxClass}
                  badge={badgeForExampleContent}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageZoomable
                        image={{
                          url: "/images/methoden/flussdiagramme/5/beispiel-fahrschule-kombiniert.png",
                          alternativeText:
                            "Flussdiagramm, welches Aktivitäten für Akteure Fahrschüler:in, Anerkannte Prüfstelle (Fahrschule) sowie Meldebehörde in farblich unterschiedlich kodierten Schwimmbahnen wie im Text beschrieben darstellt.",
                        }}
                      />
                    ),
                  }}
                  content={dedent`
                    - **Akteure** (Fahrschüler:in, Fahrschule, Meldebehörde) haben je eine eigene Schwimmbahn.
                    - **Startpunkt** ("Möchte Führerschein erlangen") liegt am Anfang der Fahrschüler:in-Schwimmbahn.
                    - Prozess-Ablauf wird durch **Verbindungslinien** und **Schritte** dargestellt.
                    - Wesentliche **Paragraphen** (z.B. FeV § 16, BMG § 18) sind in den Kästen vermerkt.
                  `}
                />
              }
            />
            <Step
              id={"schritt-6"}
              mainContent={
                <>
                  <Badge>Schritt 6</Badge>
                  <RichText
                    markdown={dedent`
                    ### Räumen Sie die Visualisierung auf und fügen Sie wichtige Metadaten hinzu
                    Nachdem Sie den Prozess visualisiert haben, können Sie mit dem Feinschliff beginnen und alles ordnen.
                    
                    Prüfen Sie, ob die Elemente in Ihrer Visualisierung zu Ihrer Legende passen. Falls Sie noch keine Legende haben, erstellen Sie eine. Sie sollte Abkürzungen und Symbole klar erklären. Ähnlich wie in diesem Beispiel:
                `}
                  />
                  <ImageBox
                    image={{
                      url: "/images/methoden/flussdiagramme/6/legende.png",
                      alternativeText:
                        "Eine Legende, die zu Symbolen aus dem Diagramm Beschriftungen ergänzt",
                      caption:
                        "Eine Legende erklärt Symbole und Abkürzungen und macht so die Visualisierung verständlich.",
                    }}
                    border
                    className="md:max-w-2/3 lg:max-w-1/2"
                  />
                  <RichText
                    markdown={dedent`
                      Kennzeichnen Sie Ihre Visualisierung mit den wichtigsten Metadaten:
                      - Datum
                      - Titel
                      - Referat
                      - Version
                      - Leitfrage, die beantwortet wird und,
                      - falls zutreffend, Seitenzahlen
                    `}
                  />
                  <RichText
                    markdown={dedent`
                      **Darauf sollten Sie achten:**
                      - Zusammenhänge und Abgrenzungen sind klar erkennbar z.B. zu anderen Regelungen und Akteuren
                    `}
                  />
                </>
              }
              fullwidthContent={
                <InfoBox
                  look={"highlight"}
                  className={infoBoxClass}
                  badge={badgeForExampleContent}
                  visual={{
                    type: "component",
                    Component: (
                      <ImageZoomable
                        image={{
                          url: "/images/methoden/flussdiagramme/6/vollständiges-beispiel.png",
                          alternativeText:
                            "Flussdiagramm, welches zusätzliche Entscheidungssymbole, ein Datenbank-Symbol sowie eine Legende enthält.",
                        }}
                      />
                    ),
                  }}
                  content={dedent`
                    - **Ablauf/Entscheidungen:** Der Prozess ist durch Entscheidungssymbole (◇) erweitert, die einen "bestanden/nicht bestanden" Zweig nach der Theorie- und Praxisprüfung anzeigen.
                    - **Datenspeicherung:** Ein Datenbank-Symbol wurde hinzugefügt, um das "Melderegister" darzustellen.
                    - **Legenden:** Die Bedeutung der neuen Symbole wird in einer Legende erklärt.
                  `}
                />
              }
              hideNextButton
            />
          </NumberedList>
        </section>
      </SidebarContainer>
      <Container className="pt-0">
        <hr className="mb-40 border-0 border-b-2 border-solid border-blue-300" />
        <InfoBox
          badge={{
            Icon: ArrowCircleRightOutlined,
            text: "So geht es weiter",
          }}
          heading={{
            tagName: "h2",
            text: "Im nächsten Schritt wenden Sie die Prinzipien an.",
            className: "ds-heading-03-reg",
          }}
          content={
            "Sie wenden die Prinzipien auf Ihre Visualisierung an und identifizieren konkrete Möglichkeiten der Digitalisierung."
          }
          buttons={[
            {
              text: "Zu den Prinzipien",
              look: "tertiary",
              href: ROUTE_METHODS_PRINCIPLES.url,
            },
          ]}
        />
      </Container>
    </>
  );
}
