import {
  ArrowDownwardOutlined,
  DriveFileRenameOutline,
  LayersOutlined,
} from "@digitalservicebund/icons";
import { useRef } from "react";
import Badge from "~/components/Badge.tsx";
import Button from "~/components/Button.tsx";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";
import InfoBox from "~/components/InfoBox.tsx";
import NumberedList from "~/components/NumberedList.tsx";
import RichText from "~/components/RichText";
import {
  ROUTE_METHODS_FLOWCHARTS,
  ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX,
} from "~/resources/staticRoutes.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import constructMetaTitle from "~/utils/metaTitle.ts";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS_FLOWCHARTS.title);
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

const listItemClass = "mt-4 flex flex-col gap-16";
export default function Visualization() {
  return (
    <>
      <Hero
        title="Flussdiagramme"
        subtitle="Ein Flussdiagramm visualisiert, wie ein Prozess Schritt für Schritt abläuft. Es hilft, die Reihenfolge von z.B. Handlungen, Datenflüssen oder Entscheidungen übersichtlich darzustellen."
      />

      <Container className="space-y-40 md:my-40 md:space-y-80">
        <section className="space-y-32 md:space-y-40">
          <Heading tagName="h2" className="ds-heading-02-reg">
            Typischer Aufbau eines Flussdiagramms
          </Heading>
          <div className="grid grid-cols-1 gap-y-32 md:grid-cols-2 md:gap-x-48 md:gap-y-40">
            {diagramElements.map((item) => (
              <div key={item.title} className="flex gap-8">
                <img
                  src={item.iconUrl}
                  alt={item.title}
                  className="size-40 md:size-80"
                />
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
              url: "/images/methoden.flussdiagramm.beispiel.png",
              caption:
                "In diesem Beispiel ist der Antragsprozess für einen Führerschein aus Sicht der Fahrschülerin / des Fahrschülers visualisiert.",
            }}
            zoomable
            border
          />
        </section>

        <section className="space-y-32 md:space-y-40">
          <Heading tagName="h2" className="flex gap-32">
            <DriveFileRenameOutline className="size-40" />
            Anleitung
          </Heading>
          <NumberedList>
            <NumberedList.Item
              className={listItemClass}
              after={
                <>
                  <InfoBox
                    look={"highlight"}
                    className={"px-56 sm:px-56"}
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
                  <NextStepButton />
                </>
              }
            >
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
            </NumberedList.Item>
            <NumberedList.Item
              className={listItemClass}
              after={
                <>
                  <InfoBox
                    look={"highlight"}
                    className={"px-56 sm:px-56"}
                    badge={{
                      text: "Beispiel: Fahrerlaubnis",
                      look: "hint",
                    }}
                    visual={{
                      type: "component",
                      Component: (
                        <ImageZoomable
                          image={{
                            url: "/images/methoden.relevante-akteure.png",
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
                  <NextStepButton />
                </>
              }
            >
              <Badge>Schritt 2</Badge>
              <RichText
                markdown={dedent`
                      ### Identifizieren Sie relevante Akteure
                      
                      Sie starten mit einer unsortierten Liste der relevanten Akteure.
                      Schreiben Sie alle Akteure auf, die für den Vollzug der Regelung zuständig sind. Vergessen Sie dabei nicht die Normadressaten.
                      Es ist nicht schlimm, wenn Sie dabei einen Akteur vergessen. Dieser kann später hinzugefügt werden.`}
              />
            </NumberedList.Item>
            <NumberedList.Item
              className={listItemClass}
              after={
                <>
                  <InfoBox
                    look={"highlight"}
                    className={"px-56 sm:px-56"}
                    badge={{
                      text: "Beispiel: Fahrerlaubnis",
                      look: "hint",
                    }}
                    visual={{
                      type: "component",
                      Component: (
                        <ImageZoomable
                          image={{
                            url: "/images/methoden.ziel-perspektive-visualisierung.png",
                            alternativeText: "TODO",
                          }}
                        />
                      ),
                    }}
                    content={dedent`
                    Am Beispiel der Fahrerlaubnis:
                      - **Ziel** der Visualisierung: „Ich möchte den Prozess für die erlangung der Fahrerlaubnis verändern und digital ermöglichen.“
                      - Die **Perspektive**  der Visualisierung ist die der Normadressaten und -adressatinnen. In diesem Fall die einer Fahrschülerin.
                  `}
                  />
                  <NextStepButton />
                </>
              }
            >
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
            </NumberedList.Item>
            <NumberedList.Item
              className={listItemClass}
              after={
                <>
                  <InfoBox
                    look={"highlight"}
                    className={"px-56 sm:px-56"}
                    badge={{
                      text: "Beispiel: Fahrerlaubnis",
                      look: "hint",
                    }}
                    visual={{
                      type: "component",
                      Component: (
                        <ImageZoomable
                          image={{
                            url: "/images/methoden.ziel-perspektive-visualisierung.png",
                            alternativeText: "TODO",
                          }}
                        />
                      ),
                    }}
                    content={dedent`
                    Am Beispiel der Fahrerlaubnis:
                      - **Ziel** der Visualisierung: „Ich möchte den Prozess für die erlangung der Fahrerlaubnis verändern und digital ermöglichen.“
                      - Die **Perspektive**  der Visualisierung ist die der Normadressaten und -adressatinnen. In diesem Fall die einer Fahrschülerin.
                  `}
                  />
                  <NextStepButton />
                </>
              }
            >
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
            </NumberedList.Item>
          </NumberedList>
        </section>
      </Container>
    </>
  );
}
