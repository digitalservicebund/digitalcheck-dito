import {
  ROUTE_DOCUMENTATION,
  ROUTE_FUNDAMENTALS_METHODS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_PRINCIPLES,
  ROUTE_SUPPORT,
  ROUTE_VISUALISATIONS,
} from "~/resources/staticRoutes.ts";

export const header = {
  title: "Digitalcheck",
  contact: {
    msg: "Kontaktieren Sie den Support:",
    msgMobile: "Support:",
    number: "0151/40 76 78 39",
  },
  items: [
    {
      isList: true,
      text: "Schritt für Schritt",
      overlayContent: [
        {
          title: "Vorprüfung: Digitalbezug einschätzen",
          content:
            "Anhand von 6 Fragen lernen Sie, in welchem Umfang Sie Digitaltauglichkeit beachten müssen.",
          newContent: "Mit europäischem Interoperabilitätsbezug",

          href: ROUTE_PRECHECK.url,
        },
        {
          title: "Digitaltauglichkeit der Regelung sicherstellen",
          content:
            "Wir zeigen Ihnen Schritt für Schritt, wie Sie Ihr Vorhaben digitaltauglich gestalten.",
          href: ROUTE_METHODS.url,
        },
        {
          title: "Dokumentieren der Digitaltauglichkeit",
          content:
            "Dokumentieren Sie, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben.",
          href: ROUTE_DOCUMENTATION.url,
        },
      ],
    },
    {
      text: "Beispiele",
      overlayContent: [
        {
          title: "Digitaltauglichkeit im Regelungstext",
          content:
            "So wurden die 5 Prinzipien von Ihren Kolleginnen und Kollegen in Regelungen ausformuliert.",
          href: ROUTE_PRINCIPLES.url,
        },
        {
          title: "Visualisierungen",
          content:
            "Veröffentliche Visualisierungen, welche Referaten beim Erarbeiten der Digitaltauglichkeit geholfen haben.",
          href: ROUTE_VISUALISATIONS.url,
        },
      ],
    },
    {
      text: "Grundlagen",
      overlayContent: [
        {
          title: "Prinzipien für digitaltaugliche Gesetzgebung",
          content:
            "Auf diesen Prinzipien basieren die Instrumente des Digitalcheck.",
          href: ROUTE_FUNDAMENTALS_PRINCIPLES.url,
        },
        {
          title: "Werkzeuge und Methoden",
          content:
            "Lernen Sie die Methoden kennen, mit denen Sie Digitaltauglichkeit sicherstellen können.",
          href: ROUTE_FUNDAMENTALS_METHODS.url,
        },
        {
          title: "EU Interoperabilität",
          isNewTitle: true,
          content:
            "Verstehen Sie, was es mit EU Interoperabilität auf sich hat.",
          href: ROUTE_INTEROPERABILITY.url,
        },
      ],
    },
    {
      text: "Kontakt und Support",
      hasSupport: true,
      overlayContent: [
        {
          title: "Schulungen",
          content:
            "In dieser Online-Schulung bekommen Sie praktische Tipps für den Digitalcheck.",
          href: ROUTE_SUPPORT.url + "#angebote",
        },
        {
          title: "Termin buchen",
          content:
            "Buchen Sie einen Termin mit uns, damit wir Sie bei der Erarbeitung beraten können.",
          href: ROUTE_SUPPORT.url + "#hilfe",
        },
      ],
    },
  ],
};
