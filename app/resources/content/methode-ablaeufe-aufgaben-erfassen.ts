import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import StickyNote2Outlined from "@digitalservicebund/icons/StickyNote2Outlined";
import SupportOutlined from "@digitalservicebund/icons/SupportOutlined";
import {
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_SUPPORT,
} from "~/resources/routeDefinitions";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methodsTasksProcesses = {
  title: "2.2. Aufgaben und Abläufe gemeinsam erfassen",
  subtitle: `Damit Ihre Regelung wirkungsvoll in die Praxis kommt, müssen Sie die **aktuellen Abläufe** verstehen. Holen Sie sich dazu Unterstützung von den Akteurinnen und Akteuren, die Sie im vorigen Schritt identifiziert haben. In diesem Schritt müssen Sie noch nicht auf geplante Neuerungen eingehen. Konzentrieren Sie sich auf den **Status Quo**.`,
  guidance: dedent`
    **Zeit:** ca. sechs Stunden
    
    **Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren zusammen
    
    **Support:** Komplexe Abläufe können Sie mit dem Digitalcheck-Support erfassen
  `,
  accordion: {
    title:
      "Was ist zu tun, wenn Länder oder Kommunen für die Umsetzung zuständig sind?",
    text: "Wenn Länder und Kommunen für die Umsetzung zuständig ist, legen die Gesetze auf Bundesebene die Grundlage für eine reibungslose Umsetzung. Sicherlich stehen Sie bereits inhaltlich mit den entsprechenden Vertreterinnen und Vertretern im Austausch, z. B. mit den Landesministerien. Für die digitale Umsetzung sollten Sie zusätzlich das Gespräch mit denen suchen, die die aktuellen Arbeitsabläufe, Prozesse und Systeme kennen. Das funktioniert am besten in bilateralen Gesprächen, die die formellen Beteiligungsformate ergänzen.",
  },
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "Erfassen Sie die aktuellen Abläufe",
    text: dedent`
      Listen Sie auf, welche Schritte und Aufgaben aktuell erfüllt werden, damit das Ziel des Vorhabens erreicht wird, und wie diese im Zusammenhang stehen. Tun Sie dies im Team: Die Diskussion ist ebenso wertvoll wie das Ergebnis.
      
      Der Überblick lohnt sich auch bei scheinbar einfachen Abläufen: 
      - Fehlende Verbindungen oder unerwartete Abhängigkeiten werden sichtbar.
      - Sie erfahren, auf welchen bestehenden Abläufen Sie aufbauen können.
      
      Die Frage, die Sie sich und Ihren Ansprechpersonen stellen können, lautet: „Wer will was wann von wem?“
    `,
  },
  boxes: [
    {
      image: {
        src: "/images/einfache-ablaeufe-und-aufgaben-erfassen.png",
        alt: `Ein Flussdiagramm mit dem Titel „Beispielprozess-Ablauf ‚Einkommensteuer-Erklärung durchführen‘“. Auf der linken Seite ist ein gezeichnetes Gebäude und daneben ein Figur, sie sind als „Akteurin oder Akteur“ beschriftet. Als Beispiel steht darunter „Finanzämter“. Diese senden Daten zur zentralen Speicherung und Auswertung, dargestellt durch einen Pfeil, der mit „Arbeitsprozess“ beschriftet ist. Rechts steht noch einmal das Gebäude mit der Person daneben, beschriftet als „Adressatin oder Adressat“. Als Beispiel ist „Bundeszentralamt für Steuern“ eingetragen.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Einfache Abläufe und Aufgaben erfassen",
      text: dedent`
        1. Sammeln Sie [Akteurinnen und Akteure](${ROUTE_METHODS_RESPONSIBLE_ACTORS.url}), die an der Umsetzung beteiligt sind, und tragen Sie diese auf der linken Seite ein. („Wer“)
        2. Rechts tragen Sie die Adressatinnen und Adressaten ein. („von wem“)
        3. In die Mitte schreiben Sie die verbindenden Aufgaben. („will wann was“)
        
        Die Vorlage dient der Orientierung und kann angepasst werden. Ein Beispiel: Adressatinnen und Adressaten, die einen Antrag stellen, können auf der linken Seite stehen, die entsprechende Behörde steht dann rechts.
      `,
      buttons: [
        {
          text: "Vorlage herunterladen (xlsx-Datei)",
          href: "/download/Vorlage - Einfache Abläufe und Aufgaben erfassen.xlsx",
        },
      ],
    },
    {
      image: {
        src: "/images/rulemap.jpg",
        alt: `Ein Flussdiagramm mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Komplexe Abläufe visualisieren",
      text: dedent`
        Jedes Verwaltungshandeln hat einen Anfang und ein Ende. **Flussdiagramme** sind deshalb besonders geeignet, denn sie bilden Prozesse als aufeinanderfolgende Schritte ab. Man sieht, wer welchen Teil des Prozesses übernimmt und Verantwortlichkeiten wechseln.
        
        Am schnellsten sind Sie, wenn Sie eine **Papierskizze** machen, bevor Sie am Computer arbeiten. Sie werden einige Anläufe verwerfen, das ist normal und hilfreich. **Wichtig ist das Verständnis, nicht die Ästhetik.**
        
        Für die **digitale Ausarbeitung** eigenen sich Conceptboard, draw.io oder Microsoft PowerPoint. Fragen Sie nach geeigneten Programmen und Ansprechpersonen, zum Beispiel Kolleginnen und Kollegen oder in der Z-Abteilung.
        
        **Vorlagen**
        
        → [Download PowerPoint-Vorlage mit Schritt-für-Schritt-Anleitung](/documents/Anleitung_Flussdiagramm_erstellen.pptx)  
        → [Conceptboard-Vorlage](https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy) zum Kopieren, Sie können einen Gast-Zugang anlegen.
      `,
      buttons: [
        {
          text: "Beispiele ansehen",
          href: ROUTE_EXAMPLES_VISUALISATIONS.url,
        },
      ],
    },
  ],
  tip: {
    label: "Tipps",
    icon: LightbulbOutlined,
    title: "Wertschätzende und zielorientierte Kommunikation",
    text: dedent`
      - **Hürden und Anforderungen wertschätzen:** Sicherlich werden bei den Gesprächen auch Wünsche und Anforderungen an neue Abläufe auftauchen. Wahrscheinlich werden Sie nicht alle umsetzen können. Bedanken Sie sich für den Input, kommunizieren Sie, was nicht eingearbeitet wird und erläutern Sie die Gründe.
      - **Regelungsziel im Fokus:** Interessenkonflikte treten in den Hintergrund, wenn das Regelungsziel im Sinne der Normadressaten im Mittelpunkt steht — dahinter kann sich meistens vereint werden.
    `,
  },
  support: {
    label: "Unterstützungsangebot",
    icon: SupportOutlined,
    title: "Visualisierungen gemeinsam erstellen",
    text: dedent`
      Der Digitalcheck-Support unterstützt Sie bei der Visualsierung von Abläufen. Wir helfen Ihnen gerne, insbesondere bei komplexen Abläufen. 
      
      Für ein einstündiges Videotelefonat, schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.
    `,
    buttons: [
      {
        text: "Termin buchen",
        look: "tertiary" as const,
        href: ROUTE_SUPPORT.url,
      },
    ],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.3. IT-Systeme erfassen",
    text: `Nutzen Sie das Fachwissen der Akteurinnen und Akteure, um die verwendete IT-Infrastruktur für die identifizierten Abläufe zu erfassen und zu verstehen.`,
    buttons: [
      {
        text: "IT-Landschaft verstehen",
        look: "tertiary" as const,
        href: ROUTE_METHODS_COLLECT_IT_SYSTEMS.url,
      },
    ],
  },
};
