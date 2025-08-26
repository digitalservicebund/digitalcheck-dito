import { DriveFileRenameOutline } from "@digitalservicebund/icons";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox.tsx";
import { NumberedList } from "~/components/List.tsx";
import { ListItemProps } from "~/components/ListItem.tsx";
import RichText from "~/components/RichText";
import { ROUTE_METHODS_FLOWCHARTS } from "~/resources/staticRoutes.ts";
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
            Typischer Aufbau eines Flussdiagramms:
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
          <NumberedList
            heading={{
              className: "ds-heading-02-reg flex gap-32",
              children: (
                <>
                  <DriveFileRenameOutline className="size-40" />
                  Anleitung
                </>
              ),
            }}
            items={
              [
                {
                  badge: {
                    text: "Schritt 1",
                    look: "default",
                  },
                  headline: {
                    text: "Entscheiden Sie, in welchem Medium Sie arbeiten möchten",
                  },
                  content: dedent`
                    Wir empfehlen, den ersten Entwurf auf Papier oder einem Whiteboard zu erstellen.
                    So können Sie einfach Fehler korrigieren und sind frei in der Darstellung.
                    Sie können auch in einem einfachen Whiteboard-Programm oder Powerpoint arbeiten.
                    
                    **Darauf sollten Sie achten:**
                    
                    - Visualisierung ist klar strukturiert und gut lesbar
                    - Beschränkt sich auf die wesentlichen Elemente des Prozesses
                    `,
                },
              ] as ListItemProps[]
            }
          />
        </section>
      </Container>
    </>
  );
}
