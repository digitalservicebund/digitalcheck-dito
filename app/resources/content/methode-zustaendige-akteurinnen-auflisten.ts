import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import StickyNote2Outlined from "@digitalservicebund/icons/StickyNote2Outlined";
import { ContentAction } from "~/utils/contentTypes.ts";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methodsResponsibleActors = {
  title: "Zuständige Akteurinnen und Akteure auflisten",
  subtitle:
    "Wenn Sie ein Regelungsvorhaben erarbeiten, ist es entscheidend, die **Zuständigkeiten der umsetzenden Akteurinnen und Akteure** zu kennen: Sie sind die Expertinnen und Experten für die digitale, praktische Umsetzung in der Praxis und damit wertvolle Gesprächspartnerinnen und -partner.",
  guidance: "**Zeit:** ca. vier Stunden",
  accordion: {
    title:
      "Was ist zu tun, wenn Länder oder Kommunen für die Umsetzung zuständig sind?",
    text: "Wenn Länder und Kommunen für die Umsetzung zuständig ist, legen die Gesetze auf Bundesebene die Grundlage für eine reibungslose Umsetzung. Sicherlich stehen Sie bereits inhaltlich mit den entsprechenden Vertreterinnen und Vertretern im Austausch, z. B. mit den Landesministerien. Für die digitale Umsetzung sollten Sie zusätzlich das Gespräch mit denen suchen, die die aktuellen Arbeitsabläufe, Prozesse und Systeme kennen. Das funktioniert am besten in bilateralen Gesprächen, die die formellen Beteiligungsformate ergänzen.",
  },
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "Finden Sie konstruktive Gesprächspartnerinnen und -&shy;partner",
    text: dedent`
      Beginnen Sie mit der Kontaktaufnahme oben in der Hierarchie, lassen Sie ggf. über Ihre Referats- und (Unter-)abteilungsleitung den Kontakt herstellen. Fragen Sie nach den Fachexpertinnen und -experten auf Arbeitsebene, hier steckt in der Regel das tiefste Praxiswissen.

      - **Kommunen:** Bitten Sie Ansprechpersonen auf Landesebene um Kontakte und nutzen Sie das gesammelte Wissen in den Kommunalen Spitzenverbänden. 
      - **Behörden und Träger:** Nutzen Sie die offiziellen Wege der Häuser.
      - **Unternehmen, Sozialpartner, weitere Organisationen:** Fragen Sie in Spitzenverbänden nach Ansprechpersonen für Ihren konkreten Anwendungsfall. 
      
      <p class="mt-24">Wenn Sie keine persönlichen Kontakte nutzen können, greifen sie auf Organigramme oder interne Datenbanken zu, z. B. das X500-Verzeichnis.</p>
    `,
  },
  boxes: [
    {
      image: {
        src: "/images/ebenen-auswaehlen-und-ansprechpersonen-sammeln.png",
        alt: 'Eine Excel-Tabelle mit dem Titel "Beteiligte Ebenen auswählen und Ansprechpersonen sammeln für [ARBEITSTITEL]" enthält Spalten für Name, Zuständigkeit, Akteursgruppe, Kontaktdaten und Bemerkungen. Der erste Eintrag listet als Beispiel "Maria Muster" als Referentin für das Statistische Bundesamt, zugehörig zur Akteursgruppe "Bund" mit ihren Kontaktdaten.',
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Beteiligte Ebenen auswählen und Ansprechpersonen sammeln",
      text: "Die Excelvorlage hilft Ihnen, die beteiligten Ebenen auszuwählen, Zuständigkeiten zu klären und hilfreiche Ansprechpersonen zu sammeln.",
      buttons: [
        {
          text: "Vorlage herunterladen (xlsx-Datei)",
          linkTo: "/download/Vorlage - Zuständige Akteurinnen und Akteure.xlsx",
          download: true,
        },
      ] satisfies ContentAction[],
    },
  ],
  tip: {
    label: "Tipps",
    icon: LightbulbOutlined,
    title: "Gespräche über die aktuelle Umsetzungspraxis",
    text: dedent`
      - **Keine Sorge vor falscher Kontaktaufnahme:** Es kann nichts passieren, außer dass man Sie an die richtige Ansprechperson verweist.
      - **Persönliche Gespräche statt Schriftverkehr:** Bitten Sie um persönliche Gespräche bei der Kontaktaufnahme. Schriftlicher Austausch lädt zu Missverständnissen ein.  
      - **Der Austausch über den Ist-Stand ist sicher:** Nur Mut bei der Ansprache, über die aktuelle Umsetzung dürfen Sie immer sprechen.
    `,
  },
};
