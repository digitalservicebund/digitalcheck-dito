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
import InfoBox from "~/components/InfoBox.tsx";
import NumberedList from "~/components/NumberedList.tsx";
import RichText from "~/components/RichText.tsx";

import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import BackToTopButton from "~/components/BackToTopButton.tsx";
import Container from "~/components/Container.tsx";
import MetaTitle from "~/components/Meta";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import SidebarContainer from "~/layout/SidebarContainer.tsx";
import { STRAPI_MEDIA_URL } from "~/resources/constants.ts";
import {
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX,
  ROUTE_METHODS_VISUALIZE_FLOWCHARTS,
} from "~/resources/staticRoutes.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils.ts";

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
      className="flex scroll-my-40 flex-col gap-16"
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
    children: "Beispiel: Fahrerlaubnis",
    look: "hint",
  };
  // noinspection HtmlUnknownAnchorTarget
  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS_VISUALIZE_FLOWCHARTS.title} />
      <Hero
        title="Erstellung von Flussdiagrammen"
        subtitle="Ein Flussdiagramm visualisiert, wie ein Prozess Schritt für Schritt abläuft. Es hilft, die Reihenfolge von z.B. Handlungen, Datenflüssen oder Entscheidungen übersichtlich darzustellen."
      />

      <SidebarContainer
        sidebar={
          <ToC title={"Inhalt"} selector="section[id], li[id]">
            <ToC.List className="list-unstyled list-none">
              <ToC.Item href="#aufbau" title="Aufbau" />
              {/* special case: list item with list inside, we don't want to underline all children if the parent is active */}
              <ToC.Item
                href="#anleitung"
                title="Anleitung"
                after={
                  <ToC.List className="mt-0 list-none">
                    <ToC.Item
                      href="#schritt-1"
                      title="Format"
                      numbered
                    ></ToC.Item>
                    <ToC.Item
                      href="#schritt-2"
                      title="Akteure"
                      numbered
                    ></ToC.Item>
                    <ToC.Item
                      numbered
                      href="#schritt-3"
                      title="Ziel & Perspektive der Visualisierung"
                    ></ToC.Item>
                    <ToC.Item
                      numbered
                      href="#schritt-4"
                      title="Start und Ende definieren"
                    ></ToC.Item>
                    <ToC.Item
                      numbered
                      href="#schritt-5"
                      title="Prozess abbilden"
                    ></ToC.Item>
                    <ToC.Item
                      numbered
                      href="#schritt-6"
                      title="Informationen ergänzen"
                    ></ToC.Item>
                  </ToC.List>
                }
              ></ToC.Item>
              <ToC.Item href="#video-anleitung" title="Video-Anleitung" />
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
          <NumberedList separator>
            <Step
              id={"schritt-1"}
              mainContent={
                <>
                  <Badge>Schritt 1</Badge>
                  <RichText
                    markdown={dedent`
                    ### Entscheiden Sie, in welchem Medium Sie arbeiten möchten
                    
                    Wir empfehlen, den ersten Entwurf auf Papier oder einem Whiteboard zu erstellen.
                    Sie können Fehler jederzeit leicht korrigieren und die Darstellung flexibel anpassen. 
                    Perfektion ist hier nicht entscheidend – wichtig ist, dass Sie anfangen
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
                    children: "Vorlage für Flussdiagramm",
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
                      <ImageBox
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
                      <ImageBox
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
                  - **Start (Kreis mit dünner Linie):** Wann startet der Prozess der Akteurin oder Akteurs?
                  - Ende (Kreis mit dicker Linie): Was soll die Akteurin oder Akteur am Ende erreichen?
                  
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
                      <ImageBox
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
                    Setzen Sie den Startpunkt an den Anfang der Bahn des
                    Akteurs, den Endpunkt ans Ende. Der genaue Platz wird im
                    Verlauf noch angepasst. Der genaue Punkt findet sich später.
                    Fügen Sie nun Aktivitäten, Entscheidungen und
                    Informationsflüsse der Akteure nacheinander in die Bahnen
                    ein. Formulieren Sie die Aktivitäten möglichst aktiv, z. B.
                    „Akteur X beantragt Y“ oder „Akteur X versendet Y“.
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
                  <p
                    className="ds-label-02-reg text-gray-900"
                    id="flussdiagramm-erstellen-live-desc"
                  >
                    Ein Beispielvideo zeigt das Entstehen eines Flussdiagramms.
                  </p>
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
                      <ImageBox
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
                      <ImageBox
                        image={{
                          url: "/images/methoden/flussdiagramme/6/vollständiges-beispiel.jpg",
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
        <section className="scroll-my-40" id="video-anleitung">
          <h2 className="ds-subhead mb-8">
            Zusammenfassende Anleitung: So entsteht ein Flussdiagramm
          </h2>
          <p className="mb-40">
            Im Video sehen Sie die zuvor erklärten Schritte in kompakter Form –
            diesmal am Beispiel Einbürgerung. So wird deutlich, wie sich die
            Methode aus dem Führerschein-Beispiel auch auf andere Themen
            übertragen lässt.
          </p>
          <video
            controls
            muted
            width="100%"
            className={twJoin(
              "max-w-a11y",
              getPlausibleEventClassName("Content.Steps.5.Video+View"),
            )}
            preload="none"
            poster={
              STRAPI_MEDIA_URL +
              "/Flussdiagramm_erstellen_live_poster_2_b011955559.png"
            }
            aria-labelledby="flussdiagramm-erstellen-live-desc"
          >
            <source
              src={
                STRAPI_MEDIA_URL +
                "/Flussdiagramm_erstellen_live_9d1e3de185.mp4"
              }
              type="video/mp4"
            />
            <Link
              to={
                STRAPI_MEDIA_URL +
                "/Flussdiagramm_erstellen_live_9d1e3de185.mp4"
              }
              target="_blank"
              rel="noreferrer"
              className="ds-link-01-reg"
            >
              Video herunterladen
            </Link>
          </video>
        </section>
      </SidebarContainer>
      <Container className="mb-80 py-0">
        <hr className="mb-80 border-0 border-b-2 border-solid border-blue-300" />
        <InfoBox
          badge={{
            Icon: ArrowCircleRightOutlined,
            children: "So geht es weiter",
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
      <BackToTopButton />
    </>
  );
}
