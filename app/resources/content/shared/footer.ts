import {
  ROUTE_A11Y,
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_IMPRINT,
  ROUTE_INTEROPERABILITY,
  ROUTE_INTEROPERABILITY_SPOC,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_PRIVACY,
  ROUTE_SITEMAP,
  ROUTE_SUPPORT,
  ROUTE_VERSION_HISTORY,
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
          text: "EU-Interoperabilität",
          url: ROUTE_INTEROPERABILITY.url,
        },
        {
          text: "Was ist Digitaltauglichkeit?",
          url: ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url,
        },
        {
          text: "NKR und Digitalcheck",
          url: ROUTE_FUNDAMENTALS_NKR.url,
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
      { url: ROUTE_VERSION_HISTORY.url, text: "Das ist neu" },
      {
        url: "https://github.com/digitalservicebund/digitalcheck-dito",
        text: "Open Source Code",
        openInNewTab: true,
      },
    ],
  },
  bottom: {
    navLabel: "Externe Verlinkungen",
    title: "Federführung",
    digitalserviceLink: {
      preText: "Ein Angebot der",
      text: "DigitalService GmbH des Bundes",
      url: "https://digitalservice.bund.de/",
      openInNewTab: true,
    },
    links: [
      {
        preText: "Der Digitalcheck entsteht im Auftrag des",
        text: "Bundesministerium für Digitales und Staatsmodernisierung",
        url: "https://bmds.bund.de/",
        openInNewTab: true,
      },
      {
        preText:
          "Mehr über den politischen Auftrag und die Entstehung des Digitalcheck finden Sie auf der",
        text: "Projektseite",
        postText:
          "des Bundesministeriums für Digitales und Staatsmodernisierung.",
        url: "https://www.digitale-verwaltung.de/Webs/DV/DE/transformation/digitalcheck/digitalcheck-node.html",
        openInNewTab: true,
      },
    ],
  },
};
