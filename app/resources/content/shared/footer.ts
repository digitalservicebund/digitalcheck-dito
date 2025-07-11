import {
  ROUTE_A11Y,
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_METHODS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_IMPRINT,
  ROUTE_INTEROPERABILITY,
  ROUTE_INTEROPERABILITY_SPOC,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_PRIVACY,
  ROUTE_SITEMAP,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";

export const footer = {
  navLabel: "Seitenfußbereich",
  top: {
    navLabel: "Schnellübersicht",
    supportOffer: {
      title: "Unterstützungsangebote Für bund, Länder, Kommunen und EU-Staaten",
      links: [
        [
          {
            preText: "Support:",
            text: "0151/40 76 78 39",
            url: "tel:015140767839",
          },

          {
            preText: " oder",
            text: "digitalcheck@digitalservice.bund.de",
            url: "mailto:digitalcheck@digitalservice.bund.de",
          },
        ],
        {
          text: "Alle Unterstützungsangebote",
          url: ROUTE_SUPPORT.url,
        },
        {
          text: "Schulungen",
          url: ROUTE_SUPPORT.url + "#angebote",
        },
        {
          text: "Nationale Kontaktstelle für ein interoperables Europa (2024/903 Art. 17)",
          url: ROUTE_INTEROPERABILITY_SPOC.url,
        },
      ],
    },

    stepByStep: {
      title: "Schritt für Schritt",
      links: [
        {
          text: "1. Vorprüfung: Digitalbezug einschätzen",
          url: ROUTE_PRECHECK.url,
        },
        {
          text: "2. Digitaltauglichkeit der Regelung sicherstellen",
          url: ROUTE_METHODS.url,
        },
        {
          text: "3. Dokumentieren der Digitaltauglichkeit",
          url: ROUTE_DOCUMENTATION.url,
        },
      ],
    },

    basics: {
      title: "Grundlagen",
      links: [
        {
          text: "Prinzipien der Digitaltauglichkeit",
          url: ROUTE_FUNDAMENTALS_PRINCIPLES.url,
        },
        {
          text: "Übersicht der Werkzeuge und Methoden",
          url: ROUTE_FUNDAMENTALS_METHODS.url,
        },
        {
          text: "EU-Interoperabilität",
          url: ROUTE_INTEROPERABILITY.url,
        },
      ],
    },

    examples: {
      title: "Beispiele",
      links: [
        {
          text: "Digitaltauglichkeit im Regelungstext",
          url: ROUTE_EXAMPLES_PRINCIPLES.url,
        },
        {
          text: "Visualisierungen",
          url: ROUTE_EXAMPLES_VISUALISATIONS.url,
        },
      ],
    },
  },
  middle: {
    navLabel: "Sitemap",
    links: [
      { url: ROUTE_IMPRINT.url, text: "Impressum" },
      { url: ROUTE_PRIVACY.url, text: "Datenschutzerklärung" },
      { url: ROUTE_A11Y.url, text: "Barrierefreiheit" },
      { url: ROUTE_SITEMAP.url, text: "Sitemap" },
      {
        url: "https://github.com/digitalservicebund/digitalcheck-dito",
        text: "Open Source Code",
        openInNewTab: true,
      },
    ],
  },
  bottom: {
    navLabel: "Externe Verlinkungen",
    links: [
      {
        preText: "Ein Onlinedienst der",
        text: "DigitalService GmbH des Bundes",
        url: "https://digitalservice.bund.de/",
        openInNewTab: true,
      },
      {
        preText: "Im Auftrag des",
        text: "Bundesministerium für Digitales und Staatsmodernisierung",
        url: "https://bmds.bund.de/",
        openInNewTab: true,
      },
    ],
  },
};
