import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_METHODS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_SUPPORT,
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
      isOrderedList: true,
      plausibleEventName: "Schritt+für+Schritt",
      text: "Schritt für Schritt",
      overlayContent: [
        {
          plausibleEventName: "Link+Vorprüfung",
          title: "Vorprüfung: Digitalbezug einschätzen",
          content:
            "Anhand von 6 Fragen lernen Sie, in welchem Umfang Sie Digitaltauglichkeit beachten müssen.",
          newContent: "Mit europäischem Interoperabilitätsbezug",

          href: ROUTE_PRECHECK.url,
        },
        {
          plausibleEventName: "Link+Erarbeiten",
          title: "Digitaltauglichkeit der Regelung sicherstellen",
          content:
            "Wir zeigen Ihnen Schritt für Schritt, wie Sie Ihr Vorhaben digitaltauglich gestalten.",
          href: ROUTE_METHODS.url,
        },
        {
          plausibleEventName: "Link+Dokumentieren",
          title: "Dokumentieren der Digitaltauglichkeit",
          content:
            "Dokumentieren Sie, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben.",
          href: ROUTE_DOCUMENTATION.url,
        },
      ],
    },
    {
      plausibleEventName: "Beispiele",
      text: "Beispiele",
      overlayContent: [
        {
          plausibleEventName: "Link+Prinzipien+Beispiele",
          title: "Digitaltauglichkeit im Regelungstext",
          content:
            "So wurden die 5 Prinzipien von Ihren Kolleginnen und Kollegen in Regelungen ausformuliert.",
          href: ROUTE_EXAMPLES_PRINCIPLES.url,
        },
        {
          plausibleEventName: "Link+Visualisierungen",
          title: "Visualisierungen",
          content:
            "Veröffentliche Visualisierungen, welche Referaten beim Erarbeiten der Digitaltauglichkeit geholfen haben.",
          href: ROUTE_EXAMPLES_VISUALISATIONS.url,
        },
      ],
    },
    {
      plausibleEventName: "Grundlagen",
      text: "Grundlagen",
      overlayContent: [
        {
          plausibleEventName: "Link+Prinzipien",
          title: "Prinzipien für digitaltaugliche Gesetzgebung",
          content:
            "Auf diesen Prinzipien basieren die Instrumente des Digitalcheck.",
          href: ROUTE_FUNDAMENTALS_PRINCIPLES.url,
        },
        {
          plausibleEventName: "Link+Werkzeuge+Methoden",
          title: "Werkzeuge und Methoden",
          content:
            "Lernen Sie die Methoden kennen, mit denen Sie Digitaltauglichkeit sicherstellen können.",
          href: ROUTE_FUNDAMENTALS_METHODS.url,
        },
        {
          plausibleEventName: "Link+Interoperabilität",
          title: "EU Interoperabilität",
          isNewTitle: true,
          content:
            "Verstehen Sie, was es mit EU Interoperabilität auf sich hat.",
          href: ROUTE_INTEROPERABILITY.url,
        },
      ],
    },
    {
      plausibleEventName: "Kontakt+Support ",
      text: "Kontakt und Support",
      hasSupport: true,
      overlayContent: [
        {
          plausibleEventName: "Link+Telefon",
          title: "Schulungen",
          content:
            "In dieser Online-Schulung bekommen Sie praktische Tipps für den Digitalcheck.",
          href: ROUTE_SUPPORT.url + "#angebote",
        },
      ],
    },
  ],
};
