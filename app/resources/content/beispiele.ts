import {
  ROUTE_PRINCIPLES,
  ROUTE_VISUALISATIONS,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const examples = {
  title: "Beispiele für Digitaltauglichkeit",
  subtitle:
    "Hier finden Sie Beispiele für digitaltaugliche Regelungen, sowie aus deren Erarbeitungsprozess. " +
    "Lassen Sie sich inspirieren, wie in Regelungsvorhaben Digitaltauglichkeit beachtet wurde.",
  paragraphs: {
    explanation: "Warum ist das gut?",
  },
  boxItems: [
    {
      title: "Die 5 Prinzipien im Regelungstext",
      content: dedent`
        Die 5 Prinzipien für Digitaltaugliche Gesetzgebung dienen Ihnen als Inspiration und gemeinsame Sprache für die Erarbeitung und Begleitung der Regelungsarbeit. Sie geben Anhaltspunkte wie Ihnen Digitalisierung beim Design der Wirklogik Ihrer Regelung helfen kann.
        <br class="block content-[''] mb-24!" />
        Hier finden Sie Formulierungen, wie Ihre Kolleginnen und Kollegen die Prinzipien für Digitaltaugliche Gesetzgebung genutzt haben um den Regelungstext digitaltauglich zu formulieren.
      `,
      buttons: [
        {
          text: "Zu den Prinzipien",
          href: ROUTE_PRINCIPLES.url,
        },
      ],
    },
    {
      title: "Visualisierungen",
      content: dedent`
        Visualisierungen helfen, komplexe Sachverhalte zu strukturieren und dadurch schneller und intuitiver erfassbar zu machen – Zusammenhänge werden sichtbar und Möglichkeiten der Digitalisierung können einfach identifiziert werden.
        <br class="block content-[''] mb-24!" />
        Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.
      `,
      buttons: [
        {
          text: "Zu den Visualisierungen",
          href: ROUTE_VISUALISATIONS.url,
        },
      ],
    },
  ],
};
