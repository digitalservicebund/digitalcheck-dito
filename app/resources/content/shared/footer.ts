import { barrierefreiheit, beispiele_prinzipien, beispiele_visualisierungen, dasIstNeu, datenschutz, dokumentation, grundlagen_digitaltauglichkeit, grundlagen_normenkontrollrat, impressum, interoperabel, interoperabel_nationaleKontaktstelle, methoden, methoden_fuenfPrinzipien, sitemap, unterstuetzung, vorpruefung, zahlenUndFakten } from "@/config/routes";
import { ROUTE_SUPPORT_TRAININGS } from "~/resources/staticRoutes";
import { contact } from "./contact";

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
            text: contact.phoneDisplay,
            url: contact.phone,
          },

          {
            preText: " oder",
            text: contact.email,
            url: `mailto:${contact.email}`,
          },
        ],
        {
          text: "Alle Unterstützungsangebote",
          url: unterstuetzung.path,
        },
        {
          text: "Schulungen",
          url: ROUTE_SUPPORT_TRAININGS.url,
        },
        {
          text: "Nationale Kontaktstelle für ein interoperables Europa (2024/903 Art. 17)",
          url: interoperabel_nationaleKontaktstelle.path,
        },
      ],
    },

    stepByStep: {
      title: "Schritt für Schritt",
      links: [
        {
          text: "1. Vorprüfung: Digitalbezug einschätzen",
          url: vorpruefung.path,
        },
        {
          text: "2. Digitaltauglichkeit der Regelung sicherstellen",
          url: methoden.path,
        },
        {
          text: "3. Dokumentieren der Digitaltauglichkeit",
          url: dokumentation.path,
        },
      ],
    },

    basics: {
      title: "Grundlagen",
      links: [
        {
          text: "Prinzipien der Digitaltauglichkeit",
          url: methoden_fuenfPrinzipien.path,
        },
        {
          text: "EU-Interoperabilität",
          url: interoperabel.path,
        },
        {
          text: "Was ist Digitaltauglichkeit?",
          url: grundlagen_digitaltauglichkeit.path,
        },
        {
          text: "NKR und Digitalcheck",
          url: grundlagen_normenkontrollrat.path,
        },
      ],
    },

    examples: {
      title: "Beispiele",
      links: [
        {
          text: "Digitaltauglichkeit im Regelungstext",
          url: beispiele_prinzipien.path,
        },
        {
          text: "Visualisierungen",
          url: beispiele_visualisierungen.path,
        },
      ],
    },
  },
  middle: {
    navLabel: "Sitemap",
    links: [
      { url: impressum.path, text: "Impressum" },
      { url: datenschutz.path, text: "Datenschutzerklärung" },
      { url: barrierefreiheit.path, text: "Barrierefreiheit" },
      { url: sitemap.path, text: "Sitemap" },
      { url: dasIstNeu.path, text: "Das ist neu" },
      { url: zahlenUndFakten.path, text: "Zahlen und Fakten" },
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
