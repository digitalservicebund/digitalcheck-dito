import rulemapImg from "@/images/rulemap.jpg";
import {
  CheckCircleOutlined,
  FormatListBulletedOutlined,
  TimerOutlined,
} from "@digitalservicebund/icons";
import { dedent } from "~/utils/dedentMultilineStrings";

export const supportTabs = [
  {
    id: "schnelle-hilfe",
    title: "Schnelle Hilfe",
    offerings: [
      {
        title: "Digitalbezug einschätzen lassen",
        text: dedent`
              Wir unterstützen Sie, den Digitalbezug Ihres Verfahrens einzuschätzen, indem wir die Vorprüfung gemeinsam durchgehen. 

              Je nach Ziel Ihres Vorhabens und Grad des Digitalbezugs, variiert der Zeitaufwand, den Sie für die Erarbeitung digitaler Aspekte einplanen sollten. 

              **Beispiele für einen starken Digitalbezug: Prozess/Dienstleistung/Interaktion neu aufsetzen**
              
              z. B. bei folgenden Zielen einer Regelung:
              
              - Voraussetzungen für eine Digitalisierung schaffen
              - bestehenden Umsetzungsprozesse verbessern oder neu aufsetzen
              
              **Beispiele für einen leichten bis mittleren Digitalbezug: bestehenden Prozess anpassen**
              
              z. B. bei folgenden Zielen einer Regelung:
              
              - Anpassungen von Nachweispflichten
              - Anpassungen von Pauschalen
            `,
        sellingPoints: "Ihr Vorteil auf einen Blick",
        details: [
          {
            icon: TimerOutlined,
            title: "Zeitaufwand",
            text: dedent`
                  - **Fachreferat:** 1-2 Stunden
                  - **DigitalService-Team:** 1-2 Stunden
                `,
          },
          {
            icon: CheckCircleOutlined,
            title: "Was Sie bekommen",
            text: dedent`
                  - Expert:innen-Einschätzung zum Digitalbezug des Regelungsverfahrens: Grundlage für Planung des Regelungsvorhabens
                `,
          },
        ],
      },
      {
        title: "IT-Wissen einfach erklärt",
        text: dedent`
              Im geschützten Rahmen eines Gesprächs beantworten unsere Expert:innen Ihnen alle **Fragen zur IT**. 

              Jede Frage ist berechtigt — jede verstandene Antwort wird die Regelung digitaltauglicher machen.  

              Beispiele für Fragen:
              
              - Was ist eine Schnittstelle?
              - Wie unterscheiden sich Vertrauensniveaus?
              - Welchen Datenstandard sollte das Antragsformular berücksichtigen?
            `,
        sellingPoints: "Ihr Vorteil auf einen Blick",
        details: [
          {
            icon: TimerOutlined,
            title: "Zeitaufwand",
            text: dedent`
                  - **Fachreferat:** 1-2 Stunden
                  - **DigitalService-Team:** 1-2 Stunden
                `,
          },
          {
            icon: CheckCircleOutlined,
            title: "Was Sie bekommen",
            text: dedent`
                  - besseres Verständnis der digitalen Aspekte der Regelung
                  - Sicherheit in Abstimmungen mit umsetzenden Akteuren
                `,
          },
        ],
      },
    ],
  },
  {
    id: "umfangreiche-beratung",
    title: "Umfangreiche Beratung",
    offerings: [
      {
        title: "Visualisierungen erstellen",
        text: dedent`
              Wir erstellen Visualisierungen für Sie oder digitalisieren Ihre Papier-und-Stift-Skizzen.

              Ein Bild sagt mehr als tausend Worte — genauso helfen Visualisierungen um Sachverhalte abzustimmen, Zusammenhänge zu verstehen und bei Abstimmungen im Haus und zwischen Ressorts.

              Die Art der Visualisierung richtet sich nach Ihren Anforderungen:
              
              - **Antragsstrecke oder ein Datenfluss im Detail verstehen**, visualisiert als Flussdiagramm
              - **beteiligte Akteure identifizieren**, visualisiert als Flussdiagramm
              - **Logik und Struktur des Regelungstextes prüfen**, visualisiert als Entscheidungsbaum
              - Überblick über das Verfahren geben zur **Kommunikation im Haus, mit dem NKR oder zwischen Ressorts**, visualisiert als Schaubild
            `,
        sellingPoints: "Ihr Vorteil auf einen Blick",
        details: [
          {
            icon: TimerOutlined,
            title: "Zeitaufwand",
            text: dedent`
                  - **Fachreferat:** einige Stunden für gemeinsame Arbeitssitzungen
                  - **DigitalService-Team:** 1-5 Tage
                `,
          },
          {
            icon: CheckCircleOutlined,
            title: "Was Sie bekommen",
            text: dedent`
                  - tieferes Verständnis der digitalen Aspekte der Regelung
                  - eine Visualisierung, die die Prüfung durch den NKR informiert
                `,
          },
        ],
        examples: [
          {
            image: {
              src: rulemapImg,
              alt: "Eine Rulemap mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.",
            },
            text: "**Beispiel-Visualisierung:** [Gesetz zur Modernisierung und zum Bürokratieabbau im Strom- und Energiesteuerrecht](https://dserver.bundestag.de/btd/20/123/2012351.pdf) (Seite 110 ff.)",
          },
        ],
      },
      {
        title: "Digitale Umsetzung erarbeiten",
        text: dedent`
              Wenn die technischen Anforderungen komplex werden, helfen wir als neutraler Akteur dabei, die **technische Umsetzung** im Detail zu durchdenken und Nutzerfreundlichkeit, Datenverwendung und IT-Sicherheit zu beachten. 

              Maßnahmen, die wir z. B. für Sie erledigen:
              
              - Durchführung von **Beteiligungsformaten mit umsetzenden Akteuren und Normadressaten**, z. B. moderierte Gespräche mit nachgelagerten Behörden
              - Erstellung von **Visualisierungen** und Stakeholder Maps
              - Klärung von **Fragen zur technischen Umsetzung**
              - **Analyse von Rahmenbedingungen** für eine reibungslose Umsetzung, z. B. durch die Evaluation bestehender IT-Verfahren
            `,
        sellingPoints: "Ihr Vorteil auf einen Blick",
        details: [
          {
            icon: TimerOutlined,
            title: "Zeitaufwand",
            text: dedent`
                  - **Fachreferat:** 5+ Tage für gemeinsame Arbeitssitzungen
                  - **DigitalService-Team:** 4+ Wochen
                `,
          },
          {
            icon: CheckCircleOutlined,
            title: "Was Sie bekommen",
            text: dedent`
                  - Antworten auf Fragen zur digitalen Umsetzung der Regelung
                  - Material, Wissen und Argumente für Abstimmungen und Beteiligungen
                `,
          },
          {
            icon: FormatListBulletedOutlined,
            title: "Voraussetzungen",
            text: dedent`
                  - Regelungsverfahren befindet sich in frühem Stadium: Vorbereitung des Regelungstextes
                  - inhaltliche Zusammenarbeit mit umsetzenden Akteur:innen ist möglich
                `,
          },
        ],
        examples: [
          {
            text: "Lesen Sie sich das Beispiel durch: [„Begleitung des Stromsteuergesetz“](https://digitalservice.bund.de/blog/aktuelles-beispiel-fuer-digitaltaugliche-regelungen-das-stromsteuerrecht)",
          },
        ],
      },
    ],
  },
] as const;
