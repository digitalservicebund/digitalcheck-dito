import {
  ROUTE_PRINCIPLES,
  ROUTE_VISUALISATIONS,
} from "~/resources/staticRoutes";

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
      content: `Die 5 Prinzipien für Digitaltaugliche Gesetzgebung dienen Ihnen als Inspiration und gemeinsame Sprache für die Erarbeitung und Begleitung der Regelungsarbeit. Sie geben Anhaltspunkte wie Ihnen Digitalisierung beim Design der Wirklogik Ihrer Regelung helfen kann.
      <br class="block content-[''] !mb-24" />
      Hier finden Sie Formulierungen, wie Ihre Kolleginnen und Kollegen die Prinzipien für Digitaltaugliche Gesetzgebung genutzt haben um den Regelungstext digitaltauglich zu formulieren.`,
      buttons: [
        {
          text: "Zu den Prinzipien",
          href: ROUTE_PRINCIPLES.url,
        },
      ],
    },
    {
      title: "Visualisierungen",
      content: `Visualisierungen helfen, komplexe Sachverhalte zu strukturieren und dadurch schneller und intuitiver erfassbar zu machen – Zusammenhänge werden sichtbar und Möglichkeiten der Digitalisierung können einfach identifiziert werden.
      <br class="block content-[''] !mb-24" />
      Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.`,
      buttons: [
        {
          text: "Zu den Visualisierungen",
          href: ROUTE_VISUALISATIONS.url,
        },
      ],
    },

    // {
    //   title: "NKR-Stellungnahmen",
    //   content: `Der Nationalen Normenkontrollrat prüft die Digitaltauglichkeit von Regelungsvorhaben. In seiner Stellungnahme finden sich zum Beispiel weiter Vorschläge oder Hinweise auf Bereiche die noch nicht Digitaltauglich sind. Außerdem weißt er auf gute digitale Wirklogiken hin.
    //   <br class="block content-[''] !mb-24" />
    //   Hier finden Sie Regelungen mit einer Stellungnahme vom Nationalen Normenkontrollrat.`,
    //   buttons: [
    //     {
    //       text: "Zu den Stellungnahmen",
    //     },
    //   ],
    // },
    // {
    //   title: "Digitaltaugliche Regelungen",
    //   content: `Nach der Novelle ist vor der Novelle. Hier finden sie Regelungen mit Digitalbezug und deren Umsetzung der Digitaltauglichkeit ggf. mit Visualisierung. Dies kann Ihnen als Absprungspunkt für Ihre nächste Regelung dienen.
    //   <br class="block content-[''] !mb-24" />
    //   Hier finden Sie eine Auswahl von Regelungen mit Digitalbezug.`,
    //   buttons: [
    //     {
    //       text: "Zu den Regelungen",
    //     },
    //   ],
    // },
  ],
};
