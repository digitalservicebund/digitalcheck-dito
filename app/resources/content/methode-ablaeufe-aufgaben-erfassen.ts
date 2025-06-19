import { StickyNote2Outlined } from "@digitalservicebund/icons";
import { ButtonProps } from "~/components/Button";
import { dedent } from "~/utils/dedentMultilineStrings";
import {
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX,
} from "../staticRoutes";

export const methodsTasksProcesses = {
  title: "Aufgaben und Abläufe visualisieren",
  subtitle: dedent`
    Um Ihre Regelung wirkungsvoll umzusetzen, braucht es ein klares Bild der bestehenden **Abläufe**.
    Holen Sie sich dazu Unterstützung von den umsetzenden **Akteurinnen und Akteuren**. Ein Flussdiagramm hilft, Prozesse sichtbar zu machen und die Digitaltauglichkeit einzuschätzen.
  `,
  errorMessage: "Hier hat leider etwas nicht funktioniert, das tut uns Leid.",
  intro: {
    title: "Intro",
    plausibleEventName: "Tab+Bar.Intro",
    visibility: {
      headline: "Prozesse sichtbar machen",
      content: dedent`
        Abläufe lassen sich auf verschiedene Weise visualisieren – etwa durch Nutzerreisen, Entscheidungsbäume, Datenflüsse oder Prozessdiagramme.
        Ein guter Einstieg in Prozessdiagramme ist das **Flussdiagramm**:
        Sie bilden Prozesse als aufeinanderfolgende Schritte ab. Man sieht, wer welchen Teil des Prozesses übernimmt und Verantwortlichkeiten wechseln.
      `,
    },
    example: {
      documentId: "qyh09ifld7r3a8z8h2pyhgom",
      plausibleEventName: "Content.Intro.Beispiel+Entscheidungsbaum",
    },
  },

  anleitung: {
    title: "Anleitung",
    plausibleEventName: "Tab+Bar.Anleitung",

    ablaufe: {
      headline: "Abläufe mit dem Flussdiagramm erfassen",
      content: dedent`
        Für Ihr Regelungsvorhaben können Sie ein Flussdiagramm erstellen, um dem gesamten Umsetzungsprozess oder einen spezifischen Arbeitsablauf visuell darzustellen.

        Der Überblick lohnt sich auch bei scheinbar einfachen Abläufen:
        - **Fehlende** Verbindungen oder **unerwartete** Abhängigkeiten werden **sichtbar**.
        - Sie erfahren, auf welchen **bestehenden Abläufen Sie aufbauen** können.
      `,
    },

    visualisierung: {
      headline: "So visualisieren Sie den Umsetzungsprozess in drei Schritten",
      content: dedent`
        Eine ausführliche Anleitung finden Sie in unserer PowerPoint-Vorlage “**Anleitung Abläufe und Aufgaben erfassen**”.
        
        1. **Akteure identifizieren:** Bestimmen Sie alle beteiligten Personen, Organisationen und IT-Systeme.
        2. **Start/Ende festlegen:**  Legen Sie den Beginn und das Ende des Prozesses aus der Sicht der Bürgerinnen und Bürger oder der umsetzenden Behörden fest.
        3. **Prozess visualisieren:** Ordnen Sie Schritte logisch an und verbinden Sie Symbole mit Pfeilen.
      `,
    },

    tipp: {
      badge: "Tipp",
      content: dedent`
        Am schnellsten sind Sie, wenn Sie eine Papierskizze machen, bevor Sie am Computer arbeiten. Starten Sie mit reduzierten Informationen und ergänzen Sie nach und nach Details in Ihrem Flussdiagramm. **Wichtig ist das Verständnis, nicht die Ästhetik**.
            
        Für die digitale Ausarbeitung eigenen sich **Conceptboard**, **draw.io** oder **Microsoft PowerPoint**. Fragen Sie nach geeigneten Programmen und Ansprechpersonen, zum Beispiel Kolleginnen und Kollegen oder in der Z-Abteilung.
      `,
    },

    vorlage: {
      badge: { text: "Vorlage", Icon: StickyNote2Outlined },
      heading: "Anleitung Abläufe und Aufgaben erfassen",
      content:
        "Eine Powerpoint-Vorlage (PPT) mit einer Schritt für Schritt Anleitung zum Download finden Sie hier. Sie können diese ausdrucken oder an Ihrem Computer bearbeiten. Sofern in Ihrem Ressort Conceptboard genutzt werden kann, können Sie sich auch eine Kopie dieser Conceptboard-Vorlage erstellen. Für letzteres können Sie einen Gast-Zugang anlegen.",
      buttons: [
        {
          href: ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX.url,
          text: "PPT-Vorlage runterladen",
          plausibleEventName: "Content.Anleitung.Link+Powerpoint+Vorlage",
        },
        {
          href: "https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy",
          text: "Zur Conceptboard-Vorlage",
          look: "ghost",
          plausibleEventName: "Content.Anleitung.Link+Conceptboard+Vorlage",
          target: "_blank",
        },
      ] as ButtonProps[],
      image: {
        url: "/images/beispielflussdiagram.png",
      },
    },
  },

  furtherSteps: {
    badge: "So geht es weiter",
    headline: "Finden Sie konkrete Möglichkeiten der Digitalisierung",
    content:
      "Mit den Prinzipien für Digitaltaugliche Gesetzgebung bekommen Sie auch konkrete Hinweise darauf, worauf Sie achten müssen.",
    buttons: [
      {
        href: ROUTE_METHODS_PRINCIPLES.url,
        text: "Prinzipien nutzen",
        look: "tertiary",
        plausibleEventName: "Content.Link+Prinzipien+Nutzen",
      },
    ] as ButtonProps[],
  },
  support: {
    badge: "Unterstützungsangebot",
    headline: "Visualisierungen gemeinsam erstellen",
    content: dedent`
      Der Digitalcheck-Support unterstützt Sie bei der Visualsierung von Abläufen. Wir helfen Ihnen gerne, insbesondere bei komplexen Abläufen.
      
      Schreiben Sie uns über [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:015140767839).
    `,
  },
};
