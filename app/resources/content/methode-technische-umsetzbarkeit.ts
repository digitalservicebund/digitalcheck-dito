import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import StickyNote2Outlined from "@digitalservicebund/icons/StickyNote2Outlined";
import SupportOutlined from "@digitalservicebund/icons/SupportOutlined";
import {
  ROUTE_METHODS,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methodsTechnicalFeasibility = {
  title: "2.5. Technische Umsetzbarkeit sicherstellen",
  subtitle: `Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende und neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der zuständigen Akteurinnen und Akteure zurück und holen Sie sich Hilfe von neutralen IT-Expertinnen und -Experten.`,
  guidance: dedent`
    **Zeit:** Richtet sich nach der Komplexität des Vorhabens
    
    **Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren.
    
    **Support:** Sie können sich vom Digitalcheck-Support unterstützen lassen.
  `,
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "Verstehen Sie die Auswirkungen auf IT-Systeme",
    text: dedent`
        Vergleichen Sie gemeinsam mit den [zuständigen Akteurinnen und Akteuren](${ROUTE_METHODS_RESPONSIBLE_ACTORS.url}) das geplante Vorhaben mit den Möglichkeiten der bestehenden IT-Systeme. Überprüfen Sie die Informationen mithilfe neutraler IT-Expertinnen und -Experten. 
        
        So erfahren Sie
        - welche IT-Systeme für Ihr Vorhaben verwendet werden können
        - und an welchen Stellen Änderungen nötig sind.
        <br class="block content-[''] !mb-24" />
        
        <h3 class="ds-subhead font-bold">Sie müssen nicht alles allein bewältigen</h3>
        
        Bei kleinen Fragen rufen Sie den Digitalcheck-Support an unter  [0151/40 76 78 39](tel:+4915140767839).
        Für ein unterstützendes, einstündiges Videotelefonat schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.
    `,
    buttons: [
      {
        text: "Termin buchen",
        look: "tertiary" as const,
        href: ROUTE_SUPPORT.url,
      },
    ],
  },
  boxes: [
    {
      image: {
        src: "/images/aspekte-technischer-umsetzbarkeit.png",
        alt: `Ein Dokument mit der Überschrift „Gesprächsleitfaden technische Umsetzbarkeit“. Darunter ist ein Kasten zu sehen, in dem steht „Welche Verbindungen oder Daten müssen angepasst werde?“. Vom Kasten führt ein Pfeil nach unten an dem steht „Fertig? Weiter zum nächsten Punkt“. Rechts vom Kasten stehen erläuternde Fragen und Beispiele.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Gesprächsleitfaden: Aspekte technischer Umsetzbarkeit",
      text: dedent`
        Besprechen Sie die Fragen im Schaubild gemeinsam mit den IT-Expertinnen und Experten in der Umsetzung. Multidisziplinäre Zusammenarbeit ist hier der Schlüssel.
        
        Das PDF ist barrierearm/barrierefrei.
      `,
      buttons: [
        {
          text: "Vorlage herunterladen (PDF-Datei)",
          href: "/documents/Schaubild Aspekte Technischer Umsetzbarkeit.pdf",
        },
      ],
    },
  ],
  tip: {
    label: "Tipps",
    icon: LightbulbOutlined,
    title: "Gespräche über IT-Anpassungen",
    text: dedent`
      - **Aufwand verstehen:** Fragen Sie nach dem Aufwand für IT-Anpassungen. Lassen Sie sich die Details erklären, bis Sie die Aufwände nachvollziehen können. So werden Sie selbst sprechfähig.
      - **Fokus auf das Regelungsziel:** Gehen Sie konstruktiv und mit dem Regelungsziel im Fokus in Gespräche. Veränderungen in der IT bedeuten organisatorischen und finanziellen Aufwand, was die Lösungsfindung erschweren kann.
    `,
  },
  support: {
    label: "Unterstützungsangebot",
    icon: SupportOutlined,
    title: "Die technische Umsetzung gemeinsam durchdenken",
    text: dedent`
      Wenn die technischen Anforderungen zu komplex werden, unterstützt Sie der Digitalcheck-Support. Wir helfen als neutraler Akteur dabei
      - die **technische Umsetzung** im Detail zu durchdenken und Nutzerfreundlichkeit, Datenverwendung und IT-Sicherheit zu beachten,
      - als **neutrale Moderation** in Gesprächen mit zuständigen Akteurinnen und Akteuren, um potenzielle Interessenkonflikte durch Fachlichkeit zu entschärfen,
      - **Erkenntnisse visuell aufzubereiten** – das ist die beste Grundlage für interne und externe Beteiligungsprozesse – und
      - die **Aussagen externer Dienstleister** zu reflektieren: Wirtschaftlichkeit kann eine Motivation für aufwändige Lösungen sein.
      <br class="block content-[''] !mb-24" />
      
      Für ein einstündiges Videotelefonat schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.
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
    title:
      "Verfassen Sie den Regelungsentwurf und dokumentieren Sie Ihre Entscheidungen",
    text: `Die gesammelten Erkenntnisse und Ergebnisse helfen Ihnen dabei, Aspekte der Digitaltauglichkeit in Ihrem Regelungsentwurf zu berücksichtigen. Diese Entscheidungen dokumentieren Sie in einem Fragebogen.`,
    buttons: [
      {
        text: "Zu „Erarbeiten“",
        look: "tertiary" as const,
        href: ROUTE_METHODS.url,
      },
    ],
  },
};
