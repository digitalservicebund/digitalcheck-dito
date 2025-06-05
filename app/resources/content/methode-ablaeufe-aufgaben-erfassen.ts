import {
  ArrowCircleRightOutlined,
  LayersOutlined,
  StickyNote2Outlined,
  SupportOutlined,
} from "@digitalservicebund/icons/index";
import { CardProps } from "~/components/Card";
import { HighlightBoxProps } from "~/components/HighlightBox";
import { InfoBoxProps } from "~/components/InfoBox";
import { dedent } from "~/utils/dedentMultilineStrings";
import {
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX,
} from "../staticRoutes";

export type ContentVisualisation = {
  element: "visualisation";
  documentId: string;
};

type ContentItemHighlightBox = {
  element: "highlightBox";
  props: HighlightBoxProps;
};

type ContentItemInfoBox = {
  element: "infoBox";
  props: InfoBoxProps;
};

type ContentItemCard = {
  element: "card";
  props: CardProps;
};

export type ContentItem =
  | ContentVisualisation
  | ContentItemInfoBox
  | ContentItemHighlightBox
  | ContentItemCard;

type TabItem = {
  title: string;
  content: ContentItem[];
  plausibleEventName: string;
};

type MethodsTasksProcesses = {
  title: string;
  subtitle: string;
  tabs: TabItem[];
  furtherSteps: InfoBoxProps;
  support: InfoBoxProps;
};

export const methodsTasksProcesses: MethodsTasksProcesses = {
  title: "Aufgaben und Abläufe visualisieren",
  subtitle: dedent`
    Um Ihre Regelung wirkungsvoll umzusetzen, braucht es ein klares Bild der bestehenden **Abläufe**.
    Holen Sie sich dazu Unterstützung von den umsetzenden **Akteurinnen und Akteuren**. Ein Flussdiagramm hilft, Prozesse sichtbar zu machen und die Digitaltauglichkeit einzuschätzen.
  `,
  tabs: [
    {
      title: "Intro",
      plausibleEventName: "Tab+Bar+Intro",
      content: [
        {
          element: "infoBox",
          props: {
            separator: false,
            items: [
              {
                headline: {
                  text: "Prozesse sichtbar machen",
                  tagName: "h2",
                },
                content: dedent`
                Abläufe lassen sich auf verschiedene Weise visualisieren – etwa durch Nutzerreisen, Entscheidungsbäume, Datenflüsse oder Prozessdiagramme.
                Ein guter Einstieg in Prozessdiagramme ist das **Flussdiagramm**:
                Sie bilden Prozesse als aufeinanderfolgende Schritte ab. Man sieht, wer welchen Teil des Prozesses übernimmt und Verantwortlichkeiten wechseln.
            `,
              },
            ],
          },
        },
        {
          element: "visualisation",
          documentId: "m56ezco1mlzcci3sa6n53rzj",
        },
      ],
    },
    {
      title: "Anleitung",
      plausibleEventName: "Tab+Bar+Anleitung",
      content: [
        {
          element: "infoBox",
          props: {
            separator: false,
            items: [
              {
                headline: {
                  text: "Abläufe mit dem Flussdiagramm erfassen",
                  tagName: "h2",
                },
                content: dedent`
                  Für Ihr Regelungsvorhaben können Sie ein Flussdiagramm erstellen, um dem gesamten Umsetzungsprozess oder einen spezifischen Arbeitsablauf visuell darzustellen.

                  Der Überblick lohnt sich auch bei scheinbar einfachen Abläufen:
                  - **Fehlende** Verbindungen oder **unerwartete** Abhängigkeiten werden **sichtbar**.
                  - Sie erfahren, auf welchen **bestehenden Abläufen Sie aufbauen** können.
                `,
              },
              {
                headline: {
                  text: "So visualisieren Sie den Umsetzungsprozess in drei Schritten",
                  tagName: "h3",
                },
                content: dedent`
                  Eine ausführliche Anleitung finden Sie in unserer PowerPoint-Vorlage “**Anleitung Abläufe und Aufgaben erfassen**”.
                  
                  1. **Akteure identifizieren:** Bestimmen Sie alle beteiligten Personen, Organisationen und IT-Systeme.
                  2. **Start/Ende festlegen:**  Legen Sie den Beginn und das Ende des Prozesses aus der Sicht der Bürgerinnen und Bürger oder der umsetzenden Behörden fest.
                  3. **Prozess visualisieren:** Ordnen Sie Schritte logisch an und verbinden Sie Symbole mit Pfeilen.
                `,
              },
            ],
          },
        },
        {
          element: "highlightBox",
          props: {
            badge: { text: "Tipp", Icon: LayersOutlined },
            content: {
              markdown: dedent`
                  Am schnellsten sind Sie, wenn Sie eine Papierskizze machen, bevor Sie am Computer arbeiten. Starten Sie mit reduzierten Informationen und ergänzen Sie nach und nach Details in Ihrem Flussdiagramm. **Wichtig ist das Verständnis, nicht die Ästhetik**.
                      
                  Für die digitale Ausarbeitung eigenen sich **Conceptboard**, **draw.io** oder **Microsoft PowerPoint**. Fragen Sie nach geeigneten Programmen und Ansprechpersonen, zum Beispiel Kolleginnen und Kollegen oder in der Z-Abteilung.
                `,
            },
          },
        },
        {
          element: "card",
          props: {
            badge: { text: "Vorlage", Icon: StickyNote2Outlined },
            heading: {
              text: "Anleitung Abläufe und Aufgaben erfassen",
              tagName: "h3",
            },
            content: {
              markdown:
                "Eine Powerpoint-Vorlage (PPT) mit einer Schritt für Schritt Anleitung zum Download finden Sie hier. Sie können diese ausdrucken oder an Ihrem Computer bearbeiten. Sofern in Ihrem Ressort Conceptboard genutzt werden kann, können Sie sich auch eine Kopie dieser Conceptboard-Vorlage erstellen. Für letzteres können Sie einen Gast-Zugang anlegen.",
            },
            buttons: [
              {
                href: ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX.url,
                text: "PPT-Vorlage runterladen",
              },
              {
                href: "https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy",
                text: "Conceptboard-Vorlage",
                look: "tertiary",
              },
            ],
            image: {
              url: "/images/beispielflussdiagram.png",
            },
          },
        },
      ],
    },
  ],
  furtherSteps: {
    items: [
      {
        badge: {
          text: "So geht es weiter",
          Icon: ArrowCircleRightOutlined,
        },
        headline: {
          text: "Finden Sie konkrete Möglichkeiten der Digitalisierung",
          tagName: "h3",
        },
        content:
          "Mit den Prinzipien für Digitaltaugliche Gesetzgebung bekommen Sie auch konkrete Hinweise darauf, worauf Sie achten müssen.",
        buttons: [
          {
            href: ROUTE_METHODS_PRINCIPLES.url,
            text: "Prinzipien nutzen",
            look: "tertiary",
          },
        ],
      },
    ],
  },
  support: {
    items: [
      {
        badge: { text: "Unterstützungsangebot", Icon: SupportOutlined },
        headline: {
          text: "Visualisierungen gemeinsam erstellen",
          tagName: "h2",
        },
        content: dedent`
          Der Digitalcheck-Support unterstützt Sie bei der Visualsierung von Abläufen. Wir helfen Ihnen gerne, insbesondere bei komplexen Abläufen.
          
          Schreiben Sie uns über [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:015140767839).
        `,
      },
    ],
  },
};
