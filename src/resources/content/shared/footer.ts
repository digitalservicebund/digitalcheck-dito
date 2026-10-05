import {
  barrierefreiheit,
  dasIstNeu,
  datenschutz,
  dokumentation,
  impressum,
  interoperabel,
  interoperabel_nationaleKontaktstelle,
  methoden,
  normenkontrollrat,
  prinzipien,
  sitemap,
  vorpruefung,
  zahlenUndFakten,
} from "@/config/routes";
import { contact } from "./contact";

export const footer = {
  navLabel: "Seitenfußbereich",
  top: {
    navLabel: "Schnellübersicht",
    supportOffer: {
      title: "Unterstützungsangebote für Bund, Länder, Kommunen und EU-Staaten",
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
          url: prinzipien.path,
        },
        {
          text: "EU-Interoperabilität",
          url: interoperabel.path,
        },
        {
          text: "NKR ",
          url: normenkontrollrat.path,
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
        url: "https://bmds.bund.de/",
        openInNewTab: true,
      },
      {
        url: "https://www.digitale-verwaltung.de/Webs/DV/DE/transformation/digitalcheck/digitalcheck-node.html",
        openInNewTab: true,
      },
    ],
  },
};
