import {
  ArrowCircleRightOutlined,
  DateRangeOutlined,
  FactCheckTwoTone,
  LayersOutlined,
  LightbulbOutlined,
  LightbulbTwoTone,
  ShareTwoTone,
  StickyNote2Outlined,
  SupportOutlined,
  VisibilityTwoTone,
} from "@digitalservicebund/icons";
import { ButtonLinkProps, ButtonProps } from "~/components/Button";
import { dedent } from "~/utils/dedentMultilineStrings";
import {
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_METHODS_FLOWCHARTS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX,
} from "../staticRoutes";

export const methodsTasksProcesses = {
  title: "Das Potenzial von Visualisierungen nutzen",
  subtitle: dedent`
    Visualisierungen helfen bestehende Abläufe Ihrer Regelung einfach sichtbar zu machen und Digitaltauglichkeit einzuschätzen. Was sind die Vorteile und wie können Sie diese für Ihr Vorhaben einsetzen?
  `,
  errorMessage: "Hier hat leider etwas nicht funktioniert, das tut uns Leid.",

  usage: {
    title: "Einsatz von Visualisierungen",
    subtitle: "Die Mehrwerte von Visualisierungen kennenlernen",
    description: [
      {
        icon: ShareTwoTone,
        text: "Frühzeitig **Komplexität** erkennen und **reduzieren**",
      },
      {
        icon: LightbulbTwoTone,
        text: "**Chancen und Hürden** der Digitalisierung erkennen",
      },
      {
        icon: VisibilityTwoTone,
        text: "**Abstimmung** vereinfachen, z.b. im Ressort und mit Verbänden",
      },
      {
        icon: FactCheckTwoTone,
        text: "Prüfung durch den **NKR** erleichtern",
      },
    ],
    visualization: {
      title: "Von der Schriftform zur Visualisierung",
      caption:
        "Visualisierungen schaffen ein schnelles und praktisches Verständnis für die Umsetzung.",
      altText:
        "Das Schaubild vergleicht die schriftliche Form einer Regelung mit ihrer Visualisierung. Links ist ein Textauszug aus einem Gesetzestext abgebildet, der die Voraussetzungen für den Erwerb eines Führerscheins beschreibt. Rechts daneben ist ein Flussdiagramm dargestellt, das den Prozess der Führerscheinprüfung vereinfacht und visualisiert.",
    },
  },

  visualizationTypes: {
    title: "Häufige Arten von Visualisierungen - Schritt für Schritt erklärt",
    subtitle:
      "Bevor Sie mit der Erstellung einer Visualisierung beginnen, sollten Sie sich fragen, welche Art für den Kontext Ihrer Regelung am besten geeignet ist.",
    types: [
      {
        visual: {
          image: {
            url: "/images/flussdiagramm.png",
            width: 200,
            size: "medium" as const,
            alternativeText:
              "Ein Flussdiagramm mit verschiedenen Formen, die durch Linien verbunden sind.",
          },
          type: "image" as const,
        },
        badge: { text: "In Kürze Verfügbar", Icon: DateRangeOutlined },
        heading: { text: "Flussdiagramm", tagName: "h3" as const },
        content:
          "Ein Flussdiagramm zeigt einen Prozessablauf. Es stellt die Reihenfolge von Handlungen oder Entscheidungen dar.",
        buttons: [
          {
            text: "Anleitung",
            href: ROUTE_METHODS_FLOWCHARTS.url,
            look: "tertiary" as const,
          },
        ] as (ButtonProps | ButtonLinkProps)[],
      },
      {
        visual: {
          image: {
            url: "/images/entscheidungsbaum.png",
            width: 200,
            size: "medium" as const,
            alternativeText:
              "Ein Entscheidungsbaum, bestehend aus rechteckigen Kästen und gelben Rauten mit der Beschriftung „JA / NEIN“.",
          },
          type: "image" as const,
        },
        badge: { text: "In Kürze Verfügbar", Icon: DateRangeOutlined },
        heading: { text: "Entscheidungsbaum", tagName: "h3" as const },
        content: dedent`
          Der Entscheidungsbaum stellt Entscheidungslogiken und deren Auswirkungen dar.

          **Die Anleitung entsteht gerade.**
        `,
        buttons: [
          {
            text: "Anleitung",
            look: "tertiary" as const,
            disabled: true,
          },
        ] as (ButtonProps | ButtonLinkProps)[],
      },
      {
        visual: {
          image: {
            url: "/images/schaubild.png",
            width: 200,
            size: "medium" as const,
            alternativeText:
              "Ein Schaubild, das die Beziehung zwischen verschiedenen Elementen darstellt.",
          },
          type: "image" as const,
        },
        badge: { text: "In Kürze Verfügbar", Icon: DateRangeOutlined },
        heading: { text: "Schaubild", tagName: "h3" as const },
        content: dedent`
          Das Schaubild ist eine einfache Darstellung, die wenige Elemente nutzt und oft Beziehungen oder Verhältnisse zeigt.

          **Die Anleitung entsteht gerade.**
        `,
        buttons: [
          {
            text: "Anleitung",
            look: "tertiary" as const,
            disabled: true,
          },
        ] as (ButtonProps | ButtonLinkProps)[],
      },
    ],
  },

  goodToKnow: {
    badge: {
      Icon: LightbulbOutlined,
      text: "Gut zu wissen",
    },
    title: "Visualisierungen erleichtern die NKR-Prüfung",
    content: dedent`
      Die Vorteile von Visualisierungen helfen dem Nationalen Normenkontrollrats (NKR), Ihr Vorhaben schneller zu prüfen.
      [Sehen Sie hier](${ROUTE_FUNDAMENTALS_NKR.url}), worauf der NKR bei Visualisierungen achtet.
    `,
  },

  intro: {
    title: "Intro",
    plausibleEventName: "Tab+Bar.Intro",
    visibility: {
      heading: "Prozesse sichtbar machen",
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
      heading: "Abläufe mit dem Flussdiagramm erfassen",
      content: dedent`
        Für Ihr Regelungsvorhaben können Sie ein Flussdiagramm erstellen, um dem gesamten Umsetzungsprozess oder einen spezifischen Arbeitsablauf visuell darzustellen.

        Der Überblick lohnt sich auch bei scheinbar einfachen Abläufen:
        - **Fehlende** Verbindungen oder **unerwartete** Abhängigkeiten werden **sichtbar**.
        - Sie erfahren, auf welchen **bestehenden Abläufen Sie aufbauen** können.
      `,
    },

    visualisierung: {
      heading: "So visualisieren Sie den Umsetzungsprozess in drei Schritten",
      content: dedent`
        Eine ausführliche Anleitung finden Sie in unserer PowerPoint-Vorlage “**Anleitung Abläufe und Aufgaben erfassen**”.
        
        1. **Akteure identifizieren:** Bestimmen Sie alle beteiligten Personen, Organisationen und IT-Systeme.
        2. **Start/Ende festlegen:**  Legen Sie den Beginn und das Ende des Prozesses aus der Sicht der Bürgerinnen und Bürger oder der umsetzenden Behörden fest.
        3. **Prozess visualisieren:** Ordnen Sie Schritte logisch an und verbinden Sie Symbole mit Pfeilen.
      `,
    },

    tipp: {
      badge: { text: "Tipp", Icon: LayersOutlined },
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
    badge: {
      text: "So geht es weiter",
      Icon: ArrowCircleRightOutlined,
    },
    heading: "Finden Sie konkrete Möglichkeiten der Digitalisierung",
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
    badge: { text: "Unterstützungsangebot", Icon: SupportOutlined },
    heading: "Visualisierungen gemeinsam erstellen",
    content: dedent`
      Der Digitalcheck-Support unterstützt Sie bei der Visualsierung von Abläufen. Wir helfen Ihnen gerne, insbesondere bei komplexen Abläufen.
      
      Schreiben Sie uns über [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:015140767839).
    `,
  },
};
