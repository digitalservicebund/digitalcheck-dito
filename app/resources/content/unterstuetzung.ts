import AdsClickOutlined from "@digitalservicebund/icons/AdsClickOutlined";
import CheckCircleOutlined from "@digitalservicebund/icons/CheckCircleOutlined";
import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import FormatListBulletedOutlined from "@digitalservicebund/icons/FormatListBulletedOutlined";
import PlaylistAddCheckOutlined from "@digitalservicebund/icons/PlaylistAddCheckOutlined";
import TimerOutlined from "@digitalservicebund/icons/TimerOutlined";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_INTEROPERABILITY_SPOC,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const support = {
  title: "Hilfe für digitaltaugliche Regelungsvorhaben",
  subtitle:
    "Nutzen Sie unsere digitale Expertise, um Ihr Regelungsvorhaben digitaltauglich zu gestalten und den Digitalcheck erfolgreich zu erfüllen.",
  socialProof: {
    text: `Wir, die Digital-Expert:innen des DigitalService,<br class="sm:max-lg:hidden" /> haben bereits über <span class="text-[65px] -top-[11px] h-[30px] inline-block relative overflow-visible align-top">70</span> **Regelungsvorhaben** unterstützt.`,

    image: {
      src: "/images/support.png",
      alt: `Ein Flussdiagramm mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.`,
    },
    testimonials: [
      {
        quote:
          "Die gründliche Analyse von Vollzugsprozessen hat uns geholfen, das Zusammenspiel zwischen den Regelungen und der Administration besser zu verstehen und so den digitalen Vollzug zu gestalten. Die gemeinsame Arbeit mit dem Team des DigitalService war intensiv, hat uns im Ergebnis jedoch viel Zeit für weitere Absprachen gespart.",
        position: "Projektpartnerin",
        ministry: "im Bundesministerium der Finanzen",
      },
    ],
  },
  supportWhat: {
    title: "So unterstützen wir Sie",
    subtitle:
      "Legistinnen und Legisten stehen oft vor der Herausforderung, Regelungen unter erheblichem Zeitdruck erarbeiten zu müssen. Genau hier kommen wir ins Spiel: Wir unterstützen Sie in jeder Phase des Vorhabens und sorgen dafür, dass Ihr Vorhaben eine einfache und wirkungsorientierte Umsetzung, unter Ausschöpfung der digitalen Möglichkeiten zum Nutzen aller Beteiligten ermöglicht.",
    supportTypes: [
      {
        icon: DrawOutlined,
        title: "Visualisierungen erstellen",
        text: "Wir erstellen in wenigen Tagen eine Visualisierung für Sie — hilfreich bei Abstimmungen im Haus, zwischen Ressorts oder mit dem NKR.",
      },
      {
        icon: PlaylistAddCheckOutlined,
        title: "Schnelle Hilfe für den Digitalcheck",
        text: "Wir erklären, welche Schritte es gibt, welche Dokumente Sie wann benötigen und schätzen den Digitalbezug mit Ihnen ein (Vorprüfung ausfüllen).",
      },
      {
        icon: AdsClickOutlined,
        title: "Digitales Potential ausschöpfen",
        text: "Wir unterstützen Sie dabei die digitalen Potentiale Ihres Vorhabens auszuschöpfen, zu verbessern oder neu zu gestalten.",
      },
    ],
  },
  supportHow: {
    title: "Schnelle Hilfe und individuelle Beratung",
    text: "Sie können uns für dringende Anliegen unter [0151/40 76 78 39](tel:+4915140767839) anrufen oder uns eine **E-Mail** senden. Wir beantworten Ihnen alle wichtigen Fragen zum Vorgehen und Anwenden des Digitalchecks sowie allgemeine Fragen rund um das Erarbeiten digitaltauglicher Regelungen.<br /><br /> Darüber hinaus bieten wir individuelle Beratungsgespräche an. Gemeinsam klären wir, welche Unterstützungsangebote am besten zu Ihrem Bedürfnissen passen.",
    buttons: [
      {
        text: "E-Mail senden",
        look: "tertiary" as const,
        href: "mailto:digitalcheck@digitalservice.bund.de?subject=Unterstützungsangebote:%20erarbeiten.digitalcheck.bund.de",
      },
    ],
  },
  supportOfferings: {
    title: "Unsere Unterstützungsangebote",
    text: "Nach einem erstem Austausch finden wir gemeinsam die richtige Unterstützung für Ihre Herausforderung und Ihren Zeitplan.",
    tabs: [
      {
        title: "Schnelle Hilfe",
        offerings: [
          {
            title: "Digitalbezug einschätzen lassen",
            text: dedent`
              Wir unterstützen Sie, den Digitalbezug Ihres Verfahrens einzuschätzen, indem wir die Vorprüfung gemeinsam durchgehen. 
              <br class="block content-[''] mb-32!" />
              Je nach Ziel Ihres Vorhabens und Grad des Digitalbezugs, variiert der Zeitaufwand, den Sie für die Erarbeitung digitaler Aspekte einplanen sollten. 
              <br class="block content-[''] mb-32!" />
              **Beispiele für einen starken Digitalbezug: Prozess/Dienstleistung/Interaktion neu aufsetzen**
              
              z. B. bei folgenden Zielen einer Regelung:
              
              - Voraussetzungen für eine Digitalisierung schaffen
              - bestehenden Umsetzungsprozesse verbessern oder neu aufsetzen
              <br class="block content-[''] mb-24!" />
              
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
                title: "Was sie bekommen",
                text: dedent`
                  - Expert:innen-Einschätzung zum Digitalbezug des Regelungsverfahrens: Grundlage für Planung des Regelungsvorhabens
                  - richtige Ansprechperson im NKR-Sekretariat
                `,
              },
            ],
          },
          {
            title: "IT-Wissen einfach erklärt",
            text: dedent`
              Im geschützten Rahmen eines Gesprächs beantworten unsere Expert:innen Ihnen alle **Fragen zur IT**. 
              <br class="block content-[''] mb-32!" />
              Jede Frage ist berechtigt — jede verstandene Antwort wird die Regelung digitaltauglicher machen.  
              <br class="block content-[''] mb-32!" />
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
                title: "Was sie bekommen",
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
        title: "Umfangreiche Beratung",
        offerings: [
          {
            title: "Visualisierungen erstellen",
            text: dedent`
              Wir erstellen Visualisierungen für Sie oder digitalisieren Ihre Papier-und-Stift-Skizzen.
              <br class="block content-[''] mb-32!" />
              Ein Bild sagt mehr als tausend Worte — genauso helfen Visualisierungen bei Abstimmungen im Haus, zwischen Ressorts oder mit dem NKR.
              <br class="block content-[''] mb-32!" />
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
                title: "Was sie bekommen",
                text: dedent`
                  - tieferes Verständnis der digitalen Aspekte der Regelung
                  - eine Visualisierung, die die Prüfung durch den NKR informiert
                `,
              },
            ],
            examples: [
              {
                image: {
                  src: "/images/rulemap.jpg",
                  alt: `Eine Rulemap mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.`,
                },
                text: "**Beispiel-Visualisierung:** [Gesetz zur Modernisierung und zum Bürokratieabbau im Strom- und Energiesteuerrecht](https://dserver.bundestag.de/btd/20/123/2012351.pdf) (Seite 110 ff.)",
              },
            ],
          },
          {
            title: "Digitale Umsetzung erarbeiten",
            text: dedent`
              Wenn die technischen Anforderungen komplex werden, helfen wir als neutraler Akteur dabei, die **technische Umsetzung** im Detail zu durchdenken und Nutzerfreundlichkeit, Datenverwendung und IT-Sicherheit zu beachten. 
              <br class="block content-[''] mb-32!" />
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
                title: "Was sie bekommen",
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
      {
        title: "Online-Schulungen",
        offerings: [
          {
            title:
              "Regelungen digitaltauglich gestalten – praktische Tipps für den Digitalcheck",
            text: dedent`
              Fast alles, was wir heutzutage in der Verwaltung tun, hat einen Daten- oder Digitalbezug. Regelungsvorhaben sind daher die zentrale Voraussetzung für digitale Leistungen und Prozesse und schaffen die Grundlage für einen digitalen Staat.
              <br class="block content-[''] mb-32!" />
              In dieser Online-Schulung erfahren Sie, wie Sie Regelungen so formulieren, dass Sie den **Digitalcheck erfolgreich bestehen**. Wir zeigen an **Beispielen**, wie Sie Ihre Regelungen digitaltauglich schreiben können. Anhand der fünf bewährten **Prinzipien für Digitaltauglichkeit** erläutern wir, wie Sie Begriffe und Konzepte wie Automatisierung und Standardisierung optimal nutzen, um Ihre Vorhaben fit für die digitale Zukunft zu machen.
              <br class="block content-[''] mb-32!" />
              Das Angebot richtet sich an alle, die in den Bundesministerien Regelungen erarbeiten. Vorkenntnisse sind nicht erforderlich.
            `,
            button: {
              text: "Per E-Mail anmelden",
              href: encodeURI(
                dedent`mailto:digitalcheck@digitalservice.bund.de?subject=[Digitalcheck Schulung] Anmeldung digitaltaugliche Regelungen&body=
                  Guten Tag,
                  
                  ich möchte mich gerne für die Online-Schulung anmelden:
                  
                  Regelungen digitaltauglich gestalten – praktische Tipps für den Digitalcheck
                  
                  am
                  
                  [Wunsch-Datum einfügen]
                  
                  Mit freundlichen Grüßen
                `,
              ),
              look: "tertiary" as const,
            },
            sellingPoints: "Alle Informationen auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Nächste Termine",
                text: dedent`
                  "Wir planen bald neue Termine für Schulungen in 2025. Schreiben Sie uns eine [E-Mail](mailto:digitalcheck@digitalservice.bund.de?subject=[Warteliste Schulung: Digitaltaugliche Regelungen erarbeiten]) und wir setzen Sie auf die Warteliste.\n" +
                  <br class="block content-[''] mb-32!" />                  
                  Sie können sich bis dahin das [Schulungsmaterial ansehen](https://github.com/digitalservicebund/digitalcheck-content/tree/main/src/online-schulungen).
                `,
              },
            ],
          },
          {
            title: "Visualisierungen – Komplexes einfach darstellen",
            text: dedent`
              Digitaltaugliche Regelungen müssen von Beginn an aus der Umsetzungsperspektive gedacht werden. Visualisierungsmethoden bieten dafür wertvolle Unterstützung: Mit ihrer Hilfe lassen sich einzelne **Prozessschritte, Zielgruppen und beteiligte Akteure** darstellen. **Mögliche Hindernisse** für eine digitale Umsetzung werden sicht- und bearbeitbar.
              <br class="block content-[''] mb-32!" />
              In unserer interaktiven Online-Schulung erfahren Sie, wie Sie Visualisierungen gezielt für Ihr Regelungsvorhaben nutzen können. Anhand konkreter Beispiele lernen Sie, **eigene Visualisierungen zu erstellen** und so komplexe Vorhaben klar und verständlich zu präsentieren.
              <br class="block content-[''] mb-32!" />
              Das Angebot richtet sich an alle, die in den Bundesministerien Regelungen erarbeiten. Vorkenntnisse sind nicht erforderlich.
            `,
            button: {
              text: "Per E-Mail anmelden",
              href: encodeURI(
                dedent`mailto:digitalcheck@digitalservice.bund.de?subject=[Digitalcheck Schulung] Anmeldung Visualisierungen&body=
                  Guten Tag,
                  
                  ich möchte mich gerne für die Online-Schulung anmelden:
                  
                  Visualisierungen – Komplexes einfach darstellen
                  
                  am
                  
                  [Wunsch-Datum einfügen]
                  
                  Mit freundlichen Grüßen
                `,
              ),
              look: "tertiary" as const,
            },
            sellingPoints: "Alle Informationen auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Nächste Termine",
                text: dedent`
                  "Wir planen bald neue Termine für Schulungen in 2025. Schreiben Sie uns eine [E-Mail](mailto:digitalcheck@digitalservice.bund.de?subject=[Warteliste Schulungen: Visualisierung]) und wir setzen Sie auf die Warteliste.\n" +
                  <br class="block content-[''] mb-32!" />                
                  Sie können sich bis dahin das [Schulungsmaterial ansehen](https://github.com/digitalservicebund/digitalcheck-content/tree/main/src/online-schulungen).
                `,
              },
            ],
          },
        ],
      },
    ],
  },
  kontaktstelle: {
    id: "kontaktstelle",
    title: "Haben Sie Fragen zu EU-Anforderungen an Interoperabilität?",
    text: dedent`
      Weitere Informationen zu den EU-Anforderungen für Interoperabilität in der Regelung finden Sie in unserer [Übersicht](${ROUTE_INTEROPERABILITY.url}).
      <br class="block content-[''] mb-32!" />
      Weitere Informationen zu Governance, Zusammenarbeit und Nutzung unserer Inhalte finden Sie unter [Nationale Kontaktstelle](${ROUTE_INTEROPERABILITY_SPOC.url}) für ein interoperables Europa.`,
  },
};
