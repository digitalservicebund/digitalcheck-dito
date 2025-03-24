import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import StickyNote2Outlined from "@digitalservicebund/icons/StickyNote2Outlined";
import SupportOutlined from "@digitalservicebund/icons/SupportOutlined";
import {
  ROUTE_METHODS_FIVE_PRINCIPLES,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";

export const methodsITSystems = {
  title: "2.3. IT-Systeme gemeinsam erfassen",
  subtitle: `Nutzen Sie das Fachwissen der zuständigen Akteurinnen und Akteure, um die verwendete IT-Infrastruktur für die im vorigen Schritt identifizierten Abläufe zu erfassen und zu verstehen.`,
  guidance: `**Zeit:** ca. sechs Stunden

**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren

**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support`,
  accordion: {
    title:
      "Was ist zu tun, wenn Länder oder Kommunen für die Umsetzung zuständig sind?",
    text: "Wenn Länder und Kommunen für die Umsetzung zuständig ist, legen die Gesetze auf Bundesebene die Grundlage für eine reibungslose Umsetzung. Sicherlich stehen Sie bereits inhaltlich mit den entsprechenden Vertreterinnen und Vertretern im Austausch, z. B. mit den Landesministerien. Für die digitale Umsetzung sollten Sie zusätzlich das Gespräch mit denen suchen, die die **aktuellen Arbeitsabläufe, Prozesse und Systeme kennen. Das funktioniert am besten in bilateralen Gesprächen, die die formellen Beteiligungsformate ergänzen.",
  },
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "So erfassen Sie die IT-Systeme",
    text: `Dokumentieren Sie die verwendeten IT-Systeme mit ihren Funktionalitäten, Schnittstellen und Anforderungen. 
<br class="block content-[''] !mb-24" />
Ein Überblick über die IT-Landschaft hilft Ihnen dabei, 
- alle relevanten Aspekte aufzuschlüsseln und potenziell blinde Flecken zu identifizieren,
- auf bestehende Standards und Prozesse aufzusetzen,
- oder Potenzial für Vereinheitlichung zu nutzen.`,
  },
  boxes: [
    {
      image: {
        src: "/images/it-systeme-erfassen.png",
        alt: `Eine Excel-Tabelle mit dem Titel „IT-Systeme erfassen für [ARBEITSTITEL]“, die Spalten sind Name des IT-Systems, Funktionalitäten, Nutzende, Schnittstellen und Zuständigkeit. Als Beispiel ist ELSTER eingetragen, das zur Übermittlung der Steuererklärung von Bürgerinnen und Bürgern oder Unternehmen zu den Sachbearbeiterinnen und Sachbearbeitern der Finanzämter dienst. Es gibt unter Anderem eine Schnittstelle zu einem IT-System für Kapitalertragssteuer und Kirchensteuer. Für die Entwicklung ist das Bayerische Landesamt für Steuern zuständig.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "IT-Systeme erfassen",
      text: `Nutzen Sie die Vorlage, um die IT-Systeme systematisch und detailliert zu dokumentieren. Sie müssen nicht selbst über das Wissen verfügen: Fragen Sie die zuständigen Akteurinnen und Akteure und ziehen Sie ggf. neutrale IT-Expertise hinzu.`,
      buttons: [
        {
          text: "Vorlage herunterladen (xlsx-Datei)",
          href: "/download/Vorlage - IT-Systeme erfassen.xlsx",
        },
      ],
    },
  ],
  support: {
    label: "Unterstützungsangebot",
    icon: SupportOutlined,
    title: "IT-Wissen einfach erklärt",
    text: `Der Digitalcheck-Support unterstützt Sie mit kostenloser IT-Beratung, um Erkenntnisse zu erläutern und für Ihre Regelung zu nutzen, z. B. durch IT-Hintergrundwissen zu Schnittstellen. Jede Frage ist berechtigt – jede verstandene Antwort wird die Regelung digitaltauglicher machen. 

Für ein einstündiges Videotelefonat schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.`,
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
      "2.4. Möglichkeiten und Hindernisse der digitalen Umsetzung identifizieren",
    text: `Mit einem guten Verständnis des Ist-Zustandes erarbeiten Sie nun Ihre Regelung. Die fünf Prinzipien für digitaltaugliche Gesetzgebung decken unterschiedliche Aspekte der digitalen Umsetzung ab: Nutzen Sie die Erkenntnisse über den Ist-Zustand, um mithilfe der Prinzipien die **Möglichkeiten der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen.**`,
    buttons: [
      {
        text: "Fünf Prinzipien nutzen",
        look: "tertiary" as const,
        href: ROUTE_METHODS_FIVE_PRINCIPLES.url,
      },
    ],
  },
};
